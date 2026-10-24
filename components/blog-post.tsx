"use client"

import { format } from "date-fns"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BlogPostProps {
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  coverImage?: string
  author?: { name: string; avatar?: string }
  content: ReactNode
  className?: string
}

export default function BlogPost({ title, excerpt, publishDate, readTime, coverImage, author, content, className }: BlogPostProps) {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>

        <p className="text-gray-600 mb-6">{excerpt}</p>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          {author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {author.name}
            </div>
          )}

          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(publishDate), "MMM dd, yyyy")}
          </div>

          {readTime && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {readTime}
            </div>
          )}
        </div>

        <div className="prose prose-lg mt-8 max-w-none">{content}</div>
      </div>
    </article>
  )
}