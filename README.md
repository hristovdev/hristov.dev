# hristov.dev

Personal website of **Hristo Hristov** — freelance full-stack developer based in Sofia, Bulgaria, specializing in React and TypeScript.

## Stack

- [Next.js](https://nextjs.org/) (App Router, standalone output)
- [TypeScript](https://www.typescriptlang.org/) (strict)
- [Material UI](https://mui.com/) with CSS theme variables
- [next-intl](https://next-intl.dev/) — English (default) & Bulgarian
- [Web3Forms](https://web3forms.com/) — contact form email delivery
- ESLint (flat config) + Prettier
- Docker for development and production

## Features

- **Three pages** — Home (short resume, skills, highlights), About (full resume, printable as CV), Contact (validated form that emails inquiries)
- **Light / dark / system themes** — flash-free via MUI color schemes + `InitColorSchemeScript`, accent color `#872bff`
- **Two languages** — `/` (English) and `/bg` (Bulgarian), locale-aware metadata, sitemap and OpenGraph images
- **Subtle motion** — CSS entrance animations, scroll reveals via `IntersectionObserver`, respects `prefers-reduced-motion`
- **SEO** — per-page metadata, hreflang alternates, JSON-LD (Person + WebSite), sitemap, robots, web manifest
- **Contact API** — honeypot spam trap, in-memory rate limiting, server-side validation shared with the client; the Web3Forms access key never leaves the server

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> `npm run typecheck` requires a prior `npm run dev`/`npm run build` (it needs the generated `next-env.d.ts`).

### Scripts

| Script                 | Purpose                       |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Development server            |
| `npm run build`        | Production build              |
| `npm run start`        | Serve the production build    |
| `npm run lint`         | ESLint                        |
| `npm run format`       | Prettier (write)              |
| `npm run format:check` | Prettier (check)              |
| `npm run typecheck`    | TypeScript, no emit           |

## Docker

Production (multi-stage build, standalone Next.js server, non-root user, healthcheck):

```bash
docker compose up --build web
```

Development with hot reload (bind mount + container-local `node_modules`):

```bash
docker compose --profile dev up dev
```

## Environment variables

Copy `.env.example` to `.env` and set your [Web3Forms](https://web3forms.com/) access key. Without it the contact form logs submissions in development and returns a friendly error in production. The key is read only on the server (`/api/contact` forwards to Web3Forms), so it is never exposed in the client bundle.

| Variable               | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap, JSON-LD) |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the contact form       |

## Internationalization

All copy lives in `messages/en.json` and `messages/bg.json`. Routing is `as-needed`: English is served at `/`, Bulgarian at `/bg`. Language-neutral data (contact details, skill chips, tech tags) lives in `src/data/`.

## Content placeholders to review

The following résumé details were improvised and should be verified/replaced with real facts:

- Experience entries before 2019 (companies are described generically: "SaaS product company", "Digital agency", "Software services company")
- Education (B.Sc. Computer Science, Technical University of Sofia, 2007–2011)
- Highlight numbers on the home page (`40+` projects, `8+` industries)
- English proficiency level (C1)
