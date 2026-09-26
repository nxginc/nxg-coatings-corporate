import type { Metadata } from "next"
import Image from "next/image"
import { ASSETS } from "@/lib/assets"
import PartnerApplicationForm from "@/components/partner-application-form"

export const metadata: Metadata = {
    title: "Trade Partner Network | NXG Coatings",
    description: "Apply to join the NXG Coatings trade partner network serving the Twin Cities.",
    alternates: { canonical: "https://nxgcoatingsinc.com/partners" },
    openGraph: {
        title: "Trade Partner Network | NXG Coatings",
        description: "Apply to join the NXG Coatings trade partner network serving the Twin Cities.",
        url: "https://nxgcoatingsinc.com/partners",
        images: [{ url: ASSETS.services.exterior, alt: "NXG Coatings project photography" }],
    },
}

export default function PartnersPage() {
    return <main className="bg-white text-[var(--nxg-charcoal)]">
        <section className="relative flex min-h-[380px] items-end overflow-hidden bg-[var(--nxg-navy)] text-white sm:min-h-[480px]">
            <Image src={ASSETS.services.exterior} alt="Exterior painting project" fill priority sizes="100vw" className="object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--nxg-navy)] via-[var(--nxg-navy)]/80 to-transparent" />
            <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-12 pt-32 lg:px-10 lg:pb-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">NXG / Trade network</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Good work takes a good team.</h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/75">Tell us about your trade and coverage area. Applications are reviewed before any directory listing or project invitation.</p>
            </div>
        </section>
        <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-14 lg:grid-cols-[0.65fr_1.35fr] lg:px-10 lg:py-20">
            <aside><p className="section-kicker">Partner onboarding</p><h2 className="mt-4 text-3xl font-medium">Start with the essentials.</h2><p className="mt-4 text-sm leading-6 text-[var(--nxg-muted)]">Share your company details, core trade, and Twin Cities coverage. If there is a fit, NXG will follow up about qualifications and documentation.</p><div className="mt-8 border-t border-[var(--nxg-line)] pt-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)]">Review stages</p><ol className="mt-4 space-y-3 text-sm text-[var(--nxg-muted)]"><li><span className="mr-3 text-[var(--nxg-red)]">01</span>Application received</li><li><span className="mr-3 text-[var(--nxg-red)]">02</span>Qualification review</li><li><span className="mr-3 text-[var(--nxg-red)]">03</span>Follow-up from NXG</li></ol></div></aside>
            <PartnerApplicationForm />
        </section>
    </main>
}