import { unstable_cache } from "next/cache"
import { getDatabase } from "@/lib/db"
import { NXG_COMPANY_ID } from "@/lib/company"

export type AdminPublishedBlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  bodyMarkdown: string
  category: string
  authorName: string
  publishedAt: string
}

const readPublishedAdminBlogPosts = unstable_cache(async (): Promise<AdminPublishedBlogPost[]> => {
  const database = getDatabase()
  if (!database) return []
  const { rows } = await database.query<AdminPublishedBlogPost>(
    `select id, slug, title, excerpt, body_markdown as "bodyMarkdown", category,
            author_name as "authorName", published_at::text as "publishedAt"
     from nxg_blog_posts
     where company_id = $1 and status = 'published'
     order by published_at desc limit 100`,
    [NXG_COMPANY_ID],
  )
  return rows
}, [`nxg-public-blog-posts-${NXG_COMPANY_ID}`], { revalidate: 300, tags: ["editorial-blog"] })

const readPublishedAdminBlogPost = unstable_cache(async (slug: string): Promise<AdminPublishedBlogPost | null> => {
  const database = getDatabase()
  if (!database) return null
  const { rows } = await database.query<AdminPublishedBlogPost>(
    `select id, slug, title, excerpt, body_markdown as "bodyMarkdown", category,
            author_name as "authorName", published_at::text as "publishedAt"
     from nxg_blog_posts
     where company_id = $1 and status = 'published' and slug = $2
     limit 1`,
    [NXG_COMPANY_ID, slug],
  )
  return rows[0] || null
}, [`nxg-public-blog-post-${NXG_COMPANY_ID}`], { revalidate: 300, tags: ["editorial-blog"] })

export function getPublishedAdminBlogPosts() {
  return readPublishedAdminBlogPosts()
}

export function getPublishedAdminBlogPost(slug: string) {
  return readPublishedAdminBlogPost(slug)
}
