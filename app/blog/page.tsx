"use client"

import { useState, useMemo } from "react"
import { blogPosts } from "@/data/blog-posts"
import BlogCard from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { EnhancedHero } from "@/components/enhanced-hero"

const allCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))]
const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE)

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  const postsToShow = filteredPosts.slice(0, visiblePosts)

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + POSTS_PER_PAGE)
  }

  return (
    <>
      <EnhancedHero
        title="NXG Coatings Blog"
        subtitle="Your source for expert advice, industry trends, and project inspiration."
        backgroundImage="/images/blog/blog-hero.jpg"
        disableButtons
      />
      <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-auto">
            <Select onValueChange={setSelectedCategory} defaultValue="All">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {postsToShow.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postsToShow.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No Posts Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
          </div>
        )}

        {visiblePosts < filteredPosts.length && (
          <div className="mt-12 text-center">
            <Button onClick={handleLoadMore}>Load More</Button>
          </div>
        )}
      </div>
    </>
  )
}
