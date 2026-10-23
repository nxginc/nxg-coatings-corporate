# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Trade contractors and businesses who want to complete an application to join the NXG partner network.
- NXG administrators who review partner applications and manage company operations.

## Product Purpose

NXG Coatings Inc. operates the primary coatings website and is building a shared administrative platform for partner intake and related business workflows. A successful partner applicant can submit a complete profile for human review; submission is not acceptance or a promise of work.

## Positioning

The partner-network eligibility criteria, membership benefits, and project-matching commitments have not been supplied. Do not imply guaranteed work, referrals, approval, or a specific partner relationship.

## Operating Context

Applicants use a public web form to provide business contact details, trade types, service areas, and relevant experience. NXG administrators use an authenticated workspace to review and record decisions. Government, marketing, email, and other external workflows require source evidence, configured providers, and appropriate human approval.

## Capabilities and Constraints

- The current repository is a Next.js and TypeScript website.
- Requested capabilities include partner onboarding, administration, CRM, government and grant workflows, email, live chat, and social or advertising tools; these are separate implementation phases.
- The application must not invent company, project, registration, certification, financial, or past-performance facts.
- Public publishing, government submissions, pricing commitments, and external outreach require an authorized review step.
- No production database or provider credentials are present in the supplied workspace.
- The applicant's word “complete” was interpreted as completing a partner profile for review; approval criteria remain undecided.

## Brand Commitments

- Company: NXG Coatings Inc.; short brand: NXG Coatings.
- The user named red, blue, navy, and platinum as brand colors for the partner experience.
- Preserve the existing NXG website identity and the supplied trade-partner reference image.
- Use the supplied enterprise letterhead as the source for company correspondence fields; resolve conflicting contact details against the canonical company profile before use.

## Evidence on Hand

- `BLUEPRINT/` contracts define the intended entity, API, agent-approval, design, and government/grants boundaries.
- User-provided `letterhead-v4.html` lists the company name, tagline, business phone, email, website, representative name/title, and Edina, Minnesota.
- User-provided `NXGC RESUME ...md` includes experience and competency claims. These are supplied material, not independently verified credentials, and must be reviewed before external publication.
- No authoritative grant-opportunity dataset, state selection, company registration/certification evidence, or provider authorization was supplied.

## Product Principles

- Keep company records tenant-scoped and external-provider state behind adapters.
- Preserve source evidence and distinguish supplied claims from verified facts.
- Make sensitive or externally visible actions reviewable and approval-gated.
- Never present a draft, configured credential, or application as a completed integration or approval.

## Accessibility & Inclusion

Public and administrative web flows should be responsive, keyboard-operable, semantically labeled, and provide clear validation, loading, empty, and error states.
