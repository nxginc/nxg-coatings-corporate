import { notFound } from "next/navigation"
import { blogPosts } from "@/data/blog-posts"
import EnhancedHero from "@/components/enhanced-hero"
import RelatedPosts from "@/components/related-posts"
import { CalendarDays, Clock, UserCircle } from "lucide-react"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <EnhancedHero title={post.title} backgroundImage={post.coverImage} height="medium" overlay="dark">
        <div className="flex items-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            <span>{post.author?.name || "NXG Team"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <span>{post.publishDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </EnhancedHero>

      <article className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="prose prose-lg max-w-none">
                {post.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3 key={index} className="font-bold text-2xl mt-8 mb-4">
                        {paragraph.replaceAll("**", "")}
                      </h3>
                    )
                  }
                  return (
                    <p key={index} className="mb-6 text-gray-700">
                      {paragraph}
                    </p>
                  )
                })}
              </div>

              <RelatedPosts currentPostSlug={post.slug} posts={blogPosts} category={post.category} />
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
