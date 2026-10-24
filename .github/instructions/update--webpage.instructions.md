---
description: "Use when creating, updating, or reviewing NXG public website pages, navigation, page content, responsive layouts, CTAs, forms, metadata, or route behavior."
name: "NXG Website Updates"
applyTo:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# NXG website update guidance

- Read the relevant page, shared component, related data module, and `lib/seo.ts` before editing. Reuse existing `ParallaxHero`, `ServiceLandingPage`, `IndustryLandingPage`, form, and UI patterns where they fit.
- Keep global navigation, footer links, public routes, `app/sitemap.ts`, and route metadata in sync. Use valid internal destinations; do not ship `#`, dead links, empty click handlers, or CTAs with no outcome.
- Keep each page complete across phone, tablet, and desktop. Preserve semantic headings, meaningful image alternatives, visible keyboard focus, native form constraints, and accessible status/error messaging.
- Connect forms to an existing API and schema where possible. Validate on the client for usability and on the server for correctness; preserve pending, actionable failure, and truthful success states.
- Use approved company facts from `lib/site-metadata.ts` and page content in `data/`. Avoid unsupported guarantees, ratings, reviews, business claims, pricing, or appointment confirmations.
- Use existing brand tokens and the logo/assets catalog. Don't copy visual identity, wording, or fictitious ratings from reference screenshots.
- Do not remove functional features or unrelated content to make a page appear complete. If required content, destination, or business policy is unknown, preserve the existing behavior and flag the gap rather than making up an answer.
- Before completion, run the production build, inspect relevant route and API changes, and report any validation that could not run.
