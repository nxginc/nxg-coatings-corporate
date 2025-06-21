"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Droplet, Clock, Palette, Shield, Home } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function InteriorPaintingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Interior Painting Services"
        description="Transform your living spaces with our premium interior painting services that combine quality, craftsmanship, and attention to detail."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/portfolio/interior/cg2interior/c2interior0_WVVPL6JB6.jpg?updatedAt=1666795159879"
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
                <span>Interior Excellence</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">Elevate Your Interior Spaces</h2>
              <p className="text-gray-600 mb-6">
                Your home's interior is where you live, relax, and create memories. Our interior painting services are
                designed to transform these spaces with premium paints, expert application, and meticulous attention to
                detail.
              </p>
              <p className="text-gray-600 mb-8">
                Whether you're refreshing a single room or repainting your entire home, our team delivers exceptional
                results that enhance your living environment while protecting your investment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Palette className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Premium Finishes</h3>
                    <p className="text-gray-600 text-sm">Flawless application with superior paints</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Low-VOC Options</h3>
                    <p className="text-gray-600 text-sm">Healthier choices for your indoor air quality</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Efficient Process</h3>
                    <p className="text-gray-600 text-sm">Minimal disruption to your daily routine</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Droplet className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Color Expertise</h3>
                    <p className="text-gray-600 text-sm">Professional guidance for perfect color selection</p>
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
                  src="https://ik.imagekit.io/j98e6hcfnkn/Banners/Interiorpainting_MN_5EW8oTEyHx?updatedAt=1666951441694"
                  alt="Interior painting project - living room"
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Interior Painting Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive interior painting solutions to transform every room in your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Living Areas",
                description:
                  "Create inviting living rooms, family rooms, and entertainment spaces with perfect color schemes.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/Banners/Interiorpainting_MN_5EW8oTEyHx?updatedAt=1666951441694",
              },
              {
                title: "Kitchens & Bathrooms",
                description:
                  "Specialized moisture-resistant paints for high-humidity areas that stand up to daily use.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/Banners/CabinetRefinishing_MN_8WVfe1ZqR.jpg?updatedAt=1666950615602",
              },
              {
                title: "Bedrooms",
                description: "Transform bedrooms into peaceful retreats with soothing colors and perfect finishes.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/portfolio/interior/edina_interior/IMG_5293_CsM7Otvqv.jpg?updatedAt=1666794094502",
              },
              {
                title: "Ceilings & Trim",
                description: "Expert painting of ceilings, crown molding, baseboards, and other architectural details.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/portfolio/interior/Ceiling_Paint_Edina/IMG_5300_f8yw8tkj0.jpg?updatedAt=1682690019878",
              },
              {
                title: "Accent Walls",
                description: "Create visual interest with bold accent walls that become the focal point of your room.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/portfolio/interior/carole_interior/IMG_0158_OrHXMg23M.jpg?updatedAt=1666794187821",
              },
              {
                title: "Fine Finishes & Millwork Painting",
                description:
                  "Add elegance and character to your home with our fine finishes and millwork painting.",
                image: "https://ik.imagekit.io/j98e6hcfnkn/Banners/finefinishes_BOJLvbsTP.jpg?updatedAt=1666774120425",
              },
            ]
              .filter((service) => !service.image?.includes("placeholder.svg"))
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Interior Painting Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow a meticulous process to ensure exceptional results for every interior project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We discuss your vision, preferences, and requirements to understand your goals.",
              },
              {
                step: "2",
                title: "Preparation",
                description: "We protect your furniture and floors, repair surfaces, and prepare walls for painting.",
              },
              {
                step: "3",
                title: "Priming",
                description: "When needed, we apply primer to ensure proper adhesion and superior finish.",
              },
              {
                step: "4",
                title: "Painting",
                description: "Our skilled painters apply premium paints with meticulous attention to detail.",
              },
              {
                step: "5",
                title: "Inspection",
                description: "We conduct a thorough inspection and clean up completely before final walkthrough.",
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Benefits of Professional Interior Painting</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Investing in professional interior painting services offers numerous advantages for your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Enhanced Living Environment</h3>
              <ul className="space-y-3">
                {[
                  "Create a fresh, clean atmosphere throughout your home",
                  "Establish the perfect mood with expert color selection",
                  "Improve lighting efficiency with reflective paint options",
                  "Reduce allergens with washable, dust-resistant finishes",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Property Value</h3>
              <ul className="space-y-3">
                {[
                  "Increase your home's market value with updated interiors",
                  "Create a move-in ready appearance for potential buyers",
                  "Address wear and tear that detracts from home value",
                  "Modernize dated spaces with contemporary color schemes",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Surface Protection</h3>
              <ul className="space-y-3">
                {[
                  "Shield walls from moisture, stains, and everyday wear",
                  "Prevent damage to drywall and underlying structures",
                  "Extend the lifespan of your interior surfaces",
                  "Create washable surfaces that maintain their appearance",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Professional Results</h3>
              <ul className="space-y-3">
                {[
                  "Achieve flawless finishes that DIY projects can't match",
                  "Benefit from proper surface preparation techniques",
                  "Enjoy precise cutting-in and trim work",
                  "Get longer-lasting results with professional application",
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
              Find answers to common questions about our interior painting services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How long does interior painting typically take?",
                answer:
                  "The timeline depends on the size of your project and the number of rooms being painted. A single room can often be completed in 1-2 days, while a whole house might take 3-7 days. During your consultation, we'll provide a specific timeline for your project.",
              },
              {
                question: "Do I need to move out during interior painting?",
                answer:
                  "No, most clients remain in their homes during painting. We work room by room to minimize disruption, and our low-VOC paints reduce odors. We'll create a schedule that works around your daily routine.",
              },
              {
                question: "How do I choose the right colors for my home?",
                answer:
                  "Our color consultation service helps you select the perfect colors for your space. We consider your existing décor, lighting conditions, room function, and personal preferences to recommend colors that will enhance your home.",
              },
              {
                question: "What type of paint do you use for interior projects?",
                answer:
                  "We use premium paints from trusted manufacturers that offer excellent coverage, durability, and washability. We select the appropriate finish for each area—flat, eggshell, satin, semi-gloss, or high-gloss—based on the room's function and your preferences.",
              },
              {
                question: "How do you protect my furniture and belongings?",
                answer:
                  "We take extensive precautions to protect your home. Furniture is either moved or covered with plastic sheeting. Floors are protected with drop cloths, and fixtures are carefully masked. Our goal is to leave your home exactly as we found it, just with beautiful new paint.",
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

      {/* Consultation Booking */}
      <ConsultationBooking />
    </main>
  )
}
