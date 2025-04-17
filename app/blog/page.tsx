"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BlogCard, { type BlogPostMeta } from "@/components/blog-card"
import { FancyButton } from "@/components/ui/fancy-button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import BlogFeaturedPost from "@/components/blog-featured-post"
import EnhancedHero from "@/components/enhanced-hero"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Blog posts data
const blogPosts: BlogPostMeta[] = [
  {
    slug: "repair-peeling-exterior-paint",
    title: "How to Repair Peeling Exterior House Paint: Step-by-Step Restoration Guide",
    excerpt:
      "Learn how to fix peeling exterior paint and protect your home from further damage with our comprehensive guide.",
    publishDate: "March 5, 2025",
    readTime: "8 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog1_o0PS2vfo9K.jpeg?updatedAt=1741212349688",
    category: "Exterior",
    featured: true,
    author: {
      name: "NXG Coatings Team",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    slug: "benefits-of-professional-exterior-coating",
    title: "5 Benefits of Professional Exterior Coating",
    excerpt:
      "Discover how professional exterior coating can protect your home, increase its value, and reduce maintenance costs over time.",
    publishDate: "February 28, 2025",
    readTime: "6 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog2_shlL_xb-0.jpeg?updatedAt=1741212349719",
    category: "Exterior",
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    slug: "choosing-the-right-paint-color",
    title: "How to Choose the Perfect Paint Color for Your Home",
    excerpt:
      "Selecting the right paint color can be overwhelming. Follow our expert tips to find the perfect shade for every room.",
    publishDate: "February 20, 2025",
    readTime: "5 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-3_M4piDalkB9.jpeg?updatedAt=1741213130328",
    category: "Interior",
    author: {
      name: "Jessica Chen",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    slug: "eco-friendly-paint-options",
    title: "Eco-Friendly Paint Options for Environmentally Conscious Homeowners",
    excerpt: "Explore sustainable and non-toxic paint alternatives that are better for your family and the planet.",
    publishDate: "February 15, 2025",
    readTime: "7 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-4_WhGK1g1BA.jpg?updatedAt=1741213130440",
    category: "Products",
    author: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    slug: "commercial-painting-best-practices",
    title: "Commercial Painting Best Practices: Minimizing Business Disruption",
    excerpt:
      "Learn how to plan and execute a commercial painting project with minimal impact on your business operations.",
    publishDate: "February 8, 2025",
    readTime: "9 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-5_QPOc05Oaz.jpeg?updatedAt=1741213130034",
    category: "Commercial",
    author: {
      name: "NXG Coatings Team",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    slug: "preparing-walls-for-painting",
    title: "The Complete Guide to Preparing Walls for Painting",
    excerpt:
      "Proper wall preparation is crucial for a flawless paint job. Follow our step-by-step guide for professional results.",
    publishDate: "January 30, 2025",
    readTime: "10 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-6_47xxAjqVC.jpg?updatedAt=1741213130701",
    category: "Tips",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
]

// Categories
const categories = ["All", "Exterior", "Interior", "Commercial", "Products", "Tips"]

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
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/Banners/blog-banner_Yx9Ue-Zzr.jpg?updatedAt=1679013242072"
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
