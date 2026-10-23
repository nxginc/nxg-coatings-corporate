# Integration connection setup

The dashboard's Connections page reports server-side configuration and stores
provider enable/disable decisions. A green credential status is not proof that
an external account authorized the app or that a live request succeeded.
Keep secrets in local/deployment environment settings; never commit them or
paste them into chat.

## Core connections

| Connection | Required configuration | What the running app currently does |
| --- | --- | --- |
| Neon Postgres | `DATABASE_URL` (pooled URL for app requests); `DATABASE_URL_UNPOOLED` is optional for migrations/admin tasks | Stores leads and integration settings. The app requires `DATABASE_URL`; an unpooled URL is not an automatic substitute. |
| Admin authentication | `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` | Protects dashboard and admin APIs. Generate the secret and password hash locally using the documented admin setup. |
| Email / Mailtrap | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `CONTACT_TO_EMAIL` | Sends contact notifications through SMTP when configured. For Mailtrap, copy its SMTP host, username, and password from the Email Sending SMTP settings. `MAILTRAP_API_TOKEN` is not consumed by this app and cannot replace `SMTP_PASS`. |
| HubSpot | `HUBSPOT_PRIVATE_APP_TOKEN` | Syncs contact submissions after the HubSpot integration is enabled. A token alone does not enable sync. |
| Cloudinary | Either `CLOUDINARY_URL` or `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` | Signs staging upload requests. The URL form is parsed server-side; the API secret is never returned to the browser. |
| Contentstack | `CONTENTSTACK_API_KEY`, `CONTENTSTACK_DELIVERY_TOKEN`, `CONTENTSTACK_ENVIRONMENT`, `CONTENTSTACK_REGION`, `CONTENTSTACK_WEBHOOK_SECRET` | Validates the configured Contentstack webhook. This is not a complete CMS content-sync adapter. |
| Government opportunity tracker | No provider credentials | Stores operator-entered opportunities with source links in the admin workspace. It does not authenticate to grant portals, submit applications, or automate batch submissions. |

## Catalog entries that still need implementation or account authorization

The provider catalog can show required credentials for these entries, but
environment variables alone do not create an integration:

- Vista Social, ImageKit, Meta Pages/Instagram, Google Business Profile, and
  Google Ads need their provider adapters and/or account authorization tested
  before they should be treated as live.
- Stripe and Telnyx are optional catalog entries; payment and SMS/voice
  operations are not implemented by setting their keys alone.
- Facebook Marketplace, Nextdoor, Yelp, and Thumbtack remain manual-only.
  Do not automate scraping, bidding, or publishing outside approved provider
  APIs and policies.
- The larger blueprint also describes Microsoft 365, Slack, LinkedIn, Indeed,
  and other future workflows. Those references are not active connectors in
  this website. Add provider code and a reviewable authorization flow before
  requesting or storing their credentials.
- No live-chat provider is configured. Contact forms create CRM leads; do not
  present them as a real-time staffed chat channel.

## Safe setup and verification

1. Copy `.env.example` to `.env` for local development and replace placeholders
   using credentials from the corresponding provider account.
2. Set the same required server-side variables in the deployment environment;
   do not expose secrets through `NEXT_PUBLIC_*` variables.
3. Visit `/dashboard/connections` and configure the required variables before
   enabling a provider. OAuth entries still require consent and scope checks.
4. Exercise the actual workflow (for example, submit a test contact or perform
   a staging upload) and inspect the provider response/logs. The dashboard
   readiness label by itself is not a live connection test.
5. Keep outbound publishing, campaign sending, payments, and other irreversible
   operations approval-gated.

If an account credential is unavailable, leave that integration disabled and
request the credential through the approved local/deployment secret manager.
