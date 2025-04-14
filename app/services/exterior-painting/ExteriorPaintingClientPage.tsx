"use client"

import Image from "next/image"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import { Shield, Clock, ThumbsUp, Check } from "lucide-react"

export default function ExteriorPaintingClientPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Exterior Painting Services"
        description="Transform and protect your property with our premium exterior painting solutions."
        backgroundImage="https://cdn.nxgcoatings.com/services/exterior-painting-hero.jpg"
        height="large"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAModal
            trigger={
              <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
                Get Free Estimate
              </FancyButton>
            }
          />
          <FancyButton
            variant="outline"
            size="lg"
            rounded="full"
            className="bg-transparent border-white text-white hover:bg-white/10"
            onClick={() => window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")}
          >
            Book Consultation
          </FancyButton>
        </div>
      </EnhancedHero>

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue mb-6">Professional Exterior Painting</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your home's exterior is its first line of defense against the elements. Our professional exterior
                  painting services not only enhance your property's curb appeal but also provide essential protection
                  against weather damage, UV radiation, and wear.
                </p>
                <p>
                  At NXG Coatings, we use premium quality paints and coatings specifically formulated for exterior
                  applications. These products offer superior durability, color retention, and protection compared to
                  standard paints.
                </p>
                <p>
                  Our experienced team follows a meticulous process from thorough preparation to flawless application,
                  ensuring beautiful, long-lasting results that stand up to the harshest conditions.
                </p>
              </div>
              <div className="mt-8">
                <CTAModal
                  trigger={
                    <FancyButton variant="gradient" size="lg" hasArrow={true}>
                      Request a Quote
                    </FancyButton>
                  }
                />
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/exterior2_3WGvHiRuy.jpg?updatedAt=1666774074567"
                  alt="Exterior painting project"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white p-4 rounded-lg shadow-lg">
                <p className="text-xl font-bold">100%</p>
                <p className="text-sm">Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Benefits of Professional Exterior Painting</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Investing in professional exterior painting offers numerous advantages for your property.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enhanced Protection</h3>
              <p className="text-gray-600">
                Quality exterior paint creates a protective barrier against moisture, UV rays, pests, and other
                environmental threats that can damage your home.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <ThumbsUp className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Increased Property Value</h3>
              <p className="text-gray-600">
                A fresh, professional exterior paint job can significantly increase your home's market value and make it
                more attractive to potential buyers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-brand-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Extended Lifespan</h3>
              <p className="text-gray-600">
                Professional application and premium materials ensure your exterior paint job lasts longer, reducing the
                frequency of repainting and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Exterior Painting Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive process to ensure exceptional results on every exterior painting project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Thorough Inspection</h3>
                  <p className="text-gray-600">
                    We begin with a comprehensive inspection of your property's exterior to identify any issues that
                    need to be addressed before painting.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Surface Preparation</h3>
                  <p className="text-gray-600">
                    We clean, scrape, sand, and repair surfaces as needed to create the ideal foundation for the new
                    paint. This crucial step ensures proper adhesion and longevity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Priming</h3>
                  <p className="text-gray-600">
                    We apply high-quality primers specifically chosen for your surface type and condition to ensure
                    maximum paint adhesion and coverage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Paint Application</h3>
                  <p className="text-gray-600">
                    Our skilled painters apply premium exterior paint using professional techniques to ensure even
                    coverage, proper thickness, and a flawless finish.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Final Inspection</h3>
                  <p className="text-gray-600">
                    We conduct a thorough inspection to ensure every detail meets our high standards before considering
                    the project complete.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/process_3WGvHiRuy.jpg?updatedAt=1666774074567"
                  alt="Exterior painting process"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/materials_3WGvHiRuy.jpg?updatedAt=1666774074567"
                  alt="Premium painting materials"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-brand-blue mb-6">Premium Materials</h2>
              <p className="text-gray-700 mb-6">
                We use only the highest quality paints and materials for our exterior painting projects. Our premium
                products offer:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                  <span>Superior weather resistance and durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                  <span>Enhanced color retention and fade resistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                  <span>Mildew and mold resistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                  <span>Excellent adhesion to various exterior surfaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                  <span>Low-VOC and environmentally friendly options</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-700">
                We partner with industry-leading manufacturers to ensure we have access to the best products for every
                specific application and environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our exterior painting services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">How long will my exterior paint job last?</h3>
              <p className="text-gray-700">
                With our premium materials and professional application, you can expect your exterior paint to last 7-10
                years or more, depending on your local climate and conditions. Regular maintenance can extend this
                lifespan even further.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">What's the best time of year for exterior painting?</h3>
              <p className="text-gray-700">
                The ideal conditions for exterior painting are dry days with temperatures between 50-85°F. In most
                regions, late spring through early fall provides the best weather for exterior painting projects.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">How do you prepare surfaces for painting?</h3>
              <p className="text-gray-700">
                Our preparation process includes power washing to remove dirt and debris, scraping and sanding to remove
                loose paint, repairing damaged areas, caulking gaps and cracks, and applying primer where needed. This
                thorough preparation ensures optimal paint adhesion and longevity.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Do you offer color consultation services?</h3>
              <p className="text-gray-700">
                Yes! Our professional color consultants can help you select the perfect colors for your home's exterior,
                considering architectural style, neighborhood context, and your personal preferences. We can provide
                color samples and digital visualizations to help you make confident decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Home's Exterior?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact our team today to schedule a consultation and get a free estimate for your exterior painting
            project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Related Services</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/interiorpainting_OwFKqI2BC.jpg?updatedAt=1666774074618"
                  alt="Interior Painting"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-xl font-bold p-6 text-white">Interior Painting</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Transform your living spaces with our premium interior painting services.
                </p>
                <Link href="/services/interior-painting">
                  <FancyButton variant="link" hasArrow={true} className="p-0">
                    Learn More
                  </FancyButton>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/DeckStaining_MN_a3mceDUkH.png?updatedAt=1666951996630"
                  alt="Deck Staining"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-xl font-bold p-6 text-white">Deck Staining</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Protect and beautify your outdoor living spaces with our professional deck staining services.
                </p>
                <Link href="/services/deck-staining">
                  <FancyButton variant="link" hasArrow={true} className="p-0">
                    Learn More
                  </FancyButton>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/Services/ColorConsultation1_fvLQ6GTgU.jpg?updatedAt=1676855833330"
                  alt="Color Consultation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-xl font-bold p-6 text-white">Color Consultation</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Get expert advice on choosing the perfect colors for your home or business.
                </p>
                <Link href="/services/color-consultation">
                  <FancyButton variant="link" hasArrow={true} className="p-0">
                    Learn More
                  </FancyButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
