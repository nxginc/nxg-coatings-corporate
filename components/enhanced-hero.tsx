"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        heightClasses[height],
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">{subtitle}</p>
        )}
        {description && (
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}