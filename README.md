# Local Business Site Template

A SvelteKit template that builds a full static website from one JSON file.
No CMS, no backend, no database — just edit data, run build, deploy.

## Stack

- **SvelteKit** + `adapter-static` → outputs plain HTML/CSS/JS (`npm run build` → `build/` folder)
- Plain CSS with custom properties for theming — no component library, no Tailwind build step
- 3 ready-made themes (swap with one line in the JSON, no code changes)

## Project structure

```
src/
├── lib/
│   ├── components/     Nav, Hero, About, Services, Gallery, Testimonials, Contact, Footer
│   ├── themes/          base.css (structure) + signboard.css / ledger.css / workshop.css (tokens)
│   └── data/
│       └── client.json  ← THE ONLY FILE YOU EDIT PER CLIENT
├── routes/
│   ├── +layout.svelte    loads theme, fonts, SEO tags, JSON-LD schema
│   └── +page.svelte      assembles sections in order (rarely needs editing)
static/
└── images/                drop the client's photos here
```

## Workflow for each new client

1. **Copy the whole `site-template` folder** to a new folder named after the client.
2. **Fill `src/lib/data/client.json`** with their info — name, phone, WhatsApp number,
   address, services, testimonials, working hours, etc. This is the only file
   you normally need to touch.
3. **Drop their photos into `static/images/`** and point to them from `client.json`
   (`hero.image`, `gallery[].src`). If they don't have good photos, use a few
   free stock photos as placeholders and swap later.
4. **Pick a theme** by setting `business.theme` to `"signboard"`, `"ledger"`, or
   `"workshop"` in `client.json` — see the theme guide below.
5. **Build and preview:**
   ```bash
   npm install
   npm run build
   npm run preview   # check it locally before deploying
   ```
6. **Deploy** the `build/` folder (pure static files, no server needed):
   - **Cloudflare Pages** or **Netlify**: drag-and-drop the `build/` folder, or connect
     the repo and set build command `npm run build`, output directory `build`.
   - **Vercel**: same idea — output directory `build`.
   All of these have free tiers that comfortably cover a one-page business site.
7. **Point their domain** at the deployed URL (or use the free subdomain the
   host gives you for the pitch preview, and only buy/redirect a domain once
   they've said yes).

## Theme guide

| Theme       | Vibe                                   | Good for                              |
|-------------|-----------------------------------------|----------------------------------------|
| `signboard` | Bold enamel blue + mustard, thick outlines | Retail, restaurants, tailors, general shops |
| `ledger`    | Paper white, navy ink, ledger-red rules | Clinics, consultants, accountants, professional services |
| `workshop`  | Concrete grey + safety orange, industrial | Gyms, auto repair, hardware, trades |

To add a 4th theme: copy one of the files in `src/lib/themes/`, change the
`[data-theme='...']` selector name and the CSS variable values, import it in
`src/routes/+layout.svelte`, and reference the new name in `client.json`.

## What's already handled for you

- **Mobile responsive** down to small phones (this matters — most people will
  find these sites via a WhatsApp link on their phone)
- **Click-to-call and WhatsApp buttons** pre-wired from `business.phone` /
  `business.whatsapp` — no forms, no backend needed
- **LocalBusiness JSON-LD schema** injected automatically from `client.json`,
  which is a real, demonstrable local-SEO benefit worth mentioning in your pitch
- **Keyboard focus states + reduced-motion support** baked into `base.css`

## What you still need to do per client

- Real photos (their own, if possible — makes the pitch land better)
- Real testimonials if they have any (Google reviews, WhatsApp screenshots, etc.)
  — otherwise leave the section out rather than inventing quotes
- A Google Maps embed URL: search their address on Google Maps → Share →
  Embed a map → copy the `src` from the iframe code into `mapEmbedUrl`

## Notes

- No component library (BitsUI, shadcn, etc.) is used — this template doesn't
  need one. Adding one would slow down the "duplicate folder → fill JSON →
  deploy" pipeline that's the whole point here.
- Everything is static HTML at build time — nothing calls an API at runtime,
  so hosting cost stays at ₹0 on any of the free static hosts.
