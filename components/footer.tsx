import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Interior Painting", href: "/services/interior-painting" },
      { label: "Exterior Painting", href: "/services/exterior-painting" },
      { label: "Cabinet Refinishing", href: "/services/cabinet-refinishing" },
      { label: "Deck & Stain", href: "/services/deck-staining" },
      { label: "Color Consultation", href: "/services/color-consultation" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Residential", href: "/industries/residential" },
      { label: "HOA & Communities", href: "/industries/hoa" },
      { label: "Commercial", href: "/industries/commercial" },
      { label: "Industrial", href: "/industries/industrial" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
]

const PHONE = process.env.NEXT_PUBLIC_BOOKING_PHONE || "(555) 123-4567"
const EMAIL = process.env.NEXT_PUBLIC_BOOKING_EMAIL || "hello@nxgcoatings.com"

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-bone">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="container flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="overline text-brand-ember">Ready when you are</p>
            <h2 className="mt-4 text-display-sm font-semibold text-brand-bone">
              Let&apos;s protect what you&apos;ve built.
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              Request a detailed estimate and a color consultation from our team. No pressure, just a precise plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center rounded-sm bg-brand-red px-7 py-3.5 text-sm font-semibold text-brand-bone transition-colors hover:bg-brand-ember"
            >
              Get a Free Estimate
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center rounded-sm border border-white/25 px-7 py-3.5 text-sm font-semibold text-brand-bone transition-colors hover:bg-white/10"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container grid grid-cols-2 gap-10 py-16 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 max-w-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-bone text-sm font-bold text-brand-navy">
              NXG
            </span>
            <span className="font-serif text-lg font-semibold">NXG Coatings</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            Premium painting and protective coatings for residential, HOA, commercial, and industrial properties.
            Precision preparation, durable finishes, and a guaranteed result.
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 hover:text-brand-bone">
              <Phone className="h-4 w-4 text-brand-ember" />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-brand-bone">
              <Mail className="h-4 w-4 text-brand-ember" />
              {EMAIL}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-brand-ember" />
              Serving the greater metro area
            </p>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-overline text-white/50">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-brand-bone">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} NXG Coatings. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-bone">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-bone">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-brand-bone">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
