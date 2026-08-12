import { Reveal } from "@/components/reveal"

const steps = [
  {
    step: "01",
    title: "Consultation & assessment",
    body: "We walk the property, evaluate every substrate, and document the scope in detail — no surprises, no guesswork.",
  },
  {
    step: "02",
    title: "Specification & proposal",
    body: "You receive a clear, itemized plan: products, colors, prep methods, timeline, and a fixed, transparent price.",
  },
  {
    step: "03",
    title: "Precision preparation",
    body: "Washing, repair, sanding, masking, and priming to manufacturer spec. This is where longevity is won.",
  },
  {
    step: "04",
    title: "Application & inspection",
    body: "Controlled application, daily quality checks, and a final walkthrough with you before we call it complete.",
  },
]

export default function HomeProcess() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand-royal">Our process</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl">
            Disciplined from the first walkthrough to the final coat.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col bg-card p-8">
                <span className="font-serif text-2xl text-brand-red">{s.step}</span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
