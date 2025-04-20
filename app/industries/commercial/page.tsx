"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { Building2, Clock, Briefcase, ShieldCheck, Users } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function CommercialPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Commercial Coating Solutions"
        description="Professional painting and coating services for offices, retail spaces, and commercial properties."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/Industries/commercial-hero_mXY0A8JXz.jpeg?updatedAt=1665175458082"
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
                <Building2 className="h-5 w-5 mr-2" />
                <span>Commercial Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">Elevate Your Business Environment</h2>
              <p className="text-gray-600 mb-6">
                Your commercial property's appearance directly impacts your business image. Our commercial coating
                services help you create a professional, welcoming environment while protecting your investment.
              </p>
              <p className="text-gray-600 mb-8">
                We understand the unique challenges of commercial projects and work efficiently to minimize disruption
                to your operations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Minimal Disruption</h3>
                    <p className="text-gray-600 text-sm">After-hours scheduling to keep your business running</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Briefcase className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Professional Results</h3>
                    <p className="text-gray-600 text-sm">High-quality finishes that impress clients</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <ShieldCheck className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Durable Protection</h3>
                    <p className="text-gray-600 text-sm">Commercial-grade coatings built to last</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Users className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Experienced Team</h3>
                    <p className="text-gray-600 text-sm">Specialists in commercial applications</p>
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
                  src="https://ik.imagekit.io/j98e6hcfnkn/Industries/commercial-detail_mXY0A8JXz.jpeg?updatedAt=1665175458082"
                  alt="Commercial painting project"
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Commercial Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of coating services to meet all your commercial needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Office Painting",
                description: "Create a professional environment that inspires productivity and impresses clients.",
                image: "https://res.cloudinary.com/dvty0qsht/image/upload/v1745088387/office-painting_mzd99e.jpg",
                link: "/services/office-painting",
              },
              {
                title: "Retail Space Painting",
                description: "Enhance your brand image with custom color schemes that attract customers.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/retail-painting_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/retail-painting",
              },
              {
                title: "Restaurant Painting",
                description: "Create the perfect ambiance for your dining establishment with our specialized services.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/restaurant-painting_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/restaurant-painting",
              },
              {
                title: "Healthcare Facility Painting",
                description: "Specialized coatings that meet healthcare standards for cleanliness and durability.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/healthcare-painting_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/healthcare-painting",
              },
              {
                title: "Warehouse Painting",
                description: "Durable coatings for high-traffic commercial and warehouse spaces.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/warehouse-painting_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/warehouse-painting",
              },
              {
                title: "Exterior Commercial Painting",
                description: "Make a strong first impression with a professional exterior appearance.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/commercial-exterior_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/commercial-exterior",
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

      {/* Consultation Booking */}
      <ConsultationBooking />
    </main>
  )
}
