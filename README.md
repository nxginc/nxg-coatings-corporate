# NXGXC v1.0.0 — Final Architecture Release

Unified NXG Coatings / Trade Connect / VXQ-XQ operating architecture.

## Platform principles
- NXG Coatings Inc. = operating business
- NXG Trade Connect = connectivity layer
- NXG Contractors = future network / marketplace
- NXG Partners = ecosystem
- VXQ / XQ = automation and intelligence control plane
- NXGXC = unified platform foundation

## Release scope
Website, quote intake, CRM/sales, Project Desk, field reports, estimates/proposals, Cloudinary media, content/social, ads/local acquisition, Trade Connect, partner portal, Contractor Passport, careers/recruiting, procurement, billing/Xero, analytics, AI provider abstraction, approvals, audit, deployment and QA.

## Website operations added
- Visitor-token-protected asynchronous website chat, with a staff inbox at `/dashboard/chat`.
- Editorial drafts and approval/publish workflow at `/dashboard/content`, with public database-backed articles.
- Contentstack Delivery API reads for published journal entries and Management API sync for approved drafts when configured and enabled; CMS publication remains manual.
- Admin-managed career openings can be published to `/careers`; visitors contact NXG directly and no application data is collected.
- Draft-only paid-media plans and UTM previews; no external ad publishing or spend control.
- Gallery cards lead to service/industry pages. Project case studies and before/after imagery require verified, approved project assets.

Apply database migrations in numeric order through `db/migrations/010_career_openings.sql` before using the new admin workflows. Contentstack draft sync also requires a server-side `CONTENTSTACK_MANAGEMENT_TOKEN`; synced drafts are not published automatically. Provider credentials and account authorization remain environment-managed; the website does not imply a provider is live merely because credentials are present.

## Safety/approval baseline
Human approval is required by default for outbound messages, campaigns, financial commitments, contracts/proposals, employment decisions, partner verification, customer imagery publication, and production publishing. Use only authorized integrations and permitted APIs/feeds/imports/exports.

## Canonical flow
SOURCE -> INGEST -> NORMALIZE -> IDENTITY/DEDUPE -> VET -> ROUTE -> SALES/CRM -> ESTIMATE/RFQ -> PROJECT -> PROCUREMENT/BILLING -> MEDIA/CONTENT -> FOLLOW-UP/REPEAT
