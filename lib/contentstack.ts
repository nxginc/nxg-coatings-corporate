import { z } from "zod"
import { ASSETS } from "@/lib/assets"
import type { BlogPostMeta } from "@/data/blog-posts"
import { isIntegrationEnabled } from "@/lib/integration-state"

const responseSchema = z.object({
  entries: z.array(z.record(z.unknown())),
})

const regionHosts: Record<string, string> = {
  us: "https://cdn.contentstack.io/v3",
  eu: "https://eu-cdn.contentstack.com/v3",
  au: "https://au-cdn.contentstack.com/v3",
}

export type ContentstackConfig = {
  apiKey: string
  deliveryToken: string
  environment: string
  region: string
  blogContentType: string
  locale: string
  apiBaseUrl: string
}

function getContentstackConfig(): ContentstackConfig | null {
  const apiKey = process.env.CONTENTSTACK_API_KEY?.trim()
  const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN?.trim()
  const environment = process.env.CONTENTSTACK_ENVIRONMENT?.trim()
  const region = process.env.CONTENTSTACK_REGION?.trim().toLocaleLowerCase()
  const blogContentType = process.env.CONTENTSTACK_BLOG_CONTENT_TYPE_UID?.trim()
  if (!apiKey || !deliveryToken || !environment || !region || !blogContentType) return null
  const apiBaseUrl = regionHosts[region]
  if (!apiBaseUrl) throw new Error(`Unsupported Contentstack region "${region}". Use us, eu, or au.`)
  return {
    apiKey,
    deliveryToken,
    environment,
    region,
    blogContentType,
    locale: process.env.CONTENTSTACK_LOCALE?.trim() || "en-us",
    apiBaseUrl,
  }
}

function getString(entry: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = entry[key]
    if (typeof value === "string" && value.trim()) return value.trim()
  }
  return ""
}

function getBody(value: unknown): string {
  if (typeof value === "string") return value.trim()
  if (Array.isArray(value)) return value.map(getBody).filter(Boolean).join("\n\n")
  if (!value || typeof value !== "object") return ""
  const record = value as Record<string, unknown>
  if (typeof record.text === "string") return record.text
  return getBody(record.children ?? record.content)
}

function getImageUrl(value: unknown): string | undefined {
  if (Array.isArray(value)) return getImageUrl(value[0])
  if (!value || typeof value !== "object") return undefined
  const url = (value as Record<string, unknown>).url
  if (typeof url !== "string") return undefined
  try {
    const parsed = new URL(url)
    if (parsed.protocol === "https:" && parsed.hostname.endsWith(".contentstack.io")) return parsed.toString()
  } catch {
    return undefined
  }
  return undefined
}

function toBlogPost(entry: Record<string, unknown>): BlogPostMeta | null {
  const title = getString(entry, "title", "name")
  const rawSlug = getString(entry, "slug", "url")
  const slug = rawSlug.replace(/^\/+|\/+$/g, "").replace(/^blog\//, "")
  const excerpt = getString(entry, "excerpt", "summary", "seo_description")
  if (!title || !excerpt || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null
  const rawDate = getString(entry, "publish_date", "published_at", "date")
  const parsedDate = rawDate ? new Date(rawDate) : null
  if (!parsedDate || Number.isNaN(parsedDate.getTime())) return null
  const publishDate = parsedDate && !Number.isNaN(parsedDate.getTime())
    ? parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
    : ""
  const bodyMarkdown = getBody(entry.body_markdown ?? entry.body ?? entry.content)
  const wordCount = bodyMarkdown.split(/\s+/).filter(Boolean).length
  const category = getString(entry, "category") || "Updates"
  const authorName = getString(entry, "author_name") || "NXG Coatings Team"
  return {
    slug,
    title,
    excerpt,
    publishDate,
    readTime: getString(entry, "read_time") || `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
    coverImage: getImageUrl(entry.featured_image) || getImageUrl(entry.cover_image) || ASSETS.services.interior,
    category,
    featured: entry.featured === true,
    published: true,
    author: { name: authorName, avatar: ASSETS.blog.authorAvatar },
    article: bodyMarkdown ? { introduction: bodyMarkdown, sections: [], conclusion: "" } : undefined,
  }
}

export async function fetchContentstackBlogPosts(options: { cache?: boolean } = {}): Promise<BlogPostMeta[]> {
  const config = getContentstackConfig()
  if (!config) return []
  const url = new URL(
    `${config.apiBaseUrl}/content_types/${encodeURIComponent(config.blogContentType)}/entries`,
  )
  url.searchParams.set("environment", config.environment)
  url.searchParams.set("locale", config.locale)
  url.searchParams.set("limit", "100")

  const response = await fetch(url, {
    headers: {
      api_key: config.apiKey,
      access_token: config.deliveryToken,
    },
    ...(options.cache === false
      ? { cache: "no-store" as const }
      : { next: { revalidate: 300, tags: ["contentstack-blog"] } }),
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) {
    throw new Error(`Contentstack blog delivery returned HTTP ${response.status}.`)
  }
  const payload = responseSchema.safeParse(await response.json())
  if (!payload.success) throw new Error("Contentstack blog response did not match the expected entry format.")
  return payload.data.entries.map(toBlogPost).filter((post): post is BlogPostMeta => post !== null)
}

export async function getSiteContentstackBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    if (!getContentstackReadiness().configured || !(await isIntegrationEnabled("contentstack"))) return []
    return await fetchContentstackBlogPosts()
  } catch (error) {
    console.error("Contentstack blog delivery failed; serving the local editorial fallback.", error)
    return []
  }
}

export function getContentstackReadiness() {
  let config: ContentstackConfig | null
  try {
    config = getContentstackConfig()
  } catch (error) {
    return {
      configured: false,
      missingEnv: [],
      configurationError: error instanceof Error ? error.message : "Contentstack configuration is invalid.",
    }
  }
  if (!config) {
    const missingEnv = [
      "CONTENTSTACK_API_KEY",
      "CONTENTSTACK_DELIVERY_TOKEN",
      "CONTENTSTACK_ENVIRONMENT",
      "CONTENTSTACK_REGION",
      "CONTENTSTACK_BLOG_CONTENT_TYPE_UID",
    ].filter((name) => !process.env[name]?.trim())
    return { configured: false, missingEnv }
  }
  return { configured: true, missingEnv: [] }
}
