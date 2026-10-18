"use client"

import { ASSETS } from "@/lib/assets"
import ParallaxHero from "@/components/parallax-hero"

interface EnhancedHeroProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  height?: "small" | "medium" | "large"
  className?: string
  children?: React.ReactNode
}

export default function EnhancedHero({
  title,
  subtitle,
  description,
  backgroundImage,
  height = "medium",
  className,
  children,
}: EnhancedHeroProps) {
  const heightClasses = {
    small: "min-h-[400px]",
    medium: "min-h-[500px]",
    large: "min-h-[600px]",
  }

  return (
    <ParallaxHero
      eyebrow="NXG Coatings Inc. / Edina, Minnesota"
      title={title}
      description={subtitle || description || "Professional painting and coating services across the Twin Cities."}
      image={backgroundImage || ASSETS.hero.fallback}
      imageAlt={`${title} by NXG Coatings`}
      height={height}
      className={className}
    >
      {children}
    </ParallaxHero>
  )
}