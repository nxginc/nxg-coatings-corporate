"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Home, Shield, Clock, Sun, Paintbrush } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function ExteriorPaintingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Exterior Painting Services"
        description="Transform your home's curb appeal with our premium exterior painting services that protect and beautify."
        backgroundImage="https://res.cloudinary.com/dvty0qsht/image/upload/v1745088496/exterior-painting-hero_tnbvxr.jpg"
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
                <span>Exterior Excellence</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                Protect and Beautify Your Home's Exterior
              </h2>
              <p className="text-gray-600 mb-6">
                Your home's exterior is its first line of defense against the elements. Our professional exterior
                painting services not only enhance your property's appearance but also provide essential protection
                against weather damage, UV rays, and premature aging.
              </p>
              <p className="text-gray-600 mb-8">
                Using premium paints and expert application techniques, we deliver beautiful, long-lasting results that
                stand up to the harshest conditions while increasing your home's value and curb appeal.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Weather Protection</h3>
                    <p className="text-gray-600 text-sm">Shields against moisture, UV damage, and mildew</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Sun className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Enhanced Curb Appeal</h3>
                    <p className="text-gray-600 text-sm">Dramatically improves your home's appearance</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Long-Lasting Results</h3>
                    <p className="text-gray-600 text-sm">Premium paints for extended durability</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Paintbrush className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Expert Application</h3>
                    <p className="text-gray-600 text-sm">Meticulous preparation and painting techniques</p>
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
                  src="https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/overview.jpg?updatedAt=1741960872540"
                  alt="Exterior house painting project"
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Exterior Painting Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive exterior painting solutions for every part of your home's exterior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Siding Painting",
                description: "Expert painting for all siding types including vinyl, wood, fiber cement, and aluminum.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/siding.jpg?updatedAt=1741960872540",
              },
              {
                title: "Trim & Fascia",
                description:
                  "Detailed painting of trim, fascia, soffits, and architectural details that frame your home.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/trim.jpg?updatedAt=1741960872540",
              },
              {
                title: "Door & Window Painting",
                description:
                  "Transform entryways and windows with expert painting that enhances curb appeal and protection.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/doors.jpg?updatedAt=1741960872540",
              },
              {
                title: "Deck & Fence Painting",
                description:
                  "Revitalize outdoor living spaces with specialized coatings for decks, fences, and railings.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/deck.jpg?updatedAt=1741960872540",
              },
              {
                title: "Garage Doors & Shutters",
                description:
                  "Refresh and protect garage doors and shutters with durable paints designed for high-use surfaces.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/garage.jpg?updatedAt=1741960872540",
              },
              {
                title: "Stucco & Brick Painting",
                description:
                  "Specialized coatings and techniques for masonry surfaces that allow proper breathability.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/stucco.jpg?updatedAt=1741960872540",
              },
            ]
              .filter((service) => service.image)
              .map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg?height=300&width=400"}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-blue mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Exterior Painting Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow a meticulous process to ensure exceptional results for every exterior painting project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We assess your home's exterior and discuss your goals, preferences, and timeline.",
              },
              {
                step: "2",
                title: "Preparation",
                description: "We thoroughly clean surfaces, repair damage, and protect landscaping and fixtures.",
              },
              {
                step: "3",
                title: "Priming",
                description: "We apply high-quality primers to ensure proper adhesion and coverage.",
              },
              {
                step: "4",
                title: "Painting",
                description: "We use premium paints and expert techniques for flawless application.",
              },
              {
                step: "5",
                title: "Detailing",
                description: "We carefully paint trim, doors, and architectural details with precision.",
              },
              {
                step: "6",
                title: "Inspection",
                description: "We conduct a thorough final inspection and clean up completely.",
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

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Benefits of Professional Exterior Painting</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Investing in professional exterior painting offers numerous advantages for your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Protection & Preservation</h3>
              <ul className="space-y-3">
                {[
                  "Creates a protective barrier against moisture, preventing rot and structural damage",
                  "Shields surfaces from harmful UV rays that cause fading and deterioration",
                  "Prevents insect infestation by sealing small cracks and openings",
                  "Reduces the effects of weather extremes on your home's exterior",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Enhanced Curb Appeal</h3>
              <ul className="space-y-3">
                {[
                  "Dramatically improves your home's appearance and first impression",
                  "Updates the look of your home with modern colors and finishes",
                  "Creates a cohesive exterior design that highlights architectural features",
                  "Makes your home stand out in the neighborhood with a fresh, well-maintained look",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Increased Property Value</h3>
              <ul className="space-y-3">
                {[
                  "Boosts home value with one of the highest ROIs of any home improvement project",
                  "Creates a move-in ready appearance that appeals to potential buyers",
                  "Demonstrates proper home maintenance and care to appraisers and buyers",
                  "Helps your home sell faster and potentially for a higher price",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Early Problem Detection</h3>
              <ul className="space-y-3">
                {[
                  "Identifies underlying issues like rot, mold, or structural problems",
                  "Allows for repairs before small problems become major expenses",
                  "Includes thorough inspection of all exterior surfaces",
                  "Provides an opportunity to address maintenance issues comprehensively",
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our exterior painting services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How often should I paint my home's exterior?",
                answer:
                  "Most homes benefit from repainting every 5-10 years, though this varies based on your climate, sun exposure, and the quality of the previous paint job. Wood surfaces typically need repainting more frequently (5-7 years) than vinyl or fiber cement (7-10 years). We recommend an exterior inspection every 2-3 years to catch issues early.",
              },
              {
                question: "What's the best time of year for exterior painting?",
                answer:
                  "Late spring through early fall is typically ideal for exterior painting, when temperatures are between 50-85°F with moderate humidity. We avoid painting in direct sunlight or when rain is expected within 24-48 hours. In some regions, we can paint year-round by carefully monitoring weather conditions and planning accordingly.",
              },
              {
                question: "How long will my exterior paint job last?",
                answer:
                  "A professional exterior paint job should last 5-10 years, depending on several factors including climate conditions, sun exposure, quality of paint used, surface preparation, and home maintenance. Our premium paints and thorough preparation techniques help maximize the lifespan of your exterior paint.",
              },
              {
                question: "How do you prepare surfaces for exterior painting?",
                answer:
                  "Our preparation process includes power washing to remove dirt and loose paint, scraping and sanding damaged areas, repairing wood rot or other damage, caulking gaps and cracks, priming bare wood and stains, and protecting landscaping and fixtures. This thorough preparation is crucial for a long-lasting, professional finish.",
              },
              {
                question: "How long does it take to paint a house exterior?",
                answer:
                  "The timeline depends on your home's size, condition, and architectural complexity. A typical single-family home takes 3-5 days for preparation and 2-4 days for painting. Larger homes or those requiring extensive repairs may take longer. We'll provide a specific timeline during your consultation.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-6 border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-bold text-brand-blue mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Before & After</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See the difference our exterior painting services can make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dvty0qsht/image/upload/v1745088496/exterior-before_tnbvxr.jpg"
                alt="Before exterior painting"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                Before
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dvty0qsht/image/upload/v1745088496/exterior-after_tnbvxr.jpg"
                alt="After exterior painting"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4 bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                After
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Booking */}
      <ConsultationBooking />
    </main>
  )
}
