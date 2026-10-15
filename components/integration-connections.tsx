"use client"

import { useEffect, useState } from "react"

type Provider = {
    id: string
    name: string
    category: string
    description: string
    connection: string
    configured: boolean
    missingEnv: string[]
    readiness: string
    enabled: boolean
    adminStoreConfigured: boolean
}

const readinessLabels: Record<string, string> = {
    credentials_ready: "Credentials ready; not connection-tested",
    needs_configuration: "Needs server configuration",
    manual_only: "Manual handoff only",
}

export default function IntegrationConnections() {
    const [providers, setProviders] = useState<Provider[]>([])
    const [companyId, setCompanyId] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState<string | null>(null)
    const [notice, setNotice] = useState("")

    async function load() {
        setLoading(true)
        setError("")
        try {
            const response = await fetch("/api/admin/integrations", { cache: "no-store" })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "Connections could not be loaded.")
            setCompanyId(result.companyId)
            setProviders(result.providers)
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Connections could not be loaded.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { void load() }, [])

    async function setEnabled(provider: Provider, enabled: boolean) {
        setSaving(provider.id)
        setError("")
        try {
            const response = await fetch("/api/admin/integrations", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ provider: provider.id, enabled }),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "Connection setting could not be saved.")
            setProviders((current) => current.map((item) => item.id === provider.id ? { ...item, enabled } : item))
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "Connection setting could not be saved.")
        } finally {
            setSaving(null)
        }
    }

    async function retryHubSpot() {
        setSaving("hubspot-retry")
        setError("")
        setNotice("")
        try {
            const response = await fetch("/api/admin/hubspot/retry", { method: "POST" })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "HubSpot retry failed.")
            setNotice(`HubSpot sync retried: ${result.synced} synced, ${result.failed} failed, ${result.attempted} attempted.`)
        } catch (retryError) {
            setError(retryError instanceof Error ? retryError.message : "HubSpot retry failed.")
        } finally {
            setSaving(null)
        }
    }

    return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
        <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5"><div><p className="section-kicker">NXG platform</p><h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Connections & automations</h1><p className="mt-2 text-sm text-[var(--nxg-muted)]">Company scope: <span className="font-semibold">{companyId || "..."}</span>. Secrets stay in the deployment environment.</p></div><button type="button" onClick={() => void load()} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em]">Refresh</button></div>
            {error && <p role="alert" className="mt-5 border border-red-300 bg-white p-4 text-sm text-red-900">{error}</p>}
            {notice && <p role="status" className="mt-5 border border-green-300 bg-white p-4 text-sm text-green-900">{notice}</p>}
            {!loading && providers.some((provider) => !provider.adminStoreConfigured) && <p className="mt-5 border-l-2 border-[var(--nxg-red)] bg-white p-4 text-sm text-[var(--nxg-muted)]">Database is not configured. Provider readiness is shown, but enable/disable changes cannot be persisted.</p>}
            {loading ? <p className="py-12 text-sm text-[var(--nxg-muted)]">Loading connections...</p> : <div className="mt-6 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{providers.map((provider) => <section key={provider.id} className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <div><div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-semibold text-[var(--nxg-navy)]">{provider.name}</h2><span className="text-[10px] uppercase tracking-[0.12em] text-[var(--nxg-red)]">{provider.category}</span></div><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--nxg-muted)]">{provider.description}</p><p className="mt-2 text-xs font-medium">{readinessLabels[provider.readiness] || provider.readiness}</p>{provider.missingEnv.length > 0 && <p className="mt-1 text-xs text-[var(--nxg-muted)]">Missing: {provider.missingEnv.join(", ")}</p>}{provider.connection === "oauth_account" && provider.configured && <p className="mt-1 text-xs text-[var(--nxg-muted)]">Account authorization and scope verification are separate setup steps.</p>}{provider.id === "hubspot" && provider.enabled && <button type="button" onClick={() => void retryHubSpot()} disabled={saving === "hubspot-retry"} className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-red)] underline disabled:opacity-50">{saving === "hubspot-retry" ? "Retrying..." : "Retry pending lead syncs"}</button>}</div>
                <label className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.1em] sm:min-w-36"><span>{provider.enabled ? "Enabled" : "Disabled"}</span><input aria-label={`${provider.enabled ? "Disable" : "Enable"} ${provider.name}`} type="checkbox" role="switch" checked={provider.enabled} disabled={!provider.adminStoreConfigured || saving === provider.id || (!provider.configured && provider.connection !== "manual_only") || provider.connection === "manual_only"} onChange={(event) => void setEnabled(provider, event.target.checked)} className="h-5 w-10 accent-[var(--nxg-red)]" />{saving === provider.id && <span className="sr-only">Saving</span>}</label>
            </section>)}</div>}
            <p className="mt-7 text-xs leading-5 text-[var(--nxg-muted)]">Marketplace publishing is manual-only. Meta and Google connections still require their respective OAuth consent, approved scopes, and account IDs. “Enabled” only activates a configured provider switch; it does not imply a successful live connection.</p>
        </div>
    </main>
}