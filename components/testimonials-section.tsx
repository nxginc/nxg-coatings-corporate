"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner in Westfield",
    quote:
      "We hired NXG Coatings to paint our 2-story colonial last summer. Their team was professional from start to finish. They took extra care with our landscaping and the paint job still looks perfect a year later. Highly recommend!",
    avatar: "/thoughtful-brunette.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Property Manager",
    quote:
      "As someone who manages 12 rental properties, I've worked with many painting contractors. NXG Coatings has been our go-to for the past 3 years. Their pricing is fair, they're reliable, and they work around tenant schedules.",
    avatar: "/confident-hispanic-businessman.png",
    rating: 4,
  },
  {
    id: 3,
    name: "Jennifer Williams",
    role: "Restaurant Owner",
    quote:
      "When we needed to refresh our restaurant's exterior, NXG was recommended by another business owner. Their color consultant helped us choose a palette that increased our street visibility. The team worked overnight to avoid disrupting business hours.",
    avatar: "/sunny-smile.png",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "HOA Board President",
    quote:
      "Our HOA hired NXG Coatings for a community-wide exterior refresh. They coordinated with 36 homeowners, maintained consistent quality, and finished on schedule. A few minor touch-ups were needed and they handled them promptly.",
    avatar: "/thoughtful-elder.png",
    rating: 4,
  },
  {
    id: 5,
    name: "Lisa Chen",
    role: "Interior Designer",
    quote:
      "I've partnered with NXG on several client projects. Their attention to detail with trim work and ability to match custom colors perfectly sets them apart. My clients are always thrilled with the results.",
    avatar: "/confident-asian-leader.png",
    rating: 5,
  },
  {
    id: 6,
    name: "Robert Jackson",
    role: "Commercial Property Owner",
    quote:
      "NXG Coatings handled the exterior painting for our office complex. They used low-VOC paints as requested and worked weekends to minimize disruption. The only reason for 4 stars is they fell slightly behind schedule due to weather.",
    avatar: "/confident-businessman.png",
    rating: 4,
  },
  {
    id: 7,
    name: "Amanda Peterson",
    role: "Homeowner",
    quote:
      "We had our kitchen cabinets refinished by NXG and they look brand new! The team was meticulous about protecting our countertops and floors. The spray finish is flawless with no drips or uneven spots.",
    avatar: "/fiery-portrait.png",
    rating: 5,
  },
  {
    id: 8,
    name: "Thomas Miller",
    role: "General Contractor",
    quote:
      "I've subcontracted NXG for painting on several new construction projects. Their crew is reliable, their work passes inspection every time, and they're flexible when construction schedules shift. A valuable partner.",
    avatar: "/construction-worker-portrait.png",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !testimonialsRef.current) return

    // Animate testimonial cards with stagger
    const testimonialCards = gsap.utils.toArray<HTMLElement>(".testimonial-card")
    gsap.from(testimonialCards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Return null to render nothing
  return null
}
