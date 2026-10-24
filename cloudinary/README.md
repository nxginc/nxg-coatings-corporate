# NXG Media and Campaign Pipeline

This folder is the versioned Cloudinary workflow contract. It does not contain customer uploads or credentials. Cloudinary's folders are created as uploads arrive; these manifests define the expected naming and routing.

## Cloud Folder Layout

```text
nxgcoatings/
  staging/
    intake/{site,services,industries,gallery,blog}/
    intake/campaigns/{campaignSlug}/{channel}/
    renders/{web,og,social,ads,google,email,print}/
    quarantine/{rejected,rights-pending,metadata-incomplete}/
  approved/{site,services,industries,gallery,blog,campaigns}/
  production/{site,services,industries,gallery,blog,campaigns,ads}/
  archive/{retired,superseded,audit/{yyyy}/{mm}}/
  brand/locked/  # reserved for exact immutable logo; signer disallows writes
```

The website continues to use ImageKit URLs as its source of truth. Uploading to Cloudinary creates a mapped copy or derivative; it never overwrites the ImageKit source. Cloudinary transformations should be URL-derived where possible instead of creating a duplicate stored file for every size.

## Files

- `folder-map.json`: stages, logical folders, and immutable-logo policy.
- `rendition-profiles.json`: website, social, paid media, Open Graph, and print profiles.
- `channel-routing.json`: channel-to-provider routing and release gates.
- `geo-targeting-groups.json`: Twin Cities service-area groups for operator resolution in Meta.
- `automation-map.json`: trigger/action readiness and approval boundaries.
- `schemas/`: asset provenance, render QA, and delivery state contracts.
- `workflows/`: operator runbooks for media production and Meta regional rotation.

## Implemented Boundary

`POST /api/admin/assets/sign` issues a short-lived signed-upload parameter set only to an authenticated admin, only when the company has enabled Cloudinary, and only for an allowlisted staging category. It creates a unique public ID and signs `overwrite=false`. The API secret is not returned. The endpoint does not register the uploaded asset, approve it, create transformations, publish posts, or activate ads.

The app already persists campaign and social-post approval states. Vista Social, Meta publishing/ads, Google Ads, and Cloudinary asset registration/promotion still require provider credentials and their adapters. Until those are wired, the manifests describe routing and require manual operator actions; they do not claim automated publication.

## Before/After Launch Gate

`data/before-after-projects.ts` contains the two paired CDN records found in the legacy gallery backup. They are marked `pending-visual-approval` and are not displayed by any page. Review pair identity, rights, crop, and captions, then update status to `approved` before mounting `BeforeAfterSlider`.
