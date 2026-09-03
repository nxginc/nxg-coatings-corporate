import Image from "next/image"

type ServiceDetailProps = {
  title: string
  description: string
  features: string[]
  image: string
  reversed?: boolean
}

export default function ServiceDetail({ title, description, features, image, reversed = false }: ServiceDetailProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <h2 className="text-3xl font-bold text-brand-blue mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start text-gray-700">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <Image src={image} alt={title} width={900} height={600} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
