import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowLeft, Mail, Phone } from "lucide-react"
import { FancyButton } from "@/components/ui/fancy-button"
import { Card, CardContent } from "@/components/ui/card"
import { NXG_SITE } from "@/lib/site-metadata"

export const metadata: Metadata = {
  title: "Thank You | NXG Coatings",
  description: "Thank you for contacting NXG Coatings. We'll be in touch soon!",
}

export default function ContactSuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--nxg-paper)] px-6 py-16 text-[var(--nxg-charcoal)] lg:px-10">
      <div className="mx-auto max-w-[var(--nxg-content-width)]">
        <div className="mx-auto max-w-2xl">
          <Card className="overflow-hidden">
            <CardContent className="p-8 text-center sm:p-12">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="grid h-20 w-20 place-items-center border border-[var(--nxg-line)] bg-[var(--nxg-paper)]">
                    <CheckCircle2 className="h-10 w-10 text-[var(--nxg-red)]" />
                  </div>
                </div>
              </div>

              {/* Thank You Message */}
              <p className="section-kicker justify-center">Request received</p>
              <h1 className="mb-4 mt-4 text-4xl font-medium text-[var(--nxg-navy)]">
                Thank you.
              </h1>
                <p className="mb-8 text-lg text-[var(--nxg-muted)]">
                Your request has been saved for review.
              </p>

              {/* Confirmation Details */}
              <div className="mb-8 border-y border-[var(--nxg-line)] bg-[var(--nxg-paper)] p-6 text-left">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--nxg-navy)]">
                  <Mail className="h-5 w-5 text-[var(--nxg-red)]" />
                  What happens next?
                </h2>
                <ul className="space-y-3 text-sm leading-6 text-[var(--nxg-muted)]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--nxg-red)]" />
                    <span>A team member will follow up using the contact information you provided</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--nxg-red)]" />
                    <span>Any requested appointment time remains pending until the team confirms it</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--nxg-red)]" />
                    <span>We will confirm the next step for your project</span>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="mb-8 border-t border-[var(--nxg-line)] pt-8">
                <h3 className="mb-4 text-lg font-semibold text-[var(--nxg-navy)]">
                  Need immediate assistance?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center gap-2 text-sm text-[var(--nxg-muted)]">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${NXG_SITE.phoneE164}`}>{NXG_SITE.phoneDisplay}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--nxg-muted)]">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:info@nxgcoatingsinc.com">info@nxgcoatingsinc.com</a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <FancyButton variant="default" className="w-full sm:w-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </FancyButton>
                </Link>
                <Link href="/services">
                  <FancyButton variant="outline" className="w-full sm:w-auto">
                    View Our Services
                  </FancyButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
