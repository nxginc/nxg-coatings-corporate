"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { BlogPostMeta } from "@/components/blog-card"

interface Category {
  name: string
  slug: string
  count: number
}

interface BlogCategoriesSidebarProps {
  posts: BlogPostMeta[]
  currentCategory?: string
  className?: string
}

export default function BlogCategoriesSidebar({
  posts,
  currentCategory,
  className
}: BlogCategoriesSidebarProps) {
  const pathname = usePathname()

  const categories = Object.values(
    posts.reduce<Record<string, Category>>((acc, post) => {
      const name = post.category ?? "Uncategorized"
      const slug = name.toLowerCase()

      if (!acc[slug]) {
        acc[slug] = { name, slug, count: 0 }
      }

      acc[slug].count += 1
      return acc
    }, {})
  )

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>

      <nav className="space-y-2">
        <Link
          href="/blog"
          className={cn(
            "block px-3 py-2 text-sm rounded-md transition-colors",
            pathname === "/blog" || pathname === "/blog/"
              ? "bg-brand-blue text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          All Posts
        </Link>

        {categories.map((category) => {
          const isActive =
            pathname === `/blog/category/${category.slug}` ||
            currentCategory?.toLowerCase() === category.slug

          return (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-brand-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}