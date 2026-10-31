import { NextResponse } from "next/server"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { isIntegrationEnabled } from "@/lib/integration-state"
import { getProviderConnection, refreshGoogleAccessToken } from "@/lib/marketing-oauth"

export const runtime = "nodejs"

async function providerMessage(response: Response) {
    const body = await response.json().catch(() => null) as { error?: { message?: string }; message?: string } | null
    return body?.error?.message || body?.message || `Google Business Profile returned HTTP ${response.status}.`
}

export async function POST() {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    if (!(await isIntegrationEnabled("google-business-profile"))) return NextResponse.json({ error: "Enable Google Business Profile after connecting and selecting a location." }, { status: 409 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Business profile database is not configured." }, { status: 503 })
    const connection = await getProviderConnection("google-business-profile")
    const locationName = connection?.metadata.selectedGoogleLocation
    if (!connection || !locationName) return NextResponse.json({ error: "Connect Google Business Profile and select a location first." }, { status: 409 })

    const { rows } = await database.query(
        `select display_name as "displayName", address_line_1 as "addressLine1", address_line_2 as "addressLine2",
                city, region, postal_code as "postalCode", website
         from nxg_business_profiles where company_id = $1`,
        [NXG_COMPANY_ID],
    )
    const profile = rows[0]
    if (!profile) return NextResponse.json({ error: "Save the business profile before syncing it." }, { status: 409 })
    const locationPath = locationName.split("/").map(encodeURIComponent).join("/")
    const updateMask = "title,storefrontAddress,websiteUri"
    try {
        const accessToken = await refreshGoogleAccessToken(connection)
        const response = await fetch(
            `https://mybusinessbusinessinformation.googleapis.com/v1/${locationPath}?updateMask=${updateMask}`,
            {
                method: "PATCH",
                headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: profile.displayName,
                    storefrontAddress: {
                        regionCode: "US",
                        languageCode: "en",
                        postalCode: profile.postalCode,
                        administrativeArea: profile.region,
                        locality: profile.city,
                        addressLines: [profile.addressLine1, profile.addressLine2].filter(Boolean),
                    },
                    websiteUri: profile.website,
                }),
                cache: "no-store",
                signal: AbortSignal.timeout(15000),
            },
        )
        if (!response.ok) throw new Error(await providerMessage(response))
        await database.query(
            `insert into nxg_external_publish_events (company_id, provider, entity_type, entity_id, actor, status)
             values ($1, 'google-business-profile', 'business_profile', $2, $3, 'published')`,
            [NXG_COMPANY_ID, NXG_COMPANY_ID, actor],
        )
        await database.query(
            `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
             values ($1, $2, 'business-profile.synced', 'business_profile', $1)`,
            [NXG_COMPANY_ID, actor],
        )
        return NextResponse.json({ synced: true, fields: ["displayName", "address", "website"] })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Google Business Profile sync failed."
        console.error("Google Business Profile sync failed", error)
        await database.query(
            `insert into nxg_external_publish_events (company_id, provider, entity_type, entity_id, actor, status, error_message)
             values ($1, 'google-business-profile', 'business_profile', $2, $3, 'failed', $4)`,
            [NXG_COMPANY_ID, NXG_COMPANY_ID, actor, message.slice(0, 500)],
        )
        return NextResponse.json({ error: message }, { status: 502 })
    }
}
