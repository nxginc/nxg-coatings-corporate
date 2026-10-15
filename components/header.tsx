"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ASSETS } from "@/lib/assets"

const links = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/gallery" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[var(--nxg-line)] bg-white/95 text-[var(--nxg-navy)] backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[var(--nxg-content-width)] items-center justify-between px-5 sm:px-6 lg:px-10">
        <Link href="/" aria-label="NXG Coatings home" onClick={() => setOpen(false)} className="shrink-0">
          <Image src={ASSETS.logo.primary} alt="NXG Coatings" width={118} height={42} className="h-auto w-[104px]" priority />
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-muted)] transition hover:text-[var(--nxg-red)]">{link.label}</Link>)}
          <Link href="/quote" className="ml-1 inline-flex min-h-10 items-center gap-3 bg-[var(--nxg-navy)] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--nxg-red)]">Request an estimate <span aria-hidden="true">↗</span></Link>
        </nav>
        <div className="flex items-center gap-3 xl:hidden">
          <Link href="/quote" className="hidden min-h-10 items-center bg-[var(--nxg-red)] px-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-white sm:inline-flex">Estimate</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation menu" : "Open navigation menu"} className="grid h-10 w-10 place-items-center border border-[var(--nxg-line)] text-[var(--nxg-navy)] transition hover:border-[var(--nxg-red)] hover:text-[var(--nxg-red)]">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-[var(--nxg-line)] bg-white px-6 pb-10 pt-3 xl:hidden" aria-label="Mobile navigation">
          {links.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-[var(--nxg-line)] text-lg font-medium text-[var(--nxg-navy)]"><span>{link.label}</span><span className="text-[10px] font-semibold text-[var(--nxg-red)]">0{index + 1}</span></Link>)}
          <Link href="/contact" onClick={() => setOpen(false)} className="block border-b border-[var(--nxg-line)] py-4 text-lg font-medium text-[var(--nxg-navy)]">Contact</Link>
          <Link href="/quote" onClick={() => setOpen(false)} className="mt-6 flex min-h-12 items-center justify-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white">Request an estimate <span aria-hidden="true">↗</span></Link>
        </nav>
      )}
    </header>
  )
}