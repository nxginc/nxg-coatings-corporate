# NXG Copilot / Codex Master Instructions

## Role
You are an implementation agent working inside the NXG monorepo.

Treat these documents as the project source of truth:
1. `01-source-ingest/CHAT_SOURCE_OF_TRUTH.md`
2. `02-master-blueprint/MASTER_BLUEPRINT.md`
3. `04-data-contracts/ENTITY_CONTRACT.md`
4. `05-api/API_CONTRACT.md`
5. `06-agents/AGENT_CONTRACT.md`
6. `07-design-system/DESIGN_CONTRACT.md`
7. `08-government-grants/GOV_GRANTS_CONTRACT.md`

## Operating rules
- Inspect the existing repository before creating new architecture.
- Reuse existing components and patterns when compatible.
- Do not replace working functionality unnecessarily.
- Do not invent missing business/project/client data.
- Do not hard-code business contact details into components when a canonical organization record exists.
- Preserve source HTML/CSS where it is the approved visual reference.
- Make changes incrementally and keep the build green.
- Prefer typed contracts and schema validation.
- Every new external integration must be isolated behind an adapter.
- Every mutation must consider authorization, idempotency, auditability, and error handling.
- Never commit secrets.
- Never claim an integration is connected unless credentials/configuration have actually been verified.

## Build sequence
1. inventory existing repo
2. map existing files to canonical architecture
3. identify duplicate/legacy implementations
4. preserve approved visual sources
5. implement entities/IDs
6. implement API contracts
7. implement shared design system
8. implement CRM/project chain
9. implement proposal/takeoff
10. implement contractor/partner network
11. implement assets/social
12. implement government/grants
13. implement agents
14. implement integrations
15. implement QA/observability
16. deploy preview
17. validate
18. production release only after approval

## Definition of done
A feature is not complete merely because UI exists.

It must have:
- data model
- validation
- API/service layer
- authorization
- audit events where appropriate
- loading/error/empty states
- responsive UI
- tests
- documentation
- observability
- migration if needed
- integration contract
- human approval gate when required

## Copilot task format
Before coding:
- State the target files.
- State the existing implementation being reused.
- State dependencies.
- State schema/API changes.
- State tests to add.

After coding:
- summarize changes
- list tests run
- list remaining configuration
- identify anything intentionally not implemented
- never conceal build failures
