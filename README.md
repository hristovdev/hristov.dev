# hristov.dev

Personal site of Hristo Hristov — senior full-stack developer. Three pages
(Home · Résumé · Contact), two locales (EN/BG), dark and light themes.

## Stack

| Concern    | Choice                                                          |
| ---------- | --------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19                     |
| Language   | TypeScript 7 (native compiler)                                   |
| Styling    | CSS Modules over CSS custom properties — no component library    |
| i18n       | next-intl, locale-prefixed routes (`/`, `/bg`)                   |
| Linting    | oxlint (TypeScript · React · Next · jsx-a11y · import)           |
| Email      | Resend, called server-side from `/api/contact`                   |
| Secrets    | Doppler                                                          |
| Deployment | Docker, `output: 'standalone'`                                   |

### Why oxlint instead of ESLint

typescript-eslint does not support TypeScript 7 and blocks it at the peer
dependency level ([typescript-eslint#10940]). Every ESLint config that parses
`.ts`/`.tsx` depends on it, so ESLint and TypeScript 7 cannot currently coexist.
oxlint parses TypeScript natively, needs no TypeScript API, and covers the same
rule sets (plus `jsx-a11y`).

[typescript-eslint#10940]: https://github.com/typescript-eslint/typescript-eslint/issues/10940

## Running it

Secrets come from Doppler; nothing sensitive is committed or baked into an image.

```bash
doppler setup                                          # once per machine
doppler run -- docker compose --profile dev up         # development, hot reload
doppler run -- docker compose --profile prod up -d --build   # production
```

Without Docker:

```bash
npm install
doppler run -- npm run dev
```

`doppler run` exports secrets into the process environment, and Compose passes
them through to the container.

### Ports

`DEV_PORT` (dev) and `PORT` (prod) both default to 3000.

## Scripts

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Dev server                                    |
| `npm run build`        | Production build (standalone)                 |
| `npm run start`        | Serve a production build                      |
| `npm run typecheck`    | `tsc --noEmit` (TypeScript 7)                 |
| `npm run lint`         | oxlint                                        |
| `npm run format`       | Prettier, write                               |
| `npm run check`        | typecheck + lint + format check               |

## Environment

See [.env.example](.env.example). `RESEND_API_KEY` is server-only. When it is
unset in development the contact form logs submissions to the console instead
of sending, so the form works without secrets.

`NEXT_PUBLIC_SITE_URL` is inlined at **build** time — in Docker it is a build
arg, not a runtime variable.

## Project layout

```
messages/            en.json · bg.json — every translatable string
src/
  app/[locale]/      pages: /, /resume, /contact
  app/api/contact/   Resend-backed route handler
  components/        layout · home · resume · contact · shared
  data/              language-neutral structure (icons, levels, stacks)
  i18n/              next-intl routing, request config, navigation
  lib/               contact validation (shared client/server), email
  styles/tokens.css  the design tokens
public/
  cv/                CV PDFs (see .gitkeep)
  icons/tech/        Devicon SVGs, vendored — no CDN at runtime
```

## Design

Implemented from the Claude Design handoff (`hristov.dev.dc.html` + README).
Design tokens live in [`src/styles/tokens.css`](src/styles/tokens.css) and are
the single source of colour for both themes — the theme toggle swaps one class
on `<html>` and nothing re-renders.

Two deliberate deviations from the handoff are documented in code: Archivo has
no Cyrillic, so Bulgarian pages run on Inter (see the note in the root layout),
and the case-study "participation" chips were left out because the prototype
carried no copy for them.
