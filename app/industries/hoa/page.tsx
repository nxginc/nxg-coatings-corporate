"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, BuildingIcon, Users, ClipboardCheck, Calendar, PaintBucket } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function HOAPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="HOA Painting Services"
        subtitle="Professional painting solutions for homeowner associations, apartment complexes, and multi-unit properties."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/64377d87f8cf768523c106d0_hoa-painting-hero-02_WTec4soEPA.webp?updatedAt=1747490345547"
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

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-medium mb-6">
                <BuildingIcon className="h-5 w-5 mr-2" />
                <span>HOA & Multi-Family Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                Maintain Property Values & Community Appeal
              </h2>
              <p className="text-gray-600 mb-6">
                HOAs and multi-family properties require specialized coating services that maintain consistent
                aesthetics while minimizing disruption to residents. Our team has extensive experience working with
                property managers and HOA boards.
              </p>
              <p className="text-gray-600 mb-8">
                We understand the unique challenges of community-wide projects and provide comprehensive solutions that
                enhance property values while staying within budget constraints.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Users className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Resident Coordination</h3>
                    <p className="text-gray-600 text-sm">Minimize disruption to community members</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <ClipboardCheck className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">HOA Compliance</h3>
                    <p className="text-gray-600 text-sm">Meet all community guidelines and standards</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Calendar className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Project Phasing</h3>
                    <p className="text-gray-600 text-sm">Strategic scheduling for large-scale projects</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <PaintBucket className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Color Consistency</h3>
                    <p className="text-gray-600 text-sm">Maintain uniform appearance across properties</p>
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
                  src="https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/64377d87f8cf768523c106d0_hoa-painting-hero-02_WTec4soEPA.webp?updatedAt=1747490345547"
                  alt="HOA painting project"
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our HOA & Multi-Family Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive coating solutions tailored to the unique needs of community properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Exterior Painting",
                description: "Comprehensive exterior painting for multi-unit residential properties.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/Industries/residential_FqQDni9Oa.jpg?updatedAt=1665175459020",
                link: "/services/hoa-exterior",
              },
              {
                title: "Common Area Painting",
                description: "Professional painting for lobbies, hallways, and community spaces.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/hallway_qBTUh00Xz.jpeg?updatedAt=1747490345579",
                link: "/services/common-areas",
              },
              {
                title: "Deck & Fence Staining",
                description: "Maintenance and protection for outdoor community areas.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/service-pages/hoa/4CB662A8-7DB8-43B7-BE85-6329C3C19063_4k7OHF_iI6.jpeg?updatedAt=1746446597753",
                link: "/services/community-deck",
              }
            
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our HOA & Multi-Family Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We've developed a streamlined process specifically for community-wide projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "Meet with property managers and HOA board to understand needs and requirements.",
              },
              {
                step: "2",
                title: "Property Assessment",
                description: "Thorough inspection of all areas to be painted to identify specific needs.",
              },
              {
                step: "3",
                title: "Proposal & Planning",
                description: "Detailed proposal with timeline, phasing plan, and resident communication strategy.",
              },
              {
                step: "4",
                title: "Project Execution",
                description: "Systematic implementation with minimal disruption to residents and common areas.",
              },
              {
                step: "5",
                title: "Final Inspection",
                description: "Comprehensive review with property management to ensure complete satisfaction.",
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Benefits for HOAs & Property Managers</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our specialized approach offers numerous advantages for multi-family properties and HOAs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Property Value Enhancement</h3>
              <ul className="space-y-3">
                {[
                  "Increase overall property values across the community",
                  "Enhance curb appeal for current and prospective residents",
                  "Create a cohesive, well-maintained appearance",
                  "Protect building exteriors from environmental damage",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Resident Satisfaction</h3>
              <ul className="space-y-3">
                {[
                  "Minimize disruption with efficient project management",
                  "Clear communication throughout the project",
                  "Improve resident pride in their community",
                  "Address individual concerns with personalized attention",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Budget Management</h3>
              <ul className="space-y-3">
                {[
                  "Transparent pricing with no hidden costs",
                  "Phased implementation to spread costs over time",
                  "Preventative maintenance to avoid costly repairs",
                  "Long-lasting results that maximize your investment",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Administrative Support</h3>
              <ul className="space-y-3">
                {[
                  "Assistance with HOA board presentations",
                  "Detailed documentation for community records",
                  "Multi-year maintenance planning",
                  "Regular progress updates and reporting",
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
