"use client"

import { useEffect, useRef } from "react"
import { Shield, Award, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "We stand behind our work with comprehensive warranties and satisfaction guarantees."
  },
  {
    icon: Award,
    title: "Licensed & Insured",
    description: "Fully licensed, bonded, and insured for your peace of mind and protection."
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect your schedule and complete projects on time, every time."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our experienced professionals deliver exceptional results with attention to detail."
  }
]

export default function ParallaxFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      containerRef.current.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative py-20 bg-gradient-to-br from-brand-blue to-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div ref={containerRef} className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose NXG Coatings?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            With over 20 years of experience, we deliver exceptional painting services
            that exceed expectations and stand the test of time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-100">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}