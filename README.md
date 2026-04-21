# Ishaan Jindal — Portfolio

Personal portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

Live at → [ishaanjindal.tech](https://ishaanjindal.tech)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Email | EmailJS |
| Fonts | Geist (Sans & Mono) |

## Features

- **About** — animated hero with a typing role sequence, tech-stack badge grid, and social links
- **Projects** — auto-scrolling marquee cards with an expanding preview modal (4 featured projects)
- **Contact** — EmailJS-powered contact form
- **Resume** — downloadable PDF served from `/public`

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

## Project Structure

```
app/
├── components/
│   ├── layout/        # Header, Footer
│   ├── sections/      # AboutSection, ProjectsSection, ContactSection
│   └── utils/         # Reveal animation, ProjectTile, ProjectPreviewModal
├── lib/
│   └── projects.ts    # Project data
├── layout.tsx         # Root layout & metadata
└── page.tsx           # Home page
public/
└── resume.pdf         # Downloadable resume
```

## Featured Projects

| Project | Description |
|---------|-------------|
| **WeDroid** | Full-stack club management app (Flutter + Supabase) |
| **Steal CSS** | Steals any website's CSS and vandalizes it with chaotic new styles |
| **SwiftWrite** | Local-first cross-platform Flutter writing app with Markdown, todos, and optional cloud sync |
| **Code-Executor** | Secure isolated code execution service with JWT auth, rate limiting, Docker + gVisor sandbox, and monitoring |
