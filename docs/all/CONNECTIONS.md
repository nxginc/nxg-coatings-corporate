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
| Email / Mailtrap | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `CONTACT_TO_EMAIL` | Sends contact notifications through SMTP when configured and enabled in the admin Connections page. For Mailtrap, copy its SMTP host, username, and password from the Email Sending SMTP settings. `MAILTRAP_API_TOKEN` is not consumed by this app and cannot replace `SMTP_PASS`. |
| HubSpot | `HUBSPOT_PRIVATE_APP_TOKEN` | Syncs contact submissions after the HubSpot integration is enabled. A token alone does not enable sync. |
| Cloudinary | Either `CLOUDINARY_URL` or `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` | Signs staging upload requests to `nxgcoatings/staging/intake/<type>`. The URL form is parsed server-side; the API secret is never returned to the browser. Cloudinary creates the remote folder when an authorized upload is first made. |
| Contentstack | `CONTENTSTACK_WEBHOOK_SECRET` | Validates webhook-triggered path revalidation. CMS content delivery and synchronization are not implemented. |
| Government opportunity tracker | No provider credentials | Stores operator-entered opportunities with source links in the admin workspace. It does not authenticate to grant portals, submit applications, or automate batch submissions. |

## Catalog entries that still need implementation or account authorization

The provider catalog can show required credentials for these entries, but
environment variables alone do not create an integration:

- Vista Social, ImageKit, Meta Pages/Instagram/Messenger, Google Business
  Profile, and Google Ads do not have operational adapters in this app. The
  admin catalog labels these as unavailable and rejects attempts to enable
  them, even if their credentials are present.
- Indeed and Yelp drafts are available in `/dashboard/hiring-reputation` for
  admin review and manual handoff only; they do not connect to either provider.
- Stripe and Telnyx are optional catalog entries; payment and SMS/voice
  operations are not implemented by setting their keys alone.
- Facebook Marketplace, Nextdoor, Yelp, and Thumbtack remain manual-only.
  Do not automate scraping, bidding, or publishing outside approved provider
  APIs and policies.
- The larger blueprint also describes Microsoft 365, Slack, LinkedIn, Indeed,
  and other future workflows. Those references are not active connectors in
  this website. Add provider code and a reviewable authorization flow before
  requesting or storing their credentials.
- The site's client message widget submits an asynchronous CRM contact lead;
  it is not live chat and does not support threaded replies. Messenger account
  connection and inbox handling are not implemented.
- Admins can send individual lead email replies after explicit confirmation.
  SMTP must be configured and enabled; attempts and delivery results are kept
  in the CRM reply history.
- Google Business Profile directory updates, third-party directory listing
  synchronization, and ad campaign optimization/spend controls are not
  implemented. Keep those changes manual and approval-gated.

## Safe setup and verification

1. Copy `.env.example` to `.env` for local development and replace placeholders
   using credentials from the corresponding provider account.
2. Set the same required server-side variables in the deployment environment;
   do not expose secrets through `NEXT_PUBLIC_*` variables.
3. Visit `/dashboard/connections`. Only entries with an implemented adapter and
   configured server-side variables can be enabled. The current catalog does
   not provide browser-based OAuth connection flows; configured credentials
   are not proof of account authorization or a successful live request.
4. Exercise the actual workflow (for example, submit a test contact or perform
   a staging upload) and inspect the provider response/logs. The dashboard
   readiness label by itself is not a live connection test.
5. Keep outbound publishing, campaign sending, payments, ad spend, and other irreversible
   operations approval-gated.

## Ads, directories, and scaling

- Campaign copy and social drafts are internal planning/review features. No
  Facebook Page/Messenger, Google Ads, or Google Business Profile account is
  connected by this repository; a key in the environment does not create the
  connector. Implement OAuth, scope validation, provider-side account checks,
  audit records, and approval gates before enabling those actions.
- Regional SEO can improve crawlable metadata, structured business details,
  sitemap coverage, and on-page relevance, but search rankings are controlled
  by search engines and cannot be guaranteed by an admin toggle.
- Scaling requires deployment-specific capacity planning, connection-pool
  limits, rate limiting, observability, backups, and load testing. This app's
  current PostgreSQL pool and deployment manifest do not constitute an
  autoscaling configuration.

If an account credential is unavailable, leave that integration disabled and
request the credential through the approved local/deployment secret manager.
