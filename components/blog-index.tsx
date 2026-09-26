"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import BlogCard from "@/components/blog-card"
import BlogFeaturedPost from "@/components/blog-featured-post"
import { blogPosts } from "@/data/blog-posts"

const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))]
const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0]

export default function BlogIndex() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category
    const matchesQuery = !normalizedQuery || `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesQuery && post.slug !== featuredPost.slug
  })

  return (
    <>
      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-8 border-b border-[var(--nxg-line)] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="section-kicker">Field notes / NXG Coatings</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-5xl">Ideas for better-prepared projects.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--nxg-muted)]">Practical guidance on surfaces, materials, color, and planning from the NXG Coatings team.</p>
          </div>
          <label className="relative block w-full md:w-80">
            <span className="sr-only">Search articles</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--nxg-muted)]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the journal"
              className="h-12 w-full border border-[var(--nxg-line)] bg-white pl-10 pr-10 text-sm text-[var(--nxg-navy)] placeholder:text-[var(--nxg-muted)]"
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--nxg-muted)] hover:text-[var(--nxg-red)]"><X className="h-4 w-4" /></button>}
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto py-6" aria-label="Filter articles by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`shrink-0 border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${category === item ? "border-[var(--nxg-navy)] bg-[var(--nxg-navy)] text-white" : "border-[var(--nxg-line)] bg-white text-[var(--nxg-navy)] hover:border-[var(--nxg-red)]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        {category === "All" && !normalizedQuery && featuredPost && (
          <div className="mb-16">
            <p className="section-kicker mb-4">Featured reading</p>
            <BlogFeaturedPost post={featuredPost} />
          </div>
        )}

        <div className="flex items-end justify-between gap-5 border-b border-[var(--nxg-line)] pb-4">
          <h2 className="text-2xl font-medium text-[var(--nxg-navy)] sm:text-3xl">{category === "All" ? "Recent articles" : `${category} articles`}</h2>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-muted)]">{filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}</p>
        </div>

        {filteredPosts.length ? (
          <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-xl font-medium text-[var(--nxg-navy)]">No matching articles.</p>
            <p className="mt-2 text-sm text-[var(--nxg-muted)]">Try another phrase or choose a different category.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All") }} className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">Reset filters</button>
          </div>
        )}
      </section>
    </>
  )
}