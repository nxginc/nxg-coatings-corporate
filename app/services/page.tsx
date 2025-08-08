import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import EnhancedHero from "@/components/enhanced-hero"
import ServiceDetail from "@/components/service-detail"
import ServicesSlider from "@/components/services-slider"
import { FancyButton } from "@/components/ui/fancy-button"

import { ExternalLink, Home, Paintbrush, Palette, Shield, Droplet, RefreshCw, Package, Brush } from 'lucide-react'

export const metadata: Metadata = {
  title: "Our Services | NXG Coatings",
  description:
    "Explore our comprehensive range of professional painting and coating services for residential, commercial, and industrial properties.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Our Professional Services"
        subtitle="Discover our comprehensive range of coating services designed to protect and beautify your property."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
        height="medium"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="#exterior">
            <FancyButton variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white">
              <ExternalLink className="h-4 w-4 mr-2" />
              Exterior
            </FancyButton>
          </Link>
          <Link href="#interior">
            <FancyButton variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white">
              <Home className="h-4 w-4 mr-2" />
              Interior
            </FancyButton>
          </Link>
          <Link href="#decks">
            <FancyButton variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white">
              <Paintbrush className="h-4 w-4 mr-2" />
              Decks
            </FancyButton>
          </Link>
          <Link href="#cabinets">
            <FancyButton variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white">
              <Palette className="h-4 w-4 mr-2" />
              Cabinets
            </FancyButton>
          </Link>
        </div>
      </EnhancedHero>

      {/* Services Overview */}
      <ServicesSlider />

      {/* Exterior Painting */}
      <div id="exterior">
        <ServiceDetail
          title="Exterior Painting"
          description="Transform and protect your home's exterior with our professional painting services. We use premium quality paints and coatings that stand up to harsh weather conditions while enhancing your property's curb appeal."
          features={[
            "Premium weather-resistant paints and coatings",
            "Thorough surface preparation and cleaning",
            "Expert application techniques for lasting results",
            "Color consultation and custom color matching",
            "Comprehensive clean-up after project completion",
          ]}
          image="https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/featured_-lZGm1HUi.jpeg?updatedAt=1747919188436"
        />
      </div>

      {/* Interior Painting */}
      <div id="interior">
        <ServiceDetail
          title="Interior Painting"
          description="Revitalize your living spaces with our interior painting services. Our team of skilled professionals delivers flawless results with minimal disruption to your daily routine."
          features={[
            "Low-VOC and eco-friendly paint options",
            "Precise cutting-in and trim work",
            "Protection of furniture and flooring",
            "Smooth, even application with no drips or streaks",
            "Quick turnaround times to minimize disruption",
          ]}
          image="https://ik.imagekit.io/j98e6hcfnkn/services/interior-painting/featured_-6AhYSzXe.jpeg?updatedAt=1747919188436"
          reversed={true}
        />
      </div>

      {/* Deck Staining */}
      <div id="decks">
        <ServiceDetail
          title="Deck Staining & Refinishing"
          description="Protect and beautify your outdoor living spaces with our professional deck staining services. We'll help you maintain the natural beauty of your wood while providing essential protection against the elements."
          features={[
            "Thorough cleaning and preparation",
            "Repair of damaged boards and surfaces",
            "Premium stains and sealers for maximum protection",
            "Expert application for even coverage",
            "Maintenance recommendations to extend lifespan",
          ]}
          image="https://ik.imagekit.io/j98e6hcfnkn/services/deck-staining/featured_QPrH8S2P-.jpeg?updatedAt=1747919188435"
        />
      </div>

      {/* Cabinet Refinishing */}
      <div id="cabinets">
        <ServiceDetail
          title="Cabinet Refinishing"
          description="Transform your kitchen or bathroom without the cost of a full remodel. Our cabinet refinishing services give your existing cabinets a fresh, new look at a fraction of the cost of replacement."
          features={[
            "Thorough cleaning and degreasing",
            "Repair of damaged areas",
            "Premium primers and paints for durability",
            "Custom color matching and finishes",
            "Hardware replacement and installation",
          ]}
          image="https://ik.imagekit.io/j98e6hcfnkn/services/cabinet-refinishing/featured_pTK-TIUWp.jpeg?updatedAt=1747919188437"
          reversed={true}
        />
      </div>

      {/* Additional Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">Additional Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pressure Washing */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/PressureCleaning_MN_UW1Y64ry3.png?updatedAt=1666951996755"
                  alt="Pressure Washing"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Droplet className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue mb-3">Pressure Washing</h3>
                <p className="text-gray-600 mb-4">
                  Restore your surfaces to like-new condition with our thorough pressure cleaning services. Ideal for
                  driveways, siding, decks, and more.
                </p>
              </div>
            </div>

            {/* Paint Restoration */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/Restoration_MN_xne_zkvLl.png?updatedAt=1666951498592"
                  alt="Paint Restoration"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue mb-3">Paint Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Bring damaged surfaces back to life with our comprehensive restoration services. We repair, prime, and
                  repaint to restore beauty and protection.
                </p>
              </div>
            </div>

            {/* Protective Coatings */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/finefinishes_Dq4bB4CJa.jpg?updatedAt=1666774073303"
                  alt="Protective Coatings"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue mb-3">Protective Coatings</h3>
                <p className="text-gray-600 mb-4">
                  Extend the life of your surfaces with our specialized protective coatings. Ideal for high-traffic
                  areas and surfaces exposed to harsh conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Painting Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a proven process to ensure exceptional results on every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">Consultation</h3>
              <p className="text-gray-600">
                We start with a thorough consultation to understand your needs, preferences, and project goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">Preparation</h3>
              <p className="text-gray-600">
                Proper preparation is crucial. We clean, repair, and prepare surfaces to ensure optimal results.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">Application</h3>
              <p className="text-gray-600">
                Our skilled technicians apply coatings using professional techniques and high-quality materials.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">Inspection</h3>
              <p className="text-gray-600">
                We conduct a thorough inspection to ensure every detail meets our high standards.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/process">
              <FancyButton variant="outline" size="lg" rounded="full">
                Learn More About Our Process
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Contact us today to schedule a consultation and get a free estimate for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <FancyButton variant="gradient" size="lg" hasArrow={true} rounded="full">
                Contact Us
              </FancyButton>
            </Link>
            <Link href="/gallery">
              <FancyButton variant="outline" size="lg" rounded="full">
                View Our Gallery
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
