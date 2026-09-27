import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import EnhancedHero from "@/components/enhanced-hero"
import { ASSETS } from "@/lib/assets"

const values = [
  { title: "Quality and integrity", description: "Keep the scope clear, communicate directly, and take care with the details." },
  { title: "Customer focus", description: "Plan around the property, the people who use it, and the priorities of the project." },
  { title: "Excellence", description: "Give preparation, application, and cleanup equal attention." },
]

export default function AboutPageClient() {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <EnhancedHero
        title="A company built around the work."
        subtitle="NXG Coatings brings preparation, planning, and finish together on every project."
        backgroundImage={ASSETS.blog.aboutBanner}
        height="large"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Start a project <span aria-hidden="true">↗</span></Link>
      </EnhancedHero>

      <section className="mx-auto grid max-w-[var(--nxg-content-width)] gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
        <div><p className="section-kicker">Our story / Since 2008</p><h2 className="mt-5 max-w-md text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">Good finishes are planned before they are applied.</h2></div>
        <div className="max-w-3xl text-base leading-7 text-[var(--nxg-muted)]">
          <p>Founded in 2008, NXG Coatings began with a focus on painting and coating work done with care. Today the team serves residential, commercial, and industrial projects throughout the Twin Cities region.</p>
          <p className="mt-5">Each property has its own surfaces, access needs, and priorities. We work to understand those details, set a clear scope, and carry the plan through preparation, application, and the final walkthrough.</p>
          <Link href="/process" className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Explore the process <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="bg-[var(--nxg-paper)] px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[var(--nxg-content-width)] gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <figure className="relative min-h-[330px] overflow-hidden bg-white sm:min-h-[520px]">
            <Image src={ASSETS.featuredHome.one} alt="NXG Coatings exterior painting project" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-4 left-4 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)]">NXG Coatings / Project photography</figcaption>
          </figure>
          <div className="flex flex-col justify-center">
            <p className="section-kicker">What guides us</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-4xl">The principles behind the finish.</h2>
            <div className="mt-7 border-t border-[var(--nxg-line)]">
              {values.map((value, index) => <article key={value.title} className="grid grid-cols-[40px_1fr] gap-3 border-b border-[var(--nxg-line)] py-5"><span className="text-[10px] font-semibold text-[var(--nxg-red)]">0{index + 1}</span><div><h3 className="text-lg font-semibold text-[var(--nxg-navy)]">{value.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">{value.description}</p></div></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-5 border-b border-[var(--nxg-line)] pb-5 sm:flex-row sm:items-end"><div><p className="section-kicker">Where we work</p><h2 className="mt-3 text-3xl font-medium text-[var(--nxg-navy)] sm:text-4xl">Residential / Commercial / Industrial</h2></div><Link href="/industries" className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">Explore industries</Link></div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--nxg-muted)]">NXG works with homeowners, business teams, facility managers, and property associations to plan painting and coating work around the needs of each place.</p>
      </section>

      <section className="grid gap-5 bg-[var(--nxg-red)] px-6 py-12 text-white sm:grid-cols-[1fr_auto] sm:items-center lg:px-[max(40px,calc((100vw-var(--nxg-content-width))/2))]"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">Work with NXG</p><h2 className="mt-2 text-2xl font-medium sm:text-3xl">Tell us what your property needs.</h2></div><Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-4 border border-white/65 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] transition hover:bg-white hover:text-[var(--nxg-red)]">Request an estimate <span aria-hidden="true">↗</span></Link></section>
    </main>
  )
}