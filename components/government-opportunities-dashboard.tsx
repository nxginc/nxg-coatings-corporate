"use client"

import { useEffect, useState, type FormEvent } from "react"
import { NXG_CORPORATE_PROFILE } from "@/data/corporate-profile"

type OpportunityStatus = "researching" | "eligible" | "ineligible" | "drafting" | "review_required" | "submitted" | "awarded" | "declined" | "archived"
type Opportunity = {
  id: string
  title: string
  funder: string
  stateCode: string
  sourceUrl: string
  applicationUrl: string | null
  eligibilityNotes: string
  deadline: string | null
  status: OpportunityStatus
  createdAt: string
}

const statuses: OpportunityStatus[] = ["researching", "eligible", "ineligible", "drafting", "review_required", "submitted", "awarded", "declined", "archived"]
const inputClass = "min-h-11 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm text-[var(--nxg-charcoal)]"
const labelClass = "mb-1.5 block text-xs font-semibold text-[var(--nxg-navy)]"

export default function GovernmentOpportunitiesDashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  async function load() {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/admin/government/opportunities", { cache: "no-store" })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not load opportunities.")
      setOpportunities(result.opportunities)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load opportunities.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  async function createOpportunity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError("")
    setNotice("")
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    try {
      const response = await fetch("/api/admin/government/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not save this opportunity.")
      setOpportunities((current) => [result.opportunity, ...current])
      form.reset()
      setNotice("Opportunity saved as researching. Verify eligibility and source details before preparing an application.")
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save this opportunity.")
    } finally {
      setSaving(false)
    }
  }

  async function updateStatus(opportunity: Opportunity, status: OpportunityStatus) {
    setError("")
    setNotice("")
    try {
      const response = await fetch("/api/admin/government/opportunities", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: opportunity.id, status }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not update status.")
      setOpportunities((current) => current.map((item) => item.id === opportunity.id ? { ...item, status } : item))
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update status.")
    }
  }

  return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="border-b border-[var(--nxg-line)] pb-5">
        <p className="section-kicker">NXG operations</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Government opportunity tracker</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--nxg-muted)]">Track sourced federal and state opportunities. Each entry requires a source URL; this workspace does not determine eligibility, submit applications, or automate portal access.</p>
      </div>
      {(error || notice) && <p role={error ? "alert" : "status"} className={`mt-5 border bg-white p-4 text-sm ${error ? "border-red-300 text-red-900" : "border-green-300 text-green-900"}`}>{error || notice}</p>}

      <div className="mt-7 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="border border-[var(--nxg-line)] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[var(--nxg-navy)]">Verified company profile</h2>
          <p className="mt-2 text-xs leading-5 text-[var(--nxg-muted)]">These canonical contact fields can be reused in drafts. Capability, ownership, registration, insurance, past-performance, and financial claims still require source documents and review.</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div><dt className="text-xs font-semibold text-[var(--nxg-muted)]">Legal name</dt><dd>{NXG_CORPORATE_PROFILE.legalName}</dd></div>
            <div><dt className="text-xs font-semibold text-[var(--nxg-muted)]">Address</dt><dd>{NXG_CORPORATE_PROFILE.addressLines.join(", ")}</dd></div>
            <div><dt className="text-xs font-semibold text-[var(--nxg-muted)]">Contact</dt><dd>{NXG_CORPORATE_PROFILE.phone} · {NXG_CORPORATE_PROFILE.email}</dd></div>
            <div><dt className="text-xs font-semibold text-[var(--nxg-muted)]">Website</dt><dd>{NXG_CORPORATE_PROFILE.website}</dd></div>
          </dl>
        </section>

        <section className="border border-[var(--nxg-line)] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[var(--nxg-navy)]">Add an opportunity</h2>
          <p className="mt-2 text-xs leading-5 text-[var(--nxg-muted)]">Use an official or otherwise authoritative source. No grant records are preloaded because no verified opportunity dataset was supplied.</p>
          <form onSubmit={(event) => void createOpportunity(event)} className="mt-5 grid gap-4 sm:grid-cols-2">
            <label><span className={labelClass}>Opportunity title *</span><input className={inputClass} name="title" minLength={4} maxLength={240} required /></label>
            <label><span className={labelClass}>Funder *</span><input className={inputClass} name="funder" minLength={2} maxLength={200} required /></label>
            <label><span className={labelClass}>State / scope *</span><input className={inputClass} name="stateCode" defaultValue="MN" pattern="US|[A-Za-z]{2}" title="Enter a two-letter state code or US" required /></label>
            <label><span className={labelClass}>Deadline</span><input className={inputClass} name="deadline" type="date" /></label>
            <label className="sm:col-span-2"><span className={labelClass}>Source URL (HTTPS) *</span><input className={inputClass} name="sourceUrl" type="url" placeholder="https://" required /></label>
            <label className="sm:col-span-2"><span className={labelClass}>Application URL (optional)</span><input className={inputClass} name="applicationUrl" type="url" placeholder="https://" /></label>
            <label className="sm:col-span-2"><span className={labelClass}>Eligibility notes / source evidence</span><textarea className="min-h-24 w-full border border-[var(--nxg-line)] bg-white p-3 text-sm" name="eligibilityNotes" maxLength={5000} /></label>
            <button type="submit" disabled={saving} className="min-h-11 justify-self-start bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-60">{saving ? "Saving..." : "Save for review"}</button>
          </form>
        </section>
      </div>

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-4">
          <div><h2 className="text-xl font-semibold text-[var(--nxg-navy)]">Tracked opportunities</h2><p className="mt-1 text-sm text-[var(--nxg-muted)]">“Submitted” is a manual record only; this app never submits to an agency portal.</p></div>
          <button type="button" onClick={() => void load()} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em]">Refresh</button>
        </div>
        {loading ? <p className="py-10 text-sm text-[var(--nxg-muted)]">Loading opportunities...</p> : opportunities.length === 0 ? <p className="py-10 text-sm text-[var(--nxg-muted)]">No sourced opportunities have been added yet.</p> : (
          <div className="mt-5 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">
            {opportunities.map((opportunity) => <article key={opportunity.id} className="grid gap-4 p-5 md:grid-cols-[1fr_200px]">
              <div><div className="flex flex-wrap items-center gap-3"><h3 className="font-semibold text-[var(--nxg-navy)]">{opportunity.title}</h3><span className="text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-red)]">{opportunity.stateCode}</span></div><p className="mt-1 text-sm">{opportunity.funder}{opportunity.deadline ? ` · Deadline ${new Date(`${opportunity.deadline}T00:00:00`).toLocaleDateString()}` : ""}</p>{opportunity.eligibilityNotes && <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--nxg-muted)]">{opportunity.eligibilityNotes}</p>}<p className="mt-2 flex flex-wrap gap-4 text-xs"><a href={opportunity.sourceUrl} target="_blank" rel="noreferrer" className="underline">Source ↗</a>{opportunity.applicationUrl && <a href={opportunity.applicationUrl} target="_blank" rel="noreferrer" className="underline">Application portal ↗</a>}</p></div>
              <label className="text-xs font-semibold text-[var(--nxg-navy)]">Tracking status<select aria-label={`Status for ${opportunity.title}`} className={`${inputClass} mt-2`} value={opportunity.status} onChange={(event) => void updateStatus(opportunity, event.target.value as OpportunityStatus)}>{statuses.map((status) => <option key={status} value={status}>{status.replace(/_/g, " ")}</option>)}</select></label>
            </article>)}
          </div>
        )}
      </section>
    </div>
  </main>
}
