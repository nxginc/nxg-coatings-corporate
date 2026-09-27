import { NextResponse } from "next/server"
import { generateContactEmailTemplate, sendEmail } from "@/lib/email"
import { getDatabase } from "@/lib/db"
import { NXG_COMPANY_ID } from "@/lib/company"
import { syncLeadToHubSpot } from "@/lib/hubspot"
import { isIntegrationEnabled } from "@/lib/integration-state"
import { contactSubmissionSchema } from "@/lib/submission-schemas"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const submission = contactSubmissionSchema.safeParse(body)
    if (!submission.success) {
      return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 })
    }

    if (submission.data.website) return NextResponse.json({ success: true }, { status: 202 })

    const database = getDatabase()
    if (!database) return NextResponse.json({ error: "Submissions are temporarily unavailable." }, { status: 503 })

    const referrer = request.headers.get("referer")
    let landingPath: string | null = null
    let attribution: string[] = []
    if (referrer) {
      try {
        const referrerUrl = new URL(referrer)
        landingPath = referrerUrl.pathname.slice(0, 500)
        attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map((key) => referrerUrl.searchParams.get(key)?.slice(0, 200) || "")
      } catch {
        landingPath = null
      }
    }

    const { rows } = await database.query(
      `insert into nxg_leads
        (company_id, lead_type, name, email, phone, service, project_type, address, message, preferred_date, preferred_time, landing_path, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
       values ($1, $2, $3, lower($4), nullif($5, ''), nullif($6, ''), nullif($7, ''), nullif($8, ''), $9, nullif($10, '')::date, nullif($11, ''), $12, nullif($13, ''), nullif($14, ''), nullif($15, ''), nullif($16, ''), nullif($17, ''))
       returning id`,
      [NXG_COMPANY_ID, submission.data.type || "contact", submission.data.name, submission.data.email, submission.data.phone || "", submission.data.service || "", submission.data.projectType || "", submission.data.address || "", submission.data.message, submission.data.preferredDate || "", submission.data.preferredTime || "", landingPath, ...attribution],
    )

    let hubspotSyncStatus: "synced" | "failed" | "not_configured" | "disabled" = "not_configured"
    if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      hubspotSyncStatus = "not_configured"
    } else if (!(await isIntegrationEnabled("hubspot"))) {
      hubspotSyncStatus = "disabled"
    } else {
      try {
        const syncResult = await syncLeadToHubSpot({
          name: submission.data.name,
          email: submission.data.email,
          phone: submission.data.phone || undefined,
          leadType: submission.data.type || "contact",
          service: submission.data.projectType || submission.data.service || undefined,
        })
        hubspotSyncStatus = syncResult.status
        await database.query(
          "update nxg_leads set hubspot_sync_status = $1, hubspot_contact_id = $2 where id = $3 and company_id = $4",
          [syncResult.status, syncResult.status === "synced" ? syncResult.contactId : null, rows[0].id, NXG_COMPANY_ID],
        )
      } catch (syncError) {
        hubspotSyncStatus = "failed"
        await database.query("update nxg_leads set hubspot_sync_status = 'failed' where id = $1 and company_id = $2", [rows[0].id, NXG_COMPANY_ID]).catch(() => undefined)
        console.error("HubSpot lead sync failed", syncError)
      }
    }
    if (hubspotSyncStatus === "disabled" || hubspotSyncStatus === "not_configured") {
      await database.query(
        "update nxg_leads set hubspot_sync_status = $1 where id = $2 and company_id = $3",
        [hubspotSyncStatus, rows[0].id, NXG_COMPANY_ID],
      )
    }

    if (process.env.SMTP_HOST && process.env.CONTACT_TO_EMAIL) {
      const emailContent = generateContactEmailTemplate({
        name: submission.data.name,
        email: submission.data.email,
        phone: submission.data.phone || undefined,
        service: submission.data.projectType || submission.data.service || undefined,
        message: submission.data.message,
      })
      try {
        await sendEmail({ to: process.env.CONTACT_TO_EMAIL, subject: "New NXG website inquiry", ...emailContent })
      } catch (emailError) {
        console.error("Contact notification delivery failed", emailError)
      }
    }

    return NextResponse.json({ success: true, id: rows[0].id, hubspotSyncStatus, message: "Your request has been received." }, { status: 201 })
  } catch (error) {
    console.error("Contact submission failed", error)
    return NextResponse.json({ error: "Your request could not be saved. Please try again." }, { status: 500 })
  }
}
