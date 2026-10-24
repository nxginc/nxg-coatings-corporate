"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import type { BlogPostMeta } from "@/data/blog-types"

interface BlogCardProps {
  post: BlogPostMeta
  className?: string
}

export default function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className ?? ""}`}>
      {post.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {post.category && (
          <div className="inline-block px-2 py-1 bg-brand-blue/10 text-brand-blue text-xs font-medium rounded-full mb-3">
            {post.category}
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-brand-blue transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(post.publishDate), "MMM dd, yyyy")}
          </div>
          {post.readTime && (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}