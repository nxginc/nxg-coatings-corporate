import { NextResponse } from "next/server"
import { z } from "zod"
import { isSmtpConfigured, sendContactEmail } from "@/lib/email"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(2).max(5000),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ error: "The submitted form data is not valid JSON." }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and message." },
      { status: 400 },
    )
  }

  if (!isSmtpConfigured()) {
    return NextResponse.json(
      { error: "Email delivery is not configured. Please call or email NXG directly." },
      { status: 503 },
    )
  }

  try {
    const emailResult = await sendContactEmail(parsed.data)
    return NextResponse.json({
      success: true,
      message: "Your message was sent to NXG.",
      messageId: emailResult.messageId,
    })
  } catch (error) {
    console.error("Contact form email delivery failed.", error)
    return NextResponse.json(
      { error: "Your message was not sent. Please try again or contact NXG directly." },
      { status: 502 },
    )
  }
}
