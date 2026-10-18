import type { Metadata } from "next"
import Link from "next/link"
import { seo, SERVICE_AREAS } from "@/lib/seo"

export const metadata: Metadata = {
  ...seo("home", "/servicearea"),
  title: "Service Areas | NXG Coatings Minnesota",
  description: "NXG Coatings provides residential and commercial painting services throughout Minneapolis, the Twin Cities metro and surrounding Minnesota communities.",
  keywords: [...SERVICE_AREAS, "painting contractors Minnesota", "Twin Cities painting contractors"],
}

export default function ServiceAreasPage() {
  return (
    <main className="min-h-screen bg-white text-[var(--nxg-charcoal)]">
      <section className="bg-[var(--nxg-navy)] px-6 py-24 text-white lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[var(--nxg-content-width)]">
          <p className="section-kicker section-kicker--inverse">Where we work</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-light leading-[0.94] sm:text-6xl lg:text-8xl">Painting services across the Twin Cities.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-7 text-white/70">NXG Coatings provides residential and commercial painting services in Minneapolis and surrounding Minnesota communities.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SERVICE_AREAS.filter((area) => area !== "Twin Cities metro").map((area, index) => (
            <div key={area} className="border-b border-[var(--nxg-line)] py-6">
              <span className="mr-3 font-mono text-[10px] text-[var(--nxg-red)]">0{index + 1}</span>
              <span className="text-lg tracking-[-0.03em]">{area}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-[var(--nxg-line)] pt-8">
          <Link href="/quote" className="inline-flex min-h-12 items-center bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--nxg-navy)]">Request an estimate <span className="ml-8 text-xl">↗</span></Link>
        </div>
      </section>
    </main>
  )
}
