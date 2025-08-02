"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Home, ExternalLink, Paintbrush, Building, Palette, RefreshCw } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type Category = {
  id: string
  name: string
  image: string
  description: string
  icon: React.ElementType
}

const categories: Category[] = [
  {
    id: "interior",
    name: "Interior Painting",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Banners/Interiorpainting_MN_5EW8oTEyHx?updatedAt=1666951441694",
    description: "Transform your indoor spaces with our expert interior painting services.",
    icon: Home,
  },
  {
    id: "exterior",
    name: "Exterior Painting",
    image: "https://ik.imagekit.io/j98e6hcfnkn/service-pages/exterior/4911CC69-47B2-463A-975D-68E673E95627_V9zcEAcgC.jpeg?updatedAt=1746446543080",
    description: "Enhance your home's curb appeal with our durable exterior paint solutions.",
    icon: ExternalLink,
  },
  {
    id: "decks",
    name: "Deck Staining & Refinishing",
    image: "https://ik.imagekit.io/j98e6hcfnkn/featured/deck-staining/6_Wsj3ws2Uw.jpg?updatedAt=1681571719088",
    description: "Protect and beautify your outdoor living spaces with our deck staining services.",
    icon: Paintbrush,
  },
  {
    id: "commercial",
    name: "Commercial Painting",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/commercial_iCqXeYgW_Z.jpeg?updatedAt=1699016621793",
    description: "Professional painting solutions for businesses and commercial properties.",
    icon: Building,
  },
  {
    id: "specialty",
    name: "Fine Finish & Millwork Painting",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Banners/finefinishes_BOJLvbsTP.jpg?updatedAt=1666774120425",
    description: "Fine finish and millwork painting for a refined, elegant look.",
    icon: Palette,
  },
  {
    id: "restoration",
    name: "Paint Restoration",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/restoration_1rbm1Ax_Q.jpg?updatedAt=1741369714492",
    description: "Revive and restore old paintwork to its former glory.",
    icon: RefreshCw,
  },
]

export default function PaintingGallery() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Create animation for section title
    gsap.from(".gallery-title", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Create staggered animation for gallery cards
    const cards = gsap.utils.toArray<HTMLElement>(".gallery-card")
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const brands = [
    "https://ik.imagekit.io/j98e6hcfnkn/brands/sherwin_x0balia5r.png?updatedAt=1704482056350&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/twp_mofKht_Yti.png?updatedAt=1704482056038&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/865-8653104_an-overview-of-ppg-industries-ppg-paint-logo_uOGzYhyVWm.png?updatedAt=1704482054644&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_72GtAY2fS.png?updatedAt=1704482054463&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/farrow&ball_AtEwe40la.webp?updatedAt=1704482054465&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/magnolia-logo-black_FVFQThcfSg.png?updatedAt=1704482054395&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/cabot-logo_gCTy1X9Oy.png?updatedAt=1704482054348&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/renner_d5BI9PU7hG.png?updatedAt=1704482054333&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/farrowball_wkBZIHRTY.png?updatedAt=1704482054314&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/rust-olem_axvMGYW5l.png?updatedAt=1704482054295&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/gliden_S0_soZxas.jpeg?updatedAt=1704482054246&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/BenjaminMoore-logo_WWKOQ2irq.webp?updatedAt=1704482054279&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/ICS_iPZssAka4.png?updatedAt=1704482015375&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_proluxe_MW-ZtyG1Y.jpg?updatedAt=1704482015138&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/axalta_yjszcOl2V.jpeg?updatedAt=1704482015100&tr=n-ik_ml_thumbnail",
    "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_US1whj-sz.png?updatedAt=1704482015058&tr=n-ik_ml_thumbnail",
  ];

  return (
    <>
      <section ref={sectionRef} className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="gallery-title text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center mb-12 text-brand-blue">
            Our Painting Services
          </h2>
          <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="gallery-card relative overflow-hidden rounded-2xl shadow-2xl group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="relative h-[400px]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="absolute inset-0 flex flex-col justify-end items-start p-8 text-left">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">{category.name}</h3>
                    <p className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                      {category.description}
                    </p>
                    <Link href={`/gallery/${category.id}`} passHref>
                      <motion.button
                        className="px-6 py-3 bg-white text-brand-blue rounded-full font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Gallery
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Brands Section */}
      <section className="py-16 bg-gray-50 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-blue mb-8 text-center">Brands We Trust</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
            {brands.map((src, idx) => (
              <div key={idx} className="flex items-center justify-center p-2">
                <Image
                  src={src}
                  alt={`Brand logo ${idx + 1}`}
                  width={120}
                  height={60}
                  className="object-contain h-12 w-auto grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
