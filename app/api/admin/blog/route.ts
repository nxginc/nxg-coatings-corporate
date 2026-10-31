import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { revalidatePath, revalidateTag } from "next/cache"

export const runtime = "nodejs"

const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160),
  title: z.string().trim().min(4).max(180),
  excerpt: z.string().trim().min(20).max(500),
  bodyMarkdown: z.string().max(100_000).default(""),
  category: z.string().trim().min(2).max(80),
  coverAssetId: z.string().trim().max(255).optional(),
})
const actionSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["submit_for_review", "approve", "return_to_draft", "publish", "unpublish"]),
})

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Blog database is not configured." }, { status: 503 })
  const { rows } = await database.query(
    `select id, slug, title, excerpt, category, author_name as "authorName",
        cover_asset_id as "coverAssetId", status,
        source, contentstack_entry_uid as "contentstackEntryUid",
        published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"
     from nxg_blog_posts where company_id = $1 order by updated_at desc limit 200`,
    [NXG_COMPANY_ID],
  )
  return NextResponse.json({ posts: rows })
}

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = postSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid blog draft." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Blog database is not configured." }, { status: 503 })

  try {
    const { rows } = await database.query(
      `insert into nxg_blog_posts (company_id, slug, title, excerpt, body_markdown, category, cover_asset_id, created_by)
       values ($1, $2, $3, $4, $5, $6, nullif($7, ''), $8)
       returning id, slug, title, status, created_at as "createdAt"`,
      [NXG_COMPANY_ID, input.data.slug, input.data.title, input.data.excerpt, input.data.bodyMarkdown, input.data.category, input.data.coverAssetId || "", actor],
    )
    await database.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, 'blog.draft.created', 'blog_post', $3)`,
      [NXG_COMPANY_ID, actor, rows[0].id],
    )
    return NextResponse.json({ post: rows[0] }, { status: 201 })
  } catch (error) {
    console.error("Blog draft create failed", error)
    return NextResponse.json({ error: "Blog draft could not be saved." }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = postSchema.extend({ id: z.string().uuid() }).safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid blog draft." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Blog database is not configured." }, { status: 503 })
  const client = await database.connect()

  try {
    await client.query("begin")
    const { rows } = await client.query(
      `update nxg_blog_posts
       set slug = $3, title = $4, excerpt = $5, body_markdown = $6, category = $7,
           status = 'draft', approved_by = null, approved_at = null, published_at = null, updated_at = now()
       where company_id = $1 and id = $2 and status in ('draft', 'review')
       returning id, slug, title, status`,
      [NXG_COMPANY_ID, input.data.id, input.data.slug, input.data.title, input.data.excerpt, input.data.bodyMarkdown, input.data.category],
    )
    if (!rows[0]) {
      await client.query("rollback")
      return NextResponse.json({ error: "Only draft or review posts can be edited." }, { status: 409 })
    }
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, 'blog.draft.updated', 'blog_post', $3)`,
      [NXG_COMPANY_ID, actor, input.data.id],
    )
    await client.query("commit")
    return NextResponse.json({ post: rows[0] })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Blog draft update failed", error)
    return NextResponse.json({ error: "Blog draft could not be updated. Check that its slug is unique." }, { status: 500 })
  } finally {
    client.release()
  }
}

export async function PATCH(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = actionSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid blog workflow action." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Blog database is not configured." }, { status: 503 })

  const transitions = {
    submit_for_review: { from: "draft", to: "review", audit: "blog.submitted_for_review" },
    approve: { from: "review", to: "approved", audit: "blog.approved" },
    return_to_draft: { from: "review", to: "draft", audit: "blog.returned_to_draft" },
    publish: { from: "approved", to: "published", audit: "blog.published" },
    unpublish: { from: "published", to: "approved", audit: "blog.unpublished" },
  } as const
  const transition = transitions[input.data.action]
  const client = await database.connect()

  try {
    await client.query("begin")
    const { rows } = await client.query(
      `update nxg_blog_posts
       set status = $3,
           approved_by = case when $3 in ('approved', 'published') then $4 when $3 = 'draft' then null else approved_by end,
           approved_at = case when $3 in ('approved', 'published') then now() when $3 = 'draft' then null else approved_at end,
           published_at = case when $3 = 'published' then now() when $3 = 'approved' then null else published_at end,
           updated_at = now()
       where id = $1 and company_id = $2 and status = $5
       returning id, slug, title, status, published_at as "publishedAt"`,
      [input.data.id, NXG_COMPANY_ID, transition.to, actor, transition.from],
    )
    if (!rows[0]) {
      await client.query("rollback")
      return NextResponse.json({ error: "The post is missing or cannot make that status transition." }, { status: 409 })
    }
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, $3, 'blog_post', $4)`,
      [NXG_COMPANY_ID, actor, transition.audit, input.data.id],
    )
    await client.query("commit")
    if (input.data.action === "publish" || input.data.action === "unpublish") {
      revalidateTag("editorial-blog")
      revalidatePath("/blog")
      revalidatePath(`/blog/${rows[0].slug}`)
    }
    return NextResponse.json({ post: rows[0] })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Blog workflow action failed", error)
    return NextResponse.json({ error: "Blog workflow action could not be saved." }, { status: 500 })
  } finally {
    client.release()
  }
}
