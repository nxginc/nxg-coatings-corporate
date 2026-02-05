"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { CheckCircle } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ServiceDetailProps {
  title: string
  description: string
  features: string[]
  image: string
  reversed?: boolean
}

export default function ServiceDetail({ title, description, features, image, reversed = false }: ServiceDetailProps) {
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
      x: reversed ? -50 : 50,
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
  }, [reversed])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={contentRef} className={`${reversed ? "order-2" : "order-2 md:order-1"}`}>
            <div className="w-12 h-1 bg-accent mb-6 animate-item" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-item">{title}</h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed animate-item">{description}</p>

            <ul className="space-y-4 mb-10 animate-item">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="bg-accent/10 rounded-lg p-1.5 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  </div>
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 animate-item">
              <CTAModal
                trigger={
                  <FancyButton variant="accent" size="lg" hasArrow={true} rounded="full">
                    Get Free Estimate
                  </FancyButton>
                }
              />
              <FancyButton
                variant="outline"
                size="lg"
                rounded="full"
                className="border-2"
                onClick={() => window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")}
              >
                Book Consultation
              </FancyButton>
            </div>
          </div>

          <div ref={imageRef} className={`${reversed ? "order-1" : "order-1 md:order-2"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-premium-xl group">
              <div className="aspect-[4/3]">
                <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
