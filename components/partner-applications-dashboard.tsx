"use client"

import { useEffect, useState } from "react"

type Application = {
  id: string
  createdAt: string
  status: "pending_review" | "approved" | "rejected" | "suspended"
  company: string
  contactName: string
  email: string
  phone: string
  trade: string
  serviceAreas: string
  website: string | null
  licenseNumber: string | null
  insuranceProvider: string | null
  yearsInBusiness: string | null
  message: string | null
  directoryConsent: boolean
}

const reviewStatuses: Application["status"][] = ["pending_review", "approved", "rejected", "suspended"]

export default function PartnerApplicationsDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function loadApplications() {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/admin/partners", { cache: "no-store" })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not load applications.")
      setApplications(result.applications)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load applications.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadApplications() }, [])

  async function updateStatus(application: Application, status: Application["status"]) {
    setError("")
    try {
      const response = await fetch("/api/admin/partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: application.id, status }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not update the application.")
      setApplications((current) => current.map((item) => item.id === application.id ? { ...item, status } : item))
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update the application.")
    }
  }

  return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5">
        <div><p className="section-kicker">NXG operations</p><h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Trade partner applications</h1><p className="mt-2 text-sm text-[var(--nxg-muted)]">Review submissions before approval or public directory listing.</p></div>
        <button type="button" onClick={() => void loadApplications()} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em]">Refresh</button>
      </div>
      {error && <p role="alert" className="mt-5 border border-red-300 bg-white p-4 text-sm text-red-900">{error}</p>}
      {loading ? <p className="py-12 text-sm text-[var(--nxg-muted)]">Loading applications...</p> : applications.length === 0 ? <p className="py-12 text-sm text-[var(--nxg-muted)]">No applications have been received.</p> : (
        <div className="mt-6 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">
          {applications.map((application) => <article key={application.id} className="grid gap-5 p-5 md:grid-cols-[1fr_190px]">
            <div>
              <div className="flex flex-wrap items-center gap-3"><h2 className="font-semibold text-[var(--nxg-navy)]">{application.company}</h2><span className="text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-red)]">{application.trade}</span></div>
              <p className="mt-2 text-sm text-[var(--nxg-muted)]">{application.contactName} · <a className="underline" href={`mailto:${application.email}`}>{application.email}</a> · <a className="underline" href={`tel:${application.phone}`}>{application.phone}</a></p>
              <p className="mt-2 text-sm">Service areas: {application.serviceAreas}</p>
              <p className="mt-2 text-xs text-[var(--nxg-muted)]">Directory consent: {application.directoryConsent ? "Yes, if approved" : "No"}{application.yearsInBusiness ? ` · Years in business: ${application.yearsInBusiness}` : ""}{application.licenseNumber ? ` · License: ${application.licenseNumber}` : ""}{application.insuranceProvider ? ` · Insurance: ${application.insuranceProvider}` : ""}</p>
              {application.website && <p className="mt-2 text-sm"><a href={application.website} target="_blank" rel="noreferrer" className="underline">Company website ↗</a></p>}
              {application.message && <p className="mt-3 whitespace-pre-wrap border-l-2 border-[var(--nxg-line)] pl-3 text-sm leading-6 text-[var(--nxg-muted)]">{application.message}</p>}
              <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-muted)]">Received {new Date(application.createdAt).toLocaleString()}</p>
            </div>
            <label className="text-xs font-semibold text-[var(--nxg-navy)]">Review status<select aria-label={`Review status for ${application.company}`} className="mt-2 min-h-10 w-full border border-[var(--nxg-line)] bg-white px-2 text-sm font-normal" value={application.status} onChange={(event) => void updateStatus(application, event.target.value as Application["status"])}>{reviewStatuses.map((status) => <option key={status} value={status}>{status.replace(/_/g, " ")}</option>)}</select></label>
          </article>)}
        </div>
      )}
    </div>
  </main>
}
