"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Exterior Painting",
    description: "Boost curb appeal and protect your home from the elements.",
    image: "/images/services/slider/exterior.png",
    href: "/services/exterior-painting",
  },
  {
    title: "Interior Painting",
    description: "Refresh your living spaces with flawless, professional finishes.",
    image: "/images/services/slider/interior.png",
    href: "/services/interior-painting",
  },
  {
    title: "Deck Staining",
    description: "Revitalize and protect your deck for years of enjoyment.",
    image: "/images/services/slider/deck.png",
    href: "/services/deck-staining",
  },
  {
    title: "Cabinet Refinishing",
    description: "A cost-effective way to give your kitchen a stunning new look.",
    image: "/images/services/slider/cabinets.png",
    href: "/services/cabinet-refinishing",
  },
  {
    title: "Color Consultation",
    description: "Find the perfect palette to reflect your style and personality.",
    image: "/images/services/slider/color.png",
    href: "/services/color-consultation",
  },
]

export default function ServicesSlider() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">Our Core Services</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            From complete transformations to subtle updates, we have you covered.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem key={service.title} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="flex flex-col items-center justify-center p-0">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 text-left w-full">
                        <h3 className="text-xl font-bold text-brand-blue">{service.title}</h3>
                        <p className="text-gray-600 mt-2 mb-4 h-12">{service.description}</p>
                        <Link
                          href={service.href}
                          className="inline-flex items-center text-brand-blue font-medium hover:text-brand-red transition-colors"
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  )
}
