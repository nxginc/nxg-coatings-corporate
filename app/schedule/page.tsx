import type { Metadata } from "next"
import ParallaxHero from "@/components/parallax-hero"
import CalendarBooking from "@/components/calendar-booking"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { Check, Calendar, Phone } from "lucide-react"
import { ASSETS } from "@/lib/assets"

export const metadata: Metadata = {
  title: "Schedule Service | NXG Coatings",
  description: "Book your painting or coating service with our professional team.",
}

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <ParallaxHero
        eyebrow="NXG Coatings / Schedule"
        title="Choose a time to talk."
        description="Request a consultation time to discuss the property, project scope, and next steps."
        image={ASSETS.hero.fallback}
        imageAlt="NXG residential coating project"
        height="medium"
      />

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-12 lg:px-10 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="section-kicker">Consultation</p>
                <h2 className="mt-3 text-2xl font-medium text-[var(--nxg-navy)]">Book a time to discuss your project.</h2>
                <p className="mt-3 mb-6 text-sm leading-6 text-[var(--nxg-muted)]">
                  Choose a time that works for you to speak with one of our coating specialists about your project.
                </p>
                <div className="border border-[var(--nxg-line)] p-4 sm:p-5">
                  <CalendarBooking />
                </div>
              </div>

              <div>
                <p className="section-kicker">Project inquiry</p>
                <h2 className="mt-3 text-2xl font-medium text-[var(--nxg-navy)]">Prefer to start with details?</h2>
                <p className="mt-3 mb-6 text-sm leading-6 text-[var(--nxg-muted)]">
                  Fill out our detailed form to receive a comprehensive quote for your project.
                </p>
                <div className="border border-[var(--nxg-line)] p-4 sm:p-6">
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 text-[var(--nxg-red)]">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--nxg-navy)]">Project scope</h3>
                        <p className="mt-1 text-sm text-[var(--nxg-muted)]">Share the surfaces, location, and timing.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="shrink-0 text-[var(--nxg-red)]">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--nxg-navy)]">Written estimate</h3>
                        <p className="mt-1 text-sm text-[var(--nxg-muted)]">Review the proposed work before making a decision.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="shrink-0 text-[var(--nxg-red)]">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--nxg-navy)]">No obligation</h3>
                        <p className="mt-1 text-sm text-[var(--nxg-muted)]">An inquiry is a conversation, not a commitment.</p>
                      </div>
                    </div>

                    <CTAModal
                      trigger={
                        <FancyButton variant="gradient" size="lg" hasArrow={true} className="w-full mt-4">
                          Request Free Estimate
                        </FancyButton>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-[var(--nxg-line)] pt-7">
              <h2 className="text-xl font-semibold text-[var(--nxg-navy)]">Prefer direct contact?</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 text-[var(--nxg-red)]"><Phone className="h-4 w-4" /><h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)]">Call NXG</h3></div>
                  <a href="tel:+19528553520" className="mt-2 inline-block text-sm font-semibold text-[var(--nxg-navy)] hover:text-[var(--nxg-red)]">
                    952-855-3520
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[var(--nxg-red)]"><Calendar className="h-4 w-4" /><h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)]">Email NXG</h3></div>
                  <a
                    href="mailto:info@nxgcoatingsinc.com"
                    className="mt-2 inline-block text-sm font-semibold text-[var(--nxg-navy)] hover:text-[var(--nxg-red)]"
                  >
                    info@nxgcoatingsinc.com
                  </a>
                </div>
              </div>
            </div>
      </section>
    </main>
  )
}
