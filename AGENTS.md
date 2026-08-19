# SautiFarm - Next.js Development Guide

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Type-check with `tsc --noEmit` |

## Architecture

- **Routing**: Next.js App Router (`/app` directory)
- **API**: Next.js API Routes (`/app/api/*/route.ts`)
- **State**: React Context (Language, Auth) + localStorage persistence
- **Styling**: Tailwind CSS v4 with PostCSS
- **PWA**: `next-pwa` (service worker + caching)
- **Auth**: Simulated OTP via `/api/auth/otp` and `/api/auth/verify`

## Key paths

- `src/types.ts` — all TypeScript interfaces
- `src/data/mockData.ts` — all static data
- `src/data/translations.ts` — all 8 language translations
- `app/context/` — Language and Auth contexts
- `app/api/` — API route handlers
- `app/*/page.tsx` — Page components (one per route)
- `components/` — Shared client components

## Lint & Type-check

```bash
npm run lint        # tsc --noEmit
```

All code must pass `tsc --noEmit` with no errors.
