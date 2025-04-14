import type { Metadata } from "next"
import { CalendarBooking } from "@/components/calendar-booking"
import { Mail, Phone, MapPin } from "lucide-react"
import EnhancedHero from "@/components/enhanced-hero"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | NXG Coatings",
  description: "Get in touch with NXG Coatings for a free estimate or consultation.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Contact Us"
        description="Get in touch with our team for a free estimate or to schedule a consultation."
        backgroundImage="https://cdn.nxgcoatings.com/banners/contact-hero.jpg"
        height="medium"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Request a Free Estimate</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you with a detailed quote for your project.
              </p>

              <div className="bg-white rounded-xl shadow-md p-6">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Schedule a Consultation</h2>
              <p className="text-gray-600 mb-8">
                Choose a time that works for you to speak with one of our coating specialists.
              </p>

              <div className="bg-white rounded-xl shadow-md p-6">
                <CalendarBooking />
              </div>

              <div className="mt-12 space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-brand-blue mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:info@nxgcoatingsinc.com" className="text-brand-blue hover:underline">
                      info@nxgcoatingsinc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-brand-blue mt-1" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href="tel:+19529004222" className="text-brand-blue hover:underline">
                      (952) 900-4222
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-brand-blue mt-1" />
                  <div>
                    <h4 className="font-medium">Office</h4>
                    <address className="not-italic">
                      5200 Willson Blvd
                      <br />
                      Suite 150
                      <br />
                      Edina, MN 55424
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
