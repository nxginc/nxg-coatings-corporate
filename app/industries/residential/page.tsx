"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { Home, Shield, Clock, Palette, Star } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function ResidentialPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Residential Coating Solutions"
        description="Transform your home with our premium painting and coating services designed specifically for homeowners."
        backgroundImage="https://cdn.nxgcoatings.com/industries/residential/residential-hero.jpg"
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

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-medium mb-6">
                <Home className="h-5 w-5 mr-2" />
                <span>Residential Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                Enhance Your Home's Beauty and Protection
              </h2>
              <p className="text-gray-600 mb-6">
                Your home is your most valuable investment. Our residential coating services are designed to not only
                enhance its appearance but also provide long-lasting protection against the elements.
              </p>
              <p className="text-gray-600 mb-8">
                From traditional painting to specialized coatings, our team of experts will work with you to find the
                perfect solution for your home's unique needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Long-lasting Protection</h3>
                    <p className="text-gray-600 text-sm">Superior durability against weather and wear</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Palette className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Expert Color Consultation</h3>
                    <p className="text-gray-600 text-sm">Find the perfect colors for your home</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Efficient Completion</h3>
                    <p className="text-gray-600 text-sm">Minimal disruption to your daily life</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Star className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Premium Quality</h3>
                    <p className="text-gray-600 text-sm">Top-tier materials and craftsmanship</p>
                  </div>
                </div>
              </div>

              <CTAModal
                trigger={
                  <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
                    Get Free Estimate
                  </FancyButton>
                }
              />
            </div>

            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://cdn.nxgcoatings.com/industries/residential/residential-detail.jpg"
                  alt="Residential painting project"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Residential Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of coating services to meet all your residential needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Exterior Painting",
                description: "Enhance your home's curb appeal with our premium exterior painting services.",
                image: "https://cdn.nxgcoatings.com/services/exterior-painting.jpg",
                link: "/services/exterior-painting",
              },
              {
                title: "Interior Painting",
                description: "Transform your living spaces with our expert interior painting services.",
                image: "https://cdn.nxgcoatings.com/services/interior-painting.jpg",
                link: "/services/interior-painting",
              },
              {
                title: "Deck & Fence Staining",
                description: "Protect and beautify your outdoor wooden surfaces with our staining services.",
                image: "https://cdn.nxgcoatings.com/services/deck-staining.jpg",
                link: "/services/deck-staining",
              },
              {
                title: "Cabinet Refinishing",
                description: "Give your kitchen a fresh look with our cabinet refinishing services.",
                image: "https://cdn.nxgcoatings.com/services/cabinet-refinishing.jpg",
                link: "/services/cabinet-refinishing",
              },
              {
                title: "Color Consultation",
                description: "Get expert advice on choosing the perfect colors for your home.",
                image: "https://cdn.nxgcoatings.com/services/color-consultation.jpg",
                link: "/services/color-consultation",
              },
              {
                title: "Specialty Finishes",
                description: "Add unique textures and finishes to create distinctive living spaces.",
                image: "https://cdn.nxgcoatings.com/services/specialty-finishes.jpg",
                link: "/services/specialty-finishes",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-blue mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link href={service.link}>
                    <FancyButton variant="link" hasArrow={true} className="p-0 text-brand-blue">
                      Learn More
                    </FancyButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Residential Painting Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow a meticulous process to ensure exceptional results for every residential project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We start with a thorough consultation to understand your vision and requirements.",
              },
              {
                step: "2",
                title: "Preparation",
                description:
                  "Proper surface preparation is key to a long-lasting finish. We clean, repair, and prime surfaces.",
              },
              {
                step: "3",
                title: "Application",
                description: "Our skilled painters apply premium coatings with meticulous attention to detail.",
              },
              {
                step: "4",
                title: "Inspection",
                description: "We conduct a thorough inspection to ensure every aspect meets our high standards.",
              },
            ].map((process, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl border border-gray-100 hover:border-brand-blue hover:shadow-md transition-all duration-300"
              >
                <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-2 mt-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/process">
              <FancyButton
                variant="outline"
                size="lg"
                rounded="full"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                View Our Full Process
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Residential Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse our gallery of completed residential projects to see the quality of our work.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://cdn.nxgcoatings.com/gallery/residential/residential-1.jpg",
              "https://cdn.nxgcoatings.com/gallery/residential/residential-2.jpg",
              "https://cdn.nxgcoatings.com/gallery/residential/residential-3.jpg",
              "https://cdn.nxgcoatings.com/gallery/residential/residential-4.jpg",
            ].map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Residential project ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <FancyButton variant="shine" size="sm" rounded="full">
                      View Larger
                    </FancyButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery/residential">
              <FancyButton
                variant="outline"
                size="lg"
                rounded="full"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                View Full Gallery
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Booking */}
      <ConsultationBooking />
    </main>
  )
}
