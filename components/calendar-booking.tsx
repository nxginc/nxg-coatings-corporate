"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FancyButton } from "@/components/ui/fancy-button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export function CalendarBooking() {
  const [consultationType, setConsultationType] = useState<"virtual" | "in-person">("virtual")

  const handleBooking = (type: "virtual" | "in-person") => {
    const url =
      type === "virtual"
        ? "https://cal.com/nxgcoatings/virtual-consultation"
        : "https://cal.com/nxgcoatings/in-person-consultation"
    window.open(url, "_blank")
  }

  return (
    <div className="w-full">
      <Tabs
        defaultValue="virtual"
        className="w-full"
        onValueChange={(value) => setConsultationType(value as "virtual" | "in-person")}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="virtual">Virtual</TabsTrigger>
          <TabsTrigger value="in-person">In-Person</TabsTrigger>
        </TabsList>

        <TabsContent value="virtual" className="space-y-4">
          <div className="aspect-video relative rounded-md overflow-hidden border">
            <Image
              src="https://sjc.microlink.io/RxFKY6Ch0G_7Kmt_Ai9WxDF_mQhQgAl0A-rzoyxrxl2luJKB5UKzMzyu3LHd2GK21wNloMEr23put6_OAH7jEQ.jpeg"
              alt="Virtual consultation calendar"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p>30-minute virtual consultation via Zoom</p>
            <p>Discuss your project from the comfort of your home</p>
          </div>
          <FancyButton variant="gradient" className="w-full" onClick={() => handleBooking("virtual")}>
            Book Virtual Consultation
            <ExternalLink className="ml-2 h-4 w-4" />
          </FancyButton>
        </TabsContent>

        <TabsContent value="in-person" className="space-y-4">
          <div className="aspect-video relative rounded-md overflow-hidden border">
            <Image
              src="https://sjc.microlink.io/9WRdfls7QuE8UWzYI9p05RMbc9c3yyXdP5y-UPLQ5U9sn8AbytYH0l7ISlgcYpDcNEPAXVlAcapOqiVdhIYfhg.jpeg"
              alt="In-person consultation calendar"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p>28-minute in-person consultation at your property</p>
            <p>Get personalized advice from our coating specialists</p>
          </div>
          <FancyButton variant="gradient" className="w-full" onClick={() => handleBooking("in-person")}>
            Book In-Person Consultation
            <ExternalLink className="ml-2 h-4 w-4" />
          </FancyButton>
        </TabsContent>
      </Tabs>
    </div>
  )
}
