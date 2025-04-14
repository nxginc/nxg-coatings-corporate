import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Us | NXG Coatings",
  description:
    "Learn about NXG Coatings, our mission, values, and the professional team behind our premium coating services.",
}

export default function AboutPage() {
  return <AboutPageClient />
}
