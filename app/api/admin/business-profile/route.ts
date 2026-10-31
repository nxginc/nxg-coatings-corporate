import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const profileSchema = z.object({
    displayName: z.string().trim().min(1).max(120),
    addressLine1: z.string().trim().min(1).max(120),
    addressLine2: z.string().trim().max(120).default(""),
    city: z.string().trim().min(1).max(80),
    region: z.string().trim().min(2).max(80),
    postalCode: z.string().trim().min(3).max(20),
    website: z.string().url().max(300),
    email: z.string().email().max(254),
})

const defaultProfile = {
    displayName: "NXG Coatings Inc.",
    addressLine1: "5200 Willson Blvd",
    addressLine2: "Suite 150",
    city: "Edina",
    region: "MN",
    postalCode: "55424",
    website: "https://nxgcoatingsinc.com",
    email: "info@nxgcoatingsinc.com",
}

export async function GET() {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Business profile database is not configured." }, { status: 503 })
    const { rows } = await database.query(
        `select display_name as "displayName", address_line_1 as "addressLine1", address_line_2 as "addressLine2",
                city, region, postal_code as "postalCode", website, email, updated_at as "updatedAt"
         from nxg_business_profiles where company_id = $1`,
        [NXG_COMPANY_ID],
    )
    return NextResponse.json({ profile: rows[0] || defaultProfile })
}

export async function PUT(request: Request) {
    const actor = await getAdminEmail()
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const input = profileSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Business profile fields are invalid." }, { status: 400 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Business profile database is not configured." }, { status: 503 })
    try {
        const { rows } = await database.query(
            `insert into nxg_business_profiles
                (company_id, display_name, address_line_1, address_line_2, city, region, postal_code, website, email, updated_by)
             values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             on conflict (company_id) do update set display_name = excluded.display_name,
                address_line_1 = excluded.address_line_1, address_line_2 = excluded.address_line_2,
                city = excluded.city, region = excluded.region, postal_code = excluded.postal_code,
                website = excluded.website, email = excluded.email, updated_by = excluded.updated_by, updated_at = now()
             returning display_name as "displayName", address_line_1 as "addressLine1", address_line_2 as "addressLine2",
                city, region, postal_code as "postalCode", website, email, updated_at as "updatedAt"`,
            [
                NXG_COMPANY_ID,
                input.data.displayName,
                input.data.addressLine1,
                input.data.addressLine2,
                input.data.city,
                input.data.region,
                input.data.postalCode,
                input.data.website,
                input.data.email,
                actor,
            ],
        )
        await database.query(
            `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
             values ($1, $2, 'business-profile.updated', 'business_profile', $1)`,
            [NXG_COMPANY_ID, actor],
        )
        return NextResponse.json({ profile: rows[0] })
    } catch (error) {
        console.error("Business profile update failed", error)
        return NextResponse.json({ error: "Business profile could not be saved." }, { status: 500 })
    }
}
