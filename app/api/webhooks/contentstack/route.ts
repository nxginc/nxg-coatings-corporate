import { timingSafeEqual } from "node:crypto"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { z } from "zod"
import { NXG_COMPANY_ID } from "@/lib/company"
import { isIntegrationEnabled } from "@/lib/integration-state"

export const runtime = "nodejs"

const eventSchema = z.object({
    companyId: z.string().min(1).max(100),
    paths: z.array(z.string().min(1).max(300)).min(1).max(50),
})

export async function POST(request: Request) {
    const secret = process.env.CONTENTSTACK_WEBHOOK_SECRET
    if (!secret) return NextResponse.json({ error: "Contentstack webhook is not configured." }, { status: 503 })
    if (!(await isIntegrationEnabled("contentstack"))) return NextResponse.json({ error: "Contentstack integration is disabled." }, { status: 503 })

    const suppliedSecret = request.headers.get("x-contentstack-webhook-token") || ""
    const expected = Buffer.from(secret)
    const supplied = Buffer.from(suppliedSecret)
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const event = eventSchema.safeParse(await request.json().catch(() => null))
    if (!event.success) return NextResponse.json({ error: "Invalid revalidation event." }, { status: 400 })
    if (event.data.companyId !== NXG_COMPANY_ID) return NextResponse.json({ error: "Company scope mismatch." }, { status: 403 })

    const paths = [...new Set(event.data.paths)]
    if (paths.some((path) => !path.startsWith("/") || path.startsWith("//") || path.includes(".."))) {
        return NextResponse.json({ error: "Invalid revalidation path." }, { status: 400 })
    }

    for (const path of paths) revalidatePath(path)
    return NextResponse.json({ revalidated: paths })
}