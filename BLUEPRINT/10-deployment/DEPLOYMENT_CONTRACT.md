# NXG Deployment Contract

Preferred architecture:
- Next.js/TypeScript
- PostgreSQL/Neon
- Drizzle or Prisma
- Redis/queue
- Vercel
- Cloudflare
- Cloudinary
- Stripe
- WorkOS where needed
- GitHub Actions
- Sentry/OpenTelemetry
- Mailtrap for development/testing

Environments:
local → preview → staging → production

Release:
PR → lint → typecheck → unit tests → integration tests → migration validation → preview QA → approval → production → smoke tests → analytics validation.

External providers are adapters. Keep provider IDs and secrets outside core entity identity.
