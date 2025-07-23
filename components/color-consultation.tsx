"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FancyButton } from "@/components/ui/fancy-button"
import { Palette, Brush, Droplet, Check } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ColorConsultation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !imageRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    })

    tl.from(imageRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }).from(
      contentRef.current.querySelectorAll(".animate-item"),
      {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4",
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const benefits = [
    {
      icon: Palette,
      title: "Expert Color Selection",
      description:
        "Our color consultants help you choose the perfect palette that complements your space and reflects your style.",
    },
    {
      icon: Brush,
      title: "Personalized Approach",
      description:
        "We consider your existing décor, lighting conditions, and personal preferences to create a customized color scheme.",
    },
    {
      icon: Droplet,
      title: "Sample Testing",
      description:
        "We provide sample colors to test in your space, allowing you to see how they look in different lighting conditions.",
    },
    {
      icon: Check,
      title: "Confident Decisions",
      description: "Eliminate the guesswork and make confident color choices with professional guidance.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4 animate-item">
              Professional Color Consultation
            </h2>
            <p className="text-lg text-gray-600 mb-8 animate-item">
              Choosing the right colors for your home or business can be overwhelming. Our professional color
              consultation service takes the guesswork out of the process, ensuring you'll love the final result.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4 animate-item">
                  <div className="bg-brand-blue/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <benefit.icon className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <FancyButton
              variant="gradient"
              size="lg"
              hasArrow={true}
              rounded="full"
              className="animate-item"
              onClick={() => window.open("https://cal.com/nxgcoatings/color-consultation", "_blank")}
            >
              Schedule a Color Consultation
            </FancyButton>
          </div>

          <div ref={imageRef} className="order-1 md:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3]">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/color_vOe9g6lGSg.jpg?updatedAt=1744881916753"
                  alt="Color consultation service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <span className="bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block">
                    Professional Service
                  </span>
                  <h3 className="text-xl font-bold">Expert Color Advice</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
