import type React from "react"
import type { Metadata } from "next"
import { seo } from "@/lib/seo"

export const metadata: Metadata = seo("deckStaining", "/services/deck-staining")

export default function DeckStainingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
