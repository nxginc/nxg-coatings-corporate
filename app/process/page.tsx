import type { Metadata } from "next"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { MessageCircle, FileText, Hammer, PaintBucket, CheckSquare, ThumbsUp, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Process | NXG Coatings",
  description:
    "Learn about our proven 6-step process that ensures exceptional results on every painting and coating project.",
}

export default function ProcessPage() {
  const processSteps = [
    {
      id: 1,
      icon: MessageCircle,
      title: "Initial Consultation",
      description:
        "We begin with a thorough consultation to understand your vision, requirements, and timeline. Our experts will assess your property, discuss your goals, and answer any questions.",
      cta: "Schedule consultation",
      link: "https://cal.com/nxgcoatings/virtual-consultation",
    },
    {
      id: 2,
      icon: FileText,
      title: "Detailed Proposal",
      description:
        "Based on our consultation, we provide a comprehensive proposal outlining the scope of work, timeline, materials, and pricing. Our transparent approach ensures you know exactly what to expect.",
      cta: "Request proposal",
      link: "/quote",
    },
    {
      id: 3,
      icon: Hammer,
      title: "Preparation",
      description:
        "Proper preparation is crucial for a lasting finish. Our team will thoroughly clean, repair, and prepare surfaces to ensure optimal adhesion and a flawless final result.",
      cta: "Learn about preparation",
      link: "/blog/importance-of-surface-preparation",
    },
    {
      id: 4,
      icon: PaintBucket,
      title: "Application",
      description:
        "Our skilled technicians apply premium coatings using professional techniques and high-quality materials. We follow manufacturer specifications and industry best practices for optimal results.",
      cta: "View our materials",
      link: "/services",
    },
    {
      id: 5,
      icon: CheckSquare,
      title: "Inspection & Cleanup",
      description:
        "After application, we conduct a thorough inspection to ensure every detail meets our high standards. We then clean up completely, removing all equipment and materials from your property.",
      cta: "Our quality standards",
      link: "/about",
    },
    {
      id: 6,
      icon: ThumbsUp,
      title: "Final Walkthrough",
      description:
        "We conduct a final walkthrough with you to ensure your complete satisfaction. We'll address any concerns and provide maintenance recommendations to help you get the most out of your new coating.",
      cta: "Customer testimonials",
      link: "/testimonials",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Our Professional Process"
        subtitle="From initial consultation to final walkthrough, discover our proven 6-step approach that ensures exceptional results on every coating project."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/Banners/f4_aYaWf2GGw.jpg?updatedAt=1679013239596"
        height="medium"
      >
        <CTAModal
          trigger={
            <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
              Get Free Estimate
            </FancyButton>
          }
        />
      </EnhancedHero>

      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our 6-Step Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive process to ensure exceptional results on every project. Each step is carefully
              designed to deliver the highest quality workmanship and customer satisfaction.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block"></div>

            {processSteps.map((step, index) => (
              <div key={step.id} className="mb-16 last:mb-0">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div
                    className={`w-full md:w-1/2 mb-6 md:mb-0 md:pr-12 ${
                      index % 2 === 0 ? "md:text-right order-1" : "md:pl-12 md:order-3"
                    }`}
                  >
                    <div
                      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${
                        index % 2 === 0 ? "md:ml-auto" : ""
                      }`}
                    >
                      <h3 className="text-2xl font-bold text-brand-blue mb-4">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.description}</p>
                      <Link
                        href={step.link}
                        className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue"
                      >
                        {step.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="order-2 z-10 mb-6 md:mb-0">
                    <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>

                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-12 order-3" : "md:pr-12 md:order-1"}`}>
                    <div className="hidden md:block h-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">The Benefits of Our Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our systematic approach delivers numerous advantages that ensure exceptional results and complete customer
              satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <CheckSquare className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Consistent Quality</h3>
              <p className="text-gray-600">
                Our structured process ensures consistent, high-quality results on every project, regardless of size or
                complexity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MessageCircle className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clear Communication</h3>
              <p className="text-gray-600">
                We maintain open communication throughout the project, keeping you informed and involved at every stage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Detailed Planning</h3>
              <p className="text-gray-600">
                Our thorough planning process anticipates challenges and ensures smooth execution from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact us today to schedule a consultation and experience our professional approach firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAModal
              trigger={
                <FancyButton variant="shine" size="xl" hasArrow={true} rounded="full">
                  Get Free Estimate
                </FancyButton>
              }
            />
            <Link href="/contact">
              <FancyButton
                variant="outline"
                size="xl"
                rounded="full"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Contact Us
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
