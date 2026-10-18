import { timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth-options"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const statusSchema = z.object({
    id: z.string().uuid(),
    status: z.enum(["new", "contacted", "qualified", "closed", "spam"]),
})

async function isAuthorized(request: Request) {
    const expectedToken = process.env.CRM_API_TOKEN
    const suppliedToken = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1]
    if (expectedToken && suppliedToken) {
        const expected = Buffer.from(expectedToken)
        const supplied = Buffer.from(suppliedToken)
        if (expected.length === supplied.length && timingSafeEqual(expected, supplied)) return true
    }

    const session = await getServerSession(authOptions)
    return Boolean(session?.user)
}

export async function GET(request: Request) {
    if (!(await isAuthorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "CRM database is not configured." }, { status: 503 })

    try {
        const { rows } = await database.query(
            `select id, created_at as "createdAt", status, lead_type as type, name, email, phone, service,
            project_type as "projectType", message, landing_path as "landingPath", utm_campaign as campaign
        from nxg_leads where company_id = $1 order by created_at desc limit 100`,
            [NXG_COMPANY_ID],
        )
        return NextResponse.json({ leads: rows })
    } catch (error) {
        console.error("CRM lead list failed", error)
        return NextResponse.json({ error: "CRM records could not be loaded." }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    if (!(await isAuthorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const input = statusSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Invalid lead status update." }, { status: 400 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "CRM database is not configured." }, { status: 503 })

    try {
        const { rows } = await database.query(
            "update nxg_leads set status = $1 where id = $2 and company_id = $3 returning id, status",
            [input.data.status, input.data.id, NXG_COMPANY_ID],
        )
        if (!rows[0]) return NextResponse.json({ error: "Lead not found." }, { status: 404 })
        return NextResponse.json({ lead: rows[0] })
    } catch (error) {
        console.error("CRM lead update failed", error)
        return NextResponse.json({ error: "CRM record could not be updated." }, { status: 500 })
    }
}