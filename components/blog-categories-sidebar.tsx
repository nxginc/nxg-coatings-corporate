"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface Category {
  name: string
  slug: string
  count: number
}

interface BlogCategoriesSidebarProps {
  categories?: Category[]
  posts?: Array<{ category: string }>
  currentCategory?: string
  className?: string
}

export default function BlogCategoriesSidebar({
  categories,
  posts = [],
  currentCategory,
  className
}: BlogCategoriesSidebarProps) {
  const pathname = usePathname()
  const derivedCategories = Object.values(posts.reduce<Record<string, Category>>((result, post) => {
    const slug = post.category.toLowerCase().replace(/\s+/g, "-")
    result[slug] ??= { name: post.category, slug, count: 0 }
    result[slug].count += 1
    return result
  }, {}))
  const visibleCategories = categories || derivedCategories

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>

      <nav className="space-y-2">
        <Link
          href="/blog"
          className={cn(
            "block px-3 py-2 text-sm rounded-md transition-colors",
            pathname === "/blog"
              ? "bg-brand-blue text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          All Posts
        </Link>

        {visibleCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className={cn(
              "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
              pathname === `/blog/category/${category.slug}` || currentCategory?.toLowerCase() === category.name.toLowerCase()
                ? "bg-brand-blue text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <span>{category.name}</span>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {category.count}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
