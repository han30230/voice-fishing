## Product strategy summary

- **Who**: people under stress on mobile, victims, caregivers, general public.
- **Job-to-be-done**: turn panic into a **safe sequence** (stop → verify via official channels → preserve evidence → recover).
- **Principles**: scenario-first, action before long education, local-first evidence, transparent non-government disclaimer.

## Information architecture (top-level)

- `/` Home (router + quick tiles + trust)
- `/check` 1-minute self check (rules engine + explainability)
- `/emergency` triage hub + subpaths
- `/scams` scenario library + `/scams/[slug]`
- `/recovery` recovery hub + `/recovery/[slug]`
- `/evidence` evidence organizer (local storage)
- `/family` elder/caregiver mode + printable checklist
- `/help` official help hub (structure-first; numbers verified later)
- `/alerts` + `/alerts/[slug]`
- `/learn` + `/learn/[slug]`
- `/search` internal search
- `/tools/script-detector` scam script detector (pattern-based MVP)

## Route map (MVP)

See `src/app/**` and `src/app/sitemap.ts`.

## Component architecture (high level)

- `src/components/site/*` shell, header/footer, breadcrumbs, sticky emergency bar
- `src/components/ui/*` shadcn-style primitives
- `src/components/emergency/*` emergency page template
- `src/components/check/*` self-check UI
- `src/components/evidence/*` evidence wizard
- `src/components/family/*` family mode toggles + printable section
- `src/components/tools/*` script detector
- `src/components/search/*` internal search client

## Design system spec (MVP tokens)

Defined in `src/app/globals.css` as CSS variables mapped into Tailwind tokens:

- **brand** navy: authority without “fake government” chrome
- **danger/warning/success**: alert hierarchy
- **surface/muted**: calm backgrounds
- **print**: `.no-print` / `.print-only` conventions

## Data schemas

Zod + TS types in `src/schemas/domain.ts`.

## SEO strategy (MVP)

- **Semantic URLs** per scenario/recovery/learn/alert
- **`generateMetadata`** on dynamic routes
- **JSON-LD**: Article / FAQPage / NewsArticle where relevant
- **`sitemap.ts` + `robots.ts`**
- **Internal linking**: related scams + hubs
- **Canonical base**: `NEXT_PUBLIC_SITE_URL`

### OG image strategy

- MVP: default metadata without custom OG art.
- Phase 2: generate branded OG templates per category (static images or `@vercel/og`).

## Content model

Implemented as typed TS content modules:

- `src/data/scenarios.ts` (20+ scenarios in MVP seed)
- `src/data/recovery.ts`
- `src/data/help.ts`
- `src/data/alerts.ts`
- `src/data/learn.ts`

## Analytics plan

See `src/lib/analytics.ts` (dispatch `CustomEvent` placeholder).

## Implementation plan (completed in this MVP pass)

- Build shell + emergency-first navigation
- Add self-check engine + explainability
- Add evidence organizer local-first
- Add scenario library with SEO JSON-LD
- Add recovery guides
- Add help hub structure (placeholder official numbers)
- Add internal search + script detector
- Add sitemap/robots + README deploy notes

## Phase 2 roadmap

- Verified official directory w/ admin workflow + audits
- CMS (Sanity/Contentlayer) for scenarios/alerts
- Stronger NLP risk scoring + OCR of screenshots
- Accounts (optional) + encrypted sync
- Partnership embed widgets + printable campaign packs
- Multilingual (EN/JP) with hreflang
