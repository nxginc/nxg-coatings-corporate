import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ColorConsultationClient from "./ColorConsultationClient"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"

export const metadata: Metadata = {
  title: "Color Consultation Services | NXG Coatings",
  description: "Explore in-person and virtual color consultation options for interior and exterior painting projects.",
  openGraph: {
    title: "Color Consultation Services | NXG Coatings",
    description: "Explore in-person and virtual color consultation options for interior and exterior painting projects.",
    images: [{ url: ASSETS.consultation.color, width: 1200, height: 630, alt: "Color consultation by NXG Coatings" }],
  },
}

const consultationOptions = [
  {
    title: "In-person consultation",
    description: "Discuss the project, surfaces, lighting, and color goals together in the space.",
    image: ASSETS.consultation.inPerson,
    alt: "In-person color consultation",
  },
  {
    title: "Virtual consultation",
    description: "Review project photos and questions remotely as you explore color and finish options.",
    image: ASSETS.consultation.virtual,
    alt: "Virtual color consultation",
  },
  {
    title: "Color planning",
    description: "Consider palette, sheen, and how the finish will relate to the surrounding materials.",
    image: ASSETS.consultation.color,
    alt: "Paint color consultation and planning",
  },
]

export default function ColorConsultationPage() {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow="NXG Coatings / Color consultation"
        title="Choose a color with the whole space in mind."
        description="Explore color, lighting, and finish choices with an in-person or virtual consultation."
        image={ASSETS.consultation.color}
        imageAlt="Color consultation by NXG Coatings"
        height="large"
      >
        <ColorConsultationClient />
        <Link href="/schedule" className="inline-flex min-h-12 items-center border border-white/60 px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">
          Explore scheduling
        </Link>
      </ParallaxHero>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-3xl border-b border-[var(--nxg-line)] pb-7">
          <p className="section-kicker">Ways to consult</p>
          <h2 className="mt-4 text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">Make the color decision feel clearer.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--nxg-muted)]">The right format depends on your project and what you would like to review. Start with the option that fits, then share the details when you schedule.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {consultationOptions.map((option, index) => (
            <article key={option.title} className="min-w-0 border border-[var(--nxg-line)] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--nxg-paper)]">
                <Image src={option.image} alt={option.alt} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-red)]">0{index + 1} / Consultation</p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--nxg-navy)]">{option.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">{option.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
