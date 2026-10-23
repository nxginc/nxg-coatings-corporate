export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  readTime?: string
  coverImage?: string
  category?: string
  featured?: boolean
  author?: {
    name: string
    avatar?: string
  }
}
