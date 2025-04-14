import type { Metadata } from "next"
import EnhancedHero from "@/components/enhanced-hero"
import { CalendarBooking } from "@/components/calendar-booking"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { Check, Calendar, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Schedule Service | NXG Coatings",
  description: "Book your painting or coating service with our professional team.",
}

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <EnhancedHero
        title="Schedule Your Service"
        description="Book a consultation or service appointment with our professional team"
        backgroundImage="https://cdn.nxgcoatings.com/banners/schedule-hero.jpg"
        height="medium"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Book a Consultation</h2>
                <p className="text-gray-600 mb-8">
                  Choose a time that works for you to speak with one of our coating specialists about your project.
                </p>
                <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                  <CalendarBooking />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Request an Estimate</h2>
                <p className="text-gray-600 mb-8">
                  Fill out our detailed form to receive a comprehensive quote for your project.
                </p>
                <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-blue rounded-full p-2 flex-shrink-0">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Detailed Assessment</h3>
                        <p className="text-gray-600">Get a comprehensive evaluation of your project needs</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-brand-blue rounded-full p-2 flex-shrink-0">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Transparent Pricing</h3>
                        <p className="text-gray-600">Receive a clear breakdown of costs with no hidden fees</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-brand-blue rounded-full p-2 flex-shrink-0">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">No Obligation</h3>
                        <p className="text-gray-600">Our estimates are free and come with no pressure to commit</p>
                      </div>
                    </div>

                    <CTAModal
                      trigger={
                        <FancyButton variant="gradient" size="lg" hasArrow={true} className="w-full mt-4">
                          Request Free Estimate
                        </FancyButton>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-gray-50 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Need Immediate Assistance?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="bg-brand-blue rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-4">Speak directly with our team</p>
                  <a href="tel:+19529004222" className="text-xl font-bold text-brand-blue hover:underline">
                    (952) 900-4222
                  </a>
                </div>

                <div className="text-center">
                  <div className="bg-brand-blue rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-4">Send us your project details</p>
                  <a
                    href="mailto:info@nxgcoatingsinc.com"
                    className="text-xl font-bold text-brand-blue hover:underline"
                  >
                    info@nxgcoatingsinc.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
