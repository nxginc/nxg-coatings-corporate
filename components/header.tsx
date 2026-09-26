"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ASSETS } from "@/lib/assets"

const links = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/gallery" },
  { label: "Service Areas", href: "/servicearea" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/blog" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#101010]/85 text-white backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="relative z-10" aria-label="NXG Coatings home">
          <Image src={ASSETS.logo.primary} alt="NXG Coatings" width={118} height={42} className="h-auto w-[104px] brightness-0 invert" priority />
        </Link>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">{link.label}</Link>)}
          <Link href="/quote" className="border border-white/40 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:border-[#e74736] hover:bg-[#e74736]">Request a bid <span aria-hidden="true">↗</span></Link>
        </nav>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" className="relative z-10 flex h-11 w-11 items-center justify-center border border-white/30 lg:hidden">
          <span className="sr-only">Toggle menu</span><span className="text-xl">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open && <nav id="mobile-nav" className="border-t border-white/10 bg-[#101010] px-6 pb-7 pt-4 lg:hidden" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-sm uppercase tracking-[0.16em] text-white/80">{link.label}</Link>)}<Link href="/quote" onClick={() => setOpen(false)} className="mt-5 block bg-[#e74736] px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em]">Request a bid</Link></nav>}
    </header>
  )
}
