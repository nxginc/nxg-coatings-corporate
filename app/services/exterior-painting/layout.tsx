import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("exterior", "/services/exterior-painting")

export default function ExteriorPaintingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
