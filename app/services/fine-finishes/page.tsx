import ServiceLandingPage from "@/components/service-landing-page"
import { servicePages } from "@/data/service-pages"
import { seo } from "@/lib/seo"

export const metadata = seo("fineFinishes", "/services/fine-finishes")

export default function FineFinishesPage() {
  return <ServiceLandingPage service={servicePages.fineFinishes} />
}
