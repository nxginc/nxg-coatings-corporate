"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Droplets, Shield, Clock, Sun, Paintbrush } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function DeckStainingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Professional Deck Staining Services"
        subtitle="Protect and beautify your outdoor living spaces with our expert deck staining and sealing services."
        backgroundImage="/images/deck/deck1.jpeg"
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

      {/* Placeholder for rest of content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Deck Staining Services</h2>
          <p className="text-center text-gray-600">
            Content coming soon...
          </p>
        </div>
      </section>

      <ConsultationBooking />
    </main>
  )
}
