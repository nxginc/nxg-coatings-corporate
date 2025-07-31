import nodemailer from "nodemailer"

// Create a transporter with hardcoded demo credentials
export const transporter = nodemailer.createTransport({
  host: process.env.IMAP_HOST,
  port: Number(process.env.IMAP_PORT),
  secure: true,
  auth: {
    user: process.env.IMAP_USER,
    pass: process.env.IMAP_PASSWORD,
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

    // Send confirmation email to customer (auto-reply)
    const customerEmailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Thank You for Contacting NXG Coatings!</h1>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to us! We have received your message and our team will review it carefully.
          </p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What happens next?</h3>
            <ul style="color: #374151; line-height: 1.6;">
              <li>Our team will review your request within 24 hours</li>
              <li>We'll contact you to schedule a free consultation</li>
              <li>We'll provide you with a detailed quote for your project</li>
            </ul>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            If you have any urgent questions, please don't hesitate to call us at <strong>(555) 123-4567</strong>.
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            The NXG Coatings Team
          </p>
          
          <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </div>
    `

    // Send notification email to company
    const companyEmailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e40af;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          
          <h3>Message:</h3>
          <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #1e40af;">
            ${message}
          </p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `

    // For demo purposes, log both emails instead of sending
    console.log("=== CUSTOMER CONFIRMATION EMAIL ===")
    console.log(`To: ${email}`)
    console.log(`Subject: Thank you for contacting NXG Coatings - We'll be in touch soon!`)
    console.log("HTML Content:", customerEmailTemplate)
    
    console.log("\n=== COMPANY NOTIFICATION EMAIL ===")
    console.log("To: info@nxgcoatings.com")
    console.log(`Subject: New Contact Form Submission from ${name}`)
    console.log("HTML Content:", companyEmailTemplate)

    // Return success without actually sending email
    return { success: true, messageId: `demo-${Date.now()}` }
  } catch (error) {
    console.error("Error processing email:", error)
    return { success: false, error }
  }
}
