"use client"

import Image from "next/image"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import PaintingGallery from "@/components/painting-gallery"

export default function GalleryPageClient() {
  const categories = [
    {
      id: "residential",
      title: "Residential",
      description: "Beautiful home transformations",
      image: "https://ik.imagekit.io/j98e6hcfnkn/services/residential-featured_EzfRe7DZJ.jpeg?updatedAt=1747919186999",
      count: 24,
    },
    {
      id: "commercial",
      title: "Commercial",
      description: "Professional building coatings",
      image: "https://ik.imagekit.io/j98e6hcfnkn/services/commercial-featured_6QgfmEwj7.jpeg?updatedAt=1747919186999",
      count: 18,
    },
    {
      id: "industrial",
      title: "Industrial",
      description: "Heavy-duty protective coatings",
      image: "https://ik.imagekit.io/j98e6hcfnkn/services/industrial-featured_S8CzFaGmp.jpeg?updatedAt=1747919186999",
      count: 12,
    },
  ]

  return (
    <main className="min-h-screen">
      <EnhancedHero
        title="Our Project Gallery"
        subtitle="Browse our portfolio of completed projects and see the quality and craftsmanship we bring to every job."
        backgroundImage="https://cdn.nxgcoatings.com/banners/gallery-hero.jpg"
        height="medium"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAModal
            trigger=
              {<FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">Get Free Estimate</FancyButton>}
          />
        </div>
      </EnhancedHero>

      <PaintingGallery />

      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Portfolio</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a closer look at some of our most impressive transformations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-2xl overflow-hidden shadow-premium border border-border/30">
              <div className="grid grid-cols-2 gap-2 p-3">
                {[
                  { label: "BEFORE", src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/before1_YhGsD2Kl9.jpg?updatedAt=1741312450328" },
                  { label: "AFTER", src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/after1_YhGsD2Kl9.jpg?updatedAt=1741312450328", after: true },
                  { src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail1_YhGsD2Kl9.jpg?updatedAt=1741312450328" },
                  { src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail2_YhGsD2Kl9.jpg?updatedAt=1741312450328" },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-square">
                    <Image src={img.src} alt="Colonial Home Exterior" fill className="object-cover rounded-xl" />
                    {img.label && (
                      <div className={`absolute top-2 left-2 ${img.after ? "bg-accent" : "bg-foreground/80"} text-white text-xs font-semibold px-2.5 py-1 rounded-lg`}>
                        {img.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Colonial Home Exterior Transformation</h3>
                <p className="text-muted-foreground mb-5">
                  Historic colonial home received a complete exterior makeover with a classic color scheme.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Exterior Painting','Residential','Historical'].map(t => (
                    <span key={t} className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-background rounded-2xl overflow-hidden shadow-premium border border-border/30">
              <div className="grid grid-cols-2 gap-2 p-3">
                {[
                  { label: "BEFORE", src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/before2_YhGsD2Kl9.jpg?updatedAt=1741312450328" },
                  { label: "AFTER", src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/after2_YhGsD2Kl9.jpg?updatedAt=1741312450328", after: true },
                  { src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail3_YhGsD2Kl9.jpg?updatedAt=1741312450328" },
                  { src: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/detail4_YhGsD2Kl9.jpg?updatedAt=1741312450328" },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-square">
                    <Image src={img.src} alt="Modern Office Interior" fill className="object-cover rounded-xl" />
                    {img.label && (
                      <div className={`absolute top-2 left-2 ${img.after ? "bg-accent" : "bg-foreground/80"} text-white text-xs font-semibold px-2.5 py-1 rounded-lg`}>
                        {img.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Modern Office Interior Renovation</h3>
                <p className="text-muted-foreground mb-5">
                  Commercial office space transformed with a contemporary color palette.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Interior Painting','Commercial','Modern'].map(t => (
                    <span key={t} className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
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

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Categories</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From residential homes to large commercial buildings, see how we have transformed spaces with our professional coating services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/gallery/${category.id}`}
                className="group bg-card rounded-2xl shadow-premium overflow-hidden hover:shadow-premium-lg transition-all duration-500 transform hover:-translate-y-2 border border-border/30"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{category.count} projects</span>
                    <span className="text-accent font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                      View Gallery
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Get Started</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/80">
            Contact our team today to schedule a consultation and get a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAModal
              trigger={
                <FancyButton variant="accent" size="xl" hasArrow={true} rounded="full">
                  Get Free Estimate
                </FancyButton>
              }
            />
            <FancyButton
              variant="outline"
              size="lg"
              rounded="full"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
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
