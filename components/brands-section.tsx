"use client"

import Image from "next/image"

const brands = [
  "https://ik.imagekit.io/j98e6hcfnkn/brands/sherwin_x0balia5r.png?updatedAt=1704482056350&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/twp_mofKht_Yti.png?updatedAt=1704482056038&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/865-8653104_an-overview-of-ppg-industries-ppg-paint-logo_uOGzYhyVWm.png?updatedAt=1704482054644&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_72GtAY2fS.png?updatedAt=1704482054463&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/farrow&ball_AtEwe40la.webp?updatedAt=1704482054465&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/magnolia-logo-black_FVFQThcfSg.png?updatedAt=1704482054395&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/cabot-logo_gCTy1X9Oy.png?updatedAt=1704482054348&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/renner_d5BI9PU7hG.png?updatedAt=1704482054333&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/farrowball_wkBZIHRTY.png?updatedAt=1704482054314&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/rust-olem_axvMGYW5l.png?updatedAt=1704482054295&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/gliden_S0_soZxas.jpeg?updatedAt=1704482054246&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/BenjaminMoore-logo_WWKOQ2irq.webp?updatedAt=1704482054279&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/ICS_iPZssAka4.png?updatedAt=1704482015375&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_proluxe_MW-ZtyG1Y.jpg?updatedAt=1704482015138&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/axalta_yjszcOl2V.jpeg?updatedAt=1704482015100&tr=n-ik_ml_thumbnail",
  "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_US1whj-sz.png?updatedAt=1704482015058&tr=n-ik_ml_thumbnail"
]

export default function BrandsSection() {
  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-brand-blue mb-8">Brands We Trust</h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {brands.map((src, idx) => (
            <div key={idx} className="h-16 w-auto flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <Image src={src} alt="Brand logo" width={120} height={64} className="object-contain h-16 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
