import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { campaigns, campaignSlugs } from "@/data/campaigns"
import { SITE_URL } from "@/lib/seo"

type CampaignPageProps = {
    params: { slug: string }
    searchParams: Record<string, string | string[] | undefined>
}

export function generateStaticParams() {
    return campaignSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: CampaignPageProps): Metadata {
    const campaign = campaigns[params.slug]
    if (!campaign) return { title: "Campaign not found | NXG Coatings" }

    const canonical = `https://go.nxgcoatingsinc.com/${campaign.slug}`
    return {
        title: `${campaign.service} | NXG Coatings`,
        description: campaign.description,
        alternates: { canonical },
        robots: { index: false, follow: true },
        openGraph: {
            title: campaign.title,
            description: campaign.description,
            url: canonical,
            siteName: "NXG Coatings Inc.",
            images: [{ url: campaign.image, alt: campaign.imageAlt }],
        },
        twitter: { card: "summary_large_image", images: [campaign.image] },
    }
}

export default function CampaignPage({ params, searchParams }: CampaignPageProps) {
    const campaign = campaigns[params.slug]
    if (!campaign) notFound()

    const tracking = new URLSearchParams()
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]) {
        const value = searchParams[key]
        if (typeof value === "string") tracking.set(key, value.slice(0, 300))
    }
    const quoteUrl = `${SITE_URL}/quote${tracking.size ? `?${tracking.toString()}` : ""}`

    return <main className="campaign-page min-h-screen bg-white text-[var(--nxg-charcoal)]">
        <section className="relative flex min-h-[min(760px,90svh)] items-end overflow-hidden bg-[var(--nxg-navy)] text-white">
            <Image src={campaign.image} alt={campaign.imageAlt} fill priority sizes="100vw" className="object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--nxg-navy)] via-[var(--nxg-navy)]/80 to-[var(--nxg-navy)]/20" />
            <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 pt-36 lg:px-10 lg:pb-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">NXG Coatings / {campaign.service}</p>
                <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-7xl">{campaign.title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{campaign.description}</p>
                <div className="mt-8 flex flex-wrap gap-3"><a href={quoteUrl} className="inline-flex min-h-12 items-center gap-6 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Request a project review <span aria-hidden="true" className="text-xl">↗</span></a><a href="tel:+19529004222" className="inline-flex min-h-12 items-center border border-white/45 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-[var(--nxg-navy)]">Call (952) 900-4222</a></div>
                <p className="mt-10 text-[10px] uppercase tracking-[0.15em] text-white/65">For {campaign.audience}</p>
            </div>
        </section>
        <section className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 sm:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-24">
            <div><p className="section-kicker">Project review</p><h2 className="mt-4 text-3xl font-medium sm:text-4xl">A clear first conversation.</h2><p className="mt-4 text-sm leading-6 text-[var(--nxg-muted)]">Every property and scope is different. Share the project details and NXG will follow up to discuss an assessment and estimate.</p></div>
            <ol className="divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)]">{campaign.details.map((detail, index) => <li key={detail} className="flex items-center gap-5 py-5 text-sm"><span className="text-xs font-semibold text-[var(--nxg-red)]">0{index + 1}</span>{detail}</li>)}</ol>
        </section>
        <section className="bg-[var(--nxg-paper)] px-6 py-12 text-center"><p className="text-sm text-[var(--nxg-muted)]">Serving the Twin Cities from Edina, Minnesota.</p><a href={quoteUrl} className="mt-5 inline-flex min-h-12 items-center gap-6 bg-[var(--nxg-navy)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[var(--nxg-red)]">Start your request <span aria-hidden="true" className="text-xl">↗</span></a></section>
    </main>
}