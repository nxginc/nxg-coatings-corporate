"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"
import { NXG_SITE } from "@/lib/site-metadata"

// FAQ categories and questions
const faqCategories = [
  {
    id: "general",
    name: "General Questions",
    faqs: [
      {
        question: "How long has NXG Coatings been in business?",
        answer: "NXG Coatings provides painting and coating services throughout the Twin Cities. Contact our team if you would like to discuss a particular project or ask about our experience with a specific scope.",
      },
      {
        question: "Are you licensed and insured?",
        answer: "Requirements vary by project and location. Contact NXG to request current documentation relevant to your project before work is scheduled.",
      },
      {
        question: "What areas do you serve?",
        answer: `NXG serves the Twin Cities, including ${NXG_SITE.serviceAreas.join(", ")}. Contact us to confirm whether your project location is within our service area.`,
      },
      {
        question: "How do I request an estimate?",
        answer: "Use the estimate form to share your project type, location, and scope. The NXG team will review the request and follow up about next steps.",
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
          "NXG offers exterior and interior painting, cabinet refinishing, deck staining, fine finish and millwork painting, color consultation, pressure cleaning, paint restoration, protective coatings, and commercial and industrial coating services.",
      },
      {
        question: "How long will my painting project take?",
        answer:
          "Timing depends on the surfaces, preparation, project size, weather, access, and selected materials. NXG will discuss a project-specific schedule as the scope is reviewed.",
      },
      {
        question: "How are paint and coating products selected?",
        answer: "The appropriate product depends on the substrate, existing finish, exposure, and intended use. Product and finish details should be confirmed in the scope for your project.",
      },
      {
        question: "Do I need to move my furniture for interior painting?",
        answer:
          "Furniture moving and protection are project-specific. Discuss access, fragile items, and which furnishings you can move before the work is scheduled; the agreed preparation plan should identify responsibilities.",
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
          "Cost depends on the project size, surfaces, condition, preparation, access, and selected finish. Request an estimate so the team can review the scope and explain the proposed work and pricing.",
      },
      {
        question: "Will my project require a deposit?",
        answer: "Any deposit, payment schedule, and due dates should be stated in the written project terms. Confirm those details with NXG before accepting a proposal.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "Available payment methods are confirmed with the project terms. Contact NXG if you have a preferred payment method.",
      },
      {
        question: "Do you offer any warranties or guarantees?",
        answer:
          "Warranty coverage depends on the written project terms and the product selected. Review the applicable terms with NXG before approving the work; do not assume a specific duration or coverage applies.",
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
          "Preparation depends on the surface and its condition. The proposed scope should identify the agreed cleaning, repairs, scraping, sanding, and priming before work begins.",
      },
      {
        question: "How do you protect my property during painting?",
        answer:
          "Protection needs vary by room, surface, landscaping, and access. Discuss areas that need protection and how the team will limit disruption when reviewing the project scope.",
      },
      {
        question: "Do you clean up after completing the project?",
        answer:
          "The project plan should identify daily housekeeping, final cleanup, and any items that need special handling. Confirm those expectations with NXG before work starts.",
      },
      {
        question: "How do you handle waste disposal?",
        answer:
          "Disposal requirements depend on the materials and location. Ask NXG how project-specific paint and coating waste will be handled when confirming the scope.",
      },
    ],
  },
]

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("general")

  return (
    <main className="min-h-screen">
      <ParallaxHero
        eyebrow="NXG Coatings / FAQ"
        title="Straight answers for your project."
        description="Find useful details about our painting and coating services, project planning, and preparation."
        image={ASSETS.hero.fallback}
        imageAlt="NXG residential coating project"
        height="medium"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Request an estimate <span aria-hidden="true">↗</span></Link>
      </ParallaxHero>

      {/* FAQ Content */}
      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-12 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-14">
            {/* Category Navigation */}
            <div className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="section-kicker mb-4">Categories</h2>
                <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="FAQ categories">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={activeCategory === category.id}
                      className={`shrink-0 border px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.1em] transition lg:w-full ${
                        activeCategory === category.id ? "border-[var(--nxg-navy)] bg-[var(--nxg-navy)] text-white" : "border-[var(--nxg-line)] text-[var(--nxg-navy)] hover:border-[var(--nxg-red)]"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
            </div>

            {/* FAQ Accordion */}
            <div>
              {faqCategories.map((category) => (
                <div key={category.id} className={activeCategory === category.id ? "block" : "hidden"}>
                  <h2 className="mb-6 text-3xl font-medium text-[var(--nxg-navy)]">{category.name}</h2>

                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={faq.question} value={`item-${index}`} className="border-[var(--nxg-line)]">
                        <AccordionTrigger className="text-left text-sm font-semibold text-[var(--nxg-navy)]">{faq.question}</AccordionTrigger>
                        <AccordionContent className="max-w-3xl text-sm leading-6 text-[var(--nxg-muted)]">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {/* Still Have Questions */}
              <div className="mt-12 border-t border-[var(--nxg-line)] py-7">
                <h3 className="text-xl font-semibold text-[var(--nxg-navy)]">Still have questions?</h3>
                <p className="mt-3 mb-6 max-w-2xl text-sm leading-6 text-[var(--nxg-muted)]">
                  If you couldn't find the answer you're looking for, please don't hesitate to contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="inline-flex min-h-11 items-center border border-[var(--nxg-navy)] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] hover:bg-[var(--nxg-navy)] hover:text-white">Contact NXG</Link>
                  <Link href="/quote" className="inline-flex min-h-11 items-center bg-[var(--nxg-red)] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[var(--nxg-navy)]">Request an estimate</Link>
                </div>
              </div>
            </div>
          </div>
      </section>
    </main>
  )
}
