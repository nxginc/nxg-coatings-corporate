import type { Metadata } from "next"
import EnhancedHero from "@/components/enhanced-hero"
import { MultiStepForm } from "@/components/multi-step-form"

export const metadata: Metadata = {
  title: "Get a Free Quote | NXG Coatings",
  description: "Request a free, no-obligation quote for your painting or coating project.",
}

export default function QuotePage() {
  return (
    <main className="min-h-screen">
      <EnhancedHero
        title="Get Your Free Quote"
        subtitle="Ready to transform your property? Fill out our form below to receive a detailed, no-obligation estimate for your coating project."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
        height="medium"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Request Your Free Estimate</h2>
              <p className="text-gray-600 mb-8 text-center">
                Complete this form and our team will get back to you with a detailed quote for your project.
              </p>
              <MultiStepForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
