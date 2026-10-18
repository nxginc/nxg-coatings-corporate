import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Painting & Coating Process | NXG Coatings",
  description: "Learn how NXG Coatings approaches consultation, preparation, application and inspection for painting and coating projects.",
  alternates: { canonical: "https://nxgcoatingsinc.com/process" },
}

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
