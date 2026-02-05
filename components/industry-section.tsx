"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
// ...existing code...
import { motion } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { FancyButton } from "@/components/ui/fancy-button"

export default function IndustrySection() {
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null)

  const industries = [
    {
      id: "residential",
      name: "Residential",
      description: "Expert coating solutions for homes and residential properties.",
      image: ASSETS.industries.residential,
      href: "/industries/residential",
    },
    {
      id: "commercial",
      name: "Commercial",
      description: "Professional coating services for offices and retail spaces.",
      image: ASSETS.industries.commercial,
      href: "/industries/commercial",
    },
    {
      id: "industrial",
      name: "Industrial",
      description: "Specialized coatings for industrial facilities and equipment.",
      image: ASSETS.industries.industrial,
      href: "/industries/industrial",
    },
    {
      id: "hoa",
      name: "HOA & Multi-Family",
      description: "Comprehensive coating solutions for multi-family properties and HOAs.",
      image: ASSETS.industries.hoa,
      href: "/industries/hoa",
    },
  ]

  return (
    <section className="py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Expertise</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We provide specialized coating solutions for a wide range of industries, each with unique requirements and challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              className="relative overflow-hidden rounded-2xl shadow-premium-lg h-[420px] group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setHoveredIndustry(industry.id)}
              onMouseLeave={() => setHoveredIndustry(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={industry.image || ASSETS.hero.services}
                  alt={industry.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={industry.id === "residential" || industry.id === "commercial"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-foreground/20 transition-opacity duration-300" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 z-10">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">{industry.name}</h3>
                  <p className="text-white/85 mb-8 max-w-md text-lg leading-relaxed">{industry.description}</p>
                  <Link href={industry.href} passHref>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <FancyButton variant="accent" size="lg" hasArrow={true} rounded="full">
                        Explore Services
                      </FancyButton>
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Decorative accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
