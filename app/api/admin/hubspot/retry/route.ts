import { NextResponse } from "next/server"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { isIntegrationEnabled } from "@/lib/integration-state"
import { syncLeadToHubSpot } from "@/lib/hubspot"

export const runtime = "nodejs"

export async function POST() {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN || !(await isIntegrationEnabled("hubspot"))) {
        return NextResponse.json({ error: "Enable HubSpot and configure its private app token before retrying." }, { status: 409 })
    }

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "CRM database is not configured." }, { status: 503 })
    const pending = await database.query(
        `select id, name, email, phone, lead_type as "leadType", service
    from nxg_leads where company_id = $1 and hubspot_sync_status in ('pending', 'failed', 'disabled', 'not_configured')
     order by created_at asc limit 50`,
        [NXG_COMPANY_ID],
    )

    let synced = 0
    let failed = 0
    for (const lead of pending.rows) {
        try {
            const result = await syncLeadToHubSpot(lead)
            await database.query(
                "update nxg_leads set hubspot_sync_status = $1, hubspot_contact_id = $2 where id = $3 and company_id = $4",
                [result.status, result.status === "synced" ? result.contactId : null, lead.id, NXG_COMPANY_ID],
            )
            if (result.status === "synced") synced += 1
        } catch (error) {
            failed += 1
            console.error("HubSpot retry failed", error)
            await database.query(
                "update nxg_leads set hubspot_sync_status = 'failed' where id = $1 and company_id = $2",
                [lead.id, NXG_COMPANY_ID],
            ).catch(() => undefined)
        }
    }

    return NextResponse.json({ attempted: pending.rows.length, synced, failed })
}