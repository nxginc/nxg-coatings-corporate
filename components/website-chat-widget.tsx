"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Send, X } from "lucide-react"
import type { ChatMessage, ChatSuggestion } from "@/lib/chat-assistant"

const storageKey = "nxg-website-chat-v1"
const greeting: ChatMessage = {
  role: "assistant",
  content: "Hi, I’m NXG’s website assistant. Ask about services, service areas, estimates, or consultation requests. This chat is asynchronous, not live staffed support.",
  createdAt: "",
}

type SavedSession = { conversationId: string; sessionToken: string }

async function readResponse(response: Response) {
  return response.json().catch(() => null)
}

export default function WebsiteChatWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState<SavedSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([greeting])
  const [suggestions, setSuggestions] = useState<ChatSuggestion[]>([])
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [connectionIssue, setConnectionIssue] = useState("")
  const [sending, setSending] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    if (!open) return
    const saved = window.sessionStorage.getItem(storageKey)
    if (!saved) return
    try {
      setSession(JSON.parse(saved) as SavedSession)
    } catch {
      window.sessionStorage.removeItem(storageKey)
    }
  }, [open])

  useEffect(() => {
    if (!open || !session) return
    let active = true
    const refresh = async () => {
      try {
        const query = new URLSearchParams({ conversationId: session.conversationId })
        const response = await fetch(`/api/chat?${query}`, { cache: "no-store", headers: { Authorization: `Bearer ${session.sessionToken}` } })
        if (response.status === 404) {
          window.sessionStorage.removeItem(storageKey)
          if (active) setSession(null)
          return
        }
        const result = await readResponse(response)
        if (!response.ok) throw new Error(result?.error || "Chat could not be refreshed.")
        if (!Array.isArray(result?.messages) || !["open", "closed"].includes(result.status)) {
          throw new Error("Chat returned an invalid response.")
        }
        if (active) {
          setMessages(result.messages)
          setClosed(result.status === "closed")
          setConnectionIssue("")
        }
      } catch {
        if (active) setConnectionIssue("Chat updates are temporarily unavailable. We’ll retry automatically.")
      }
    }
    void refresh()
    const interval = window.setInterval(() => void refresh(), 5000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [open, session])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  if (pathname.startsWith("/dashboard") || pathname === "/login") return null

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!message.trim() || sending || closed) return
    setSending(true)
    setError("")
    const text = message.trim()
    setMessage("")
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session ? { Authorization: `Bearer ${session.sessionToken}` } : {}),
        },
        body: JSON.stringify({
          ...(session ? { conversationId: session.conversationId } : {}),
          message: text,
          pagePath: pathname || "/",
        }),
      })
      const result = await readResponse(response)
      if (!response.ok) throw new Error(result?.error || "Your message could not be sent.")
      if (!Array.isArray(result?.messages)) throw new Error("Chat returned an invalid response.")
      if (!session) {
        if (typeof result.conversationId !== "string" || typeof result.sessionToken !== "string") {
          throw new Error("Chat could not start a new conversation.")
        }
        const nextSession = { conversationId: result.conversationId, sessionToken: result.sessionToken }
        window.sessionStorage.setItem(storageKey, JSON.stringify(nextSession))
        setSession(nextSession)
      }
      setMessages(result.messages)
      setSuggestions(result.suggestions || [])
      setClosed(result.status === "closed")
      setConnectionIssue("")
    } catch (sendError) {
      setMessage(text)
      setError(sendError instanceof Error ? sendError.message : "Your message could not be sent.")
    } finally {
      setSending(false)
    }
  }

  function startNewConversation() {
    window.sessionStorage.removeItem(storageKey)
    setSession(null)
    setMessages([greeting])
    setSuggestions([])
    setClosed(false)
    setError("")
  }

  return <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
    <section id="client-chat-panel" aria-label="Chat with NXG" hidden={!open} className="mb-3 flex max-h-[min(38rem,calc(100svh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col border border-[var(--nxg-line)] bg-white shadow-2xl">
      <header className="flex items-start justify-between gap-4 bg-[var(--nxg-navy)] p-4 text-white">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65">NXG Coatings</p><h2 className="mt-1 text-lg font-semibold">How can we help?</h2><p className="mt-1 text-xs text-white/70">Website assistant · replies from the team are asynchronous</p></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 shrink-0 place-items-center border border-white/35"><X className="h-4 w-4" /></button>
      </header>
      <div aria-live="polite" aria-relevant="additions text" className="min-h-48 flex-1 space-y-3 overflow-y-auto p-4">
        {connectionIssue && <p role="status" className="border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-950">{connectionIssue}</p>}
        {messages.map((item, index) => <div key={`${item.createdAt}-${index}`} className={`max-w-[90%] ${item.role === "visitor" ? "ml-auto" : ""}`}>
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--nxg-muted)]">{item.role === "visitor" ? "You" : item.role === "team" ? "NXG team" : "NXG assistant"}</p>
          <p className={`whitespace-pre-wrap break-words border p-3 text-sm leading-6 ${item.role === "visitor" ? "border-[var(--nxg-navy)] bg-[var(--nxg-navy)] text-white" : "border-[var(--nxg-line)] bg-[var(--nxg-paper)] text-[var(--nxg-charcoal)]"}`}>{item.content}</p>
        </div>)}
      </div>
      {suggestions.length > 0 && <nav aria-label="Suggested actions" className="flex flex-wrap gap-2 px-4 pb-3">{suggestions.map((item) => <Link key={item.href} href={item.href} className="border border-[var(--nxg-line)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.07em] text-[var(--nxg-navy)] hover:border-[var(--nxg-red)]">{item.label}</Link>)}</nav>}
      {closed ? <div className="border-t border-[var(--nxg-line)] p-4"><p className="text-sm text-[var(--nxg-muted)]">This conversation is closed. Contact NXG if you need more help.</p><button type="button" onClick={startNewConversation} className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--nxg-red)] underline">Start a new conversation</button></div> : <form onSubmit={(event) => void sendMessage(event)} className="border-t border-[var(--nxg-line)] p-3">
        {error && <p role="alert" className="mb-2 text-xs text-red-800">{error}</p>}
        <label htmlFor="client-chat-message" className="sr-only">Your message</label>
        <div className="flex items-end gap-2"><textarea id="client-chat-message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={2000} rows={2} placeholder="Write a message..." className="min-h-12 flex-1 resize-none border border-[var(--nxg-line)] p-3 text-sm focus:border-[var(--nxg-navy)]" /><button type="submit" disabled={sending || !message.trim()} aria-label="Send message" className="grid h-12 w-12 shrink-0 place-items-center bg-[var(--nxg-red)] text-white disabled:opacity-50">{sending ? <span className="text-[10px]">...</span> : <Send className="h-4 w-4" />}</button></div>
      </form>}
    </section>
    <button type="button" aria-expanded={open} aria-controls="client-chat-panel" onClick={() => { setOpen((current) => !current); setError("") }} className="ml-auto flex min-h-12 items-center gap-3 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.11em] text-white shadow-lg transition hover:bg-[var(--nxg-navy)]">
      {open ? <X className="h-4 w-4" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
      {open ? "Close" : "Chat with NXG"}
    </button>
  </div>
}
