import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { BlogPostMeta } from "@/data/blog-posts"

interface BlogFeaturedPostProps {
  post: BlogPostMeta
}

export default function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  return (
    <article className="grid overflow-hidden border border-[var(--nxg-line)] bg-white md:grid-cols-[1.15fr_0.85fr]">
      <Link href={`/blog/${post.slug}`} className="group relative block min-h-72 overflow-hidden bg-[var(--nxg-paper)] md:min-h-[420px]">
        <Image src={post.coverImage} alt={post.title} fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
        <span className="absolute left-5 top-5 bg-[var(--nxg-red)] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">Featured / {post.category}</span>
      </Link>
      <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--nxg-muted)]">
          {new Date(`${post.publishDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          <span className="px-2 text-[var(--nxg-red)]">/</span>{post.readTime}
        </p>
        <h2 className="mt-5 text-3xl font-medium leading-tight text-[var(--nxg-navy)] sm:text-4xl lg:text-5xl">{post.title}</h2>
        <p className="mt-5 text-base leading-7 text-[var(--nxg-muted)]">{post.excerpt}</p>
        <div className="mt-8 flex items-center gap-3 border-t border-[var(--nxg-line)] pt-5">
          <Image src={post.author.avatar} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="text-xs font-medium text-[var(--nxg-navy)]">{post.author.name}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-navy)] hover:text-[var(--nxg-red)]">
          Read the story <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}