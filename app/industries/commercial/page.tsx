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
        backgroundImage="https://res.cloudinary.com/dvty0qsht/image/upload/v1745088496/commercial-hero_tnbvxr.jpg"
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
                  src="https://res.cloudinary.com/dvty0qsht/image/upload/v1745088496/commercial-detail_tnbvxr.jpg"
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
      

      {/* Projects Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Commercial Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our recent commercial painting and coating projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/page-assets/warehouse-com_T1h0ewxXA.JPG?updatedAt=1746533552273"
                alt="Commercial warehouse painting project with freshly painted white walls and yellow columns"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h3 className="font-bold text-lg text-brand-blue">Warehouse Interior Painting</h3>
                <p className="text-gray-600">Complete interior painting for a commercial warehouse facility</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/page-assets/warehouse_VOmXmSyjD.JPG?updatedAt=1746533552104"
                alt="Large warehouse space with industrial painting application"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h3 className="font-bold text-lg text-brand-blue">Industrial Warehouse Coating</h3>
                <p className="text-gray-600">Specialized coatings for industrial warehouse environments</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/page-assets/floor_zODYN-2gT.jpeg?updatedAt=1746533538598"
                alt="Commercial floor coating application"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h3 className="font-bold text-lg text-brand-blue">Commercial Floor Coating</h3>
                <p className="text-gray-600">Durable epoxy floor coatings for commercial spaces</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://ik.imagekit.io/j98e6hcfnkn/page-assets/garage_FhxpSMdlH.JPG?updatedAt=1746533538239"
                alt="Commercial garage painting project"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h3 className="font-bold text-lg text-brand-blue">Commercial Garage Painting</h3>
                <p className="text-gray-600">Specialized coatings for commercial garage and parking facilities</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <CTAModal
              trigger={
                <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
                  Get a Free Quote
                </FancyButton>
              }
            />
          </div>
        </div>
      </section>

      {/* Consultation Booking */}
      <ConsultationBooking />
    </main>
  )
}
