"use client"

import Link from "next/link"
import { Building2, Home, Factory, Store } from "lucide-react"

const industries = [
  {
    icon: Home,
    title: "Residential",
    description: "Beautiful homes deserve beautiful paint. We specialize in residential painting services.",
    link: "/industries/residential",
    services: ["Interior Painting", "Exterior Painting", "Deck Staining", "Cabinet Refinishing"]
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Professional painting for businesses, offices, and commercial properties.",
    link: "/industries/commercial",
    services: ["Office Buildings", "Retail Spaces", "Warehouses", "Property Management"]
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Heavy-duty painting solutions for industrial facilities and manufacturing plants.",
    link: "/industries/industrial",
    services: ["Equipment Painting", "Safety Markings", "Corrosion Protection", "Facility Maintenance"]
  },
  {
    icon: Store,
    title: "HOA Communities",
    description: "Specialized painting services for homeowners associations and community properties.",
    link: "/industries/hoa",
    services: ["Community Buildings", "Common Areas", "Exterior Maintenance", "Color Consultation"]
  }
]

export default function IndustrySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide specialized painting solutions for residential, commercial,
            industrial, and community properties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {industry.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {industry.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Services:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {industry.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-2"></span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={industry.link}
                  className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don't see your industry? We provide custom painting solutions for all types of properties.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Get a Custom Quote
          </Link>
        </div>
      </div>
    </section>
  )
}