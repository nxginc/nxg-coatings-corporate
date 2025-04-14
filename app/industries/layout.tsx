import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industries We Serve | NXG Coatings",
  description: "Specialized coating solutions for residential, commercial, industrial, and multi-family properties.",
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
