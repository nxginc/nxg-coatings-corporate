"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FancyButton } from "@/components/ui/fancy-button"
import { Calendar, Clock, MapPin, Video } from "lucide-react"
import Image from "next/image"

export default function ConsultationBooking() {
  const [consultationType, setConsultationType] = useState<"virtual" | "in-person">("virtual")

  const handleBooking = (type: "virtual" | "in-person") => {
    const url =
      type === "virtual"
        ? "https://cal.com/nxgcoatings/virtual-consultation"
        : "https://cal.com/nxgcoatings/in-person-consultation"
    window.open(url, "_blank")
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Schedule a Consultation</h2>

      <Tabs
        defaultValue="virtual"
        className="w-full"
        onValueChange={(value) => setConsultationType(value as "virtual" | "in-person")}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="virtual" className="text-lg py-3">
            <Video className="mr-2 h-5 w-5" />
            Virtual Consultation
          </TabsTrigger>
          <TabsTrigger value="in-person" className="text-lg py-3">
            <MapPin className="mr-2 h-5 w-5" />
            In-Person Consultation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="virtual">
          <Card className="border-2 border-brand-blue/10">
            <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-brand-lightBlue/5">
              <CardTitle className="text-2xl flex items-center">
                <Video className="mr-3 h-6 w-6 text-brand-blue" />
                Virtual Coatings Consultation
              </CardTitle>
              <CardDescription className="text-base">
                Connect with our coating professionals from the comfort of your home
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 mt-1 text-brand-blue" />
                  <div>
                    <h3 className="font-medium">30 Minutes</h3>
                    <p className="text-sm text-muted-foreground">Quick and convenient video consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 mt-1 text-brand-blue" />
                  <div>
                    <h3 className="font-medium">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Choose a time that works for you</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Image
                    src="https://sjc.microlink.io/RxFKY6Ch0G_7Kmt_Ai9WxDF_mQhQgAl0A-rzoyxrxl2luJKB5UKzMzyu3LHd2GK21wNloMEr23put6_OAH7jEQ.jpeg"
                    alt="Virtual consultation calendar"
                    width={600}
                    height={400}
                    className="rounded-lg border shadow-sm"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-gradient-to-r from-brand-blue/5 to-brand-lightBlue/10 py-4">
              <FancyButton
                variant="shine"
                size="lg"
                hasArrow={true}
                rounded="full"
                onClick={() => handleBooking("virtual")}
              >
                Book Virtual Consultation
              </FancyButton>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="in-person">
          <Card className="border-2 border-brand-blue/10">
            <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-brand-lightBlue/5">
              <CardTitle className="text-2xl flex items-center">
                <MapPin className="mr-3 h-6 w-6 text-brand-blue" />
                In-Person Coatings Consultation
              </CardTitle>
              <CardDescription className="text-base">
                Experience a personalized one-on-one consultation with our experts
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 mt-1 text-brand-blue" />
                  <div>
                    <h3 className="font-medium">28 Minutes</h3>
                    <p className="text-sm text-muted-foreground">Detailed in-person assessment and consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 mt-1 text-brand-blue" />
                  <div>
                    <h3 className="font-medium">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Choose a time that works for you</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Image
                    src="https://sjc.microlink.io/9WRdfls7QuE8UWzYI9p05RMbc9c3yyXdP5y-UPLQ5U9sn8AbytYH0l7ISlgcYpDcNEPAXVlAcapOqiVdhIYfhg.jpeg"
                    alt="In-person consultation calendar"
                    width={600}
                    height={400}
                    className="rounded-lg border shadow-sm"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-gradient-to-r from-brand-blue/5 to-brand-lightBlue/10 py-4">
              <FancyButton
                variant="shine"
                size="lg"
                hasArrow={true}
                rounded="full"
                onClick={() => handleBooking("in-person")}
              >
                Book In-Person Consultation
              </FancyButton>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
