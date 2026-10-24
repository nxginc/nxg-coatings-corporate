import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth"
import { getCompanyId, queryRows } from "@/lib/db"
import { isDatabaseQueryTimeout } from "@/lib/timeouts.mjs"

const PAGE_SIZE = 25

export async function GET(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

  if (!process.env.DATABASE_URL || !process.env.NXG_COMPANY_ID) {
    return NextResponse.json({ error: "Partner application storage is not configured." }, { status: 503 })
  }

  const requestedPage = new URL(request.url).searchParams.get("page") ?? "1"
  if (!/^[1-9]\d*$/.test(requestedPage) || !Number.isSafeInteger(Number(requestedPage))) {
    return NextResponse.json({ error: "Page must be a positive whole number." }, { status: 400 })
  }

  try {
    const companyId = getCompanyId()
    const [{ total: totalText }] = await queryRows<{ total: string }>(
      `SELECT count(*)::text AS total
       FROM nxg_partner_applications
       WHERE company_id = $1`,
      [companyId],
    )
    const total = Number(totalText)
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
    const page = Math.min(Number(requestedPage), totalPages)
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
       ORDER BY created_at DESC, id DESC
       LIMIT $2 OFFSET $3`,
      [companyId, PAGE_SIZE, (page - 1) * PAGE_SIZE],
    )
    return NextResponse.json({
      applications,
      pagination: { page, pageSize: PAGE_SIZE, total, totalPages },
    })
  } catch (error) {
    if (isDatabaseQueryTimeout(error)) {
      console.error("Partner application list exceeded the database statement timeout.")
      return NextResponse.json(
        { error: "Partner applications took too long to load. Please try again." },
        { status: 504 },
      )
    }

    console.error("Partner application list could not be loaded.", error)
    return NextResponse.json({ error: "Partner applications could not be loaded." }, { status: 500 })
  }
}
