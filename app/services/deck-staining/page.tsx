"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Droplets, Shield, Clock, Sun, Paintbrush } from "lucide-react"
import ConsultationBooking from "@/components/consultation-booking"

export default function DeckStainingPage() {
  return (
              <ul className="space-y-3">
                {[
                  "Shields wood from harmful UV rays that cause fading and deterioration",
                  "Creates a water-resistant barrier to prevent moisture damage",
                  "Reduces the risk of warping, cracking, and splintering",
                  "Prevents mold and mildew growth that can damage wood",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
                restoration, our expert team delivers exceptional results that stand the test of time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Weather Protection</h3>
                    <p className="text-gray-600 text-sm">Guards against moisture, UV rays, and mildew</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Sun className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Enhanced Appearance</h3>
                    <p className="text-gray-600 text-sm">Brings out the natural beauty of wood</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Extended Lifespan</h3>
                    <p className="text-gray-600 text-sm">Prevents premature aging and deterioration</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                    <Paintbrush className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Custom Finishes</h3>
                    <p className="text-gray-600 text-sm">Multiple stain options to match your style</p>
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
                  src="https://ik.imagekit.io/j98e6hcfnkn/featured/deck-staining/4_WI2HGCsBC.jpg?updatedAt=1681571779303"
                  alt="Freshly stained wooden deck"
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
                    Professional deck staining and sealing services to protect and enhance your outdoor living space.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-blue mr-2 flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Weather Protection</p>
                    <p className="text-xs text-gray-500">Professional Staining</p>
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
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-medium mb-6">
                    <Droplets className="h-5 w-5 mr-2" />
                    <span>Outdoor Protection</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                    Extend the Life and Beauty of Your Deck
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your deck is an extension of your home—a place for relaxation, entertainment, and enjoying the outdoors. Our professional deck staining services help protect this valuable investment from the elements while enhancing its natural beauty.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Whether you have a brand new deck that needs its first protective coat or an older deck that requires restoration, our expert team delivers exceptional results that stand the test of time.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                        <Shield className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Weather Protection</h3>
                        <p className="text-gray-600 text-sm">Guards against moisture, UV rays, and mildew</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                        <Sun className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Enhanced Appearance</h3>
                        <p className="text-gray-600 text-sm">Brings out the natural beauty of wood</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                        <Clock className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Extended Lifespan</h3>
                        <p className="text-gray-600 text-sm">Prevents premature aging and deterioration</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-blue/10 rounded-full p-2 mr-4">
                        <Paintbrush className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Custom Finishes</h3>
                        <p className="text-gray-600 text-sm">Multiple stain options to match your style</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
              "Brings out the natural beauty of wood",
              "Prevents premature aging and deterioration",
              "Multiple stain options to match your style",
            ].map((item) => (
              <li key={item} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Link href="/process">
              <FancyButton variant="outline" size="lg">
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
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Benefits of Professional Deck Staining</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Investing in professional deck staining offers numerous advantages for your outdoor living spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Protection from the Elements</h3>
              <ul className="space-y-3">
                {[
                  "Shields wood from harmful UV rays that cause fading and deterioration",
                  "Creates a water-resistant barrier to prevent moisture damage",
                  "Reduces the risk of warping, cracking, and splintering",
                  "Prevents mold and mildew growth that can damage wood",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Add other benefit cards here, each with their own <ul> and .map as needed */}

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-brand-blue mb-4">Professional Results</h3>
              <ul className="space-y-3">
                {[
                  "Expert application techniques ensure even coverage and proper absorption",
                  "Thorough preparation prevents common DIY issues and failures",
                  "High-quality products selected for your specific wood type and conditions",
                  "Time-saving solution that delivers superior, long-lasting results",
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
              Find answers to common questions about our deck staining services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How often should I stain my deck?",
                answer:
                  "Most decks benefit from restaining every 2-3 years, though this can vary based on your climate, sun exposure, foot traffic, and the type of stain used. Transparent stains typically need more frequent application (every 1-2 years) than solid stains (every 3-5 years). We recommend annual inspections to determine when restaining is needed.",
              },
              {
                question: "What's the best time of year to stain a deck?",
                answer:
                  "Late spring and early fall are ideal times for deck staining, when temperatures are moderate (between 50-85°F) and humidity is low. Avoid staining in direct sunlight or when rain is expected within 24-48 hours. We monitor weather forecasts carefully to schedule your project during optimal conditions.",
              },
              {
                question: "How long does it take to stain a deck?",
                answer:
                  "The timeline depends on your deck's size and condition. A typical deck staining project takes 2-3 days: 1 day for cleaning and preparation, 1 day for staining, and potentially 1 day for drying and inspection. Larger decks or those requiring extensive repairs may take longer.",
              },
              {
                question: "Can you stain over an existing finish?",
                answer:
                  "In most cases, the existing finish needs to be removed for best results. During our inspection, we'll determine whether your deck needs stripping or if we can apply a new coat over the existing finish. Proper preparation is crucial for adhesion and longevity of the new stain.",
              },
              {
                question: "How long before we can use the deck after staining?",
                answer:
                  "Light foot traffic is typically possible after 24-48 hours, but we recommend waiting 72 hours before replacing furniture. Full curing takes about 7 days, during which you should avoid dragging furniture or exposing the deck to heavy use. We'll provide specific timeline recommendations based on the products used and weather conditions.",
              },
            ].map((faq) => (
              <div key={faq.question} className="mb-6 border-b border-gray-200 pb-6 last:border-0">
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
