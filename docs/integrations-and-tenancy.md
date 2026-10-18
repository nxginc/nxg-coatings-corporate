# NXG Integration and Multi-Company Blueprint

## Operating Model

The current deployment is one company per Vercel project. Set `NXG_COMPANY_ID` per project and use a shared PostgreSQL database only after migration `003_companies_integrations.sql` has been applied. Each operational API filters by that company ID. Add another company by inserting its row in `nxg_companies`, creating an isolated Vercel project/environment, and setting that project's company ID and domains. This is an isolation boundary for deployments, not a public multi-tenant SaaS login model.

`pnpm-workspace.yaml` reserves `apps/*` and `packages/*` for later extraction. Keep the current Next.js app at the workspace root until there is a second application. Future shared packages can be introduced as `packages/brand-contract`, `packages/contentstack`, and `packages/integrations` without moving today's app prematurely.

## CMS and Contentstack

Use Contentstack as the editorial source of truth for company pages, services, service areas, project stories, blog posts, campaigns, and social drafts. Keep leads and partner applications in PostgreSQL; keep HubSpot as the CRM contact/deal system. The local asset catalog remains the CDN URL/metadata handoff until content entries own the approved asset records.

Suggested Contentstack content types:

- `company`: tenant ID, brand tokens, domains, service region, timezone, contact details, social profiles.
- `page`: company, locale, slug, title, body, SEO title/description, canonical, social image, publication state.
- `service`, `industry`, `service_area`, and `project`: company-scoped records with reviewed copy and linked assets.
- `campaign`: company, slug, audience, landing route, offer, UTM defaults, approved assets, channel variants, approval state.
- `social_post`: campaign reference, channel, caption, media references, destination URL, schedule request, approval state, provider result.
- `asset`: immutable source ID/hash, CDN URL, alt text, rights/consent, service/location tags, renditions, and approval state.

Bootstrap using the region assigned to the Contentstack stack. Minnesota is a North American operating location; do not copy `AWS-EU` from an example unless the actual stack is provisioned in Europe. CLI setup from an operator terminal:

```sh
npm install -g @contentstack/cli
csdx config:set:region <region-assigned-to-the-stack>
csdx auth:login
csdx cm:bootstrap --app-name "NXG Coatings"
```

Use the seed-stack command only when creating from the referenced seed repository and with the correct organization ID. Keep the Management token server-only and use delivery credentials for public reads. Configure a Contentstack webhook to `POST /api/webhooks/contentstack` with `x-contentstack-webhook-token` and JSON `{ "companyId": "nxg-coatings", "paths": ["/blog", "/services/exterior-painting"] }`. Revalidation is company-checked and path-validated.

## Connections

The admin connections API stores only provider enabled state, company ID, actor, and timestamp. It never stores or returns provider secrets. Set credentials in Vercel Environment Variables or a managed secret store, then refresh `/dashboard/connections`. Enabling a provider is blocked until required environment variable names are present.

| Provider | Intended use | Current connection boundary |
| --- | --- | --- |
| Contentstack | CMS delivery, editorial workflow, revalidation | Env readiness and signed revalidation hook; delivery SDK/bootstrap still needs stack credentials |
| HubSpot | Contact sync and CRM workflows | Idempotent contact upsert is wired; HubSpot native workflows/deal pipeline need portal setup |
| Vista Social | Social scheduling, inbox, and analytics | Drafts and approvals are stored; provider publishing adapter is not enabled |
| ImageKit | Existing source CDN | Existing public URLs stay canonical; signed uploads need ImageKit keys |
| Cloudinary | Optional signed uploads and social renditions | Add only when media workflow is configured; do not migrate ImageKit originals by default |
| Meta Pages / Instagram | Approved page publishing and insights | Requires app review, OAuth scopes, and connected business assets |
| Facebook Marketplace | Reviewed copy/media handoff | Manual-only; no generic service-listing auto-publish is enabled |
| Google Business Profile / Ads | Local profile and paid search | Requires OAuth, account/location IDs, policy checks, and conversion configuration |
| Stripe / Telnyx / SMTP | Deposits, SMS/voice, email | Optional server-side credentials and webhook validation |

## Automation Lifecycle

Asset intake → immutable source registration → metadata/alt text → campaign draft → content variants → QA → human approval → provider queue → publish result → analytics and attribution. New claims, new campaign families, generated creative, and Marketplace copy require human review. Provider failures remain visible as failed/pending; retries must be idempotent. Do not mark records published until the provider returns an external post ID.

The admin APIs currently cover lead status, partner review, campaign drafts, social drafts, approval transitions, and integration enablement. External scheduling/publishing, OAuth callbacks, ad account operations, Contentstack write APIs, Stripe checkout, and Telnyx messaging require account credentials and provider-side setup before activation.

## Domains and Release Environments

- Production website: `nxgcoatingsinc.com` with `www` redirected to the canonical host.
- Campaign host: `go.nxgcoatingsinc.com`; middleware maps campaign slugs and preserves UTM/click IDs into the primary quote URL.
- Development alias: attach `development.nxgcoatingsinc.com` to the Vercel preview deployment for `nxgxc-updates`; use separate preview environment variables and a non-production database.
- Configure DNS in Cloudflare using the exact targets shown by Vercel for each attached domain. Domain attachment and OAuth consent URLs must be completed in the provider dashboards.

## Admin Secret Setup

Run `npm run admin:secrets` in a trusted local terminal. The password is entered without echo and is never written to a file; the command prints `AUTH_SECRET` and a salted scrypt `ADMIN_PASSWORD_HASH`. Add both as Vercel environment variables for Preview and Production as appropriate, set `ADMIN_EMAIL`, then redeploy. Never paste the password or generated secrets into chat, source control, Contentstack, or client-side variables.

## Migrations and Launch Gate

Apply SQL migrations in numeric order: leads/partners, campaigns/social, then companies/integrations. Confirm `NXG_COMPANY_ID` exists in `nxg_companies` before enabling a connection. Launch only after form writes, CRM isolation, auth, partner consent, campaign approvals, webhook signature checks, UTM capture, backups, and provider permissions have been verified in the development deployment.
