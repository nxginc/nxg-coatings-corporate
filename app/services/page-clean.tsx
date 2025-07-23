import type { Metadata } from "next"
import Image from "next/image"
import EnhancedHero from "@/components/enhanced-hero"
import ServiceDetail from "@/components/service-detail"
import ServicesSlider from "@/components/services-slider"
import { FancyButton } from "@/components/ui/fancy-button"
import Link from "next/link"
import { ExternalLink, Home, Paintbrush, Palette, Shield, Droplet, RefreshCw } from "lucide-react"

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
        backgroundImage="/images/banners/services-banner.jpg"
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
          <Link href="#cabinet">
            <FancyButton variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Cabinet Refinishing
            </FancyButton>
          </Link>
          <Link href="#deck">
            <FancyButton variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white">
              <Droplet className="h-4 w-4 mr-2" />
              Deck Staining
            </FancyButton>
          </Link>
        </div>
      </EnhancedHero>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Complete Coating Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From residential homes to commercial buildings, we provide comprehensive coating services 
              tailored to your specific needs and budget.
            </p>
          </div>
          
          <ServicesSlider />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact our team today to discuss your project and receive a free, detailed estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <FancyButton variant="shine" size="xl" hasArrow={true} rounded="full">
                Get Free Quote
              </FancyButton>
            </Link>
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
