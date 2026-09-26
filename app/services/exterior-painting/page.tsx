import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"

export default function ExteriorPaintingPage() {
  return <ServiceLandingPage service={servicePages.exterior} />
}