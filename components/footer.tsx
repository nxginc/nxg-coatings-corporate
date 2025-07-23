"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { FancyButton } from "@/components/ui/fancy-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Exterior Painting", href: "/services/exterior-painting" },
      { label: "Interior Painting", href: "/services/interior-painting" },
      { label: "Deck Staining", href: "/services/deck-staining" },
      { label: "Cabinet Refinishing", href: "/services/cabinet-refinishing" },
      { label: "Color Consultation", href: "/services/color-consultation" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Residential", href: "/industries/residential" },
      { label: "Commercial", href: "/industries/commercial" },
      { label: "Industrial", href: "/industries/industrial" },
      { label: "HOA & Multi-Family", href: "/industries/hoa" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Get a Quote", href: "/quote" },
      { label: "Schedule Service", href: "/schedule" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/nxgcoatings", label: "Facebook", color: "#1877F2" },
  { icon: Instagram, href: "https://instagram.com/nxgcoatings", label: "Instagram", color: "#E4405F" },
  { icon: Twitter, href: "https://twitter.com/nxgcoatings", label: "Twitter", color: "#1DA1F2" },
  { icon: Linkedin, href: "https://linkedin.com/company/nxgcoatings", label: "LinkedIn", color: "#0A66C2" },
  { icon: Youtube, href: "https://youtube.com/nxgcoatings", label: "YouTube", color: "#FF0000" },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <footer className="bg-brand-blue text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Get NXG Coatings Updates</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest painting tips and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <FancyButton type="submit" variant="accent" className="whitespace-nowrap">
                Subscribe Now
              </FancyButton>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-6">
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501"
                alt="NXG Coatings Logo"
                width={160}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 mb-6">
              Professional painting and coating solutions for residential, commercial, and industrial properties.
              Transform your space with our expert services.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-brand-red rounded-full p-2 flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:info@nxgcoatingsinc.com" className="text-gray-300 hover:text-white">
                    info@nxgcoatingsinc.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-brand-red rounded-full p-2 flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <a href="tel:+19529004222" className="text-gray-300 hover:text-white">
                    (952) 900-4222
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-brand-red rounded-full p-2 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Visit Us</p>
                  <address className="text-gray-300 not-italic">
                    5200 Willson Blvd STE 150
                    <br />
                    Edina, MN 55424
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden lg:col-span-3 lg:grid lg:grid-cols-4 lg:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-bold mb-4 text-[#ffffff]">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-gray-300 hover:text-white flex items-center group">
                        <ChevronRight className="h-3 w-3 text-brand-red opacity-0 -ml-2 group-hover:opacity-100 transition-all" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Navigation - Mobile Accordion */}
          <div className="lg:hidden">
            <Accordion type="single" collapsible className="w-full">
              {footerLinks.map((section) => (
                <AccordionItem key={section.title} value={section.title} className="border-b border-white/10">
                  <AccordionTrigger className="text-white py-4">{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 py-2">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.href} className="text-gray-300 hover:text-white flex items-center group">
                            <ChevronRight className="h-3 w-3 text-brand-red opacity-0 -ml-2 group-hover:opacity-100 transition-all" />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} NXG Coatings Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
