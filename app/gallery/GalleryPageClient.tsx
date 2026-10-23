"use client"

import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { corporateProfile } from "@/data/corporate-profile"

const categories = [
  {
    id: "residential",
    title: "Residential",
    description: "Interior and exterior painting for homes.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/services/residential-featured_EzfRe7DZJ.jpeg?updatedAt=1747919186999",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Professional painting and coating services for business spaces.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/services/commercial-featured_6QgfmEwj7.jpeg?updatedAt=1747919186999",
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Protective coating services for industrial environments.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/services/industrial-featured_S8CzFaGmp.jpeg?updatedAt=1747919186999",
  },
]

export const galleryMetadata = {
  title: "Service Gallery | NXG Coatings",
  description: "Explore NXG Coatings service imagery across residential, commercial, and industrial work.",
}

export default function GalleryPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <EnhancedHero
        title="Explore Our Services"
        subtitle="Browse service imagery across the spaces and surfaces NXG Coatings serves."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/service-pages/exterior/2B4F5211-53AA-4898-9318-E70FD6AE6811_3vhLxTnmN.jpeg"
        height="medium"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/gallery/${category.id}`}
                className="group overflow-hidden border border-slate-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214bb6]"
              >
                <img
                  src={category.image}
                  alt={`${category.title} painting and coating services`}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#070a2c]">{category.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#173d9c]">
                    Explore services
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070a2c] px-4 py-14 text-center text-white">
        <h2 className="text-3xl font-semibold">Planning a coating project?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-200">
          Contact NXG Coatings to discuss your project and request an estimate.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#e74736] px-6 text-sm font-semibold text-white hover:bg-[#d63d2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Contact {corporateProfile.displayName}
        </Link>
      </section>
    </main>
  )
}
