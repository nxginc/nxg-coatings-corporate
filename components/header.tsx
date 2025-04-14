"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Phone, Menu, X } from "lucide-react"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { useIsMobile } from "@/hooks/use-mobile"

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Exterior Painting", href: "/services/exterior-painting" },
      { label: "Interior Painting", href: "/services/interior-painting" },
      { label: "Deck Staining", href: "/services/deck-staining" },
      { label: "Cabinet Refinishing", href: "/services/cabinet-refinishing" },
      { label: "Color Consultation", href: "/services/color-consultation" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Residential", href: "/industries/residential" },
      { label: "Commercial", href: "/industries/commercial" },
      { label: "Industrial", href: "/industries/industrial" },
      { label: "HOA & Multi-Family", href: "/industries/hoa" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const pathname = usePathname()
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false)
    // Reset expanded submenus
    setExpandedMenus([])
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobile
          ? "bg-white shadow-md py-2"
          : "bg-gradient-to-b from-black/50 to-transparent py-4 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/logo_m2ODAWFyf.png?updatedAt=1741216795011"
                alt="NXG Coatings Logo"
                fill
                className={`object-contain transition-opacity duration-300 ${
                  isScrolled || isMobile ? "opacity-100" : "opacity-0"
                }`}
              />
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/logo_m2ODAWFyf.png?updatedAt=1741216795011"
                alt="NXG Coatings Logo"
                fill
                className={`object-contain transition-opacity duration-300 ${
                  isScrolled || isMobile ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className={`text-brand-blue hover:text-brand-blue/80 font-medium transition-colors ${
                    pathname === link.href ? "font-bold" : ""
                  }`}
                >
                  <span className="flex items-center">
                    {link.label}
                    {link.children && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </span>
                </Link>

                {link.children && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-gray hover:text-brand-blue"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+19529004222"
              className={`flex items-center text-sm font-medium transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-brand-red`}
            >
              <Phone className="mr-2 h-4 w-4" />
              (952) 900-4222
            </a>
            <CTAModal
              trigger={
                <FancyButton variant={isScrolled ? "accent" : "shine"} size="sm" hasArrow={true} rounded="full">
                  Get Free Estimate
                </FancyButton>
              }
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-brand-red" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className={`h-6 w-6 ${isScrolled ? "text-brand-blue" : "text-brand-blue"}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto pt-16"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="container mx-auto px-4 pt-4 pb-8">
                  <div className="flex flex-col space-y-6">
                    {navLinks.map((link) => (
                      <div key={link.label} className="border-b border-gray-100 pb-4">
                        {link.children ? (
                          <div>
                            <button
                              onClick={() => toggleSubmenu(link.label)}
                              className="w-full flex items-center justify-between text-lg font-medium text-brand-blue hover:text-brand-red"
                            >
                              {link.label}
                              <motion.div
                                animate={{ rotate: expandedMenus.includes(link.label) ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="h-5 w-5" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {expandedMenus.includes(link.label) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 ml-4 space-y-2 border-l-2 border-brand-blue/20 pl-4">
                                    {link.children.map((child) => (
                                      <motion.div
                                        key={child.label}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Link
                                          href={child.href}
                                          className="block py-2 text-gray-600 hover:text-brand-blue"
                                        >
                                          {child.label}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            className="block text-lg font-medium text-brand-blue hover:text-brand-red"
                          >
                            {link.label}
                          </Link>
                        )}
                      </div>
                    ))}

                    {/* Mobile CTA */}
                    <div className="pt-4 space-y-4">
                      <a
                        href="tel:+19529004222"
                        className="flex items-center justify-center w-full py-3 bg-brand-gray rounded-lg text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Call (952) 900-4222
                      </a>

                      <CTAModal
                        trigger={
                          <FancyButton variant="accent" size="lg" hasArrow={true} rounded="full" className="w-full">
                            Get Free Estimate
                          </FancyButton>
                        }
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
