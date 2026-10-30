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
| Contentstack | `CONTENTSTACK_API_KEY`, `CONTENTSTACK_DELIVERY_TOKEN`, `CONTENTSTACK_ENVIRONMENT`, `CONTENTSTACK_REGION`, `CONTENTSTACK_BLOG_CONTENT_TYPE_UID`; optional `CONTENTSTACK_LOCALE`. Draft sync additionally requires `CONTENTSTACK_MANAGEMENT_TOKEN`; optional `CONTENTSTACK_BLOG_FIELD_MAP` maps local article fields to stack field UIDs. | Reads published blog entries into `/blog` and the dynamic sitemap when enabled. `/dashboard/connections` has a read-only delivery check. Approved local drafts can be created or updated in Contentstack from `/dashboard/content`; CMS entries remain unpublished until separately published by an authorized reviewer in Contentstack. Keep both tokens server-only. |
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
- The site chat widget stores token-protected asynchronous conversations in
  Postgres; staff can reply from `/dashboard/chat`. This is not real-time
  staffed support, external Messenger inbox integration, or model-powered AI.
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
- Paid-media plans, proposed budgets, keyword themes, and paid UTM previews in
  the marketing workbench are internal drafts. They do not launch campaigns or
  spend money. `db/migrations/008_campaign_ad_plans.sql` adds the planning
  metadata.
- Approved editorial drafts can be synced to Contentstack through the
  Management API after configuring its server-side token and applying
  `009_contentstack_entry_sync.sql`. The default field mapping is `title`,
  `url`, `excerpt`, `body_markdown`, and `category`. To use different field
  UIDs, set `CONTENTSTACK_BLOG_FIELD_MAP` to a JSON object with `title`,
  `slug`, `excerpt`, `bodyMarkdown`, and `category` properties. Draft sync
  never publishes; use Contentstack's own reviewed publish workflow.
- Regional SEO can improve crawlable metadata, structured business details,
  sitemap coverage, and on-page relevance, but search rankings are controlled
  by search engines and cannot be guaranteed by an admin toggle.
- Scaling requires deployment-specific capacity planning, connection-pool
  limits, rate limiting, observability, backups, and load testing. This app's
  current PostgreSQL pool and deployment manifest do not constitute an
  autoscaling configuration.

Apply migrations in numeric order through `010_career_openings.sql`;
this release adds `007_chat_inbox.sql` for website chat transcripts and staff
replies, `008_campaign_ad_plans.sql` for paid-media planning metadata,
`009_contentstack_entry_sync.sql` for Contentstack entry linkage, and
`010_career_openings.sql` for admin-managed careers listings. For
Contentstack, configure a `blog_post` content type (or set
`CONTENTSTACK_BLOG_CONTENT_TYPE_UID`) with `title`, `slug` or `url`, `excerpt`,
`body_markdown`/`body`, `category`, and an optional `publish_date`,
`read_time`, and `featured_image`. Supported delivery and Management API
regions are `us`, `eu`, and `au`. Delivery entries are read-only; approved
local drafts can be synced with the configured Management token.

If an account credential is unavailable, leave that integration disabled and
request the credential through the approved local/deployment secret manager.
