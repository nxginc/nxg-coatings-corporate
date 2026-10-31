import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const actionSchema = z.object({
  conversationId: z.string().uuid(),
  action: z.enum(["reply", "close", "reopen"]),
  message: z.string().trim().min(1).max(4000).optional(),
}).refine((value) => value.action !== "reply" || Boolean(value.message), "A reply is required.")

export async function GET() {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Chat inbox database is not configured." }, { status: 503 })
  const { rows } = await database.query(
    `select id, status, page_path as "pagePath", messages,
            created_at as "createdAt", last_message_at as "lastMessageAt"
     from nxg_chat_conversations where company_id = $1
     order by last_message_at desc limit 100`,
    [NXG_COMPANY_ID],
  )
  return NextResponse.json({ conversations: rows })
}

export async function PATCH(request: Request) {
  const actor = await getAdminEmail()
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const input = actionSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Invalid chat inbox action." }, { status: 400 })
  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Chat inbox database is not configured." }, { status: 503 })

  const client = await database.connect()
  try {
    await client.query("begin")
    const result = input.data.action === "reply"
      ? await client.query(
        `update nxg_chat_conversations
         set messages = messages || jsonb_build_array(
           jsonb_build_object('role', 'team', 'content', $3, 'createdAt', now())
         ), status = 'open', last_message_at = now()
         where id = $1 and company_id = $2
         returning id, status`,
        [input.data.conversationId, NXG_COMPANY_ID, input.data.message],
      )
      : await client.query(
        `update nxg_chat_conversations set status = $3, last_message_at = now()
         where id = $1 and company_id = $2 returning id, status`,
        [input.data.conversationId, NXG_COMPANY_ID, input.data.action === "close" ? "closed" : "open"],
      )

    if (!result.rows[0]) {
      await client.query("rollback")
      return NextResponse.json({ error: "Conversation not found." }, { status: 404 })
    }

    await client.query(
      `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
       values ($1, $2, $3, 'chat_conversation', $4)`,
      [NXG_COMPANY_ID, actor, `chat.${input.data.action}`, input.data.conversationId],
    )
    await client.query("commit")
    return NextResponse.json({ conversation: result.rows[0] })
  } catch (error) {
    await client.query("rollback").catch(() => undefined)
    console.error("Chat inbox action failed", error)
    return NextResponse.json({ error: "Conversation could not be updated." }, { status: 500 })
  } finally {
    client.release()
  }
}
