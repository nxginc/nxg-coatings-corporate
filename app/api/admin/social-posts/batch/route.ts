import { NextResponse } from "next/server"
import type { PoolClient } from "pg"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { SOCIAL_CHANNELS, SOCIAL_PLATFORMS } from "@/data/marketing-templates"

export const runtime = "nodejs"

const captionLimits = Object.fromEntries(SOCIAL_CHANNELS.map(({ value, limit }) => [value, limit]))
const platformSchema = z.enum(SOCIAL_PLATFORMS)

const batchSchema = z.object({
  campaignId: z.string().uuid(),
  posts: z.array(z.object({
    platform: platformSchema,
    caption: z.string().trim().min(1),
    mediaAssetIds: z.array(z.string().max(200)).max(20).default([]),
    destinationUrl: z.string().url().max(1000).optional().or(z.literal("")),
    scheduledAt: z.string().datetime().optional(),
  }).superRefine((post, context) => {
    if (post.caption.length > captionLimits[post.platform]) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Caption exceeds the ${post.platform} limit of ${captionLimits[post.platform]} characters.`,
        path: ["caption"],
      })
    }
  })).min(1).max(5),
}).superRefine((batch, context) => {
  const platforms = batch.posts.map((post) => post.platform)
  if (new Set(platforms).size !== platforms.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Each platform may appear only once in a batch.",
      path: ["posts"],
    })
  }
})

export async function POST(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const input = batchSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) {
    return NextResponse.json({ error: input.error.issues[0]?.message ?? "Invalid social post batch." }, { status: 400 })
  }

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })

  let client: PoolClient | undefined
  try {
    client = await database.connect()
    await client.query("begin")
    const campaignResult = await client.query(
      "select id, status from nxg_campaigns where id = $1 and company_id = $2 for share",
      [input.data.campaignId, NXG_COMPANY_ID],
    )
    const campaign = campaignResult.rows[0]
    if (!campaign) {
      await client.query("rollback")
      return NextResponse.json({ error: "Campaign not found for this company." }, { status: 404 })
    }
    if (campaign.status !== "approved") {
      await client.query("rollback")
      return NextResponse.json({ error: "Approve the campaign before creating its social drafts." }, { status: 409 })
    }

    const posts = []
    for (const post of input.data.posts) {
      const { rows } = await client.query(
        `insert into nxg_social_posts
          (company_id, campaign_id, platform, caption, media_asset_ids, destination_url, scheduled_at, created_by)
         values ($1, $2, $3, $4, $5::jsonb, nullif($6, ''), $7, $8)
         returning id, campaign_id as "campaignId", platform, status, created_at as "createdAt"`,
        [
          NXG_COMPANY_ID,
          input.data.campaignId,
          post.platform,
          post.caption,
          JSON.stringify(post.mediaAssetIds),
          post.destinationUrl || "",
          post.scheduledAt || null,
          actor,
        ],
      )
      posts.push(rows[0])
      await client.query(
        `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id, details)
         values ($1, $2, 'social-post.created', 'social_post', $3, $4::jsonb)`,
        [NXG_COMPANY_ID, actor, rows[0].id, JSON.stringify({ batch: true, platform: post.platform })],
      )
    }

    await client.query("commit")
    return NextResponse.json({ posts }, { status: 201 })
  } catch (error) {
    if (client) {
      try {
        await client.query("rollback")
      } catch (rollbackError) {
        console.error("Social post batch rollback failed", rollbackError)
      }
    }
    console.error("Social post batch create failed", error)
    return NextResponse.json({ error: "Social post drafts could not be saved." }, { status: 500 })
  } finally {
    client?.release()
  }
}
