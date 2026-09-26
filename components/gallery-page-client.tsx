"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import ParallaxHero from "@/components/parallax-hero"
import { ASSETS } from "@/lib/assets"
import { galleryProjects } from "@/data/gallery-projects"

const categories = ["All", ...Array.from(new Set(galleryProjects.map((image) => image.category)))]

export default function GalleryPageClient() {
  const [category, setCategory] = useState("All")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const filteredImages = galleryProjects.filter((image) => category === "All" || image.category === category)
  const selectedIndex = filteredImages.findIndex((image) => image.id === selectedId)
  const selectedImage = selectedIndex >= 0 ? filteredImages[selectedIndex] : null

  function moveSelection(direction: -1 | 1) {
    if (selectedIndex < 0 || filteredImages.length === 0) return
    const nextIndex = (selectedIndex + direction + filteredImages.length) % filteredImages.length
    setSelectedId(filteredImages[nextIndex].id)
  }

  return (
    <main className="bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow="NXG Coatings / Selected work"
        title="See the surface. Consider the finish."
        description="Browse project photography across residential, commercial, industrial, and multi-family work."
        image={ASSETS.hero.gallery}
        imageAlt="NXG Coatings project gallery photography"
        height="medium"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-4 bg-[var(--nxg-red)] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Plan a project <span aria-hidden="true">↗</span></Link>
      </ParallaxHero>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col justify-between gap-5 border-b border-[var(--nxg-line)] pb-5 sm:flex-row sm:items-end">
          <div><p className="section-kicker">Project photography</p><h2 className="mt-3 text-3xl font-medium text-[var(--nxg-navy)] sm:text-4xl">Selected NXG work</h2></div>
          <p className="max-w-md text-sm leading-6 text-[var(--nxg-muted)]">Images are organized by service type. Project details can be added as verified case studies are approved.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto py-5" aria-label="Filter gallery by service">
          {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`shrink-0 border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${category === item ? "border-[var(--nxg-navy)] bg-[var(--nxg-navy)] text-white" : "border-[var(--nxg-line)] text-[var(--nxg-navy)] hover:border-[var(--nxg-red)]"}`}>{item}<span className="ml-2 opacity-65">{item === "All" ? galleryProjects.length : galleryProjects.filter((image) => image.category === item).length}</span></button>)}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image) => (
            <button key={image.id} type="button" onClick={() => setSelectedId(image.id)} className="group relative block min-w-0 overflow-hidden bg-[var(--nxg-paper)] text-left focus-visible:outline-offset-4">
              <div className="relative aspect-[4/3] overflow-hidden"><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /></div>
              <span className="absolute left-3 top-3 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--nxg-navy)]">{image.category}</span>
              <span className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-[var(--nxg-navy)]"><span>{image.title}</span><span aria-hidden="true" className="text-[var(--nxg-red)]">↗</span></span>
            </button>
          ))}
        </div>
      </section>

      {/* Before/after slider remains disabled until each matched pair clears visual and rights approval. */}
      {selectedImage && (
        <div role="dialog" aria-modal="true" aria-label={`${selectedImage.title} image`} className="fixed inset-0 z-[70] grid place-items-center bg-[var(--nxg-navy)]/95 p-4 text-white" onClick={() => setSelectedId(null)}>
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">{selectedImage.category}</p><h2 className="mt-1 text-xl font-medium">{selectedImage.title}</h2></div><button type="button" aria-label="Close image" onClick={() => setSelectedId(null)} className="grid h-10 w-10 place-items-center border border-white/35"><X className="h-5 w-5" /></button></div>
            <div className="relative aspect-[4/3] max-h-[78svh] bg-black"><Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="95vw" className="object-contain" /></div>
            {filteredImages.length > 1 && <div className="mt-4 flex justify-between"><button type="button" aria-label="Previous image" onClick={() => moveSelection(-1)} className="grid h-10 w-10 place-items-center border border-white/35"><ChevronLeft className="h-5 w-5" /></button><button type="button" aria-label="Next image" onClick={() => moveSelection(1)} className="grid h-10 w-10 place-items-center border border-white/35"><ChevronRight className="h-5 w-5" /></button></div>}
          </div>
        </div>
      )}
    </main>
  )
}