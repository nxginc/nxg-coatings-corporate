import type { Metadata } from "next"
import CommercialPaintingProposalTemplate from "@/components/commercial-painting-proposal-template"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { COMMERCIAL_PROPOSAL_TERMS_TEMPLATE } from "@/data/commercial-proposal-terms"
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
          <CommercialPaintingProposalTemplate
            projectName="Commercial interior repaint · sample layout"
            shortLocation="Edina, MN"
            location="100 Example Avenue, Edina, MN 55424"
            preparedFor="Sample Client"
            preparedForTitle="Facilities Manager"
            preparedForCompany="Example Property Group"
            proposalDate="October 18, 2026"
            validityPeriod="30 days · sample only"
            proposalNumber="SAMPLE-NOT-A-QUOTE"
            bidDue="Sample only"
            estimatedStart="To be confirmed"
            estimatedDuration="To be confirmed"
            estimatedCompletion="To be confirmed"
            scopeDescription="Illustrative scope only. Confirm surfaces, substrate conditions, access, and project phasing during site review."
            includedWork={[
              "Labor",
              "Materials",
              "Premium coatings (confirm specification)",
              "Surface preparation (per approved scope)",
              "Minor patching (define limits)",
              "Daily cleanup",
              "Project supervision",
              "Final walkthrough",
              "Workmanship warranty (confirm terms)",
            ]}
            exclusions={[
              "Repairs beyond the approved scope",
              "Hazardous-material abatement",
              "Work not listed in the executed agreement",
            ]}
            lineItems={[
              { name: "Mobilization & Project Management", description: "Sample: project setup, scheduling, supervision, reporting", amount: 600 },
              { name: "Jobsite Protection & Masking", description: "Sample: floor / fixture protection, masking, dust control", amount: 700 },
              { name: "Surface Preparation", description: "Sample: patching, sanding, scraping, caulking", amount: 2100 },
              { name: "Priming & Spot Repairs", description: "Sample: spot priming and primer application per substrate", amount: 1000 },
              { name: "Interior Wall Painting", description: "Sample: finish coats on approved wall surfaces", amount: 4700 },
              { name: "Ceiling Painting", description: "Sample: ceiling surfaces and touch-up", amount: 1200 },
              { name: "Doors, Frames & Trim", description: "Sample: approved doors, frames, and trim", amount: 1500 },
              { name: "Final Touch-Ups & Cleanup", description: "Sample: final walk, touch-ups, and cleanup", amount: 700 },
              { name: "Warranty & Closeout", description: "Sample: closeout documentation; warranty subject to written terms", amount: 1500 },
            ]}
            paintSpecification="To be specified after substrate and finish review"
            primerSpecification="To be specified by substrate"
            surfacePreparation="Per approved scope and verified site conditions"
            applicationMethod="To be approved in project specifications"
            estimatedMaterialUsage="To be confirmed after quantity takeoff"
            warrantyPeriod="Confirm written warranty terms"
            terms={COMMERCIAL_PROPOSAL_TERMS_TEMPLATE}
            clientNameAndTitle="Sample Client · Facilities Manager"
            clientCompany="Example Property Group"
            representativeNameAndTitle="Authorized NXG Representative"
            licenseNumber="Confirm if applicable"
            county="Hennepin County"
            state="Minnesota"
          />
          </div>
        </section>
      </div>
    </main>
  )
}
