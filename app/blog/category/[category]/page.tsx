"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useParams } from "next/navigation"
import BlogCard from "@/components/blog-card"
import BlogCategoriesSidebar from "@/components/blog-categories-sidebar"
import BlogNewsletter from "@/components/blog-newsletter"
import { blogPosts } from "@/data/blog-posts"
import EnhancedHero from "@/components/enhanced-hero"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BlogCategoryPage() {
  const params = useParams()
  const category = typeof params.category === "string" ? params.category : ""
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  const blogGridRef = useRef<HTMLDivElement>(null)

  // Filter posts by category
  const filteredPosts = blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())

  useEffect(() => {
    if (!blogGridRef.current) return

    // Animate blog cards when they come into view
    const blogCards = gsap.utils.toArray<HTMLElement>(".blog-card")

    blogCards.forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: 0.1 * i,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [category])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title={`${formattedCategory} Articles`}
        subtitle={`Browse our collection of articles about ${formattedCategory.toLowerCase()} painting and coating solutions.`}
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/Banners/blog-category-banner_Yx9Ue-Zzr.jpg?updatedAt=1679013242072"
        height="medium"
      />

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-brand-blue h-6 w-1 mr-3 rounded-full"></span>
                {formattedCategory} Articles
              </h2>

              {filteredPosts.length > 0 ? (
                <div ref={blogGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} className="blog-card" />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <p className="text-lg text-gray-600 mb-4">No articles found in this category.</p>
                  <p className="text-gray-500">Please check back later or browse other categories.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <BlogCategoriesSidebar posts={blogPosts} currentCategory={formattedCategory} />
              <BlogNewsletter />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
