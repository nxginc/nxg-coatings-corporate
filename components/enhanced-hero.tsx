"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ASSETS } from "@/lib/assets"

export interface EnhancedHeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  height?: "small" | "medium" | "large"
  children?: React.ReactNode
}

export default function EnhancedHero({
  title,
  subtitle,
  backgroundImage,
  height = "medium",
  children,
}: EnhancedHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return

    const tl = gsap.timeline()

    // Animate the background image
    tl.fromTo(
      heroRef.current.querySelector(".hero-bg"),
      { scale: 1.1, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
    )

    // Animate the content
    tl.fromTo(
      contentRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=1",
    )

    return () => {
      tl.kill()
    }
  }, [])

  const heightClasses = {
    small: "py-12 md:py-16",
    medium: "py-16 md:py-24",
    large: "py-20 md:py-32",
  }

  const overlayClasses = {
    light: "bg-brand-blue/30",
    medium: "bg-brand-blue/50",
    dark: "bg-brand-blue/70",
  }

  return (
    <section ref={heroRef} className={cn("relative overflow-hidden text-white", heightClasses[height])}>
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src={backgroundImage || ASSETS.hero.fallback}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className={cn("absolute inset-0", overlayClasses.medium)} />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div ref={contentRef} className="max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          {subtitle && <p className="text-lg text-white mb-6">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
