import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getCompanyId, getDatabasePool, withTransaction } from "@/lib/db"

const applicationSchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  companyName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  phone: z.string().trim().max(40).optional().default(""),
  tradeTypes: z.array(z.string().trim().min(1).max(80)).min(1).max(8),
  serviceAreas: z.array(z.string().trim().min(2).max(100)).min(1).max(12),
  websiteUrl: z.union([z.literal(""), z.string().url().max(2048)]).optional().default(""),
  experienceSummary: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
})

function isOpenApplicationConflict(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505" &&
    "constraint" in error &&
    error.constraint === "nxg_partner_applications_open_email_idx"
  )
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.NXG_COMPANY_ID) {
    return NextResponse.json(
      { error: "Partner applications are temporarily unavailable. Please contact us directly." },
      { status: 503 },
    )
  }

  const idempotencyKey = request.headers.get("idempotency-key")
  if (!idempotencyKey || !z.string().uuid().safeParse(idempotencyKey).success) {
    return NextResponse.json({ error: "A valid idempotency key is required." }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "The submitted form data is not valid JSON." }, { status: 400 })
  }

  const parsed = applicationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the required fields and try again.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  if (parsed.data.website) {
    return NextResponse.json({ error: "The application could not be accepted." }, { status: 400 })
  }

  const requestId = randomUUID()
  const companyId = getCompanyId()
  const application = parsed.data

  try {
    const result = await withTransaction(async (client) => {
      const inserted = await client.query<{
        id: string
        nxg_id: string
        status: string
        created_at: Date
      }>(
        `INSERT INTO nxg_partner_applications (
           company_id, idempotency_key, contact_name, company_name, email, phone,
           trade_types, service_areas, website_url, experience_summary, consent_at
         )
         VALUES ($1, $2, $3, $4, $5, NULLIF($6, ''), $7, $8, NULLIF($9, ''), NULLIF($10, ''), now())
         ON CONFLICT (company_id, idempotency_key) DO NOTHING
         RETURNING id, nxg_id, status, created_at`,
        [
          companyId,
          idempotencyKey,
          application.contactName,
          application.companyName,
          application.email,
          application.phone,
          application.tradeTypes,
          application.serviceAreas,
          application.websiteUrl,
          application.experienceSummary,
        ],
      )

      if (inserted.rows[0]) {
        await client.query(
          `INSERT INTO nxg_audit_events (
             company_id, request_id, actor_type, action, entity_type, entity_id, details
           ) VALUES ($1, $2, 'public', 'partner_application.created', 'partner_application', $3, $4)`,
          [companyId, requestId, inserted.rows[0].id, JSON.stringify({ status: "pending" })],
        )
        return { application: inserted.rows[0], replay: false }
      }

      const existing = await client.query<{
        id: string
        nxg_id: string
        status: string
        created_at: Date
      }>(
        `SELECT id, nxg_id, status, created_at
         FROM nxg_partner_applications
         WHERE company_id = $1 AND idempotency_key = $2`,
        [companyId, idempotencyKey],
      )
      return { application: existing.rows[0] ?? null, replay: true }
    })

    if (!result.application) {
      return NextResponse.json({ error: "The application could not be accepted." }, { status: 409 })
    }

    return NextResponse.json(
      {
        applicationId: result.application.nxg_id,
        status: result.application.status,
        receivedAt: result.application.created_at,
        requestId,
      },
      { status: result.replay ? 200 : 201 },
    )
  } catch (error) {
    if (isOpenApplicationConflict(error)) {
      return NextResponse.json(
        { error: "An application for this email is already under review." },
        { status: 409 },
      )
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "42P01"
    ) {
      console.error("Partner application migration is missing.", { requestId })
      return NextResponse.json(
        { error: "Partner applications are not available yet. Please contact us directly.", requestId },
        { status: 503 },
      )
    }

    console.error("Partner application could not be saved.", { requestId, error })
    return NextResponse.json(
      { error: "We could not save your application. Please try again later.", requestId },
      { status: 500 },
    )
  }
}
