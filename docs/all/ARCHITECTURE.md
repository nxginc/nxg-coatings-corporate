# NXGXC Master Architecture

```text
NXG
├── NXG Coatings Inc. (operating company)
├── NXG Trade Connect (connectivity)
├── NXG Contractors (future network)
├── NXG Partners (ecosystem)
└── VXQ/XQ (automation/control plane)
```

## Apps
web, go, partners, contractors, careers, sales, social, admin.

## Core
Identity/SSO, organizations, contacts, records, events, workflows, permissions, approvals, audit, feature flags, configuration, secrets, backup/restore.

## Unified data graph
PERSON -> COMPANY -> PROJECT -> REQUIREMENT -> TRADE -> MATCH -> RFQ -> QUOTE -> AWARD -> JOB -> INVOICE -> PAYMENT -> REPEAT.

Same organizations across authorized sources should resolve to one canonical NXG organization.

## Universal intake
Website, forms, email, phone, SMS, Messenger, Google/LSA, directories, referrals, partner portal, careers and authorized imports feed the same ingestion engine.

## Admin command center
Leads, companies, contacts, opportunities, projects, contractors, partners, sources, adapters, outreach, RFQs, documents, approvals, billing, analytics, system health.

## Release engineering
Dev/staging/prod, CI/CD, automated tests, API contracts, schema validation, accessibility, performance, security checks, error monitoring, health checks, migrations, rollback, changelog and release manifest.
