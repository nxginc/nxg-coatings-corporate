import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const id = z.string().uuid().safeParse(params.id)
  if (!id.success) return NextResponse.json({ error: "Invalid blog post id." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Blog database is not configured." }, { status: 503 })
  const { rows } = await database.query(
    `select id, slug, title, excerpt, body_markdown as "bodyMarkdown", category, status
     from nxg_blog_posts where company_id = $1 and id = $2 limit 1`,
    [NXG_COMPANY_ID, id.data],
  )
  if (!rows[0]) return NextResponse.json({ error: "Blog post not found." }, { status: 404 })
  return NextResponse.json({ post: rows[0] })
}
