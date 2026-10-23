import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const sourceUrl = z.string().trim().url().max(1000).refine((value) => {
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}).optional().or(z.literal(""))

const createSchema = z.object({
  channel: z.enum(["indeed", "yelp"]),
  title: z.string().trim().min(3).max(200),
  sourceUrl,
  body: z.string().trim().min(10).max(10000),
})

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["review", "approved", "handed_off", "archived"]),
})

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Channel draft database is not configured." }, { status: 503 })

  const { rows } = await database.query(
    `select id, channel, title, source_url as "sourceUrl", body, status,
            created_by as "createdBy", approved_by as "approvedBy", approved_at as "approvedAt",
            handed_off_by as "handedOffBy", handed_off_at as "handedOffAt",
            created_at as "createdAt", updated_at as "updatedAt"
       from nxg_channel_drafts
      where company_id = $1
      order by updated_at desc
      limit 300`,
    [NXG_COMPANY_ID],
  )
  return NextResponse.json({ drafts: rows })
}

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = createSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Enter a valid Indeed or Yelp draft." }, { status: 400 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Channel draft database is not configured." }, { status: 503 })
  const client = await database.connect()
  try {
    await client.query("begin")
    const { rows } = await client.query(
      `insert into nxg_channel_drafts (company_id, channel, title, source_url, body, created_by)
       values ($1, $2, $3, nullif($4, ''), $5, $6)
       returning id, channel, title, source_url as "sourceUrl", body, status,
                 created_by as "createdBy", created_at as "createdAt", updated_at as "updatedAt"`,
      [NXG_COMPANY_ID, input.data.channel, input.data.title, input.data.sourceUrl || "", input.data.body, actor],
    )
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, 'channel_draft.created', $3, $4)`,
      [NXG_COMPANY_ID, actor, input.data.channel, rows[0].id],
    )
    await client.query("commit")
    return NextResponse.json({ draft: rows[0] }, { status: 201 })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Channel draft creation failed", error)
    return NextResponse.json({ error: "Channel draft could not be saved." }, { status: 500 })
  } finally {
    client.release()
  }
}

export async function PATCH(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = statusSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid channel draft status." }, { status: 400 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Channel draft database is not configured." }, { status: 503 })
  const client = await database.connect()
  try {
    await client.query("begin")
    const { rows } = await client.query(
      `update nxg_channel_drafts
          set status = $1,
              approved_by = case when $1 = 'approved' then $2 else approved_by end,
              approved_at = case when $1 = 'approved' then now() else approved_at end,
              handed_off_by = case when $1 = 'handed_off' then $2 else handed_off_by end,
              handed_off_at = case when $1 = 'handed_off' then now() else handed_off_at end,
              updated_at = now()
        where id = $3 and company_id = $4
          and (
            ($1 = 'review' and status = 'draft')
            or ($1 = 'approved' and status = 'review')
            or ($1 = 'handed_off' and status = 'approved')
            or ($1 = 'archived' and status in ('draft', 'review', 'approved', 'handed_off'))
          )
        returning id, status, approved_by as "approvedBy", approved_at as "approvedAt",
                  handed_off_by as "handedOffBy", handed_off_at as "handedOffAt",
                  updated_at as "updatedAt"`,
      [input.data.status, actor, input.data.id, NXG_COMPANY_ID],
    )
    if (!rows[0]) {
      await client.query("rollback")
      return NextResponse.json({ error: "Draft not found or status transition is not allowed." }, { status: 409 })
    }
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id, details)
       values ($1, $2, $3, 'channel_draft', $4, $5::jsonb)`,
      [NXG_COMPANY_ID, actor, `channel_draft.${input.data.status}`, input.data.id, JSON.stringify({ status: input.data.status })],
    )
    await client.query("commit")
    return NextResponse.json({ draft: rows[0] })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Channel draft status update failed", error)
    return NextResponse.json({ error: "Draft status could not be updated." }, { status: 500 })
  } finally {
    client.release()
  }
}
