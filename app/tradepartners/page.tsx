import type { Metadata } from "next"
import { PartnersPage } from "@/app/partners/page"

export const metadata: Metadata = {
  title: "Trade Partner Network | NXG Coatings",
  description: "Apply to join the NXG Coatings trade partner network serving the Twin Cities.",
  alternates: { canonical: "https://nxgcoatingsinc.com/tradepartners" },
  openGraph: {
    title: "Trade Partner Network | NXG Coatings",
    description: "Apply to join the NXG Coatings trade partner network serving the Twin Cities.",
    url: "https://nxgcoatingsinc.com/tradepartners",
  },
}

export default PartnersPage
