import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("faqs", "/faqs")

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
