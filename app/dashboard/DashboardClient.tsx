"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"
import { FancyButton } from "@/components/ui/fancy-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, DollarSign, BarChart2, Clock, FileText } from "lucide-react"

export default function DashboardClient() {
  // Mock session for demo purposes
  const status = "authenticated"
  const session = {
    user: {
      name: "Admin User",
      email: "admin@example.com",
    },
  }
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user?.name || "Admin"}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <FancyButton variant="gradient" size="lg" hasArrow={true} rounded="full">
              Create New Project
            </FancyButton>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,780</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Estimates</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">-2 from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects and Upcoming Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest painting and coating projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Johnson Residence Exterior",
                    status: "Completed",
                    date: "May 15, 2025",
                    image:
                      "https://ik.imagekit.io/j98e6hcfnkn/Gallery/exterior-1_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                  },
                  {
                    name: "Oakridge Office Building",
                    status: "In Progress",
                    date: "May 10, 2025",
                    image:
                      "https://ik.imagekit.io/j98e6hcfnkn/Gallery/commercial-1_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                  },
                  {
                    name: "Williams Kitchen Cabinets",
                    status: "Completed",
                    date: "May 5, 2025",
                    image: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/cabinet-1_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                  },
                  {
                    name: "Thompson Deck Restoration",
                    status: "Completed",
                    date: "April 28, 2025",
                    image: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/deck-1_Xt7Hs9Kkl.jpg?updatedAt=1741216795011",
                  },
                ].map((project, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{project.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            project.status === "Completed" ? "bg-green-500" : "bg-blue-500"
                          }`}
                        ></span>
                        {project.status} • {project.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <FancyButton variant="outline" className="w-full" hasArrow={true}>
                  View All Projects
                </FancyButton>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
              <CardDescription>Your appointments and project timelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Client Consultation",
                    client: "Robert Anderson",
                    time: "9:00 AM - 10:00 AM",
                    date: "May 20, 2025",
                    type: "consultation",
                  },
                  {
                    title: "Project Start",
                    client: "Riverdale Apartments",
                    time: "8:00 AM",
                    date: "May 22, 2025",
                    type: "project",
                  },
                  {
                    title: "Color Selection",
                    client: "Emily Parker",
                    time: "2:00 PM - 3:00 PM",
                    date: "May 23, 2025",
                    type: "consultation",
                  },
                  {
                    title: "Final Inspection",
                    client: "Oakridge Office Building",
                    time: "4:00 PM",
                    date: "May 25, 2025",
                    type: "inspection",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-brand-blue/10 p-2 rounded-md flex-shrink-0">
                      {event.type === "consultation" ? (
                        <Users className="h-5 w-5 text-brand-blue" />
                      ) : event.type === "inspection" ? (
                        <FileText className="h-5 w-5 text-brand-blue" />
                      ) : (
                        <Clock className="h-5 w-5 text-brand-blue" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.client}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}, {event.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <FancyButton variant="outline" className="w-full" hasArrow={true}>
                  View Full Calendar
                </FancyButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
