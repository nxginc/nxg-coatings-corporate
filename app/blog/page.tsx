import type { Metadata } from "next"
import BlogIndex from "@/components/blog-index"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"
import { seo } from "@/lib/seo"
import { publishedBlogPosts, type BlogPostMeta } from "@/data/blog-posts"
import { getPublishedAdminBlogPosts } from "@/lib/editorial-blog"
import { getSiteContentstackBlogPosts } from "@/lib/contentstack"

export const metadata: Metadata = seo("blog", "/blog")
export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const [databasePosts, cmsPosts] = await Promise.all([getPublishedAdminBlogPosts(), getSiteContentstackBlogPosts()])
  const staticSlugs = new Set(publishedBlogPosts.map((post) => post.slug))
  const databaseEditorialPosts: BlogPostMeta[] = databasePosts
    .filter((post) => !staticSlugs.has(post.slug))
    .map((post) => {
      const wordCount = post.bodyMarkdown.trim().split(/\s+/).filter(Boolean).length
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        publishDate: new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }),
        readTime: `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
        coverImage: ASSETS.services.interior,
        category: post.category,
        published: true,
        author: { name: post.authorName, avatar: ASSETS.blog.authorAvatar },
      }
    })
  const managedPosts = cmsPosts.length ? cmsPosts : databaseEditorialPosts
  const managedSlugs = new Set(managedPosts.map((post) => post.slug))
  const posts = [...managedPosts, ...publishedBlogPosts.filter((post) => !managedSlugs.has(post.slug))]

  return (
    <main>
      <ParallaxHero
        eyebrow="The NXG journal / Notes from the field"
        title="Better decisions start with better preparation."
        description="Project advice, practical guides, and color perspective from NXG Coatings."
        image={ASSETS.hero.blog}
        imageAlt="A finished NXG Coatings exterior project"
        height="medium"
      />
      <BlogIndex posts={posts} />
    </main>
  )
}