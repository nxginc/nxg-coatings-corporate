import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("interior", "/services/interior-painting")

export default function InteriorPaintingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
