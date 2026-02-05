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
          image="https://ik.imagekit.io/j98e6hcfnkn/service-pages/exterior/4911CC69-47B2-463A-975D-68E673E95627_V9zcEAcgC.jpeg?updatedAt=1746446543080"
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
          image="https://ik.imagekit.io/j98e6hcfnkn/portfolio/interior/cg2interior/c2interior0_WVVPL6JB6.jpg?updatedAt=1666795159879"
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
          image="https://ik.imagekit.io/j98e6hcfnkn/featured/deck-staining/6_Wsj3ws2Uw.jpg?updatedAt=1681571719088"
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
          image="https://ik.imagekit.io/j98e6hcfnkn/WebAssets/cabinets/cabinet-bathroom_eCKG4guCX.JPG?updatedAt=1747490422629"
          reversed={true}
        />
      </div>

      {/* Additional Services Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">More Services</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Additional Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pressure Washing */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-premium border border-border/30 hover:shadow-premium-lg transition-all duration-500 group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/PressureCleaning_MN_Z7jMuG9Dv.png?updatedAt=1666951495789"
                  alt="Pressure Washing"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-accent rounded-xl p-2.5">
                  <Droplet className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Pressure Washing</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Restore your surfaces to like-new condition with our thorough pressure cleaning services.
                </p>
              </div>
            </div>

            {/* Paint Restoration */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-premium border border-border/30 hover:shadow-premium-lg transition-all duration-500 group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/restoration_1rbm1Ax_Q.jpg?updatedAt=1741369714492"
                  alt="Paint Restoration"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-accent rounded-xl p-2.5">
                  <RefreshCw className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Paint Restoration</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bring damaged surfaces back to life with our comprehensive restoration services.
                </p>
              </div>
            </div>

            {/* Protective Coatings */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-premium border border-border/30 hover:shadow-premium-lg transition-all duration-500 group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/finefinishes_Dq4bB4CJa.jpg?updatedAt=1666774073303"
                  alt="Protective Coatings"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-accent rounded-xl p-2.5">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Protective Coatings</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Extend the life of your surfaces with our specialized protective coatings.
                </p>
              </div>
            </div>

            {/* Fine Finish and Millworker Painting */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-premium border border-border/30 hover:shadow-premium-lg transition-all duration-500 group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Banners/finefinishes_BOJLvbsTP.jpg?updatedAt=1666774120425"
                  alt="Fine Finish and Millworker Painting"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-accent rounded-xl p-2.5">
                  <Brush className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Fine Finish Painting</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Specialized painting for trim, windows, doors, and architectural millwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">How We Work</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Our Painting Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow a proven process to ensure exceptional results on every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-background rounded-2xl p-8 text-center hover:shadow-premium transition-all duration-500 border border-border/30 group">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110">
                <span className="text-primary-foreground text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Consultation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We start with a thorough consultation to understand your needs and project goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-background rounded-2xl p-8 text-center hover:shadow-premium transition-all duration-500 border border-border/30 group">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110">
                <span className="text-primary-foreground text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Preparation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Proper preparation is crucial. We clean, repair, and prepare surfaces for optimal results.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-background rounded-2xl p-8 text-center hover:shadow-premium transition-all duration-500 border border-border/30 group">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110">
                <span className="text-primary-foreground text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Application</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our skilled technicians apply coatings using professional techniques and materials.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-background rounded-2xl p-8 text-center hover:shadow-premium transition-all duration-500 border border-border/30 group">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110">
                <span className="text-primary-foreground text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Inspection</h3>
              <p className="text-muted-foreground leading-relaxed">
                We conduct a thorough inspection to ensure every detail meets our high standards.
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link href="/process">
              <FancyButton variant="outline" size="lg" rounded="full" className="border-2">
                Learn More About Our Process
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Get Started</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Contact us today to schedule a consultation and get a free estimate for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <FancyButton variant="accent" size="lg" hasArrow={true} rounded="full">
                Contact Us
              </FancyButton>
            </Link>
            <Link href="/gallery">
              <FancyButton variant="outline" size="lg" rounded="full" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                View Our Gallery
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
