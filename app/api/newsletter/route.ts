import { NextResponse } from "next/server"
import { z } from "zod"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254),
  consent: z.literal(true),
  websiteTrap: z.string().max(200).optional(),
})

export async function POST(request: Request) {
  const input = newsletterSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Enter a valid email and confirm the signup request." }, { status: 400 })
  if (input.data.websiteTrap) return NextResponse.json({ accepted: true }, { status: 202 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Newsletter signup is temporarily unavailable." }, { status: 503 })

  try {
    await database.query(
      `insert into nxg_newsletter_subscribers (company_id, email, source)
       values ($1, lower($2), 'blog')
       on conflict (company_id, email) do update set consented_at = now(), status = 'pending_confirmation'`,
      [NXG_COMPANY_ID, input.data.email],
    )
    return NextResponse.json({ accepted: true, status: "pending_confirmation" }, { status: 202 })
  } catch (error) {
    console.error("Newsletter signup save failed", error)
    return NextResponse.json({ error: "Newsletter signup could not be saved." }, { status: 500 })
  }
}