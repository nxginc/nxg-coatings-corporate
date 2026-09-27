import IndustryLandingPage from "@/components/industry-landing-page"
import { industryPages } from "@/data/industry-pages"

export default function CommercialIndustryPage() {
  return <IndustryLandingPage industry={industryPages.commercial} />
}