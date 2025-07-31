import { NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Send emails (customer confirmation + company notification)
    const emailResult = await sendContactEmail({ name, email, phone, message })

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error)
      // Still return success to user, but log the email failure
    }

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: "Thank you for your message! We'll be in touch soon.",
      messageId: emailResult.messageId 
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
