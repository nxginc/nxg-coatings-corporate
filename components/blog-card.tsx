import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { BlogPostMeta } from "@/data/blog-posts"

interface BlogCardProps {
  post: BlogPostMeta
  className?: string
}

export type { BlogPostMeta }

export default function BlogCard({ post, className = "" }: BlogCardProps) {
  return (
    <article className={`group min-w-0 border-b border-[var(--nxg-line)] pb-7 ${className}`}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--nxg-paper)]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />
          <span className="absolute left-3 top-3 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-navy)]">
            {post.category}
          </span>
        </div>
        <div className="pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-muted)]">
            {new Date(post.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            <span className="px-2 text-[var(--nxg-red)]">/</span>{post.readTime}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Image src={post.author.avatar} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
            <span className="text-xs font-medium text-[var(--nxg-muted)]">{post.author.name}</span>
          </div>
          <h2 className="mt-3 text-2xl font-medium leading-tight text-[var(--nxg-navy)] group-hover:text-[var(--nxg-red)] sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--nxg-muted)]">{post.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-navy)]">
            Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </Link>
    </article>
  )
}