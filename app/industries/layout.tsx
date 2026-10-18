import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("industries", "/industries")

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
