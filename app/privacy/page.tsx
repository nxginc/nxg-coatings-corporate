import type { Metadata } from "next"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"

export const metadata: Metadata = {
  title: "Privacy Policy | NXG Coatings",
  description: "Learn about how NXG Coatings collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <ParallaxHero
        eyebrow="NXG Coatings / Legal"
        title="Privacy policy"
        description="How information is collected, used, and protected when you interact with NXG Coatings."
        image={ASSETS.hero.fallback}
        imageAlt="NXG Coatings residential project"
        height="medium"
      />

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-3xl border-t border-[var(--nxg-line)] pt-5 prose prose-sm sm:prose-base prose-headings:font-medium prose-headings:text-[var(--nxg-navy)] prose-p:leading-7 prose-p:text-[var(--nxg-muted)] prose-li:text-[var(--nxg-muted)]">
            <p className="text-xs uppercase tracking-[0.1em]">Last Updated: March 14, 2025</p>

            <h2>Introduction</h2>
          

            <h2>Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
            <p>
              NXG Coatings Inc.
              <br />
              5200 Willson Blvd STE 150
              <br />
              Edina, MN 55424
              <br />
              Email: privacy@nxgcoatingsinc.com
              <br />
              Phone: (952) 900-4222
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl border-t border-[var(--nxg-line)] pt-6">
            <Link href="/contact" className="inline-flex min-h-11 items-center bg-[var(--nxg-red)] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[var(--nxg-navy)]">Contact NXG</Link>
          </div>
      </section>
    </main>
  )
}
