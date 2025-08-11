"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Factory, Shield, Droplet, Wrench, HardHat, Building2 } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function IndustrialPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Industrial Coating Solutions"
        subtitle="Specialized coatings for industrial facilities that withstand harsh environments and demanding conditions."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/WebAssets/industrial/ind-painting_kAE5i326rL.jpg?updatedAt=1746877905315"
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
                <Factory className="h-5 w-5 mr-2" />
                <span>Industrial Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                Heavy-Duty Protection for Industrial Environments
              </h2>
              <p className="text-gray-600 mb-6">
                Industrial facilities face unique challenges from chemical exposure, extreme temperatures, and heavy
                equipment. Our specialized industrial coatings are engineered to withstand these demanding conditions.
              </p>
              <p className="text-gray-600 mb-8">
                We understand the critical nature of industrial operations and work efficiently to minimize downtime
                while providing long-lasting protection.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Chemical Resistance</h3>
                    <p className="text-gray-600 text-sm">Withstands exposure to harsh chemicals</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Droplet className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Moisture Protection</h3>
                    <p className="text-gray-600 text-sm">Prevents corrosion and water damage</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Wrench className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Abrasion Resistance</h3>
                    <p className="text-gray-600 text-sm">Stands up to heavy equipment and traffic</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <HardHat className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Safety Compliant</h3>
                    <p className="text-gray-600 text-sm">Meets industry safety standards</p>
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
                  src="https://ik.imagekit.io/j98e6hcfnkn/WebAssets/industrial/industrial-structure-painting-services_7VncZWEPH.jpg?updatedAt=1746877905251"
                  alt="Industrial coating project"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Removed testimonial callout per content update */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Industrial Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer specialized coating solutions designed for the unique challenges of industrial environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Epoxy Floor Coatings",
                description: "Durable, chemical-resistant flooring solutions for industrial facilities.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/epoxy-flooring_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/epoxy-flooring",
              },
              {
                title: "Anti-Corrosion Coatings",
                description: "Protect metal surfaces from rust and corrosion in harsh environments.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/anti-corrosion_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/anti-corrosion",
              },
              {
                title: "High-Temperature Coatings",
                description: "Specialized coatings that withstand extreme heat and thermal cycling.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/Services/high-temp_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/high-temperature",
              },
              {
                title: "Chemical-Resistant Coatings",
                description: "Protection against acids, solvents, and other harsh chemicals.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/chemical-resistant_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/chemical-resistant",
              },
              {
                title: "Safety Markings & Line Striping",
                description: "Clear visual safety indicators for industrial facilities.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/safety-markings_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/safety-markings",
              },
              {
                title: "Equipment Coatings",
                description: "Specialized coatings to protect and extend the life of industrial equipment.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/Services/equipment-coatings_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                link: "/services/equipment-coatings",
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

      {/* Applications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Industrial Applications</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our industrial coating solutions are suitable for a wide range of facilities and applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Manufacturing Plants",
                description: "Durable coatings for production facilities that withstand heavy use.",
                icon: Factory,
              },
              {
                title: "Warehouses",
                description: "Floor coatings and markings for efficient and safe operations.",
                icon: Building2,
              },
              {
                title: "Food Processing",
                description: "Hygienic, easy-to-clean surfaces that meet regulatory requirements.",
                icon: Droplet,
              },
              {
                title: "Chemical Plants",
                description: "Specialized coatings resistant to chemical exposure and spills.",
                icon: Shield,
              },
              {
                title: "Power Plants",
                description: "Heat-resistant coatings for extreme temperature environments.",
                icon: Wrench,
              },
              {
                title: "Water Treatment",
                description: "Waterproof and chemical-resistant coatings for water facilities.",
                icon: Droplet,
              },
              {
                title: "Distribution Centers",
                description: "High-traffic floor coatings and safety markings for logistics.",
                icon: Building2,
              },
              {
                title: "Automotive Facilities",
                description: "Oil-resistant and durable coatings for automotive environments.",
                icon: Wrench,
              },
            ].map((application, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-blue"
              >
                <div className="bg-brand-blue/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <application.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-2">{application.title}</h3>
                <p className="text-gray-600">{application.description}</p>
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
