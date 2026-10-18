# NXG Coatings Design System

## Source of truth

`data/design-tokens.json` is the versioned token handoff contract for color, spacing, typography, radii, control height, and content width. Keep its token names stable so the same contract can be mapped to CSS custom properties and Figma variables. It explicitly maps `brand.platinum` to `Color/Brand/Platinum`. `data/corporate-profile.ts` consumes its brand tokens and exports the typed `NXG_CORPORATE_PROFILE` and `NXG_BRAND_THEME` used by printable company documents. `app/globals.css` exposes the core theme and layout values as `--nxg-*` variables.

The current brand palette includes navy (`#0C1D34`), red (`#86001A`), platinum (`#C0C0C0`), charcoal (`#1A1A1A`), paper (`#F5F6F7`), default border (`#D9DEE3`), and muted text (`#66727F`). Platinum is a decorative/structural accent for rules, borders, and large inverse display details. Do not use it as small text on white; use navy or charcoal for readable text.

Open `/brand-preview` in the running Next.js app for an unlisted, noindex preview of the palette (including platinum), web button/card masters, and a sample-only proposal.

## Reusable letter template

`components/brand-letter-template.tsx` exports `BrandLetterTemplate` and `BrandLetterTemplateProps`. It provides a letter-size page, company logo and contact defaults, recipient block, optional subject, body paragraphs, sign-off, and print styling. Pass a `CorporateProfile` through `companyProfile` to change the company metadata and theme together. Existing individual company/contact props remain available as display-level overrides.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `date` | `string` | Yes | Display date |
| `recipientName` | `string` | Yes | Recipient |
| `salutation` | `string` | Yes | Opening |
| `paragraphs` | `string[]` | Yes | Letter body |
| `signatureName` | `string` | Yes | Signatory |
| `recipientTitle`, `recipientOrganization` | `string` | No | Recipient details |
| `recipientAddress` | `string[]` | No | Recipient address lines |
| `subject` | `string` | No | Subject line |
| `closing`, `signatureTitle` | `string` | No | Sign-off and role |
| `companyName`, `companyAddress` | `string` / `string[]` | No | Sender identity |
| `phone`, `email`, `website` | `string` | No | Sender contact details |
| `logo` | `ReactNode` | No | Replacement brand mark |
| `companyProfile` | `CorporateProfile` | No | Shared sender identity, logo URL, and document theme |
| `children` | `ReactNode` | No | Custom body content for structured documents |

Example:

```tsx
<BrandLetterTemplate
  date="October 17, 2026"
  recipientName="Jordan Lee"
  recipientOrganization="Example Property Group"
  recipientAddress={["100 Main Street", "Edina, MN 55424"]}
  subject="Project estimate"
  salutation="Hello Jordan,"
  paragraphs={["Thank you for inviting NXG Coatings to review your project."]}
  signatureName="NXG Coatings Team"
/>
```

`components/brand-proposal-template.tsx` exports `BrandProposalTemplate`. It uses the letterhead shell and profile while rendering proposal-specific sections: project overview, scope, optional timeline, line-item investment and total, exclusions, terms, and validity. Amounts are numeric and formatted with the selected ISO currency (`USD` by default). Populate scope, estimates, validity, and terms from an approved estimate; the component does not imply a binding quote or set project terms.

```tsx
<BrandProposalTemplate
  date="October 17, 2026"
  recipientName="Jordan Lee"
  recipientOrganization="Example Property Group"
  projectTitle="Interior repaint"
  proposalNumber="NXG-2026-014"
  validUntil="November 17, 2026"
  overview="A proposed repaint of the listed rooms, subject to the final site review."
  scope={["Protect work areas", "Prepare and paint listed interior surfaces"]}
  lineItems={[{ description: "Labor and materials", amount: 6400 }]}
  exclusions={["Repairs beyond the listed preparation"]}
  terms={["Final scope and start date require written approval."]}
  signatureName="NXG Coatings Team"
/>
```

`components/commercial-painting-proposal-template.tsx` exports `CommercialPaintingProposalTemplate` and typed project, schedule, scope, cost, material, warranty, terms, and authorization props. It renders the seven-part commercial painting proposal, totals line items, interpolates county/state/validity placeholders in the supplied terms, and supports the shared company profile/theme. `data/commercial-proposal-terms.ts` provides an editable draft clause set with placeholders for terms requiring company/legal review. It intentionally does not claim specific payment, insurance, license, liability, or warranty terms as fact. Replace and approve those clauses before customer use.

The proposal print layout is multipage and letter-size. The live `[brand-preview](/brand-preview)` route contains sample-only line items and terms for internal review; the `SAMPLE-NOT-A-QUOTE` identifier and `noindex` metadata must remain on preview content.

## Figma handoff and synchronization

The token JSON is not an automated Figma sync. Its declared collection is `NXG Foundations`, `variablePathSeparator` is `/`, and `figma.variableMappings` holds the explicit variable paths; map these tokens without renaming the source tokens. Platinum maps to `Color/Brand/Platinum` and retains `#C0C0C0`.

Before applying or syncing changes in Figma, obtain the target design-file URL and confirm access to the relevant library/page. Then map the token contract to Figma variables and reusable components, verify component properties and variants against this document, and review the resulting file before treating the sync as complete. No live Figma file was changed as part of this repository work. See [Master Template System](./master-template-system.md) for the component/library structure and [Figma handoff checklist](./master-template-system.md#figma-library-setup-and-variable-map).
# Website application

The master visual language is applied through the shared root layout, global design tokens, shared navigation/footer, reusable page hero, and section-kicker styles. The design-token JSON includes the mobile and wide header heights used by the site shell. `/brand-preview` is a review/sample route for these shared styles and corporate documents; it is not the implementation surface or a replacement for styling the site's pages.
