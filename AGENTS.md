# pyR0tex.dev Agent Instructions

## Project

Personal developer website for Ro.

Stack:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- App Router

## Design Direction

- Dark, minimal developer aesthetic
- JetBrains Mono / monospace typography
- Neutral-950 background
- Cyan and rose/red accents
- Thin borders
- Subtle glow effects
- Sharp corners rather than large rounded cards
- Terminal/system-inspired, but never a fake terminal UI
- Avoid generic SaaS/portfolio styling

## Architecture

- Prefer reusable components over large page files.
- Keep reusable content/data separate from presentation where practical.
- Project information should come from a central project data source.
- Site-wide links/config should be centralized.
- Use Next.js Link for internal navigation.
- Follow App Router conventions.

## Code Quality

- Use TypeScript.
- Keep components simple and focused.
- Avoid unnecessary dependencies.
- Prefer Tailwind utilities over adding large amounts of custom CSS.
- Maintain responsive mobile and desktop layouts.
- Use semantic HTML and accessible form controls.
- Do not expose secrets client-side.

## Content Rules

Do not invent:

- personal links
- email addresses
- résumé URLs
- project statistics
- testimonials
- professional accomplishments

Use clearly marked placeholders when information is unavailable.

## Validation

After meaningful changes:

- run `npm run lint`
- run `npm run build`
- fix errors introduced by the change

## Current Site Structure

Primary routes:

- /
- /projects
- /about
- /lab
- /notes

Projects are substantial finished work or case studies.

Lab is for smaller experiments, prototypes, and exploratory builds.

## Scope

Do not make unrelated changes unless required for the requested task.
