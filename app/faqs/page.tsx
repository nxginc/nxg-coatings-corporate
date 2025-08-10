"use client"

import { useState } from "react"
import Image from "next/image"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import EnhancedHero from "@/components/enhanced-hero"
import Link from "next/link"

// FAQ categories and questions
const faqCategories = [
  {
    id: "general",
    name: "General Questions",
    faqs: [
      {
        question: "How long has NXG Coatings been in business?",
        answer:
          "NXG Coatings has been providing professional painting and coating services since 2010. With over a decade of experience, we've built a reputation for quality workmanship and exceptional customer service.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, NXG Coatings is fully licensed and insured. We carry comprehensive liability insurance and workers' compensation coverage to protect both our clients and our team members.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "We primarily serve the Minneapolis-St. Paul metropolitan area and surrounding suburbs. Please contact us to confirm if we service your specific location.",
      },
      {
        question: "Do you offer free estimates?",
        answer:
          "Yes, we provide free, no-obligation estimates for all projects. You can request an estimate through our website, by phone, or by email.",
      },
    ],
  },
  {
    id: "services",
    name: "Services & Process",
    faqs: [
      {
        question: "What services do you offer?",
        answer:
          "We offer a comprehensive range of painting and coating services including exterior painting, interior painting, deck staining, cabinet refinishing, color consultation, commercial painting, and specialty finishes.",
      },
      {
        question: "How long will my painting project take?",
        answer:
          "Project timelines vary depending on the scope of work, weather conditions (for exterior projects), and other factors. A typical residential exterior might take 3-5 days, while interior projects can range from 2-7 days. We'll provide you with a specific timeline during your consultation.",
      },
      {
        question: "What brands of paint do you use?",
        answer:
          "We use premium paints and coatings from trusted manufacturers like Sherwin-Williams, Benjamin Moore, and PPG. We select products based on their durability, performance, and suitability for your specific project needs.",
      },
      {
        question: "Do I need to move my furniture for interior painting?",
        answer:
          "Our team will move furniture to the center of the room and cover it with protective plastic. For larger pieces that cannot be moved, we'll work around them and ensure they're properly protected. We recommend removing small items, valuables, and fragile objects before we begin.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing & Payment",
    faqs: [
      {
        question: "How do you determine the cost of a project?",
        answer:
          "Project costs are determined by several factors including the size of the area to be painted, surface conditions, level of preparation required, type of paint or coating selected, and complexity of the job. We provide detailed, transparent estimates that break down all costs.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "Yes, we typically require a 25% deposit to secure your place in our schedule. The remaining balance is due upon completion of the project and your satisfaction with the work.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept checks, credit cards, and electronic payments for your convenience.",
      },
      {
        question: "Do you offer any warranties or guarantees?",
        answer:
          "Yes, we stand behind our work with a 2-year warranty on labor. Additionally, the paint and coating products we use come with manufacturer warranties ranging from 5-25 years depending on the product.",
      },
    ],
  },
  {
    id: "preparation",
    name: "Preparation & Cleanup",
    faqs: [
      {
        question: "How do you prepare surfaces before painting?",
        answer:
          "Our preparation process includes cleaning, scraping, sanding, patching, and priming as needed. Proper preparation is crucial for a lasting finish, and we never cut corners on this important step.",
      },
      {
        question: "How do you protect my property during painting?",
        answer:
          "We use drop cloths, plastic sheeting, and painter's tape to protect floors, furniture, fixtures, and landscaping. Our team takes great care to minimize disruption and prevent damage to your property.",
      },
      {
        question: "Do you clean up after completing the project?",
        answer:
          "Absolutely. We perform a thorough cleanup at the end of each day and a final cleanup upon project completion. We remove all materials, tools, and debris, leaving your space clean and ready to enjoy.",
      },
      {
        question: "How do you handle waste disposal?",
        answer:
          "We responsibly dispose of all waste materials in accordance with local regulations. We're committed to environmentally friendly practices and proper handling of paint and related materials.",
      },
    ],
  },
]

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("general")

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our professional coating services, process, and more."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
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

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Navigation */}
            <div className="lg:w-1/4">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <nav className="space-y-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeCategory === category.id ? "bg-brand-blue text-white" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="lg:w-3/4">
              {faqCategories.map((category) => (
                <div key={category.id} className={activeCategory === category.id ? "block" : "hidden"}>
                  <h2 className="text-3xl font-bold text-brand-blue mb-8">{category.name}</h2>

                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-medium text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {/* Still Have Questions */}
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-gray-600 mb-6">
                  If you couldn't find the answer you're looking for, please don't hesitate to contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <FancyButton variant="gradient" hasArrow={true} rounded="full">
                      Contact Us
                    </FancyButton>
                  </Link>
                  <CTAModal
                    trigger={
                      <FancyButton variant="outline" rounded="full">
                        Get Free Estimate
                      </FancyButton>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
