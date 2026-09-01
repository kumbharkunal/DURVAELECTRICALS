# Durva Electricals — EV charging homepage

A single statically-exported page for Durva Electricals (Rohit Talande, Ulhasnagar-4,
Thane district), replacing a Wix template site.

The page argues one thing: **the charger is the cheap part, the wiring behind it is
what you are actually buying.** Every decision below serves that, or serves a buyer
on a mid-range Android over 4G standing in a parking garage.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # runs prebuild, then exports to out/
npm run typecheck
npm run lint
```

`npm run build` runs `scripts/generate-sizes.mjs` first, which emits 640/1024/1536px
variants beside every source image in `public/images/`. It is idempotent, never
upscales, and the variants are gitignored.

To preview exactly what deploys:

```bash
npm run build && node scripts/serve-out.mjs   # http://localhost:4321
```

---

## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Environment variable | `NODE_VERSION` = `20` |

Node 20 is also pinned in `.nvmrc`. `public/_headers` ships long-cache headers for
`/_next/static/*` and `/images/*`, plus `X-Content-Type-Options`, `Referrer-Policy`
and `Permissions-Policy`.

**Set the real domain before launch.** `business.siteUrl` in `content/site.ts` is
currently `https://durvaelectricals.pages.dev` and feeds the canonical URL, Open
Graph tags, JSON-LD and `public/sitemap.xml` / `public/robots.txt` — update all four.

---

## Before going live

### 1. The demo data

`content/demo.ts` exports `DEMO_MODE`, currently `true`. Every object in that file
carries `demo: true` and **every figure in it is invented**:

- Established 2022 · 340+ installations · 8 localities · same/next-day site visit
- 3–5 hour install · 1 year workmanship warranty · team of three
- The entire pricing table
- All six reviews (names, localities, vehicles, text)
- Six of the eight gallery captions and locations

`install-01` and `install-02` are the only real photographs (`demo: false`), and even
there the **locality is deliberately blank** pending Rohit's confirmation — see the
header comment in `content/installations.ts`.

Nothing in the UI changes when `DEMO_MODE` flips. It exists so there is one switch to
audit against, and one thing it does control:

### 2. Review structured data is gated

While `DEMO_MODE === true`, `lib/schema.ts` emits **no `Review` and no
`AggregateRating`**. The reviews still render on screen for the mockup, but review
markup is what search engines ingest and act on, and shipping fabricated review schema
on a real business's domain is how a site earns a manual action.

The day Rohit has real Google reviews, replace the contents of `reviews` in
`content/demo.ts` and set `DEMO_MODE = false`. The schema lights up correctly with no
other change.

### 3. Questions for Rohit

These are claims the page either makes carefully or deliberately avoids. Confirm
before launch:

1. **Any electrical contractor licence or Maharashtra Electrical Inspectorate
   registration, and its number.** The old site claimed "advanced certifications in
   electrical engineering" with nothing behind it. That claim is not carried over. A
   real licence number would be worth more than any copy on this page.
2. **MSEDCL load sanction** — does Durva file it for the customer, or only advise? The
   FAQ currently says they help put the application together.
3. **Is the 1-year workmanship warranty real?** Currently demo data.
4. **Authorised dealer/installer for any brand, or customer-supplied units only?**
   The brands section says "we install", which is safe. "Authorised partner" would be
   a legal claim.
5. **Is Voltriq a supply relationship or incidental?**
6. **What is "Tech लोकल"** — partner, sponsor, sister brand? It appears on their
   campaign material and is currently *not* on the site, because putting it there
   asserts a relationship.
7. **Public liability insurance?** A strong signal for society committees if yes.
8. **Is a written test record handed over** (insulation resistance, earth continuity)?
   The copy implies testing; a physical handover certificate would be a real
   differentiator worth stating outright.
9. **GST registered?** Materially affects society and commercial buyers.
10. **Real founding year and installation count**, to replace 2022 / 340+.
11. **The actual locality of the Voltriq job** in `install-01` / `install-02`.
12. **Consent for the photograph showing an identifiable person** (`install-01`, used
    in the trust section). The page never names that person, deliberately.
13. **Google Business Profile** — without it the local SEO work has nothing to attach
    to. This is the highest-value item on the list.
14. **The real logo.** `logo-durva.svg` was the one asset missing, so
    `components/ui/Wordmark.tsx` draws a placeholder mark (a conduit bend, tying to
    the spine). Durva already has a logo — it is on the polo shirt in `install-01`.
    Drop the real one in.

### 4. Also check

- Replace the six generated photographs with Rohit's own (`install-03` … `install-08`,
  `hero-install`, `detail-protection`, `problem-socket`). Keep the aspect ratios in
  `content/installations.ts` or update the `width`/`height` fields with them.
- `og.jpg` is generated. A real photograph would share better on WhatsApp.

---

## Architecture

```
app/            layout (fonts, metadata, JSON-LD), page composition, globals.css
content/        site.ts (verified + copy) · demo.ts (invented) · installations.ts
components/
  shell/        Navbar, MobileMenu, MobileActionBar, DesktopWhatsApp, SmoothScroll
  conduit/      ConduitSpine + orthogonal path builder — the signature moment
  sections/     one file per page section, in page order
  ui/           Figure, Lightbox, SpecValue, Wordmark, buttons, QuickMessage
  icons/        Instagram and WhatsApp official marks + hand-drawn schematic glyphs
lib/            schema, scroll engine, hooks
scripts/        generate-sizes.mjs (prebuild) · serve-out.mjs (local preview)
```

### Things that are deliberate

- **Mono is structurally contained.** `components/ui/SpecValue.tsx` is the only
  component that applies IBM Plex Mono, and it appears only in the spec list and the
  pricing table — genuine tabular engineering figures. No mono eyebrows or labels.
- **Green means one thing: live current.** `--live` is a surface, a rule, or the
  pulse on the conduit spine. `--live-ink` is the only green permitted for text under
  20px, and only on `--paper` — it measures 4.33:1 on `--mist` and fails AA there.
  `--earth` is stroke-and-marker only (4.21:1 on paper); `--earth-ink` exists for the
  text-safe case. Full measured table at the top of `app/globals.css`.
- **`--earth` appears exactly three times**: the unprotected spur on the spine, the
  rule above the 15A-socket section, and the marker on the matching FAQ answer.
- **No stars, no rating, no review count**, anywhere. The specificity is the proof.
- **Brand names are set as type, not logo files** — we have no licence for OEM marks.
- **No Facebook, TikTok, YouTube or LinkedIn links.** The old site shipped five
  unedited Wix placeholders on `http://`, TikTok included. Instagram is the only
  account they actually have.
- **The contact form composes a WhatsApp message.** Static export has no server, and
  shipping a form that silently goes nowhere would repeat the exact fault we are
  replacing.
- **The lightbox is a native `<dialog>`** — focus trapping, Escape and focus
  restoration for free, and less JavaScript than hand-rolling them.
- **The FAQ is native `<details>`/`<summary>`** — keyboard-operable and
  open-on-find-in-page with zero JS.

### Deviations from the brief, and why

- **Archivo ships without the `wdth` axis.** Measured, the width axis costs 90KB for
  the preloaded latin subset against 33KB without it — 57KB on the render path, about
  1.1s on Slow 4G, against a stated LCP target of 2.0s. The industrial register is
  carried by weight and tight tracking instead. Re-add `axes: ['wdth']` in
  `app/layout.tsx` to reverse.
- **Next 15, not 16.** Next 16 was measured at ~133KB of first-load JS against Next
  15's 106KB for the same page. The brief says "15+"; the 27KB matters.
- **The active-nav indicator uses IntersectionObserver, not ScrollTrigger.** It then
  keeps working before GSAP has loaded and under `prefers-reduced-motion`, where GSAP
  is never imported at all.
- **No `ScrollTrigger.scrollerProxy`.** Lenis scrolls the window itself, so the
  correct wiring is `lenis.on('scroll', ScrollTrigger.update)` plus driving
  `lenis.raf` from the GSAP ticker. `scrollerProxy` is for custom scroll containers.
- **The mobile panel animates in CSS, not Framer Motion.** It is the most important
  interaction on the page and had to be deterministic. The easing is a `linear()`
  curve sampled from the specified spring (stiffness 260, damping 30, mass 0.9 →
  ω₀ 16.997 rad/s, ζ 0.9806, settling at 414ms), so it follows the specified curve
  exactly. Framer Motion still drives the staggered links.
- **No GSAP plugins.** Note that Club GSAP plugins are now free following Webflow's
  acquisition, so the brief's "they are paid" is out of date — but the constraint is
  worth keeping on bundle grounds: DrawSVG wraps the `stroke-dashoffset` this needs
  four lines of, and SplitText is ~9KB for a job a small utility does.

### Phase two — not built

Service-area landing pages at `/ev-charger-installation-ulhasnagar/`, `/kalyan/`,
`/ambernath/`, `/badlapur/`, `/dombivli/`, `/thane/`, `/navi-mumbai/`, plus
`/ev-charger-installation-cost/` and `/housing-society-ev-charging/`. Each needs
genuinely distinct copy and at least one local installation photograph — thin
duplicated locality pages are worse than none.
