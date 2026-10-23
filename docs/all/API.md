# VXQ API Surface

POST /v1/leads/intake
POST /v1/conversations/transcribe
POST /v1/conversations/extract
POST /v1/field-reports
POST /v1/estimates/general
POST /v1/proposals/draft
POST /v1/proposals/approve
POST /v1/messages/draft
POST /v1/messages/send
GET /v1/opportunities/{id}
GET /v1/opportunities/{id}/timeline

Core functions: vxq.sales.createOpportunity(), qualify(), vxq.field.createReport(), vxq.voice.transcribe(), vxq.scope.extract(), vxq.estimate.createGeneral(), vxq.proposal.createDraft(), vxq.message.draft(), vxq.approval.request(), vxq.crm.update().
