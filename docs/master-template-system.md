# NXG Coatings Master Template System

This repository is the reusable implementation source for the NXG website, brand documents, and marketing workflow. Avoid keeping a second competing set of colors, company details, or channel limits in individual screens.

## Source-of-truth map

| Concern | Canonical source | Reuse |
| --- | --- | --- |
| Color, type, spacing, layout | `data/design-tokens.json` | CSS custom properties, typed company theme, Figma variable paths |
| Company identity | `data/corporate-profile.ts` | Letterhead, proposals, print previews |
| Shared web primitives | `components/ui/button.tsx`, `components/ui/card.tsx`, form primitives in `components/ui/` | Site and campaign interfaces |
| Letters and proposals | `components/brand-letter-template.tsx`, `components/brand-proposal-template.tsx` | Recipient, company profile, theme, scope, estimate, terms |
| Campaign and social masters | `data/marketing-templates.ts` | Caption starters, platform names, manual-only flag, channel limits, caption composition |
| Campaign/review data | `/api/admin/campaigns`, `/api/admin/social-posts`, `/api/admin/social-posts/batch` | Company-scoped persistence and review workflow |
| Brand preview | `/brand-preview` | Unlisted, noindex sample of foundations, UI components, and proposal |
| Operating guidance | `docs/design-system.md`, `docs/marketing-playbooks.md` | Figma handoff and campaign process |

The external `nxgcx-master-template` HTML/CSS was reviewed as a visual reference. Its palette differs from the approved token file, so the web application keeps the canonical token values. Its unverified claims and placeholder UI are not used as factual marketing copy.

## Foundations

`data/design-tokens.json` is the canonical contract for brand colors, spacing, typography, radii, control height, and content width. The `brand.platinum` token is `#C0C0C0`; use it for rules, dividers, and restrained structural accents. Do not use platinum for small text on white because contrast is insufficient. Prefer navy or charcoal for readable text.

The CSS `--nxg-*` variables mirror this contract. `NXG_BRAND_THEME` consumes its brand colors for document surfaces. Keep these names stable and update the mapping when a token is intentionally added or renamed.

## Component masters and usage

### Web

- `Button`: primary (`default`), accent (`secondary`), outlined, destructive, ghost, and link variants. Use semantic variants rather than per-page recoloring.
- `Card`: shared container with header, title, description, content, and footer slots. Keep page-specific spacing in composition rather than forked card primitives.
- Form primitives: shared input, label, textarea, and toast controls under `components/ui/`.
- Service and industry sections: use the existing `ServiceLandingPage` and `IndustryLandingPage` composition instead of copying complete page markup.

### Documents

- `BrandLetterTemplate`: company profile, letter date, recipient, subject, paragraphs/custom body, and sign-off.
- `BrandProposalTemplate`: letter shell plus overview, scope, optional timeline, line-item estimate, exclusions, validity, terms, and sign-off.
- Keep estimates as numeric values for formatting. Do not infer rates, project commitments, or legal terms from sample data. Review all commercial terms before sending or signing.

### Marketing

- A campaign brief must be approved before it is public or used to create social drafts.
- Channel names, character limits, copy starters, and caption composition live in `data/marketing-templates.ts`; do not fork these between the workbench and API.
- Batch social creation accepts one to five unique channels, validates their limits, and writes drafts plus audit entries in a transaction. It never schedules, queues, or publishes.
- Facebook Marketplace is explicitly manual-only. Requested schedule timestamps remain planning metadata.

## Figma library setup and variable map

The token JSON includes `figma.collection = "NXG Foundations"`, stable token keys, and explicit variable path mappings. Create or maintain these Figma pages in the authorized design file:

1. `00 — Cover`: owner, version, usage notes, and component status.
2. `01 — Foundations`: color variables (including `Color/Brand/Platinum`), typography, spacing, radii, and layout.
3. `02 — Components`: button variants/states, content cards, fields, labels, alerts, and navigation.
4. `03 — Templates`: letter, proposal, campaign landing, and social-copy review layouts.
5. `04 — Examples`: residential, commercial/property-manager, and service-page compositions using approved assets.

Use component properties and variants instead of duplicating frames: button `Variant` and `State`; card `Media` and `Density`; field `State` and `Required`; template `Document type` and `Approval state`. Keep variable names aligned with `figma.variableMappings`. Platinum should be a fill/border/accent token, not a small-text color.

Figma is currently a documented handoff, not a live synchronized library: this workspace has no target file URL, user-authorized file access, or configured Figma write connection. Open `/brand-preview` locally to review the real coded tokens and masters. To sync, provide the target Figma file URL and confirm access to its library. Then map variables, create component variants, inspect the resulting file, and record the reviewed file URL; do not report a sync before those steps are complete.

## Run and review

```sh
pnpm dev
```

Review the site pages and `/brand-preview`. The preview page is intentionally omitted from the sitemap and sets `noindex`. Use an authenticated session to review `/dashboard/content`; draft and approval states should be checked before content is shared.

Before a release: run the TypeScript check and production build, review changed pages at desktop and mobile widths, apply migrations in order in the intended environment, and verify authentication and company scoping. Only merge through an approved PR after the source/target branch diff and checks are reviewed. Never deploy the local uncommitted worktree directly to production.
