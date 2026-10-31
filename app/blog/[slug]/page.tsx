import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPost from "@/components/blog-post"
import RelatedPosts from "@/components/related-posts"
import { blogPosts, publishedBlogPosts } from "@/data/blog-posts"
import { ASSETS } from "@/lib/assets"
import { getPublishedAdminBlogPost } from "@/lib/editorial-blog"
import { getSiteContentstackBlogPosts } from "@/lib/contentstack"
import type { ReactNode } from "react"

type BlogArticlePageProps = {
  params: { slug: string }
}

function getArticle(slug: string) {
  return blogPosts.find((post) => post.slug === slug && post.published === true && post.article)
}

export function generateStaticParams() {
  return publishedBlogPosts.filter((post) => post.article).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const post = getArticle(params.slug)
  const [editorialPost, cmsPosts] = post ? [null, []] : await Promise.all([getPublishedAdminBlogPost(params.slug), getSiteContentstackBlogPosts()])
  const cmsPost = cmsPosts.find((item) => item.slug === params.slug)
  const title = post?.title || editorialPost?.title || cmsPost?.title
  const excerpt = post?.excerpt || editorialPost?.excerpt || cmsPost?.excerpt
  if (!title || !excerpt) return {}
  const canonicalSlug = post?.slug || editorialPost?.slug || cmsPost?.slug || params.slug
  const coverImage = post?.coverImage || cmsPost?.coverImage || ASSETS.services.interior
  const url = `https://nxgcoatingsinc.com/blog/${canonicalSlug}`
  return {
    title: `${title} | NXG Coatings`,
    description: excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: excerpt,
      url,
      images: [{ url: coverImage, alt: title }],
    },
  }
}

function renderMarkdown(markdown: string): ReactNode {
  const blocks = markdown.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)
  return blocks.map((block, index) => {
    const heading = block.match(/^#{2,3}\s+(.+)$/)
    if (heading) return <h2 key={index}>{heading[1]}</h2>
    const listItems = block.split("\n").map((line) => line.match(/^\s*[-*]\s+(.+)$/)?.[1]).filter((line): line is string => Boolean(line))
    if (listItems.length) return <ul key={index}>{listItems.map((item) => <li key={item}>{item}</li>)}</ul>
    return <p key={index}>{block.replace(/\n/g, " ")}</p>
  })
}

export default async function EditorialBlogArticlePage({ params }: BlogArticlePageProps) {
  const post = getArticle(params.slug)
  const [editorialPost, cmsPosts] = post ? [null, []] : await Promise.all([getPublishedAdminBlogPost(params.slug), getSiteContentstackBlogPosts()])
  const cmsPost = cmsPosts.find((item) => item.slug === params.slug)
  if (!post && !editorialPost && !cmsPost) notFound()

  if (editorialPost) {
    return <>
      <BlogPost
        title={editorialPost.title}
        excerpt={editorialPost.excerpt}
        publishDate={new Date(editorialPost.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
        readTime={`${Math.max(1, Math.ceil(editorialPost.bodyMarkdown.trim().split(/\s+/).filter(Boolean).length / 220))} min read`}
        coverImage={ASSETS.services.interior}
        author={{ name: editorialPost.authorName, avatar: ASSETS.blog.authorAvatar }}
        content={renderMarkdown(editorialPost.bodyMarkdown)}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <RelatedPosts currentPostSlug={editorialPost.slug} posts={publishedBlogPosts} category={editorialPost.category} />
      </div>
    </>
  }
  if (cmsPost) {
    return <>
      <BlogPost
        title={cmsPost.title}
        excerpt={cmsPost.excerpt}
        publishDate={cmsPost.publishDate}
        readTime={cmsPost.readTime}
        coverImage={cmsPost.coverImage}
        author={cmsPost.author}
        content={renderMarkdown(cmsPost.article?.introduction || "")}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <RelatedPosts currentPostSlug={cmsPost.slug} posts={publishedBlogPosts} category={cmsPost.category} />
      </div>
    </>
  }
  if (!post?.article) notFound()

  return <>
    <BlogPost
      title={post.title}
      excerpt={post.excerpt}
      publishDate={post.publishDate}
      readTime={post.readTime}
      coverImage={post.coverImage}
      author={{ name: post.author.name, avatar: ASSETS.blog.authorAvatar }}
      content={
        <>
          <p>{post.article.introduction}</p>
          {post.article.sections.map((section) => <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>)}
          <h2>Next step</h2>
          <p>{post.article.conclusion}</p>
        </>
      }
    />
    <div className="container mx-auto px-4 sm:px-6">
      <RelatedPosts currentPostSlug={post.slug} posts={publishedBlogPosts} category={post.category} />
    </div>
  </>
}
