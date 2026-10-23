# NXG Agent Contract

## Agents
CRM, Project, Takeoff, Proposal, Bid, Government, Grants, Procurement, Finance, Social, Asset, Figma, Partner, QA, Orchestrator.

## Tool permission model
Agents receive explicit tool scopes:
- read-only
- draft
- propose
- execute
- publish

Default is least privilege.

## Human approval
Required before:
- government submission
- contract execution
- pricing commitment
- financial transfer
- public publication where approval is required
- canonical brand changes
- production schema migration

## Agent run
Every run records:
- agent_id
- run_id
- actor
- prompt/policy version
- tool calls
- inputs/outputs references
- cost
- duration
- status
- approvals
- audit events

Agents must cite/retain source evidence for material business claims.
