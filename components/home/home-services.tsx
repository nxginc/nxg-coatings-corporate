import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Reveal from "@/components/reveal"

const SERVICES = [
  {
    title: "Interior Painting",
    description: "Flawless walls, ceilings, and trim with meticulous prep and clean lines.",
    image: "/images/services/interior.png",
    href: "/services/interior-painting",
    featured: true,
  },
  {
    title: "Exterior Painting",
    description: "Weatherproof protection engineered for long-term durability.",
    image: "/images/services/exterior.png",
    href: "/services/exterior-painting",
  },
  {
    title: "Cabinet Refinishing",
    description: "Factory-smooth, hand-finished cabinetry that transforms a room.",
    image: "/images/services/cabinets.png",
    href: "/services/cabinet-refinishing",
  },
  {
    title: "Deck & Stain",
    description: "Rich, penetrating stains that revive and seal exterior wood.",
    image: "/images/services/deck.png",
    href: "/services/deck-staining",
  },
]

export default function HomeServices() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal as="p" className="overline">
              What we do
            </Reveal>
            <Reveal as="h2" className="mt-5 text-display-sm font-semibold text-brand-ink" delay={80}>
              A complete finish, handled end to end.
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-royal"
            >
              All services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.href}
              delay={i * 90}
              className={service.featured ? "md:col-span-2 lg:col-span-2 lg:row-span-1" : ""}
            >
              <Link
                href={service.href}
                className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/25 to-transparent" />
                <div className="relative z-10 p-7 text-brand-bone">
                  <h3 className="font-serif text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/75">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-overline text-brand-ember">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
