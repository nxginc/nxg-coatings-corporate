import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"

export default function CabinetRefinishingPage() {
  return <ServiceLandingPage service={servicePages.cabinets} />
}