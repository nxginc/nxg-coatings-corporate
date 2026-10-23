import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const httpsUrl = z.string().trim().url().max(1000).refine((value) => {
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
})

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const [year, month, day] = value.split("-").map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day
}).optional().or(z.literal(""))

const createSchema = z.object({
  title: z.string().trim().min(4).max(240),
  funder: z.string().trim().min(2).max(200),
  stateCode: z.string().trim().regex(/^(US|[A-Za-z]{2})$/).transform((value) => value.toUpperCase()),
  sourceUrl: httpsUrl,
  applicationUrl: httpsUrl.optional().or(z.literal("")),
  eligibilityNotes: z.string().trim().max(5000).default(""),
  deadline: optionalDate,
})

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["researching", "eligible", "ineligible", "drafting", "review_required", "submitted", "awarded", "declined", "archived"]),
})

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Government opportunity database is not configured." }, { status: 503 })

  const { rows } = await database.query(
    `select id, title, funder, state_code as "stateCode", source_url as "sourceUrl",
            application_url as "applicationUrl", eligibility_notes as "eligibilityNotes",
            deadline, status, created_at as "createdAt", updated_at as "updatedAt"
       from nxg_government_opportunities
      where company_id = $1
      order by deadline asc nulls last, updated_at desc
      limit 500`,
    [NXG_COMPANY_ID],
  )
  return NextResponse.json({ opportunities: rows })
}

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = createSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Enter a valid opportunity and HTTPS source link." }, { status: 400 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Government opportunity database is not configured." }, { status: 503 })

  const client = await database.connect()
  try {
    await client.query("begin")
    const { rows } = await client.query(
      `insert into nxg_government_opportunities
        (company_id, title, funder, state_code, source_url, application_url, eligibility_notes, deadline, created_by)
       values ($1, $2, $3, $4, $5, nullif($6, ''), $7, nullif($8, '')::date, $9)
       returning id, title, funder, state_code as "stateCode", source_url as "sourceUrl",
                 application_url as "applicationUrl", eligibility_notes as "eligibilityNotes",
                 deadline, status, created_at as "createdAt", updated_at as "updatedAt"`,
      [NXG_COMPANY_ID, input.data.title, input.data.funder, input.data.stateCode, input.data.sourceUrl, input.data.applicationUrl || "", input.data.eligibilityNotes, input.data.deadline || "", actor],
    )
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, 'government_opportunity.created', 'government_opportunity', $3)`,
      [NXG_COMPANY_ID, actor, rows[0].id],
    )
    await client.query("commit")
    return NextResponse.json({ opportunity: rows[0] }, { status: 201 })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Government opportunity create failed", error)
    return NextResponse.json({ error: "Government opportunity could not be saved." }, { status: 500 })
  } finally {
    client.release()
  }
}

export async function PATCH(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = updateSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid opportunity status update." }, { status: 400 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Government opportunity database is not configured." }, { status: 503 })

  const client = await database.connect()
  try {
    await client.query("begin")
    const { rows } = await client.query(
      `update nxg_government_opportunities set status = $1, updated_at = now()
        where id = $2 and company_id = $3
          and ($1 <> 'submitted' or status = 'review_required')
        returning id, status`,
      [input.data.status, input.data.id, NXG_COMPANY_ID],
    )
    if (!rows[0]) {
      await client.query("rollback")
      const { rows: existing } = await client.query(
        "select id from nxg_government_opportunities where id = $1 and company_id = $2",
        [input.data.id, NXG_COMPANY_ID],
      )
      return existing[0]
        ? NextResponse.json({ error: "Move the opportunity to review required before recording a submission." }, { status: 409 })
        : NextResponse.json({ error: "Opportunity not found." }, { status: 404 })
    }
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id, details)
       values ($1, $2, $3, 'government_opportunity', $4, $5::jsonb)`,
      [NXG_COMPANY_ID, actor, `government_opportunity.${input.data.status}`, input.data.id, JSON.stringify({ status: input.data.status })],
    )
    await client.query("commit")
    return NextResponse.json({ opportunity: rows[0] })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Government opportunity update failed", error)
    return NextResponse.json({ error: "Opportunity status could not be saved." }, { status: 500 })
  } finally {
    client.release()
  }
}
