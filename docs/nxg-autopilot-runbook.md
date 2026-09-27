# NXG Corporate Autopilot Runbook

This runbook defines the local-first automation boundary for the NXG Coatings corporate site. It keeps content, media, CRM, social scheduling, and paid media connected through reviewable records rather than direct browser automation.

## Operating flow

```text
asset intake → provenance + alt text → content draft → render QA
→ human approval → provider queue → publish response → analytics record
```

## Connected surfaces

| Surface | Current role | Release gate |
| --- | --- | --- |
| Next.js / Vercel | Website, metadata, responsive UI, preview builds | Preview validation, then production approval |
| ImageKit | Existing canonical public asset URLs | Keep originals stable; signed upload config required |
| Cloudinary | Staging uploads, renditions, campaign media | Credentials, provenance, asset approval |
| Contentstack | Editorial source for pages, campaigns, and social drafts | Delivery/webhook configuration |
| HubSpot | Lead/contact and lifecycle handoff | Private app token and field mapping |
| Vista Social | Approved post scheduling and inbox analytics | Workspace/token and platform policy |
| Facebook groups / Marketplace | Manual community publishing | Human review; no auto-post bypass |
| Meta / Google Ads | Draft targeting and campaign operations | Budget, targeting, creative, and policy approval |

## Required safeguards

- Keep uploaded assets in staging until rights, source, alt text, tenant, and approval metadata are complete.
- Keep campaign copy, creative, targeting/budget, and publication approvals as separate records.
- Require an idempotency key and provider post ID before marking a social or ad operation published.
- Keep failed provider operations visible and retryable only after operator review.
- Do not invent discounts, project outcomes, warranties, customer quotes, or missing property details.
- Keep credentials in server-side environment configuration; never place tokens in content, HTML, or client components.

## Finish sequence

1. Validate the template and site metadata in a Vercel preview.
2. Verify the approved local asset catalog and Cloudinary staging credentials.
3. Connect Contentstack and HubSpot in the admin connections screen.
4. Generate social drafts from approved campaign records and queue Vista Social only after approval.
5. Prepare Facebook group and Marketplace copy as operator-ready drafts; publish manually.
6. Run responsive, accessibility, form, metadata, and provider-response QA.
7. Approve production deployment and record the deployment URL and revision.

The repository contains the adapter contracts and approval gates. A successful local build or successful upload does not prove that a provider is connected or that a post was published.
