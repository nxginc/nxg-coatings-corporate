import { redirect } from "next/navigation"
import DashboardClient from "./DashboardClient"
import { getAdminSession } from "@/lib/auth"

export default async function DashboardPage() {
  if (!(await getAdminSession())) redirect("/login")
  return <DashboardClient />
}
