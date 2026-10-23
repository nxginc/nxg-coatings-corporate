import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import { ASSETS } from "@/lib/assets"
import { NXG_SITE } from "@/lib/site-metadata"
import HomeEstimateForm from "@/components/home-estimate-form"

const services = [
  { title: "Exterior painting", description: "Thoughtful preparation and durable finishes for Minnesota homes and properties.", image: ASSETS.services.exterior, href: "/services/exterior-painting" },
  { title: "Interior painting", description: "Careful protection, clean work areas, and refined finishes room by room.", image: ASSETS.services.interior, href: "/services/interior-painting" },
  { title: "Cabinet refinishing", description: "A renewed finish for kitchens and baths without replacing sound cabinetry.", image: ASSETS.cabinets.hero, href: "/services/cabinet-refinishing" },
  { title: "Deck staining", description: "Surface preparation, staining, and protection for outdoor living spaces.", image: ASSETS.services.deck, href: "/services/deck-staining" },
  { title: "Fine finish and millwork", description: "Detail-focused painting for trim, windows, doors, and architectural woodwork.", image: ASSETS.services.fineFinish, href: "/services/fine-finishes" },
  { title: "Commercial coatings", description: "Coordinated painting and coating work for active business environments.", image: ASSETS.industries.commercial, href: "/industries/commercial" },
]

const projectImages = [
  { src: ASSETS.featuredHome.one, alt: "NXG residential exterior painting project", title: "Exterior finishes" },
  { src: ASSETS.featuredHome.two, alt: "NXG home coating project", title: "Residential coating" },
  { src: ASSETS.featuredHome.three, alt: "NXG residential painting project", title: "Interior work" },
  { src: ASSETS.featuredHome.four, alt: "NXG exterior and deck project", title: "Outdoor surfaces" },
]

const industries = ["Residential", "Commercial", "Industrial", "HOA and multifamily", "Institutional", "Property management"]
const approachSteps = [
  { title: "Clear scope", description: "Align on surfaces, preparation, materials, access, and schedule before work begins." },
  { title: "Careful preparation", description: "Protect the space and prepare the agreed surfaces for the selected coating system." },
  { title: "Final walkthrough", description: "Review the completed work together and leave the site clean and orderly." },
]

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-[var(--nxg-charcoal)]">
      <section className="relative isolate -mt-[72px] overflow-hidden bg-[var(--nxg-navy)] text-white xl:-mt-20" aria-labelledby="home-hero-title">
        <Image
          src={ASSETS.featuredHome.two}
          alt="NXG residential painting and coating project"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,29,52,0.94)_0%,rgba(12,29,52,0.8)_43%,rgba(12,29,52,0.38)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--nxg-navy)]/55 via-transparent to-[var(--nxg-navy)]/20" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[min(78svh,780px)] max-w-[var(--nxg-content-width)] items-center gap-10 px-6 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:grid-cols-[1.15fr_0.75fr] lg:gap-16 lg:px-10 lg:pb-20 lg:pt-36">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 before:h-px before:w-7 before:bg-[var(--nxg-platinum)]">
              NXG Coatings Inc. <span className="text-[var(--nxg-platinum)]">/</span> Twin Cities, Minnesota
            </p>
            <h1 id="home-hero-title" className="max-w-[12ch] text-5xl font-light leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              A better finish starts underneath.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Professional painting and coating services for homes, businesses, and facilities throughout the Twin Cities.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={`tel:${NXG_SITE.phoneE164}`} className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-white transition hover:text-[var(--nxg-platinum)]">
                <span aria-hidden="true" className="grid h-8 w-8 place-items-center border border-white/35"><Phone className="h-4 w-4" /></span>
                {NXG_SITE.phoneDisplay}
              </a>
              <Link href="/gallery" className="inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8 transition hover:text-white/75">
                View recent projects <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <aside className="w-full max-w-md justify-self-start bg-white p-5 text-[var(--nxg-charcoal)] shadow-2xl shadow-black/20 sm:p-7 lg:justify-self-end" aria-labelledby="home-estimate-title">
            <p className="section-kicker">Start a project</p>
            <h2 id="home-estimate-title" className="mt-3 text-2xl font-semibold text-[var(--nxg-navy)]">Request your estimate.</h2>
            <p className="mb-5 mt-2 text-sm leading-6 text-[var(--nxg-muted)]">Tell us how to reach you and what kind of work you have in mind.</p>
            <HomeEstimateForm />
          </aside>
        </div>
      </section>

      <section className="bg-[var(--nxg-navy)] px-6 py-7 text-white lg:px-10" aria-label="NXG service overview">
        <div className="mx-auto grid max-w-[var(--nxg-content-width)] gap-6 sm:grid-cols-[1.2fr_1fr_1fr_1fr] sm:items-center">
          <p className="max-w-xs text-sm font-medium leading-6 text-white/90">A Twin Cities painting and coatings team for projects of every scale.</p>
          <div className="border-t border-white/20 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"><p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Homes</p><p className="mt-1 text-sm font-medium">Residential painting</p></div>
          <div className="border-t border-white/20 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"><p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Workplaces</p><p className="mt-1 text-sm font-medium">Commercial coatings</p></div>
          <div className="border-t border-white/20 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"><p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Properties</p><p className="mt-1 text-sm font-medium">HOA and industrial</p></div>
        </div>
      </section>

      <section id="approach" className="mx-auto grid max-w-[var(--nxg-content-width)] gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
        <div><p className="section-kicker">The NXG approach</p><h2 className="mt-5 max-w-md text-4xl font-medium leading-tight sm:text-5xl">Great work is built on preparation.</h2></div>
        <div><p className="max-w-2xl text-lg leading-8 text-black/65">From the first walkthrough to the final cleanup, we plan around the people who use each space and the finish each surface needs.</p><div className="mt-10 grid gap-6 border-t border-[var(--nxg-line)] pt-6 sm:grid-cols-3">{approachSteps.map((step, index) => <article key={step.title}><span className="text-xs font-semibold text-[var(--nxg-red)]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">{step.description}</p></article>)}</div></div>
      </section>

      <section className="bg-[var(--nxg-paper)] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[var(--nxg-content-width)]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="section-kicker">What we do</p><h2 className="mt-4 text-4xl font-medium sm:text-6xl">Services for every surface.</h2></div><Link href="/services" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Explore all services <span aria-hidden="true">↗</span></Link></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <article key={service.title} className="group min-w-0 border border-[var(--nxg-line)] bg-white"><Link href={service.href} className="block"><div className="relative aspect-[4/3] overflow-hidden bg-[var(--nxg-paper)]"><Image src={service.image} alt={service.title} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div><div className="p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--nxg-red)]">0{index + 1} / Service</p><h3 className="mt-3 text-xl font-semibold">{service.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[var(--nxg-muted)]">{service.description}</p><span className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)]">View service <span aria-hidden="true" className="text-lg">↗</span></span></div></Link></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--nxg-content-width)] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-6 border-b border-[var(--nxg-line)] pb-7 sm:flex-row sm:items-end"><div><p className="section-kicker">Selected work</p><h2 className="mt-4 text-4xl font-medium sm:text-6xl">See the finish.</h2></div><Link href="/gallery" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Browse the gallery <span aria-hidden="true">↗</span></Link></div>
        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">{projectImages.map((image, index) => <Link key={image.src} href="/gallery" aria-label={`View ${image.title.toLowerCase()} in the project gallery`} className={`group relative block overflow-hidden bg-[var(--nxg-paper)] ${index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><span className="absolute bottom-3 left-3 bg-[var(--nxg-navy)]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">{image.title}</span></Link>)}</div>
      </section>

      {/* Enable after matched-pair review: <BeforeAfterSlider project={beforeAfterProjects[0]} /> */}
      <section className="bg-[var(--nxg-navy)] px-6 py-20 text-white lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[var(--nxg-content-width)] gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="section-kicker section-kicker--inverse">Where we work</p><h2 className="mt-5 text-4xl font-medium leading-tight sm:text-6xl">A coordinated crew for demanding spaces.</h2><p className="mt-6 max-w-lg text-base leading-7 text-white/65">We work with homeowners, property teams, and businesses across the Twin Cities metro.</p><Link href="/industries" className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white underline decoration-[var(--nxg-red)] decoration-2 underline-offset-8">Explore industries <span aria-hidden="true">↗</span></Link></div><ul className="grid grid-cols-2 content-start">{industries.map((industry, index) => <li key={industry} className="flex items-center gap-4 border-b border-white/20 py-5 text-sm sm:text-base"><span className="text-[10px] text-[var(--nxg-platinum)]">0{index + 1}</span>{industry}</li>)}</ul></div>
      </section>

      <section className="grid bg-[var(--nxg-red)] px-6 py-14 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-10 lg:px-[max(40px,calc((100vw-var(--nxg-content-width))/2))]"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Trade partners</p><h2 className="mt-3 text-3xl font-medium sm:text-4xl">Build a stronger finish together.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/80">Join the NXG trade network for painting and property projects across the Twin Cities.</p></div><Link href="/partners" className="mt-7 inline-flex min-h-12 items-center justify-center gap-5 border border-white/60 px-5 text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-white hover:text-[var(--nxg-red)] sm:mt-0">Partner with NXG <span aria-hidden="true" className="text-xl">↗</span></Link></section>
    </main>
  )
}
