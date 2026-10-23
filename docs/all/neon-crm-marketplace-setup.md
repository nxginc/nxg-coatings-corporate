# Neon, CRM, blogging, and marketplace setup

## Neon database

- Use `DATABASE_URL` with the pooled hostname for normal Next.js requests.
- Use `DATABASE_URL_UNPOOLED` for migrations, dumps, and administrative session work.
- Apply migrations in order on a Neon preview branch first, then promote after review.
- Keep production credentials server-side; the admin connections screen only reports readiness and stores explicit enable/disable decisions.

## Database capabilities added

- `nxg_blog_posts` stores draft, review, approval, published, and archived article records.
- `nxg_lead_vetting_events` stores every deterministic vetting run with actor, score, status, and flags.
- `nxg_leads` now stores the latest score and missing-information flags.
- Blog drafts are created through `/api/admin/blog`; publishing still requires an approved content workflow.
- Lead vetting runs through `/api/admin/leads/vetting`; it never auto-rejects, contacts, bids, or promises work.

## HubSpot and CRM API

1. Configure `HUBSPOT_PRIVATE_APP_TOKEN` server-side.
2. Enable HubSpot only after the admin readiness screen reports configured.
3. New leads sync idempotently by email; failed syncs remain visible for retry.
4. Map lifecycle, service, lead type, and attribution fields in HubSpot before production use.

## Nextdoor, Yelp, and Thumbtack

These providers are cataloged as `manual_only`. The system can prepare reviewed lead-response, profile, and campaign drafts, but it does not scrape, auto-bid, bypass platform controls, or auto-publish into community groups or marketplaces.

## Social and content automation

Use the existing sequence: asset provenance → content draft → render QA → human approval → provider queue → provider ID → analytics. Vista Social remains the approved scheduling adapter; Cloudinary remains staging/rendition infrastructure; Contentstack remains the editorial source when configured.
