# NXG FINAL MASTER BLUEPRINT

## 1. Objective
Build a unified NXG platform that powers:
1. NXG Coatings Inc.
2. future NXG Contractors trade network
3. future NXG Partner Network
4. future sister companies
5. websites
6. CRM
7. projects/takeoffs/bids/proposals
8. procurement/finance
9. government/grants
10. social/content
11. assets/renders
12. AI agents
13. Figma/template rendering

## 2. Architecture
Use a modular monorepo.

Recommended top-level structure:

```text
apps/
  web/
  admin/
  crm/
  proposals/
  network/
  social/
  government/
  finance/

packages/
  db/
  api/
  auth/
  entities/
  ids/
  ui/
  design-tokens/
  templates/
  rendering/
  cloudinary/
  figma/
  stripe/
  social/
  government/
  agents/
  workflows/
  analytics/
  validation/
  config/

agents/
  crm/
  project/
  takeoff/
  proposal/
  bid/
  government/
  grants/
  procurement/
  finance/
  social/
  asset/
  figma/
  partner/
  qa/
  orchestrator/

docs/
  architecture/
  api/
  data/
  agents/
  operations/
  prompts/
```

## 3. System-of-record rules
- PostgreSQL/Neon: structured business entities.
- Cloudinary: approved media assets.
- Figma: canonical design authoring.
- GitHub: source code/version control.
- External services: provider-specific state mirrored through adapters.
- Every external ID is stored separately from the NXG entity ID.

## 4. Canonical render pipeline
```text
Entity data
   ↓
Template props
   ↓
Component tree
   ↓
Theme/design tokens
   ↓
Asset resolution
   ↓
HTML/CSS render
   ↓
Responsive validation
   ↓
Accessibility/SEO validation
   ↓
Screenshot/render QA
   ↓
Approval
   ↓
Publish
```

## 5. Content architecture
All reusable website content must support:
- JSON/API source
- localization-ready fields
- SEO metadata
- social metadata
- CTA
- asset references
- campaign references
- UTM parameters
- approval state
- version
- publication state

## 6. Multi-site model
A single platform may render multiple domains from a shared component library.

Each site gets:
- `site_id`
- brand
- domain
- theme
- navigation
- content namespace
- asset namespace
- SEO profile
- social profile
- organization owner

Shared components do not mean shared content.

## 7. Proposal model
Proposal is a versioned projection of approved project data.

```text
Project
 ├─ Takeoff
 ├─ Estimate
 ├─ Proposal
 │   ├─ Option: Essential
 │   ├─ Option: Recommended
 │   └─ Option: Premium
 ├─ Attachments
 ├─ Terms
 └─ Approval
```

Every rendered proposal records:
- source versions
- template version
- pricing version
- asset versions
- generated timestamp
- generated-by agent/user
- approval state
- checksum

## 8. Government/grants
Government and grants are a controlled workflow, not unrestricted autonomous publishing.

```text
Opportunity
 → Eligibility
 → Evidence
 → Compliance Matrix
 → Scope/Takeoff
 → Pricing
 → Draft
 → Internal Review
 → Authorized Approval
 → Submission
 → Award
 → Reporting
```

## 9. Observability
Track:
- request IDs
- job IDs
- agent run IDs
- provider request IDs
- webhook event IDs
- entity IDs
- user/actor IDs
- cost
- latency
- failures
- retries

## 10. Security
Implement:
- tenant isolation
- RBAC/ABAC
- least privilege
- encrypted secrets
- signed asset uploads
- webhook signatures
- immutable audit events
- approval workflows
- rate limits
- idempotency
- backup/restore testing
- PII minimization
