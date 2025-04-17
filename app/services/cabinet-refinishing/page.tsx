"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Image from "next/image"
import { Paintbrush, Clock, Palette, Sparkles, Home } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function CabinetRefinishingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Cabinet Refinishing Services"
        description="Transform your kitchen and bathroom cabinets with our professional refinishing services—a cost-effective alternative to full replacement."
        backgroundImage="https://cdn.nxgcoatings.com/services/cabinet-refinishing/hero.jpg"
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
                <Paintbrush className="h-5 w-5 mr-2" />
                <span>Kitchen Transformation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                Renew Your Cabinets Without Replacement
              </h2>
              <p className="text-gray-600 mb-6">
                Cabinet refinishing offers a dramatic transformation at a fraction of the cost of replacement. Our
                professional refinishing services breathe new life into your existing cabinets with premium coatings and
                expert craftsmanship.
              </p>
              <p className="text-gray-600 mb-8">
                Whether you're updating an outdated kitchen, refreshing bathroom vanities, or changing the look of
                built-ins, our cabinet refinishing services deliver beautiful, durable results that will stand the test
                of time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Sparkles className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Cost-Effective</h3>
                    <p className="text-gray-600 text-sm">Save 50-70% compared to replacement</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Quick Turnaround</h3>
                    <p className="text-gray-600 text-sm">Completed in days, not weeks</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Palette className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Custom Colors</h3>
                    <p className="text-gray-600 text-sm">Unlimited color options to match your style</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Home className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Less Disruption</h3>
                    <p className="text-gray-600 text-sm">Minimal impact on your daily routine</p>
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
                  src="https://cdn.nxgcoatings.com/services/cabinet-refinishing/kitchen-cabinets.jpg"
                  alt="Cabinet refinishing project - kitchen"
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Cabinet Refinishing Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive cabinet refinishing solutions for every area of your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Kitchen Cabinets",
                description:
                  "Transform your kitchen with beautifully refinished cabinets in your choice of color and finish.",
                image: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/kitchen.jpg",
              },
              {
                title: "Bathroom Vanities",
                description:
                  "Update bathroom cabinets with moisture-resistant finishes designed for high-humidity environments.",
                image: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/bathroom.jpg",
              },
              {
                title: "Built-In Cabinetry",
                description:
                  "Refresh entertainment centers, bookcases, and other built-ins to match your updated décor.",
                image: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/built-in.jpg",
              },
              {
                title: "Cabinet Color Changes",
                description:
                  "Completely change your cabinet color from dark to light, light to dark, or any custom color.",
                image: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/color-change.jpg",
              },
              {
                title: "Glazing & Distressing",
                description: "Add character with decorative glazing or distressed finishes for a unique, custom look.",
                image: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/glazing.jpg",
              },
              {
                title: "Hardware Replacement",
                description: "Complete your cabinet transformation with updated knobs, pulls, and hinges.",
                image: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/hardware.jpg",
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Cabinet Refinishing Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow a meticulous process to ensure exceptional results for every cabinet refinishing project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We assess your cabinets and discuss your vision, color preferences, and finish options.",
              },
              {
                step: "2",
                title: "Preparation",
                description: "We remove doors and hardware, clean surfaces thoroughly, and repair any damage.",
              },
              {
                step: "3",
                title: "Priming",
                description: "We apply specialized bonding primers to ensure proper adhesion to the cabinet surfaces.",
              },
              {
                step: "4",
                title: "Painting",
                description: "We apply multiple coats of premium cabinet paint using professional spray equipment.",
              },
              {
                step: "5",
                title: "Reassembly",
                description: "We reinstall doors, drawers, and hardware, then conduct a final quality inspection.",
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

      {/* Before & After Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Before & After Transformations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See the dramatic difference our cabinet refinishing services can make in these real project examples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Traditional Oak to Modern White",
                description:
                  "This kitchen transformation took dated oak cabinets to a bright, contemporary white finish.",
                before: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/before-1.jpg",
                after: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/after-1.jpg",
              },
              {
                title: "Dark Cherry to Light Gray",
                description:
                  "These dark cherry cabinets were transformed with a trendy light gray finish for a fresh look.",
                before: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/before-2.jpg",
                after: "https://cdn.nxgcoatings.com/services/cabinet-refinishing/after-2.jpg",
              },
            ].map((example, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-blue mb-2">{example.title}</h3>
                  <p className="text-gray-600 mb-4">{example.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-center font-bold mb-2">Before</p>
                    <Image
                      src={example.before || "/placeholder.svg?height=300&width=400"}
                      alt={`Before - ${example.title}`}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-center font-bold mb-2">After</p>
                    <Image
                      src={example.after || "/placeholder.svg?height=300&width=400"}
                      alt={`After - ${example.title}`}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our cabinet refinishing services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How long does cabinet refinishing take?",
                answer:
                  "Most kitchen cabinet refinishing projects take 5-7 days from start to finish. Bathroom vanities and smaller projects may be completed in 2-3 days. The timeline depends on the number of cabinets, the condition of the existing cabinets, and the complexity of the finish.",
              },
              {
                question: "Can I use my kitchen during the refinishing process?",
                answer:
                  "You'll have limited access to your kitchen during the project. Cabinet doors and drawers are removed and refinished in our controlled spray environment, while cabinet frames are refinished on-site. You'll be able to use your appliances, but storage access will be limited.",
              },
              {
                question: "What types of cabinets can be refinished?",
                answer:
                  "Most wood, wood veneer, and MDF cabinets can be successfully refinished. Laminate cabinets may require special primers or techniques. During our consultation, we'll assess your cabinets to determine if refinishing is the right solution.",
              },
              {
                question: "How durable is the finish on refinished cabinets?",
                answer:
                  "We use specialized cabinet coatings that are designed for high-use surfaces. These finishes are highly durable, resistant to chipping and scratching, and can be cleaned with normal household cleaners. With proper care, refinished cabinets can last many years.",
              },
              {
                question: "Can you change my cabinet door style?",
                answer:
                  "Yes, we can replace your cabinet doors and drawer fronts with new ones in a different style while refinishing the frames. This option costs more than standard refinishing but still less than full cabinet replacement.",
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
