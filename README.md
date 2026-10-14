# Pillar of Faith Baptist Church Website

Site for Pillar of Faith Baptist Church (PFBC) in Naperville, IL.

## Development

```bash
npm install
cp .env.example .env   # add your Supabase URL + anon key
npm run dev
```

### Prayer wall (Supabase)

1. In [Supabase](https://supabase.com/dashboard) → **SQL Editor**, run [`supabase/prayer_wall.sql`](supabase/prayer_wall.sql).
2. Confirm **Realtime** is enabled for `prayer_stickers` (Database → Replication).
3. Copy **Project URL** and **anon public** key from **Project Settings → API** into `.env` (see `.env.example`).
4. Restart `npm run dev` and open the home page **Prayer Wall** section (`#pray`).

For production, set the same `VITE_*` variables in Vercel → **Settings → Environment Variables**, then redeploy.

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This is a Vite + React SPA. Vercel should detect **Vite** automatically.

1. Import `dvjgenis/PFBC_Website` in the Vercel dashboard (or run `npx vercel`).
2. Keep the defaults:
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Deploy.

`vercel.json` rewrites unknown paths to `index.html` so `/faith` and `/contact` work on refresh.

After the first contact-form submit, open `pillaroffaithbc@gmail.com` and click FormSubmit’s **Activate Form** link so messages keep arriving there.

## Stack

- Vite + React + TypeScript
- React Router
- GSAP + Lenis for motion
