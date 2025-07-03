"use client"

import Link from "next/link"
import ConsultationBooking from "@/components/consultation-booking"
import ParallaxFeatures from "@/components/parallax-features"
import ServicesSlider from "@/components/services-slider"
import TestimonialsSection from "@/components/testimonials-section"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import EnhancedHero from "@/components/enhanced-hero"
import IndustrySection from "@/components/industry-section"
import BlogCard from "@/components/blog-card"
import { blogPosts } from "@/data/blog-posts"

export default function Home() {
  const recentPosts = blogPosts.slice(0, 2)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Professional Coating Solutions for Your Home"
        description="Transform and protect your property with our expert coating services. Schedule a consultation today."
        backgroundImage="/images/banners/home-hero.png"
        height="large"
      >
        <div className="flex flex-col sm:flex-row gap-4">
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
      </EnhancedHero>

      <ServicesSlider />
      <ParallaxFeatures />
      <TestimonialsSection />
      <IndustrySection />
      <ConsultationBooking />

      {/* Blog Preview Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">From the NXG Blog</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
              Get expert tips, industry insights, and the latest news from our team.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog">
              <FancyButton variant="outline" size="lg" rounded="full" hasArrow>
                View All Posts
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
