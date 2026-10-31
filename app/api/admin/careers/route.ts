import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const openingSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  title: z.string().trim().min(4).max(180),
  location: z.string().trim().min(2).max(160),
  employmentType: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(20).max(1000),
  details: z.string().trim().max(8000).default(""),
})

const actionSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["publish", "return_to_draft", "close"]),
})

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Careers database is not configured." }, { status: 503 })
  const { rows } = await database.query(
    `select id, slug, title, location, employment_type as "employmentType",
            summary, details, status, published_at as "publishedAt",
            updated_at as "updatedAt"
     from nxg_career_openings
     where company_id = $1
     order by updated_at desc
     limit 200`,
    [NXG_COMPANY_ID],
  )
  return NextResponse.json({ openings: rows })
}

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = openingSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Enter a valid career opening." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Careers database is not configured." }, { status: 503 })
  const client = await database.connect()

  try {
    await client.query("begin")
    const { rows } = await client.query(
      `insert into nxg_career_openings
        (company_id, slug, title, location, employment_type, summary, details, created_by, updated_by)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $8)
       returning id, slug, title, location, employment_type as "employmentType",
                 summary, details, status, published_at as "publishedAt"`,
      [NXG_COMPANY_ID, input.data.slug, input.data.title, input.data.location, input.data.employmentType, input.data.summary, input.data.details, actor],
    )
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, 'career_opening.created', 'career_opening', $3)`,
      [NXG_COMPANY_ID, actor, rows[0].id],
    )
    await client.query("commit")
    return NextResponse.json({ opening: rows[0] }, { status: 201 })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Career opening create failed", error)
    return NextResponse.json({ error: "Career opening could not be saved. Check that its slug is unique." }, { status: 500 })
  } finally {
    client.release()
  }
}

export async function PUT(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = openingSchema.extend({ id: z.string().uuid() }).safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Enter a valid career opening." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Careers database is not configured." }, { status: 503 })
  const client = await database.connect()

  try {
    await client.query("begin")
    const { rows } = await client.query(
      `update nxg_career_openings
       set slug = $3, title = $4, location = $5, employment_type = $6,
           summary = $7, details = $8, updated_by = $9, updated_at = now()
       where id = $1 and company_id = $2 and status = 'draft'
       returning id, slug, title, location, employment_type as "employmentType",
                 summary, details, status, published_at as "publishedAt"`,
      [input.data.id, NXG_COMPANY_ID, input.data.slug, input.data.title, input.data.location, input.data.employmentType, input.data.summary, input.data.details, actor],
    )
    if (!rows[0]) {
      await client.query("rollback")
      return NextResponse.json({ error: "Only draft openings can be edited. Return a published or closed opening to draft first." }, { status: 409 })
    }
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, 'career_opening.updated', 'career_opening', $3)`,
      [NXG_COMPANY_ID, actor, input.data.id],
    )
    await client.query("commit")
    return NextResponse.json({ opening: rows[0] })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Career opening update failed", error)
    return NextResponse.json({ error: "Career opening could not be updated. Check that its slug is unique." }, { status: 500 })
  } finally {
    client.release()
  }
}

export async function PATCH(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = actionSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid career opening action." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Careers database is not configured." }, { status: 503 })

  const transitions = {
    publish: { from: "draft", to: "published" },
    return_to_draft: { from: "published", to: "draft" },
    close: { from: "published", to: "closed" },
  } as const
  const transition = transitions[input.data.action]
  const client = await database.connect()

  try {
    await client.query("begin")
    const { rows } = await client.query(
      `update nxg_career_openings
       set status = $3,
           published_at = case when $3 = 'published' then now() when $3 = 'draft' then null else published_at end,
           updated_by = $4, updated_at = now()
       where id = $1 and company_id = $2 and status = $5
       returning id, slug, status`,
      [input.data.id, NXG_COMPANY_ID, transition.to, actor, transition.from],
    )
    if (!rows[0]) {
      await client.query("rollback")
      return NextResponse.json({ error: "The opening is missing or cannot make that status transition." }, { status: 409 })
    }
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, $3, 'career_opening', $4)`,
      [NXG_COMPANY_ID, actor, `career_opening.${input.data.action}`, input.data.id],
    )
    await client.query("commit")
    revalidatePath("/careers")
    revalidatePath("/sitemap.xml")
    return NextResponse.json({ opening: rows[0] })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Career opening action failed", error)
    return NextResponse.json({ error: "Career opening status could not be saved." }, { status: 500 })
  } finally {
    client.release()
  }
}
