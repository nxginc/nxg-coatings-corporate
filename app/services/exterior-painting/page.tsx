import type { Metadata } from "next"
import ExteriorPaintingClientPage from "./ExteriorPaintingClientPage"

export const metadata: Metadata = {
  title: "Exterior Painting Services | NXG Coatings",
  description:
    "Transform and protect your home with our professional exterior painting services. Premium materials and expert application for lasting results.",
}

export default function ExteriorPaintingPage() {
  return <ExteriorPaintingClientPage />
}
