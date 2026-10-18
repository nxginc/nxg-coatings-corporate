import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("blog", "/blog")

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
