import { NextResponse } from "next/server"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { isIntegrationEnabled } from "@/lib/integration-state"
import { getProviderConnection, refreshGoogleAccessToken, type MetaTokenBundle } from "@/lib/marketing-oauth"

export const runtime = "nodejs"

class ProviderPublishError extends Error {
    constructor(message: string, readonly outcomeKnown: boolean) {
        super(message)
    }
}

async function providerErrorMessage(response: Response) {
    const body = await response.json().catch(() => null) as { error?: { message?: string }; message?: string } | null
    return body?.error?.message || body?.message || `Provider returned HTTP ${response.status}.`
}

async function publishAtProvider(input: {
    provider: "meta-pages" | "google-business-profile"
    targetPath: string
    accessToken: string
    caption: string
    destinationUrl: string | null
}) {
    let response: Response
    if (input.provider === "meta-pages") {
        const version = process.env.META_GRAPH_API_VERSION?.trim() || "v26.0"
        const body = new URLSearchParams({ message: input.caption, access_token: input.accessToken })
        if (input.destinationUrl) body.set("link", input.destinationUrl)
        response = await fetch(`https://graph.facebook.com/${version}/${encodeURIComponent(input.targetPath)}/feed`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
            cache: "no-store",
            signal: AbortSignal.timeout(20000),
        })
        const result = await response.json().catch(() => null) as { id?: string; error?: { message?: string } } | null
        if (!response.ok) throw new ProviderPublishError(result?.error?.message || `Meta returned HTTP ${response.status}.`, response.status < 500)
        if (!result?.id) throw new ProviderPublishError("Meta accepted the request but did not return a post ID; verify the Page before retrying.", false)
        return result.id
    }

    const body = {
        languageCode: "en-US",
        summary: input.caption,
        topicType: "STANDARD",
        ...(input.destinationUrl ? { callToAction: { actionType: "LEARN_MORE", url: input.destinationUrl } } : {}),
    }
    response = await fetch(`https://mybusiness.googleapis.com/v4/${input.targetPath}/localPosts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${input.accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
    })
    const result = await response.json().catch(() => null) as { name?: string; error?: { message?: string } } | null
    if (!response.ok) throw new ProviderPublishError(result?.error?.message || `Google Business Profile returned HTTP ${response.status}.`, response.status < 500)
    if (!result?.name) throw new ProviderPublishError("Google accepted the request but did not return a post ID; verify the location before retrying.", false)
    return result.name
}

export async function POST(_request: Request, context: { params: { id: string } }) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Campaign database is not configured." }, { status: 503 })

    const previewResult = await database.query(
        `select p.platform, p.caption, p.media_asset_ids as "mediaAssetIds",
                p.destination_url as "destinationUrl", p.status, c.status as "campaignStatus"
         from nxg_social_posts p join nxg_campaigns c on c.id = p.campaign_id and c.company_id = p.company_id
         where p.id = $1 and p.company_id = $2`,
        [context.params.id, NXG_COMPANY_ID],
    )
    const preview = previewResult.rows[0]
    if (!preview) return NextResponse.json({ error: "Social post not found." }, { status: 404 })
    if (preview.status !== "approved" || preview.campaignStatus !== "approved") {
        return NextResponse.json({ error: "Only an approved post in an approved campaign can be published." }, { status: 409 })
    }
    if (preview.mediaAssetIds?.length) return NextResponse.json({ error: "Direct publishing currently supports text and destination links only; remove media attachments before approval." }, { status: 409 })

    const provider = preview.platform === "facebook" ? "meta-pages" : preview.platform === "google" ? "google-business-profile" : null
    if (!provider) return NextResponse.json({ error: "This channel does not support direct publishing." }, { status: 409 })
    if (!(await isIntegrationEnabled(provider))) return NextResponse.json({ error: "Connect and enable the provider before publishing." }, { status: 409 })
    const connection = await getProviderConnection(provider)
    if (!connection) return NextResponse.json({ error: "Provider account is not connected." }, { status: 409 })

    let accessToken = ""
    let targetPath = ""
    if (provider === "meta-pages") {
        const metaBundle = connection.tokenBundle as MetaTokenBundle
        const page = metaBundle.pages.find((item) => item.id === connection.metadata.selectedPageId)
        if (!page) return NextResponse.json({ error: "Select a Facebook Page in Connections before publishing." }, { status: 409 })
        accessToken = page.accessToken
        targetPath = page.id
    } else {
        const location = connection.metadata.selectedGoogleLocation
        const account = connection.metadata.selectedGoogleAccount
        if (!location || !account) return NextResponse.json({ error: "Select a Google Business Profile location in Connections before publishing." }, { status: 409 })
        if (preview.caption.length > 1500) return NextResponse.json({ error: "Google Business Profile post text must be 1,500 characters or fewer." }, { status: 400 })
        accessToken = (await refreshGoogleAccessToken(connection)).accessToken
        targetPath = `${account}/${location}`.split("/").map(encodeURIComponent).join("/")
    }

    const client = await database.connect()
    let post: { id: string; caption: string; destinationUrl: string | null } | undefined
    let publishEventId: string | undefined
    try {
        await client.query("begin")
        const { rows } = await client.query(
            `select p.id, p.caption, p.destination_url as "destinationUrl", p.status, c.status as "campaignStatus"
             from nxg_social_posts p join nxg_campaigns c on c.id = p.campaign_id and c.company_id = p.company_id
             where p.id = $1 and p.company_id = $2 for update of p, c`,
            [context.params.id, NXG_COMPANY_ID],
        )
        const current = rows[0]
        if (!current || current.status !== "approved" || current.campaignStatus !== "approved") {
            await client.query("rollback")
            return NextResponse.json({ error: "Post approval changed or the post was already submitted for publishing." }, { status: 409 })
        }
        post = { id: current.id, caption: current.caption, destinationUrl: current.destinationUrl }
        await client.query(
            "update nxg_social_posts set status = 'publishing', updated_at = now() where id = $1 and company_id = $2",
            [current.id, NXG_COMPANY_ID],
        )
        const eventResult = await client.query(
            `insert into nxg_external_publish_events (company_id, provider, entity_type, entity_id, actor, status)
             values ($1, $2, 'social_post', $3, $4, 'publishing') returning id`,
            [NXG_COMPANY_ID, provider, current.id, actor],
        )
        publishEventId = eventResult.rows[0].id
        await client.query("commit")
    } catch {
        await client.query("rollback").catch(() => undefined)
        console.error("Social post publish reservation failed", { provider })
        return NextResponse.json({ error: "Post could not be reserved for publishing. Refresh and retry." }, { status: 500 })
    } finally {
        client.release()
    }

    const reservedPost = post
    const eventId = publishEventId
    if (!reservedPost || !eventId) return NextResponse.json({ error: "Publishing could not be started." }, { status: 500 })

    let providerPostId: string
    try {
        providerPostId = await publishAtProvider({ provider, targetPath, accessToken, caption: reservedPost.caption, destinationUrl: reservedPost.destinationUrl })
    } catch (error) {
        const outcomeKnown = error instanceof ProviderPublishError && error.outcomeKnown
        const message = error instanceof Error ? error.message : "Publishing failed."
        await database.query(
            "update nxg_social_posts set status = $1, updated_at = now() where id = $2 and company_id = $3 and status = 'publishing'",
            [outcomeKnown ? "approved" : "publishing", reservedPost.id, NXG_COMPANY_ID],
        )
        await database.query(
            "update nxg_external_publish_events set status = $1, error_message = $2 where id = $3 and company_id = $4",
            [outcomeKnown ? "failed" : "unknown", message.slice(0, 500), eventId, NXG_COMPANY_ID],
        )
        await database.query(
            `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
             values ($1, $2, $3, 'social_post', $4)`,
            [NXG_COMPANY_ID, actor, outcomeKnown ? "social-post.publish-failed" : "social-post.publish-outcome-unknown", reservedPost.id],
        )
        console.error("Social post provider publishing failed", { provider, outcomeKnown })
        return NextResponse.json({
            error: outcomeKnown
                ? message
                : `${message} The post remains locked in Publishing to prevent a duplicate; verify the provider before retrying.`,
        }, { status: 502 })
    }

    try {
        await database.query(
            `update nxg_social_posts set status = 'published', provider_post_id = $1, updated_at = now()
             where id = $2 and company_id = $3 and status = 'publishing'`,
            [providerPostId, reservedPost.id, NXG_COMPANY_ID],
        )
        await database.query(
            "update nxg_external_publish_events set status = 'published', provider_entity_id = $1 where id = $2 and company_id = $3",
            [providerPostId, eventId, NXG_COMPANY_ID],
        )
        await database.query(
            `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
             values ($1, $2, 'social-post.published', 'social_post', $3)`,
            [NXG_COMPANY_ID, actor, reservedPost.id],
        )
        return NextResponse.json({ published: true, providerPostId })
    } catch (error) {
        console.error("Provider accepted a social post but local finalization failed", { provider })
        return NextResponse.json({
            error: "The provider may have published this post, but local status could not be updated. Verify the provider before retrying.",
        }, { status: 503 })
    }
}
