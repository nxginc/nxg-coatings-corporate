"use client"

import Image from "next/image"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import PaintingGallery from "@/components/painting-gallery"


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
export default function GalleryPageClient() {


export default function GalleryPageClient() {
  const categories = [
    {
      id: "residential",
      title: "Residential",
      description: "Beautiful home transformations",
      image: "https://ik.imagekit.io/j98e6hcfnkn/services/residential-featured_EzfRe7DZJ.jpeg?updatedAt=1747919186999",
      count: 24
    },
    {
      id: "commercial",
      title: "Commercial",
      description: "Professional building coatings",
      image: "https://ik.imagekit.io/j98e6hcfnkn/services/commercial-featured_6QgfmEwj7.jpeg?updatedAt=1747919186999",
      count: 18
    },
    {
      id: "industrial",
      title: "Industrial",
      description: "Heavy-duty protective coatings",
      image: "https://ik.imagekit.io/j98e6hcfnkn/services/industrial-featured_S8CzFaGmp.jpeg?updatedAt=1747919186999",
      count: 12
    }
  ]


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
            {/* Project 1 - Colonial Home Exterior */}
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

            {/* Project 2 - Modern Office Interior */}
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

      {/* Gallery Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From residential homes to large commercial buildings, see how we've transformed spaces with our professional coating services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/gallery/${category.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.count} projects</span>
                    <span className="text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      View Gallery →
                    </span>
                  </div>
                </div>
              </Link>
            ))}

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

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of our most impressive transformations that showcase our expertise and attention to detail.
            </p>
          </div>

          <PaintingGallery />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us transform your space with our professional coating services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAModal 
              trigger={
                <FancyButton size="lg" variant="secondary">

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

            <Link href="/contact">
              <FancyButton size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Contact Us
              </FancyButton>
            </Link>

          </div>
        </div>
      </section>
    </main>
  )
}
}
