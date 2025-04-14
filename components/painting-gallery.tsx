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
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/interiorpainting_OwFKqI2BC.jpg?updatedAt=1666774074618",
    description: "Transform your indoor spaces with our expert interior painting services.",
    icon: Home,
  },
  {
    id: "exterior",
    name: "Exterior Painting",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/exteriorpainting_3WGvHiRuy.jpg?updatedAt=1666774074567",
    description: "Enhance your home's curb appeal with our durable exterior paint solutions.",
    icon: ExternalLink,
  },
  {
    id: "decks",
    name: "Deck Staining",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/DeckStaining_MN_a3mceDUkH.png?updatedAt=1666951996630",
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
    name: "Specialty Finishes",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/finefinishes_Dq4bB4CJa.jpg?updatedAt=1666774073303",
    description: "Unique textures and finishes to add character to your walls.",
    icon: Palette,
  },
  {
    id: "restoration",
    name: "Paint Restoration",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/Restoration_MN_xne_zkvLl.png?updatedAt=1666951498592",
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

  return (
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
  )
}
