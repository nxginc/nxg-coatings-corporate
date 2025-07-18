"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { Home, Building2, Factory, BuildingIcon, CheckCircle, ArrowRight } from "lucide-react"

const industries = [
  {
    id: "residential",
    title: "Residential",
    description: "Transform your home with our premium painting and coating services designed for homeowners.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/residential_FqQDni9Oa.jpg?updatedAt=1665175459020",
    icon: Home,
    benefits: [
      "Increase your home's curb appeal and value",
      "Protect your property from weather damage",
      "Extend the life of your exterior surfaces",
      "Reduce maintenance costs over time",
      "Enjoy a fresh, updated look for your home",
    ],
    features: [
      "Premium quality paints and coatings",
      "Expert color consultation",
      "Thorough surface preparation",
      "Detailed masking and protection",
      "Meticulous application techniques",
      "Comprehensive clean-up",
    ],
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Professional painting solutions for offices, retail spaces, and commercial properties.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/commercial/office-painting_4E4EaH-7y.JPG?updatedAt=1747490385376&tr=n-ik_ml_thumbnail",
    icon: Building2,
    benefits: [
      "Create a professional business image",
      "Minimize disruption to your operations",
      "Comply with industry regulations",
      "Protect your investment long-term",
      "Maintain a clean, welcoming environment",
    ],
    features: [
      "After-hours and weekend scheduling",
      "Low-VOC and eco-friendly options",
      "Commercial-grade durable finishes",
      "Color branding consistency",
      "Regular maintenance programs",
      "Project management expertise",
    ],
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Specialized coatings for industrial facilities that withstand harsh environments.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/hoa-exterior_gQCOAvl8Q.JPG?updatedAt=1747490345040&tr=n-ik_ml_thumbnail",
    icon: Factory,
    benefits: [
      "Extend equipment and facility lifespan",
      "Improve safety with proper markings",
      "Reduce maintenance downtime",
      "Protect against chemical exposure",
      "Meet industry compliance standards",
    ],
    features: [
      "Chemical-resistant coatings",
      "High-temperature applications",
      "Anti-corrosion treatments",
      "Epoxy floor systems",
      "Safety marking and color coding",
      "Specialized equipment protection",
    ],
  },
  {
    id: "hoa",
    title: "HOA & Multi-Family",
    description: "Comprehensive painting services for homeowners associations and multi-family properties.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/64377d87f8cf768523c106d0_hoa-painting-hero-02_WTec4soEPA.webp?updatedAt=1747490345547&tr=n-ik_ml_thumbnail",
    icon: BuildingIcon,
    benefits: [
      "Maintain property values across the community",
      "Coordinate consistent aesthetics",
      "Minimize disruption to residents",
      "Manage large-scale projects efficiently",
      "Create long-term maintenance plans",
    ],
    features: [
      "Community-wide color schemes",
      "Phased project implementation",
      "Resident communication management",
      "Common area specialization",
      "Board presentation support",
      "Multi-year planning assistance",
    ],
  },
]

export default function IndustriesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Industries We Serve"
        description="Our specialized coating solutions are tailored to meet the unique needs of various industries."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/Industries/hoa_4XZCTP8X4.jpeg?updatedAt=1704393622112"
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
        </div>
      </EnhancedHero>

      {/* Industries Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Specialized Solutions for Every Sector
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At NXG Coatings, we understand that different industries have unique requirements. Our team has the
              expertise to deliver tailored coating solutions that meet your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={`${industry.title} coating services`}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <industry.icon className="h-6 w-6 text-brand-blue" />
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-brand-blue mb-3">{industry.title}</h3>
                  <p className="text-gray-600 mb-4">{industry.description}</p>

                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="mb-4 grid grid-cols-1 gap-2">
                    {industry.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/industries/${industry.id}`}>
                    <FancyButton
                      variant="outline"
                      className="w-full justify-center border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </FancyButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gray-50 rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/Industries/industries-pattern_Xt7Hs9Kkl.jpg?updatedAt=1741216795011"
                alt="Background pattern"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Not Sure Which Solution Is Right For You?</h2>
              <p className="text-gray-600 mb-8">
                Our experts can help you determine the best coating solutions for your specific needs. Schedule a
                consultation today to discuss your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAModal
                  trigger={
                    <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
                      Get Free Estimate
                    </FancyButton>
                  }
                />
                <FancyButton
                  variant="outline"
                  size="lg"
                  rounded="full"
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                  onClick={() => window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")}
                >
                  Book Consultation
                </FancyButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
