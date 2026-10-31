import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { publishedBlogPosts } from "@/data/blog-posts"
import { getPublishedAdminBlogPosts } from "@/lib/editorial-blog"
import { getSiteContentstackBlogPosts } from "@/lib/contentstack"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "/", "/about", "/services", "/services/interior-painting", "/services/exterior-painting",
    "/services/deck-staining", "/services/cabinet-refinishing", "/services/color-consultation", "/services/fine-finishes",
    "/services/pressure-cleaning", "/services/paint-restoration", "/services/protective-coatings",
    "/industries", "/industries/residential", "/industries/commercial", "/industries/industrial", "/industries/hoa",
    "/servicearea", "/gallery", "/gallery/cabinets", "/gallery/commercial", "/gallery/decks", "/gallery/exterior",
    "/gallery/hoa", "/gallery/industrial", "/gallery/interior", "/gallery/residential", "/gallery/specialty",
    "/gallery/protective-coatings", "/gallery/pressure-washing", "/gallery/restoration",
    "/blog", "/faqs", "/process", "/contact", "/quote", "/schedule", "/careers", "/tradepartners", "/partners/directory",
    "/privacy", "/terms",
  ]
  const [adminPosts, cmsPosts] = await Promise.all([getPublishedAdminBlogPosts(), getSiteContentstackBlogPosts()])
  const blogSlugs = new Set([
    ...publishedBlogPosts.map((post) => post.slug),
    ...adminPosts.map((post) => post.slug),
    ...cmsPosts.map((post) => post.slug),
  ])
  const blogRoutes = Array.from(blogSlugs, (slug) => `/blog/${slug}`)
  const allRoutes = Array.from(new Set([...routes, ...blogRoutes]))
  return allRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
