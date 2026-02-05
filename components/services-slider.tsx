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
  image: "https://ik.imagekit.io/j98e6hcfnkn/Services/pressurewashing_VWnZEA2qNm.jpg?updatedAt=1741369712585",
    icon: Droplet,
    link: "/services",
  },
  {
    title: "Restoration",
    description: "Bring damaged surfaces back to life with our comprehensive restoration services.",
  image: "https://ik.imagekit.io/j98e6hcfnkn/Services/restoration_1rbm1Ax_Q.jpg?updatedAt=1741369714492",
    icon: RefreshCw,
    link: "/services",
  },
  {
    title: "Color Consultation",
    description: "Get expert advice on choosing the perfect colors for your home or business.",
  image: "https://ik.imagekit.io/j98e6hcfnkn/color%20consulation_kGyXZz_4-.jpg?updatedAt=1748001132674",
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
    <section id="services" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">What We Offer</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Premium Coating Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of professional coating services designed to protect and elevate your property.
          </p>
        </div>

        <div className="relative" ref={sliderRef}>
          {/* Slider Controls */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="bg-card rounded-full p-3 shadow-premium hover:shadow-premium-lg border border-border/50 transition-all duration-300 hover:-translate-x-0.5"
              aria-label="Previous slide"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="bg-card rounded-full p-3 shadow-premium hover:shadow-premium-lg border border-border/50 transition-all duration-300 hover:translate-x-0.5"
              aria-label="Next slide"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
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
                  <Link href={service.link} className="block h-full group">
                    <div className="bg-card rounded-xl shadow-premium overflow-hidden h-full border border-border/30 hover:shadow-premium-lg transition-all duration-500 transform hover:-translate-y-2">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={service.image || ASSETS.hero.services}
                          alt={service.title}
                          width={800}
                          height={600}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent flex items-end">
                          <h3 className="text-xl font-serif font-semibold p-5 text-white">{service.title}</h3>
                        </div>
                        <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm rounded-full p-2.5 transition-transform duration-300 group-hover:scale-110">
                          <service.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                        <div className="mt-5 flex items-center text-accent font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                          Learn More
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div ref={indicatorsRef} className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalSlides - getVisibleSlideCount() + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndexRef.current ? "bg-accent w-6" : "bg-border hover:bg-muted-foreground"
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
