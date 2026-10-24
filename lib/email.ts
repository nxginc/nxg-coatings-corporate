import nodemailer from "nodemailer"
import { SMTP_TIMEOUTS } from "@/lib/timeouts.mjs"

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export function isSmtpConfigured() {
  const port = Number(process.env.SMTP_PORT)
  const secure = process.env.SMTP_SECURE?.trim().toLowerCase() || "false"

  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      Number.isInteger(port) &&
      port > 0 &&
      port <= 65535 &&
      ["true", "false"].includes(secure) &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim() &&
      process.env.FROM_EMAIL?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim(),
  )
}

export async function sendEmail({ to, subject, html, text, replyTo }: EmailData) {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, and CONTACT_TO_EMAIL are required.")
  }

  const port = Number(process.env.SMTP_PORT)
  const secure = process.env.SMTP_SECURE?.trim().toLowerCase() === "true"

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim(),
    port,
    secure,
    requireTLS: !secure,
    ...SMTP_TIMEOUTS,
    auth: {
      user: process.env.SMTP_USER?.trim(),
      pass: process.env.SMTP_PASS?.trim(),
    },
  })

  try {
    return await transporter.sendMail({
      from: process.env.FROM_EMAIL?.trim(),
      to,
      subject,
      html,
      text,
      replyTo,
    })
  } finally {
    transporter.close()
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }
    return entities[character]
  })
}

export function generateContactEmailTemplate(data: {
  name: string
  email: string
  phone?: string
  message: string
  service?: string
}) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const phone = data.phone ? escapeHtml(data.phone) : ""
  const service = data.service ? escapeHtml(data.service) : ""
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br />")

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
              <div class="label">Name:</div>
              <div>${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${email}</div>
            </div>
            ${phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div>${phone}</div>
            </div>
            ` : ''}
            ${service ? `
            <div class="field">
              <div class="label">Service:</div>
              <div>${service}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div>${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the NXG Coatings website contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}\n` : ''}${data.service ? `Service: ${data.service}\n` : ''}
Message:
${data.message}

This email was sent from the NXG Coatings website contact form.
  `

  return { html, text }
}

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
  service?: string
}) {
  const recipient = process.env.CONTACT_TO_EMAIL?.trim()
  if (!recipient) throw new Error("CONTACT_TO_EMAIL is not configured.")

  const template = generateContactEmailTemplate(data)
  const info = await sendEmail({
    to: recipient,
    subject: `Website inquiry from ${data.name}`,
    html: template.html,
    text: template.text,
    replyTo: data.email,
  })

  return { success: true as const, messageId: info.messageId }
}