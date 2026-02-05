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
  align?: "left" | "center"
}

export default function EnhancedHero({
  title,
  subtitle,
  backgroundImage,
  height = "medium",
  children,
  align = "left",
}: EnhancedHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return

    const tl = gsap.timeline()

    // Animate the background image
    tl.fromTo(
      heroRef.current.querySelector(".hero-bg"),
      { scale: 1.05, opacity: 0.9 },
      { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
    )

    // Animate the content
    tl.fromTo(
      contentRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
      "-=1.2",
    )

    return () => {
      tl.kill()
    }
  }, [])

  const heightClasses = {
    small: "min-h-[40vh] py-16 md:py-20",
    medium: "min-h-[60vh] py-20 md:py-28",
    large: "min-h-[85vh] py-24 md:py-36",
  }

  return (
    <section ref={heroRef} className={cn("relative overflow-hidden flex items-center", heightClasses[height])}>
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src={backgroundImage || ASSETS.hero.fallback}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div 
          ref={contentRef} 
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {/* Decorative line */}
          <div className={cn(
            "w-16 h-1 bg-accent mb-8",
            align === "center" && "mx-auto"
          )} />
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight text-balance leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          
          {children}
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
