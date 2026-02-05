"use client"

import ConsultationBooking from "@/components/consultation-booking"
import ParallaxFeatures from "@/components/parallax-features"
import ServicesSlider from "@/components/services-slider"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import IndustrySection from "@/components/industry-section"
import ColorConsultation from "@/components/color-consultation"
import EnhancedHero from "@/components/enhanced-hero"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Professional Coating Solutions for Your Home"
        subtitle="Transform and protect your property with our expert coating services. Schedule a consultation today."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/featured/featured-home/f2_ElysbPaNW.jpg?updatedAt=1704333595263"
        height="large"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAModal
            trigger={
              <FancyButton variant="shine" size="xl" hasArrow={true} rounded="full">
                Get Free Estimate
              </FancyButton>
            }
          />
          <FancyButton
            variant="outline"
            size="xl"
            rounded="full"
            className="bg-transparent border-white text-white hover:bg-white/10"
            onClick={() => window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")}
          >
            Book Consultation
          </FancyButton>
        </div>
      </EnhancedHero>

      {/* Services Slider Section */}
      <ServicesSlider />

      {/* Parallax Features Section */}
      <ParallaxFeatures />

      {/* Color Consultation Section */}
      <ColorConsultation />

  {/* Testimonials Section removed per request */}

      {/* Industry Section */}
      <IndustrySection />

      {/* Consultation Booking Section */}
      <ConsultationBooking />

      {/* Blog Preview Section */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Insights</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Latest From Our Blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert tips, industry insights, and helpful guides for your coating projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <article className="bg-card rounded-2xl shadow-premium overflow-hidden border border-border/30 group hover:shadow-premium-lg transition-all duration-500">
              <div className="h-56 relative overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/blog-6_LmokjCe1Xb.jpg?updatedAt=1741213087003"
                  alt="Peeling exterior paint on house siding"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent flex items-end">
                  <h3 className="text-white font-serif text-xl font-semibold p-6 leading-tight">
                    How to Repair Peeling Exterior House Paint
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Peeling paint is one of the most common issues homeowners face. Learn how to restore your home&apos;s
                  exterior with our step-by-step guide.
                </p>
                <Link href="/blog/repair-peeling-exterior-paint" className="text-accent font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                  Read Full Article
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>

            <article className="bg-card rounded-2xl shadow-premium overflow-hidden border border-border/30 group hover:shadow-premium-lg transition-all duration-500">
              <div className="h-56 relative overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog1_o0PS2vfo9K.jpeg?updatedAt=1741212349688"
                  alt="Professional exterior coating application"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent flex items-end">
                  <h3 className="text-white font-serif text-xl font-semibold p-6 leading-tight">
                    5 Benefits of Professional Exterior Coating
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Discover how professional exterior coating can protect your home, increase its value, and reduce
                  maintenance costs over time.
                </p>
                <Link href="/blog/benefits-of-professional-exterior-coating" className="text-accent font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                  Read Full Article
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>

          <div className="text-center mt-14">
            <Link href="/blog">
              <FancyButton variant="outline" size="lg" rounded="full" className="border-2">
                View All Articles
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
