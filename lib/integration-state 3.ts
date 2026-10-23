import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export async function isIntegrationEnabled(provider: string) {
    const database = getDatabase()
    if (!database) return false

    const { rows } = await database.query(
        "select enabled from nxg_integrations where company_id = $1 and provider = $2 limit 1",
        [NXG_COMPANY_ID, provider],
    )
    return rows[0]?.enabled === true
}