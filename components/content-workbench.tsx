"use client"

import { useEffect, useState, type FormEvent } from "react"

type Campaign = { id: string; slug: string; title: string; service: string; audience: string; status: string }
type SocialPost = { id: string; campaignId: string; campaignSlug: string; platform: string; caption: string; status: string }

const platforms = ["facebook", "instagram", "linkedin", "google", "marketplace"]
const inputClass = "min-h-11 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm focus:border-[var(--nxg-navy)]"
const labelClass = "mb-2 block text-xs font-semibold text-[var(--nxg-navy)]"

export default function ContentWorkbench() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function refresh() {
    setLoading(true)
    setError("")
    try {
      const [campaignResponse, postResponse] = await Promise.all([
        fetch("/api/admin/campaigns", { cache: "no-store" }),
        fetch("/api/admin/social-posts", { cache: "no-store" }),
      ])
      const [campaignResult, postResult] = await Promise.all([campaignResponse.json(), postResponse.json()])
      if (!campaignResponse.ok || !postResponse.ok) throw new Error(campaignResult.error || postResult.error || "Content could not be loaded.")
      setCampaigns(campaignResult.campaigns)
      setPosts(postResult.posts)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Content could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void refresh() }, [])

  async function postJson(url: string, method: string, body: Record<string, unknown>) {
    const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const result = await response.json().catch(() => null)
    if (!response.ok) throw new Error(result?.error || "Request failed.")
    await refresh()
  }

  async function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    try {
      await postJson("/api/admin/campaigns", "POST", values)
      form.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Campaign could not be saved.")
    }
  }

  async function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    try {
      await postJson("/api/admin/social-posts", "POST", values)
      form.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Social draft could not be saved.")
    }
  }

  async function campaignAction(id: string, action: string) {
    try {
      await postJson(`/api/admin/campaigns/${id}`, "PATCH", { action })
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Campaign action failed.")
    }
  }

  async function postAction(id: string, action: string) {
    try {
      await postJson(`/api/admin/social-posts/${id}`, "PATCH", { action })
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Social post action failed.")
    }
  }

  function reviewActions(status: string, run: (action: string) => void) {
    if (status === "draft") return <button type="button" onClick={() => run("submit_for_review")} className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--nxg-red)] underline">Send to review</button>
    if (status === "review") return <span className="flex gap-4"><button type="button" onClick={() => run("approve")} className="text-xs font-semibold uppercase tracking-[0.08em] text-green-800 underline">Approve</button><button type="button" onClick={() => run("reject")} className="text-xs font-semibold uppercase tracking-[0.08em] text-red-800 underline">Reject</button></span>
    if (status === "rejected") return <button type="button" onClick={() => run("revise")} className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--nxg-red)] underline">Return to draft</button>
    return null
  }

  return <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-10 text-[var(--nxg-charcoal)] sm:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5"><div><p className="section-kicker">NXG marketing</p><h1 className="mt-2 text-3xl font-semibold text-[var(--nxg-navy)]">Campaign workbench</h1><p className="mt-2 text-sm text-[var(--nxg-muted)]">Create campaign records and platform-specific drafts. Nothing publishes from this screen.</p></div><button type="button" onClick={() => void refresh()} className="min-h-10 border border-[var(--nxg-line)] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em]">Refresh</button></div>
      {error && <p role="alert" className="mt-5 border border-red-300 bg-white p-4 text-sm text-red-900">{error}</p>}
      <section className="grid gap-8 py-9 lg:grid-cols-2">
        <form onSubmit={createCampaign} className="space-y-4 border border-[var(--nxg-line)] bg-white p-5 sm:p-7">
          <div><p className="section-kicker">Campaign</p><h2 className="mt-2 text-xl font-semibold text-[var(--nxg-navy)]">Create campaign draft</h2></div>
          <label className="block"><span className={labelClass}>Title *</span><input name="title" className={inputClass} required minLength={4} maxLength={140} /></label>
          <label className="block"><span className={labelClass}>Slug *</span><input name="slug" className={inputClass} required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={100} placeholder="spring-exterior" /></label>
          <label className="block"><span className={labelClass}>Description *</span><textarea name="description" className="min-h-24 w-full border border-[var(--nxg-line)] p-3 text-sm" required minLength={20} maxLength={5000} /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label><span className={labelClass}>Service *</span><input name="service" className={inputClass} required maxLength={120} /></label><label><span className={labelClass}>Audience *</span><input name="audience" className={inputClass} required maxLength={160} /></label></div>
          <label className="block"><span className={labelClass}>Landing path *</span><input name="landingPath" className={inputClass} required pattern="/[a-z0-9/-]*" placeholder="/campaigns/spring-exterior" /></label>
          <label className="block"><span className={labelClass}>Approved image URL</span><input name="imageUrl" type="url" className={inputClass} /></label>
          <button className="min-h-11 bg-[var(--nxg-navy)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white">Save draft</button>
        </form>

        <form onSubmit={createPost} className="space-y-4 border border-[var(--nxg-line)] bg-white p-5 sm:p-7">
          <div><p className="section-kicker">Social copy</p><h2 className="mt-2 text-xl font-semibold text-[var(--nxg-navy)]">Create post draft</h2></div>
          <label className="block"><span className={labelClass}>Approved campaign *</span><select name="campaignId" className={inputClass} required defaultValue=""><option value="" disabled>Select a campaign</option>{campaigns.filter((campaign) => campaign.status === "approved").map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.title}</option>)}</select></label>
          <label className="block"><span className={labelClass}>Channel *</span><select name="platform" className={inputClass} required>{platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}</select></label>
          <label className="block"><span className={labelClass}>Caption *</span><textarea name="caption" className="min-h-36 w-full border border-[var(--nxg-line)] p-3 text-sm" required maxLength={5000} /></label>
          <label className="block"><span className={labelClass}>Destination URL</span><input name="destinationUrl" type="url" className={inputClass} /></label>
          <button disabled={!campaigns.some((campaign) => campaign.status === "approved")} className="min-h-11 bg-[var(--nxg-navy)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-40">Save social draft</button>
        </form>
      </section>
      <section className="border-t border-[var(--nxg-line)] pt-8"><p className="section-kicker">Content queue</p><h2 className="mt-2 text-2xl font-semibold text-[var(--nxg-navy)]">Campaigns</h2>{loading ? <p className="py-6 text-sm text-[var(--nxg-muted)]">Loading campaigns...</p> : <ul className="mt-5 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{campaigns.map((campaign) => <li key={campaign.id} className="flex flex-wrap items-center justify-between gap-4 p-4"><div><h3 className="font-semibold">{campaign.title}</h3><p className="mt-1 text-xs text-[var(--nxg-muted)]">/{campaign.slug} · {campaign.service} · <span className="uppercase">{campaign.status}</span></p></div>{reviewActions(campaign.status, (action) => void campaignAction(campaign.id, action))}</li>)}</ul>}</section>
      <section className="mt-10 border-t border-[var(--nxg-line)] pt-8"><h2 className="text-2xl font-semibold text-[var(--nxg-navy)]">Social drafts</h2>{loading ? <p className="py-6 text-sm text-[var(--nxg-muted)]">Loading posts...</p> : <ul className="mt-5 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{posts.map((post) => <li key={post.id} className="flex flex-wrap items-start justify-between gap-4 p-4"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-red)]">{post.platform} · {post.campaignSlug} · {post.status}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6">{post.caption}</p></div>{reviewActions(post.status, (action) => void postAction(post.id, action))}</li>)}</ul>}</section>
      <p className="mt-8 border-l-2 border-[var(--nxg-red)] pl-4 text-xs leading-5 text-[var(--nxg-muted)]">Approved drafts still require a connected publishing provider and approved account permissions. Facebook Marketplace is manual-only; automatic publishing is not enabled.</p>
    </div>
  </main>
}