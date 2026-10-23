import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { vetLead } from "@/lib/lead-vetting"

export const runtime = "nodejs"

const requestSchema = z.object({ leadId: z.string().uuid() })

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Lead database is not configured." }, { status: 503 })

  const { rows } = await database.query(
    `select id, name, email, phone, service, project_type as "projectType", address,
        message, status, vetting_status as "vettingStatus", vetting_score as "vettingScore",
        vetting_flags as "vettingFlags", created_at as "createdAt"
     from nxg_leads where company_id = $1
     order by case when vetting_status = 'priority' then 0 when vetting_status = 'review' then 1 else 2 end,
        created_at desc limit 200`,
    [NXG_COMPANY_ID],
  )
  return NextResponse.json({ leads: rows })
}

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = requestSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "A valid leadId is required." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Lead database is not configured." }, { status: 503 })

  const leadResult = await database.query(
    `select id, name, email, phone, service, project_type as "projectType", address, message,
        preferred_date as "preferredDate"
     from nxg_leads where id = $1 and company_id = $2`,
    [input.data.leadId, NXG_COMPANY_ID],
  )
  const lead = leadResult.rows[0]
  if (!lead) return NextResponse.json({ error: "Lead not found for this company." }, { status: 404 })

  const result = vetLead(lead)
  await database.query(
    `update nxg_leads set vetting_status = $1, vetting_score = $2, vetting_flags = $3::jsonb,
        vetting_updated_at = now() where id = $4 and company_id = $5`,
    [result.status, result.score, JSON.stringify(result.flags), lead.id, NXG_COMPANY_ID],
  )
  await database.query(
    `insert into nxg_lead_vetting_events (company_id, lead_id, actor, score, status, flags)
     values ($1, $2, $3, $4, $5, $6::jsonb)`,
    [NXG_COMPANY_ID, lead.id, actor, result.score, result.status, JSON.stringify(result.flags)],
  )
  await database.query(
    `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id, details)
     values ($1, $2, 'lead.vetted', 'lead', $3, $4::jsonb)`,
    [NXG_COMPANY_ID, actor, lead.id, JSON.stringify(result)],
  )
  return NextResponse.json({ leadId: lead.id, vetting: result })
}
