import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("about", "/about")

export default function AboutPage() {
  return <AboutPageClient />
}
