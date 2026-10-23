import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ContentWorkbench from "@/components/content-workbench"
import { authOptions } from "@/lib/auth-options"

export default async function DashboardContentPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/login")
  return <ContentWorkbench />
}