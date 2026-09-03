"use client"

import type React from "react"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogPostProps {
  post?: {
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
  title?: string
  excerpt?: string
  publishDate?: string
  readTime?: string
  coverImage?: string
  author?: {
    name: string
    avatar?: string
  }
  content?: React.ReactNode
  className?: string
}

export default function BlogPost({
  post,
  title,
  excerpt,
  publishDate,
  readTime,
  coverImage,
  author,
  content,
  className,
}: BlogPostProps) {
  const resolvedPost = post ?? {
    slug: "",
    title: title ?? "",
    excerpt: excerpt ?? "",
    content: typeof content === "string" ? content : undefined,
    author: author?.name,
    publishedAt: publishDate ?? new Date().toISOString(),
    readingTime: readTime ? Number.parseInt(readTime, 10) || undefined : undefined,
    coverImage,
    category: undefined,
  }

  return (
    <article className={cn("bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow", className)}>
      {resolvedPost.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={resolvedPost.coverImage}
            alt={resolvedPost.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {resolvedPost.category && (
          <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm font-medium rounded-full mb-3">
            {resolvedPost.category}
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-brand-blue transition-colors">
          <Link href={resolvedPost.slug ? `/blog/${resolvedPost.slug}` : "#"}>
            {resolvedPost.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {resolvedPost.excerpt}
        </p>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          {resolvedPost.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {resolvedPost.author}
            </div>
          )}

          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(resolvedPost.publishedAt), "MMM dd, yyyy")}
          </div>

          {resolvedPost.readingTime && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {resolvedPost.readingTime} min read
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link
            href={resolvedPost.slug ? `/blog/${resolvedPost.slug}` : "#"}
            className="text-brand-blue hover:text-brand-blue/80 font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
        {content && <div className="prose prose-sm mt-6 max-w-none text-gray-700">{content}</div>}
      </div>
    </article>
  )
}