# Prompts for Claude Code

Copy and paste these one at a time. Wait for each phase to finish and review the work before moving on.

---

## Phase 1 — Scaffold and integrate

Paste this first:

> Read CLAUDE.md for full project context.
>
> I want you to scaffold a Vite + React 18 project in the current directory, with Tailwind CSS v3 and Framer Motion installed. The component at `src/CinematicPortfolio.jsx` is the prototype — wire it into `App.jsx` as the main view.
>
> Specifically:
> 1. Run `npm create vite@latest . -- --template react` and confirm overwrite if it asks.
> 2. Install dependencies: `framer-motion`, plus dev deps `tailwindcss@3`, `postcss`, `autoprefixer`.
> 3. Run `npx tailwindcss init -p` and configure `tailwind.config.js` with the `content` glob covering `index.html` and `src/**/*.{js,jsx}`.
> 4. Replace `src/index.css` with the three Tailwind directives.
> 5. Replace `src/App.jsx` so it imports and renders `CinematicPortfolio` from `./CinematicPortfolio.jsx`.
> 6. Update `index.html`'s title to "Atelier Norden" and add `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`.
> 7. Run `npm run dev` to verify it works. Tell me the local URL.
> 8. Initialize git, add a sensible `.gitignore` (Vite gives you one — verify it covers `node_modules`, `dist`, `.env`), and make the initial commit.
>
> Pause before each shell command the first time so I can see what you're about to run.

---

## Phase 2 — Polish

Once Phase 1 is working and you've reviewed it, paste this:

> Phase 2: polish pass.
>
> 1. Install Lenis (`npm install lenis`) and wrap the app with a smooth-scroll provider. Make sure it doesn't fight with Framer Motion's `useScroll` — Lenis exposes a `lenis.on('scroll', ...)` hook that you may need to bridge to `window` scroll events for Framer Motion to read.
> 2. Create a `public/assets/` directory with subdirectories `videos/`, `images/`, and `fonts/`. Add a README inside `public/assets/` explaining what goes where (e.g. "hero-loop.mp4 here — 1080p, <10MB, silent, looping").
> 3. In the hero section, add a `<video autoPlay muted loop playsInline>` element layered behind the current gradient, with `src="/assets/videos/hero-loop.mp4"` and a poster fallback. If the video file doesn't exist yet, it should fail gracefully and just show the gradient.
> 4. Build a small `<ProjectImage>` component that takes an `src` and shows a blur-up loading state. Stub it into one of the project cards so I can see how it'll look when real images are added.
> 5. Add `<link rel="preconnect">` and `<link rel="preload">` tags for the Google Fonts in `index.html` for faster initial render.
> 6. Run a quick mobile responsiveness check — load the dev server, walk me through testing horizontal scroll behavior on iPhone (using Safari responsive design mode or just my actual phone on local network).
> 7. Commit with a clear message.

---

## Phase 3 — Deploy

When Phase 2 is solid:

> Phase 3: deploy to Vercel via GitHub.
>
> 1. Help me create a new private GitHub repo called `atelier-norden` (use the `gh` CLI if available, otherwise walk me through doing it on github.com). Push the project to it.
> 2. Walk me through connecting the repo to a new Vercel project at vercel.com/new. Confirm the framework preset is Vite and the build command is `npm run build` with output directory `dist`.
> 3. Once deployed, give me the live URL and verify it loads.
> 4. Set up a `vercel.json` if any custom routing is needed (probably not for a single-page site — confirm).
> 5. Explain how to add a custom domain when I'm ready (steps inside Vercel + DNS records I'd need to set at my registrar).

---

## Bonus prompts (run anytime)

**Replace the project showcase with real content:**
> Update the `projects` array in CinematicPortfolio.jsx with the following four real projects: [list them — name, tag, year, accent color hex]. Also let me know what image dimensions you need for each card and where to drop them in `public/assets/images/`.

**Add a case study page:**
> Create a `/work/[slug]` route using React Router. Each case study should have a pinned cover image, a long-scroll layout with alternating full-bleed and contained sections, and a "next project" link at the bottom that smoothly transitions to the next case study. Use Framer Motion's `LayoutGroup` for the cross-page hero transition.

**Add a Three.js hero scene:**
> Replace the CSS gradient hero background with a Three.js scene using @react-three/fiber and @react-three/drei. I want something subtle — a distorted plane with a custom shader that responds to mouse position and scroll. Keep it under 60fps on mid-range mobile.

**Performance audit:**
> Run a Lighthouse audit on the production build. Tell me the four scores (Performance, Accessibility, Best Practices, SEO), then propose the three highest-impact fixes. Don't implement yet — just plan.
