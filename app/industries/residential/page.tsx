import IndustryLandingPage from "@/components/industry-landing-page"
import { industryPages } from "@/data/industry-pages"

export default function ResidentialIndustryPage() {
  return <IndustryLandingPage industry={industryPages.residential} />
}
