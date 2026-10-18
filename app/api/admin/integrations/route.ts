import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { getIntegrationReadiness, integrationCatalog } from "@/lib/integrations"

export const runtime = "nodejs"

const updateSchema = z.object({
    provider: z.string().min(1),
    enabled: z.boolean(),
})

export async function GET() {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const database = getDatabase()
    const enabledByProvider = new Map<string, boolean>()

    if (database) {
        const { rows } = await database.query(
            "select provider, enabled from nxg_integrations where company_id = $1",
            [NXG_COMPANY_ID],
        )
        for (const row of rows) enabledByProvider.set(row.provider, row.enabled)
    }

    const providers = integrationCatalog.map((definition) => {
        const readiness = getIntegrationReadiness(definition)
        return {
            ...readiness,
            enabled: enabledByProvider.get(definition.id) || false,
            adminStoreConfigured: Boolean(database),
        }
    })

    return NextResponse.json({ companyId: NXG_COMPANY_ID, providers })
}

export async function PATCH(request: Request) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const input = updateSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Invalid integration update." }, { status: 400 })

    const definition = integrationCatalog.find((provider) => provider.id === input.data.provider)
    if (!definition) return NextResponse.json({ error: "Unknown integration provider." }, { status: 404 })
    const readiness = getIntegrationReadiness(definition)
    if (input.data.enabled && (definition.connection === "manual_only" || !readiness.configured)) {
        return NextResponse.json({ error: "Configure the required server-side settings before enabling this provider.", missingEnv: readiness.missingEnv }, { status: 409 })
    }

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Integration settings database is not configured." }, { status: 503 })

    try {
        const { rows } = await database.query(
            `insert into nxg_integrations (company_id, provider, enabled, updated_by)
       values ($1, $2, $3, $4)
       on conflict (company_id, provider) do update set enabled = excluded.enabled, updated_by = excluded.updated_by, updated_at = now()
       returning provider, enabled, updated_at as "updatedAt"`,
            [NXG_COMPANY_ID, definition.id, input.data.enabled, actor],
        )
        await database.query(
            "insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id) values ($1, $2, $3, 'integration', $4)",
            [NXG_COMPANY_ID, actor, input.data.enabled ? "integration.enabled" : "integration.disabled", definition.id],
        )
        return NextResponse.json({ integration: rows[0] })
    } catch (error) {
        console.error("Integration setting update failed", error)
        return NextResponse.json({ error: "Integration setting could not be saved." }, { status: 500 })
    }
}