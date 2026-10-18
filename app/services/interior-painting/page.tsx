import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"

export default function InteriorPaintingPage() {
  return <ServiceLandingPage service={servicePages.interior} />
}