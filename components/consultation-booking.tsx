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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Book Today</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Schedule a Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with our coating professionals for a personalized consultation tailored to your needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">

      <Tabs
        defaultValue="virtual"
        className="w-full"
        onValueChange={(value) => setConsultationType(value as "virtual" | "in-person")}
      >
        <TabsList className="grid w-full grid-cols-2 mb-10 bg-secondary/50 p-1.5 rounded-xl">
          <TabsTrigger value="virtual" className="text-base py-3.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-premium">
            <Video className="mr-2.5 h-5 w-5" />
            Virtual Consultation
          </TabsTrigger>
          <TabsTrigger value="in-person" className="text-base py-3.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-premium">
            <MapPin className="mr-2.5 h-5 w-5" />
            In-Person Consultation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="virtual">
          <Card className="border border-border/50 shadow-premium-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-secondary/30 pb-6">
              <CardTitle className="text-2xl flex items-center font-serif">
                <div className="bg-accent/10 p-2.5 rounded-xl mr-4">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                Virtual Coatings Consultation
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Connect with our coating professionals from the comfort of your home
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-6">
              <div className="grid gap-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">30 Minutes</h3>
                    <p className="text-sm text-muted-foreground">Quick and convenient video consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Choose a time that works for you</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Image
                    src={require("@/lib/assets").ASSETS.consultation.virtual}
                    alt="Virtual consultation calendar"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-premium w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-secondary/20 py-5 px-6">
              <FancyButton
                variant="accent"
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
          <Card className="border border-border/50 shadow-premium-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-secondary/30 pb-6">
              <CardTitle className="text-2xl flex items-center font-serif">
                <div className="bg-accent/10 p-2.5 rounded-xl mr-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                In-Person Coatings Consultation
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Experience a personalized one-on-one consultation with our experts
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-6">
              <div className="grid gap-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">28 Minutes</h3>
                    <p className="text-sm text-muted-foreground">Detailed in-person assessment and consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Choose a time that works for you</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Image
                    src={require("@/lib/assets").ASSETS.consultation.inPerson}
                    alt="In-person consultation calendar"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-premium w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-secondary/20 py-5 px-6">
              <FancyButton
                variant="accent"
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
      </div>
    </section>
  )
}
