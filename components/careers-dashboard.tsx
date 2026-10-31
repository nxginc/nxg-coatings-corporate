"use client"

import { useEffect, useState, type FormEvent } from "react"

type Opening = {
  id: string
  slug: string
  title: string
  location: string
  employmentType: string
  summary: string
  details: string
  status: "draft" | "published" | "closed"
}

type OpeningForm = Omit<Opening, "id" | "status">
const emptyForm: OpeningForm = { slug: "", title: "", location: "Twin Cities, Minnesota", employmentType: "", summary: "", details: "" }
const inputClass = "min-h-11 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm focus:border-[var(--nxg-navy)]"

export default function CareersDashboard() {
  const [openings, setOpenings] = useState<Opening[]>([])
  const [form, setForm] = useState<OpeningForm>(emptyForm)
  const [editingId, setEditingId] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  async function refresh() {
    setError("")
    try {
      const response = await fetch("/api/admin/careers", { cache: "no-store" })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Career openings could not be loaded.")
      setOpenings(result.openings)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Career openings could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void refresh() }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError("")
    setNotice("")
    try {
      const response = await fetch("/api/admin/careers", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...(editingId ? { id: editingId } : {}) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Career opening could not be saved.")
      setNotice(editingId ? "Draft opening updated." : "Draft opening saved.")
      setForm(emptyForm)
      setEditingId("")
      await refresh()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Career opening could not be saved.")
    } finally {
      setSaving(false)
    }
  }

  async function action(opening: Opening, nextAction: "publish" | "return_to_draft" | "close") {
    setError("")
    setNotice("")
    try {
      const response = await fetch("/api/admin/careers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: opening.id, action: nextAction }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Career opening action failed.")
      setNotice(`Opening ${nextAction === "publish" ? "published" : nextAction === "close" ? "closed" : "returned to draft"}.`)
      await refresh()
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Career opening action failed.")
    }
  }

  return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="border-b border-[var(--nxg-line)] pb-5"><p className="section-kicker">NXG recruiting</p><h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Career openings</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--nxg-muted)]">Manage role details for the public careers page. Publishing requires an explicit admin action. Visitors contact NXG directly; applications and candidate records are not collected here.</p></header>
      {error && <p role="alert" className="mt-5 border border-red-300 bg-white p-4 text-sm text-red-900">{error}</p>}
      {notice && <p role="status" className="mt-5 border border-green-300 bg-white p-4 text-sm text-green-900">{notice}</p>}
      <section className="grid gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <form onSubmit={(event) => void submit(event)} className="space-y-4 border border-[var(--nxg-line)] bg-white p-5 sm:p-7">
          <div><h2 className="text-xl font-semibold text-[var(--nxg-navy)]">{editingId ? "Edit draft opening" : "Create opening draft"}</h2><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">Add only verified role information. Create a draft first, then publish when it is approved.</p></div>
          <label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--nxg-navy)]">Role title *</span><input className={inputClass} required minLength={4} maxLength={180} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
          <label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--nxg-navy)]">Slug *</span><input className={inputClass} required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={120} value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="commercial-painter" /></label>
          <label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--nxg-navy)]">Location *</span><input className={inputClass} required minLength={2} maxLength={160} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></label>
          <label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--nxg-navy)]">Employment type *</span><input className={inputClass} required minLength={2} maxLength={80} value={form.employmentType} onChange={(event) => setForm({ ...form, employmentType: event.target.value })} placeholder="Full-time, seasonal, etc." /></label>
          <label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--nxg-navy)]">Summary *</span><textarea className="min-h-24 w-full border border-[var(--nxg-line)] p-3 text-sm" required minLength={20} maxLength={1000} value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} /></label>
          <label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--nxg-navy)]">Role details</span><textarea className="min-h-40 w-full border border-[var(--nxg-line)] p-3 text-sm" maxLength={8000} value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} /></label>
          <div className="flex flex-wrap gap-3"><button disabled={saving} className="min-h-11 bg-[var(--nxg-navy)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-50">{saving ? "Saving..." : editingId ? "Save draft" : "Save draft opening"}</button>{editingId && <button type="button" onClick={() => { setEditingId(""); setForm(emptyForm) }} className="min-h-11 border border-[var(--nxg-line)] px-4 text-xs font-semibold uppercase tracking-[0.1em]">Cancel</button>}</div>
        </form>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--nxg-navy)]">Openings queue</h2>
          {loading ? <p className="py-8 text-sm text-[var(--nxg-muted)]">Loading openings...</p> : openings.length ? <ul className="mt-5 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{openings.map((opening) => <li key={opening.id} className="flex flex-wrap items-start justify-between gap-4 p-4">
            <div className="min-w-0"><h3 className="font-semibold text-[var(--nxg-navy)]">{opening.title}</h3><p className="mt-1 text-xs text-[var(--nxg-muted)]">{opening.location} · {opening.employmentType} · <span className="uppercase">{opening.status}</span></p><p className="mt-2 text-sm text-[var(--nxg-muted)]">{opening.summary}</p></div>
            <div className="flex shrink-0 flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.07em]">
              {opening.status === "draft" && <><button type="button" onClick={() => { setEditingId(opening.id); setForm({ slug: opening.slug, title: opening.title, location: opening.location, employmentType: opening.employmentType, summary: opening.summary, details: opening.details }) }} className="text-[var(--nxg-navy)] underline">Edit</button><button type="button" onClick={() => void action(opening, "publish")} className="text-[var(--nxg-red)] underline">Publish</button></>}
              {opening.status === "published" && <><button type="button" onClick={() => void action(opening, "return_to_draft")} className="text-[var(--nxg-navy)] underline">Unpublish to edit</button><button type="button" onClick={() => void action(opening, "close")} className="text-red-800 underline">Close</button></>}
              {opening.status === "closed" && <button type="button" onClick={() => void action(opening, "return_to_draft")} className="text-[var(--nxg-navy)] underline">Reopen as draft</button>}
            </div>
          </li>)}</ul> : <p className="mt-5 border border-[var(--nxg-line)] bg-white p-5 text-sm text-[var(--nxg-muted)]">No openings yet. Add verified role details to create a draft.</p>}
        </section>
      </section>
    </div>
  </main>
}
