import type { Metadata } from "next"
import TradePartnerApplication from "./TradePartnerApplication"

export const metadata: Metadata = {
  title: "Trade Partners | NXG Coatings",
  description: "Apply to join the NXG Coatings trade partner network.",
}

export default function TradePartnersPage() {
  return <TradePartnerApplication />
}
