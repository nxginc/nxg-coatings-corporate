"use client"

import { useEffect, useState, type FormEvent } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle, X } from "lucide-react"

const fieldClass = "min-h-11 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm text-[var(--nxg-charcoal)] focus:border-[var(--nxg-navy)]"

export default function ClientMessageWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  if (pathname.startsWith("/dashboard") || pathname === "/login") return null

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError("")
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          service: "Website message",
          type: "contact",
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Your message could not be sent.")
      setSent(true)
      form.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Your message could not be sent.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <section id="client-message-panel" aria-label="Send a message to NXG" hidden={!open} className="mb-3 w-[min(22rem,calc(100vw-2rem))] border border-[var(--nxg-line)] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 bg-[var(--nxg-navy)] p-4 text-white">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65">NXG Coatings</p><h2 className="mt-1 text-lg font-semibold">Send us a message</h2></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close message panel" className="grid h-9 w-9 place-items-center border border-white/35"><X className="h-4 w-4" /></button>
        </div>
        {sent ? <div role="status" className="p-5"><p className="font-semibold text-[var(--nxg-navy)]">Your message was received.</p><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">This is an asynchronous message channel, not live chat. NXG will follow up using the contact information you provided.</p><button type="button" onClick={() => { setSent(false); setError("") }} className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-red)] underline">Send another message</button></div> : <form onSubmit={(event) => void submitMessage(event)} className="grid gap-3 p-4">
          <p className="text-xs leading-5 text-[var(--nxg-muted)]">Leave your contact details and a short note. Messages are routed to NXG’s existing lead inbox.</p>
          <label className="text-xs font-semibold text-[var(--nxg-navy)]">Name<input className={`${fieldClass} mt-1`} name="name" autoComplete="name" minLength={2} maxLength={120} required /></label>
          <label className="text-xs font-semibold text-[var(--nxg-navy)]">Email<input className={`${fieldClass} mt-1`} name="email" type="email" autoComplete="email" maxLength={254} required /></label>
          <label className="text-xs font-semibold text-[var(--nxg-navy)]">How can we help?<textarea className="mt-1 min-h-24 w-full border border-[var(--nxg-line)] bg-white p-3 text-sm text-[var(--nxg-charcoal)] focus:border-[var(--nxg-navy)]" name="message" minLength={1} maxLength={5000} required /></label>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
          <button type="submit" disabled={sending} className="min-h-11 bg-[var(--nxg-red)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-60">{sending ? "Sending..." : "Send message"}</button>
        </form>}
      </section>
      <button type="button" aria-expanded={open} aria-controls="client-message-panel" onClick={() => { setOpen((current) => !current); setError("") }} className="ml-auto flex min-h-12 items-center gap-3 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.11em] text-white shadow-lg transition hover:bg-[var(--nxg-navy)]">
        {open ? <X className="h-4 w-4" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
        {open ? "Close" : "Message NXG"}
      </button>
    </div>
  )
}
