# pyR0tex.dev

My personal developer website for projects, experiments, notes, and things I build.

Live site: `https://pyrotex.vercel.app/`

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Sections

- `/projects` — larger projects and builds
- `/lab` — experiments and smaller ideas
- `/about` — background and experience
- `/notes` — technical notes and things I learn

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Status

Still in early development.

## Homepage content and contact setup

- `data/projects.ts` supplies both the project archive and homepage. Only entries
  with `featured: true` appear on the homepage. Add verified `githubUrl` and
  `liveUrl` values when available; missing URLs do not render links.
- Email, LinkedIn, and GitHub links are configured in `data/site.ts` and shared
  by the About contact section and footer. Resume remains “coming soon” until
  its `null` value is replaced with a URL.
- Lab and Notes are intentional placeholder pages.

The shared contact form posts JSON to `/api/contact`. The route validates name
(1–100 characters), email (up to 254), and message (1–5000), and rejects malformed
requests. A hidden honeypot rejects basic automated submissions. Valid requests
send a plain-text email through the Resend Node.js SDK, with the visitor's email
as `replyTo`. Success is returned only after Resend accepts the email; acceptance
does not guarantee inbox delivery. The form disables inputs while sending,
clears them on success, and retains them on failure.

Copy `.env.example` to `.env.local` and set these server-only variables (never
prefix them with `NEXT_PUBLIC_`):

- `RESEND_API_KEY`: a Resend API key with permission to send email.
- `CONTACT_EMAIL`: your inbox address for receiving contact messages.
- `CONTACT_FROM_EMAIL`: the sender address on your Resend-verified domain.

In [Resend](https://resend.com/docs/dashboard/domains/introduction), add a domain
you control and publish the required SPF and DKIM DNS records. Wait for domain
verification before using a sender address on that domain. The `resend.dev`
test sender is restricted to your Resend account email; use a verified domain
for production. A Vercel-provided `vercel.app` subdomain is not a domain whose
email DNS records you control.

For production, open **Vercel → your project → Settings → Environment Variables**
and add all three values to **Production** (and **Preview** if you want preview
deployments to send email). Redeploy after adding or changing the values.
Restart the local dev server after changing `.env.local`. Secret `.env*` files
remain ignored by Git; only the empty `.env.example` template is tracked.

Missing configuration and delivery failures return generic errors without
exposing credentials or provider details. The honeypot is basic protection,
not a rate limiter; monitor usage after making the form public.

Run `node --test tests/contact.test.cjs` for contact validation, Resend SDK
request/response, and form-state checks. These tests mock the provider's HTTP
response; complete a real submission after configuring Resend and confirm it
arrives in `CONTACT_EMAIL` and that Reply targets the visitor.
