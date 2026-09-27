import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LeadsDashboard from "@/components/leads-dashboard"
import { authOptions } from "@/lib/auth-options"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/login")
  return <LeadsDashboard />
}
