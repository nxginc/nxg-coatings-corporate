import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("services", "/services")

const services = [
  { title: "Exterior painting", description: "Surface preparation and finish planning for siding, trim, doors, and exposed details.", image: ASSETS.services.exterior, href: "/services/exterior-painting", type: "Residential" },
  { title: "Interior painting", description: "Careful room-by-room painting with protection, preparation, and a coordinated finish.", image: ASSETS.services.interior, href: "/services/interior-painting", type: "Residential" },
  { title: "Cabinet refinishing", description: "A new finish for sound kitchen and bath cabinetry without a full replacement project.", image: ASSETS.cabinets.hero, href: "/services/cabinet-refinishing", type: "Specialty" },
  { title: "Deck staining", description: "Cleaning, preparation, and stain or sealer selection for outdoor wood surfaces.", image: ASSETS.services.deck, href: "/services/deck-staining", type: "Exterior" },
  { title: "Fine finish and millwork", description: "Detail-focused finishing for trim, windows, doors, and architectural woodwork.", image: ASSETS.services.fineFinish, href: "/quote?service=fine-finish", type: "Specialty" },
  { title: "Pressure cleaning", description: "Surface cleaning and preparation for exterior and outdoor projects.", image: ASSETS.services.pressureCleaning, href: "/quote?service=pressure-cleaning", type: "Preparation" },
  { title: "Paint restoration", description: "Repair and repainting plans for worn or damaged painted surfaces.", image: ASSETS.services.restoration, href: "/quote?service=restoration", type: "Restoration" },
  { title: "Commercial painting", description: "Phased painting plans for offices, retail, and active commercial properties.", image: ASSETS.industries.commercial, href: "/industries/commercial", type: "Commercial" },
  { title: "Industrial coatings", description: "Coating scopes for facility surfaces, floors, equipment, and safety markings.", image: ASSETS.industries.industrial, href: "/industries/industrial", type: "Industrial" },
]

export default function ServicesPage() {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow="NXG Coatings / Services"
        title="The right finish begins with the right plan."
        description="Painting and coating services for homes, businesses, and facilities across the Twin Cities."
        image={ASSETS.hero.services}
        imageAlt="NXG Coatings project photography"
        height="large"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-5 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Request an estimate <span aria-hidden="true" className="text-lg">↗</span></Link>
        <Link href="/process" className="inline-flex min-h-12 items-center border border-white/55 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">How we work</Link>
      </ParallaxHero>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-6 border-b border-[var(--nxg-line)] pb-7 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div><p className="section-kicker">Service directory</p><h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">Surfaces, spaces, and scopes.</h2></div>
          <p className="max-w-xl text-sm leading-7 text-[var(--nxg-muted)]">Every estimate starts with the property and the work it needs. Explore a service, then share the details that matter for your project.</p>
        </div>
        <div className="mt-7 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={service.title} className="group min-w-0 border-b border-[var(--nxg-line)] pb-5">
              <Link href={service.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--nxg-paper)]">
                  <Image src={service.image} alt={`${service.title} project photography`} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                  <span className="absolute left-3 top-3 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)]">{service.type}</span>
                </div>
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-red)]">0{index + 1}</p><h3 className="mt-2 text-xl font-semibold text-[var(--nxg-navy)]">{service.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">{service.description}</p></div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--nxg-navy)] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--nxg-red)]" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--nxg-navy)] px-6 py-14 text-white lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[var(--nxg-content-width)] gap-9 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="section-kicker">Across every scope</p><h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight sm:text-5xl">Preparation, application, and a clear finish line.</h2></div>
          <ol className="grid gap-x-7 sm:grid-cols-3">
            {["Walk the property", "Agree on scope", "Review the work"].map((step, index) => <li key={step} className="border-t border-white/25 py-4"><span className="text-[10px] font-semibold text-[var(--nxg-platinum)]">0{index + 1}</span><h3 className="mt-3 text-lg font-semibold">{step}</h3><p className="mt-2 text-sm leading-6 text-white/65">A straightforward checkpoint to keep expectations aligned.</p></li>)}
          </ol>
        </div>
      </section>
    </main>
  )
}