import { createHash, randomBytes } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getChatReply } from "@/lib/chat-assistant"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export const runtime = "nodejs"

const messageSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z.string().trim().min(1).max(2000),
  pagePath: z.string().startsWith("/").max(300).optional(),
})

const sessionIdSchema = z.string().uuid()
const sessionTokenSchema = z.string().min(32).max(128)

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex")
}

export async function GET(request: Request) {
  const conversationId = sessionIdSchema.safeParse(new URL(request.url).searchParams.get("conversationId"))
  const sessionToken = sessionTokenSchema.safeParse(request.headers.get("authorization")?.replace(/^Bearer\s+/i, ""))
  if (!conversationId.success || !sessionToken.success) return NextResponse.json({ error: "Invalid chat session." }, { status: 400 })

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Chat is temporarily unavailable." }, { status: 503 })
  const { rows } = await database.query(
    `select messages, status from nxg_chat_conversations
     where id = $1 and company_id = $2 and visitor_token_hash = $3`,
    [conversationId.data, NXG_COMPANY_ID, hashToken(sessionToken.data)],
  )
  if (!rows[0]) return NextResponse.json({ error: "Chat session not found." }, { status: 404 })
  return NextResponse.json({ messages: rows[0].messages, status: rows[0].status })
}

export async function POST(request: Request) {
  const input = messageSchema.safeParse(await request.json().catch(() => null))
  if (!input.success) return NextResponse.json({ error: "Please enter a message of up to 2,000 characters." }, { status: 400 })
  const tokenValue = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  const sessionToken = tokenValue ? sessionTokenSchema.safeParse(tokenValue) : null
  if ((Boolean(input.data.conversationId) && !sessionToken?.success) || (!input.data.conversationId && tokenValue)) {
    return NextResponse.json({ error: "Invalid chat session." }, { status: 400 })
  }
  const sessionTokenHash = sessionToken?.success ? hashToken(sessionToken.data) : null

  const database = getDatabase()
  if (!database) return NextResponse.json({ error: "Chat is temporarily unavailable." }, { status: 503 })

  const reply = getChatReply(input.data.message)
  const visitorMessage = input.data.message

  if (!input.data.conversationId) {
    const sessionToken = randomBytes(32).toString("base64url")
    const { rows } = await database.query(
      `insert into nxg_chat_conversations (company_id, visitor_token_hash, page_path, messages)
       values ($1, $2, $3, jsonb_build_array(
         jsonb_build_object('role', 'visitor', 'content', $4, 'createdAt', now()),
         jsonb_build_object('role', 'assistant', 'content', $5, 'createdAt', now())
       ))
       returning id, messages, status`,
      [NXG_COMPANY_ID, hashToken(sessionToken), input.data.pagePath || "/", visitorMessage, reply.reply],
    )
    return NextResponse.json({ conversationId: rows[0].id, sessionToken, messages: rows[0].messages, suggestions: reply.suggestions }, { status: 201 })
  }
  if (!sessionTokenHash) return NextResponse.json({ error: "Invalid chat session." }, { status: 400 })

  const { rows } = await database.query(
    `update nxg_chat_conversations
     set messages = messages || jsonb_build_array(
       jsonb_build_object('role', 'visitor', 'content', $4, 'createdAt', now()),
       jsonb_build_object('role', 'assistant', 'content', $5, 'createdAt', now())
     ), last_message_at = now()
     where id = $1 and company_id = $2 and visitor_token_hash = $3 and status = 'open'
       and last_message_at < now() - interval '1 second'
       and jsonb_array_length(messages) < 100
     returning messages, status`,
    [input.data.conversationId, NXG_COMPANY_ID, sessionTokenHash, visitorMessage, reply.reply],
  )
  if (!rows[0]) return NextResponse.json({ error: "This conversation is closed or messages are arriving too quickly. Please wait a moment or start a new conversation." }, { status: 409 })
  return NextResponse.json({ messages: rows[0].messages, status: rows[0].status, suggestions: reply.suggestions })
}
