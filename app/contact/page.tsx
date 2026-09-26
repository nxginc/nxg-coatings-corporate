import type { Metadata } from "next"
import Link from "next/link"
import { CalendarBooking } from "@/components/calendar-booking"
import ContactForm from "@/components/contact-form"
import EnhancedHero from "@/components/enhanced-hero"
import { Mail, MapPin, Phone } from "lucide-react"
import { ASSETS } from "@/lib/assets"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("contact", "/contact")

export default function ContactPage() {
  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <EnhancedHero
        title="Start with a useful conversation."
        subtitle="Share what you are planning or schedule time to discuss the property and its surfaces."
        backgroundImage={ASSETS.hero.fallback}
        height="medium"
      />

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:gap-14">
          <div>
            <p className="section-kicker">Project inquiry</p>
            <h2 className="mt-3 text-3xl font-medium text-[var(--nxg-navy)] sm:text-4xl">Tell us what needs a new finish.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--nxg-muted)]">Add the service, location, timing, and any details that will help us prepare for the next step.</p>
            <div className="mt-7 border border-[var(--nxg-line)] bg-white p-4 sm:p-6"><ContactForm /></div>
          </div>

          <aside className="lg:border-l lg:border-[var(--nxg-line)] lg:pl-8">
            <p className="section-kicker">Schedule</p>
            <h2 className="mt-3 text-2xl font-medium text-[var(--nxg-navy)]">Choose a consultation time.</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--nxg-muted)]">Use the calendar to request a time to discuss the property, goals, and project scope.</p>
            <div className="mt-6 border border-[var(--nxg-line)] bg-white p-4 sm:p-5"><CalendarBooking /></div>

            <div className="mt-8 border-t border-[var(--nxg-line)] pt-5">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-muted)]">Direct contact</h3>
              <a href="tel:+19529004222" className="mt-4 flex items-center gap-3 text-sm text-[var(--nxg-navy)] hover:text-[var(--nxg-red)]"><Phone className="h-4 w-4" /> (952) 900-4222</a>
              <a href="mailto:info@nxgcoatingsinc.com" className="mt-3 flex items-center gap-3 text-sm text-[var(--nxg-navy)] hover:text-[var(--nxg-red)]"><Mail className="h-4 w-4" /> info@nxgcoatingsinc.com</a>
              <div className="mt-3 flex items-start gap-3 text-sm leading-6 text-[var(--nxg-muted)]"><MapPin className="mt-1 h-4 w-4 shrink-0" /><address className="not-italic">5200 Willson Blvd, Suite 150<br />Edina, MN 55424</address></div>
              <Link href="/servicearea" className="mt-5 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">Service areas</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}