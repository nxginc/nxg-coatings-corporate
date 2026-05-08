"use client"

import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogPostProps {
  post: {
    slug: string
    title: string
    excerpt: string
    content?: string
    author?: string
    publishedAt: string
    readingTime?: number
    coverImage?: string
    category?: string
    tags?: string[]
  }
  className?: string
}

export default function BlogPost({ post, className }: BlogPostProps) {
  return (
    <article className={cn("bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow", className)}>
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
          <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm font-medium rounded-full mb-3">
            {post.category}
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-brand-blue transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          {post.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
          )}

          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(post.publishedAt), "MMM dd, yyyy")}
          </div>

          {post.readingTime && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readingTime} min read
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="text-brand-blue hover:text-brand-blue/80 font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}