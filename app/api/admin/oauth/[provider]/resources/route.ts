import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import {
    getProviderConnection,
    refreshGoogleAccessToken,
    saveProviderConnection,
    type GoogleTokenBundle,
    type MarketingProvider,
    type MetaTokenBundle,
} from "@/lib/marketing-oauth"

export const runtime = "nodejs"

const selectionSchema = z.object({
    pageId: z.string().min(1).optional(),
    accountName: z.string().regex(/^accounts\/[0-9]+$/).optional(),
    locationName: z.string().regex(/^locations\/[0-9]+$/).optional(),
}).refine((value) => Boolean(value.pageId) !== Boolean(value.locationName))

type GoogleAccount = { name: string; accountName?: string }
type GoogleLocation = { name: string; title: string; storefrontAddress?: { addressLines?: string[]; locality?: string; administrativeArea?: string } }

async function googleGet<T>(url: string, accessToken: string): Promise<T> {
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
    })
    const result = await response.json().catch(() => null) as T & { error?: { message?: string } } | null
    if (!response.ok || !result) throw new Error(result?.error?.message || "Google Business Profile resource lookup failed.")
    return result
}

async function listGoogleResources(accessToken: string) {
    const accountResult = await googleGet<{ accounts?: GoogleAccount[] }>(
        "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
        accessToken,
    )
    const accounts = accountResult.accounts || []
    const resources = []
    for (const account of accounts) {
        const accountPath = account.name.split("/").map(encodeURIComponent).join("/")
        const locationResult = await googleGet<{ locations?: GoogleLocation[] }>(
            `https://mybusinessbusinessinformation.googleapis.com/v1/${accountPath}/locations?pageSize=100&readMask=name,title,storefrontAddress,websiteUri`,
            accessToken,
        )
        resources.push({
            name: account.name,
            accountName: account.accountName || account.name,
            locations: (locationResult.locations || []).map((location) => ({
                name: location.name,
                title: location.title,
                address: [
                    ...(location.storefrontAddress?.addressLines || []),
                    location.storefrontAddress?.locality,
                    location.storefrontAddress?.administrativeArea,
                ].filter(Boolean).join(", "),
            })),
        })
    }
    return resources
}

export async function GET(_request: NextRequest, context: { params: { provider: string } }) {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const provider = context.params.provider as MarketingProvider
    if (provider !== "meta-pages" && provider !== "google-business-profile") return NextResponse.json({ error: "Unsupported provider." }, { status: 404 })
    const connection = await getProviderConnection(provider)
    if (!connection) return NextResponse.json({ connected: false, resources: [] })
    if (provider === "meta-pages") {
        const bundle = connection.tokenBundle as MetaTokenBundle
        return NextResponse.json({
            connected: true,
            accountName: connection.providerAccountName,
            selectedPageId: connection.metadata.selectedPageId || null,
            resources: bundle.pages.map(({ id, name }) => ({ id, name })),
            scopes: connection.scopes,
        })
    }

    try {
        const tokenBundle = await refreshGoogleAccessToken(connection)
        const accessToken = tokenBundle.accessToken
        const resources = await listGoogleResources(accessToken)
        return NextResponse.json({
            connected: true,
            selectedGoogleAccount: connection.metadata.selectedGoogleAccount || null,
            selectedGoogleLocation: connection.metadata.selectedGoogleLocation || null,
            resources,
            scopes: connection.scopes,
        })
    } catch (error) {
        console.error("Google Business Profile resources could not be loaded", error)
        return NextResponse.json({
            connected: true,
            selectedGoogleAccount: connection.metadata.selectedGoogleAccount || null,
            selectedGoogleLocation: connection.metadata.selectedGoogleLocation || null,
            resources: [],
            resourceError: error instanceof Error ? error.message : "Google Business Profile resources could not be loaded.",
        })
    }
}

export async function PATCH(request: NextRequest, context: { params: { provider: string } }) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const provider = context.params.provider as MarketingProvider
    if (provider !== "meta-pages" && provider !== "google-business-profile") return NextResponse.json({ error: "Unsupported provider." }, { status: 404 })
    const input = selectionSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Select one valid provider resource." }, { status: 400 })
    const connection = await getProviderConnection(provider)
    if (!connection) return NextResponse.json({ error: "Connect the provider before selecting an account." }, { status: 409 })

    if (provider === "meta-pages") {
        if (!input.data.pageId || input.data.accountName || input.data.locationName) return NextResponse.json({ error: "Select a Facebook Page." }, { status: 400 })
        const bundle = connection.tokenBundle as MetaTokenBundle
        const page = bundle.pages.find((item) => item.id === input.data.pageId)
        if (!page) return NextResponse.json({ error: "That Page is not available to the connected Meta account." }, { status: 404 })
        await saveProviderConnection({
            provider,
            tokenBundle: bundle,
            providerAccountId: page.id,
            providerAccountName: page.name,
            metadata: { ...connection.metadata, selectedPageId: page.id },
            scopes: connection.scopes,
            actor,
        })
    } else {
        if (!input.data.accountName || !input.data.locationName || input.data.pageId) return NextResponse.json({ error: "Select a Google account and location." }, { status: 400 })
        const tokenBundle = await refreshGoogleAccessToken(connection)
        const accessToken = tokenBundle.accessToken
        const resources = await listGoogleResources(accessToken)
        const account = resources.find((item) => item.name === input.data.accountName)
        const location = account?.locations.find((item) => item.name === input.data.locationName)
        if (!account || !location) return NextResponse.json({ error: "That Google Business Profile location is not available to the connected account." }, { status: 404 })
        await saveProviderConnection({
            provider,
            tokenBundle,
            providerAccountId: account.name,
            providerAccountName: account.accountName,
            metadata: {
                ...connection.metadata,
                selectedGoogleAccount: account.name,
                selectedGoogleAccountName: account.accountName,
                selectedGoogleLocation: location.name,
                selectedGoogleLocationTitle: location.title,
            },
            scopes: connection.scopes,
            actor,
        })
    }

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Provider connections database is not configured." }, { status: 503 })
    await database.query(
        `insert into nxg_integrations (company_id, provider, enabled, updated_by)
         values ($1, $2, true, $3)
         on conflict (company_id, provider) do update set enabled = true, updated_by = excluded.updated_by, updated_at = now()`,
        [NXG_COMPANY_ID, provider, actor],
    )
    return NextResponse.json({ selected: true })
}

export async function DELETE(_request: NextRequest, context: { params: { provider: string } }) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const provider = context.params.provider as MarketingProvider
    if (provider !== "meta-pages" && provider !== "google-business-profile") return NextResponse.json({ error: "Unsupported provider." }, { status: 404 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Provider connections database is not configured." }, { status: 503 })
    const client = await database.connect()
    try {
        await client.query("begin")
        await client.query(
            "delete from nxg_provider_connections where company_id = $1 and provider = $2",
            [NXG_COMPANY_ID, provider],
        )
        await client.query(
            `insert into nxg_integrations (company_id, provider, enabled, updated_by)
             values ($1, $2, false, $3)
             on conflict (company_id, provider) do update set enabled = false, updated_by = excluded.updated_by, updated_at = now()`,
            [NXG_COMPANY_ID, provider, actor],
        )
        await client.query(
            `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
             values ($1, $2, 'provider.oauth.disconnected', 'integration', $3)`,
            [NXG_COMPANY_ID, actor, provider],
        )
        await client.query("commit")
        return NextResponse.json({ disconnected: true })
    } catch (error) {
        await client.query("rollback").catch(() => undefined)
        console.error("OAuth provider disconnect failed", error)
        return NextResponse.json({ error: "Provider credentials could not be removed." }, { status: 500 })
    } finally {
        client.release()
    }
}
