"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Image from "next/image"
import { CheckCircle, Palette, Home, Eye, Lightbulb, Sparkles } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function ColorConsultationPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Professional Color Consultation"
        description="Find the perfect colors for your home with our expert color consultation services."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/hero.jpg?updatedAt=1741960872540"
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
                <Palette className="h-5 w-5 mr-2" />
                <span>Expert Color Guidance</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">Find Your Perfect Color Palette</h2>
              <p className="text-gray-600 mb-6">
                Choosing the right colors for your home can be overwhelming. With thousands of options available,
                finding the perfect palette that reflects your style and complements your space requires expertise and a
                trained eye.
              </p>
              <p className="text-gray-600 mb-8">
                Our professional color consultation service takes the guesswork out of color selection. Our certified
                color consultants will guide you through the process, helping you select colors that enhance your home's
                architecture, coordinate with existing elements, and create the atmosphere you desire.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Eye className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Expert Guidance</h3>
                    <p className="text-gray-600 text-sm">Professional advice from certified consultants</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Home className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Personalized Solutions</h3>
                    <p className="text-gray-600 text-sm">Colors tailored to your home and preferences</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Lightbulb className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Confidence in Choices</h3>
                    <p className="text-gray-600 text-sm">Eliminate guesswork and color selection stress</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Sparkles className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Enhanced Results</h3>
                    <p className="text-gray-600 text-sm">Achieve a cohesive, professional look</p>
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
                  src="https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/overview.jpg?updatedAt=1741960872540"
                  alt="Color consultation session"
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
                    "The color consultation was invaluable! Our consultant helped us find the perfect palette that
                    transformed our home and received countless compliments."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Customer"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Emily Richardson</p>
                    <p className="text-xs text-gray-500">Homeowner</p>
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Color Consultation Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive color consultation services to help you find the perfect palette for your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Interior Color Consultation",
                description:
                  "Expert guidance for selecting interior paint colors that create the perfect atmosphere for each room.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/interior.jpg?updatedAt=1741960872540",
              },
              {
                title: "Exterior Color Consultation",
                description:
                  "Professional advice on exterior color schemes that enhance curb appeal and complement architectural features.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/exterior.jpg?updatedAt=1741960872540",
              },
              {
                title: "Whole Home Color Planning",
                description:
                  "Comprehensive color strategies that create a cohesive flow throughout your entire home, inside and out.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/whole-home.jpg?updatedAt=1741960872540",
              },
              {
                title: "Color Matching Services",
                description:
                  "Precise color matching for existing paints, fabrics, or specific colors you want to incorporate.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/matching.jpg?updatedAt=1741960872540",
              },
              {
                title: "Virtual Color Visualization",
                description:
                  "Digital visualization tools that show how different colors will look in your actual space before painting.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/virtual.jpg?updatedAt=1741960872540",
              },
              {
                title: "Color Trend Guidance",
                description:
                  "Insights on current color trends and timeless options that will keep your home looking fresh for years.",
                image:
                  "https://ik.imagekit.io/j98e6hcfnkn/services/color-consultation/trends.jpg?updatedAt=1741960872540",
              },
            ].map((service, index) => (
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Color Consultation Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow a structured process to help you discover the perfect colors for your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "We discuss your preferences, style, existing elements, and goals for your color scheme.",
              },
              {
                step: "2",
                title: "Site Assessment",
                description: "We evaluate your space, lighting conditions, fixed elements, and architectural features.",
              },
              {
                step: "3",
                title: "Color Selection",
                description:
                  "We present curated color options and samples based on your preferences and our assessment.",
              },
              {
                step: "4",
                title: "Final Recommendations",
                description:
                  "We provide a detailed color plan with specific paint colors, finishes, and placement guidance.",
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Benefits of Professional Color Consultation</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Working with a professional color consultant offers numerous advantages for your painting project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Expert Knowledge</h3>
              <ul className="space-y-3">
                {[
                  "Access to trained professionals with color theory expertise",
                  "Understanding of how light affects color in different spaces",
                  "Knowledge of color psychology and emotional impacts",
                  "Awareness of current trends and timeless color combinations",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Time and Money Savings</h3>
              <ul className="space-y-3">
                {[
                  "Avoid costly color mistakes and repainting",
                  "Eliminate the need for multiple sample cans and test patches",
                  "Reduce decision fatigue from overwhelming color options",
                  "Streamline the selection process with curated choices",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Personalized Results</h3>
              <ul className="space-y-3">
                {[
                  "Colors selected specifically for your home's architecture",
                  "Schemes that complement your existing furnishings and fixtures",
                  "Solutions tailored to your personal style and preferences",
                  "Recommendations that consider the unique lighting in your space",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Enhanced Results</h3>
              <ul className="space-y-3">
                {[
                  "Achieve a cohesive, professionally designed look",
                  "Highlight architectural features and minimize flaws",
                  "Create the desired atmosphere and emotional response",
                  "Increase your home's appeal and potential value",
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
              Find answers to common questions about our color consultation services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What happens during a color consultation?",
                answer:
                  "During a color consultation, our expert will discuss your preferences, style, and goals. We'll assess your space, considering factors like lighting, fixed elements (flooring, countertops, etc.), and architectural features. We'll then present curated color options tailored to your needs, provide samples to view in your space, and finalize a comprehensive color plan with specific paint colors and placement recommendations.",
              },
              {
                question: "How long does a color consultation take?",
                answer:
                  "A typical color consultation takes 1-2 hours for a few rooms, or 2-3 hours for a whole home. The exact time depends on the size of your home and the complexity of your project. Virtual consultations are generally shorter. After the consultation, we'll provide your final color recommendations within 2-3 business days.",
              },
              {
                question: "Do I need to prepare anything for my color consultation?",
                answer:
                  "To make the most of your consultation, gather inspiration images that reflect styles you like, make note of any existing elements that must be considered (furniture, flooring, etc.), and think about the mood you want to create in each space. If you have specific colors in mind, have samples ready. For virtual consultations, we'll ask you to send photos of your space in advance.",
              },
              {
                question: "Can you help me choose colors that coordinate with existing elements?",
                answer:
                  "One of the primary benefits of our color consultation service is helping you select colors that coordinate with existing elements you can't or don't want to change. We'll consider your flooring, countertops, cabinetry, furniture, artwork, and architectural features to create a cohesive color scheme that enhances these elements rather than competing with them.",
              },
              {
                question: "Do you offer virtual color consultations?",
                answer:
                  "Yes, we offer virtual color consultations for clients who prefer remote assistance. Through video conferencing, we can assess your space, discuss your preferences, and provide color recommendations. You'll need to share photos or video of your space in advance, and we may ask you to show us certain elements during the consultation. Virtual consultations are convenient and just as effective as in-person meetings.",
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
