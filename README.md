# Jardineria Putxet — Website Redesign

A modernized rebuild of the [Jardineria Putxet](http://www.jardineriaputxet.com/) website, a family-run garden centre in the Putxet neighbourhood of Barcelona, operating since 1983.

## Tech stack

- **Framework:** React 18 (functional components, hooks)
- **Build tool:** Vite
- **Language:** JavaScript (JSX)
- **Styling:** Tailwind CSS v4 (via the `@tailwindcss/vite` plugin — no separate config file needed)
- **Icons:** [lucide-react](https://lucide.dev/) for utility icons (phone, map pin, clock, mail, menu), plus bespoke inline SVG icons/illustrations drawn specifically for this project
- **Typography:** Fraunces (display), Work Sans (body), IBM Plex Mono (labels/eyebrows), loaded via Google Fonts
- **State:** `useState` for the mobile menu, scroll-triggered header state, and the active language; `useEffect` for the scroll listener
- **Localization:** a self-contained translation dictionary (no external i18n library) driving Catalan, Spanish, and English

## Why it was rebuilt

The original site was built on WebAcappella, a legacy WYSIWYG site builder, and had the constraints that come with that: a fixed-width, non-responsive layout, low-resolution stretched photography, no real information hierarchy, and no way to update it without the original desktop software. The goal of this rebuild was to keep everything true about the business — the services, the address, the hours, the 1983 founding story — while giving it a design and codebase that hold up today.

## Improvements over the original

**Responsive, mobile-first layout**
The original site did not adapt to smaller screens. The new version is fully responsive, with a collapsible mobile navigation menu and fluid type scaling from phone to desktop.

**A real visual identity, not a template**
Rather than reusing a generic template look, the design takes its signature motif from Barcelona itself: a stylized version of the *panot*, the city's iconic four-petal hydraulic sidewalk tile. It appears as a background texture in the hero and footer, as section dividers, and as the icon set in the gallery — tying the brand directly to its own street and neighbourhood instead of a stock "garden shop" aesthetic.

**Deliberate typography and color**
A characterful serif (Fraunces) for headings, a clean grotesque (Work Sans) for body copy, and a monospace face (IBM Plex Mono) for labels and hours replace the default system fonts of the original. The palette — deep foliage green, warm stone cream, muted brick, and a golden ochre — is drawn from the garden and the city's own materials rather than a generic palette.

**Clearer content structure**
The original ran as a single loosely-organized page. The rebuild is organized into distinct, purposeful sections: a hero statement, the shop's history and founding year, a three-part services breakdown (maintenance, pruning & plant health, terrace/garden design), what's available in-store, a species gallery, and a contact section with hours, address, phone, email, and an embedded map.

**Multilingual support**
The original was Catalan-only. The new version includes a language switcher for **Catalan, Spanish, and English**, so residents and visitors can read the site in their preferred language. All copy — navigation, hero, services, shop listing, gallery, and contact details — is fully translated, not just labels.

**Accessible, modern interaction patterns**
Real semantic controls (buttons, `aria-expanded`, `aria-selected`, focus-visible states), a `prefers-reduced-motion` fallback that disables animation for users who request it, and hover/scroll transitions that are subtle rather than decorative.

**Maintainable code**
The entire site is one clearly organized React component with content separated from markup (a `COPY` object per language, a `SERVICES`/`GALLERY` data shape), so updating hours, prices, or adding a fourth language later is a content change, not a redesign.

## Project structure

```
jardineria-putxet/
├── src/
│   ├── App.jsx        → main component: header, hero, history, services,
│   │                     shop band, gallery, contact, footer, and the
│   │                     ca/es/en COPY translation dictionary
│   ├── main.jsx        → React entry point (renders <App /> into #root)
│   └── index.css       → Tailwind entry point (@import "tailwindcss")
├── index.html           → HTML shell Vite injects the app into
├── vite.config.js        → Vite config, includes the Tailwind plugin
├── package.json
└── README.md
```

## Getting started (run it locally)

**Requirements:** [Node.js](https://nodejs.org) 18 or later, and npm (comes with Node).

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/jardineria-putxet.git
cd jardineria-putxet

# 2. Install dependencies
npm install

# 3. Start the local dev server
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`). The page will hot-reload automatically as you edit files in `src/`.

## Deploying to GitHub Pages

This is a static React app once built, so it deploys well to GitHub Pages for free.

**1. Install the deploy helper**
```bash
npm install -D gh-pages
```

**2. Set the base path in `vite.config.js`**

GitHub Pages serves project sites from a subpath (`https://<username>.github.io/<repo-name>/`), so Vite needs to know that:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/jardineria-putxet/', // replace with your repo name
})
```

**3. Add deploy scripts to `package.json`**

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

**4. Push your code, then deploy**

```bash
git add .
git commit -m "Deploy site"
git push origin main

npm run deploy
```

This builds the app and pushes the `dist` folder to a `gh-pages` branch automatically.

**5. Turn on Pages in GitHub**

Go to your repo → **Settings → Pages** → under "Build and deployment," set **Source** to "Deploy from a branch" and **Branch** to `gh-pages` / `root`. After a minute or two, your site will be live at:

```
https://<your-username>.github.io/jardineria-putxet/
```

Any time you make changes, just run `npm run deploy` again to push a new version live.

> **Alternative:** [Vercel](https://vercel.com) or [Netlify](https://netlify.com) can also deploy this repo directly with zero config — just connect your GitHub repo, and they auto-detect the Vite build command (`npm run build`) and output folder (`dist`). No `base` path or `gh-pages` package needed with either of those.

## Original site

[jardineriaputxet.com](http://www.jardineriaputxet.com/) — Ronda General Mitre, 219, 08023 Barcelona.