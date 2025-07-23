"use client"

import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const services = [
  {
    title: "Exterior Painting",
    description: "Boost curb appeal and protect your home from the elements.",
    image: "/images/services/slider/exterior.png",
    href: "/services/exterior-painting",
  },
  {
    title: "Interior Painting",
    description: "Transform your living spaces with fresh color and a flawless finish.",
    image: "/images/services/slider/interior.png",
    href: "/services/interior-painting",
  },
  {
    title: "Deck Staining",
    description: "Revitalize and protect your outdoor decks and wooden features.",
    image: "/images/services/slider/deck.png",
    href: "/services/deck-staining",
  },
  {
    title: "Cabinet Refinishing",
    description: "A cost-effective way to give your kitchen a stunning modern update.",
    image: "/images/services/slider/cabinets.png",
    href: "/services/cabinet-refinishing",
  },
  {
    title: "Color Consultation",
    description: "Expert guidance to help you find the perfect palette for your home.",
    image: "/images/services/slider/color.png",
    href: "/services/color-consultation",
  },
]

export default function ServicesSlider() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Core Services</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              From single rooms to entire industrial complexes, we have the expertise to handle any project.
            </p>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="group relative block overflow-hidden rounded-lg shadow-lg">
                    <Link href={service.href}>
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        width={600}
                        height={400}
                        className="h-64 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
                      <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                        <p className="text-sm text-gray-200">{service.description}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
        </Carousel>
      </div>
    </section>
  )
}
