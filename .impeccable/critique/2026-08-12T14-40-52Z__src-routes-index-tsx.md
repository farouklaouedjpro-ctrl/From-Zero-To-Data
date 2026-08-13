---
target: homepage
total_score: 30
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
timestamp: 2026-08-12T14-40-52Z
slug: src-routes-index-tsx
---
⚠️ DEGRADED: single-context (Playwright Chromium not installed; browser inspection unavailable. Assessment A performed via thorough source code review + curl-rendered HTML analysis. Assessment B performed via CLI detector only.)

# Design Critique: From Zero to Data — Homepage

**Target:** `src/routes/index.tsx` (homepage)  
**Mode:** Read (with Persuade elements in hero/newsletter)  
**Date:** 2026-08-12  
**Assessor:** Assessment A (design review) + Assessment B (detector CLI)

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active filter state visible; theme toggle has aria-label; header hides/shows on scroll. Gaps: no loading state for async content, focus ring visibility not confirmed on category buttons. |
| 2 | Match Between System and Real World | 4 | Fluent French throughout, natural reading flow, "Le blog" eyebrow grounds context, copy voice is human and honest ("peu d'articles, beaucoup de place pour respirer"). |
| 3 | User Control and Freedom | 3 | Can navigate back, theme toggle, filter resets to "Tout". Gaps: no explicit "clear filters" button, newsletter submit has no undo (low stakes). |
| 4 | Consistency and Standards | 4 | Cohesive system: spacing rhythm (7rem/4rem/1.5rem), color family, typography pairing, interaction patterns all consistent. |
| 5 | Error Prevention | 3 | Email validation on newsletter, 404 page exists. Gaps: no confirmation before newsletter submit (though low-risk), no guard against double-submit. |
| 6 | Recognition Rather Than Recall | 4 | All navigation visible and labeled, categories exposed as pills, icons have aria-labels, no hidden features requiring memorization. |
| 7 | Flexibility and Efficiency of Use | 2 | Basic keyboard navigation works, smooth scroll anchors exist. Gaps: no keyboard shortcuts, no power-user features (search, RSS visible in UI), no bulk actions. |
| 8 | Aesthetic and Minimalist Design | 4 | Every element earns its pixel. Breathing space is the luxury. Mint accent used with parcimonie. Exactly matches product promise. |
| 9 | Help Users Recognize, Diagnose, and Recover from Errors | 3 | Good 404 page with recovery path, error component with retry. Gaps: newsletter form shows success state but no error state for validation/network failures. |
| 10 | Help and Documentation | n/a | Blog homepage; About page (`/a-propos`) serves as product help. No task-focused help needed here. |
| **Total** | | **30/36** | **Good (83%)** |

---

## Design Specificity Verdict

**LLM Assessment:** The design is **grounded and specific** to this product, though not radically distinctive in layout structure. What makes it unmistakably "From Zero to Data" is the intersection of three choices: (1) the mint monofamily color system in oklch precision, which creates a "serre calme" atmosphere that would feel bizarre in a fintech or SaaS product; (2) the Space Grotesk + DM Sans pairing, where the geometric display font whispers "technical" without shouting, perfectly matching the data/AI beginner audience; and (3) the copy voice — "une idée à la fois," "ça arrive," "Rien d'autre" — which is unmistakably French, humble, and human. The breathing space (7rem sections, 65ch line lengths) is a design decision that directly embodies the editorial promise. However, the homepage layout pattern (hero → featured → grid → list → newsletter) is category-standard blog architecture. The specificity lives in the execution details, not the structural innovation. A generic product could not use this palette and typography unchanged without feeling like a clone.

**Deterministic Scan:** The detector found 4 advisory-level issues, all in `src/components/ui/` (calendar.tsx and form.tsx) — font sizes (`0.8rem`) outside the DESIGN.md type ramp. **None of these affect the homepage.** These are false positives for the critique target; they flag shadcn/ui components that inherit from a different type system. The homepage itself (index.tsx, site-header.tsx, article-card.tsx, newsletter-section.tsx) is clean per the detector. No additional issues caught by automation beyond what manual review surfaced.

**Browser Visualization:** Not available — Chromium distribution missing. No reliable user-visible overlay is available. Fallback signal: detector CLI scan only.

---

## Overall Impression

This is a **calm, confident, well-authored homepage** that knows exactly what it is. The design system is coherent and disciplined — the rarity of the mint accent, the tight radius, the generous spacing all speak to a single creative vision. The biggest opportunity is not visual but **behavioral**: the scroll-hide header creates a genuine navigation bug with anchor links, and the empty states (while charming) miss a chance to convert waiting visitors into newsletter subscribers. The design is good; a few interaction fixes would make it excellent.

---

## What's Working

1. **The empty state copy is a masterclass in tone.** "Aucun article pour le moment, ça arrive" turns a negative (no content) into a moment of brand voice. It reassures the reader that the author is intentional, not neglectful. This only works because the rest of the design breathes the same calm confidence.

2. **The color system is genuinely distinctive.** The oklch mint monofamily (primary: oklch 0.55 0.13 168) with the "Rarity Rule" limiting accent to ~5% of screen creates a recognizable identity. The dark mode is not a mechanical inversion — the mint brightens to 0.82 lightness, maintaining the emotional temperature. This couldn't be dropped into a different product without feeling alien.

3. **The scroll-hide header respects reading space.** On a blog where the primary activity is reading, reclaiming 5rem of vertical space after the user scrolls down is a thoughtful choice. The 10px threshold and rAF-based detection show engineering care.

---

## Priority Issues

### [P1] Scroll-hide header breaks anchor link navigation
- **Why it matters:** When a user clicks "Articles" or "Notes" in the header nav, the page smooth-scrolls to the section. The scroll event fires, and if the delta exceeds 10px, the header interprets this as "scrolling down" and hides itself via `-translate-y-full`. The user arrives at the section but the navigation has disappeared. On a long page with multiple anchor targets, this is disorienting — the very tool they used to navigate vanishes mid-journey.
- **Fix:** Add an `isScrollingToAnchor` ref in `useScrollDirection` (or a global scroll-lock) that suppresses direction detection during programmatic smooth-scroll. Alternatively, force `translate-y-0` for 1-2 seconds after any anchor link click.
- **Suggested command:** `/impeccable harden`

### [P1] Missing skip-to-content link
- **Why it matters:** Keyboard users tabbing from the browser address bar must traverse the entire header (logo, 5 nav links, theme toggle, CTA, mobile hamburger) before reaching the main content. With a sticky header, this is 8+ tab stops before reading begins. WCAG 2.4.1 requires a bypass mechanism.
- **Fix:** Add a visually-hidden "Aller au contenu" link as the first focusable element in `<body>` that skips to `<main id="main">`.
- **Suggested command:** `/impeccable harden`

### [P2] Newsletter form has no error state
- **Why it matters:** The form only handles success (`sent === true`). If the user submits an invalid email, or the (future) API returns an error, the UI gives no feedback. The `onSubmit` currently just calls `setSent(true)` unconditionally. Beginners are especially sensitive to uncertainty — they need to know if their action worked.
- **Fix:** Add validation error display below the input (e.g., "Cette adresse ne semble pas valide"), a loading state on the button ("Envoi..."), and an error state for network failures ("Une erreur est survenue, réessaie").
- **Suggested command:** `/impeccable harden`

### [P2] Category filters push working memory boundary
- **Why it matters:** The filter bar shows 5 buttons: "Tout" + 4 categories. Miller's Law (revised) puts working memory at ≤4 items. This is a minor violation — one item over — but on mobile where the buttons wrap to multiple lines, the visual grouping weakens and the decision load increases.
- **Fix:** Consider grouping into a dropdown on mobile (`<select>` or custom), or visually emphasizing "Tout" as the default and collapsing less-used categories behind a "+" pill. Alternatively, accept the 5th item since they are semantically grouped (all are category filters).
- **Suggested command:** `/impeccable layout`

### [P2] Touch targets below 44×44pt on mobile
- **Why it matters:** The theme toggle and hamburger buttons are `size-9` (36px × 36px). WCAG 2.5.5 recommends 44×44 CSS pixels for touch targets. On a mobile blog where users scroll and tap frequently, this increases mis-tap risk, especially for the theme toggle sitting adjacent to the hamburger.
- **Fix:** Increase both buttons to `size-11` (44px) or add invisible padding to maintain visual size while expanding the hit area.
- **Suggested command:** `/impeccable adapt`

---

## Persona Red Flags

### Jordan (Confused First-Timer)
- **"S'abonner" CTA in header** is an outline pill — may not register as a clickable button to someone unfamiliar with modern UI patterns. It looks like a label.
- **No explanation of what "Notes courtes" are** vs "Articles" — the distinction is implied by layout (list vs grid) but never stated. A first-timer may not understand the content taxonomy.
- **Empty states say "ça arrive"** — charming to a regular reader, but a first-time visitor might think the site is broken or abandoned rather than intentionally sparse.

### Sam (Accessibility-Dependent User)
- **No skip-to-content link** — must tab through 8+ header elements to reach main content on every page load.
- **Focus indicators rely on `hover:` states** in many places (nav links, footer links). Need `focus-visible:` rings to confirm keyboard focus location. The theme toggle and hamburger have border changes on hover but need explicit focus rings.
- **Theme toggle has `aria-label` but no `aria-pressed`** — screen reader users cannot determine whether dark mode is currently active. The label changes ("Passer en thème sombre" vs "Passer en thème clair") helps, but `aria-pressed` would make state explicit.
- **The `eyebrow` class uses `text-primary` (mint)** on `background` — need to verify contrast ratio. oklch(0.55 0.13 168) on oklch(0.985 0.008 160) likely passes AA but should be confirmed.

### Casey (Distracted Mobile User)
- **Theme toggle and hamburger are 36px × 36px** — below 44×44pt touch target minimum. Risk of mis-taps, especially when thumb-reaching at top-right.
- **"S'abonner" CTA is hidden below `sm` breakpoint** — mobile users must open the hamburger menu to find the primary conversion action. The newsletter section is far down the page.
- **No state persistence for newsletter form** — if Casey switches apps mid-typing and returns, the email input is empty (no `localStorage` draft or `sessionStorage` recovery).

---

## Minor Observations

- The LinkedIn link in the footer points to `https://www.linkedin.com` with no profile URL — placeholder that should be updated or removed before launch.
- Article page titles use the raw slug (`${params.slug} — From Zero to Data`) instead of the article title in the `<title>` tag. This hurts SEO and bookmark clarity.
- No visible RSS link in the UI — it's in `<head>` but users who want to subscribe via RSS reader won't find it.
- The `featured` section in homepage conditionally renders (`featured &&`), but the loader sets `featured = allArticles[0]` as fallback, so it always renders. This is fine but the fallback logic could be clearer.
- The `article-card.tsx` image uses `loading="lazy"` but the featured article image does not — intentional priority, but worth confirming.
- The newsletter section's `bg-surface` in light mode is oklch(0.955 0.018 165), which is very close to the page background oklch(0.985 0.008 160). The border provides separation, but the tonal difference is subtle.

---

## Questions to Consider

1. **If the content is intentionally empty right now, should the hero give more visual weight to the newsletter CTA?** A visitor who arrives today sees "Aucun article pour le moment" — the only conversion path is scrolling to the bottom. Would a temporary hero CTA ("S'abonner pour être prévenu du premier article") increase retention during the rewrite period?

2. **Does the "Notes courtes" section need a stronger visual distinction from articles?** Currently it's a list vs a grid, but the typography and spacing are similar. Should notes have a denser, more "feed-like" treatment to signal "quick read" vs "deep dive"?

3. **Would a search field in the header help when content returns?** For a blog targeting beginners, search is often the first thing a confused user tries. Is the current category-filter-only discovery model sufficient for 20+ articles, or should search be planned now?
