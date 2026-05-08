"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Interior Painting",
    description: "Transform your indoor spaces with our professional interior painting services.",
    image: "/images/services/interior.jpg",
    link: "/services/interior-painting"
  },
  {
    title: "Exterior Painting",
    description: "Protect and beautify your home's exterior with our expert painting services.",
    image: "/images/services/exterior.jpg",
    link: "/services/exterior-painting"
  },
  {
    title: "Deck Staining",
    description: "Restore and protect your deck with our premium staining and sealing services.",
    image: "/images/services/deck.jpg",
    link: "/services/deck-staining"
  },
  {
    title: "Cabinet Refinishing",
    description: "Give your cabinets a fresh new look with our professional refinishing services.",
    image: "/images/services/cabinets.jpg",
    link: "/services/cabinet-refinishing"
  },
  {
    title: "Commercial Painting",
    description: "Professional painting services for businesses and commercial properties.",
    image: "/images/services/commercial.jpg",
    link: "/services/commercial"
  }
]

export default function ServicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === services.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? services.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === services.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From interior painting to commercial projects, we provide comprehensive
            painting solutions for all your needs.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Slider */}
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
            {services.map((service, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-lg mb-4">{service.description}</p>
                    <Button asChild variant="secondary">
                      <a href={service.link}>Learn More</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-brand-blue' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}