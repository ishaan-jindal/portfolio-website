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
curl ishaanjindal.tech/anything     # 404 — friendly not-found page
```

Browsers hitting `/about`, `/projects`, or `/contact` are redirected to the corresponding section on the SPA. Any other unknown path redirects to `/`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Email | EmailJS |
| Fonts | Geist (Sans & Mono) |

## Features

- **About** — hero section with ASCII portrait, typing animation, tech-stack skills grid, and social links
- **Projects** — project cards with expanding preview modal and detailed breakdowns
- **Contact** — centered EmailJS-powered contact form with GitHub, Email, and LinkedIn links
- **Resume** — downloadable PDF served from `/resume`
- **CLI Mode** — full terminal portfolio via `curl` with ANSI colors, figlet banner, and per-page navigation
- **Smart Routing** — middleware-based UA detection, browser redirects for clean URLs, terminal-friendly 404s

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
```

## Environment Variables

Create a `.env.local` file with the following (required for the contact form):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
app/
├── api/
│   └── cli/               # Terminal (curl) API routes
│       ├── render.ts       # ANSI color helpers, figlet banner, layout utils
│       ├── route.ts        # GET / — home banner
│       ├── about/route.ts  # GET /about — skills & philosophy
│       ├── projects/route.ts # GET /projects — project details
│       ├── contact/route.ts  # GET /contact — contact info
│       └── 404/route.ts    # GET (catch-all) — terminal 404
├── components/
│   ├── layout/            # Header (mobile hamburger menu), Footer
│   ├── sections/          # AboutSection, ProjectsSection, ContactSection
│   └── utils/             # Reveal, TextProjectCard, ProjectPreviewModal, AsciiPanel
├── lib/
│   └── projects.ts        # Project data & types
├── globals.css            # Design tokens, component styles, responsive rules
├── layout.tsx             # Root layout & metadata
└── page.tsx               # Home page
middleware.ts              # UA detection, CLI rewrites, browser redirects
public/
├── resume.pdf             # Downloadable resume
└── ascii-me.png           # ASCII portrait for hero section
```

## Featured Projects

| Project | Description |
|---------|-------------|
| **WeDroid** | Full-stack club management app (Flutter + Supabase) |
| **Steal CSS** | Extracts any website's CSS and remixes it into a stranger design |
| **SwiftWrite** | Local-first cross-platform Flutter writing app with Markdown, todos, and optional cloud sync |
| **Code-Executor** | Secure isolated code execution service with JWT auth, rate limiting, Docker + gVisor sandbox, and monitoring |
