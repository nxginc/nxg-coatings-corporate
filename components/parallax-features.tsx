"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Paintbrush, ShieldCheck, Gem } from "lucide-react"

const features = [
  {
    title: "Unmatched Durability",
    description:
      "Our advanced coating formulations provide long-lasting protection against weathering, chipping, and fading, ensuring your investment stands the test of time.",
    icon: ShieldCheck,
    image: "/images/parallax/durability.png",
  },
  {
    title: "Flawless Finishes",
    description:
      "With meticulous surface preparation and expert application techniques, our team delivers consistently smooth, beautiful finishes that elevate any space.",
    icon: Paintbrush,
    image: "/images/parallax/finish.png",
  },
  {
    title: "Premium Quality Materials",
    description:
      "We partner with leading manufacturers to use only the highest-grade paints and coatings, guaranteeing vibrant color and superior performance.",
    icon: Gem,
    image: "/images/parallax/materials.png",
  },
]

export default function ParallaxFeatures() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yValues = features.map(() => useTransform(scrollYProgress, [0, 1], [-50, 50]))

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">The NXG Difference</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Experience the superior quality and service that set us apart.
          </p>
        </div>
        <div className="space-y-24">
          {features.map((feature, index) => {
            const y = yValues[index]
            return (
              <div key={feature.title} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className={`md:order-${index % 2 === 0 ? 1 : 2}`}>
                  <div className="relative h-[450px] w-full overflow-hidden rounded-lg shadow-xl">
                    <motion.div style={{ y }} className="absolute inset-[-50px]">
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
                <div className={`md:order-${index % 2 === 0 ? 2 : 1} text-center md:text-left`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full mb-6 shadow-lg">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
