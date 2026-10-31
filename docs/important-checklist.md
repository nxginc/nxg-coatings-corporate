- **Admin access:** The password hash currently in Production is malformed for the app’s salted scrypt format. As you chose, reset it locally with `pnpm admin:secrets`, then update `AUTH_SECRET` and `ADMIN_PASSWORD_HASH` in Vercel Production. Keep the password and generated values out of chat.

- **Email:** You selected Mailtrap Email Sending. In Vercel Production, set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL` (a verified sender), and `CONTACT_TO_EMAIL`; set the port/security values according to Mailtrap’s SMTP settings. Use Email Sending, not Email Sandbox.
