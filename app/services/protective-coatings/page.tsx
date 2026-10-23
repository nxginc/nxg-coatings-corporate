import type { Metadata } from "next"
import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"

export const metadata: Metadata = {
  title: "Protective Coatings | NXG Coatings",
  description: "Protective coating scopes for commercial and industrial properties across the Twin Cities.",
  alternates: { canonical: "https://nxgcoatingsinc.com/services/protective-coatings" },
}

export default function ProtectiveCoatingsPage() {
  return <ServiceLandingPage service={servicePages.protectiveCoatings} />
}
