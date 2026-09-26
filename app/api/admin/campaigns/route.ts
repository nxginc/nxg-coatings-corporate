import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const campaignSchema = z.object({
    slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100),
    title: z.string().trim().min(4).max(140),
    description: z.string().trim().min(20).max(5000),
    service: z.string().trim().min(2).max(120),
    audience: z.string().trim().min(2).max(160),
    landingPath: z.string().trim().regex(/^\/[a-z0-9\-/]*$/).max(240),
    imageUrl: z.string().url().max(1000).optional().or(z.literal("")),
    assetIds: z.array(z.string().max(200)).max(100).default([]),
    channelVariants: z.record(z.string(), z.object({
        caption: z.string().trim().max(5000),
        cta: z.string().max(200).optional(),
        hashtags: z.array(z.string().max(60)).max(40).default([]),
    })).default({}),
})

export async function GET() {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })

    const { rows } = await database.query(
        `select id, slug, title, description, service, audience, landing_path as "landingPath", image_url as "imageUrl",
            asset_ids as "assetIds", channel_variants as "channelVariants", status, created_at as "createdAt", updated_at as "updatedAt"
      from nxg_campaigns where company_id = $1 order by updated_at desc limit 200`,
        [NXG_COMPANY_ID],
    )
    return NextResponse.json({ campaigns: rows })
}

export async function POST(request: Request) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const input = campaignSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Invalid campaign content." }, { status: 400 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })
    try {
        const { rows } = await database.query(
            `insert into nxg_campaigns (company_id, slug, title, description, service, audience, landing_path, image_url, asset_ids, channel_variants, created_by)
          values ($1, $2, $3, $4, $5, $6, $7, nullif($8, ''), $9::jsonb, $10::jsonb, $11)
       returning id, slug, title, status, created_at as "createdAt"`,
            [NXG_COMPANY_ID, input.data.slug, input.data.title, input.data.description, input.data.service, input.data.audience, input.data.landingPath, input.data.imageUrl || "", JSON.stringify(input.data.assetIds), JSON.stringify(input.data.channelVariants), actor],
        )
        await database.query(
            "insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id) values ($1, $2, 'campaign.created', 'campaign', $3)",
            [NXG_COMPANY_ID, actor, rows[0].id],
        )
        return NextResponse.json({ campaign: rows[0] }, { status: 201 })
    } catch (error) {
        console.error("Campaign create failed", error)
        return NextResponse.json({ error: "Campaign could not be saved. Check that its slug is unique." }, { status: 500 })
    }
}