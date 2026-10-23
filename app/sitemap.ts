import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { publishedBlogPosts } from "@/data/blog-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/", "/about", "/services", "/services/interior-painting", "/services/exterior-painting",
    "/services/deck-staining", "/services/cabinet-refinishing", "/services/color-consultation", "/services/fine-finishes",
    "/services/pressure-cleaning", "/services/paint-restoration", "/services/protective-coatings",
    "/industries", "/industries/residential", "/industries/commercial", "/industries/industrial", "/industries/hoa",
    "/servicearea", "/gallery", "/gallery/cabinets", "/gallery/commercial", "/gallery/decks", "/gallery/exterior",
    "/gallery/hoa", "/gallery/industrial", "/gallery/interior", "/gallery/residential", "/gallery/specialty",
    "/blog", "/faqs", "/process", "/contact", "/quote", "/schedule", "/careers", "/tradepartners", "/partners/directory",
    "/privacy", "/terms",
  ]
  const blogRoutes = publishedBlogPosts.map((post) => `/blog/${post.slug}`)
  const allRoutes = Array.from(new Set([...routes, ...blogRoutes]))
  return allRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
