import Image from "next/image"

const features = [
  {
    title: "Premium Materials",
    description:
      "We use only the highest-grade, durable paints and coatings from trusted brands to ensure a finish that lasts.",
    image: "/images/parallax/materials.png",
  },
  {
    title: "Flawless Finish",
    description:
      "Our meticulous preparation and application process guarantees a smooth, even, and beautiful result every time.",
    image: "/images/parallax/finish.png",
  },
  {
    title: "Unmatched Durability",
    description:
      "Our coatings are engineered to withstand weathering, wear, and time, protecting your property for years to come.",
    image: "/images/parallax/durability.png",
  },
]

export default function ParallaxFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="relative h-48 w-48 mb-4">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
