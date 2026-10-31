import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"
import { integrationCatalog } from "@/lib/integrations"

export async function isIntegrationEnabled(provider: string) {
    if (!integrationCatalog.some((definition) => definition.id === provider && definition.operational)) return false
    const database = getDatabase()
    if (!database) return false

    const { rows } = await database.query(
        "select enabled from nxg_integrations where company_id = $1 and provider = $2 limit 1",
        [NXG_COMPANY_ID, provider],
    )
    return rows[0]?.enabled === true
}