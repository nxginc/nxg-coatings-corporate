import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth"
import { getCompanyId, queryRows } from "@/lib/db"

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

  if (!process.env.DATABASE_URL || !process.env.NXG_COMPANY_ID) {
    return NextResponse.json({ error: "Partner application storage is not configured." }, { status: 503 })
  }

  try {
    const applications = await queryRows<{
      id: string
      nxg_id: string
      contact_name: string
      company_name: string
      email: string
      phone: string | null
      trade_types: string[]
      service_areas: string[]
      website_url: string | null
      experience_summary: string | null
      status: string
      created_at: Date
    }>(
      `SELECT id, nxg_id, contact_name, company_name, email, phone, trade_types,
              service_areas, website_url, experience_summary, status, created_at
       FROM nxg_partner_applications
       WHERE company_id = $1
       ORDER BY created_at DESC
       LIMIT 100`,
      [getCompanyId()],
    )
    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Partner application list could not be loaded.", error)
    return NextResponse.json({ error: "Partner applications could not be loaded." }, { status: 500 })
  }
}
