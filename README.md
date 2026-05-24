# Atelier Norden — Claude Code Handoff

Everything you need to take this portfolio from prototype to deployed site, using Claude Code as your build partner.

---

## What's in this folder

```
atelier-norden-handoff/
├── README.md              ← you are here
├── CLAUDE.md              ← project context Claude Code reads automatically
├── PROMPTS.md             ← copy-paste prompts for each phase
└── src/
    └── CinematicPortfolio.jsx  ← the component prototype
```

---

## Step 1 — Install Claude Code (one-time, ~5 min)

You need a paid Claude plan (Pro, Max, Team, or Enterprise). The free plan does not include Claude Code.

**Easiest path — Claude Desktop app:**
1. Download from https://claude.com/download
2. Sign in with your Claude account
3. Open the "Code" tab — that's Claude Code with a graphical interface

**Or the terminal CLI (Mac):**
1. Make sure you have Node.js 18+ (`node -v` in Terminal). If not, install from https://nodejs.org
2. Run: `npm install -g @anthropic-ai/claude-code`
3. Run: `claude` from any directory to start a session

If you hit any install snags, the official docs are at https://docs.claude.com/en/docs/claude-code/overview.

---

## Step 2 — Drop this folder on your computer

1. Save this entire `atelier-norden-handoff/` folder somewhere you'll remember (e.g. `~/Projects/atelier-norden`)
2. Rename it to whatever you want your project called

---

## Step 3 — Hand off to Claude Code

**If using Desktop app:** Open the Code tab, point it at your project folder, paste the first prompt from `PROMPTS.md`.

**If using CLI:**
```bash
cd ~/Projects/atelier-norden
claude
```

Then paste the first prompt from `PROMPTS.md` and let it run.

Claude Code will automatically read `CLAUDE.md` for project context, so you don't have to re-explain anything.

---

## Step 4 — Follow the prompt phases

`PROMPTS.md` is organized in phases:

- **Phase 1 — Scaffold:** Set up Vite + React + Tailwind + Framer Motion, integrate the component, get it running locally
- **Phase 2 — Polish:** Add Lenis smooth scroll, real assets, performance fixes
- **Phase 3 — Deploy:** Push to GitHub, deploy to Vercel, add a custom domain

Run them one at a time. Review the work between phases. Don't approve destructive commands blindly — Claude Code is powerful, and you want to actually see what it's doing.

---

## A few practical notes

- **Approve commands carefully.** Claude Code can run shell commands and edit files. Read each one before approving the first few times until you trust the pattern.
- **Use plan mode for big changes.** Type `/plan` to have Claude propose changes before executing them.
- **Commit often.** After each working phase, ask Claude Code to commit to git. If anything breaks, you can roll back.
- **Real assets are still on you.** Claude Code can scaffold placeholder video tags, image components, and asset directories, but the actual video files, photography, and 3D scenes have to be sourced or created. Pexels and Coverr have free 4K stock footage.

That's it. Open `PROMPTS.md` next.
