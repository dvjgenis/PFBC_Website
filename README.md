# Fil-American Baptist Church Website

Site for Fil-American Baptist Church in Irving Park, Chicago.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This is a Vite + React SPA. Vercel should detect **Vite** automatically.

1. Import `dvjgenis/Filam_Website` in the Vercel dashboard (or run `npx vercel`).
2. Keep the defaults:
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Deploy.

`vercel.json` rewrites unknown paths to `index.html` so `/faith` and `/contact` work on refresh.

After the first contact-form submit, open `info@fabcchicago.org` and click FormSubmit’s **Activate Form** link so messages keep arriving there.

## Stack

- Vite + React + TypeScript
- React Router
- GSAP + Lenis for motion
