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
- Meta Pages and Google Business Profile OAuth with destination selection; only approved social drafts can be published, and business listing updates require a separate reviewed sync action.
- Gallery cards lead to service/industry pages. Project case studies and before/after imagery require verified, approved project assets.

Apply database migrations before using admin workflows with `pnpm db:migrate`. The runner reads `DATABASE_URL_UNPOOLED` first (then `DATABASE_URL`), applies numbered SQL files in order, and records each successful migration in `nxg_schema_migrations`. For production, pull the Vercel Production environment into a protected local env file, run the migration, then remove that file. Contentstack draft sync also requires a server-side `CONTENTSTACK_MANAGEMENT_TOKEN`; synced drafts are not published automatically.

Meta/Google Business Profile setup requires OAuth app credentials in the server environment and provider callback URLs ending in `/api/admin/oauth/meta-pages/callback` or `/api/admin/oauth/google-business-profile/callback`. Run migration `011_provider_oauth.sql` before connecting. Provider tokens are AES-GCM encrypted in Postgres using a key derived from `AUTH_SECRET`; rotating that secret requires reconnecting the providers. OAuth configuration alone does not prove account access or publishing permission. Facebook Marketplace, Instagram, Messenger, Google Ads spend, and scheduled/automatic publishing remain out of scope.

## CI/CD and environment files

GitHub Actions runs ESLint and a production build on pull requests and pushes to `main` and `nxgx-update`; a separate Gitleaks job scans repository history for committed credentials. Vercel is linked to this GitHub repository and handles deployments through its Git integration. The workflow does not receive production credentials. `.gitignore` and `.vercelignore` exclude `.env*`; keep actual environment files out of commits and deployment uploads. Use `.env.example` for names and non-secret setup guidance only.

## Safety/approval baseline
Human approval is required by default for outbound messages, campaigns, financial commitments, contracts/proposals, employment decisions, partner verification, customer imagery publication, and production publishing. Use only authorized integrations and permitted APIs/feeds/imports/exports.

## Canonical flow
SOURCE -> INGEST -> NORMALIZE -> IDENTITY/DEDUPE -> VET -> ROUTE -> SALES/CRM -> ESTIMATE/RFQ -> PROJECT -> PROCUREMENT/BILLING -> MEDIA/CONTENT -> FOLLOW-UP/REPEAT
