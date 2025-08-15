"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { Shield, Users, Award } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPageClient() {
  const valuesRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!valuesRef.current || !storyRef.current) return

    // Animate values section
    const valueCards = gsap.utils.toArray<HTMLElement>(".value-card")
    gsap.from(valueCards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: valuesRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    // Animate story section
    gsap.from(".story-content", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    gsap.from(".story-image", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="About NXG Coatings"
        subtitle="Professional coating solutions delivered by a team that cares about quality, craftsmanship, and exceeding customer expectations."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
        height="medium"
      >
        <CTAModal
          trigger={
            <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
              Get Free Estimate
            </FancyButton>
          }
        />
      </EnhancedHero>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="story-content">
              <h2 className="text-3xl font-bold text-brand-blue mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2008, NXG Coatings began as a small family-owned business with a passion for delivering
                  exceptional painting and coating services. Over the years, we've grown into a trusted name in the
                  industry with a team of skilled professionals who share our commitment to excellence.
                </p>
                <p>
                  Our journey has been defined by a commitment to quality, innovation, and customer satisfaction. We've
                  continuously refined our techniques and expanded our service offerings to meet the changing needs of
                  our clients.
                </p>
                <p>
                  Today, NXG Coatings serves residential, commercial, and industrial clients throughout the region,
                  bringing the same dedication to excellence to every project we undertake.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/process">
                  <FancyButton variant="outline" size="lg">
                    Learn About Our Process
                  </FancyButton>
                </Link>
              </div>
            </div>
            <div className="story-image relative">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/featured/featured-home/f1_8-Jfm4MWZ.jpg?updatedAt=1704333592818"
                  alt="NXG Coatings Team"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="relative h-16 w-16">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501"
                    alt="NXG Coatings Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section ref={valuesRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality & Integrity</h3>
              <p className="text-gray-600">
                We never compromise on quality and always maintain the highest standards of honesty in every aspect of
                our business.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                We put our customers at the center of everything we do, working tirelessly to exceed their expectations.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every project, from preparation to cleanup, delivering results that stand
                the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a proven process to ensure exceptional results on every project.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center md:items-start max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8 md:mb-0">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Consultation</h3>
              <p className="text-sm text-gray-600 max-w-[200px]">
                We start with a thorough consultation to understand your needs, preferences, and goals.
              </p>
            </div>

            <div className="hidden md:block border-t-2 border-dashed border-gray-300 w-full absolute"></div>

            <div className="flex flex-col items-center text-center mb-8 md:mb-0">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Preparation</h3>
              <p className="text-sm text-gray-600 max-w-[200px]">
                Proper preparation is crucial. We clean, repair, and prepare surfaces to ensure optimal results.
              </p>
            </div>

            <div className="flex flex-col items-center text-center mb-8 md:mb-0">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Application</h3>
              <p className="text-sm text-gray-600 max-w-[200px]">
                Our skilled technicians apply coatings using professional techniques and high-quality materials.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Inspection</h3>
              <p className="text-sm text-gray-600 max-w-[200px]">
                We conduct a thorough inspection to ensure every detail meets our high standards for quality.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/process">
              <FancyButton variant="gradient" size="lg" hasArrow={true}>
                View Our Full Process
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact our team today to schedule a consultation and get a free estimate for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAModal
              trigger={
                <FancyButton variant="shine" size="xl" hasArrow={true} rounded="full">
                  Get Free Estimate
                </FancyButton>
              }
            />
            <Link href="/contact">
              <FancyButton
                variant="outline"
                size="xl"
                rounded="full"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Contact Us
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
