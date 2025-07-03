"use client"

import Image from "next/image"
import Link from "next/link"
import { Home, Building2, Factory, BuildingIcon } from "lucide-react"
import { FancyButton } from "@/components/ui/fancy-button"

const industries = [
  {
    name: "Residential",
    description: "Enhancing homes with durable, beautiful coatings.",
    icon: Home,
    image: "/images/industries/residential.png",
    href: "/industries/residential",
  },
  {
    name: "Commercial",
    description: "Reliable solutions for businesses and properties.",
    icon: Building2,
    image: "/images/industries/commercial.png",
    href: "/industries/commercial",
  },
  {
    name: "Industrial",
    description: "Heavy-duty coatings for demanding environments.",
    icon: Factory,
    image: "/images/industries/industrial.png",
    href: "/industries/industrial",
  },
  {
    name: "HOA",
    description: "Uniform, long-lasting results for communities.",
    icon: BuildingIcon,
    image: "/images/industries/hoa.png",
    href: "/industries/hoa",
  },
]

export default function IndustrySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">Serving Diverse Industries</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            We provide specialized coating solutions for a wide range of sectors.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry) => (
            <div key={industry.name} className="group text-center">
              <Link href={industry.href}>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={industry.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <industry.icon className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-brand-blue">{industry.name}</h3>
                <p className="mt-1 text-gray-500">{industry.description}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/industries">
            <FancyButton variant="outline" size="lg" rounded="full" hasArrow>
              Explore All Industries
            </FancyButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
