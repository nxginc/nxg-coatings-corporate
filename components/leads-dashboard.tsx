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

type Reply = {
    id: string
    recipientEmail: string
    subject: string
    body: string
    status: "sending" | "sent" | "failed"
    actor: string
    errorMessage: string | null
    createdAt: string
    sentAt: string | null
}

const statusOptions: Lead["status"][] = ["new", "contacted", "qualified", "closed", "spam"]

export default function LeadsDashboard() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [replyLeadId, setReplyLeadId] = useState<string | null>(null)
    const [replySubject, setReplySubject] = useState("")
    const [replyBody, setReplyBody] = useState("")
    const [replySending, setReplySending] = useState(false)
    const [repliesByLead, setRepliesByLead] = useState<Record<string, Reply[]>>({})
    const [replyError, setReplyError] = useState("")
    const [replyNotice, setReplyNotice] = useState("")

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

    async function showReplyHistory(lead: Lead) {
        setReplyLeadId(lead.id)
        setReplySubject(`Re: Your ${lead.type.replace(/_/g, " ")} request`)
        setReplyBody("")
        setReplyError("")
        setReplyNotice("")
        try {
            const response = await fetch(`/api/admin/leads/reply?leadId=${encodeURIComponent(lead.id)}`, { cache: "no-store" })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "Could not load reply history.")
            setRepliesByLead((current) => ({ ...current, [lead.id]: result.replies }))
        } catch (loadError) {
            setReplyError(loadError instanceof Error ? loadError.message : "Could not load reply history.")
        }
    }

    async function sendReply(lead: Lead) {
        if (!window.confirm(`Send this email to ${lead.email}? Review the subject and message before confirming.`)) return
        setReplySending(true)
        setReplyError("")
        setReplyNotice("")
        try {
            const response = await fetch("/api/admin/leads/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ leadId: lead.id, subject: replySubject, body: replyBody }),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "Email reply could not be sent.")
            setReplyNotice(`Reply sent to ${lead.email}.`)
            setLeads((current) => current.map((item) => item.id === lead.id && item.status === "new" ? { ...item, status: "contacted" } : item))
            const historyResponse = await fetch(`/api/admin/leads/reply?leadId=${encodeURIComponent(lead.id)}`, { cache: "no-store" })
            const historyResult = await historyResponse.json()
            if (historyResponse.ok) setRepliesByLead((current) => ({ ...current, [lead.id]: historyResult.replies }))
            setReplyBody("")
        } catch (sendError) {
            setReplyError(sendError instanceof Error ? sendError.message : "Email reply could not be sent.")
        } finally {
            setReplySending(false)
        }
    }

    return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
        <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5">
                <div><p className="section-kicker">NXG operations</p><h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Lead inbox</h1><p className="mt-2 text-sm text-[var(--nxg-muted)]">Latest contact, estimate, and consultation requests.</p></div>
                <button type="button" onClick={() => void loadLeads()} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] hover:border-[var(--nxg-navy)]">Refresh</button>
            </div>
            {error && <p role="alert" className="mt-5 border border-red-300 bg-white p-4 text-sm text-red-900">{error}</p>}
            {loading ? <p className="py-12 text-sm text-[var(--nxg-muted)]">Loading leads...</p> : leads.length === 0 ? <p className="py-12 text-sm text-[var(--nxg-muted)]">No submissions have been received.</p> : <div className="mt-6 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{leads.map((lead) => <article key={lead.id} className="grid gap-4 p-5 md:grid-cols-[1fr_180px]">
                <div><div className="flex flex-wrap items-center gap-3"><h2 className="font-semibold text-[var(--nxg-navy)]">{lead.name}</h2><span className="text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-red)]">{lead.type.replace(/_/g, " ")}</span>{(lead.projectType || lead.service) && <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-muted)]">{lead.projectType || lead.service}</span>}</div><p className="mt-1 text-sm text-[var(--nxg-muted)]"><a href={`mailto:${lead.email}`} className="underline">{lead.email}</a>{lead.phone && <> · <a href={`tel:${lead.phone}`} className="underline">{lead.phone}</a></>}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6">{lead.message}</p><p className="mt-3 text-[10px] uppercase tracking-[0.1em] text-[var(--nxg-muted)]">{new Date(lead.createdAt).toLocaleString()}{lead.campaign ? ` · ${lead.campaign}` : ""}</p>
                    <button type="button" onClick={() => replyLeadId === lead.id ? setReplyLeadId(null) : void showReplyHistory(lead)} className="mt-4 min-h-9 border border-[var(--nxg-line)] px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--nxg-navy)]">{replyLeadId === lead.id ? "Close reply" : "Reply by email"}{repliesByLead[lead.id]?.length ? ` · ${repliesByLead[lead.id].length} previous` : ""}</button>
                    {replyLeadId === lead.id && <section aria-label={`Reply to ${lead.name}`} className="mt-4 border border-[var(--nxg-line)] bg-[var(--nxg-paper)] p-4">
                        <p className="text-xs leading-5 text-[var(--nxg-muted)]">Email sends immediately after confirmation. Verify the recipient, subject, and reply. Failed sends are logged; check SMTP delivery before retrying.</p>
                        <label className="mt-3 block text-xs font-semibold text-[var(--nxg-navy)]">Subject<input className="mt-1 min-h-10 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm font-normal" value={replySubject} onChange={(event) => setReplySubject(event.target.value)} maxLength={180} required /></label>
                        <label className="mt-3 block text-xs font-semibold text-[var(--nxg-navy)]">Message<textarea className="mt-1 min-h-32 w-full border border-[var(--nxg-line)] bg-white p-3 text-sm font-normal" value={replyBody} onChange={(event) => setReplyBody(event.target.value)} maxLength={10000} required /></label>
                        {replyError && <p role="alert" className="mt-3 text-sm text-red-800">{replyError}</p>}
                        {replyNotice && <p role="status" className="mt-3 text-sm text-green-900">{replyNotice}</p>}
                        <button type="button" disabled={replySending || replyBody.trim().length < 2 || replySubject.trim().length < 2} onClick={() => void sendReply(lead)} className="mt-3 min-h-10 bg-[var(--nxg-red)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-50">{replySending ? "Sending..." : `Send email to ${lead.email}`}</button>
                        {repliesByLead[lead.id]?.length > 0 && <div className="mt-5 border-t border-[var(--nxg-line)] pt-4"><h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)]">Reply history</h3><ul className="mt-3 space-y-3">{repliesByLead[lead.id].map((reply) => <li key={reply.id} className="border-l-2 border-[var(--nxg-line)] pl-3 text-xs"><p className="font-semibold">{reply.status.toUpperCase()} · {reply.subject}</p><p className="mt-1 whitespace-pre-wrap text-[var(--nxg-muted)]">{reply.body}</p><p className="mt-1 text-[var(--nxg-muted)]">{reply.actor} · {new Date(reply.createdAt).toLocaleString()}{reply.errorMessage ? ` · ${reply.errorMessage}` : ""}</p></li>)}</ul></div>}
                    </section>}
                </div>
                <label className="text-xs font-semibold text-[var(--nxg-navy)]">Status<select aria-label={`Lead status for ${lead.name}`} className="mt-2 min-h-10 w-full border border-[var(--nxg-line)] bg-white px-2 text-sm font-normal" value={lead.status} onChange={(event) => void updateStatus(lead.id, event.target.value as Lead["status"])}>{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
            </article>)}</div>}
        </div>
    </main>
}
