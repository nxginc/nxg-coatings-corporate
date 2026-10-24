import { redirect } from "next/navigation"
import TradePartnerQueue from "./TradePartnerQueue"
import { getAdminSession } from "@/lib/auth"

export default async function TradePartnerApplicationsPage() {
  if (!(await getAdminSession())) redirect("/login")
  return <TradePartnerQueue />
}
