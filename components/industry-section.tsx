"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FancyButton } from "@/components/ui/fancy-button"
import { Home, Building2, Factory, BuildingIcon as Buildings } from "lucide-react"

export default function IndustrySection() {
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null)

  const industries = [
    {
      id: "residential",
      name: "Residential",
      description: "Expert coating solutions for homes and residential properties.",
      icon: Home,
      image: "https://ik.imagekit.io/j98e6hcfnkn/industries/residential_Wr9Ys-Zzs.jpg?updatedAt=1741959872540",
      href: "/industries/residential",
    },
    {
      id: "commercial",
      name: "Commercial",
      description: "Professional coating services for offices and retail spaces.",
      icon: Building2,
      image: "https://ik.imagekit.io/j98e6hcfnkn/industries/commercial_building_Wr9Ys-Zzs.jpg?updatedAt=1741959872540",
      href: "/industries/commercial",
    },
    {
      id: "industrial",
      name: "Industrial",
      description: "Specialized coatings for industrial facilities and equipment.",
      icon: Factory,
      image: "https://ik.imagekit.io/j98e6hcfnkn/industries/industrial_Wr9Ys-Zzs.jpg?updatedAt=1741959872540",
      href: "/industries/industrial",
    },
    {
      id: "hoa",
      name: "HOA & Multi-Family",
      description: "Comprehensive coating solutions for multi-family properties and HOAs.",
      icon: Buildings,
      image: "https://ik.imagekit.io/j98e6hcfnkn/industries/hoa_Wr9Ys-Zzs.jpg?updatedAt=1741959872540",
      href: "/industries/hoa",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Industries We Serve</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide specialized coating solutions for a wide range of industries, each with unique requirements and
            challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              className="relative overflow-hidden rounded-xl shadow-lg border border-gray-100 group h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredIndustry(industry.id)}
              onMouseLeave={() => setHoveredIndustry(null)}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={industry.image || "/placeholder.svg"}
                  alt={industry.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <div className="bg-brand-blue/30 backdrop-blur-sm rounded-lg p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-lg border border-white/20 transform transition-transform duration-300 group-hover:scale-110">
                  <industry.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-white/90 mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {industry.description}
                </p>
                <Link href={industry.href} passHref>
                  <motion.div
                    className="opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FancyButton variant="shine" size="sm" hasArrow={true} rounded="full" className="w-full md:w-auto">
                      Learn More
                    </FancyButton>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
