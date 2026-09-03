"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { format } from "date-fns"

interface BlogFeaturedPostProps {
  slug?: string
  title?: string
  excerpt?: string
  publishedAt?: string
  publishDate?: string
  coverImage?: string
  category?: string
  readTime?: number | string
  post?: {
    slug: string
    title: string
    excerpt: string
    publishDate?: string
    publishedAt?: string
    coverImage?: string
    category?: string
    readTime?: string
  }
}

export default function BlogFeaturedPost({
  post,
  slug,
  title,
  excerpt,
  publishedAt,
  publishDate,
  coverImage,
  category,
  readTime
}: BlogFeaturedPostProps) {
  const item = post ?? { slug, title, excerpt, publishedAt, publishDate, coverImage, category, readTime }
  const readingTime =
    typeof item.readTime === "string" ? Number.parseInt(item.readTime, 10) || undefined : item.readTime

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {item.coverImage && (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={item.coverImage}
            alt={item.title ?? "Featured blog image"}
            fill
            className="object-cover"
          />
          {item.category && (
            <div className="absolute top-4 left-4">
              <div className="inline-block px-3 py-1 bg-brand-blue text-white text-sm font-medium rounded-full">
                {item.category}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          {format(new Date(item.publishedAt ?? item.publishDate ?? new Date().toISOString()), "MMMM dd, yyyy")}
          {readingTime && (
            <>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              {readingTime} min read
            </>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-brand-blue transition-colors">
          <Link href={`/blog/${item.slug ?? ""}`}>
            {item.title}
          </Link>
        </h2>

        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
          {item.excerpt}
        </p>

        <Link
          href={`/blog/${item.slug ?? ""}`}
          className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </article>
  )
}