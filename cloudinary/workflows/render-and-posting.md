# Rendering and Posting Workflow

## Media Intake

1. Start from the current ImageKit source URL or a rights-cleared original. Record its source provider, URL, source ID, checksum when available, source update time, company, asset type, alt text, and usage rights.
2. Request a signed upload from `/api/admin/assets/sign` using an allowlisted type. The result is restricted to a unique Cloudinary staging public ID; do not write directly into approved or production folders.
3. Upload the image as `image/upload` and register its returned `asset_id`, `public_id`, `secure_url`, dimensions, format, and version in the asset record/campaign `assetIds` list.
4. Quarantine anything missing rights, source lineage, meaningful alt text, or a verified company/campaign association.

## Render and QA

1. Select a rendition profile from `rendition-profiles.json`; use the source public ID and transformation URL rather than making unnecessary permanent copies.
2. Store a render manifest linking `renderId` to source asset, checksum, campaign, profile, channel, dimensions, Cloudinary delivery URL, and render/job ID.
3. Check exact dimensions and safe margins; inspect automatic crop, text readability, mobile crop, logo treatment, brand colors, and platform policy.
4. Record QA as `pass`, `fail`, or `quarantine`. A failed or quarantined render cannot enter a delivery queue.
5. Human approval for the asset/render is separate from approval of its caption, destination URL, audience, budget, or publication schedule.

## Channel Handoff

- Website: keep ImageKit as primary. Cloudinary is an optional rendition/fallback only after a page-specific migration decision.
- Facebook/Instagram/LinkedIn organic: create a draft in the existing social-post workflow and hand the approved media/caption to Vista Social once its adapter and workspace credentials are configured.
- Meta paid: prepare a draft campaign/ad-set by service and region group. An operator must confirm Meta location IDs, placements, policy category, destination/UTMs, and spend before submission.
- Google Ads and Business Profile: use separate channel variants and account/location checks; never reuse a Meta ad set blindly.
- Facebook Marketplace and print: manual handoff only.

Before publication, verify the destination URL, UTMs, creative rendition, alt text, consent/rights, campaign state, and approval actor. Mark `published` only after a provider success response and external post/ad ID are saved. Retries use the same idempotency key and must not create duplicate posts.
