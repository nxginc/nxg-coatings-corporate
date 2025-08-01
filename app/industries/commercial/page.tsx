"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Building2, Clock, Briefcase, ShieldCheck, Users } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function CommercialPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Commercial Coating Solutions"
        subtitle="Professional painting and coating services for offices, retail spaces, and commercial properties."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/industries/commercial/banner_dWRiH2Tw5.jpeg?updatedAt=1747919188438"
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
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-xs">
                <div className="flex items-start mb-2">
                  <div className="bg-green-100 rounded-full p-1 mr-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    "NXG Coatings completed our office renovation with minimal disruption to our business. Highly
                    recommended!"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                    <Image
                      src="https://ik.imagekit.io/j98e6hcfnkn/testimonials/testimonial-2_Xt7Hs9Kkl.jpg?updatedAt=1741216795011"
                      alt="Customer"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Michael Chen</p>
                    <p className="text-xs text-gray-500">Business Owner</p>
                  </div>
                </div>
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
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/office-painting_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
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

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Benefits of Professional Commercial Painting</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Investing in professional commercial painting services offers numerous advantages for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Enhanced Brand Image</h3>
              <ul className="space-y-3">
                {[
                  "Create a consistent visual identity across your locations",
                  "Reinforce your brand colors and aesthetics",
                  "Make a positive impression on clients and visitors",
                  "Demonstrate attention to detail and professionalism",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Improved Workplace Environment</h3>
              <ul className="space-y-3">
                {[
                  "Boost employee morale and productivity",
                  "Create a more pleasant atmosphere for staff and customers",
                  "Reduce maintenance costs with durable finishes",
                  "Improve lighting efficiency with reflective coatings",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Property Protection</h3>
              <ul className="space-y-3">
                {[
                  "Shield surfaces from wear, moisture, and damage",
                  "Extend the lifespan of your building materials",
                  "Prevent costly repairs with preventative maintenance",
                  "Protect against environmental factors and pollutants",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Operational Efficiency</h3>
              <ul className="space-y-3">
                {[
                  "Minimize business disruption with flexible scheduling",
                  "Quick project completion by professional teams",
                  "Reduced maintenance requirements with quality finishes",
                  "Compliance with industry regulations and standards",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Booking */}
      <ConsultationBooking />
    </main>
  )
}
