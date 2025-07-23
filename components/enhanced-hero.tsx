"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface EnhancedHeroProps {
  title: string
  description?: string
  backgroundImage: string
  children?: React.ReactNode
  className?: string
  height?: "small" | "medium" | "large"
  overlay?: "light" | "medium" | "dark"
}

export default function EnhancedHero({
  title,
  description,
  backgroundImage,
  children,
  className,
  height = "medium",
  overlay = "medium",
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
    <section ref={heroRef} className={cn("relative overflow-hidden text-white", heightClasses[height], className)}>
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src={
            backgroundImage ||
            "https://ik.imagekit.io/j98e6hcfnkn/featured/featured-home/f2_ElysbPaNW.jpg?updatedAt=1704333595263"
          }
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className={cn("absolute inset-0", overlayClasses[overlay])} />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div ref={contentRef} className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase">{title}</h1>
          {description && <p className="text-lg md:text-xl mb-8">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
