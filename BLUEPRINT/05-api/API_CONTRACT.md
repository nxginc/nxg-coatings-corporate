# NXG API Contract

Base: `/api/v1`

Domains:
- `/auth`
- `/orgs`
- `/crm`
- `/contacts`
- `/companies`
- `/contractors`
- `/partners`
- `/projects`
- `/takeoffs`
- `/proposals`
- `/bids`
- `/contracts`
- `/purchase-orders`
- `/invoices`
- `/payments`
- `/grants`
- `/gov`
- `/social/accounts`
- `/social/connections`
- `/social/groups`
- `/social/posts`
- `/campaigns`
- `/assets`
- `/templates`
- `/figma`
- `/cloudinary`
- `/agents`
- `/tasks`
- `/search`
- `/analytics`
- `/webhooks`

Requirements:
- OpenAPI 3.1
- typed request/response schemas
- cursor pagination
- idempotency keys
- correlation IDs
- structured errors
- rate limiting
- authorization on every resource
- audit events for sensitive mutations
- signed webhook verification
