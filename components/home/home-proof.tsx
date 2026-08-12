import { Reveal } from "@/components/reveal"

const stats = [
  { value: "20+", label: "Years of coating expertise" },
  { value: "4,800+", label: "Projects delivered" },
  { value: "12yr", label: "Finish warranty" },
  { value: "98%", label: "Referral rate" },
]

export default function HomeProof() {
  return (
    <section className="bg-brand-navy text-brand-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand-royal-200">
              The NXG standard
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
              A finish is only as good as the surface beneath it.
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-brand-bone/70">
              We treat preparation as the project. Every substrate is inspected, corrected, and primed to
              spec before a single coat is applied — which is why our finishes outlast the industry average by
              years, not months.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-white/15 pt-5">
                  <dt className="font-serif text-4xl tracking-tight text-white sm:text-5xl">{s.value}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-brand-bone/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
