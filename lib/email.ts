import nodemailer from 'nodemailer'

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailData) {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  // Send email
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL || 'noreply@nxgcoatings.com',
    to,
    subject,
    html,
    text,
  })

  return info
}

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
  service?: string
}) {
  const html = generateContactEmailTemplate(data)

  return await sendEmail({
    to: process.env.CONTACT_EMAIL || 'contact@nxgcoatings.com',
    subject: `New Contact Form Submission from ${data.name}`,
    html,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nService: ${data.service || 'Not specified'}\nMessage: ${data.message}`
  })
}

export function generateContactEmailTemplate(data: {
  name: string
  email: string
  phone?: string
  message: string
  service?: string
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f8f9fa; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1e40af; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${data.name}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${data.phone || 'Not provided'}
            </div>
            <div class="field">
              <span class="label">Service:</span> ${data.service || 'Not specified'}
            </div>
            <div class="field">
              <span class="label">Message:</span> ${data.message}
            </div>
          </div>
          <div class="footer">
            <p>This message was sent from the NXG Coatings website contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return html
}
