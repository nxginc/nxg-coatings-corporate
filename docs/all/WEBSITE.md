# NXG Coatings website

This document describes the website implemented in this repository. It does not describe future CRM, hiring, AI, marketplace, or omnichannel systems as if they were already live. The Next.js App Router implementation is the source of truth; update this document when public routes or customer workflows change.

## Brand and presentation

- Business: NXG Coatings Inc., serving the Twin Cities from Edina, Minnesota.
- Site identity, contact information, and service area: `lib/site-metadata.ts`.
- Colors and shared design tokens: `app/globals.css`.
- Logo, service photography, consultation imagery, and other remote assets: `lib/assets.ts`.
- Use the existing NXG visual system. Reference screenshots may inform layout only; do not copy another brand or add unverified reviews, ratings, guarantees, project claims, or job openings.
- Homepage: transparent over-image navigation; photo-led hero; connected estimate form; service overview; approach; service cards; service-image gallery; industry overview; partner CTA.

## Public pages

- Main: `/`, `/about`, `/process`, `/faqs`, `/contact`, `/quote`, `/schedule`, `/careers`
- Services: `/services`, `/services/exterior-painting`, `/services/interior-painting`, `/services/cabinet-refinishing`, `/services/deck-staining`, `/services/fine-finishes`, `/services/color-consultation`, `/services/pressure-cleaning`, `/services/paint-restoration`, `/services/protective-coatings`
- Industries: `/industries`, `/industries/residential`, `/industries/commercial`, `/industries/industrial`, `/industries/hoa`
- Gallery and content: `/gallery` and service category routes use service imagery; verified project case studies remain pending. `/blog` includes published posts and categories.
- Partners and policy: `/tradepartners` (legacy `/partners` route retained), `/partners/directory`, `/privacy`, `/terms`
- Campaign landing pages: `/campaigns/{slug}`; host-based campaign rewrites are configured in `middleware.ts`.
- Sitemap and robots: `app/sitemap.ts`, `app/robots.ts`.

## Connected customer workflows

- Estimate intake: homepage short form and `/quote` multi-step wizard submit to `POST /api/contact`.
- Contact: `/contact` offers message submission and a preferred consultation time.
- Scheduling: `/schedule` and contact consultation UI collect a preferred slot. A selection is a request, not a confirmed booking.
- Color consultation: requests use the existing contact intake endpoint.
- Partner applications: `/tradepartners` submits to `POST /api/partners`; applications require human review and are not directory approval.
- Newsletter: journal signup submits to `POST /api/newsletter`; the response is pending confirmation.
- Blog/content administration and integrations are protected dashboard workflows; preserve authentication and server-side authorization.
- Contact leads are saved to the configured database. HubSpot synchronization and email notification depend on their configured credentials/settings; user-facing success means the lead was saved, not that every optional downstream integration succeeded.

## Deliberate boundaries

- `/careers` directs people to contact NXG about current opportunities. It does not publish openings or accept job applications; no candidate pipeline is implemented.
- Live appointment availability, staffed customer chat/human handoff, review feeds, and automatic external publishing are not current public-site features unless a route/API is added and verified. The global message widget is an asynchronous intake form that creates a CRM lead; it does not promise immediate replies. The admin API can sign Cloudinary gallery uploads to a staging intake folder, but no upload client is wired into the dashboard; credentials and explicit asset approval are still required.
- Location schema and service-area metadata use the verified business address and the configured `SERVICE_AREAS` list. Do not claim ranking outcomes or automatically change third-party directory profiles or ad spend without an authorized connector and human approval.
- Do not promise estimate pricing, availability, warranties, insurance, licensing, ratings, or services beyond verified business information.
- The broader NXGXC/VXQ blueprint and the separate VXQ endpoint list are future platform context, not implemented website APIs. Implement those only when explicitly brought into scope.
