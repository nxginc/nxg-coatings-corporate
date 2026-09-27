import Image from "next/image"
import Link from "next/link"
import { ASSETS } from "@/lib/assets"
import ParallaxHero from "@/components/parallax-hero"

const services = [
  { title: "Exterior painting", description: "Thoughtful preparation and durable finishes for Minnesota homes and properties.", image: ASSETS.services.exterior, href: "/services/exterior-painting" },
  { title: "Interior painting", description: "Careful protection, clean work areas, and refined finishes room by room.", image: ASSETS.services.interior, href: "/services/interior-painting" },
  { title: "Cabinet refinishing", description: "A renewed finish for kitchens and baths without replacing sound cabinetry.", image: ASSETS.cabinets.hero, href: "/services/cabinet-refinishing" },
  { title: "Deck staining", description: "Surface preparation, staining, and protection for outdoor living spaces.", image: ASSETS.services.deck, href: "/services/deck-staining" },
  { title: "Fine finish and millwork", description: "Detail-focused painting for trim, windows, doors, and architectural woodwork.", image: ASSETS.services.fineFinish, href: "/services/fine-finishes" },
  { title: "Commercial coatings", description: "Coordinated painting and coating work for active business environments.", image: ASSETS.industries.commercial, href: "/industries/commercial" },
]

const projectImages = [
  { src: ASSETS.featuredHome.one, alt: "NXG residential painting project" },
  { src: ASSETS.featuredHome.two, alt: "NXG exterior coating project" },
  { src: ASSETS.featuredHome.three, alt: "NXG home painting project" },
  { src: ASSETS.featuredHome.four, alt: "NXG property finish project" },
]

const industries = ["Residential", "Commercial", "Industrial", "HOA and multifamily", "Institutional", "Property management"]

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-[var(--nxg-charcoal)]">
      <ParallaxHero
        eyebrow="NXG Coatings Inc. / Edina, Minnesota"
        title="A better finish starts underneath."
        description="Professional painting and coating services for homes, businesses, and facilities throughout the Twin Cities."
        image={ASSETS.featuredHome.two}
        imageAlt="NXG residential painting and coating project"
        height="large"
      >
        <Link href="/quote" className="inline-flex min-h-12 items-center gap-5 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">Request an estimate <span aria-hidden="true" className="text-xl">↗</span></Link>
        <Link href="/gallery" className="inline-flex min-h-12 items-center border border-white/45 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-[var(--nxg-navy)]">View project gallery</Link>
        <p className="mt-3 w-full border-t border-white/25 pt-5 text-[10px] uppercase tracking-[0.16em] text-white/65">Residential <span className="px-2 text-[var(--nxg-red)]">/</span> Commercial <span className="px-2 text-[var(--nxg-red)]">/</span> Industrial</p>
      </ParallaxHero>

      <section id="approach" className="mx-auto grid max-w-[var(--nxg-content-width)] gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
        <div><p className="section-kicker">The NXG approach</p><h2 className="mt-5 max-w-md text-4xl font-medium leading-tight sm:text-5xl">Great work is built on preparation.</h2></div>
        <div><p className="max-w-2xl text-lg leading-8 text-black/65">From the first walkthrough to the final cleanup, we plan around the people who use each space and the finish each surface needs.</p><div className="mt-10 grid gap-6 border-t border-[var(--nxg-line)] pt-6 sm:grid-cols-3">{["Clear scope", "Careful preparation", "Final walkthrough"].map((item, index) => <article key={item}><span className="text-xs font-semibold text-[var(--nxg-red)]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{item}</h3><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">A practical, accountable step in every project.</p></article>)}</div></div>
      </section>

      <section className="bg-[var(--nxg-paper)] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[var(--nxg-content-width)]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="section-kicker">What we do</p><h2 className="mt-4 text-4xl font-medium sm:text-6xl">Services for every surface.</h2></div><Link href="/services" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Explore all services <span aria-hidden="true">↗</span></Link></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <article key={service.title} className="group min-w-0 border border-[var(--nxg-line)] bg-white"><Link href={service.href} className="block"><div className="relative aspect-[4/3] overflow-hidden bg-[var(--nxg-paper)]"><Image src={service.image} alt={service.title} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div><div className="p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--nxg-red)]">0{index + 1} / Service</p><h3 className="mt-3 text-xl font-semibold">{service.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[var(--nxg-muted)]">{service.description}</p><span className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)]">View service <span aria-hidden="true" className="text-lg">↗</span></span></div></Link></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-6 border-b border-[var(--nxg-line)] pb-7 sm:flex-row sm:items-end"><div><p className="section-kicker">Selected work</p><h2 className="mt-4 text-4xl font-medium sm:text-6xl">See the finish.</h2></div><Link href="/gallery" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Browse the gallery <span aria-hidden="true">↗</span></Link></div>
        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">{projectImages.map((image, index) => <Link key={image.src} href="/gallery" className={`group relative block overflow-hidden bg-[var(--nxg-paper)] ${index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><span className="absolute bottom-3 left-3 bg-[var(--nxg-navy)]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">Project photography</span></Link>)}</div>
      </section>

      {/* Enable after matched-pair review: <BeforeAfterSlider project={beforeAfterProjects[0]} /> */}
      <section className="bg-[var(--nxg-navy)] px-6 py-20 text-white lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[var(--nxg-content-width)] gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="section-kicker">Where we work</p><h2 className="mt-5 text-4xl font-medium leading-tight sm:text-6xl">A coordinated crew for demanding spaces.</h2><p className="mt-6 max-w-lg text-base leading-7 text-white/65">We work with homeowners, property teams, and businesses across the Twin Cities metro.</p><Link href="/industries" className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Explore industries <span aria-hidden="true">↗</span></Link></div><ul className="grid grid-cols-2 content-start">{industries.map((industry, index) => <li key={industry} className="flex items-center gap-4 border-b border-white/20 py-5 text-sm sm:text-base"><span className="text-[10px] text-[var(--nxg-platinum)]">0{index + 1}</span>{industry}</li>)}</ul></div>
      </section>

      <section className="grid bg-[var(--nxg-red)] px-6 py-14 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-10 lg:px-[max(40px,calc((100vw-var(--nxg-content-width))/2))]"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Trade partners</p><h2 className="mt-3 text-3xl font-medium sm:text-4xl">Build a stronger finish together.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/80">Join the NXG trade network for painting and property projects across the Twin Cities.</p></div><Link href="/partners" className="mt-7 inline-flex min-h-12 items-center justify-center gap-5 border border-white/60 px-5 text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-white hover:text-[var(--nxg-red)] sm:mt-0">Partner with NXG <span aria-hidden="true" className="text-xl">↗</span></Link></section>
    </main>
  )
}
