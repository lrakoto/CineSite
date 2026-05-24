# Atelier Norden — Cinematic Portfolio Site

## Project overview

A single-page cinematic portfolio website for a fictional independent design studio. The aesthetic target is editorial, dark, premium — in the lineage of Awwwards-winning agency sites (Active Theory, Lusion, Igloo Inc, Apple product pages). The goal is a real production deployment, not just a prototype.

## Owner context

- The owner is a non-technical founder/operator working in idea generation and concept evaluation mode.
- He is in Burbank, Los Angeles.
- He has previously deployed web apps using Docker Compose on Hetzner VPS, has familiarity with Node.js/Express and Python backends, and uses Claude Code as his primary development tool.
- Communicate at an intermediate technical level — assume comfort with terminal, git, and reading code, but explain non-obvious choices.

## Tech stack (target)

- **Framework:** Vite + React 18
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion (already in use in the prototype)
- **Smooth scroll:** Lenis (to be added in Phase 2)
- **Deployment:** Vercel (free tier is sufficient)
- **Source control:** GitHub

## Design system

- **Background:** `#0a0a0a` (off-black)
- **Foreground:** `#e8e4dc` (warm bone)
- **Accent gold:** `#c9a878`
- **Accent blue:** `#7a9fc7`
- **Accent rust:** `#b87474`
- **Accent violet:** `#8a7ab0`

**Typography (Google Fonts):**
- Display: Fraunces (300, 400, 600 with optical sizing)
- Italic display: Instrument Serif
- Mono / labels: JetBrains Mono (300, 400)

**Editorial conventions:**
- Section numbering: `(01)`, `(02)`, etc. in mono caps with `0.2em` tracking
- Roman numerals for years (MMXXVI)
- Coordinates in HUD-style mono
- Bold serif display with italic serif accents inside the same headline

## Prototype component

The starting point is `src/CinematicPortfolio.jsx`. It's a single self-contained React component with five sections:

1. Pinned hero with scroll-linked scale/blur/opacity transforms
2. Manifesto block with editorial type
3. Horizontal-scroll-on-vertical-scroll project showcase (the signature move — uses a tall `400vh` parent with sticky child and `useTransform` driving x translation)
4. Infinite marquee
5. Contact section with footer

It also includes a fixed HUD (live UTC clock, pulsing dot, scroll progress bar) and a CSS grain overlay.

## What needs to happen

### Phase 1 — Scaffold and integrate
- Initialize Vite + React project in the current directory
- Install Tailwind, configure with the design tokens above
- Install Framer Motion
- Wire `CinematicPortfolio.jsx` into `App.jsx`
- Verify `npm run dev` works and the page renders correctly
- Initialize git, make initial commit

### Phase 2 — Polish
- Add Lenis smooth scroll, wrap the app
- Set up `public/` directory structure for video and image assets
- Add `<video>` elements as placeholder hero background with a fallback to current CSS gradient
- Add an image-with-blur-up component for project cards
- Performance pass: lazy-load horizontal section, preload fonts, check Lighthouse score

### Phase 3 — Deploy
- Push to a new GitHub repo
- Set up Vercel project, connect to repo
- Configure build settings (Vite defaults are usually correct)
- Verify live URL works
- (Optional) Custom domain wiring

## Constraints and preferences

- **Single-component-first.** Keep the portfolio as one main component unless splitting genuinely improves readability. Easier for the owner to scan.
- **Real video assets are external.** Don't try to generate or download video — set up the structure so the owner can drop `.mp4` files into `public/` later.
- **Mobile must work.** The horizontal-scroll section needs to behave on iPhone Safari. Test scroll-snap behavior. The HUD nav should hide gracefully on narrow viewports (it already does).
- **No CMS yet.** Content is hardcoded in the component. A future phase could move project data to a JSON file or MDX.
- **Don't auto-approve destructive commands.** When the owner is reviewing your work, pause before anything that deletes files or force-pushes.

## When in doubt

Ask the owner. Prefer one clarifying question over guessing on direction.
