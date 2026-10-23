import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { sendEmail } from "@/lib/email"
import { isIntegrationEnabled } from "@/lib/integration-state"

export const runtime = "nodejs"

const replySchema = z.object({
  leadId: z.string().uuid(),
  subject: z.string().trim().min(2).max(180),
  body: z.string().trim().min(2).max(10000),
})

const leadIdSchema = z.string().uuid()

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] || character)
}

export async function GET(request: Request) {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const leadId = leadIdSchema.safeParse(new URL(request.url).searchParams.get("leadId"))
  if (!leadId.success) return NextResponse.json({ error: "A valid lead ID is required." }, { status: 400 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "CRM database is not configured." }, { status: 503 })
  const { rows } = await database.query(
    `select id, recipient_email as "recipientEmail", subject, body_text as body,
            status, actor, error_message as "errorMessage", created_at as "createdAt",
            sent_at as "sentAt"
       from nxg_lead_replies
      where lead_id = $1 and company_id = $2
      order by created_at desc
      limit 50`,
    [leadId.data, NXG_COMPANY_ID],
  )
  return NextResponse.json({ replies: rows })
}

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const input = replySchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Enter a valid subject and reply." }, { status: 400 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "CRM database is not configured." }, { status: 503 })
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO_EMAIL) {
    return NextResponse.json({ error: "Configure SMTP and CONTACT_TO_EMAIL before sending lead replies." }, { status: 503 })
  }
  if (!(await isIntegrationEnabled("email"))) {
    return NextResponse.json({ error: "Enable transactional email in Connections before sending lead replies." }, { status: 409 })
  }

  const client = await database.connect()
  let replyId: string
  let recipientEmail: string
  let recipientName: string
  try {
    await client.query("begin")
    const { rows: leads } = await client.query(
      `select id, name, email from nxg_leads
        where id = $1 and company_id = $2 and status <> 'spam'
        for update`,
      [input.data.leadId, NXG_COMPANY_ID],
    )
    const lead = leads[0]
    if (!lead) {
      await client.query("rollback")
      return NextResponse.json({ error: "Lead not found or unavailable for reply." }, { status: 404 })
    }
    recipientEmail = lead.email
    recipientName = lead.name

    const { rows } = await client.query(
      `insert into nxg_lead_replies
        (company_id, lead_id, recipient_email, subject, body_text, actor)
       values ($1, $2, lower($3), $4, $5, $6)
       returning id`,
      [NXG_COMPANY_ID, lead.id, recipientEmail, input.data.subject, input.data.body, actor],
    )
    replyId = rows[0].id
    await client.query("commit")
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Lead reply preparation failed", error)
    return NextResponse.json({ error: "Lead reply could not be prepared." }, { status: 500 })
  } finally {
    client.release()
  }

  try {
    const escapedBody = escapeHtml(input.data.body).replace(/\n/g, "<br>")
    const info = await sendEmail({
      to: recipientEmail,
      subject: input.data.subject,
      text: input.data.body,
      html: `<p>Hello ${escapeHtml(recipientName)},</p><p>${escapedBody}</p>`,
    })
    await database.query(
      `update nxg_lead_replies set status = 'sent', provider_message_id = $1, sent_at = now()
        where id = $2 and company_id = $3`,
      [info.messageId || null, replyId, NXG_COMPANY_ID],
    )
    await database.query(
      `update nxg_leads set status = 'contacted' where id = $1 and company_id = $2 and status = 'new'`,
      [input.data.leadId, NXG_COMPANY_ID],
    )
    return NextResponse.json({ sent: true, replyId }, { status: 201 })
  } catch (error) {
    console.error("Lead reply delivery failed", error)
    await database.query(
      `update nxg_lead_replies set status = 'failed', error_message = $1
        where id = $2 and company_id = $3`,
      [error instanceof Error ? error.message.slice(0, 1000) : "SMTP delivery failed", replyId, NXG_COMPANY_ID],
    ).catch((recordError) => console.error("Lead reply failure could not be recorded", recordError))
    return NextResponse.json({ error: "Email delivery failed. The failed attempt was recorded; retry only after checking SMTP delivery status." }, { status: 502 })
  }
}
