import type { Metadata } from "next"
import GalleryPageClient from "../../components/gallery-page-client"

export const metadata: Metadata = {
  title: "Project Gallery | NXG Coatings",
  description:
    "Browse our gallery of completed painting and coating projects. See the quality and craftsmanship we bring to every job.",
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
