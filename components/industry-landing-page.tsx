import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ParallaxHero from "@/components/parallax-hero"
import type { IndustryPageData } from "@/data/industry-pages"

export default function IndustryLandingPage({ industry }: { industry: IndustryPageData }) {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow={`NXG Coatings / Industries / ${industry.name}`}
        title={industry.title}
        description={industry.summary}
        image={industry.heroImage}
        imageAlt={industry.heroAlt}
        height="large"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-5 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Request a project walkthrough <span aria-hidden="true" className="text-lg">↗</span></Link>
        <Link href="/process" className="inline-flex min-h-12 items-center border border-white/55 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Our process</Link>
      </ParallaxHero>

      <section className="mx-auto grid max-w-[var(--nxg-content-width)] gap-10 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:px-10 lg:py-24">
        <div>
          <p className="section-kicker">{industry.name} / Project approach</p>
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">{industry.introTitle}</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--nxg-muted)]">{industry.intro}</p>
        </div>
        <div className="border-t border-[var(--nxg-line)]">
          <p className="py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-red)]">Project considerations</p>
          <ul>
            {industry.considerations.map((item, index) => <li key={item} className="grid grid-cols-[40px_1fr] gap-3 border-t border-[var(--nxg-line)] py-4"><span className="text-[10px] font-semibold text-[var(--nxg-muted)]">0{index + 1}</span><span className="text-sm leading-6 text-[var(--nxg-navy)]">{item}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--nxg-paper)] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[var(--nxg-content-width)]">
          <div className="flex flex-col justify-between gap-5 border-b border-[var(--nxg-line)] pb-6 sm:flex-row sm:items-end">
            <div><p className="section-kicker">Typical scopes</p><h2 className="mt-3 text-3xl font-medium text-[var(--nxg-navy)] sm:text-5xl">Start with the surfaces.</h2></div>
            <p className="max-w-md text-sm leading-6 text-[var(--nxg-muted)]">The final project scope is confirmed during a property walkthrough and estimate.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {industry.scopes.map((scope, index) => (
              <article key={scope.title} className="group min-w-0 border border-[var(--nxg-line)] bg-white">
                <div className="relative aspect-[4/3] overflow-hidden bg-white"><Image src={scope.image} alt={scope.alt} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /></div>
                <div className="p-5 sm:p-6"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-red)]">0{index + 1} / {industry.name}</p><h3 className="mt-3 text-xl font-semibold text-[var(--nxg-navy)]">{scope.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--nxg-muted)]">{scope.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-5 border-b border-[var(--nxg-line)] pb-5 sm:flex-row sm:items-end"><div><p className="section-kicker">Next steps</p><h2 className="mt-3 text-2xl font-medium text-[var(--nxg-navy)] sm:text-3xl">Related services</h2></div><Link href="/industries" className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">All industries</Link></div>
        <div className="grid gap-x-6 sm:grid-cols-3">
          {industry.related.map((item) => <Link key={item.href} href={item.href} className="group flex min-h-20 items-center justify-between gap-4 border-b border-[var(--nxg-line)] py-5 text-base font-medium text-[var(--nxg-navy)] transition hover:text-[var(--nxg-red)]"><span>{item.title}</span><ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>)}
        </div>
      </section>

      <section className="grid gap-5 bg-[var(--nxg-red)] px-6 py-12 text-white sm:grid-cols-[1fr_auto] sm:items-center lg:px-[max(40px,calc((100vw-var(--nxg-content-width))/2))]">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">Start a conversation</p><h2 className="mt-2 text-2xl font-medium sm:text-3xl">Share the property and your priorities.</h2></div>
        <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-4 border border-white/65 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] transition hover:bg-white hover:text-[var(--nxg-red)]">Request an estimate <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}