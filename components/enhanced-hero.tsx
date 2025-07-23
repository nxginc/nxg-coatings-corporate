"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { FancyButton } from "@/components/ui/fancy-button"
import { Phone } from "lucide-react"

interface EnhancedHeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  height?: "small" | "medium" | "large" | "full"
  overlay?: "light" | "dark" | "gradient"
  disableButtons?: boolean
  children?: React.ReactNode
}

export default function EnhancedHero({
  title,
  subtitle,
  backgroundImage,
  height = "large",
  overlay = "gradient",
  disableButtons = false,
  children,
}: EnhancedHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return

    const tl = gsap.timeline()

    tl.from(contentRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    })

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  const getHeightClass = () => {
    switch (height) {
      case "small":
        return "h-[40vh] min-h-[300px]"
      case "medium":
        return "h-[60vh] min-h-[400px]"
      case "large":
        return "h-[80vh] min-h-[600px]"
      case "full":
        return "h-screen"
      default:
        return "h-[80vh] min-h-[600px]"
    }
  }

  const getOverlayClass = () => {
    switch (overlay) {
      case "light":
        return "bg-white/30"
      case "dark":
        return "bg-black/50"
      case "gradient":
        return "bg-gradient-to-r from-black/70 via-black/50 to-transparent"
      default:
        return "bg-gradient-to-r from-black/70 via-black/50 to-transparent"
    }
  }

  return (
    <section ref={heroRef} className={`relative ${getHeightClass()} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || "/placeholder.svg?height=800&width=1200"}
          alt={title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=800&width=1200"
          }}
        />
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${getOverlayClass()}`} />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div ref={contentRef} className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">{title}</h1>

            {subtitle && <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl">{subtitle}</p>}

            {children && <div className="mb-8">{children}</div>}

            {!disableButtons && (
              <div className="flex flex-col sm:flex-row gap-4">
                <FancyButton
                  variant="gradient"
                  size="lg"
                  hasArrow={true}
                  onClick={() => window.open("/quote", "_self")}
                >
                  Get Free Quote
                </FancyButton>
                <FancyButton
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-brand-blue"
                  onClick={() => window.open("tel:+1234567890")}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </FancyButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
