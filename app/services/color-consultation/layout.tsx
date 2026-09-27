import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("colorConsultation", "/services/color-consultation")

export default function ColorConsultationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
