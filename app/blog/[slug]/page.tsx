import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPost from "@/components/blog-post"
import RelatedPosts from "@/components/related-posts"
import { blogPosts, publishedBlogPosts } from "@/data/blog-posts"
import { ASSETS } from "@/lib/assets"

type BlogArticlePageProps = {
  params: { slug: string }
}

function getArticle(slug: string) {
  return blogPosts.find((post) => post.slug === slug && post.published === true && post.article)
}

export function generateStaticParams() {
  return publishedBlogPosts.filter((post) => post.article).map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: BlogArticlePageProps): Metadata {
  const post = getArticle(params.slug)
  if (!post) return {}
  const url = `https://nxgcoatingsinc.com/blog/${post.slug}`
  return {
    title: `${post.title} | NXG Coatings`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: [{ url: post.coverImage, alt: post.title }],
    },
  }
}

export default function EditorialBlogArticlePage({ params }: BlogArticlePageProps) {
  const post = getArticle(params.slug)
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
