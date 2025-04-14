"use client"

import Image from "next/image"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import PaintingGallery from "@/components/painting-gallery"

export default function GalleryPageClient() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Our Project Gallery"
        description="Browse our portfolio of completed projects and see the quality and craftsmanship we bring to every job."
        backgroundImage="https://cdn.nxgcoatings.com/banners/gallery-hero.jpg"
        height="medium"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAModal
            trigger={
              <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
                Get Free Estimate
              </FancyButton>
            }
          />
        </div>
      </EnhancedHero>

      {/* Gallery Categories */}
      <PaintingGallery />

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a closer look at some of our most impressive transformations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Project 1 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/before1_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="Before - Colonial Home Exterior"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                    BEFORE
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/after1_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="After - Colonial Home Exterior"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded">
                    AFTER
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail1_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="Detail - Colonial Home Exterior"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail2_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="Detail - Colonial Home Exterior"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Colonial Home Exterior Transformation</h3>
                <p className="text-gray-600 mb-4">
                  This historic colonial home received a complete exterior makeover with premium paint in a classic
                  color scheme that enhanced its architectural details.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-brand-blue/10 text-brand-blue text-sm px-3 py-1 rounded-full">
                    Exterior Painting
                  </span>
                  <span className="bg-brand-blue/10 text-brand-blue text-sm px-3 py-1 rounded-full">Residential</span>
                  <span className="bg-brand-blue/10 text-brand-blue text-sm px-3 py-1 rounded-full">Historical</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/before2_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="Before - Modern Office Interior"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                    BEFORE
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/after2_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="After - Modern Office Interior"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded">
                    AFTER
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail3_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="Detail - Modern Office Interior"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail4_YhGsD2Kl9.jpg?updatedAt=1741312450328"
                    alt="Detail - Modern Office Interior"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Modern Office Interior Renovation</h3>
                <p className="text-gray-600 mb-4">
                  This commercial office space was transformed with a contemporary color palette that created a more
                  productive and inviting work environment.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-brand-blue/10 text-brand-blue text-sm px-3 py-1 rounded-full">
                    Interior Painting
                  </span>
                  <span className="bg-brand-blue/10 text-brand-blue text-sm px-3 py-1 rounded-full">Commercial</span>
                  <span className="bg-brand-blue/10 text-brand-blue text-sm px-3 py-1 rounded-full">Modern</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery/all-projects">
              <FancyButton variant="gradient" size="lg" hasArrow={true} rounded="full">
                View All Projects
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read testimonials from satisfied customers who have experienced our quality workmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "NXG Coatings transformed our home's exterior. The attention to detail and quality of work was
                exceptional. Our house looks brand new!"
              </p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Homeowner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "As a property manager, I've worked with many painting contractors. NXG Coatings stands out for their
                professionalism, reliability, and consistent quality."
              </p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Michael Rodriguez"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-500">Property Manager</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "The color consultation service was invaluable. Their expert helped us choose the perfect palette for
                our office, and the execution was flawless."
              </p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Jennifer Williams"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Jennifer Williams</h4>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact our team today to schedule a consultation and get a free estimate.
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
    </main>
  )
}
