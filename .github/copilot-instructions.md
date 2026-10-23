# NXG Coatings project instructions

## Product and source of truth
- This repository is the NXG Coatings corporate website and its connected lead-intake, partner, content, and internal admin workflows. Do not assume future blueprint modules are live product requirements unless the task explicitly brings them into scope.
- Follow the active implementation and canonical project data in `lib/site-metadata.ts`, `lib/assets.ts`, `lib/seo.ts`, `data/`, and `app/`. When documentation conflicts with running code or approved user requirements, call out the conflict and do not invent business facts.
- Keep customer-facing copy factual. Do not fabricate testimonials, star ratings, guarantees, insurance/licensing claims, pricing, availability, job openings, or completed work. Treat appointment choices as requests until staff confirm them.
- Use the NXG design tokens in `app/globals.css`; preserve the site’s navy, red, platinum, editorial layout, accessible contrast, and responsive behavior. Treat supplied references as visual guidance, not permission to copy another brand.

## Implementation rules
- Complete the requested behavior end-to-end: page/UI, navigation, validation, API/schema/persistence, feedback states, SEO, and tests or build verification as applicable. Do not ship dead buttons, placeholder destinations, silent fallbacks, or success messages for failed operations.
- Reuse existing components, schemas, API handlers, `ASSETS`, `NXG_SITE`, and SEO helpers before adding new abstractions or dependencies.
- Keep form validation consistent between the browser and Zod server schemas. Show actionable errors and explicit success/pending states. Do not describe a requested consultation as a confirmed booking.
- Use `next/link` for internal navigation and `next/image` for images. Keep external image URLs in `lib/assets.ts`; verify each image is appropriate and has descriptive alt text.
- Preserve privacy and least privilege. Never expose secrets, credentials, private customer data, or administrative APIs in client code. Require explicit human approval for outbound publishing, campaign sending, financial or contractual commitments, and other irreversible actions.
- Keep route metadata, sitemap entries, canonical URLs, and navigation aligned when adding or removing public pages. Use accessible labels, keyboard-operable controls, focus styles, and reduced-motion support.
- Make precise changes only. Preserve unrelated user worktree changes; do not revert or overwrite files outside the requested scope.

## Project structure
- `app/`: Next.js App Router pages, layouts, metadata, and API routes.
- `components/`: shared site UI and client interactions.
- `lib/`: data access, integrations, validation, assets, SEO, and site configuration.
- `data/`: curated website content.
- `.github/instructions/`: focused asset and webpage authoring guidance.
- `docs/all/`: reference material; confirm it matches active product requirements before treating it as implementation truth.
- Website routes and connected customer workflows: `docs/all/WEBSITE.md`. Validation limits and manual checks: `docs/all/QA.md`.

## Validation
- Runtime: use Node `>=20.19.0 <21` and pnpm (see `package.json`).
- Run `pnpm build` after application changes; Next.js build includes type validation. For an additional check, run `pnpm exec tsc --noEmit` after the build has generated `.next/types`.
- `pnpm lint` currently opens Next.js's interactive first-time ESLint setup; do not claim lint passed unless the repo has been configured and the command completes.
- Verify affected flows at mobile and desktop widths when browser testing is available. Check links, form constraints, pending/error/success states, keyboard use, and relevant API behavior. Report environmental blockers rather than implying unrun checks passed.
