import type { Metadata } from "next"
import GalleryPageClient from "../../components/gallery-page-client"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("portfolio", "/gallery")

export default function GalleryPage() {
  return <GalleryPageClient />
}
