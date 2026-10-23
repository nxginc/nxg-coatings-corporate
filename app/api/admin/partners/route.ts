import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const reviewSchema = z.object({
    id: z.string().uuid(),
    status: z.enum(["pending_review", "approved", "rejected", "suspended"]),
})

export async function GET() {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Partner database is not configured." }, { status: 503 })

    const { rows } = await database.query(
        `select id, created_at as "createdAt", status, company, contact_name as "contactName", email, phone,
            trade, service_areas as "serviceAreas", website, license_number as "licenseNumber",
                 insurance_provider as "insuranceProvider", years_in_business as "yearsInBusiness",
                 message, directory_consent as "directoryConsent"
             from nxg_partner_applications where company_id = $1 order by created_at desc limit 200`,
        [NXG_COMPANY_ID],
    )
    return NextResponse.json({ applications: rows })
}

export async function PATCH(request: Request) {
    const adminEmail = await getAdminEmail()
    if (!adminEmail) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const review = reviewSchema.safeParse(await request.json().catch(() => null))
    if (!review.success) return NextResponse.json({ error: "Invalid partner review update." }, { status: 400 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Partner database is not configured." }, { status: 503 })
    const client = await database.connect()
    try {
        await client.query("begin")
        const { rows } = await client.query(
            "update nxg_partner_applications set status = $1 where id = $2 and company_id = $3 returning id, status",
            [review.data.status, review.data.id, NXG_COMPANY_ID],
        )
        if (!rows[0]) {
            await client.query("rollback")
            return NextResponse.json({ error: "Application not found." }, { status: 404 })
        }
        await client.query(
            `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id, details)
             values ($1, $2, $3, 'partner_application', $4, $5::jsonb)`,
            [NXG_COMPANY_ID, adminEmail, `partner_application.${review.data.status}`, review.data.id, JSON.stringify({ status: review.data.status })],
        )
        await client.query("commit")
        return NextResponse.json({ application: rows[0], reviewedBy: adminEmail })
    } catch (error) {
        await client.query("rollback").catch(() => undefined)
        console.error("Partner review update failed", error)
        return NextResponse.json({ error: "Partner review could not be saved." }, { status: 500 })
    } finally {
        client.release()
    }
}