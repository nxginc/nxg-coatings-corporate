<<<<<<< Updated upstream
=======
export const metadata = {
  title: "Project Gallery | NXG Coatings",
  description: "Browse our portfolio of completed painting and coating projects. See the quality and craftsmanship NXG Coatings brings to every job.",
  openGraph: {
    title: "Project Gallery | NXG Coatings",
    description: "Browse our portfolio of completed painting and coating projects. See the quality and craftsmanship NXG Coatings brings to every job.",
    url: "https://nxgcoatings.com/gallery",
    images: [
      {
>>>>>>> Stashed changes
"use client"

import Image from "next/image"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import PaintingGallery from "@/components/painting-gallery"
<<<<<<< Updated upstream
=======

// Metadata helper for the gallery page
export const galleryMetadata = {
  title: "Project Gallery | NXG Coatings",
  description: "View our stunning coating and painting projects. See the quality and craftsmanship that sets NXG Coatings apart.",
  openGraph: {
    title: "Project Gallery | NXG Coatings",
    description: "View our stunning coating and painting projects. See the quality and craftsmanship that sets NXG Coatings apart.",
    images: [
      {
        url: "https://cdn.nxgcoatings.com/banners/gallery-hero.jpg",
        width: 1200,
        height: 630,
        alt: "NXG Coatings Project Gallery Hero"
      }
    ]
  }
}
>>>>>>> Stashed changes

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
