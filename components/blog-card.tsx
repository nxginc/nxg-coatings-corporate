import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  coverImage: string
  category: string
  content: string // Added content field
  featured?: boolean
  author?: {
    name: string
    avatar: string
  }
}

interface BlogCardProps {
  post: BlogPostMeta
  className?: string
  featured?: boolean
}

export default function BlogCard({ post, className, featured = false }: BlogCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevents infinite loop
    target.src = "/placeholder.svg?height=600&width=800" // Fallback image
  }

  return (
    <article
      className={cn(
        "group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl",
        featured ? "md:col-span-2" : "",
        className,
      )}
    >
      <div className={cn("grid", featured ? "md:grid-cols-2" : "grid-cols-1")}>
        <div className="relative overflow-hidden aspect-video md:aspect-auto">
          <Image
            src={post.coverImage || "/placeholder.svg?height=600&width=800"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-brand-blue mb-3 group-hover:text-brand-lightBlue transition-colors">
            <Link href={`/blog/${post.slug}`} className="block">
              {post.title}
            </Link>
          </h3>

          <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>

          <div className="mt-auto">
            {post.author && (
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={post.author.avatar || "/placeholder.svg?height=40&width=40"}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  onError={handleImageError}
                />
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
            )}

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-brand-blue font-medium hover:text-brand-lightBlue transition-colors"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
