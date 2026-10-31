# Website quality checks

## Automated checks

- Use Node `>=20.19.0 <21` as declared in `package.json`.
- Run `pnpm build` for production compilation, route generation, and Next.js type validation.
- Run `pnpm exec tsc --noEmit` after a build has generated `.next/types` for a standalone TypeScript check.
- `pnpm lint` is currently interactive because Next.js ESLint configuration has not been initialized. Do not claim a lint pass until the repository has a non-interactive lint configuration and the command succeeds.
- No automated test runner or test script is currently configured. Add focused tests when introducing testable logic or a supported test harness.

## Manual checks when browser/runtime access is available

- Check desktop, tablet, and mobile layouts; navigation open/close; keyboard access; focus visibility; and reduced-motion behavior.
- Follow every new internal CTA and verify route, service query prefill, sitemap inclusion, and metadata.
- Submit valid and invalid estimate, contact, consultation, partner, and newsletter inputs. Verify validation, pending state, actionable errors, and truthful success behavior.
- Apply migrations through `010_career_openings.sql`; test chat creation, token-only retrieval, staff reply/close/reopen, message limits, and audit rows against a non-production database.
- Test blog draft creation, review/approval/publish/unpublish transitions, public detail rendering, sitemap inclusion, and Contentstack delivery with a staging stack. Confirm missing credentials leave the provider disabled and never expose tokens.
- With a staging Contentstack stack and Management token, verify approved draft create/update, configured field mappings, duplicate-slug conflict behavior, audit records, and that draft sync never publishes.
- Verify careers draft creation, admin publish/close/reopen transitions, audit rows, public display of published openings only, mailto role inquiries, and the empty state when no openings are published.
- Verify paid-media plans generate correctly tagged preview URLs and never call Google/Meta APIs or change spend.
- Ensure preferred calendar choices are described as requests until confirmed; test past/invalid date rejection at the UI and API boundaries.
- Confirm no public page displays placeholder links, broken images, invented reviews/ratings, or unsupported commercial claims.
- Review the browser console and network requests, image loading, canonical/OG metadata, robots/sitemap, and not-found behavior.
- Test configured persistence/integrations only in a safe environment with authorized credentials; never expose secrets or perform production sends during validation.

## Known validation limitations

- In restricted sandboxes, local web server binding may be denied; report this as a runtime/browser smoke-test limitation rather than a passing result.
- Database, SMTP, HubSpot, and any optional integration behavior cannot be verified without a controlled test environment and configuration.
- Do not test production sends, publishing, migrations, or external side effects without explicit authorization.
