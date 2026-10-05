# BACKEER — Design System

*Version 1.0 · October 2026 · Source of truth for `site/assets/css/style.css`*

This document has two parts:

1. **Reference analysis.** What the ten reference sites have in common, measured from their live CSS.
2. **The BACKEER system.** The tokens, grid, rhythm, components and rules distilled from that analysis, adapted for a medtech startup whose audience is **investors and clinical partners**.

---

## Part 1 — Reference analysis

### 1.1 What was measured

Computed styles were read from each live homepage in October 2026 (font family, size, weight, line-height, tracking, colours). The values were captured at a narrow viewport, so absolute heading sizes are the *mobile* step of each scale. The ratios between steps are what matter.

| # | Site | Typeface | H1 (mobile) | Body | Background | Accent | Taken from it |
|---|---|---|---|---|---|---|---|
| 001 | alitegroup.eu | system-ui | — (video hero) | 16/24 | white + full-bleed video | — | Distinct sections · themed cursor · real process video first · pinned header with section name |
| 002 | openwater.health/openlifu | Inter Tight | 40.5px / 700 / −1.8px | 18/20.7 | white + dark hero | light blue | Logo that says the name · "Learn more today" product paths · social icons in footer. **Avoid:** its colours, crowded subsections |
| 003 | resonetics.com | Dagny Pro | 46px / 900 | 16/24 | white + video hero | deep navy `#09003E` | Distinct sections · real process video · **named sections** ("Engineering & Advanced Manufacturing Services") |
| 004 | linear.app | Inter Variable | 38px / 510 / −0.84px | 15/24 | `#08090A` | none (monochrome) | Distinct sections · "Powering the companies…" logo wall · real UI next to hero · hero copy |
| 005 | notion.com | NotionInter | 42px / 600 / −1.5px | 16/24 | white | none | Real product in action near hero · named proof section · sitemap footer |
| 006 | anthropic.com | Anthropic Sans + Serif | 40px / 700 | 20/28 serif | `#FAF9F5` warm off-white | clay orange | Sitemap footer (94 links, all section titles clickable) |
| 007 | stripe.com | Söhne | — | — | white + gradient | violet | Hero animation · fibre-like lines that react to the mouse · "scale with confidence" motion |
| 008 | supabase.com | Manrope + Inter | 34px / 500 | 16/24 @450 | `oklch(.995)` near-white | green | Customer logos restyled into the site's palette · expandable tabs with a photo per tab. **Avoid:** too much detail |
| 009 | retool.com | Saans | 40px / **300** / −0.4px | 16/24 @300 | `#151515` | none | Sticky "slides": text left and image right change together |
| 010 | wise.com | Inter (Wise Sans display) | 30px / 600 / −0.9px | 14/21.7 | white | lime `#9FE870` | Cleanliness · content in **boxes** |

### 1.2 What they share

**Typography**
- **One workhorse sans, tuned tight.** Seven of ten use a neo-grotesk (Inter and its variants, Saans, Manrope, Dagny) for everything functional.
- **Negative tracking on headings, none on body.** H1 tracking runs from −0.01em (Retool) to −0.036em (Notion, Openwater). Body text stays at 0.
- **Medium, not bold.** Linear 510, Supabase 500, Retool 300. The premium sites avoid 700+ on display type. Bold headings (Resonetics 900) read as corporate.
- **Short headings.** Each H2 is one sentence, often under 6 words ("Apps that mean business", "AI where your team works").
- **Body at 15–16px, line-height 24px, in muted grey** (Linear `#8A8F98`, Supabase 52% grey). Headings get full contrast; paragraphs step back.
- **One expressive voice where it counts.** Anthropic pairs its sans with a serif. Stripe and Linear use motion instead. A second voice is used sparingly.

**Grid**
- **12-column container, about 1200–1280px max**, with generous side gutters that collapse to 16–24px on phones.
- **Asymmetric splits** (≈ 5/7, 7/5) instead of 50/50, so sections don't mirror each other.
- **Bento/box grids** (Linear, Supabase, Wise) for feature groups. Tiles vary in size inside one grid.

**Palette**
- **Monochrome base + exactly one accent.** Linear has none; Supabase is green; Wise is lime; Anthropic is clay.
- **Either near-black (`#08090A`, `#151515`) or warm off-white (`#FAF9F5`, `oklch(.995)`).** Never pure `#000`, and rarely pure `#FFF` on premium sites.
- **Colour comes from the product imagery,** not from decoration.

**Rhythm of blocks**
- **Every section has a different layout.** This was the single most repeated note in the brief (001, 003, 004). Hero → logo wall → bento → sticky slides → tabs → cards rail → sitemap footer: no two adjacent sections share a structure.
- **Large vertical padding** between sections (≈ 96–176px desktop) and tight spacing *inside* a section.
- **Proof early.** A logo strip within the first two screens (Linear, Notion, Supabase).

**Use of space**
- **One idea per screen.** The hero has one headline, one supporting line and two CTAs.
- **The product is the hero image.** Real UI (Linear, Notion), real process video (Alite, Resonetics).
- **Whitespace is the luxury signal.** The "too much happening" complaints (002, 008) are exactly where space was given up.

---

## Part 2 — The BACKEER system

### 2.1 Positioning → visual language

| Audience need | Visual answer |
|---|---|
| Investor: "Is this real science, and is it a business?" | Real lab imagery (SEM, splicer, app screenshots), sourced numbers, transparent per-test pricing |
| Clinic: "Will this work in my workflow?" | Product-first sections, the smartphone app shown screen by screen, a clear pilot CTA |
| Both: "Can I trust them?" | Calm dark palette, institutional logo wall, team with credentials, citations under every statistic |

**Concept: *Light in cancer diagnosis.*** The brand is light travelling through a fibre. Darkness is the canvas; the only colour is the light (cyan). Everything else is ink and paper.

### 2.2 Colour tokens

| Token | Value | Use |
|---|---|---|
| `--ink` | `#05080E` | Page background (never pure black) |
| `--ink-2` | `#0A1019` | Alternate section background |
| `--ink-3` | `#111A26` | Raised surfaces, chips |
| `--line` | `rgba(150,185,220,.12)` | Hairlines, card borders |
| `--line-strong` | `rgba(150,185,220,.22)` | Buttons, framed media |
| `--text` | `#E9EEF4` | Headings, key text |
| `--muted` | `#93A0B2` | Body copy (the Linear/Supabase pattern) |
| `--dim` | `#5D6A7C` | Labels, captions, citations |
| `--light` | `#8BE6FF` | **The only accent.** From the logo drop. CTAs, active states, data lines |
| `--light-2` | `#3FB6E8` | Gradient partner / pressed state |
| `--signal` | `#FF8A6B` | Only for "target" moments: the biomarker, the late-stage statistic. Max one use per screen |
| `--paper` | `#EEF1F4` | The one light surface, for evidence sections (problem statistics, cost bars) |
| `--paper-ink` | `#0B111A` | Text on paper |

Rules:
- Ratio of surfaces: ~85% ink, ~10% paper, ≤5% light.
- Body text never sits on cyan. Cyan text only for short labels and links.
- Do **not** borrow Openwater's palette (saturated blues on white).

### 2.3 Typography

| Role | Family | Weight | Size (desktop → mobile) | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (H1) | **Instrument Serif** | 400 (+ italic accent) | 104 → 46px, `clamp(46px, 7.2vw, 104px)` | 1.02 | −0.015em |
| H2 | Instrument Serif | 400 | 76 → 40px | 1.02 | −0.015em |
| H3 (in components) | **Geist** | 500 | 22–24px | 1.3 | −0.01em |
| Lead | Geist | 400 | 20 → 17px, `--muted` | 1.6 | 0 |
| Body | Geist | 400 | 15–16px, `--muted` | 1.6 (24px) | 0 |
| Label / data | **Geist Mono** | 500 | 11–12px, uppercase | 1 | +0.08 to +0.14em |

Why this pairing:
- **Geist** follows the reference pattern of a tight neo-grotesk with medium weights.
- **Instrument Serif** is the single expressive voice (the Anthropic move). It reads as "science publication", which suits a team with 20+ papers, and separates BACKEER from the all-sans tech look and from Alite.
- **Geist Mono** for measurements (µm, aM, %/RIU) gives the lab-instrument feel and keeps numbers aligned.
- One italic accent per headline, coloured `--light`: *"on a strand of **optical fiber**."*

### 2.4 Grid and spacing

- Container: `max-width: 1240px` + gutters `clamp(16px, 4vw, 48px)`. At least 16px gutters on phones, and no horizontal scroll.
- 12 columns, 16px gap for tiles and boxes, 32–96px between text and media columns.
- Preferred splits: **7/5, 5/7, 6/3/3**. Avoid 6/6 except for comparisons.
- Spacing scale (8pt): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 176.
- Section padding: `clamp(96px, 14vw, 176px)` top and bottom.
- Section head → content: `clamp(48px, 7vw, 88px)`.
- Radius: 14px (small media), 22px (cards, tiles), 28px (CTA box), 999px (buttons, chips).

### 2.5 Section catalogue: no two alike

Each section takes one idea from the references. Adjacent sections must not reuse a layout.

| # | Section (header label) | Layout | Reference idea |
|---|---|---|---|
| 1 | **Hero** | 7/5 split; animated fibre canvas behind; real app screen + SEM specimen card | Stripe hero animation + fibres reacting to the mouse; Linear/Notion real UI next to hero |
| 2 | **Built with**: logo wall inside the first screen | One row of monochrome wordmarks restyled into the palette | Linear "Powering…", Supabase restyled logos |
| 3 | **Products** | Two contrasting product panels: the smartphone app shown as five real screens, and a ball-resonator bento with lab photography | Alite/Resonetics "real process first"; Wise boxes |
| 4 | **Why early** (paper) | Editorial big-number grid on light paper, with sources | Brief rule: "numbers without invented statistics" |
| 5 | **How it works** | Sticky slides: steps scroll on the left, media swaps on the right | Retool |
| 6 | **Applications** | Expandable tabs with one image per tab | Supabase "How industry leaders…" |
| 7 | **Compare** | Single clean table + link to pricing | Pricing as a design element |
| 8 | **Engineering Services** | Asymmetric service boxes (1 featured + 2 + 1 wide) | Resonetics naming; Wise boxes |
| 9 | **Team** | 6-up portrait grid, monochrome → colour on hover | — |
| 10 | **What's Happening at BACKEER** | Horizontal snap rail of dated cards | Named sections (Resonetics/Notion) |
| 11 | **Learn more**: three paths | One box split into Investors / Clinics / Research partners | Openwater "Learn more today" |
| 12 | **Footer** | Full sitemap (every section clickable), socials, giant faded wordmark | Notion + Anthropic footer; Openwater socials |

### 2.6 Signature interactions

- **Pinned header with the live section name** (Alite). `BACKEER / Applications` swaps as you scroll, via IntersectionObserver.
- **Cursor = a point of light** (Alite's themed mouse). An 8px glowing dot plus a lagging ring that grows over links. Only on `pointer: fine`, and never with `prefers-reduced-motion`.
- **Fibre field** (Stripe). Canvas lines flowing toward a glowing sphere that bend toward the cursor. Paused off-screen. Static frame under reduced motion.
- **Real-data readouts.** Interactive charts use only published or submitted measurements (e.g. IL-8 response steps), labelled with their source.

### 2.7 Motion

- Easing: `cubic-bezier(.2,.7,.1,1)`. Durations: 200–300ms for UI, 600–800ms for reveals.
- Reveal: fade + 18px rise, once, at 15% visibility.
- Never animate layout-critical content in the first paint; the hero text is visible without JS.
- `prefers-reduced-motion: reduce` disables all motion except instant state changes.

### 2.8 Performance budget (the "under 2 seconds" rule)

- No frameworks, and no autoplay video. The process is shown with real stills and app screenshots; a future video is added as click-to-play only.
- Images: WebP, ≤ 70 KB each, hero assets ≤ 15 KB, `loading="lazy"` below the fold, explicit width/height.
- Fonts: 3 Google families, `display=swap`, preconnect.
- JS: one file, < 15 KB, deferred. The canvas animation runs only while the hero is visible.

### 2.9 Content rules

1. **The hero answers one question:** what does BACKEER do? One headline under 10 words.
2. **No invented statistics.** Every number carries a citation marker and a source line. Status labels are honest ("Lab MVP", "Manuscript under review", "Clinical studies in progress").
3. **Show, don't explain.** Use real SEM images, lab photos and app screenshots. Use stock photography nowhere.
4. **Pricing is visible.** The per-test cost sits on the homepage comparison and on a dedicated pricing page.
5. **One idea per section.** If a section needs subsections, split it (the Openwater/Supabase complaint).
6. **Don't copy Alite Group.** Alite is light, video-led and corporate; BACKEER is dark, still-image and instrument-led, with a serif voice.

### 2.10 Components (summary)

| Component | Spec |
|---|---|
| Button, primary | 48px high, pill, `--light` background, `--ink` text, glow on hover |
| Button, ghost | 48px, pill, 1px `--line-strong`, turns cyan on hover |
| Eyebrow | Mono 12px, uppercase, +0.14em, preceded by an 18px rule |
| Card / box | `--ink-2`, 1px `--line`, radius 22px, padding 22–32px; border brightens on hover |
| Specimen frame | Media inside a box with a mono status bar (instrument metadata) and caption |
| Phone frame | 9:19.5 rounded rectangle, 1px `--line-strong`, holds real app screenshots only |
| Tag / chip | Mono 11–12px, radius 6px or pill |
| Data table | Hairline rows, BACKEER column tinted `rgba(139,230,255,.05)` |
| Citation | Mono 11px superscript in `--dim`; full source in a list at section end |
