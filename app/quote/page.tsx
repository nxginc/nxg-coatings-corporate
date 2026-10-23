import type { Metadata } from "next"
import { seo } from "@/lib/seo"
import ParallaxHero from "@/components/parallax-hero"
import { MultiStepForm } from "@/components/multi-step-form"
import { ASSETS } from "@/lib/assets"

export const metadata: Metadata = seo("quote", "/quote")

const quoteServices: Record<string, string> = {
  exteriorpainting: "Exterior painting",
  interiorpainting: "Interior painting",
  cabinetrefinishing: "Cabinet refinishing",
  deckstaining: "Deck staining",
  deckstainingandrefinishing: "Deck staining",
  finefinishandmillwork: "Fine finish and millwork",
  finefinishandmillworkpainting: "Fine finish and millwork",
  colorconsultation: "Color consultation",
  commercialpainting: "Commercial painting",
  commercialcoatings: "Commercial coatings",
  industrialcoatings: "Industrial coatings",
  pressurecleaning: "Pressure cleaning",
  paintrestoration: "Paint restoration",
  restoration: "Paint restoration",
  protectivecoatings: "Protective coatings",
  other: "Other",
}

type QuotePageProps = {
  searchParams?: { service?: string | string[] }
}

export default function QuotePage({ searchParams }: QuotePageProps) {
  const serviceParam = typeof searchParams?.service === "string" ? searchParams.service : ""
  const initialService = quoteServices[serviceParam.toLowerCase().replace(/[^a-z]/g, "")] || ""

  return (
    <main className="min-h-screen">
      <ParallaxHero
        eyebrow="NXG Coatings / Project inquiry"
        title="Start with a clear scope."
        description="Tell us about the property, surfaces, and timing. We will use the details to plan the next step."
        image={ASSETS.hero.fallback}
        imageAlt="NXG residential coating project"
        height="medium"
      />

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div><p className="section-kicker">Estimate request</p><h2 className="mt-3 text-3xl font-medium text-[var(--nxg-navy)]">A few details help us prepare.</h2><p className="mt-4 text-sm leading-6 text-[var(--nxg-muted)]">Share the scope, location, and timing. The form guides you through the information needed for an initial conversation.</p></div>
          <div className="border border-[var(--nxg-line)] p-4 sm:p-6"><MultiStepForm initialService={initialService} /></div>
        </div>
      </section>
    </main>
  )
}
