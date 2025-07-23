"use client"

import { useState, useEffect } from "react"
import BlogCard, { type BlogPostMeta } from "@/components/blog-card"

interface RelatedPostsProps {
  currentPostSlug: string
  posts: BlogPostMeta[]
  category: string
}

export default function RelatedPosts({ currentPostSlug, posts, category }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPostMeta[]>([])

  useEffect(() => {
    // Get related posts from the same category, excluding current post
    const related = posts.filter((post) => post.slug !== currentPostSlug && post.category === category).slice(0, 3)

    // If we don't have enough posts from the same category, fill with other posts
    if (related.length < 3) {
      const otherPosts = posts
        .filter((post) => post.slug !== currentPostSlug && post.category !== category)
        .slice(0, 3 - related.length)

      setRelatedPosts([...related, ...otherPosts])
    } else {
      setRelatedPosts(related)
    }
  }, [currentPostSlug, posts, category])

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-8 flex items-center">
        <span className="bg-brand-blue h-6 w-1 mr-3 rounded-full"></span>
        Related Articles
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
