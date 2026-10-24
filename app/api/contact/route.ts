import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getCompanyId, getDatabasePool, withTransaction } from "@/lib/db"
import { isSmtpConfigured, sendContactEmail } from "@/lib/email"
import {
  allowRequest,
  fingerprintPayload,
  parseLimitedJson,
} from "@/lib/request-protection"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(2).max(5000),
})

export async function POST(request: Request) {
  try {
    if (!(await allowRequest("contact", request.headers, 5, 900))) {
    return NextResponse.json(
      { error: "Too many messages were submitted. Please try again later." },
      { status: 429, headers: { "Retry-After": "900" } },
    )
    }
  } catch (error) {
    console.error("Contact request protection is unavailable.", error)
    return NextResponse.json(
    { error: "Contact submissions are temporarily unavailable. Please call or email NXG directly." },
    { status: 503 },
    )
  }

  const body = await parseLimitedJson(request)
  if (!body.ok) {
    return NextResponse.json({ error: body.error }, { status: body.status })
  }

  const parsed = contactSchema.safeParse(body.value)
  if (!parsed.success) {
    return NextResponse.json(
    { error: "Please provide a valid name, email, and message.", fields: parsed.error.flatten().fieldErrors },
    { status: 400 },
    )
  }

  const suppliedIdempotencyKey = request.headers.get("idempotency-key")
  if (suppliedIdempotencyKey && !z.string().uuid().safeParse(suppliedIdempotencyKey).success) {
    return NextResponse.json({ error: "A valid idempotency key is required." }, { status: 400 })
  }
  const idempotencyKey = suppliedIdempotencyKey ?? randomUUID()

  if (!process.env.DATABASE_URL || !process.env.NXG_COMPANY_ID) {
    return NextResponse.json(
    { error: "Contact submissions are temporarily unavailable. Please call or email NXG directly." },
    { status: 503 },
    )
  }

  if (!isSmtpConfigured()) {
    return NextResponse.json(
    { error: "Email delivery is not configured. Please call or email NXG directly." },
    { status: 503 },
    )
  }

  const companyId = getCompanyId()
  const payloadHash = fingerprintPayload(parsed.data)

  try {
    const claim = await withTransaction(async (client) => {
    const inserted = await client.query<{ id: string }>(
      `INSERT INTO nxg_contact_submissions (company_id, idempotency_key, payload_hash, state)
       VALUES ($1, $2, $3, 'processing')
       ON CONFLICT (company_id, idempotency_key) DO NOTHING
       RETURNING id`,
      [companyId, idempotencyKey, payloadHash],
    )
    if (inserted.rows[0]) return { kind: "claimed" as const }

    const existing = await client.query<{
      payload_hash: string
      state: "processing" | "sent" | "uncertain"
      message_id: string | null
    }>(
      `SELECT payload_hash, state, message_id
       FROM nxg_contact_submissions
       WHERE company_id = $1 AND idempotency_key = $2
       FOR UPDATE`,
      [companyId, idempotencyKey],
    )
    const prior = existing.rows[0]
    if (!prior) return { kind: "missing" as const }
    if (prior.payload_hash !== payloadHash) return { kind: "different-payload" as const }
    return { kind: prior.state, messageId: prior.message_id }
    })

    if (claim.kind === "different-payload") {
    return NextResponse.json(
      { error: "This submission key was already used for different message data. Please submit again." },
      { status: 409 },
    )
    }
    if (claim.kind === "sent") {
    return NextResponse.json({
      success: true,
      message: "Your message was sent to NXG.",
      messageId: claim.messageId,
      replay: true,
    })
    }
    if (claim.kind === "processing") {
    return NextResponse.json(
      { error: "This message may already have been delivered. Please call or email NXG before submitting it again." },
      { status: 409 },
    )
    }
    if (claim.kind === "uncertain") {
    return NextResponse.json(
      { error: "Delivery could not be confirmed. Please call or email NXG before submitting this message again." },
      { status: 409 },
    )
    }
    if (claim.kind !== "claimed") {
    return NextResponse.json({ error: "Contact submissions are temporarily unavailable." }, { status: 503 })
    }

    let emailResult: Awaited<ReturnType<typeof sendContactEmail>>
    try {
    emailResult = await sendContactEmail(parsed.data)
    } catch (error) {
    await getDatabasePool()
      .query(
        `UPDATE nxg_contact_submissions
         SET state = 'uncertain', completed_at = now()
         WHERE company_id = $1 AND idempotency_key = $2 AND state = 'processing'`,
        [companyId, idempotencyKey],
      )
      .catch((updateError) => {
        console.error("Contact delivery state could not be recorded.", updateError)
      })
    console.error("Contact form email delivery could not be confirmed.", error)
    return NextResponse.json(
      { error: "Delivery could not be confirmed. Please call or email NXG before submitting this message again." },
      { status: 502 },
    )
    }

    await getDatabasePool().query(
    `UPDATE nxg_contact_submissions
     SET state = 'sent', message_id = $3, completed_at = now()
     WHERE company_id = $1 AND idempotency_key = $2 AND state = 'processing'`,
    [companyId, idempotencyKey, emailResult.messageId],
    )
    return NextResponse.json({
    success: true,
    message: "Your message was sent to NXG.",
    messageId: emailResult.messageId,
    })
  } catch (error) {
    console.error("Contact form submission could not be recorded.", error)
    return NextResponse.json(
    { error: "Your request could not be confirmed. Please call or email NXG before retrying." },
    { status: 503 },
    )
  }
}
