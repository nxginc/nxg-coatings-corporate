# NXG Coatings production punch list

**Status snapshot:** 2026-10-31  
**Release branch:** `nxgx-update` → `main` through PR [#37](https://github.com/nxginc/nxg-coatings-corporate/pull/37)  
**Purpose:** Record what is verified, what still blocks a safe production release, how to finish setup without exposing credentials, and what remains outside the implemented scope.

This is the operational companion to [Integration connection setup](./all/CONNECTIONS.md). It does not contain credentials. Do not paste passwords, access tokens, database URLs, or generated secrets into this document, source control, or chat. The supplied `important-checklist.md` is preserved locally and is not required by the release.

## Release status at a glance

| Area | State | Evidence / next action |
| --- | --- | --- |
| Website and admin changes | **Preview ready** | Latest Vercel preview: [nxgx-update branch preview](https://nxg-coatings-corporate-o526ri7if-nxg-corporate.vercel.app). The preview is not production. |
| Pull request and CI | **Ready for release decision** | PR #37 is open from `nxgx-update` to `main`. Local lint, TypeScript, production build, and diff checks passed; the push and PR GitHub Actions runs passed. |
| Admin sign-in | **Production blocker** | The Production password hash was previously confirmed to be malformed. Reset it locally and verify sign-in after the new release is deployed. |
| Production database | **Production blocker for new features** | Migrations `001`–`010` were previously applied. Migration `011_provider_oauth.sql` is required for provider OAuth, business profiles, and publish audit records; it has not been applied to Production. |
| Contact email | **Not configured** | Contact leads can be saved, but production notifications are not enabled until Mailtrap Email Sending SMTP settings are added and verified. |
| Meta / Google | **Code implemented; accounts not connected or tested** | OAuth UI and server routes are in the preview. Provider apps, credentials, permissions/API access, and account selection remain operator setup. |
| Public metadata synchronization | **Not implemented** | The admin editor stores profile details and can sync selected fields to Google Business Profile. The editor does not yet drive website-wide SEO/JSON-LD or sync Meta Page profile fields. |
| Phone number | **Replacement pending** | Do not add a phone number until the replacement is confirmed. Verify the retired number is absent from site links, structured data, content, and provider profiles before release. |

## 1. Release the branch safely

- [ ] Confirm PR #37 still targets `main` and review its complete diff, including the previous website, chat, contact, CI, OAuth, and database changes.
- [ ] In Vercel project settings, confirm the configured **Production Branch** before merging. Do not infer it from the Vercel project link or the preview deployment.
- [ ] Confirm required Production environment variables are present without printing their values. Keep all secrets server-side; never use `NEXT_PUBLIC_*` for credentials.
- [ ] Merge only after the remaining production blockers below are resolved or explicitly accepted by the business owner.
- [ ] Wait for the Vercel production deployment to become Ready. Confirm the production alias and `nxgcoatingsinc.com` serve that deployment before announcing release.
- [ ] Keep the branch preview available for operator review. Do not treat preview readiness as proof that production has been migrated, authenticated, or connected to providers.

**Done means:** the intended commit is deployed to the configured production target, the canonical domain resolves to it, and the post-release checks in section 7 pass.

## 2. Repair and verify admin access

The current Production `ADMIN_PASSWORD_HASH` was previously found not to match the application's required salted-scrypt format. A generated password/hash must not be sent through chat or committed.

1. In a trusted local terminal at the repository root, run `pnpm admin:secrets`.
2. Enter a unique password of at least 16 characters twice. The prompt does not echo the password. The tool prints `AUTH_SECRET` and `ADMIN_PASSWORD_HASH`; treat both outputs as secrets.
3. Transfer those values directly into the Vercel project's **Production** environment settings. Confirm `ADMIN_EMAIL` is the intended admin identity.
4. Trigger a deployment after updating Production variables; Vercel environment changes do not retroactively alter an already-built deployment.
5. Sign in at `/login` using the intended credentials. Verify `/dashboard` and `/dashboard/connections` load. Verify an unauthenticated request to an admin API returns `401`.
6. If this app has already stored OAuth credentials, changing `AUTH_SECRET` makes those encrypted token bundles unreadable. Reconnect Meta and Google after the rotation.

**Done means:** the correct admin can sign in; protected dashboard pages and API routes reject unauthenticated access; no password or secret was written to a file, log, commit, or message.

## 3. Apply the pending Production database migration

Migration `011_provider_oauth.sql` creates encrypted OAuth connection storage, the editable business profile table, provider publish events, and the post `publishing` status. It also updates the social-post status constraint. Do not use the Production database for exploratory or test writes.

1. Confirm a current database backup exists and the production release window is approved.
2. Pull the Vercel Production environment into a protected, ignored local file from the repository root:

   ```sh
   vercel env pull .env.production.local --environment=production
   ```

3. Apply pending migrations using Node's environment-file support:

   ```sh
   node --env-file=.env.production.local scripts/migrate.mjs
   ```

   The runner prefers `DATABASE_URL_UNPOOLED`, falls back to `DATABASE_URL`, acquires a PostgreSQL advisory lock, applies migrations in numeric order, and records each successful file in `nxg_schema_migrations`.

4. Confirm the output includes `Applied 011_provider_oauth.sql` (or `Skipped 011_provider_oauth.sql` if already applied). Confirm the migration record exists using a database client with protected credentials:

   ```sql
   select migration_id, applied_at
   from nxg_schema_migrations
   where migration_id = '011_provider_oauth.sql';
   ```

5. Remove the specifically named local env file after the migration, and verify it is not staged or committed:

   ```sh
   rm .env.production.local
   git status --short
   ```

If a migration fails, stop and preserve the error message without exposing connection details. The runner rolls back the failed migration. Do not manually edit production schema as a shortcut; diagnose against a safe database first.

**Done means:** migration `011` is recorded, the migration process exited successfully, and the pulled Production env file has been removed.

## 4. Enable contact notifications with Mailtrap

Use **Mailtrap Email Sending**, not Email Sandbox. Add these values to Vercel Production from the provider's SMTP settings:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL` — a verified/authorized sender
- `CONTACT_TO_EMAIL` — the monitored business inbox

Then redeploy so the Production functions receive the new environment. In `/dashboard/connections`, enable the email integration. Submit a controlled test through the contact form only after the owner has approved the test recipient and content. Verify both the database lead record and actual delivery; a lead saved to the inbox is not proof an email was sent. Check that the form accurately distinguishes sent, disabled, and failed notifications.

**Done means:** a controlled test lead is saved, the message arrives at the approved inbox, the sender is authorized, and the visitor-facing status is truthful. Do not submit a real customer inquiry as a test.

## 5. Connect Meta Pages and Google Business Profile

### Provider app setup

Add credentials through Vercel's server-side Production environment controls. Never add provider secrets to source files or `NEXT_PUBLIC_*` variables.

**Meta Pages**

- [ ] Configure `META_APP_ID` and `META_APP_SECRET`; optionally set `META_GRAPH_API_VERSION` (default: `v26.0`).
- [ ] Register the exact callback `https://<production-host>/api/admin/oauth/meta-pages/callback` in the Meta app.
- [ ] Grant and verify `pages_show_list`, `pages_read_engagement`, and `pages_manage_posts`. The selected Page must have the `CREATE_CONTENT` or `MANAGE` task.
- [ ] Complete Meta app review / business verification if required for the account and publishing permissions.
- [ ] Sign in to the Production admin, choose **Connect Meta account**, select the intended Page, then save the selection.

**Google Business Profile**

- [ ] Configure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- [ ] Register `https://<production-host>/api/admin/oauth/google-business-profile/callback` in the OAuth client.
- [ ] Enable the Business Profile Account Management, Business Information, and Business Profile APIs for the Google Cloud project; verify the app can request the `business.manage` scope.
- [ ] Complete Google OAuth consent-screen and API access requirements for the account.
- [ ] Sign in to the Production admin, connect Google, select the exact account/location, then save the selection.

Provider permissions and API eligibility depend on each provider and account. A successful OAuth redirect is not proof of write permission. Tokens are AES-GCM encrypted in Postgres using a key derived from `AUTH_SECRET`. Rotating `AUTH_SECRET` requires reconnecting both providers. Disconnecting in this app removes its stored token bundle and disables the provider, but does not revoke the app at Meta or Google; revoke authorization separately in the provider account if desired.

### Safe provider acceptance checks

- [ ] Confirm the connected Page/location name and address before any write.
- [ ] Verify non-approved posts cannot be published; only an approved post and approved campaign may publish.
- [ ] Test with a purpose-built, clearly labeled test draft only after the business owner approves the exact destination and copy.
- [ ] Confirm the post returns a provider ID and the admin queue records the published state and audit event.
- [ ] Test a provider rejection in a non-production environment, and verify a definitive failure does not mark the post published.
- [ ] If the request times out or the provider outcome is ambiguous, verify the destination before retrying. The post remains in a publishing/unknown state to avoid duplicate posts.
- [ ] Verify the Google profile sync confirmation names the intended listing and that only the displayed business name, address, and website are being changed.

Direct social publishing currently supports **text and destination links only**. Image/video publishing, Instagram, Messenger, scheduling, automatic posting, Google Ads account operations, and ad spend are not enabled.

## 6. Business details, phone, and public metadata

The Connections page contains an editable business-profile record used by the Google Business Profile sync. Its default values reflect the existing NXG address and contact email. The phone field is intentionally omitted pending confirmation of the replacement number.

- [ ] Review the display name, address, website, and email with the business owner before saving or syncing.
- [ ] Search the public website for the retired phone number and verify it is absent from clickable telephone links, metadata, structured data, and visible copy.
- [ ] Do not invent or infer a replacement phone number. Add it only after the owner confirms the exact value and scope.
- [ ] Review the selected Google location before confirming a listing update.
- [ ] Treat website SEO title/description, JSON-LD, `lib/site-metadata.ts`, `lib/seo.ts`, `app/layout.tsx`, and `data/corporate-profile.ts` as separate existing sources until a central source is implemented.

**Known follow-up:** make the admin business profile the reviewed source of truth for public site metadata and structured data, then add a preview/diff and a separate approval action before applying edits. Add Meta Page profile-field synchronization only after identifying the required fields, permissions, and review policy. These behaviors are not included in the current implementation.

## 7. Final manual acceptance run

Run this checklist on the branch preview first, then repeat applicable checks on Production after the release. Use test accounts, a non-production database, and controlled recipients wherever possible.

- [ ] **Auth:** login/logout, session expiry, protected page/API access, invalid credentials, and admin role assumptions.
- [ ] **Contact/quote:** valid and invalid input, validation errors, database persistence, and configured/disabled/failed email status.
- [ ] **Blog:** list/detail routes, admin draft and review states, and no server exception in Vercel logs.
- [ ] **Chat:** visitor session creation, conversation retrieval, staff inbox refresh, reply, and database persistence.
- [ ] **Campaigns/social:** draft → review → approved/rejected; verify campaign approval is required; confirm requests do not auto-publish.
- [ ] **Meta/Google:** authorized account, selected destination, one owner-approved test publication, audit row, provider ID, and visible error/reconciliation path.
- [ ] **Google listing:** edit profile, inspect the values, confirm the destination, sync only the approved fields, and verify provider-side result.
- [ ] **Accessibility/UI:** desktop and mobile dashboard layout, keyboard focus, OAuth return messages, loading/empty/error states, and form labels.
- [ ] **Operations:** check Vercel runtime logs for auth, DB, migration, SMTP, and provider errors; verify secrets and access tokens do not appear in client responses or logs.

Do not treat a successful build, CI run, OAuth configuration, or database record as end-to-end verification of an external provider.

## 8. Integrations and capabilities intentionally not ready

Keep the following disabled and do not enter credentials merely to clear a readiness indicator:

| Capability | Current boundary | What implementation/setup would be needed |
| --- | --- | --- |
| Google Ads | Planning drafts only; no campaign API or spend controls | Authorized Ads API adapter, conversion setup, strict budget caps, and explicit financial approval per action. |
| Instagram and Messenger | Not part of the current Meta adapter | Separate product scope, permissions/app review, supported media/conversation APIs, and explicit publishing/message approvals. |
| Vista Social | Catalog-only; adapter unavailable | Supported API agreement, credential storage, and a tested adapter. |
| ImageKit upload admin | Existing image URLs are used; signed admin uploads are not implemented | Upload workflow, signed server endpoint, asset metadata/rights, and review controls. |
| Stripe payments | Not implemented | Checkout/payment lifecycle, webhook signature verification, idempotency, refunds, and approved financial controls. |
| Telnyx SMS/voice | Not implemented | Consent-aware messaging, verified sender/number, opt-out handling, provider callbacks, and delivery tests. |
| WorkOS / Microsoft 365 / Slack | Architecture references only; no active connector in this website | Confirm product need, identity/security model, scopes, data retention, and supported adapter before configuration. |
| Public SEO/profile synchronization | Admin profile does not drive site metadata or Meta fields | Central reviewed business profile, public metadata/schema wiring, change preview, and approval/audit flow. |
| Intercom-style AI/live support | Website chat is asynchronous Postgres chat with a staff inbox; it is not staffed real-time chat or model-powered support | Define staffing/SLA, identity, handoff, retention, safety, and AI behavior before implementing. |
| Automatic scheduling | Requested times are planning metadata only | Durable scheduler, timezone policy, provider scheduling support, retries/idempotency, cancellation, and monitoring. |

## 9. Environment and repository safety

- Keep local `.env*` files ignored by Git and Vercel packaging. `.env.example` is the tracked template; it must contain only placeholders or empty values.
- Use only server-side variables for credentials. Do not expose tokens through browser JSON, URLs, source maps, logs, screenshots, or commits.
- Keep production and preview databases/provider accounts separate where possible. Do not test irreversible actions with customer data.
- Rotate any credential suspected of exposure in its provider, update the deployment environment, and redeploy. Do not merely delete the local copy.
- Review the secret-scan job result after every push. The scan checks repository history; a pass does not replace provider-side credential rotation for a known exposure.
- Do not commit the supplied local `docs/important-checklist.md` unless explicitly requested. The production guide is `docs/PRODUCTION-PUNCH-LIST.md`.

## 10. Verification record

At this snapshot:

- `pnpm lint` — passed locally.
- `pnpm exec tsc --noEmit` — passed locally.
- `pnpm build` — passed locally.
- `git diff --check` — passed locally.
- GitHub Actions lint/build and Gitleaks — passed for the `nxgx-update` push and PR checks.
- Vercel branch preview — Ready; this is not the Production target.
- Production admin reset, SMTP delivery, migration `011`, Meta authorization, Google authorization, and external publishing — **not verified**.

Update this section after each release gate changes. Do not mark an item complete based only on configuration presence; record the actual successful check and environment.
