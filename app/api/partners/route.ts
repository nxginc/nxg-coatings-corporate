import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { NXG_COMPANY_ID } from "@/lib/company"
import { partnerApplicationSchema } from "@/lib/submission-schemas"

export const runtime = "nodejs"

export async function POST(request: Request) {
    const body = await request.json().catch(() => null)
    const application = partnerApplicationSchema.safeParse(body)

    if (!application.success) {
        return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 })
    }

    if (application.data.websiteTrap) return NextResponse.json({ success: true }, { status: 202 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Applications are temporarily unavailable." }, { status: 503 })

    try {
        const { rows } = await database.query(
            `insert into nxg_partner_applications
           (company_id, company, contact_name, email, phone, trade, service_areas, website, license_number, insurance_provider, years_in_business, message, directory_consent)
          values ($1, $2, $3, lower($4), $5, $6, $7, nullif($8, ''), nullif($9, ''), nullif($10, ''), nullif($11, ''), nullif($12, ''), $13)
       returning id`,
            [NXG_COMPANY_ID, application.data.company, application.data.contactName, application.data.email, application.data.phone, application.data.trade, application.data.serviceAreas, application.data.website || "", application.data.licenseNumber || "", application.data.insuranceProvider || "", application.data.yearsInBusiness || "", application.data.message || "", application.data.directoryConsent],
        )

        return NextResponse.json({ success: true, id: rows[0].id }, { status: 201 })
    } catch (error) {
        console.error("Partner application save failed", error)
        return NextResponse.json({ error: "Your application could not be saved. Please try again." }, { status: 500 })
    }
}