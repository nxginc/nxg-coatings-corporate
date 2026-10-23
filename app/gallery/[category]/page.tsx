import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ParallaxHero from "@/components/parallax-hero"
import { serviceGalleryImages } from "@/data/service-gallery-images"
import { SITE_URL } from "@/lib/seo"

const categoryLabels: Record<string, string> = {
  cabinets: "Cabinets",
  commercial: "Commercial",
  decks: "Decks",
  exterior: "Exterior",
  hoa: "HOA and multi-family",
  industrial: "Industrial",
  interior: "Interior",
  residential: "Residential",
  specialty: "Specialty finishes",
  "protective-coatings": "Protective coatings",
  "pressure-washing": "Pressure washing",
  restoration: "Restoration",
}

type GalleryCategoryPageProps = { params: Promise<{ category: string }> }

export function generateStaticParams() {
  return Object.keys(categoryLabels).map((category) => ({ category }))
}

export async function generateMetadata({ params }: GalleryCategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const label = categoryLabels[category]
  const categoryImages = category === "residential"
    ? serviceGalleryImages.filter((item) => ["Exterior", "Interior", "Cabinets", "Decks"].includes(item.category))
    : serviceGalleryImages.filter((item) => item.category === label)
  const image = categoryImages[0]
  if (!label || !image) return {}
  const title = `${label} Service Imagery | NXG Coatings`
  const description = `Browse service-category imagery for NXG Coatings ${label.toLowerCase()} services. Verified project case studies are pending review.`
  const url = new URL(`/gallery/${category}`, SITE_URL).toString()
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, images: [{ url: image.src, alt: image.alt }] },
  }
}

export default async function GalleryCategoryPage({ params }: GalleryCategoryPageProps) {
  const { category } = await params
  const label = categoryLabels[category]
  if (!label) notFound()

  const images = serviceGalleryImages.filter((image) => {
    if (category === "residential") return ["Exterior", "Interior", "Cabinets", "Decks"].includes(image.category)
    return image.category === label
  })
  if (!images.length) notFound()

  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow="NXG Coatings / Service imagery"
        title={`${label} service imagery`}
        description="Service-category imagery only. Verified project case studies are pending."
        image={images[0].src}
        imageAlt={images[0].alt}
        height="medium"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Discuss a project <span aria-hidden="true">↗</span></Link>
      </ParallaxHero>
      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5"><div><p className="section-kicker">{images.length} service {images.length === 1 ? "image" : "images"}</p><h2 className="mt-3 text-3xl font-medium text-[var(--nxg-navy)]">{label}</h2></div><Link href="/gallery" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">All imagery</Link></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{images.map((image) => <figure key={image.id} className="min-w-0 bg-[var(--nxg-paper)]"><div className="relative aspect-[4/3]"><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="object-cover" /></div><figcaption className="px-4 py-3 text-sm font-medium text-[var(--nxg-navy)]">{image.title}</figcaption></figure>)}</div>
      </section>
    </main>
  )
}