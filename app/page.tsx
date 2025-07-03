import { EnhancedHero } from "@/components/enhanced-hero"
import { IndustrySection } from "@/components/industry-section"
import { ParallaxFeatures } from "@/components/parallax-features"
import { ServicesSlider } from "@/components/services-slider"
import { TestimonialsSection } from "@/components/testimonials-section"
import { blogPosts } from "@/data/blog-posts"
import BlogCard from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <EnhancedHero
          title="Expert Coatings for Lasting Impressions"
          subtitle="NXG Coatings delivers unparalleled quality in residential, commercial, and industrial painting services. Experience the next generation of surface protection."
          backgroundImage="/images/banners/home-hero.png"
          buttonLinks={[
            { href: "/quote", text: "Get a Free Quote" },
            { href: "/services", text: "Our Services", variant: "outline" },
          ]}
        />
        <ParallaxFeatures />
        <IndustrySection />
        <ServicesSlider />
        <TestimonialsSection />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">From Our Blog</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Stay updated with the latest industry trends, tips, and insights from our team of experts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/blog" passHref>
                <Button>View All Posts</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
