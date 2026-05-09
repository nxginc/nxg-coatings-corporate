"use client"

import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogPostProps {
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  coverImage?: string
  author: {
    name: string
    avatar?: string
  }
  content?: React.ReactNode
  slug?: string
  className?: string
}

export default function BlogPost({ title, excerpt, publishDate, readTime, coverImage, author, content, slug, className }: BlogPostProps) {
  return (
    <article className={cn("bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow", className)}>
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
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-brand-blue transition-colors">
          {slug ? (
            <Link href={`/blog/${slug}`}>
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {author.name}
          </div>

          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {publishDate}
          </div>

          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {readTime}
          </div>
        </div>

        <div className="mt-4">
          {slug && (
            <Link
              href={`/blog/${slug}`}
              className="text-brand-blue hover:text-brand-blue/80 font-medium transition-colors"
            >
              Read More →
            </Link>
          )}
        </div>

        {content && (
          <div className="mt-6 prose prose-gray max-w-none">
            {content}
          </div>
        )}
      </div>
    </article>
  )
}