import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160),
  title: z.string().trim().min(4).max(180),
  excerpt: z.string().trim().min(20).max(500),
  bodyMarkdown: z.string().max(100_000).default(""),
  category: z.string().trim().min(2).max(80),
  coverAssetId: z.string().trim().max(255).optional(),
})

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Blog database is not configured." }, { status: 503 })
  const { rows } = await database.query(
    `select id, slug, title, excerpt, category, cover_asset_id as "coverAssetId", status,
        source, published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"
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
