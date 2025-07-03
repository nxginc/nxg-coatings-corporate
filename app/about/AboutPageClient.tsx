"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import EnhancedHero from "@/components/enhanced-hero"
import { Shield, Users, ThumbsUp, CheckCircle, ArrowRight } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPageClient() {
  const valuesRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate values section
    if (valuesRef.current) {
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
    }

    // Animate story section
    if (storyRef.current) {
      gsap.from(".story-image", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(".story-content", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    }

    // Animate process section
    if (processRef.current) {
      const processSteps = gsap.utils.toArray<HTMLElement>(".process-step")
      gsap.from(processSteps, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="About NXG Coatings"
        description="We're dedicated to delivering premium coating solutions with exceptional craftsmanship and customer service."
        backgroundImage="/images/banners/about-banner.jpg"
        height="medium"
      >
        <div className="flex flex-col sm:flex-row gap-4">
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
      </EnhancedHero>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="story-image">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about/our-story.jpg"
                  alt="NXG Coatings team at work"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 bg-brand-blue text-white py-2 px-4 rounded-tr-xl">
                  <p className="text-sm font-medium">Established 2015</p>
                </div>
              </div>
            </div>

            <div className="story-content">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-medium mb-6">
                <Shield className="h-5 w-5 mr-2" />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                A Commitment to Quality Since Day One
              </h2>
              <p className="text-gray-600 mb-6">
                NXG Coatings was founded in 2015 with a simple mission: to provide premium coating solutions that
                protect and beautify properties while delivering an exceptional customer experience. What began as a
                small team with big dreams has grown into a trusted name in the industry.
              </p>
              <p className="text-gray-600 mb-6">
                Our founder, with over 20 years of experience in the coating industry, recognized a gap in the market
                for a company that combined technical expertise with genuine customer care. Today, we're proud to have
                served thousands of residential and commercial clients throughout the region.
              </p>
              <p className="text-gray-600 mb-8">
                We've built our reputation on attention to detail, use of premium materials, and a team of skilled
                professionals who take pride in their craft. Our growth has been organic—built on referrals from
                satisfied customers who appreciate our commitment to excellence.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">1,000+ Projects Completed</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">5-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-medium mb-6">
              <Users className="h-5 w-5 mr-2" />
              <span>Our Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">The Principles That Guide Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values define who we are and how we approach every project. They're the foundation of our company
              culture and the standards we hold ourselves to every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Without Compromise</h3>
              <p className="text-gray-600">
                We never cut corners. From the materials we use to the techniques we employ, quality is at the heart of
                everything we do. We stand behind our work with industry-leading warranties.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer-First Approach</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen carefully to your needs, provide clear communication
                throughout the project, and ensure the final result exceeds your expectations.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <ThumbsUp className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity & Transparency</h3>
              <p className="text-gray-600">
                We believe in honest business practices. Our estimates are detailed and accurate, our timelines are
                realistic, and we communicate openly about every aspect of your project.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Environmental Responsibility</h3>
              <p className="text-gray-600">
                We're committed to eco-friendly practices. We offer low-VOC and environmentally responsible coating
                options and dispose of materials properly to minimize our environmental impact.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Improvement</h3>
              <p className="text-gray-600">
                We never stop learning. Our team regularly trains on new techniques, products, and industry advancements
                to ensure we're always offering the best solutions available.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <ThumbsUp className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Commitment</h3>
              <p className="text-gray-600">
                We're proud to be part of the communities we serve. We support local initiatives, hire locally, and
                strive to make a positive impact beyond just the properties we coat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section ref={processRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a proven process to ensure exceptional results on every project. From initial consultation to
              final walkthrough, we're committed to making your experience smooth and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="process-step bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-brand-blue">
              <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Consultation</h3>
              <p className="text-gray-600 mb-4">
                We start with a thorough consultation to understand your needs, preferences, and project goals. Our
                experts will assess your property and discuss options.
              </p>
              <Link href="/process#consultation">
                <span className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className="process-step bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-brand-blue">
              <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Detailed Proposal</h3>
              <p className="text-gray-600 mb-4">
                Based on our consultation, we provide a comprehensive proposal outlining the scope of work, timeline,
                materials, and pricing. No surprises, just clarity.
              </p>
              <Link href="/process#proposal">
                <span className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className="process-step bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-brand-blue">
              <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Preparation</h3>
              <p className="text-gray-600 mb-4">
                Proper preparation is crucial for a lasting finish. Our team will thoroughly clean, repair, and prepare
                surfaces to ensure optimal adhesion and a flawless final result.
              </p>
              <Link href="/process#preparation">
                <span className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className="process-step bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-brand-blue">
              <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Application</h3>
              <p className="text-gray-600 mb-4">
                Our skilled technicians apply premium coatings using professional techniques and high-quality materials.
                We follow manufacturer specifications and industry best practices.
              </p>
              <Link href="/process#application">
                <span className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className="process-step bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-brand-blue">
              <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-6">
                5
              </div>
              <h3 className="text-xl font-bold mb-3">Inspection</h3>
              <p className="text-gray-600 mb-4">
                After application, we conduct a thorough inspection to ensure every detail meets our high standards. We
                then clean up completely, removing all equipment and materials.
              </p>
              <Link href="/process#inspection">
                <span className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className="process-step bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-brand-blue">
              <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-6">
                6
              </div>
              <h3 className="text-xl font-bold mb-3">Final Walkthrough</h3>
              <p className="text-gray-600 mb-4">
                We conduct a final walkthrough with you to ensure your complete satisfaction. We'll address any concerns
                and provide maintenance recommendations to help you get the most out of your new coating.
              </p>
              <Link href="/process#walkthrough">
                <span className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/process">
              <FancyButton variant="outline" size="lg" rounded="full">
                Learn More About Our Process
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact us today to schedule a consultation and experience the NXG Coatings difference.
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
