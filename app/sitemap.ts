import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/", "/about", "/services", "/services/interior-painting", "/services/exterior-painting",
    "/services/deck-staining", "/services/cabinet-refinishing", "/services/color-consultation",
    "/industries", "/gallery", "/blog", "/faqs", "/process", "/contact", "/quote",
  ]
  return routes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
