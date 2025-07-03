"use client"

import { useState } from "react"
import { blogPosts } from "@/data/blog-posts"
import BlogCard from "@/components/blog-card"
import EnhancedHero from "@/components/enhanced-hero"
import BlogCategoriesSidebar from "@/components/blog-categories-sidebar"
import BlogSearch from "@/components/blog-search"
import { FancyButton } from "@/components/ui/fancy-button"

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE)

  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))]

  const filteredPosts = blogPosts
    .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((post) => selectedCategory === "All" || post.category === selectedCategory)

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + POSTS_PER_PAGE)
  }

  return (
    <main className="min-h-screen">
      <EnhancedHero
        title="NXG Coatings Blog"
        description="Expert advice, industry insights, and company news from the coating specialists."
        backgroundImage="/images/blog/blog-hero.jpg"
        height="medium"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-8">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                  {filteredPosts.slice(0, visiblePosts).map((post) => (
                    <BlogCard key={post.slug} post={post} featured={post.featured && selectedCategory === "All"} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold text-brand-blue">No Posts Found</h3>
                  <p className="text-gray-600 mt-2">Try adjusting your search or category filter.</p>
                </div>
              )}

              {visiblePosts < filteredPosts.length && (
                <div className="text-center mt-12">
                  <FancyButton onClick={loadMorePosts} size="lg" rounded="full">
                    Load More Posts
                  </FancyButton>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <BlogSearch onSearch={setSearchTerm} />
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <BlogCategoriesSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
