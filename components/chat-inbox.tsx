"use client"

import { useCallback, useEffect, useState, type FormEvent } from "react"
import type { ChatMessage } from "@/lib/chat-assistant"

type Conversation = {
  id: string
  status: "open" | "closed"
  pagePath: string
  messages: ChatMessage[]
  createdAt: string
  lastMessageAt: string
}

export default function ChatInbox() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const refresh = useCallback(async (quiet = false) => {
    if (!quiet) {
      setError("")
      setRefreshing(true)
    }
    try {
      const response = await fetch("/api/admin/chat", { cache: "no-store" })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || "Chat inbox could not be loaded.")
      if (!Array.isArray(result?.conversations)) throw new Error("Chat inbox returned an invalid response.")
      setConversations(result.conversations)
      setSelectedId((current) => result.conversations.some((item: Conversation) => item.id === current) ? current : result.conversations[0]?.id || "")
      setError("")
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Chat inbox could not be loaded.")
    } finally {
      setLoading(false)
      if (!quiet) setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
    const interval = window.setInterval(() => void refresh(true), 10_000)
    return () => window.clearInterval(interval)
  }, [refresh])

  async function act(action: "reply" | "close" | "reopen", event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    if (!selectedId) return
    setSaving(true)
    setError("")
    try {
      const response = await fetch("/api/admin/chat", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: selectedId, action, ...(action === "reply" ? { message: reply } : {}) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Conversation could not be updated.")
      setReply("")
      await refresh()
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Conversation could not be updated.")
    } finally {
      setSaving(false)
    }
  }

  const selected = conversations.find((conversation) => conversation.id === selectedId)

  return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5">
        <div><p className="section-kicker">Customer care</p><h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Website chat inbox</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--nxg-muted)]">Review visitor conversations and reply from the NXG team. The website assistant is asynchronous and does not promise live staffing.</p></div>
        <div className="flex items-center gap-3"><span className="text-[10px] text-[var(--nxg-muted)]">Auto-refreshes every 10 seconds</span><button type="button" onClick={() => void refresh()} disabled={refreshing} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] disabled:opacity-60">{refreshing ? "Refreshing..." : "Refresh inbox"}</button></div>
      </header>
      {error && <p role="alert" className="mt-5 border border-red-300 bg-white p-4 text-sm text-red-900">{error}</p>}
      {loading ? <p className="py-12 text-sm text-[var(--nxg-muted)]">Loading conversations...</p> : <div className="mt-6 grid min-h-[34rem] border border-[var(--nxg-line)] bg-white md:grid-cols-[18rem_1fr]">
        <aside aria-label="Conversations" className="border-b border-[var(--nxg-line)] md:border-b-0 md:border-r">
          <div className="flex items-center justify-between border-b border-[var(--nxg-line)] px-4 py-3"><h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)]">Recent</h2><span className="text-xs text-[var(--nxg-muted)]">{conversations.length}</span></div>
          {conversations.length === 0 ? <p className="p-4 text-sm text-[var(--nxg-muted)]">No website conversations yet.</p> : conversations.map((conversation) => {
            const firstMessage = conversation.messages.find((message) => message.role === "visitor")?.content || "New conversation"
            return <button key={conversation.id} type="button" onClick={() => setSelectedId(conversation.id)} aria-pressed={selectedId === conversation.id} className={`block w-full border-b border-[var(--nxg-line)] p-4 text-left ${selectedId === conversation.id ? "bg-[var(--nxg-paper)]" : "hover:bg-[var(--nxg-paper)]"}`}>
              <span className="flex items-center justify-between gap-3"><span className="text-xs font-semibold text-[var(--nxg-navy)]">{conversation.status === "open" ? "Open" : "Closed"}</span><time className="text-[10px] text-[var(--nxg-muted)]">{new Date(conversation.lastMessageAt).toLocaleDateString()}</time></span>
              <span className="mt-2 block truncate text-sm text-[var(--nxg-charcoal)]">{firstMessage}</span>
              <span className="mt-1 block truncate text-xs text-[var(--nxg-muted)]">{conversation.pagePath}</span>
            </button>
          })}</aside>
        <section aria-label="Conversation detail" className="flex min-h-[34rem] flex-col">
          {!selected ? <p className="m-auto p-6 text-sm text-[var(--nxg-muted)]">Select a conversation to view its messages.</p> : <>
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--nxg-line)] px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)]">{selected.status === "open" ? "Open conversation" : "Closed conversation"}</p><p className="mt-1 text-xs text-[var(--nxg-muted)]">Page: {selected.pagePath} · Started {new Date(selected.createdAt).toLocaleString()}</p></div><button type="button" disabled={saving} onClick={() => void act(selected.status === "open" ? "close" : "reopen")} className="min-h-9 border border-[var(--nxg-line)] px-3 text-xs font-semibold uppercase tracking-[0.08em] disabled:opacity-50">{selected.status === "open" ? "Close conversation" : "Reopen"}</button></header>
            <div aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-5">
              {selected.messages.map((message, index) => <div key={`${message.createdAt}-${index}`} className={`max-w-[85%] ${message.role === "visitor" ? "ml-auto" : ""}`}><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--nxg-muted)]">{message.role === "team" ? "NXG team" : message.role === "visitor" ? "Visitor" : "NXG assistant"}</p><p className={`whitespace-pre-wrap break-words border p-3 text-sm leading-6 ${message.role === "visitor" ? "border-[var(--nxg-navy)] bg-[var(--nxg-navy)] text-white" : "border-[var(--nxg-line)] bg-white text-[var(--nxg-charcoal)]"}`}>{message.content}</p></div>)}
            </div>
            <form onSubmit={(event) => void act("reply", event)} className="border-t border-[var(--nxg-line)] p-4">
              <label htmlFor="chat-reply" className="mb-2 block text-xs font-semibold text-[var(--nxg-navy)]">Reply to visitor</label>
              <textarea id="chat-reply" value={reply} onChange={(event) => setReply(event.target.value)} maxLength={4000} required disabled={saving} className="min-h-24 w-full border border-[var(--nxg-line)] p-3 text-sm" placeholder="Write a reply..." />
              <div className="mt-3 flex justify-end"><button type="submit" disabled={saving || !reply.trim()} className="min-h-10 bg-[var(--nxg-red)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-50">{saving ? "Saving..." : "Send reply"}</button></div>
            </form>
          </>}
        </section>
      </div>}
    </div>
  </main>
}
