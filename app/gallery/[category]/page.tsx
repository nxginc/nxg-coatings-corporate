import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ParallaxHero from "@/components/parallax-hero"
import { galleryProjects } from "@/data/gallery-projects"

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
}

export function generateStaticParams() {
  return Object.keys(categoryLabels).map((category) => ({ category }))
}

export default async function GalleryCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const label = categoryLabels[category]
  if (!label) notFound()

  const projects = galleryProjects.filter((project) => {
    if (category === "residential") return ["Exterior", "Interior", "Cabinets", "Decks"].includes(project.category)
    return project.category === label
  })
  if (!projects.length) notFound()

  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow="NXG Coatings / Project gallery"
        title={`${label} projects`}
        description={`Selected NXG project photography for ${label.toLowerCase()} services.`}
        image={projects[0].src}
        imageAlt={projects[0].alt}
        height="medium"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Discuss a project <span aria-hidden="true">↗</span></Link>
      </ParallaxHero>
      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--nxg-line)] pb-5"><div><p className="section-kicker">{projects.length} selected {projects.length === 1 ? "image" : "images"}</p><h2 className="mt-3 text-3xl font-medium text-[var(--nxg-navy)]">{label}</h2></div><Link href="/gallery" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">All work</Link></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <figure key={project.id} className="min-w-0 bg-[var(--nxg-paper)]"><div className="relative aspect-[4/3]"><Image src={project.src} alt={project.alt} fill sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="object-cover" /></div><figcaption className="px-4 py-3 text-sm font-medium text-[var(--nxg-navy)]">{project.title}</figcaption></figure>)}</div>
      </section>
    </main>
  )
}