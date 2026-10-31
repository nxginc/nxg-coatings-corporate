import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"

export default function DeckStainingPage() {
  return <ServiceLandingPage service={servicePages.deck} />
}