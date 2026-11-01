# Ashish Prasad — Portfolio

Portfolio for [Ashish Prasad](https://akprasad-portfolio.vercel.app/), backend / full-stack software engineer.

Noir Spider-Man theme: near-black, one crimson accent, condensed poster type (Anton) and mono labels (JetBrains Mono). The theme lives in small details — section kickers, a static corner web, a few easter eggs — while every heading stays plain English.

## Stack

- React 18 + Vite
- Tailwind CSS v4
- Framer Motion (light use)
- Radix Toast + Web3Forms
- Deployed on Vercel

## Quick start

```bash
git clone https://github.com/AkprasadoP/myPortfolio.git
cd myPortfolio
cp .env.example .env
# add your Web3Forms access key to .env
npm install
npm run dev
```

Dev server: http://localhost:5173

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint

## Contact form

The contact form uses [Web3Forms](https://web3forms.com). The access key is loaded from `VITE_WEB3FORMS_ACCESS_KEY` (see `.env.example`). Restrict the key to your domain in the Web3Forms dashboard. Set the same variable in Vercel for production.

## Sections

1. Index — hero, proof strip (LeetCode + projects + internships)
2. About — summary, measured outcomes, working motto
3. Experience — expandable role log
4. Work — project list + readout, then the LivePulse architecture deep dive
5. Stack — tools by layer
6. Problem solving — live LeetCode stats (`src/lib/leetcode-live.js`, bundled snapshot fallback)
7. Lab — current interests + opt-in web-shooter game
8. Contact — what I'm looking for, links, Web3Forms message form

Content lives in `src/data/site.js`; the LivePulse deep-dive copy lives in `src/data/livepulse.js`.

## Interactive pieces

| Component | Path | Where |
|-----------|------|--------|
| `LivePulseDeepDive` | `src/components/LivePulseDeepDive.jsx` | Work — animated architecture trace, lock-race and failure-window step-throughs |
| `WebShooterGame` | `src/components/WebShooterGame.jsx` | Lab — loads only when a visitor presses play (or `⌘K` → play game) |
| `MixtapePlayer` | `src/components/MixtapePlayer.jsx` | Docked bottom-right (`/public/audio`) |
| `CommandPalette` | `src/components/CommandPalette.jsx` | `⌘K` — jump to sections, résumé, music, game |
| `SuitUp` + `KonamiWatcher` | `src/components/ui/` | Easter egg: ↑↑↓↓←→←→BA |
| `WebNoir` | `src/components/ui/WebNoir.jsx` | Static web backdrop |

## SEO

`index.html` carries Open Graph / Twitter tags, a 1200×630 card (`public/og-card.jpg`) and Person JSON-LD. `public/robots.txt` and `public/sitemap.xml` are served as-is.
