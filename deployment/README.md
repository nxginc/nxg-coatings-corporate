# Deployment

Environments: development, staging, production.

Secrets must be server-side; never ship Figma access tokens or provider credentials to browser clients. Configure CRM_WEBHOOK_URL, QUOTE_ENDPOINT, CHAT_ENDPOINT, FILE_UPLOAD_ENDPOINT and ANALYTICS_ID through environment management.

Use CI/CD, migrations, smoke tests, health checks and rollback before production release.
