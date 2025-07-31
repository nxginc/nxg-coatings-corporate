"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FancyButton } from "@/components/ui/fancy-button"

export default function IndustrySection() {
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null)

  const industries = [
    {
      id: "residential",
      name: "Residential",
      description: "Expert coating solutions for homes and residential properties.",
      image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/residential_FqQDni9Oa.jpg?updatedAt=1665175459020",
      href: "/industries/residential",
    },
    {
      id: "commercial",
      name: "Commercial",
      description: "Professional coating services for offices and retail spaces.",
      image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/commercial_iCqXeYgW_Z.jpeg?updatedAt=1699016621793",
      href: "/industries/commercial",
    },
    {
      id: "industrial",
      name: "Industrial",
      description: "Specialized coatings for industrial facilities and equipment.",
      image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/industrial_0sqjKH55v3.jpg?updatedAt=1699217215305",
      href: "/industries/industrial",
    },
    {
      id: "hoa",
      name: "HOA & Multi-Family",
      description: "Comprehensive coating solutions for multi-family properties and HOAs.",
      image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/hoa_4XZCTP8X4.jpeg?updatedAt=1704393622112",
      href: "/industries/hoa",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Industries We Serve</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide specialized coating solutions for a wide range of industries, each with unique requirements and
            challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              className="relative overflow-hidden rounded-xl shadow-xl h-[400px] group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredIndustry(industry.id)}
              onMouseLeave={() => setHoveredIndustry(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={industry.image || "https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"}
                  alt={industry.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={industry.id === "residential" || industry.id === "commercial"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <div className="transform transition-all duration-300 group-hover:-translate-y-4">
                  <h3 className="text-3xl font-bold text-white mb-3">{industry.name}</h3>
                  <p className="text-white/90 mb-6 max-w-md text-lg">{industry.description}</p>
                  <Link href={industry.href} passHref>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
                        Learn More
                      </FancyButton>
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-brand-blue/40 to-transparent rounded-br-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
