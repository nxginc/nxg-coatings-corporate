import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const postSchema = z.object({
    campaignId: z.string().uuid(),
    platform: z.enum(["facebook", "instagram", "linkedin", "google", "marketplace"]),
    caption: z.string().trim().min(1).max(5000),
    mediaAssetIds: z.array(z.string().max(200)).max(20).default([]),
    destinationUrl: z.string().url().max(1000).optional().or(z.literal("")),
    scheduledAt: z.string().datetime().optional(),
})

export async function GET() {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })

    const { rows } = await database.query(
        `select p.id, p.campaign_id as "campaignId", c.slug as "campaignSlug", p.platform, p.caption,
            p.media_asset_ids as "mediaAssetIds", p.destination_url as "destinationUrl", p.status,
            p.scheduled_at as "scheduledAt", p.created_at as "createdAt"
     from nxg_social_posts p join nxg_campaigns c on c.id = p.campaign_id
      where p.company_id = $1 order by p.created_at desc limit 200`,
        [NXG_COMPANY_ID],
    )
    return NextResponse.json({ posts: rows })
}

export async function POST(request: Request) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const input = postSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Invalid social post draft." }, { status: 400 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })
    try {
        const campaign = await database.query(
            "select id from nxg_campaigns where id = $1 and company_id = $2",
            [input.data.campaignId, NXG_COMPANY_ID],
        )
        if (!campaign.rows[0]) return NextResponse.json({ error: "Campaign not found for this company." }, { status: 404 })
        const { rows } = await database.query(
            `insert into nxg_social_posts (company_id, campaign_id, platform, caption, media_asset_ids, destination_url, scheduled_at, created_by)
       values ($1, $2, $3, $4, $5::jsonb, nullif($6, ''), $7, $8)
       returning id, campaign_id as "campaignId", platform, status, created_at as "createdAt"`,
            [NXG_COMPANY_ID, input.data.campaignId, input.data.platform, input.data.caption, JSON.stringify(input.data.mediaAssetIds), input.data.destinationUrl || "", input.data.scheduledAt || null, actor],
        )
        await database.query(
            "insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id) values ($1, $2, 'social-post.created', 'social_post', $3)",
            [NXG_COMPANY_ID, actor, rows[0].id],
        )
        return NextResponse.json({ post: rows[0] }, { status: 201 })
    } catch (error) {
        console.error("Social post draft create failed", error)
        return NextResponse.json({ error: "Social post draft could not be saved." }, { status: 500 })
    }
}