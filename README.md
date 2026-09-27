# NXGXC v1.0.0 — Final Architecture Release

Unified NXG Coatings / Trade Connect / VXQ-XQ operating architecture.

## Platform principles
- NXG Coatings Inc. = operating business
- NXG Trade Connect = connectivity layer
- NXG Contractors = future network / marketplace
- NXG Partners = ecosystem
- VXQ / XQ = automation and intelligence control plane
- NXGXC = unified platform foundation

## Release scope
Website, quote intake, CRM/sales, Project Desk, field reports, estimates/proposals, Cloudinary media, content/social, ads/local acquisition, Trade Connect, partner portal, Contractor Passport, careers/recruiting, procurement, billing/Xero, analytics, AI provider abstraction, approvals, audit, deployment and QA.

## Safety/approval baseline
Human approval is required by default for outbound messages, campaigns, financial commitments, contracts/proposals, employment decisions, partner verification, customer imagery publication, and production publishing. Use only authorized integrations and permitted APIs/feeds/imports/exports.

## Canonical flow
SOURCE -> INGEST -> NORMALIZE -> IDENTITY/DEDUPE -> VET -> ROUTE -> SALES/CRM -> ESTIMATE/RFQ -> PROJECT -> PROCUREMENT/BILLING -> MEDIA/CONTENT -> FOLLOW-UP/REPEAT
