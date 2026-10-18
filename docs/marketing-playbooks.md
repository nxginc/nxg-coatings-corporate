# NXG Marketing Templates and Playbooks

This playbook is the working contract for campaign briefs and channel copy in the authenticated content workbench. Campaigns and social posts start as drafts, pass a human review, and are never published by these templates or APIs.

## Campaign brief template

Complete a brief before writing channel variants:

| Field | What to enter |
| --- | --- |
| Campaign title / slug | A specific internal name and a lowercase URL-safe slug |
| Service | The service page or reviewed service offering being promoted |
| Audience | A clearly defined residential, commercial, HOA, or property-management audience |
| Description | Customer need, reviewed offer or educational angle, and the next step |
| Landing page | `/campaigns/<slug>`; the campaign becomes public only after approval |
| Image | An approved HTTPS ImageKit asset; confirm usage rights and accurate alt text |
| Channel variants | Native copy for Facebook, Instagram, LinkedIn, and Google Business Profile |

Do not add unsupported guarantees, prices, deadlines, project outcomes, certifications, or claims about products. Use factual, reviewable language; qualify any estimate or schedule as subject to project review. Do not include personal information, private addresses, or identifiable customer/project photos without permission.

## Channel copy pattern

Write each channel version independently rather than cross-posting identical copy:

1. **Context:** name the property need or decision.
2. **Useful detail:** explain what a project review, preparation, or consultation helps determine.
3. **Next step:** one low-pressure CTA, such as “Request a project review.”
4. **Destination:** use the approved campaign landing page.
5. **Proof and assets:** use only verified statements and approved media.

Caption limits and starter templates are centralized in `data/marketing-templates.ts` and enforced in both the workbench and batch API:

| Channel | Limit | Notes |
| --- | ---: | --- |
| Facebook | 5,000 | Keep the opening useful before any “see more” fold. |
| Instagram | 2,200 | Use approved project media and readable line breaks. |
| LinkedIn | 3,000 | Emphasize property operations, scope clarity, and professional context. |
| Google Business Profile | 1,500 | Keep the service and local next step clear. |
| Facebook Marketplace | 5,000 | Manual handoff only; never automated publishing. |

Suggested editorial angles: seasonal exterior planning, surface-preparation education, color consultation, cabinet refinishing, deck maintenance, and commercial/property-manager project coordination. Use the corresponding approved service page and asset; do not present a starter as a claim about a specific completed job.

## Review and operating cadence

1. Draft the campaign and channel copy; attach only licensed, approved assets.
2. Check claims, spelling, destination, alt text, channel fit, and character limits.
3. Submit the campaign for review. An authorized reviewer checks the public landing page and approves or rejects it.
4. Create one social draft per selected channel. Review each caption and destination independently.
5. Submit each post for review; approval is recorded per post.
6. Treat `scheduledAt` as a requested planning time only. It does not enqueue, schedule, or publish content.
7. After external provider setup is separately authorized, record the provider result and external post ID through a dedicated integration workflow. Never mark content published based only on a requested time.

Marketplace content remains a reviewed manual handoff. No API in this workflow publishes, queues, or automates Marketplace listings.

## Next.js API setup

### Prerequisites

- Apply migrations `001` through `003` in order; the company-scoped campaign and audit tables must exist.
- Configure server-only `DATABASE_URL`, `NXG_COMPANY_ID`, and the existing admin authentication environment. Never put database or provider credentials in `NEXT_PUBLIC_*` variables.
- Use an authorized admin session. These routes return `401` without one.
- Keep provider credentials and social integrations disabled until OAuth scopes, pages, consent, and provider-side review are explicitly configured.

### Create an approved campaign first

`POST /api/admin/campaigns` accepts the campaign brief fields used by the workbench. The campaign must be approved before it is publicly available or can be used to create social drafts.

### Create a batch of social drafts

`POST /api/admin/social-posts/batch` accepts one approved campaign and 1–5 posts with distinct platforms. It enforces per-channel caption limits and stores every post plus its audit event in one PostgreSQL transaction. If any insert fails, the entire batch rolls back. Every created post remains in `draft` status.

Example request:

```json
{
  "campaignId": "00000000-0000-4000-8000-000000000000",
  "posts": [
    {
      "platform": "facebook",
      "caption": "Planning an exterior project? A project review can help clarify surfaces, preparation, and next steps.",
      "destinationUrl": "https://nxgcoatingsinc.com/campaigns/spring-exterior"
    },
    {
      "platform": "linkedin",
      "caption": "Property teams can start an exterior painting conversation by reviewing building surfaces, access, and timing. Request a project review to discuss scope.",
      "destinationUrl": "https://nxgcoatingsinc.com/campaigns/spring-exterior",
      "scheduledAt": "2026-04-15T15:00:00.000Z"
    }
  ]
}
```

Example request from an authenticated operator terminal (replace the session cookie and IDs locally; do not paste credentials into source control):

```sh
curl --fail-with-body \
  -X POST "https://<your-host>/api/admin/social-posts/batch" \
  -H "Content-Type: application/json" \
  -H "Cookie: <admin-session-cookie>" \
  --data-binary @social-draft-batch.json
```

On success, the response contains the created `posts` array and returns HTTP `201`. Validation errors return `400`; an unknown company-scoped campaign returns `404`; a campaign that is not approved returns `409`; missing database configuration returns `503`. The route does not set `approved`, `queued`, or `published` status and does not call a social provider.

## Content and brand handoff

- Keep the corporate identity and document defaults in `data/corporate-profile.ts`.
- Keep color, layout, spacing, and typography tokens in `data/design-tokens.json`; the corporate profile derives its shared document theme from those values.
- Keep platform limits, manual-only metadata, copy starters, and caption assembly in `data/marketing-templates.ts`.
- Use `BrandLetterTemplate` for letters and `BrandProposalTemplate` for proposal layouts. Verify recipient, estimate, scope, exclusions, validity, and terms before export or signature.
- Use `CommercialPaintingProposalTemplate` for commercial painting bids. Supply approved project-specific amounts, specifications, schedule, warranty, and terms; `COMMERCIAL_PROPOSAL_TERMS_TEMPLATE` is an editable draft only. The preview's sample cost breakdown is not an offer or an approved price list.
- Figma mapping is documented in `docs/design-system.md`; it is a manual token handoff until the user supplies an authorized target file and requests a sync.
- Visit `/brand-preview` in the local app to review the coded design-system sample; its route is intentionally noindex and excluded from the sitemap.
