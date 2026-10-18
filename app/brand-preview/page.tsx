import type { Metadata } from "next"
import BrandProposalTemplate from "@/components/brand-proposal-template"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NXG_BRAND_THEME } from "@/data/corporate-profile"

export const metadata: Metadata = {
  title: "NXG Brand System Preview",
  description: "Unlisted preview of NXG Coatings brand tokens, reusable components, and proposal template.",
  robots: { index: false, follow: false },
}

const colorTokens = [
  { name: "Navy", value: NXG_BRAND_THEME.navy, usage: "Primary brand, headings, primary actions" },
  { name: "Red", value: NXG_BRAND_THEME.red, usage: "Accent, highlights, focus states" },
  { name: "Platinum", value: NXG_BRAND_THEME.platinum, usage: "Dividers and structural accents; not small text" },
  { name: "Charcoal", value: NXG_BRAND_THEME.charcoal, usage: "Primary body text" },
  { name: "Paper", value: NXG_BRAND_THEME.paper, usage: "Soft page and panel backgrounds" },
  { name: "Line", value: NXG_BRAND_THEME.line, usage: "Borders and separators" },
]

export default function BrandPreviewPage() {
  return (
    <main className="min-h-screen bg-[var(--nxg-paper)] px-4 py-12 text-[var(--nxg-charcoal)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[var(--nxg-line)] pb-8">
          <p className="section-kicker">NXG Coatings · Unlisted design preview</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--nxg-navy)] sm:text-5xl">
            One brand system. Reusable everywhere.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--nxg-muted)]">
            Review the canonical palette, reusable UI components, and print-ready proposal master. This
            route is not indexed or included in the sitemap.
          </p>
        </header>

        <section className="py-10" aria-labelledby="palette-heading">
          <p className="section-kicker">01 · Foundations</p>
          <h2 id="palette-heading" className="mt-2 text-2xl font-semibold text-[var(--nxg-navy)]">Brand palette</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {colorTokens.map((token) => (
              <Card key={token.name} className="overflow-hidden rounded-none">
                <div className="h-20 border-b border-[var(--nxg-line)]" style={{ backgroundColor: token.value }} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-[var(--nxg-navy)]">{token.name}</h3>
                    <code className="text-xs text-[var(--nxg-muted)]">{token.value}</code>
                  </div>
                  <p className="mt-2 text-sm text-[var(--nxg-muted)]">{token.usage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--nxg-line)] py-10" aria-labelledby="components-heading">
          <p className="section-kicker">02 · Components</p>
          <h2 id="components-heading" className="mt-2 text-2xl font-semibold text-[var(--nxg-navy)]">Web component masters</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--nxg-navy)]">Action hierarchy</CardTitle>
                <CardDescription>Use one primary action per content region; keep secondary actions quiet.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Request a project review</Button>
                <Button variant="outline">View services</Button>
                <Button variant="secondary">Accent action</Button>
                <Button variant="link">Text action</Button>
              </CardContent>
            </Card>

            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--nxg-navy)]">Content card</CardTitle>
                <CardDescription>Shared card structure: clear title, useful detail, and a single next step.</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-[var(--nxg-line)] pt-4">
                <p className="text-sm leading-6">
                  Discuss the existing surface, preparation needs, access, timing, and finish preferences before
                  confirming a project scope.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-[var(--nxg-line)] py-10" aria-labelledby="proposal-heading">
          <p className="section-kicker">03 · Corporate document master</p>
          <h2 id="proposal-heading" className="mt-2 text-2xl font-semibold text-[var(--nxg-navy)]">Proposal layout</h2>
          <p className="mt-2 text-sm text-[var(--nxg-muted)]">
            Sample-only content for design review. Replace scope, pricing, and terms with an approved estimate.
          </p>
          <div className="mt-4">
            <BrandProposalTemplate
              date="October 18, 2026"
              recipientName="Sample Client"
              recipientOrganization="Example Property Group"
              recipientAddress={["100 Example Avenue", "Edina, MN 55424"]}
              projectTitle="Interior repaint · sample layout"
              proposalNumber="SAMPLE-NOT-A-QUOTE"
              validUntil="Sample only"
              overview="Illustrative content for reviewing the reusable NXG proposal document layout. It is not a project quote or offer."
              scope={[
                "Confirm rooms, surfaces, and preparation during the project review.",
                "Protect work areas and complete only the approved written scope.",
                "Confirm color, sheen, access, and start date before work begins.",
              ]}
              lineItems={[
                { description: "Illustrative labor and materials (sample only)", amount: 6400 },
              ]}
              exclusions={["Repairs and work not listed in an approved scope."]}
              timeline="To be confirmed after site review and written approval."
              terms={["Example terms only; use the approved company agreement for real projects."]}
              signatureName="NXG Coatings Team"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
