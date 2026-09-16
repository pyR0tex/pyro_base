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
requests. Valid requests currently return **503** with an explicit message that
nothing was sent or stored. No email delivery is simulated.

No environment variables are currently required. To enable delivery, implement
the integration point in `app/api/contact/route.ts` using a server-side provider.
Define that provider's credentials and recipient in server-only environment
variables (never `NEXT_PUBLIC_*`), handle provider failures with a non-2xx JSON
response `{ success: false, error: "..." }`, and return `{ success: true }` only
after confirmed acceptance. Then update the form's delivery notice. Add abuse
protection appropriate to your deployment before enabling a public email sender.

The form handles submitting, success, validation/delivery failure, and network
failure; it retains inputs on failure and prevents duplicate pending requests.
Until delivery is configured, the success state can only be exercised using a
mock response, not by sending real messages.
