import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Star } from "lucide-react"

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-brand-bone">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-home.png"
          alt="Freshly coated modern luxury home exterior at golden hour"
          fill
          priority
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 flex min-h-[92vh] flex-col justify-center py-28">
        <div className="max-w-3xl">
          <p className="overline animate-fade-up text-brand-ember">Premium Painting &amp; Protective Coatings</p>

          <h1 className="mt-6 animate-fade-up text-display-lg font-semibold text-balance text-brand-bone [animation-delay:80ms]">
            Finishes that endure. Craft you can see.
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:160ms]">
            NXG Coatings delivers architect-grade surface preparation and durable, beautiful finishes for homes,
            communities, and commercial properties — backed by a written guarantee.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row [animation-delay:240ms]">
            <Link
              href="/quote"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-red px-8 py-4 text-sm font-semibold text-brand-bone transition-colors hover:bg-brand-ember"
            >
              Get a Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 px-8 py-4 text-sm font-semibold text-brand-bone backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              View Our Work
            </Link>
          </div>

          <div className="mt-14 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/70 [animation-delay:320ms]">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-ember" />
              Licensed &amp; insured
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-brand-ember text-brand-ember" />
              4.9 average client rating
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-ember" />
              2,400+ projects completed
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
