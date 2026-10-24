---
description: "Use when selecting, replacing, auditing, or adding NXG website images, logos, banners, service photography, project imagery, or blog assets."
name: "NXG Website Assets"
applyTo:
  - "lib/assets.ts"
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# NXG website asset guidance

- Treat `lib/assets.ts` as the canonical URL catalog. Reuse its named assets; add or replace an entry there instead of scattering a new remote URL across page components.
- Prefer assets explicitly supplied for the named service or page. Do not substitute unrelated, duplicated, unlicensed, broken, or misleading photography. Preserve descriptive alt text and set `priority` only for above-the-fold imagery.
- Use `next/image` for website images and retain the ImageKit host configuration in `next.config.mjs`. Provide responsive `sizes`, a stable aspect ratio or container, and appropriate `object-position`.
- Check remote URL spelling, extension/format handling, and intended image context. Prefer supported formats; for HEIC, use an ImageKit format transformation where the asset supports it.
- Never add review badges, star ratings, customer photos, before/after pairs, or project claims unless their source, rights, accuracy, and approval are confirmed.
- Keep the approved logo and brand colors centralized. Avoid copying a reference screenshot's logo, unverified claims, third-party design, or placeholder content.
- When an image cannot be verified or is unavailable, use a suitable existing approved asset or remove the image area cleanly; do not leave a broken image or fabricated banner.
