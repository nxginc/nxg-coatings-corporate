"use client"

import BlogPost from "@/components/blog-post"
import RelatedPosts from "@/components/related-posts"
import { publishedBlogPosts } from "@/data/blog-posts"
import { ASSETS } from "@/lib/assets"

export default function CabinetRefinishingGuidePage() {
  return (
    <>
      <BlogPost
        title="The Ultimate Guide to Cabinet Refinishing"
        excerpt="Transform your kitchen or bathroom with our expert cabinet refinishing guide."
        publishDate="August 12, 2025"
        readTime="8 min read"
        coverImage="https://ik.imagekit.io/j98e6hcfnkn/Services/CabinetRefinishing_MN_8XLSgP4b9.jpg?updatedAt=1666953740495"
        author={{ name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar }}
        content={
          <>
            <p>
              Transform your kitchen or bathroom with our expert cabinet refinishing guide. Here is what our crews recommend.
            </p>

            <h2>Why refinish instead of replace</h2>
            <p>
              Refinishing typically costs a fraction of replacement, keeps your existing layout, and can be completed in days rather than weeks.
            </p>

            <h2>Preparation decides the result</h2>
            <p>
              Doors and drawer fronts are removed, labeled, degreased, scuffed, and repaired. Hardware is removed and openings are filled or updated as needed.
            </p>

            <h2>Primer and coatings</h2>
            <p>
              A bonding primer followed by a durable cabinet-grade enamel resists wear, moisture, and cleaning. Sprayed finishes deliver the smoothest, most uniform look.
            </p>

            <h2>Hardware and details</h2>
            <p>
              New pulls, hinges, and soft-close upgrades make the biggest visual difference for little cost. Plan the hardware before painting so holes are finished once.
            </p>

            <h2>Care after refinishing</h2>
            <p>
              Allow the finish to fully cure before heavy use, use gentle non-abrasive cleaners, and avoid harsh chemicals to preserve the coating.
            </p>
          </>
        }
      />
      <div className="container mx-auto px-4 sm:px-6">
        <RelatedPosts currentPostSlug="cabinet-refinishing-guide" posts={publishedBlogPosts} category="Interior" />
      </div>
    </>
  )
}
