"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { BlogPostMeta } from "@/components/blog-card"

interface RelatedPostsProps {
  currentPostSlug: string
  posts: BlogPostMeta[]
  category?: string
}

export default function RelatedPosts({ currentPostSlug, posts, category }: RelatedPostsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Filter posts to show related ones (same category, excluding current post)
  const relatedPosts = posts
    .filter((post) => post.slug !== currentPostSlug)
    .filter((post) => !category || post.category === category)
    .slice(0, 3)

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate related posts
    const cards = gsap.utils.toArray<HTMLElement>(sectionRef.current.querySelectorAll(".related-post"))

    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
    })
  }, [])

  if (relatedPosts.length === 0) return null

  return (
    <div ref={sectionRef} className="mt-16 pt-12 border-t">
      <h3 className="text-2xl font-bold mb-8">Related Articles</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article key={post.slug} className="related-post group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                <Image
                  src={post.coverImage || "/placeholder.svg?height=400&width=600"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h4 className="font-bold text-lg mb-2 group-hover:text-brand-blue transition-colors">{post.title}</h4>

              <div className="flex items-center text-sm text-brand-blue font-medium mt-2 group-hover:text-brand-lightBlue transition-colors">
                Read Article
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
