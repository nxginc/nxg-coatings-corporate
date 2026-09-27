import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import EnhancedHero from "@/components/enhanced-hero"
import { ASSETS } from "@/lib/assets"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("process", "/process")

const steps = [
  { title: "Initial consultation", description: "Discuss the property, surfaces, desired finish, access needs, and project priorities." },
  { title: "Detailed proposal", description: "Review the agreed scope, materials, preparation, schedule considerations, and estimate." },
  { title: "Preparation", description: "Clean, protect, repair, and prepare the surfaces included in the project plan." },
  { title: "Application", description: "Apply the selected coating system to the prepared surfaces with attention to the agreed finish." },
  { title: "Inspection and cleanup", description: "Review completed work, address the agreed details, and leave the site orderly." },
  { title: "Final walkthrough", description: "Walk the project together and discuss care or maintenance recommendations." },
]

export default function ProcessPage() {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <EnhancedHero
        title="A clear process from first walk to final walkthrough."
        subtitle="Six practical checkpoints help keep scope, preparation, application, and review connected."
        backgroundImage={ASSETS.hero.process}
        height="large"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Start with an estimate <span aria-hidden="true">↗</span></Link>
      </EnhancedHero>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-8 border-b border-[var(--nxg-line)] pb-7 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="section-kicker">How a project moves</p><h2 className="mt-4 text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">Plan the work before the work begins.</h2></div>
          <p className="max-w-2xl self-end text-base leading-7 text-[var(--nxg-muted)]">Each property is different. The proposal sets out the agreed scope and details; the project team uses those details to coordinate access, preparation, application, cleanup, and the final review.</p>
        </div>
        <ol className="mt-4 grid md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[50px_1fr] gap-4 border-b border-[var(--nxg-line)] py-6 sm:gap-6 sm:py-8 md:pr-8">
              <span className="text-xs font-semibold text-[var(--nxg-red)]">0{index + 1}</span>
              <div><h3 className="text-xl font-semibold text-[var(--nxg-navy)] sm:text-2xl">{step.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[var(--nxg-muted)]">{step.description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--nxg-paper)] px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[var(--nxg-content-width)] gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div><p className="section-kicker">Before the estimate</p><h2 className="mt-4 text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-4xl">Bring the details you already know.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[var(--nxg-muted)]">Project type, location, surfaces, timing, and reference images help us prepare for a useful first conversation. It is fine if some details are still undecided.</p><Link href="/quote" className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Request an estimate <ArrowUpRight className="h-4 w-4" /></Link></div>
          <figure className="relative aspect-[4/3] overflow-hidden bg-white"><Image src={ASSETS.featuredHome.four} alt="NXG Coatings project finish" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></figure>
        </div>
      </section>
    </main>
  )
}