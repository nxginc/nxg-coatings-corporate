"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { ASSETS } from "@/lib/assets"

const navigationGroups = [
  {
    label: "Services & industries",
    links: [{ label: "Services", href: "/services" }, { label: "Industries", href: "/industries" }],
  },
  {
    label: "Projects & process",
    links: [{ label: "Projects", href: "/gallery" }, { label: "Our process", href: "/process" }],
  },
  {
    label: "Company",
    links: [{ label: "About NXG", href: "/about" }, { label: "Trade partners", href: "/tradepartners" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }],
  },
  {
    label: "Journal",
    links: [{ label: "Journal", href: "/blog" }, { label: "FAQs", href: "/faqs" }],
  },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = open ? "hidden" : previousOverflow
    const close = () => window.innerWidth >= 1280 && setOpen(false)
    window.addEventListener("resize", close)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("resize", close)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="nxg-site-header fixed inset-x-0 top-0 z-50 h-[72px] border-b border-[var(--nxg-line)] bg-white text-[var(--nxg-navy)] xl:h-20">
      <div className="mx-auto flex h-full max-w-[var(--nxg-content-width)] items-center justify-between px-5 sm:px-6 lg:px-10">
        <Link href="/" aria-label="NXG Coatings home" onClick={() => setOpen(false)} className="shrink-0">
          <Image src={ASSETS.logo.primary} alt="NXG Coatings" width={100} height={60} className="h-[60px] w-[100px] object-contain object-left" priority />
        </Link>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
          {navigationGroups.flatMap((group) => group.links).filter((link) => link.href !== "/careers" && link.href !== "/contact" && link.href !== "/faqs").map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="nxg-site-nav-link text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--nxg-charcoal)] transition hover:text-[var(--nxg-navy)]">{link.label}</Link>)}
          <Link href="/quote" className="ml-1 inline-flex min-h-11 items-center gap-3 bg-[var(--nxg-navy)] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--nxg-red)]">Request an estimate <span aria-hidden="true">↗</span></Link>
        </nav>
        <div className="flex items-center gap-3 xl:hidden">
          <Link href="/quote" className="hidden min-h-10 items-center bg-[var(--nxg-red)] px-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-white sm:inline-flex">Estimate</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation menu" : "Open navigation menu"} className="grid h-12 w-12 place-items-center text-[var(--nxg-navy)] transition hover:text-[var(--nxg-red)]">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="fixed inset-x-0 top-[72px] bottom-0 z-50 overflow-y-auto border-t border-[var(--nxg-line)] bg-white px-6 pb-10 pt-3 xl:hidden" aria-label="Mobile navigation">
          {navigationGroups.map((group) => (
            <details key={group.label} className="nxg-mobile-nav-group border-b border-[var(--nxg-line)]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[var(--nxg-navy)] focus-visible:outline-offset-2">
                {group.label}
                <ChevronDown className="h-4 w-4 shrink-0 text-[var(--nxg-red)] transition-transform" aria-hidden="true" />
              </summary>
              <ul className="pb-2">
                {group.links.map((link) => <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className="flex min-h-12 items-center justify-between pl-3 text-sm text-[var(--nxg-charcoal)] hover:text-[var(--nxg-red)]">{link.label}<span aria-hidden="true" className="text-[var(--nxg-red)]">↗</span></Link></li>)}
              </ul>
            </details>
          ))}
          <Link href="/quote" onClick={() => setOpen(false)} className="mt-6 flex min-h-12 items-center justify-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white">Request an estimate <span aria-hidden="true">↗</span></Link>
          <a href="mailto:info@nxgcoatingsinc.com" className="mt-4 flex min-h-12 items-center justify-center text-sm font-medium text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">Email NXG</a>
        </nav>
      )}
    </header>
  )
}