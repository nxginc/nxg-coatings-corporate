import type { Metadata } from "next"
import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"

export const metadata: Metadata = {
  title: "Pressure Cleaning Services | NXG Coatings",
  description: "Surface cleaning and preparation for exterior and outdoor painting projects across the Twin Cities.",
  alternates: { canonical: "https://nxgcoatingsinc.com/services/pressure-cleaning" },
}

export default function PressureCleaningPage() {
  return <ServiceLandingPage service={servicePages.pressureCleaning} />
}
