"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import type { BlogPostMeta } from "@/data/blog-types"

interface BlogFeaturedPostProps {
  post: BlogPostMeta
}

export default function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {post.coverImage && (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          {post.category && (
            <div className="absolute top-4 left-4">
              <div className="inline-block px-3 py-1 bg-brand-blue text-white text-sm font-medium rounded-full">
                {post.category}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          {format(new Date(post.publishDate), "MMMM dd, yyyy")}
          {post.readTime && (
            <>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-brand-blue transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </article>
  )
}