"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import type { BlogPostMeta } from "@/components/blog-card"

interface BlogFeaturedPostProps {
  post: BlogPostMeta
}

export default function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    tl.from(".featured-image", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }).from(
      ".featured-content",
      {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="featured-image relative h-full min-h-[300px]">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/blog-post-brainstorm.png"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="p-8 text-white max-w-md">
              <span className="bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                {post.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{post.title}</h2>
              <p className="text-white/80 mb-4 hidden md:block">{post.excerpt}</p>
            </div>
          </div>
        </div>

        <div className="featured-content p-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{post.excerpt}</p>

          {post.author && (
            <div className="flex items-center gap-3 mb-6">
              <Image
                src={post.author.avatar || "/placeholder.svg?height=40&width=40"}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=40&width=40"
                }}
              />
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>
          )}

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue transition-colors"
          >
            Read Full Article
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
