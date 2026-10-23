# NXG Chat Source — Final Decisions

This document is the normalized source-of-truth record of the implementation decisions established in this chat.

## Brand / sites
- NXG Coatings Inc. is the operating painting/coatings company and primary site.
- `nxgcoatingsinc.com` is the current primary web property.
- `nxgcontractors.com` is planned as a future contractor/trade network.
- A future NXG Partner Network / sister-company ecosystem is supported.
- Future sister companies must remain separate brand/domain entities while sharing the platform foundation.

## Contact
- Canonical display phone: `952-855-3520`.
- Store phone as structured organization contact data.
- Bind templates/components to the organization contact record rather than hard-coding the phone into business logic.
- Production E.164 value must be verified before final system configuration.

## Website / design
The final web system is intended to consolidate the supplied:
- `style.css`
- `NXG Coatings Inc — Professional Painting & Coating Services _ Edina MN — Clean Finish Exclusive.html`
- `NXG Coatings Inc — Professional Painting & Coating Services _ Edina MN 2.html`
- `TEMPLATE-START.zip`

Design direction:
- clean / exclusive / premium
- responsive
- parallax heroes
- polished hero sections
- split-logo / brand sections
- responsive service cards
- slick horizontal project/service sliders
- reusable components
- mobile-first behavior
- CDN-backed media
- JSON/API-rendered content
- canonical logo placeholder until the approved logo asset is supplied
- one shared design system supporting multiple NXG properties without flattening their individual brands.

## Universal data
Use UUIDv7 where supported as database primary keys, plus human-readable NXG identifiers.

Examples:
- `NXGC-*` company/client
- `NXGCTR-*` contractor
- `NXGP-*` partner
- `NXGPRJ-*` project
- `NXGTAKE-*` takeoff
- `NXGPROP-*` proposal
- `NXGBID-*` bid
- `NXGPO-*` purchase order
- `NXGINV-*` invoice
- `NXGPMT-*` payment
- `NXGPOST-*` social post
- `NXGASSET-*` asset
- `NXGCAM-*` campaign
- `NXGAG-*` agent
- `NXGDOC-*` document

Project lifecycle:
Client → Project → Takeoff → Estimate → Proposal → Bid → Award → Contract → PO → Work Order → Invoice → Payment → Closeout.

## Proposal system
Proposal generation must support:
- client/project data
- scope
- takeoff
- pricing
- labor/materials
- exclusions
- allowances
- schedule
- warranty
- terms
- signature
- versioning
- rendered HTML/PDF

Proposal option model:
- Essential
- Recommended
- Premium

The proposal is generated from canonical project/takeoff data and must not require retyping the same information into downstream documents.

## Government / grants
Government and grants capability includes:
- opportunity discovery
- solicitation ingestion
- eligibility
- NAICS/PSC matching
- registration/checklist data
- compliance matrix
- evidence tracking
- proposal workspace
- attachments
- deadlines
- submission status
- award tracking
- reporting

The system must not fabricate:
- certifications
- registrations
- socioeconomic status
- past performance
- financial information
- insurance/bonding
- legal attestations
- government representations

Government submissions require an explicit human approval gate.

## CRM/API
Core API domains:
- auth
- organizations
- CRM
- contacts
- companies
- contractors
- partners
- projects
- takeoffs
- proposals
- bids
- contracts
- purchase orders
- invoices
- payments
- grants
- government
- social accounts
- social connections
- social groups/communities
- posts
- campaigns
- assets
- templates
- Figma
- Cloudinary
- agents
- tasks
- search
- analytics
- webhooks

## Social/content
Support:
- Facebook pages
- Facebook groups
- featured service posts
- Instagram
- LinkedIn
- Google Business
- YouTube
- TikTok
- Pinterest
- X

Social entities:
- account
- connection
- community/group
- post
- campaign
- publishing manifest
- performance record

## Assets
Cloudinary is the media system of record.

Suggested structure:
`nxg/{brand}/{entity_type}/{entity_id}/{asset_type}/{version}`

Asset categories:
- logo
- project
- before/after
- crew
- service
- product
- shirt/apparel
- social
- ad
- document
- render
- favicon
- OG

Media pipeline:
Upload → validation/quarantine → metadata → Cloudinary → tagging → derivatives → approval → channel render → publishing manifest.

## Figma/template system
Master template concepts:
- canonical tokens
- Figma variables/components
- master HTML template
- typed template props
- asset slots
- channel adapters
- QA
- approval
- render manifests

Never allow a rendered derivative to silently become the canonical design source.

## Agents
Core agents:
- CRM Agent
- Project Agent
- Takeoff Agent
- Proposal Agent
- Bid Agent
- Government Agent
- Grants Agent
- Procurement Agent
- Finance Agent
- Social Agent
- Asset Agent
- Figma Agent
- Partner Agent
- QA Agent
- Orchestrator

Human approval gates:
- government submissions
- contracts
- pricing commitments
- financial transfers
- public posts where pre-approval is required
- canonical brand changes
- production schema migrations

## Deployment
Target architecture:
- Next.js / TypeScript
- PostgreSQL / Neon
- Drizzle or Prisma
- Redis/queue
- Vercel
- Cloudflare
- Cloudinary
- Stripe
- WorkOS where enterprise identity/admin is required
- OpenAI/approved model providers behind an agent gateway
- GitHub Actions
- Sentry/OpenTelemetry
- Mailtrap for development/testing email

Environment separation:
local / preview / staging / production.

Secrets must never be committed.

## Source boundary
The TJ Maxx Coon Rapids bid workbook was referenced in chat, but the exact workbook contents were not available in the final export. Do not invent its project/client/takeoff values. Its schema should be ingested only when the actual workbook is available.

## Master principle
Core NXG data remains provider-independent. External providers are adapters. External IDs are stored separately. Webhooks are verified and idempotent. Sensitive operations require authorization and audit logging.
