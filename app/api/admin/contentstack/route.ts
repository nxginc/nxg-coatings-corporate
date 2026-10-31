import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { fetchContentstackBlogPosts, getContentstackReadiness } from "@/lib/contentstack"
import { ContentstackManagementError, syncApprovedBlogDraft } from "@/lib/contentstack-management"
import { getDatabase } from "@/lib/db"
import { isIntegrationEnabled } from "@/lib/integration-state"

export const runtime = "nodejs"

const syncSchema = z.object({
  action: z.literal("sync_approved_blog_draft"),
  postId: z.string().uuid(),
})

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const readiness = getContentstackReadiness()
  if (!readiness.configured) {
    return NextResponse.json({
      error: readiness.configurationError || "Contentstack delivery is not configured.",
      missingEnv: readiness.missingEnv,
    }, { status: 503 })
  }
  if (!(await isIntegrationEnabled("contentstack"))) {
    return NextResponse.json({ error: "Enable Contentstack in Connections before testing delivery." }, { status: 409 })
  }

  try {
    const posts = await fetchContentstackBlogPosts({ cache: false })
    return NextResponse.json({
      connected: true,
      entryCount: posts.length,
      sampleTitles: posts.slice(0, 3).map((post) => post.title),
      scope: "Published blog entries only; reads do not publish or modify Contentstack content.",
    })
  } catch (error) {
    console.error("Contentstack delivery check failed", error)
    return NextResponse.json({ error: "Contentstack delivery check failed. Verify stack region, environment, content type, and delivery credentials." }, { status: 502 })
  }
}

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!(await isIntegrationEnabled("contentstack"))) {
    return NextResponse.json({ error: "Enable Contentstack in Connections before syncing a draft." }, { status: 409 })
  }
  const input = syncSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid Contentstack draft sync request." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Blog database is not configured." }, { status: 503 })

  const client = await database.connect()
  try {
    await client.query("begin")
    const { rows } = await client.query(
      `select id, slug, title, excerpt, body_markdown as "bodyMarkdown", category,
              contentstack_entry_uid as "contentstackEntryUid"
       from nxg_blog_posts
       where id = $1 and company_id = $2 and status = 'approved'
       limit 1
       for update`,
      [input.data.postId, NXG_COMPANY_ID],
    )
    const post = rows[0]
    if (!post) {
      await client.query("rollback")
      return NextResponse.json({ error: "Only an approved editorial draft can be synced to Contentstack." }, { status: 409 })
    }

    const { entryUid } = await syncApprovedBlogDraft(post)
    await client.query(
      `update nxg_blog_posts set contentstack_entry_uid = $3, updated_at = now()
       where id = $1 and company_id = $2`,
      [post.id, NXG_COMPANY_ID, entryUid],
    )
    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, 'blog.contentstack.draft_synced', 'blog_post', $3)`,
      [NXG_COMPANY_ID, actor, post.id],
    )
    await client.query("commit")
    return NextResponse.json({
      synced: true,
      entryUid,
      scope: "Approved draft created or updated in Contentstack; it remains unpublished until a reviewer publishes it in Contentstack.",
    })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    if (error instanceof ContentstackManagementError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    console.error("Contentstack draft sync failed", error)
    return NextResponse.json({ error: "Contentstack draft could not be synced. Check server configuration and database availability." }, { status: 502 })
  } finally {
    client.release()
  }
}
