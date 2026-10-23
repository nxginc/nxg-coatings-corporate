import type { Metadata } from "next"
import GalleryPageClient from "./GalleryPageClient"

export const metadata: Metadata = {
  title: "Service Gallery | NXG Coatings",
  description: "Explore NXG Coatings service imagery across residential, commercial, and industrial work.",
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
