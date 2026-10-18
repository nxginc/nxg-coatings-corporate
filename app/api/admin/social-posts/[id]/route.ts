import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const updateSchema = z.object({
    caption: z.string().trim().min(1).max(5000).optional(),
    mediaAssetIds: z.array(z.string().max(200)).max(20).optional(),
    destinationUrl: z.string().url().max(1000).optional().or(z.literal("")),
    scheduledAt: z.string().datetime().optional().nullable(),
    action: z.enum(["submit_for_review", "approve", "reject", "revise"]).optional(),
}).refine((value) => Object.keys(value).length > 0)

const transitions = {
    submit_for_review: { from: "draft", to: "review" },
    approve: { from: "review", to: "approved" },
    reject: { from: "review", to: "rejected" },
    revise: { from: "rejected", to: "draft" },
} as const

export async function PATCH(request: Request, context: { params: { id: string } }) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const input = updateSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Invalid social post update." }, { status: 400 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })
    const { action, ...content } = input.data
    const hasContentUpdate = Object.keys(content).length > 0

    try {
        let result
        if (hasContentUpdate) {
            if (action) return NextResponse.json({ error: "Edit content and change approval status in separate steps." }, { status: 400 })
            result = await database.query(
                `update nxg_social_posts set caption = coalesce($1, caption), media_asset_ids = coalesce($2::jsonb, media_asset_ids),
                destination_url = coalesce($3, destination_url), scheduled_at = coalesce($4, scheduled_at),
                status = case when status = 'rejected' then 'draft' else status end, updated_at = now()
          where id = $5 and company_id = $6 and status in ('draft', 'rejected') returning id, campaign_id as "campaignId", platform, status`,
                [content.caption ?? null, content.mediaAssetIds ? JSON.stringify(content.mediaAssetIds) : null, content.destinationUrl ?? null, content.scheduledAt ?? null, context.params.id, NXG_COMPANY_ID],
            )
        } else {
            if (!action) return NextResponse.json({ error: "Post action is required." }, { status: 400 })
            if (action === "submit_for_review") {
                const campaign = await database.query(
                    "select c.status from nxg_social_posts p join nxg_campaigns c on c.id = p.campaign_id and c.company_id = p.company_id where p.id = $1 and p.company_id = $2",
                    [context.params.id, NXG_COMPANY_ID],
                )
                if (campaign.rows[0]?.status !== "approved") return NextResponse.json({ error: "Approve the campaign before reviewing its social variants." }, { status: 409 })
            }
            const transition = transitions[action]
            result = await database.query(
                `update nxg_social_posts set status = $1, approved_by = case when $1 = 'approved' then $2 else approved_by end,
                approved_at = case when $1 = 'approved' then now() else approved_at end, updated_at = now()
          where id = $3 and status = $4 and company_id = $5 returning id, campaign_id as "campaignId", platform, status`,
                [transition.to, actor, context.params.id, transition.from, NXG_COMPANY_ID],
            )
        }

        if (!result.rows[0]) return NextResponse.json({ error: "Post was not found or its current state does not allow this action." }, { status: 409 })
        await database.query(
            "insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id) values ($1, $2, $3, 'social_post', $4)",
            [NXG_COMPANY_ID, actor, action || "social-post.updated", context.params.id],
        )
        return NextResponse.json({ post: result.rows[0] })
    } catch (error) {
        console.error("Social post update failed", error)
        return NextResponse.json({ error: "Social post could not be updated." }, { status: 500 })
    }
}