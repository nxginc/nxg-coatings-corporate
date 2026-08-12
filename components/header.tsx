"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, Phone, X } from "lucide-react"

type NavChild = { label: string; href: string; blurb?: string }
type NavItem = { label: string; href: string; children?: NavChild[] }

const NAV: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Interior Painting", href: "/services/interior-painting", blurb: "Refined interior finishes" },
      { label: "Exterior Painting", href: "/services/exterior-painting", blurb: "Weatherproof protection" },
      { label: "Cabinet Refinishing", href: "/services/cabinet-refinishing", blurb: "Factory-smooth results" },
      { label: "Deck & Stain", href: "/services/deck-staining", blurb: "Rich, durable staining" },
      { label: "Color Consultation", href: "/services/color-consultation", blurb: "Guided palette design" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Residential", href: "/industries/residential", blurb: "Homes & estates" },
      { label: "HOA & Communities", href: "/industries/hoa", blurb: "Managed properties" },
      { label: "Commercial", href: "/industries/commercial", blurb: "Offices & retail" },
      { label: "Industrial", href: "/industries/industrial", blurb: "Heavy-duty coatings" },
    ],
  },
  { label: "Process", href: "/process" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
]

const PHONE = process.env.NEXT_PUBLIC_BOOKING_PHONE || "(555) 123-4567"

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-3" aria-label="NXG Coatings home">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-navy text-sm font-bold tracking-tight text-brand-bone">
            NXG
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-lg font-semibold tracking-tight text-brand-ink">NXG Coatings</span>
            <span className="text-[10px] font-medium uppercase tracking-overline text-muted-foreground">
              Paint &amp; Protection
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-brand-ink" : "text-muted-foreground hover:text-brand-ink",
                  )}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-brand-red" />}
                </Link>
              )
            }
            return (
              <div key={item.href} className="relative" onMouseEnter={() => setOpenMenu(item.label)}>
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-brand-ink" : "text-muted-foreground hover:text-brand-ink",
                  )}
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", openMenu === item.label && "rotate-180")}
                  />
                </button>
                {openMenu === item.label && (
                  <div className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3">
                    <div className="animate-fade-up overflow-hidden rounded-lg border border-border bg-card shadow-lift">
                      <div className="grid grid-cols-1 gap-1 p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group flex flex-col rounded-md px-4 py-3 transition-colors hover:bg-secondary"
                          >
                            <span className="text-sm font-semibold text-brand-ink group-hover:text-brand-royal">
                              {child.label}
                            </span>
                            {child.blurb && (
                              <span className="text-xs text-muted-foreground">{child.blurb}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between border-t border-border bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-overline text-brand-royal"
                      >
                        View all {item.label}
                        <span aria-hidden>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
            className="hidden items-center gap-2 text-sm font-medium text-brand-ink transition-colors hover:text-brand-royal xl:flex"
          >
            <Phone className="h-4 w-4 text-brand-red" />
            {PHONE}
          </a>
          <Link
            href="/quote"
            className="hidden items-center gap-2 rounded-sm bg-brand-navy px-5 py-2.5 text-sm font-semibold text-brand-bone transition-colors hover:bg-brand-royal sm:inline-flex"
          >
            Get an Estimate
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-brand-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-border bg-background lg:hidden">
          <nav className="container flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto py-6">
            {NAV.map((item) => (
              <div key={item.href} className="py-1">
                <Link
                  href={item.href}
                  className="block py-2 font-serif text-xl font-semibold text-brand-ink"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-1 flex flex-col border-l border-border pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-2 text-sm text-muted-foreground hover:text-brand-royal"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-sm bg-brand-navy px-5 py-3 text-sm font-semibold text-brand-bone"
              >
                Get an Estimate
              </Link>
              <a
                href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-semibold text-brand-ink"
              >
                <Phone className="h-4 w-4 text-brand-red" />
                {PHONE}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
