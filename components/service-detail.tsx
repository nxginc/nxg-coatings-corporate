import Link from "next/link"

interface ServiceDetailProps {
  title: string
  description: string
  features: string[]
  image: string
  reversed?: boolean
}

export default function ServiceDetail({
  title,
  description,
  features,
  image,
  reversed = false,
}: ServiceDetailProps) {
  return (
    <section className="py-16 md:py-20">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <img src={image} alt={`${title} service`} className="h-full min-h-72 w-full object-cover" />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#070a2c]">{title}</h2>
          <p className="mt-4 leading-7 text-slate-600">{description}</p>
          <ul className="mt-6 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span aria-hidden="true" className="font-bold text-[#173d9c]">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#070a2c] px-5 text-sm font-semibold text-white hover:bg-[#173d9c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214bb6]"
          >
            Request an estimate
          </Link>
        </div>
      </div>
    </section>
  )
}
