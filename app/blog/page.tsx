import type { Metadata } from "next"
import BlogIndex from "@/components/blog-index"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("blog", "/blog")

export default function BlogPage() {
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
      <BlogIndex />
    </main>
  )
}