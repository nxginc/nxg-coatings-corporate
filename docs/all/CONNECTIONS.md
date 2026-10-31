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
| Email / Mailtrap | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `CONTACT_TO_EMAIL` | Sends contact notifications through SMTP when configured and enabled in the admin Connections page. For production, use Mailtrap Email Sending (not Email Sandbox), verify the sender domain, and use an allowed sender address for `FROM_EMAIL`. `MAILTRAP_API_TOKEN` is not consumed by this app and cannot replace `SMTP_PASS`. |
| HubSpot | `HUBSPOT_PRIVATE_APP_TOKEN` | Syncs contact submissions after the HubSpot integration is enabled. A token alone does not enable sync. |
| Cloudinary | Either `CLOUDINARY_URL` or `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` | Signs staging upload requests to `nxgcoatings/staging/intake/<type>`. The URL form is parsed server-side; the API secret is never returned to the browser. Cloudinary creates the remote folder when an authorized upload is first made. |
| Contentstack | `CONTENTSTACK_API_KEY`, `CONTENTSTACK_DELIVERY_TOKEN`, `CONTENTSTACK_ENVIRONMENT`, `CONTENTSTACK_REGION`, `CONTENTSTACK_BLOG_CONTENT_TYPE_UID`; optional `CONTENTSTACK_LOCALE`. Draft sync additionally requires `CONTENTSTACK_MANAGEMENT_TOKEN`; optional `CONTENTSTACK_BLOG_FIELD_MAP` maps local article fields to stack field UIDs. | Reads published blog entries into `/blog` and the dynamic sitemap when enabled. `/dashboard/connections` has a read-only delivery check. Approved local drafts can be created or updated in Contentstack from `/dashboard/content`; CMS entries remain unpublished until separately published by an authorized reviewer in Contentstack. Keep both tokens server-only. |
| Meta Pages | `META_APP_ID`, `META_APP_SECRET`, `AUTH_SECRET`; `META_GRAPH_API_VERSION` is optional and defaults to `v26.0` | Connects a Facebook Page with OAuth. Approved Facebook drafts can be published only through an explicit admin action. Instagram and Messenger are not included. |
| Google Business Profile | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET` | Connects a Google account, lets an admin select a location, syncs reviewed business name/address/website, and publishes approved local-post drafts after a separate admin action. |
| Government opportunity tracker | No provider credentials | Stores operator-entered opportunities with source links in the admin workspace. It does not authenticate to grant portals, submit applications, or automate batch submissions. |

## Catalog entries that still need implementation or account authorization

Environment variables alone do not create an integration:

- Vista Social, ImageKit, and Google Ads do not have operational adapters in this app.
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
- Google Business Profile local posts and selected business fields are
  supported through explicit admin actions. Third-party directory
  synchronization and Google Ads campaign optimization/spend controls are
  not implemented.

## Safe setup and verification

1. Copy `.env.example` to `.env` for local development and replace placeholders
   using credentials from the corresponding provider account.
2. Set the same required server-side variables in the deployment environment;
   do not expose secrets through `NEXT_PUBLIC_*` variables.
3. Apply migrations through `011_provider_oauth.sql`, then visit
   `/dashboard/connections`. Set up each provider's OAuth app, exact callback
   URL, requested scopes, and API access in its console before connecting.
   Meta review or Google Business Profile API access may be separately
   required by the provider.
   The callback URLs are `https://<your-site>/api/admin/oauth/meta-pages/callback`
   and `https://<your-site>/api/admin/oauth/google-business-profile/callback`.
   Meta must grant `pages_show_list`, `pages_read_engagement`, and
   `pages_manage_posts`; a Page must grant `CREATE_CONTENT` or `MANAGE`.
   Google needs the Business Profile Account Management, Business Information,
   and Business Profile APIs enabled for the OAuth project.
4. Connect an account, select the exact Page or location, and exercise an
   approved draft or profile sync only after reviewing the live destination
   and content. Tokens are AES-GCM encrypted in Postgres using a key derived
   from `AUTH_SECRET`; rotating `AUTH_SECRET` requires reconnecting providers.
5. Keep outbound publishing, campaign sending, payments, ad spend, and other irreversible
   operations approval-gated.

Contact submissions are saved to the NXG lead inbox even when SMTP is not
configured or delivery fails. The contact endpoint reports the notification
state to the submitting form; the lead remains available in `/dashboard`.
Admin access requires a valid salted scrypt hash in the format
`<salt>:<128-hex-character-hash>`. Generate a fresh credential locally with
`pnpm admin:secrets` if the existing hash is malformed, then update the
Production environment variables in Vercel and redeploy. Never paste passwords
or generated secrets into chat or source control.

## Ads, directories, and scaling

- Campaign copy and social drafts pass through draft, review, and approval
  states. Facebook Page and Google Business Profile publishing is available
  only for approved posts, after account connection and a separate explicit
  Publish action. Profile sync similarly requires saved-profile review and
  confirmation. These flows do not include Instagram, Messenger, scheduling,
  or automatic posting.
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

Apply migrations in numeric order through `011_provider_oauth.sql`;
this release adds `007_chat_inbox.sql` for website chat transcripts and staff
replies, `008_campaign_ad_plans.sql` for paid-media planning metadata,
`009_contentstack_entry_sync.sql` for Contentstack entry linkage, and
`010_career_openings.sql` for admin-managed careers listings, and
`011_provider_oauth.sql` for encrypted provider connections, editable business
profile details, and external publishing audit events. For
Contentstack, configure a `blog_post` content type (or set
`CONTENTSTACK_BLOG_CONTENT_TYPE_UID`) with `title`, `slug` or `url`, `excerpt`,
`body_markdown`/`body`, `category`, and an optional `publish_date`,
`read_time`, and `featured_image`. Supported delivery and Management API
regions are `us`, `eu`, and `au`. Delivery entries are read-only; approved
local drafts can be synced with the configured Management token.

If an account credential is unavailable, leave that integration disabled and
request the credential through the approved local/deployment secret manager.
