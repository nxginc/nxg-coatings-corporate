"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import {
  buildChannelCaption,
  SOCIAL_CAPTION_STARTERS,
  SOCIAL_CHANNELS,
  type CampaignChannelVariant,
  type SocialPlatform,
} from "@/data/marketing-templates"

type Platform = SocialPlatform
type Campaign = {
  id: string
  slug: string
  title: string
  service: string
  audience: string
  landingPath: string
  imageUrl: string | null
  channelVariants: Partial<Record<Platform, CampaignChannelVariant>>
  status: string
}
type SocialPost = {
  id: string
  campaignId: string
  campaignSlug: string
  platform: Platform
  caption: string
  status: string
  scheduledAt: string | null
  destinationUrl: string | null
}

const inputClass = "min-h-11 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm focus:border-[var(--nxg-navy)]"
const labelClass = "mb-2 block text-xs font-semibold text-[var(--nxg-navy)]"
const platforms = SOCIAL_CHANNELS
const campaignChannels = platforms.filter(({ manualOnly }) => !manualOnly)

export default function ContentWorkbench() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [platform, setPlatform] = useState<Platform>("facebook")
  const [caption, setCaption] = useState("")
  const [campaignId, setCampaignId] = useState("")
  const [destinationUrl, setDestinationUrl] = useState("")
  const [scheduleMin, setScheduleMin] = useState("")
  const [batchingCampaignId, setBatchingCampaignId] = useState("")
  const approvedCampaigns = useMemo(() => campaigns.filter((campaign) => campaign.status === "approved"), [campaigns])
  const calendarPosts = useMemo(() => [...posts].sort((first, second) => {
    if (!first.scheduledAt) return second.scheduledAt ? 1 : 0
    if (!second.scheduledAt) return -1
    return new Date(first.scheduledAt).getTime() - new Date(second.scheduledAt).getTime()
  }), [posts])
  const selectedCampaign = approvedCampaigns.find((campaign) => campaign.id === campaignId)
  const selectedVariant = selectedCampaign?.channelVariants?.[platform]
  const platformLimit = platforms.find((item) => item.value === platform)!.limit

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
  useEffect(() => {
    const minimum = new Date(Date.now() + 60_000)
    minimum.setMinutes(minimum.getMinutes() - minimum.getTimezoneOffset())
    setScheduleMin(minimum.toISOString().slice(0, 16))
  }, [])

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
    const slug = String(values.slug ?? "")
    const channelVariants: Record<string, { caption: string; cta: string }> = {}
    for (const { value } of campaignChannels) {
      const channelCaption = String(values[`${value}Caption`] ?? "").trim()
      if (channelCaption) channelVariants[value] = { caption: channelCaption, cta: "Request a project review" }
    }
    try {
      await postJson("/api/admin/campaigns", "POST", { ...values, landingPath: `/campaigns/${slug}`, channelVariants })
      form.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Campaign could not be saved.")
    }
  }

  async function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const scheduledAt = String(values.scheduledAt ?? "")
    try {
      await postJson("/api/admin/social-posts", "POST", {
        ...values,
        scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : undefined,
        mediaAssetIds: [],
      })
      form.reset()
      setPlatform("facebook")
      setCaption("")
      setCampaignId("")
      setDestinationUrl("")
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Social draft could not be saved.")
    }
  }

  async function createCampaignDraftBatch(campaign: Campaign) {
    const existingPlatforms = new Set(posts
      .filter((post) => post.campaignId === campaign.id)
      .map((post) => post.platform))
    const batchPosts = campaignChannels.flatMap(({ value }) => {
      const caption = buildChannelCaption(campaign.channelVariants, value)
      if (!caption || existingPlatforms.has(value)) return []
      return [{
        platform: value,
        caption,
        destinationUrl: new URL(campaign.landingPath, window.location.origin).toString(),
      }]
    })

    if (batchPosts.length === 0) {
      setError("This approved campaign has no unused channel variants to create.")
      return
    }

    setBatchingCampaignId(campaign.id)
    try {
      await postJson("/api/admin/social-posts/batch", "POST", {
        campaignId: campaign.id,
        posts: batchPosts,
      })
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Social draft batch could not be saved.")
    } finally {
      setBatchingCampaignId("")
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
          <p className="-mt-2 text-xs text-[var(--nxg-muted)]">Public landing path: /campaigns/&lt;slug&gt; (available after campaign approval).</p>
          <label className="block"><span className={labelClass}>Description *</span><textarea name="description" className="min-h-24 w-full border border-[var(--nxg-line)] p-3 text-sm" required minLength={20} maxLength={5000} /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label><span className={labelClass}>Service *</span><input name="service" className={inputClass} required maxLength={120} /></label><label><span className={labelClass}>Audience *</span><input name="audience" className={inputClass} required maxLength={160} /></label></div>
          <label className="block"><span className={labelClass}>Campaign image URL</span><input name="imageUrl" type="url" className={inputClass} placeholder="ImageKit URL for approved campaign photography" /></label>
          <fieldset className="space-y-3 border-t border-[var(--nxg-line)] pt-4">
            <legend className="text-xs font-semibold text-[var(--nxg-navy)]">Optional channel copy for reuse in social drafts</legend>
            {campaignChannels.map(({ value, label }) => (
              <label key={value} className="block">
                <span className={labelClass}>{label}</span>
                <textarea name={`${value}Caption`} className="min-h-20 w-full border border-[var(--nxg-line)] p-3 text-sm" maxLength={5000} />
              </label>
            ))}
          </fieldset>
          <button className="min-h-11 bg-[var(--nxg-navy)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white">Save draft</button>
        </form>

        <form onSubmit={createPost} className="space-y-4 border border-[var(--nxg-line)] bg-white p-5 sm:p-7">
          <div><p className="section-kicker">Social copy</p><h2 className="mt-2 text-xl font-semibold text-[var(--nxg-navy)]">Create post draft</h2></div>
          <label className="block"><span className={labelClass}>Approved campaign *</span><select name="campaignId" className={inputClass} required value={campaignId} onChange={(event) => { const nextId = event.target.value; setCampaignId(nextId); const nextCampaign = approvedCampaigns.find((campaign) => campaign.id === nextId); setDestinationUrl(nextCampaign ? new URL(nextCampaign.landingPath, window.location.origin).toString() : ""); setCaption(buildChannelCaption(nextCampaign?.channelVariants, platform)) }}><option value="">Select a campaign</option>{approvedCampaigns.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.title}</option>)}</select></label>
          <label className="block"><span className={labelClass}>Channel *</span><select name="platform" className={inputClass} required value={platform} onChange={(event) => { const nextPlatform = event.target.value as Platform; setPlatform(nextPlatform); setCaption(buildChannelCaption(selectedCampaign?.channelVariants, nextPlatform)) }}>{platforms.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
          {platform === "marketplace" && <p className="border-l-2 border-amber-600 bg-amber-50 p-3 text-xs leading-5 text-amber-950">Marketplace copy is a manual handoff only. Do not include personal data or unverified claims; posting requires human review.</p>}
          <fieldset className="space-y-2"><legend className={labelClass}>Caption starters</legend><p className="mb-2 text-xs text-[var(--nxg-muted)]">Use as a starting point, adapt to the channel, and verify project details before review.</p><div className="flex flex-wrap gap-2">{SOCIAL_CAPTION_STARTERS.map((starter) => <button key={starter.label} type="button" onClick={() => setCaption(starter.caption)} className="min-h-9 border border-[var(--nxg-line)] px-3 text-xs font-medium text-[var(--nxg-navy)] hover:bg-[var(--nxg-paper)]">{starter.label}</button>)}</div></fieldset>
          <label className="block"><span className={labelClass}>Caption *</span><textarea name="caption" className="min-h-36 w-full border border-[var(--nxg-line)] p-3 text-sm" required value={caption} maxLength={platformLimit} onChange={(event) => setCaption(event.target.value)} aria-describedby="caption-count" /></label>
          <div id="caption-count" className="text-right text-xs text-[var(--nxg-muted)]">{caption.length} / {platformLimit}</div>
          {selectedVariant?.cta && <p className="text-xs text-[var(--nxg-muted)]">Campaign CTA: {selectedVariant.cta}</p>}
          <label className="block"><span className={labelClass}>Destination URL</span><input name="destinationUrl" type="url" className={inputClass} value={destinationUrl} onChange={(event) => setDestinationUrl(event.target.value)} /></label>
          <label className="block"><span className={labelClass}>Requested publish time (optional)</span><input name="scheduledAt" type="datetime-local" className={inputClass} min={scheduleMin} /><span className="mt-1 block text-xs leading-5 text-[var(--nxg-muted)]">Shown in your local time and saved as a requested schedule only. It does not publish or queue content with a provider.</span></label>
          <button disabled={!approvedCampaigns.length} className="min-h-11 bg-[var(--nxg-navy)] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-40">Save social draft</button>
        </form>
      </section>
      <section className="border-t border-[var(--nxg-line)] pt-8"><p className="section-kicker">Content queue</p><h2 className="mt-2 text-2xl font-semibold text-[var(--nxg-navy)]">Campaigns</h2>{loading ? <p className="py-6 text-sm text-[var(--nxg-muted)]">Loading campaigns...</p> : campaigns.length ? <ul className="mt-5 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{campaigns.map((campaign) => {
        const hasAvailableVariants = campaignChannels.some(({ value }) =>
          Boolean(buildChannelCaption(campaign.channelVariants, value)) &&
          !posts.some((post) => post.campaignId === campaign.id && post.platform === value),
        )
        return <li key={campaign.id} className="flex flex-wrap items-center justify-between gap-4 p-4"><div><h3 className="font-semibold">{campaign.title}</h3><p className="mt-1 text-xs text-[var(--nxg-muted)]">{campaign.landingPath} · {campaign.service} · <span className="uppercase">{campaign.status}</span></p>{campaign.status === "approved" && <a href={campaign.landingPath} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-[var(--nxg-navy)] underline">Open landing page</a>}</div><div className="flex flex-wrap items-center gap-4">{campaign.status === "approved" && <button type="button" disabled={!hasAvailableVariants || batchingCampaignId === campaign.id} onClick={() => void createCampaignDraftBatch(campaign)} className="text-xs font-semibold text-[var(--nxg-navy)] underline disabled:opacity-40">{batchingCampaignId === campaign.id ? "Creating drafts..." : "Create drafts for unused channels"}</button>}{reviewActions(campaign.status, (action) => void campaignAction(campaign.id, action))}</div></li>
      })}</ul> : <p className="mt-5 bg-white p-5 text-sm text-[var(--nxg-muted)]">No campaigns yet. Create a campaign draft to start planning content.</p>}</section>
      <section className="mt-10 border-t border-[var(--nxg-line)] pt-8"><h2 className="text-2xl font-semibold text-[var(--nxg-navy)]">Social publishing calendar</h2><p className="mt-2 text-sm text-[var(--nxg-muted)]">Requested dates are planning metadata until a provider is connected and scheduling is enabled.</p>{loading ? <p className="py-6 text-sm text-[var(--nxg-muted)]">Loading posts...</p> : calendarPosts.length ? <ul className="mt-5 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)] bg-white">{calendarPosts.map((post) => <li key={post.id} className="flex flex-wrap items-start justify-between gap-4 p-4"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-red)]">{platforms.find((item) => item.value === post.platform)?.label ?? post.platform} · {post.campaignSlug} · {post.status}</p><p className="mt-1 text-xs text-[var(--nxg-muted)]">{post.scheduledAt ? `Requested: ${new Date(post.scheduledAt).toLocaleString()}` : "No publish time requested"}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6">{post.caption}</p>{post.destinationUrl && <a href={post.destinationUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block break-all text-xs text-[var(--nxg-navy)] underline">{post.destinationUrl}</a>}</div>{reviewActions(post.status, (action) => void postAction(post.id, action))}</li>)}</ul> : <p className="mt-5 bg-white p-5 text-sm text-[var(--nxg-muted)]">No social drafts yet. Approved campaigns can be adapted to each channel here.</p>}</section>
      <p className="mt-8 border-l-2 border-[var(--nxg-red)] pl-4 text-xs leading-5 text-[var(--nxg-muted)]">Approved drafts still require a connected publishing provider and approved account permissions. Facebook Marketplace is manual-only; automatic publishing is not enabled.</p>
    </div>
  </main>
}