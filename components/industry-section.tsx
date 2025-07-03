import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const industries = [
  {
    name: "Residential",
    description: "Enhancing homes with durable, beautiful finishes, inside and out.",
    image: "/images/industries/residential.png",
    href: "/industries/residential",
  },
  {
    name: "Commercial",
    description: "Professional coatings that protect your investment and impress your clients.",
    image: "/images/industries/commercial.png",
    href: "/industries/commercial",
  },
  {
    name: "Industrial",
    description: "High-performance solutions for manufacturing, warehousing, and more.",
    image: "/images/industries/industrial.png",
    href: "/industries/industrial",
  },
  {
    name: "HOA & Property Management",
    description: "Reliable, uniform coatings to maintain community standards and value.",
    image: "/images/industries/hoa.png",
    href: "/industries/hoa",
  },
]

export function IndustrySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Serving Diverse Industries</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We provide specialized coating solutions tailored to the unique needs of each sector.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <Link href={industry.href} className="absolute inset-0 z-10">
                <span className="sr-only">View {industry.name}</span>
              </Link>
              <Image
                src={industry.image || "/placeholder.svg"}
                alt={`Image of ${industry.name} project`}
                width={400}
                height={300}
                className="h-60 w-full object-cover"
              />
              <div className="bg-white p-4 dark:bg-gray-900">
                <h3 className="text-xl font-bold">{industry.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{industry.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/industries" passHref>
            <Button>Explore All Industries</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
