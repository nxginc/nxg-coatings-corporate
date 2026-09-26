import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("industries", "/industries")

const industries = [
  { slug: "residential", name: "Residential", image: ASSETS.industries_featured.residential_featured, summary: "Painting and coating plans for homes, from detailed interiors to exterior surfaces exposed to Minnesota seasons.", focus: "Homeowners" },
  { slug: "commercial", name: "Commercial", image: ASSETS.industries_featured.commercial_featured, summary: "Phased scopes for offices, retail, and active business environments, planned around access and operations.", focus: "Business and property teams" },
  { slug: "industrial", name: "Industrial", image: ASSETS.industries_featured.industrial_featured, summary: "Facility and equipment coating scopes for demanding surfaces, safety needs, and maintenance plans.", focus: "Facility and operations teams" },
  { slug: "hoa", name: "HOA and multi-family", image: ASSETS.industries_featured.hoa_featured, summary: "Coordinated exterior, common-area, and turnover work for associations and property managers.", focus: "Associations and managers" },
]

export default function IndustriesPage() {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow="NXG Coatings / Who we work with"
        title="Different properties. Thoughtful plans."
        description="Painting and coating scopes shaped around the buildings, people, and operations they serve."
        image={ASSETS.industries_featured.hoa_featured}
        imageAlt="Multi-family property painting project"
        height="large"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-5 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Discuss a project <span aria-hidden="true" className="text-lg">↗</span></Link>
      </ParallaxHero>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-5 border-b border-[var(--nxg-line)] pb-6 sm:flex-row sm:items-end">
          <div><p className="section-kicker">Industry experience</p><h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">Work planned for the way a space is used.</h2></div>
          <p className="max-w-md text-sm leading-6 text-[var(--nxg-muted)]">Start with your property type to explore common scopes and project considerations.</p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {industries.map((industry, index) => (
            <article key={industry.slug} className="group min-w-0 border border-[var(--nxg-line)] bg-white">
              <Link href={`/industries/${industry.slug}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--nxg-paper)]">
                  <Image src={industry.image} alt={`${industry.name} painting and coating project`} fill sizes="(min-width: 768px) 48vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                  <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)]">0{index + 1} / {industry.focus}</span>
                </div>
                <div className="flex items-start justify-between gap-5 p-5 sm:p-7">
                  <div><h3 className="text-2xl font-medium text-[var(--nxg-navy)]">{industry.name}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[var(--nxg-muted)]">{industry.summary}</p></div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--nxg-navy)] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--nxg-red)]" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--nxg-paper)] px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[var(--nxg-content-width)] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="section-kicker">What stays consistent</p><h2 className="mt-4 text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-4xl">Clear scope, careful preparation, a final walkthrough.</h2></div>
          <div className="grid border-t border-[var(--nxg-line)] sm:grid-cols-3 sm:border-l">
            {["Listen and assess", "Plan the work", "Review together"].map((step, index) => <div key={step} className="border-b border-[var(--nxg-line)] py-5 sm:border-l sm:px-5"><span className="text-[10px] font-semibold text-[var(--nxg-red)]">0{index + 1}</span><h3 className="mt-3 text-lg font-semibold text-[var(--nxg-navy)]">{step}</h3><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">A practical checkpoint in each project conversation.</p></div>)}
          </div>
        </div>
      </section>
    </main>
  )
}