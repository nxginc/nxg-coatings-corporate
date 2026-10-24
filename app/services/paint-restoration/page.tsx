import type { Metadata } from "next"
import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"

export const metadata: Metadata = {
  title: "Paint Restoration Services | NXG Coatings",
  description: "Repair and repainting scopes for worn or damaged painted surfaces in the Twin Cities.",
  alternates: { canonical: "https://nxgcoatingsinc.com/services/paint-restoration" },
}

export default function PaintRestorationPage() {
  return <ServiceLandingPage service={servicePages.restoration} />
}
