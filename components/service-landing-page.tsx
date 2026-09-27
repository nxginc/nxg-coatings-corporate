import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ParallaxHero from "@/components/parallax-hero"
import type { ServicePageData } from "@/data/service-pages"

export default function ServiceLandingPage({ service }: { service: ServicePageData }) {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow={`NXG Coatings / Services / ${service.name}`}
        title={service.title}
        description={service.summary}
        image={service.heroImage}
        imageAlt={service.heroAlt}
        height="large"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-5 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">
          Request an estimate <span aria-hidden="true" className="text-lg">↗</span>
        </Link>
        <Link href="/schedule" className="inline-flex min-h-12 items-center border border-white/60 px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">
          Schedule a consultation
        </Link>
      </ParallaxHero>

      <section className="mx-auto grid max-w-[var(--nxg-content-width)] gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
        <div>
          <p className="section-kicker">A thoughtful approach</p>
          <h2 className="mt-5 max-w-xl text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">{service.introTitle}</h2>
          <p className="mt-6 text-base leading-7 text-[var(--nxg-muted)]">{service.intro}</p>
          <p className="mt-4 text-base leading-7 text-[var(--nxg-muted)]">{service.supportingText}</p>
          <ul className="mt-8 border-t border-[var(--nxg-line)]">
            {service.highlights.map((highlight, index) => (
              <li key={highlight} className="grid grid-cols-[36px_1fr] gap-3 border-b border-[var(--nxg-line)] py-4">
                <span className="text-[10px] font-semibold text-[var(--nxg-red)]">0{index + 1}</span>
                <span className="text-sm leading-6 text-[var(--nxg-navy)]">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative min-h-[360px] overflow-hidden bg-[var(--nxg-paper)] sm:min-h-[520px]">
          <Image src={service.detailImage} alt={service.detailAlt} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
          <figcaption className="absolute bottom-4 left-4 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)]">{service.name} / NXG project photography</figcaption>
        </figure>
      </section>

      <section className="bg-[var(--nxg-paper)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[var(--nxg-content-width)] px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-5 border-b border-[var(--nxg-line)] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">Scope and surfaces</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">Details that shape the finish.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[var(--nxg-muted)]">Your estimate will reflect the specific surfaces, preparation, access, and finish discussed for your project.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {service.scopes.map((scope, index) => (
              <article key={scope.title} className="group min-w-0 border border-[var(--nxg-line)] bg-white">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--nxg-paper)]">
                  <Image src={scope.image} alt={scope.alt} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-red)]">0{index + 1} / {service.name}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--nxg-navy)]">{scope.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--nxg-muted)]">{scope.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--nxg-navy)] px-6 py-16 text-white sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[var(--nxg-content-width)]">
          <p className="section-kicker">How projects move</p>
          <div className="mt-4 grid gap-9 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="text-3xl font-medium leading-tight sm:text-5xl">Good work is planned in the right order.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">A clear scope keeps the preparation, application, and final walkthrough connected.</p>
              <Link href="/process" className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">See the full process <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <ol className="border-t border-white/20">
              {service.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-white/20 py-5 sm:grid-cols-[56px_1fr]">
                  <span className="text-xs font-semibold text-[var(--nxg-platinum)]">0{index + 1}</span>
                  <div><h3 className="text-lg font-semibold">{step.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{step.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-5 border-b border-[var(--nxg-line)] pb-5 sm:flex-row sm:items-end">
          <div><p className="section-kicker">Continue exploring</p><h2 className="mt-3 text-2xl font-medium text-[var(--nxg-navy)] sm:text-3xl">Related NXG services</h2></div>
          <Link href="/services" className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">All services</Link>
        </div>
        <div className="grid sm:grid-cols-3">
          {service.related.map((item, index) => (
            <Link key={item.href} href={item.href} className="group flex min-h-20 items-center justify-between gap-4 border-b border-[var(--nxg-line)] py-5 text-lg font-medium text-[var(--nxg-navy)] transition hover:text-[var(--nxg-red)] sm:mr-5">
              <span>{item.title}</span><ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 bg-[var(--nxg-red)] px-6 py-12 text-white sm:grid-cols-[1fr_auto] sm:items-center lg:px-[max(40px,calc((100vw-var(--nxg-content-width))/2))]">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">Start with a conversation</p><h2 className="mt-2 text-2xl font-medium sm:text-3xl">Tell us what you are planning.</h2></div>
        <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-4 border border-white/65 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] transition hover:bg-white hover:text-[var(--nxg-red)]">Request an estimate <span aria-hidden="true" className="text-lg">↗</span></Link>
      </section>
    </main>
  )
}