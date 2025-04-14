"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FancyButton } from "@/components/ui/fancy-button"
import Link from "next/link"
import { Home, Building2, Factory, BuildingIcon as Buildings } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const industries = [
  {
    id: "residential",
    title: "Residential",
    description: "Transform your home with our premium painting and coating services designed for homeowners.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/residential_FqQDni9Oa.jpg?updatedAt=1665175459020",
    link: "/industries/residential",
    icon: Home,
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Professional painting solutions for offices, retail spaces, and commercial properties.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/commercial_mXY0A8JXz.jpeg?updatedAt=1665175458082",
    link: "/industries/commercial",
    icon: Building2,
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Specialized coatings for industrial facilities that withstand harsh environments.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/industrial_02easFwrP.jpeg?updatedAt=1665175459210",
    link: "/industries/industrial",
    icon: Factory,
  },
  {
    id: "hoa",
    title: "HOA & Multi-Family",
    description: "Comprehensive painting services for homeowners associations and multi-family properties.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/hoa_multifamily_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
    link: "/industries/hoa",
    icon: Buildings,
  },
]

export default function IndustrySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    // Animate section title
    gsap.from(".industry-title", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Animate cards with stagger
    const cards = gsap.utils.toArray<HTMLElement>(".industry-card")
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="industry-title text-3xl md:text-4xl font-bold text-brand-blue mb-4">Industries We Serve</h2>
          <p className="industry-title text-lg text-gray-600 max-w-3xl mx-auto">
            Our specialized coating solutions are tailored to meet the unique needs of various industries.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="industry-card group border-2 border-transparent hover:border-brand-blue transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-md shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={`${industry.title} painting services`}
                    width={600}
                    height={450}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <industry.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2 group-hover:text-brand-blue transition-colors duration-300">
                    {industry.title}
                  </h3>
                  <p className="text-white/90 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {industry.description}
                  </p>
                  <Link href={industry.link}>
                    <FancyButton
                      variant="outline"
                      size="sm"
                      className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-brand-blue font-bold transition-all duration-300"
                    >
                      Learn More
                    </FancyButton>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
