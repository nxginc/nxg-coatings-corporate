"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ExternalLink,
  Home,
  Paintbrush,
  Palette,
  Droplet,
  RefreshCw,
  Brush,
  AppWindowIcon as WindowIcon,
// no-dd-sa:typescript-code-style/no-duplicate-imports
} from "lucide-react"
import { FancyButton } from "@/components/ui/fancy-button"
import { ASSETS } from "@/lib/assets"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: "Exterior Painting",
    description: "Protect and enhance your home with our durable and beautiful exterior painting solutions.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/exteriorpainting_3WGvHiRuy.jpg?updatedAt=1666774074567",
    icon: ExternalLink,
    link: "/services#exterior",
  },
  {
    title: "Interior Painting",
    description: "Transform your living spaces with our premium interior painting services.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/interiorpainting_OwFKqI2BC.jpg?updatedAt=1666774074618",
    icon: Home,
    link: "/services#interior",
  },
  {
    title: "Deck Staining",
    description: "Protect and beautify your outdoor living spaces with our professional deck staining services.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/DeckStaining_MN_a3mceDUkH.png?updatedAt=1666951996630",
    icon: Paintbrush,
    link: "/services#decks",
  },
  {
    title: "Cabinet Refinishing",
    description: "Revitalize your kitchen with our expert cabinet refinishing and painting services.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/CabinetRefinishing_MN_8XLSgP4b9.jpg?updatedAt=1666953740495",
    icon: Palette,
    link: "/services#cabinets",
  },
  {
  // Renamed from "Fine Finishes" per content update request
  title: "Fine Finish and Millworker Painting",
    description: "Add character and elegance to your walls with our specialty finishes and textures.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/finefinishes_Dq4bB4CJa.jpg?updatedAt=1666774073303",
    icon: Brush,
    link: "/services",
  },
  {
    title: "Pressure Cleaning",
    description: "Restore your surfaces to like-new condition with our thorough pressure cleaning services.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/PressureCleaning_MN_Z7jMuG9Dv.png?updatedAt=1666951495789",
    icon: Droplet,
    link: "/services",
  },
  {
    title: "Restoration",
    description: "Bring damaged surfaces back to life with our comprehensive restoration services.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/Restoration_MN_xne_zkvLl.png?updatedAt=1666951498592",
    icon: RefreshCw,
    link: "/services",
  },
  {
    title: "Color Consultation",
    description: "Get expert advice on choosing the perfect colors for your home or business.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/ColorConsultation1_fvLQ6GTgU.jpg?updatedAt=1676855833330",
    icon: Palette,
    link: "/services",
  },
  {
    title: "Window Staining",
    description: "Enhance the beauty of your wooden windows with our professional staining services.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Services/WindowStaining_MN_EFqt22s-6.jpg?updatedAt=1666951484146",
    icon: WindowIcon,
    link: "/services",
  },
]

export default function ServicesSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const totalSlides = services.length
  const visibleSlides = { desktop: 3, tablet: 2, mobile: 1 }
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const indicatorsRef = useRef<HTMLDivElement>(null)

  // Handle window resize and determine visible slides
  const getVisibleSlideCount = () => {
    if (typeof window === "undefined") return visibleSlides.desktop
    if (window.innerWidth < 640) return visibleSlides.mobile
    if (window.innerWidth < 1024) return visibleSlides.tablet
    return visibleSlides.desktop
  }

  const updateSliderPosition = (index: number) => {
    if (!trackRef.current) return

    const visibleCount = getVisibleSlideCount()
    const maxIndex = totalSlides - visibleCount

    // Ensure index is within bounds
    if (index < 0) index = 0
    if (index > maxIndex) index = maxIndex

    activeIndexRef.current = index

    // Update active indicator
    if (indicatorsRef.current) {
      const indicators = indicatorsRef.current.querySelectorAll(".indicator")
      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add("bg-brand-blue")
          indicator.classList.remove("bg-gray-300")
        } else {
          indicator.classList.remove("bg-brand-blue")
          indicator.classList.add("bg-gray-300")
        }
      })
    }

    // Animate the track position
    gsap.to(trackRef.current, {
      x: `${-index * (100 / visibleCount)}%`,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  const nextSlide = () => {
    const visibleCount = getVisibleSlideCount()
    const maxIndex = totalSlides - visibleCount
    const nextIndex = activeIndexRef.current + 1 > maxIndex ? 0 : activeIndexRef.current + 1
    updateSliderPosition(nextIndex)
  }

  const prevSlide = () => {
    const visibleCount = getVisibleSlideCount()
    const maxIndex = totalSlides - visibleCount
    const prevIndex = activeIndexRef.current - 1 < 0 ? maxIndex : activeIndexRef.current - 1
    updateSliderPosition(prevIndex)
  }

  const goToSlide = (index: number) => {
    updateSliderPosition(index)
  }

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  useEffect(() => {
    const handleResize = () => {
      updateSliderPosition(activeIndexRef.current)
    }

    window.addEventListener("resize", handleResize)
    startAutoplay()

    return () => {
      window.removeEventListener("resize", handleResize)
      stopAutoplay()
    }
  }, [])

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Our Professional Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of coating services designed to protect and beautify your property.
          </p>
        </div>

        <div className="relative" ref={sliderRef}>
          {/* Slider Controls */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
            >
              <ChevronLeft className="h-6 w-6 text-brand-blue" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
            >
              <ChevronRight className="h-6 w-6 text-brand-blue" />
            </button>
          </div>

          {/* Slider Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ width: `${(100 * totalSlides) / getVisibleSlideCount()}%` }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="px-4"
                  style={{ width: `${100 / totalSlides}%` }}
                  onMouseEnter={stopAutoplay}
                  onMouseLeave={startAutoplay}
                >
                  <Link href={service.link} className="block h-full">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border border-gray-200 hover:shadow-2xl hover:border-brand-blue/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                      <div className="relative h-56">
                        <Image
                          src={service.image || ASSETS.hero.services}
                          alt={service.title}
                          width={800}
                          height={600}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <h3 className="text-xl font-semibold p-4 text-white">{service.title}</h3>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <service.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700">{service.description}</p>
                        <div className="mt-4">
                          <FancyButton variant="outline" size="sm" className="w-full">
                            Learn More
                          </FancyButton>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div ref={indicatorsRef} className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides - getVisibleSlideCount() + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator w-3 h-3 rounded-full transition-colors ${
                  index === activeIndexRef.current ? "bg-brand-blue" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onMouseEnter={stopAutoplay}
                onMouseLeave={startAutoplay}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
