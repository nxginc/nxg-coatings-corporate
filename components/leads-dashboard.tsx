"use client"

import { useEffect, useState } from "react"

type Lead = {
    id: string
    createdAt: string
    status: "new" | "contacted" | "qualified" | "closed" | "spam"
    type: string
    name: string
    email: string
    phone: string | null
    service: string | null
    projectType: string | null
    message: string
    campaign: string | null
}

const statusOptions: Lead["status"][] = ["new", "contacted", "qualified", "closed", "spam"]

export default function LeadsDashboard() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    async function loadLeads() {
        setLoading(true)
        setError("")
        try {
            const response = await fetch("/api/crm", { cache: "no-store" })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "Could not load leads.")
            setLeads(result.leads)
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Could not load leads.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void loadLeads()
    }, [])

    async function updateStatus(id: string, status: Lead["status"]) {
        const response = await fetch("/api/crm", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        })
        if (!response.ok) {
            const result = await response.json().catch(() => null)
            setError(result?.error || "Could not update this lead.")
            return
        }
        setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, status } : lead))
    }

    return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
        <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5">
                <div><p className="section-kicker">NXG operations</p><h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Lead inbox</h1><p className="mt-2 text-sm text-[var(--nxg-muted)]">Latest contact, estimate, and consultation requests.</p></div>
                <div className="flex flex-wrap gap-3"><a href="/dashboard/content" className="inline-flex min-h-10 items-center border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] hover:border-[var(--nxg-navy)]">Campaign desk</a><a href="/dashboard/connections" className="inline-flex min-h-10 items-center border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] hover:border-[var(--nxg-navy)]">Connections</a><button type="button" onClick={() => void loadLeads()} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] hover:border-[var(--nxg-navy)]">Refresh</button></div>
            </div>
            {error && <p role="alert" className="mt-5 border border-red-300 bg-white p-4 text-sm text-red-900">{error}</p>}
            {loading ? <p className="py-12 text-sm text-[var(--nxg-muted)]">Loading leads...</p> : leads.length === 0 ? <p className="py-12 text-sm text-[var(--nxg-muted)]">No submissions have been received.</p> : <div className="mt-6 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{leads.map((lead) => <article key={lead.id} className="grid gap-4 p-5 md:grid-cols-[1fr_180px]">
                <div><div className="flex flex-wrap items-center gap-3"><h2 className="font-semibold text-[var(--nxg-navy)]">{lead.name}</h2><span className="text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-red)]">{lead.type.replaceAll("_", " ")}</span></div><p className="mt-1 text-sm text-[var(--nxg-muted)]"><a href={`mailto:${lead.email}`} className="underline">{lead.email}</a>{lead.phone && <> · <a href={`tel:${lead.phone}`} className="underline">{lead.phone}</a></>}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6">{lead.message}</p><p className="mt-3 text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-muted)]">{new Date(lead.createdAt).toLocaleString()}{lead.campaign ? ` · ${lead.campaign}` : ""}</p></div>
                <label className="text-xs font-semibold text-[var(--nxg-navy)]">Status<select aria-label={`Lead status for ${lead.name}`} className="mt-2 min-h-10 w-full border border-[var(--nxg-line)] bg-white px-2 text-sm font-normal" value={lead.status} onChange={(event) => void updateStatus(lead.id, event.target.value as Lead["status"])}>{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
            </article>)}</div>}
        </div>
    </main>
}