"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import type { BlogPostMeta } from "@/data/blog-posts"

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  currentPostSlug?: string
  category?: string
  title?: string
}

export default function RelatedPosts({
  posts,
  currentPostSlug,
  category,
  title = "Related Articles",
}: RelatedPostsProps) {
  const relatedPosts = posts
    .filter((post) => post.published === true && post.slug !== currentPostSlug && (!category || post.category === category))
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="bg-[var(--nxg-paper)] px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-[var(--nxg-content-width)]">
        <h2 className="mb-8 text-3xl font-medium text-[var(--nxg-navy)]">{title}</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <article key={post.slug} className="min-w-0 overflow-hidden border border-[var(--nxg-line)] bg-white transition-colors hover:border-[var(--nxg-platinum)]">
              {post.coverImage && (
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--nxg-paper)]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-5">
                {post.category && (
                  <div className="mb-2 inline-block border border-[var(--nxg-line)] px-2 py-1 text-xs font-medium text-[var(--nxg-muted)]">
                    {post.category}
                  </div>
                )}

                <h3 className="mb-2 text-lg font-semibold text-[var(--nxg-navy)] transition-colors hover:text-[var(--nxg-red)]">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mb-3 line-clamp-2 text-sm leading-6 text-[var(--nxg-muted)]">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-xs text-[var(--nxg-muted)]">
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(new Date(`${post.publishDate} 12:00:00`), "MMM dd, yyyy")}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
