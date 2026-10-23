import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminSession } from "@/lib/auth"
import { getCompanyId, withTransaction } from "@/lib/db"

const updateSchema = z.object({
  status: z.enum(["under_review", "approved", "declined"]),
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

  if (!process.env.DATABASE_URL || !process.env.NXG_COMPANY_ID) {
    return NextResponse.json({ error: "Partner application storage is not configured." }, { status: 503 })
  }

  const id = z.string().uuid().safeParse(params.id)
  if (!id.success) {
    return NextResponse.json({ error: "A valid application ID is required." }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "The submitted update is not valid JSON." }, { status: 400 })
  }

  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Choose a valid application status." }, { status: 400 })
  }

  const companyId = getCompanyId()
  const requestId = randomUUID()

  try {
    const result = await withTransaction(async (client) => {
      const updated = await client.query<{ id: string; nxg_id: string; status: string }>(
        `UPDATE nxg_partner_applications
         SET status = $3,
             reviewed_by = $4,
             reviewed_at = now(),
             updated_at = now()
         WHERE company_id = $1
           AND id = $2
           AND (
             (status = 'pending' AND $3 IN ('under_review', 'declined'))
             OR (status = 'under_review' AND $3 IN ('approved', 'declined'))
             OR (status = 'declined' AND $3 = 'under_review')
           )
         RETURNING id, nxg_id, status`,
        [companyId, id.data, parsed.data.status, session.user?.email],
      )

      if (!updated.rows[0]) {
        const exists = await client.query(
          "SELECT 1 FROM nxg_partner_applications WHERE company_id = $1 AND id = $2",
          [companyId, id.data],
        )
        return { application: null, found: (exists.rowCount ?? 0) > 0 }
      }

      await client.query(
        `INSERT INTO nxg_audit_events (
           company_id, request_id, actor_type, actor_email, action,
           entity_type, entity_id, details
         ) VALUES ($1, $2, 'admin', $3, 'partner_application.status_changed',
                   'partner_application', $4, $5)`,
        [
          companyId,
          requestId,
          session.user?.email,
          updated.rows[0].id,
          JSON.stringify({ status: updated.rows[0].status }),
        ],
      )

      return { application: updated.rows[0], found: true }
    })

    if (!result.application) {
      return NextResponse.json(
        { error: result.found ? "That status transition is not allowed." : "Application not found." },
        { status: result.found ? 409 : 404 },
      )
    }

    return NextResponse.json({ application: result.application, requestId })
  } catch (error) {
    console.error("Partner application status could not be updated.", { requestId, error })
    return NextResponse.json(
      { error: "Partner application status could not be updated.", requestId },
      { status: 500 },
    )
  }
}
