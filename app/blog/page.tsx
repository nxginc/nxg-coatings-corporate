"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BlogCard from "@/components/blog-card"
import { FancyButton } from "@/components/ui/fancy-button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import BlogFeaturedPost from "@/components/blog-featured-post"
import EnhancedHero from "@/components/enhanced-hero"
import { blogPosts } from "@/data/blog-posts"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Categories
const categories = ["All", "Exterior", "Interior", "Commercial", "Products", "Tips", "Industrial"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const blogGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Filter posts based on search term and category
    const filtered = blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory])

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
  }, [filteredPosts])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="NXG Coatings Blog"
        subtitle="Expert tips, guides, and insights on painting and coating solutions for your property."
        backgroundImage="/images/blog/blog-hero.jpg"
        height="medium"
      />

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <FancyButton
                  key={category}
                  variant={selectedCategory === category ? "gradient" : "outline"}
                  size="sm"
                  rounded="full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </FancyButton>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {filteredPosts.find((post) => post.featured) && selectedCategory === "All" && searchTerm === "" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-brand-blue h-6 w-1 mr-3 rounded-full"></span>
                Featured Article
              </h2>
              <BlogFeaturedPost post={filteredPosts.find((post) => post.featured)!} />
            </div>
          )}

          {/* Blog Grid */}
          <div ref={blogGridRef}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-brand-blue h-6 w-1 mr-3 rounded-full"></span>
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts
                  .filter((post) => !post.featured || selectedCategory !== "All" || searchTerm !== "")
                  .map((post) => (
                    <BlogCard key={post.slug} post={post} className="blog-card" />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No articles found matching your criteria.</p>
                <FancyButton
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                >
                  Reset Filters
                </FancyButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
