"use client"

import { useEffect, useState, type FormEvent } from "react"

type BusinessProfile = {
    displayName: string
    addressLine1: string
    addressLine2: string
    city: string
    region: string
    postalCode: string
    website: string
    email: string
}

type MetaResources = {
    connected: boolean
    accountName?: string | null
    selectedPageId?: string | null
    resources: Array<{ id: string; name: string }>
}

type GoogleResources = {
    connected: boolean
    selectedGoogleAccount?: string | null
    selectedGoogleLocation?: string | null
    resourceError?: string
    resources: Array<{
        name: string
        accountName: string
        locations: Array<{ name: string; title: string; address: string }>
    }>
}

const fieldClass = "min-h-11 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm focus:border-[var(--nxg-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nxg-navy)]"
const labelClass = "mb-2 block text-xs font-semibold text-[var(--nxg-navy)]"
const buttonClass = "min-h-10 bg-[var(--nxg-navy)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nxg-navy)] disabled:opacity-40"

async function responseJson(response: Response) {
    const result = await response.json().catch(() => null)
    if (!response.ok) throw new Error(result?.error || "The request could not be completed.")
    return result
}

export default function MarketingProviderControls() {
    const [meta, setMeta] = useState<MetaResources | null>(null)
    const [google, setGoogle] = useState<GoogleResources | null>(null)
    const [profile, setProfile] = useState<BusinessProfile | null>(null)
    const [selectedPage, setSelectedPage] = useState("")
    const [selectedGoogleLocation, setSelectedGoogleLocation] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [syncing, setSyncing] = useState(false)
    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")

    async function load() {
        setLoading(true)
        setError("")
        try {
            const [metaResponse, googleResponse, profileResponse] = await Promise.all([
                fetch("/api/admin/oauth/meta-pages/resources", { cache: "no-store" }),
                fetch("/api/admin/oauth/google-business-profile/resources", { cache: "no-store" }),
                fetch("/api/admin/business-profile", { cache: "no-store" }),
            ])
            const [metaResult, googleResult, profileResult] = await Promise.allSettled([
                responseJson(metaResponse),
                responseJson(googleResponse),
                responseJson(profileResponse),
            ])
            const loadErrors: string[] = []
            if (metaResult.status === "fulfilled") {
                setMeta(metaResult.value)
                setSelectedPage(metaResult.value.selectedPageId || "")
            } else loadErrors.push(metaResult.reason instanceof Error ? metaResult.reason.message : "Meta Pages could not be loaded.")
            if (googleResult.status === "fulfilled") {
                setGoogle(googleResult.value)
                const selectedLocation = googleResult.value.selectedGoogleAccount && googleResult.value.selectedGoogleLocation
                    ? `${googleResult.value.selectedGoogleAccount}::${googleResult.value.selectedGoogleLocation}`
                    : ""
                setSelectedGoogleLocation(selectedLocation)
            } else loadErrors.push(googleResult.reason instanceof Error ? googleResult.reason.message : "Google Business Profile could not be loaded.")
            if (profileResult.status === "fulfilled") setProfile(profileResult.value.profile)
            else loadErrors.push(profileResult.reason instanceof Error ? profileResult.reason.message : "Business profile could not be loaded.")
            if (loadErrors.length) setError(loadErrors.join(" "))
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Marketing connections could not be loaded.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void load()
        const params = new URLSearchParams(window.location.search)
        if (params.get("oauth")) {
            setNotice(params.get("status") === "connected"
                ? `${params.get("oauth") === "meta-pages" ? "Meta" : "Google Business Profile"} authorization completed. Select the account or location below.`
                : "Provider authorization did not complete. Check the app configuration, account permissions, and signed-in admin session.")
            const cleanUrl = new URL(window.location.href)
            cleanUrl.searchParams.delete("oauth")
            cleanUrl.searchParams.delete("status")
            window.history.replaceState({}, "", cleanUrl)
        }
    }, [])

    async function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!profile) return
        setSaving(true)
        setError("")
        setNotice("")
        try {
            const response = await fetch("/api/admin/business-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            })
            const result = await responseJson(response)
            setProfile(result.profile)
            setNotice("Business profile saved. Review the values below before syncing to Google.")
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "Business profile could not be saved.")
        } finally {
            setSaving(false)
        }
    }

    async function selectMetaPage() {
        setSaving(true)
        setError("")
        setNotice("")
        try {
            await responseJson(await fetch("/api/admin/oauth/meta-pages/resources", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pageId: selectedPage }),
            }))
            await load()
            setNotice("Facebook Page selected and the Meta connection enabled.")
        } catch (selectError) {
            setError(selectError instanceof Error ? selectError.message : "Facebook Page selection failed.")
        } finally {
            setSaving(false)
        }
    }

    async function selectGoogleLocation() {
        const [accountName, locationName] = selectedGoogleLocation.split("::")
        if (!accountName || !locationName) {
            setError("Select a Google Business Profile location.")
            return
        }
        setSaving(true)
        setError("")
        setNotice("")
        try {
            await responseJson(await fetch("/api/admin/oauth/google-business-profile/resources", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accountName, locationName }),
            }))
            await load()
            setNotice("Google Business Profile location selected and the connection enabled.")
        } catch (selectError) {
            setError(selectError instanceof Error ? selectError.message : "Google location selection failed.")
        } finally {
            setSaving(false)
        }
    }

    async function disconnectProvider(provider: "meta-pages" | "google-business-profile", label: string) {
        if (!window.confirm(`Remove the stored ${label} credentials and disable this connection? This does not revoke the app's authorization at the provider.`)) return
        setSaving(true)
        setError("")
        setNotice("")
        try {
            await responseJson(await fetch(`/api/admin/oauth/${provider}/resources`, { method: "DELETE" }))
            await load()
            setNotice(`${label} credentials removed from this app. Revoke the app's authorization in the provider account settings if needed.`)
        } catch (disconnectError) {
            setError(disconnectError instanceof Error ? disconnectError.message : "Provider credentials could not be removed.")
        } finally {
            setSaving(false)
        }
    }

    async function syncGoogleProfile() {
        if (!window.confirm("Sync the saved business name, address, and website to the selected Google Business Profile location? This will change the live listing.")) return
        setSyncing(true)
        setError("")
        setNotice("")
        try {
            const result = await responseJson(await fetch("/api/admin/business-profile/sync", { method: "POST" }))
            setNotice(`Google Business Profile updated: ${result.fields.join(", ")}.`)
        } catch (syncError) {
            setError(syncError instanceof Error ? syncError.message : "Google Business Profile sync failed.")
        } finally {
            setSyncing(false)
        }
    }

    return <section className="mt-8 border border-[var(--nxg-line)] bg-white p-5 sm:p-7">
        <div className="border-b border-[var(--nxg-line)] pb-4">
            <h2 className="text-2xl font-semibold text-[var(--nxg-navy)]">Meta Pages and Google Business Profile</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--nxg-muted)]">Provider tokens are encrypted before storage. Connect an account, choose the exact destination, and use the separate review/publish controls for every outbound change. Instagram and Messenger are not included.</p>
        </div>
        {error && <p role="alert" className="mt-4 border border-red-300 bg-red-50 p-3 text-sm text-red-900">{error}</p>}
        {notice && <p role="status" className="mt-4 border border-green-300 bg-green-50 p-3 text-sm text-green-900">{notice}</p>}
        {loading ? <div aria-label="Loading provider accounts" className="grid gap-8 pt-6 lg:grid-cols-2"><div className="h-28 animate-pulse bg-[var(--nxg-paper)]" /><div className="h-28 animate-pulse bg-[var(--nxg-paper)]" /></div> : <div className="grid gap-8 pt-6 lg:grid-cols-2">
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold text-[var(--nxg-navy)]">Meta Pages</h3><span className="text-xs text-[var(--nxg-muted)]">{meta?.connected ? "OAuth connected" : "Not connected"}</span></div>
                {meta?.connected ? <>
                    <p className="text-sm text-[var(--nxg-muted)]">Connected Pages available: {meta.resources.length}. The app receives the Page list from Meta; it does not display or expose access tokens.</p>
                    <label className="block"><span className={labelClass}>Facebook Page destination</span><select className={fieldClass} value={selectedPage} onChange={(event) => setSelectedPage(event.target.value)}><option value="">Select a Page</option>{meta.resources.map((page) => <option key={page.id} value={page.id}>{page.name}</option>)}</select></label>
                    <div className="flex flex-wrap gap-3"><button type="button" onClick={() => void selectMetaPage()} disabled={!selectedPage || saving} className={buttonClass}>{saving ? "Saving..." : "Save Page selection"}</button><button type="button" onClick={() => void disconnectProvider("meta-pages", "Meta")} disabled={saving} className="min-h-10 border border-[var(--nxg-line)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nxg-navy)] disabled:opacity-50">Disconnect</button></div>
                </> : <a href="/api/admin/oauth/meta-pages" className={`${buttonClass} inline-flex items-center`}>Connect Meta account</a>}
                {meta?.resources.length === 0 && meta.connected && <p className="text-xs leading-5 text-amber-900">No Pages were returned. Confirm the account has Page access and the Meta app has the required permissions.</p>}
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold text-[var(--nxg-navy)]">Google Business Profile</h3><span className="text-xs text-[var(--nxg-muted)]">{google?.connected ? "OAuth connected" : "Not connected"}</span></div>
                {google?.connected ? <>
                    <label className="block"><span className={labelClass}>Business account and location</span><select className={fieldClass} value={selectedGoogleLocation} onChange={(event) => setSelectedGoogleLocation(event.target.value)}><option value="">Select a location</option>{google.resources.flatMap((account) => account.locations.map((location) => <option key={`${account.name}::${location.name}`} value={`${account.name}::${location.name}`}>{account.accountName} · {location.title}{location.address ? ` · ${location.address}` : ""}</option>))}</select></label>
                    <div className="flex flex-wrap gap-3"><button type="button" onClick={() => void selectGoogleLocation()} disabled={!selectedGoogleLocation || saving} className={buttonClass}>{saving ? "Saving..." : "Save location selection"}</button><button type="button" onClick={() => void disconnectProvider("google-business-profile", "Google Business Profile")} disabled={saving} className="min-h-10 border border-[var(--nxg-line)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nxg-navy)] disabled:opacity-50">Disconnect</button></div>
                    {google.resourceError && <p role="alert" className="text-xs leading-5 text-red-900">{google.resourceError}</p>}
                    {google.resources.every((account) => account.locations.length === 0) && <p className="text-xs leading-5 text-amber-900">No locations were returned. Confirm Google Business Profile API access and the account&apos;s location permissions.</p>}
                </> : <a href="/api/admin/oauth/google-business-profile" className={`${buttonClass} inline-flex items-center`}>Connect Google account</a>}
            </div>
        </div>}
        <div className="mt-8 border-t border-[var(--nxg-line)] pt-6">
            <div><h3 className="text-xl font-semibold text-[var(--nxg-navy)]">Business profile details</h3><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">These editable values are used for the reviewed Google Business Profile sync. Phone is intentionally omitted until the replacement number is confirmed.</p></div>
            {profile && <form onSubmit={saveProfile} className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2"><span className={labelClass}>Business display name</span><input className={fieldClass} value={profile.displayName} onChange={(event) => setProfile({ ...profile, displayName: event.target.value })} required maxLength={120} /></label>
                <label className="block"><span className={labelClass}>Address</span><input className={fieldClass} value={profile.addressLine1} onChange={(event) => setProfile({ ...profile, addressLine1: event.target.value })} required maxLength={120} /></label>
                <label className="block"><span className={labelClass}>Suite / unit (optional)</span><input className={fieldClass} value={profile.addressLine2} onChange={(event) => setProfile({ ...profile, addressLine2: event.target.value })} maxLength={120} /></label>
                <label className="block"><span className={labelClass}>City</span><input className={fieldClass} value={profile.city} onChange={(event) => setProfile({ ...profile, city: event.target.value })} required maxLength={80} /></label>
                <label className="block"><span className={labelClass}>State / region</span><input className={fieldClass} value={profile.region} onChange={(event) => setProfile({ ...profile, region: event.target.value })} required maxLength={80} /></label>
                <label className="block"><span className={labelClass}>Postal code</span><input className={fieldClass} value={profile.postalCode} onChange={(event) => setProfile({ ...profile, postalCode: event.target.value })} required maxLength={20} /></label>
                <label className="block"><span className={labelClass}>Website URL</span><input type="url" className={fieldClass} value={profile.website} onChange={(event) => setProfile({ ...profile, website: event.target.value })} required maxLength={300} /></label>
                <label className="block sm:col-span-2"><span className={labelClass}>Business email (saved for profile records; not sent to GBP)</span><input type="email" className={fieldClass} value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} required maxLength={254} /></label>
                <div className="flex flex-wrap gap-3 sm:col-span-2"><button type="submit" disabled={saving} className={`${buttonClass} border border-[var(--nxg-navy)] bg-white text-[var(--nxg-navy)]`}>{saving ? "Saving..." : "Save business details"}</button><button type="button" onClick={() => void syncGoogleProfile()} disabled={!google?.connected || !google.selectedGoogleLocation || syncing || saving} className={`${buttonClass} bg-[var(--nxg-red)]`}>{syncing ? "Syncing..." : "Review & sync to Google"}</button></div>
            </form>}
        </div>
    </section>
}
