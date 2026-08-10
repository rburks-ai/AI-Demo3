# Setting — real estate meets furniture

A concept storefront for **Setting**, a brokerage that sells fully furnished
homes and lets you shop the furniture in any listing separately — its
signature feature is a shoppable photo hotspot component (`ShoppableRoom`)
used on the homepage hero and every listing page.

Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS. All data is
mocked locally in `lib/data/` — there is no backend, database, or real
payment flow. "Add to cart" is a visual affordance only.

## Project structure

```
setting/
├── app/
│   ├── layout.tsx            # root layout, fonts, header/footer
│   ├── page.tsx               # homepage (hero, featured listings, shop teaser, how it works)
│   ├── globals.css            # tokens, base styles, hotspot animation
│   ├── not-found.tsx          # styled 404
│   ├── listings/
│   │   ├── page.tsx           # all listings grid
│   │   └── [slug]/page.tsx    # single listing + shoppable hero + "shop this home"
│   └── shop/
│       ├── page.tsx           # furniture grid with category filter
│       └── [slug]/page.tsx    # single product + "featured in" + related items
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PropertyCard.tsx
│   ├── ProductCard.tsx
│   └── ShoppableRoom.tsx      # signature hotspot component (client component)
├── lib/
│   ├── types.ts
│   └── data/
│       ├── properties.ts      # 6 mock listings, each with hotspot coordinates
│       └── furniture.ts       # 10 mock products
├── tailwind.config.ts         # color/type tokens
├── next.config.js             # allows Unsplash remote images
├── package.json
└── tsconfig.json
```

## Design notes

- **Palette**: warm charcoal (`#211F1C`), plaster (`#E7E3D8`), paper
  (`#F6F3EC`), brass (`#B08D57`) as the single accent, moss green as a
  secondary. Deliberately avoids the default cream/terracotta and
  black/neon-accent combinations.
- **Type**: Fraunces (display serif) for headlines, Work Sans for body copy,
  IBM Plex Mono for prices, specs, and tags — mono numerals read like actual
  price tags, which is the point.
- **Signature element**: hover or tap a brass dot on any room photo to reveal
  a tag-style card with the product name, price, and a link to buy it. The
  same component powers the homepage hero and every listing's main photo.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploy to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
vercel
```

Follow the prompts (link or create a project, accept the detected Next.js
settings) and it will build and deploy automatically.

**Option B — GitHub + Vercel dashboard**

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no config changes needed. Click **Deploy**.

No environment variables are required; all data is local mock data and all
images are hotlinked from Unsplash (already allow-listed in
`next.config.js`).

## Extending this

- Swap `lib/data/*.ts` for calls to a real API or CMS — the components
  already consume the `Property` / `Product` types in `lib/types.ts`, so the
  UI won't need to change.
- Wire the "Add to cart" button in `app/shop/[slug]/page.tsx` to real cart
  state (e.g. Zustand or React context) once there's something to check out.
