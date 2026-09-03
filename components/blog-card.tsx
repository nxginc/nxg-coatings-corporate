"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  publishDate?: string
  publishedAt?: string
  readTime?: string
  author?: {
    name: string
    avatar?: string
  }
  coverImage?: string
  category?: string
  featured?: boolean
}

interface BlogCardProps extends Partial<BlogPostMeta> {
  post?: BlogPostMeta
  className?: string
}

export default function BlogCard({
  post,
  slug,
  title,
  excerpt,
  publishDate,
  publishedAt,
  coverImage,
  category,
  readTime,
  className,
}: BlogCardProps) {
  const item = post ?? {
    slug: slug ?? "",
    title: title ?? "",
    excerpt: excerpt ?? "",
    publishDate,
    publishedAt,
    coverImage,
    category,
    readTime,
  }
  const readingTime = item.readTime ? Number.parseInt(item.readTime, 10) || undefined : undefined

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className ?? ""}`}>
      {item.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {item.category && (
          <div className="inline-block px-2 py-1 bg-brand-blue/10 text-brand-blue text-xs font-medium rounded-full mb-3">
            {item.category}
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-brand-blue transition-colors">
          <Link href={`/blog/${item.slug}`}>
            {item.title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(item.publishedAt ?? item.publishDate ?? new Date().toISOString()), "MMM dd, yyyy")}
          </div>
          {readingTime && (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {readingTime} min read
            </div>
          )}
        </div>
      </div>
    </article>
  )
}