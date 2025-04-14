import nodemailer from "nodemailer"

// Create a transporter with hardcoded demo credentials
export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "demo@example.com", // Demo email (not real)
    pass: "demopassword", // Demo password (not real)
  },
})

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  try {
    const { name, email, phone, message } = data

    // For demo purposes, just log the data instead of sending an email
    console.log("Contact form submission:", { name, email, phone, message })

    // Return success without actually sending email
    return { success: true, messageId: `demo-${Date.now()}` }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}
