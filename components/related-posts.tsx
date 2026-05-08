"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { format } from "date-fns"

interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  coverImage?: string
  category?: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  title?: string
}

export default function RelatedPosts({ posts, title = "Related Articles" }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-blue mb-8 text-center">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.coverImage && (
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4">
                {post.category && (
                  <div className="inline-block px-2 py-1 bg-brand-blue/10 text-brand-blue text-xs font-medium rounded-full mb-2">
                    {post.category}
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-blue transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}