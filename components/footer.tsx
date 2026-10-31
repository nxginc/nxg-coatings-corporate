import Image from "next/image"
import Link from "next/link"
import { ASSETS } from "@/lib/assets"
import { NXG_SITE } from "@/lib/site-metadata"

const footerGroups = [
  { title: "Work", links: [{ label: "Services", href: "/services" }, { label: "Industries", href: "/industries" }, { label: "Project gallery", href: "/gallery" }, { label: "Our process", href: "/process" }] },
  { title: "Company", links: [{ label: "About NXG", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Partner network", href: "/tradepartners" }, { label: "Contact", href: "/contact" }, { label: "FAQs", href: "/faqs" }] },
  { title: "Reading", links: [{ label: "Journal", href: "/blog" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
]

export default function Footer() {
  return (
    <footer className="nxg-site-footer relative mt-20 overflow-hidden bg-[var(--nxg-paper)] px-6 py-16 text-[var(--nxg-navy)] sm:py-20 lg:px-10 lg:py-24">
      <div className="nxg-site-footer__rule absolute inset-x-0 top-0 h-px bg-[var(--nxg-red)]" aria-hidden="true" />
      <div className="mx-auto max-w-[var(--nxg-content-width)]">
        <div className="grid gap-10 pt-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="NXG Coatings home"><Image src={ASSETS.logo.primary} alt="NXG Coatings" width={150} height={54} className="h-auto w-[118px] sm:w-[132px]" /></Link>
<p className="mt-5 max-w-xs text-sm leading-6 text-[var(--nxg-muted)]">Professional painting and coating services for homes, businesses, and facilities across the Twin Cities.</p>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--nxg-muted)]">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">{group.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-[var(--nxg-navy)] transition hover:text-[var(--nxg-red)]">{link.label}</Link></li>)}</ul>
            </nav>
          ))}
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--nxg-muted)]">Talk with NXG</h2>
            <a className="mt-4 block text-sm text-[var(--nxg-navy)] transition hover:text-[var(--nxg-red)]" href={`mailto:${NXG_SITE.email}`}>{NXG_SITE.email}</a>
            <p className="mt-3 text-sm text-[var(--nxg-muted)]">Edina, Minnesota</p>
            <Link href="/quote" className="mt-5 inline-flex min-h-10 items-center gap-4 border border-[var(--nxg-navy)] px-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] transition hover:border-[var(--nxg-red)] hover:bg-[var(--nxg-red)] hover:text-white">Request an estimate <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[var(--nxg-line)] pt-5 text-[9px] font-medium uppercase tracking-[0.13em] text-[var(--nxg-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} NXG Coatings Inc. All rights reserved.</p>
          <p>5200 Willson Blvd, Suite 150 / Edina, MN 55424</p>
        </div>
      </div>
    </footer>
  )
}
