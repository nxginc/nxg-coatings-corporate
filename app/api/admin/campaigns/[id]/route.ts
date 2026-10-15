import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const updateSchema = z.object({
    title: z.string().trim().min(4).max(140).optional(),
    description: z.string().trim().min(20).max(5000).optional(),
    service: z.string().trim().min(2).max(120).optional(),
    audience: z.string().trim().min(2).max(160).optional(),
    landingPath: z.string().trim().regex(/^\/[a-z0-9\-/]*$/).max(240).optional(),
    imageUrl: z.string().url().max(1000).optional().or(z.literal("")),
    assetIds: z.array(z.string().max(200)).max(100).optional(),
    channelVariants: z.record(z.string(), z.object({ caption: z.string().trim().max(5000), cta: z.string().max(200).optional(), hashtags: z.array(z.string().max(60)).max(40).default([]) })).optional(),
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
    if (!input.success) return NextResponse.json({ error: "Invalid campaign update." }, { status: 400 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })
    const { action, ...content } = input.data
    const hasContentUpdate = Object.keys(content).length > 0

    try {
        let result
        if (hasContentUpdate) {
            if (action) return NextResponse.json({ error: "Edit content and change approval status in separate steps." }, { status: 400 })
            result = await database.query(
                `update nxg_campaigns set title = coalesce($1, title), description = coalesce($2, description), service = coalesce($3, service),
                audience = coalesce($4, audience), landing_path = coalesce($5, landing_path), image_url = coalesce($6, image_url),
                asset_ids = coalesce($7::jsonb, asset_ids), channel_variants = coalesce($8::jsonb, channel_variants),
                status = case when status = 'rejected' then 'draft' else status end, updated_at = now()
          where id = $9 and company_id = $10 and status in ('draft', 'rejected') returning id, slug, status, updated_at as "updatedAt"`,
                [content.title ?? null, content.description ?? null, content.service ?? null, content.audience ?? null, content.landingPath ?? null, content.imageUrl ?? null, content.assetIds ? JSON.stringify(content.assetIds) : null, content.channelVariants ? JSON.stringify(content.channelVariants) : null, context.params.id, NXG_COMPANY_ID],
            )
        } else {
            if (!action) return NextResponse.json({ error: "Campaign action is required." }, { status: 400 })
            const transition = transitions[action]
            result = await database.query(
                `update nxg_campaigns set status = $1, approved_by = case when $1 = 'approved' then $2 else approved_by end,
                approved_at = case when $1 = 'approved' then now() else approved_at end, updated_at = now()
          where id = $3 and status = $4 and company_id = $5 returning id, slug, status, updated_at as "updatedAt"`,
                [transition.to, actor, context.params.id, transition.from, NXG_COMPANY_ID],
            )
        }

        if (!result.rows[0]) return NextResponse.json({ error: "Campaign was not found or its current state does not allow this action." }, { status: 409 })
        await database.query(
            "insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id) values ($1, $2, $3, 'campaign', $4)",
            [NXG_COMPANY_ID, actor, action || "campaign.updated", context.params.id],
        )
        return NextResponse.json({ campaign: result.rows[0] })
    } catch (error) {
        console.error("Campaign update failed", error)
        return NextResponse.json({ error: "Campaign could not be updated." }, { status: 500 })
    }
}