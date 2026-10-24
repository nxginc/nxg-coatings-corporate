import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { ASSETS } from "@/lib/assets"
import { NXG_SITE } from "@/lib/site-metadata"

export const metadata: Metadata = {
  title: "Careers | NXG Coatings",
  description: "Contact NXG Coatings about career opportunities serving the Twin Cities.",
  alternates: { canonical: "https://nxgcoatingsinc.com/careers" },
}

export default function CareersPage() {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <section className="relative isolate flex min-h-[min(64svh,620px)] items-end overflow-hidden bg-[var(--nxg-navy)] text-white">
        <Image
          src={ASSETS.services.fineFinish}
          alt="Painting and millwork finishing project by NXG Coatings"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--nxg-navy)]/95 via-[var(--nxg-navy)]/75 to-[var(--nxg-navy)]/25" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[var(--nxg-content-width)] px-6 pb-14 pt-32 lg:px-10 lg:pb-20">
          <p className="section-kicker section-kicker--inverse">NXG Coatings / Careers</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-light leading-[0.98] tracking-[-0.045em] sm:text-7xl">Good work starts with good people.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Interested in working with a painting and coatings team serving the Twin Cities? Contact us to ask about current opportunities and the next steps.
          </p>
          <a
            href={`mailto:${NXG_SITE.email}?subject=Career%20inquiry`}
            className="mt-8 inline-flex min-h-12 items-center gap-4 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]"
          >
            Ask about opportunities <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-[var(--nxg-content-width)] gap-10 px-6 py-14 lg:grid-cols-[1fr_0.7fr] lg:px-10 lg:py-20">
        <div>
          <p className="section-kicker">Working with NXG</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">A team committed to careful work.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--nxg-muted)]">
            NXG plans painting and coating projects for homes, businesses, and facilities. For current openings, role requirements, and application instructions, please contact our team directly. We do not publish or accept applications for roles through this page.
          </p>
          <Link href="/about" className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">
            Learn about NXG <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <aside className="border-t border-[var(--nxg-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--nxg-navy)]">Contact our team</h2>
          <a href={`mailto:${NXG_SITE.email}?subject=Career%20inquiry`} className="mt-5 flex items-center gap-3 text-sm text-[var(--nxg-navy)] hover:text-[var(--nxg-red)]">
            <Mail className="h-4 w-4" /> {NXG_SITE.email}
          </a>
          <a href={`tel:${NXG_SITE.phoneE164}`} className="mt-4 flex items-center gap-3 text-sm text-[var(--nxg-navy)] hover:text-[var(--nxg-red)]">
            <Phone className="h-4 w-4" /> {NXG_SITE.phoneDisplay}
          </a>
        </aside>
      </section>
    </main>
  )
}
