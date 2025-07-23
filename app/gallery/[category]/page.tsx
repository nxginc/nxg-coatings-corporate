"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ExternalLink, Home, Building, Paintbrush, Palette, Search, X } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Gallery categories
const categories = [
  {
    id: "exterior",
    name: "Exterior Painting",
    description: "Transform your home's curb appeal with our expert exterior painting services.",
    image: "https://cdn.nxgcoatings.com/gallery/exterior/exterior-main.jpg",
    icon: ExternalLink,
    images: [
      "https://cdn.nxgcoatings.com/gallery/exterior/exterior-1.jpg",
      "https://cdn.nxgcoatings.com/gallery/exterior/exterior-2.jpg",
      "https://cdn.nxgcoatings.com/gallery/exterior/exterior-3.jpg",
      "https://cdn.nxgcoatings.com/gallery/exterior/exterior-4.jpg",
      "https://cdn.nxgcoatings.com/gallery/exterior/exterior-5.jpg",
      "https://cdn.nxgcoatings.com/gallery/exterior/exterior-6.jpg",
    ],
  },
  {
    id: "interior",
    name: "Interior Painting",
    description: "Revitalize your living spaces with our premium interior painting services.",
    image: "https://cdn.nxgcoatings.com/gallery/interior/interior-main.jpg",
    icon: Home,
    images: [
      "https://ik.imagekit.io/j98e6hcfnkn/gallery/interior/living-room-after.jpg",
      "https://ik.imagekit.io/j98e6hcfnkn/gallery/interior/kitchen-transformation.jpg",
      "https://ik.imagekit.io/j98e6hcfnkn/gallery/interior/bedroom-makeover.jpg",
      "https://ik.imagekit.io/j98e6hcfnkn/gallery/interior/office-space.jpg",
    ],
  },
  {
    id: "commercial",
    name: "Commercial Projects",
    description: "Professional painting solutions for offices, retail spaces, and commercial properties.",
    image: "https://cdn.nxgcoatings.com/gallery/commercial/commercial-main.jpg",
    icon: Building,
    images: [
      "https://cdn.nxgcoatings.com/gallery/commercial/commercial-1.jpg",
      "https://cdn.nxgcoatings.com/gallery/commercial/commercial-2.jpg",
      "https://cdn.nxgcoatings.com/gallery/commercial/commercial-3.jpg",
      "https://cdn.nxgcoatings.com/gallery/commercial/commercial-4.jpg",
      "https://cdn.nxgcoatings.com/gallery/commercial/commercial-5.jpg",
      "https://cdn.nxgcoatings.com/gallery/commercial/commercial-6.jpg",
    ],
  },
  {
    id: "decks",
    name: "Deck Staining",
    description: "Protect and beautify your outdoor living spaces with our deck staining services.",
    image: "https://cdn.nxgcoatings.com/gallery/decks/deck-main.jpg",
    icon: Paintbrush,
    images: [
      "https://cdn.nxgcoatings.com/gallery/decks/deck-1.jpg",
      "https://cdn.nxgcoatings.com/gallery/decks/deck-2.jpg",
      "https://cdn.nxgcoatings.com/gallery/decks/deck-3.jpg",
      "https://cdn.nxgcoatings.com/gallery/decks/deck-4.jpg",
    ],
  },
  {
    id: "cabinets",
    name: "Cabinet Refinishing",
    description: "Transform your kitchen with our expert cabinet refinishing services.",
    image: "https://cdn.nxgcoatings.com/gallery/cabinets/cabinet-main.jpg",
    icon: Home,
    images: [
      "https://cdn.nxgcoatings.com/gallery/cabinets/cabinet-1.jpg",
      "https://cdn.nxgcoatings.com/gallery/cabinets/cabinet-2.jpg",
      "https://cdn.nxgcoatings.com/gallery/cabinets/cabinet-3.jpg",
      "https://cdn.nxgcoatings.com/gallery/cabinets/cabinet-4.jpg",
    ],
  },
  {
    id: "specialty",
    name: "Specialty Finishes",
    description: "Add character to your walls with our unique textures and specialty finishes.",
    image: "https://cdn.nxgcoatings.com/gallery/specialty/specialty-main.jpg",
    icon: Palette,
    images: [
      "https://cdn.nxgcoatings.com/gallery/specialty/specialty-1.jpg",
      "https://cdn.nxgcoatings.com/gallery/specialty/specialty-2.jpg",
      "https://cdn.nxgcoatings.com/gallery/specialty/specialty-3.jpg",
      "https://cdn.nxgcoatings.com/gallery/specialty/specialty-4.jpg",
    ],
  },
]

export default function CategoryGalleryPage() {
  const params = useParams()
  const categoryId = typeof params.category === "string" ? params.category : ""
  const category = categories.find((cat) => cat.id === categoryId)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!galleryRef.current) return

    // Animate gallery items when they come into view
    const galleryItems = gsap.utils.toArray<HTMLElement>(".gallery-image")

    galleryItems.forEach((item, i) => {
      gsap.from(item, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: 0.1 * i,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [categoryId])

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">The gallery category you're looking for doesn't exist.</p>
        <Link href="/gallery">
          <FancyButton variant="gradient" rounded="full">
            Back to Gallery
          </FancyButton>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
              {category.icon && <category.icon className="h-8 w-8 text-white" />}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{category.name}</h1>
            <p className="text-xl text-white/90 mb-8">{category.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAModal
                trigger={
                  <FancyButton variant="shine" size="xl" hasArrow={true} rounded="full">
                    Get Free Estimate
                  </FancyButton>
                }
              />
              <Link href="/gallery">
                <FancyButton
                  variant="outline"
                  size="xl"
                  rounded="full"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Back to Gallery
                </FancyButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16" ref={galleryRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.images.map((image, index) => (
              <div
                key={index}
                className="gallery-image relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${category.name} example ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <div className="relative h-full w-full">
              <Image src={selectedImage || "/placeholder.svg"} alt="Gallery image" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Contact us today to schedule a consultation and get a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <FancyButton variant="gradient" size="lg" hasArrow={true} rounded="full">
                Contact Us
              </FancyButton>
            </Link>
            <CTAModal
              trigger={
                <FancyButton variant="outline" size="lg" rounded="full">
                  Get Free Estimate
                </FancyButton>
              }
            />
          </div>
        </div>
      </section>
    </main>
  )
}
