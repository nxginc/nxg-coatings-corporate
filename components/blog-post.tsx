"use client"

import type React from "react"
import Image from "next/image"
import { FancyButton } from "@/components/ui/fancy-button"
import { CalendarDays, Clock, Share2 } from "lucide-react"

interface BlogPostProps {
  title: string
  excerpt: string
  content: React.ReactNode
  publishDate: string
  readTime: string
  coverImage: string
  author?: {
    name: string
    avatar: string
  }
}

export default function BlogPost({
  title,
  excerpt,
  content,
  publishDate,
  readTime,
  coverImage,
  author,
}: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-blue mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-6">{excerpt}</p>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-6">
            {author && (
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.svg" // Replace author avatar with logo
                  alt="NXG Coatings Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-500">
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm">{publishDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{readTime}</span>
            </div>
          </div>

          <FancyButton variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </FancyButton>
        </div>

        <div className="relative h-[300px] md:h-[400px] w-full mb-8 overflow-hidden rounded-xl">
          <Image src={coverImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </div>

      <div className="prose prose-lg max-w-none">{content}</div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-xl font-bold mb-4">Ready to fix your peeling paint?</h3>
        <p className="mb-6">
          Schedule a consultation with our painting experts to get professional advice for your specific situation.
        </p>
        <div className="flex gap-4">
          <FancyButton
            variant="gradient"
            size="lg"
            hasArrow={true}
            onClick={() => window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")}
          >
            Book Virtual Consultation
          </FancyButton>
          <FancyButton
            variant="outline"
            size="lg"
            onClick={() => window.open("https://cal.com/nxgcoatings/in-person-consultation", "_blank")}
          >
            Book In-Person Consultation
          </FancyButton>
        </div>
      </div>
    </article>
  )
}
