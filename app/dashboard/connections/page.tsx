import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import IntegrationConnections from "@/components/integration-connections"
import { authOptions } from "@/lib/auth-options"

export default async function ConnectionsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) redirect("/login")
    return <IntegrationConnections />
}