# Ishaan Jindal — Portfolio

Personal portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

Live at → [ishaanjindal.tech](https://ishaanjindal.tech)

---

## Try it in your terminal

```bash
curl ishaanjindal.tech
```

The site detects terminal clients (`curl`, `wget`, `httpie`) and returns ANSI-colored ASCII output instead of HTML.

```bash
curl ishaanjindal.tech              # home — banner + bio + links
curl ishaanjindal.tech/about        # about — skills, philosophy
curl ishaanjindal.tech/projects     # projects — full project list
curl ishaanjindal.tech/contact      # contact — reach out
curl ishaanjindal.tech/anything     # unknown paths redirect to home
```

Browsers hitting `/about`, `/projects`, or `/contact` are redirected to the corresponding section on the SPA. Any other unknown path (browser or terminal) redirects to `/`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (header menu, project modal only) |
| Fonts | Inter Tight (display) + Geist Mono (labels) |
| Icons | Custom IJ mark — `favicon.ico` (16/32/48), `icon-192/512.png`, `apple-touch-icon.png` |

## Features

- **Hero** — numbered `01/04` index label, oversized uppercase name with single red accent, statement + quote column
- **Projects** — numbered index rows (number, title, tags, category, arrow) with detail modal
- **Skills / Contact** — ruled definition-list band (`03/04`, `04/04`) with direct links, no forms
- **Resume** — downloadable PDF served from `/resume`
- **CLI Mode** — full terminal portfolio via `curl` with ANSI colors, figlet banner, and per-page navigation
- **Smart Routing** — middleware-based UA detection and browser redirects for clean URLs
- **Security** — CSP with per-request nonces, security headers, rate-limited admin login

## Getting Started

```bash
npm install
npm run dev        # starts dev server on http://localhost:3000
```

Other commands:

```bash
npm run build      # production build (Turbopack)
npm run start      # serve the production build
npm run lint       # run ESLint
npm run typecheck  # TypeScript type check
```

## Environment Variables

The site builds and runs without any env vars. For the admin panel
(`/admin`), create a `.env.local` file — `JWT_SECRET` is required and has
**no fallback**:

```env
ADMIN_PASSWORD_HASH=scrypt_N_r_p_saltHex_keyHex
JWT_SECRET=long_random_string
GITHUB_TOKEN=github_personal_access_token
```

> Note: rate limiting is in-memory (per serverless instance), so it protects against casual spam and brute force but not distributed abuse.

## Project Structure

```
app/
├── admin/                   # Admin login + dashboard (JWT-gated)
├── api/
│   ├── admin/               # Auth (scrypt, rate-limited) + GitHub-backed projects CRUD
│   ├── cli/                 # Terminal (curl) API routes
│   │   ├── render.ts        # ANSI color helpers, figlet banner, layout utils
│   │   ├── route.ts         # GET / — home banner
│   │   ├── about/route.ts   # GET /about — skills & philosophy
│   │   ├── projects/route.ts # GET /projects — project details
│   │   └── contact/route.ts # GET /contact — contact info
├── components/
│   ├── layout/              # Header (numbered nav, mobile menu), Footer
│   ├── sections/            # HeroSection, ProjectsSection, SkillsSection, ContactSection
│   └── utils/               # ProjectIndexRow, ProjectPreviewModal
├── lib/
│   ├── auth.ts              # JWT sessions, scrypt password verification
│   ├── github.ts            # Projects sync via GitHub Contents API
│   ├── is-cli.ts            # Shared terminal-UA detection
│   ├── projects.ts          # Project data & types
│   ├── skills.ts            # Skill-group data & types
│   └── rate-limit.ts        # In-memory sliding window + lockout
├── globals.css              # Design tokens, component styles, responsive rules
├── layout.tsx               # Root layout & metadata
└── page.tsx                 # Home page
data/
├── projects.json            # Projects (title, category, stack, links) — edited via /admin
└── skills.json              # Skill groups shared by the web skills section and CLI /about
proxy.ts                     # UA detection, CLI rewrites, browser redirects, CSP nonces
```
public/
├── ascii-me.webp            # Retained on disk, currently unused by the site
├── favicon.ico              # IJ mark (16/32/48)
├── icon-192.png / icon-512.png # PWA icons
├── apple-touch-icon.png     # iOS touch icon
├── og.jpg                   # Social preview (1200×630)
└── resume.pdf               # Downloadable resume
```
