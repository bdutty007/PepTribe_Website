# PepTribe Body Atlas — Pep-Card Integration

This build connects the Body Atlas to the completed, audited Pep-Card library.

## Current state
- **66 canonical Pep-Cards** total (the authoritative inventory).
- **61 two-page cards** — show a "2-Page Pep-Card" badge in the compound modal.
- **5 intentional single-page cards** (Dihexa, Methylene Blue, MK-677,
  SLU-PP-332, Snap-8) — show a "Single-Page Pep-Card" badge. These do not
  use the standard second-page reconstitution/mixing reference format.
- The library is **complete**. There is no "expanded vs original" split, no
  next-generation rollout, and no cards pending completion.

## Routing
- The Body Atlas links to individual Pep-Cards via the **public** route:
  `https://peptribe.us/pep_cards?card=<canonical-slug>`
- The Media Storage Page 1 image URLs in `src/data/pepCards.ts` are kept
  **only** for internal verification/reconciliation and are never used as a
  public CTA destination.
- The member library is handled separately (Member Login CTA points to the
  PepTribe Client Portal).

## Canonical metadata
- `src/data/pepCards.ts` holds the single canonical/alias lookup for all 66
  cards (canonical name, slug, two-page flag, Page 1 filename, Page 1 URL,
  and Atlas aliases).
- `getPepCardMeta(name)` resolves any Atlas name/alias/slug to its canonical
  card. `getPepCardLandingHref(name)` returns the public `?card=<slug>` URL.
- IGF-1 LR3 is intentionally excluded from the production library and returns
  `null` from `getPepCardMeta`.

## Atlas inventory alignment
- The Atlas now contains **66 compounds** across the existing 7 body systems.
- HGH, P21, PNC-27, and Snap-8 were added; IGF-1 LR3 was removed.
- Scientific content for HGH, P21, PNC-27, and Snap-8 is sourced from the
  finished audited Pep-Cards (first-page reference library) and follows the
  same evidence-aware tone as the rest of the Atlas.
- System assignments: HGH → system 2 (Hormones & Performance), P21 →
  system 1 (Brain & Cognition), PNC-27 → system 6 (Immune & Inflammation),
  Snap-8 → system 5 (Longevity & Aging, topical/cosmetic context).

## Deep linking
- Production Atlas deep links continue to use `?compound=<slug>`.
- `src/pages/Index.tsx` resolves `?compound=` through the centralized
  canonical lookup first (so aliases like `cjc-ipa`, `cjc-ipa-blend`,
  `cjc-1295-with-dac`, `cjc-1295-no-dac`, `nad-plus`, `tesa-ipa-cjc`,
  `thymosin-alpha-1`, `hgh`, `p21`, `pnc-27`, and `snap-8` all resolve),
  then falls back to a mechanical slug comparison for legacy links.

## Dosing reconciliation (global pass)
- All 66 Atlas compounds were reviewed against the newest audited
  full 2-page Pep-Card library (Page 1 dosing/route fields).
- 51 compounds had their `dosing` field updated to match the audited
  card; 7 also had their `route` field expanded to reflect multi-route
  cards (Adamax, Oxytocin, VIP, Semax, Selank, Selank Amidate, PE-22-28).
- Notable reconciliations: BPC-157 (0.5–1 mg 1–3x daily), TB-500
  (2.5 mg 2x weekly), HGH (1–4 IU daily), Retatrutide (1–10 mg weekly),
  KLOW (2–8 mg daily), GLOW (10–20 units daily), Thymosin Alpha 1
  (1.6 mg 2x/week or 500 mcg daily, 4–8 weeks on 4 weeks off).
- The five intentional single-page cards (Dihexa, Methylene Blue,
  MK-677, SLU-PP-332, Snap-8) remain single-page; Snap-8 stays TOPICAL.
- No unsupported values were invented; fields absent from the audited
  cards were preserved from existing PepTribe content.
