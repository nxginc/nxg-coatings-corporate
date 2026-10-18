import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type BlogPostProps = {
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  coverImage: string
  author: { name: string; avatar: string }
  content: ReactNode
  className?: string
}

export default function BlogPost({ title, excerpt, publishDate, readTime, coverImage, author, content, className }: BlogPostProps) {
  const publishedDate = new Date(`${publishDate}T12:00:00`)

  return (
    <main className={cn("bg-white", className)}>
      <header className="mx-auto max-w-4xl px-6 pb-10 pt-16 lg:pt-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-muted)] transition hover:text-[var(--nxg-red)]">
          <ArrowLeft className="h-4 w-4" /> Back to the journal
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-muted)]">
          <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{format(publishedDate, "MMMM d, yyyy")}</span>
          <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{readTime}</span>
        </div>
        <h1 className="mt-5 text-4xl font-medium leading-[1.04] text-[var(--nxg-navy)] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--nxg-muted)]">{excerpt}</p>
        <div className="mt-7 flex items-center gap-3 border-t border-[var(--nxg-line)] pt-5">
          <Image src={author.avatar} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="text-xs font-medium text-[var(--nxg-navy)]">{author.name}</span>
        </div>
      </header>

      <figure className="relative mx-auto aspect-[16/9] max-h-[680px] w-full max-w-[1440px] overflow-hidden bg-[var(--nxg-paper)] px-0 sm:px-6 lg:px-10">
        <Image src={coverImage} alt={title} fill priority sizes="(min-width: 1440px) 1360px, 100vw" className="object-cover" />
      </figure>

      <article className="article-copy mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {content}
        <div className="mt-14 border-y border-[var(--nxg-line)] py-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--nxg-red)]">Planning a project?</p>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <p className="max-w-xl text-lg leading-7 text-[var(--nxg-navy)]">Talk with NXG about the surface, preparation, and finish your space needs.</p>
            <Link href="/quote" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--nxg-navy)]">Request an estimate <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </article>
    </main>
  )
}