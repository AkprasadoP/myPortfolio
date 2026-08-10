# Ashish Prasad — Personal System

Personal workbench / portfolio for [Ashish Prasad](https://akprasad-portfolio.vercel.app/).

Retro personal-computer interface: notes, stack inventory, experiments, project directory, field log, and contact channel.

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

1. HOME — identity + polaroid card  
2. NOTES — about / notebook entry  
3. GADGETS — tools inventory + web-shooter mini-game  
4. FIELD TESTS — current interests + scanner feed  
5. PROJECTS — directory + file readout  
6. EXPERIENCE — field log  
7. CONTACT — channel + terminal compose  

## Interactive extras

| Component | Path | Where |
|-----------|------|--------|
| `WebShooterGame` | `src/components/WebShooterGame.jsx` | GADGETS panel |
| `ScannerFeed` | `src/components/ScannerFeed.jsx` | FIELD TESTS panel |
| `MixtapePlayer` | `src/components/MixtapePlayer.jsx` | Persistent sticky dock (App root; `/public/audio` for CC0 tracks) |
| `WebStrand` + `useWebStrand` | `src/components/WebStrand.jsx`, `src/hooks/useWebStrand.js` | Global scroll accent |

## File tree (interactive pieces)

```
src/
  components/
    WebShooterGame.jsx
    ScannerFeed.jsx
    ScannerFeed.css
    MixtapePlayer.jsx
    WebStrand.jsx
    WebStrand.css
  hooks/
    useWebStrand.js
public/
  audio/
    README.md
```
