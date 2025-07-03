"use client"

import ConsultationBooking from "@/components/consultation-booking"
import ParallaxFeatures from "@/components/parallax-features"
import ServicesSlider from "@/components/services-slider"
import TestimonialsSection from "@/components/testimonials-section"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import EnhancedHero from "@/components/enhanced-hero"
import IndustrySection from "@/components/industry-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Professional Coating Solutions for Your Home"
        description="Transform and protect your property with our expert coating services. Schedule a consultation today."
        backgroundImage="/images/banners/home-hero.png"
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

      <ServicesSlider />
      <ParallaxFeatures />
      <TestimonialsSection />
      <IndustrySection />
      <ConsultationBooking />
    </main>
  )
}
