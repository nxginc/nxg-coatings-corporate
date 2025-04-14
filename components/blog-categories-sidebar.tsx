"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { BlogPostMeta } from "@/components/blog-card"
import { cn } from "@/lib/utils"

interface BlogCategoriesSidebarProps {
  posts: BlogPostMeta[]
  currentCategory?: string
}

export default function BlogCategoriesSidebar({ posts, currentCategory }: BlogCategoriesSidebarProps) {
  const [categories, setCategories] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Count posts by category
    const categoryCounts = posts.reduce(
      (acc, post) => {
        const { category } = post
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category]++
        return acc
      },
      {} as { [key: string]: number },
    )

    setCategories(categoryCounts)
  }, [posts])

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Categories</h3>

      <ul className="space-y-2">
        <li>
          <Link
            href="/blog"
            className={cn(
              "block py-2 px-3 rounded-md transition-colors hover:bg-brand-blue/10",
              !currentCategory ? "bg-brand-blue/10 text-brand-blue font-medium" : "",
            )}
          >
            All Posts
            <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded-full">{posts.length}</span>
          </Link>
        </li>

        {Object.entries(categories).map(([category, count]) => (
          <li key={category}>
            <Link
              href={`/blog/category/${category.toLowerCase()}`}
              className={cn(
                "block py-2 px-3 rounded-md transition-colors hover:bg-brand-blue/10",
                currentCategory === category ? "bg-brand-blue/10 text-brand-blue font-medium" : "",
              )}
            >
              {category}
              <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded-full">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
