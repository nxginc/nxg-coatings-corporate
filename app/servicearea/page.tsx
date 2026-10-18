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
    <main className="min-h-screen bg-[#f3f1ed] text-[#171717]">
      <section className="bg-[#171717] px-6 py-28 text-white lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1440px]">
          <p className="section-kicker text-[#e74736]">Where we work</p>
          <h1 className="mt-6 max-w-5xl text-6xl font-medium leading-[.92] tracking-[-.07em] lg:text-[8rem]">Painting services across the Twin Cities.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-7 text-white/60">NXG Coatings provides residential and commercial painting services in Minneapolis and surrounding Minnesota communities.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-2 gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {SERVICE_AREAS.filter((area) => area !== "Twin Cities metro").map((area, index) => (
            <div key={area} className="border-b border-black/15 py-6">
              <span className="mr-3 text-[10px] text-black/35">0{index + 1}</span>
              <span className="text-lg tracking-[-.03em]">{area}</span>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-black/15 pt-8">
          <Link href="/quote" className="inline-flex bg-[#e74736] px-6 py-4 text-xs font-semibold uppercase tracking-[.15em] text-white">Request an Estimate <span className="ml-8 text-xl">↗</span></Link>
        </div>
      </section>
    </main>
  )
}
