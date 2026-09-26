import Image from "next/image"
import Link from "next/link"
import { ASSETS } from "@/lib/assets"

const footerGroups = [
  { title: "Work", links: [{ label: "Services", href: "/services" }, { label: "Industries", href: "/industries" }, { label: "Project gallery", href: "/gallery" }, { label: "Our process", href: "/process" }] },
  { title: "Company", links: [{ label: "About NXG", href: "/about" }, { label: "Partner network", href: "/partners" }, { label: "Contact", href: "/contact" }, { label: "FAQs", href: "/faqs" }] },
  { title: "Reading", links: [{ label: "Journal", href: "/blog" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--nxg-navy)] px-6 py-12 text-white lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[var(--nxg-content-width)]">
        <div className="grid gap-10 border-t border-white/20 pt-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="NXG Coatings home"><Image src={ASSETS.logo.primary} alt="NXG Coatings" width={118} height={42} className="h-auto w-[104px] brightness-0 invert" /></Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">Professional painting and coating services for homes, businesses, and facilities across the Twin Cities.</p>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">{group.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-white/75 transition hover:text-white">{link.label}</Link></li>)}</ul>
            </nav>
          ))}
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">Talk with NXG</h2>
            <a className="mt-4 block text-sm text-white/75 transition hover:text-white" href="tel:+19529004222">(952) 900-4222</a>
            <a className="mt-2 block text-sm text-white/75 transition hover:text-white" href="mailto:info@nxgcoatingsinc.com">info@nxgcoatingsinc.com</a>
            <p className="mt-3 text-sm text-white/60">Edina, Minnesota</p>
            <Link href="/quote" className="mt-5 inline-flex min-h-10 items-center gap-4 border border-white/45 px-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition hover:border-[var(--nxg-red)] hover:bg-[var(--nxg-red)]">Request an estimate <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 text-[9px] font-medium uppercase tracking-[0.13em] text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} NXG Coatings Inc. All rights reserved.</p>
          <p>5200 Willson Blvd, Suite 150 / Edina, MN 55424</p>
        </div>
      </div>
    </footer>
  )
}