"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Droplets, Clock, ThumbsUp, Award, Paintbrush } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ParallaxFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const features = featuresRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current

    if (!section || !features || !title || !subtitle) return

    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })

    // Animate the background parallax effect
    tl.fromTo(
      section,
      {
        backgroundPosition: "50% 0%",
      },
      {
        backgroundPosition: "50% 100%",
        ease: "none",
      },
      0,
    )

    // Animate the title and subtitle
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    })

    gsap.from(subtitle, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: subtitle,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    })

    // Animate each feature card
    const featureCards = gsap.utils.toArray<HTMLElement>(".feature-card")
    featureCards.forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.1 * i,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      })
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Long-Lasting Protection",
      description: "Our premium coatings provide years of protection against weather and wear.",
    },
    {
      icon: Droplets,
      title: "Weather Resistant",
      description: "Specially formulated to withstand extreme weather conditions and temperature changes.",
    },
    {
      icon: Clock,
      title: "Quick Application",
      description: "Professional application means less downtime and faster project completion.",
    },
    {
      icon: ThumbsUp,
      title: "Eco-Friendly Options",
      description: "Low-VOC and environmentally conscious coating solutions available.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We use only the highest quality materials for superior results.",
    },
    {
      icon: Paintbrush,
      title: "Expert Application",
      description: "Our certified technicians ensure flawless application every time.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 relative bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 53, 0.8), rgba(0, 0, 53, 0.7)), url('https://cdn.nxgcoatings.com/backgrounds/features-pattern-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-transparent to-navy-900 opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase">
            Why Choose Our Coating Solutions
          </h2>
          <p ref={subtitleRef} className="text-xl text-white/90 max-w-3xl mx-auto">
            Experience the difference with our professional coating services that deliver lasting results and
            exceptional value.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-brand-red/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
