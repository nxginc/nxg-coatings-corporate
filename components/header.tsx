"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { cn } from "@/lib/utils"

const navLinks = [
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "Interior Painting", href: "/services/interior-painting" },
      { label: "Exterior Painting", href: "/services/exterior-painting" },
      { label: "Cabinet Refinishing", href: "/services/cabinet-refinishing" },
      { label: "Deck Staining", href: "/services/deck-staining" },
      { label: "Epoxy Flooring", href: "/services/epoxy-flooring" },
      { label: "Commercial Painting", href: "/services/commercial-painting" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    submenu: [
      { label: "Residential", href: "/industries/residential" },
      { label: "Commercial", href: "/industries/commercial" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "HOA", href: "/industries/hoa" },
    ],
  },
  {
    label: "Process",
    href: "/process",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4 lg:py-6",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <Image
            src="https://ik.imagekit.io/j98e6hcfnkn/logo_m2ODAWFyf.png?updatedAt=1741216795011"
            alt="NXG Coatings"
            width={180}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <Link
                href={link.href}
                className={cn(
                  "flex items-center font-medium transition-colors",
                  isActive(link.href)
                    ? "text-brand-blue"
                    : isScrolled
                      ? "hover:text-brand-blue"
                      : "text-white hover:text-brand-lightBlue",
                )}
                style={isScrolled && !isActive(link.href) ? { color: "#000035" } : undefined}
              >
                {link.label}
                {link.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>

              {link.submenu && (
                <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-2 bg-white rounded-lg shadow-xl border border-gray-100">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-gray-50 hover:text-brand-blue",
                          isActive(subItem.href) ? "text-brand-blue font-medium" : "",
                        )}
                        style={!isActive(subItem.href) ? { color: "#000035" } : undefined}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <CTAModal
            trigger={
              <FancyButton
                variant={isScrolled ? "shine" : "outline"}
                size="default"
                hasArrow={true}
                rounded="full"
                className={!isScrolled ? "border-white text-white hover:bg-white/10" : ""}
              >
                Get Free Estimate
              </FancyButton>
            }
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className={cn("h-8 w-8 transition-colors", isScrolled ? "text-gray-800" : "text-white")} />
          ) : (
            <Menu className={cn("h-8 w-8 transition-colors", isScrolled ? "text-gray-800" : "text-white")} />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 transform",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="container mx-auto px-4 py-20">
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <div
                    className={cn(
                      "text-xl font-medium hover:text-brand-blue transition-colors",
                      isActive(link.href) && "text-brand-blue",
                    )}
                    style={!isActive(link.href) ? { color: "#000035" } : undefined}
                  >
                    {link.submenu ? (
                      <button
                        className="flex items-center justify-between w-full"
                        onClick={(e) => {
                          e.preventDefault()
                          const submenu = document.getElementById(`submenu-${link.label}`)
                          if (submenu) {
                            submenu.classList.toggle("hidden")
                          }
                        }}
                      >
                        {link.label}
                        <ChevronDown className="h-5 w-5" />
                      </button>
                    ) : (
                      <Link href={link.href} onClick={() => setMobileMenuOpen(false)}>
                        {link.label}
                      </Link>
                    )}
                  </div>

                  {link.submenu && (
                    <div id={`submenu-${link.label}`} className="mt-2 ml-4 space-y-2 hidden">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className={cn(
                            "block py-2 hover:text-brand-blue transition-colors",
                            isActive(subItem.href) && "text-brand-blue",
                          )}
                          style={!isActive(subItem.href) ? { color: "#000035" } : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-6">
                <CTAModal
                  trigger={
                    <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full" className="w-full">
                      Get Free Estimate
                    </FancyButton>
                  }
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
