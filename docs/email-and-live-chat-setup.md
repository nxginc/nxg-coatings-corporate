# Website email and live chat setup

## Recommended email provider: Postmark

Postmark is a good fit for contact, consultation, and admin-reply email because it focuses on transactional delivery and supports the SMTP interface already used by this site. It does not require an application code change to switch the SMTP host. Review current plans and terms before creating an account.

1. Create a Postmark account and a transactional server/message stream.
2. Verify the sending domain and publish the DNS records Postmark provides (including DKIM and return-path/SPF). Publish an appropriate DMARC policy for the domain.
3. Enable SMTP for the server and create an SMTP token for the transactional message stream. Store the token's access key and secret key as secrets.
4. Configure the site environment:

   ```dotenv
   SMTP_HOST=smtp.postmarkapp.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=<Postmark SMTP token access key>
   SMTP_PASS=<Postmark SMTP token secret key>
   FROM_EMAIL=<verified sender address>
   CONTACT_TO_EMAIL=<monitored NXG inbox>
   ```

   Port 587 uses STARTTLS; `SMTP_SECURE=false` is intentional for this port. Use only a sender address verified in Postmark. Keep all SMTP settings server-side; never prefix them with `NEXT_PUBLIC_`.
5. For local development, put the actual values in `.env.local` (ignored by Git). For a hosted deployment, add them in the hosting provider's encrypted environment-variable settings for the intended environment, then redeploy.
6. Verify the contact form and each consultation/booking form in a non-production environment first. Confirm receipt at `CONTACT_TO_EMAIL`, then reply to a test inquiry and verify that its reply-to address is the submitter. Check provider activity and application logs if delivery fails.

Postmark's current [SMTP guide](https://postmarkapp.com/developer/user-guide/send-email-with-smtp) documents SMTP tokens, TLS, and server settings. This project does not contain provider credentials and cannot test real delivery until the environment is configured.

## Real-time website chat: Crisp

The site loads the official Crisp web chat only when a website ID is configured. The ID is public configuration, not a secret.

1. Create a Crisp workspace and website, then copy its Website ID from the website's installation/integration settings.
2. Set `NEXT_PUBLIC_CRISP_WEBSITE_ID=<Crisp Website ID>` in `.env.local` for local work and in the hosting provider's environment settings for each environment. `NEXT_PUBLIC_` values are included in the browser bundle; never put a private Crisp API key there.
3. Restart the local server or redeploy after changing the value. Without it, chat is disabled and no Crisp script is requested.
4. In Crisp, configure inbox/team assignment, notifications, staffed hours, and an away message. The site widget provides real-time chat, but does not guarantee an NXG agent is online.
5. Test from a separate browser session: open the chat, send a test message, confirm it appears in the Crisp inbox, and test an agent reply. Check the site's Content Security Policy if the Crisp client script is blocked.

Crisp conversations go to Crisp, not to the site's SMTP inbox or CRM. Configure Crisp's own email notifications if the team needs inbox alerts. Review the [Crisp web SDK documentation](https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/npm/) and have the privacy notice reviewed before enabling chat publicly.

## Current activation status

The SMTP sender and Crisp widget are wired to environment variables, but neither service is active in production until the account setup and environment values are supplied by an authorized administrator. No secrets should be sent in chat or committed to this repository.
