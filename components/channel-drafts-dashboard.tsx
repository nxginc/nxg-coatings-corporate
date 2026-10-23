"use client"

import { useEffect, useState, type FormEvent } from "react"

type Channel = "indeed" | "yelp"
type Status = "draft" | "review" | "approved" | "handed_off" | "archived"
type ChannelDraft = {
  id: string
  channel: Channel
  title: string
  sourceUrl: string | null
  body: string
  status: Status
  approvedBy?: string | null
  handedOffBy?: string | null
}

const statuses: Status[] = ["draft", "review", "approved", "handed_off", "archived"]
const fieldClass = "min-h-11 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm text-[var(--nxg-charcoal)]"

export default function ChannelDraftsDashboard() {
  const [drafts, setDrafts] = useState<ChannelDraft[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  async function load() {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/admin/channel-drafts", { cache: "no-store" })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not load channel drafts.")
      setDrafts(result.drafts)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load channel drafts.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  async function createDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError("")
    setNotice("")
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    try {
      const response = await fetch("/api/admin/channel-drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Draft could not be saved.")
      setDrafts((current) => [result.draft, ...current])
      form.reset()
      setNotice("Draft saved. It has not been posted to Indeed or Yelp.")
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Draft could not be saved.")
    } finally {
      setSaving(false)
    }
  }

  async function updateStatus(draft: ChannelDraft, status: Status) {
    setError("")
    setNotice("")
    try {
      const response = await fetch("/api/admin/channel-drafts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draft.id, status }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Draft status could not be updated.")
      setDrafts((current) => current.map((item) => item.id === draft.id ? { ...item, ...result.draft } : item))
      if (status === "handed_off") setNotice("Manual handoff recorded; no external account was changed.")
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Draft status could not be updated.")
    }
  }

  return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="border-b border-[var(--nxg-line)] pb-5">
        <p className="section-kicker">Admin workspace</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Hiring & reputation drafts</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--nxg-muted)]">Prepare Indeed job-listing copy and source-linked Yelp response drafts. Review and approve before copying them to external accounts; this workspace has no Indeed or Yelp connection.</p>
      </header>
      {(error || notice) && <p role={error ? "alert" : "status"} className={`mt-5 border bg-white p-4 text-sm ${error ? "border-red-300 text-red-900" : "border-green-300 text-green-900"}`}>{error || notice}</p>}
      <section className="mt-7 border border-[var(--nxg-line)] bg-white p-5 sm:p-7">
        <h2 className="text-xl font-semibold text-[var(--nxg-navy)]">Create a draft</h2>
        <form onSubmit={(event) => void createDraft(event)} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold text-[var(--nxg-navy)]">Channel<select className={`${fieldClass} mt-1`} name="channel" defaultValue="indeed"><option value="indeed">Indeed — job listing</option><option value="yelp">Yelp — review response</option></select></label>
          <label className="text-xs font-semibold text-[var(--nxg-navy)]">Draft title *<input className={`${fieldClass} mt-1`} name="title" minLength={3} maxLength={200} required placeholder="Role title or response subject" /></label>
          <label className="text-xs font-semibold text-[var(--nxg-navy)] sm:col-span-2">Source or review URL (HTTPS)<input className={`${fieldClass} mt-1`} name="sourceUrl" type="url" maxLength={1000} placeholder="Link to the source review or reference" /></label>
          <label className="text-xs font-semibold text-[var(--nxg-navy)] sm:col-span-2">Draft content *<textarea className="mt-1 min-h-48 w-full border border-[var(--nxg-line)] bg-white p-3 text-sm text-[var(--nxg-charcoal)]" name="body" minLength={10} maxLength={10000} required placeholder="Write factual, respectful copy for human review. Do not include private customer details or unverified role terms." /></label>
          <button type="submit" disabled={saving} className="min-h-11 justify-self-start bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-60">{saving ? "Saving..." : "Save draft"}</button>
        </form>
      </section>
      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-4">
          <div><h2 className="text-xl font-semibold text-[var(--nxg-navy)]">Draft queue</h2><p className="mt-1 text-sm text-[var(--nxg-muted)]">Flow: draft → review → approved → manual handoff.</p></div>
          <button type="button" onClick={() => void load()} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em]">Refresh</button>
        </div>
        {loading ? <p className="py-10 text-sm text-[var(--nxg-muted)]">Loading drafts...</p> : drafts.length === 0 ? <p className="py-10 text-sm text-[var(--nxg-muted)]">No hiring or reputation drafts yet.</p> : <div className="mt-5 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">
          {drafts.map((draft) => <article key={draft.id} className="grid gap-4 p-5 md:grid-cols-[1fr_210px]">
            <div><div className="flex flex-wrap items-center gap-3"><h3 className="font-semibold text-[var(--nxg-navy)]">{draft.title}</h3><span className="text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-red)]">{draft.channel}</span></div>{draft.sourceUrl && <p className="mt-2 text-xs"><a href={draft.sourceUrl} target="_blank" rel="noreferrer" className="underline">Source ↗</a></p>}<p className="mt-3 whitespace-pre-wrap text-sm leading-6">{draft.body}</p><p className="mt-3 text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-muted)]">Status: {draft.status.replace(/_/g, " ")}{draft.approvedBy ? ` · Approved by ${draft.approvedBy}` : ""}{draft.handedOffBy ? ` · Handed off by ${draft.handedOffBy}` : ""}</p></div>
            <label className="text-xs font-semibold text-[var(--nxg-navy)]">Review status<select aria-label={`Review status for ${draft.title}`} className={`${fieldClass} mt-2`} value={draft.status} onChange={(event) => void updateStatus(draft, event.target.value as Status)}>{statuses.map((status) => <option key={status} value={status}>{status.replace(/_/g, " ")}</option>)}</select></label>
          </article>)}
        </div>}
      </section>
    </div>
  </main>
}
