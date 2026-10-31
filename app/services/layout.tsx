import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("services", "/services")

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
