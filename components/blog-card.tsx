"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  coverImage?: string
  category?: string
  readTime?: number
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  publishedAt,
  coverImage,
  category,
  readTime
}: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {coverImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {category && (
          <div className="inline-block px-2 py-1 bg-brand-blue/10 text-brand-blue text-xs font-medium rounded-full mb-3">
            {category}
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-brand-blue transition-colors">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(publishedAt), "MMM dd, yyyy")}
          </div>
          {readTime && (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {readTime} min read
            </div>
          )}
        </div>
      </div>
    </article>
  )
}