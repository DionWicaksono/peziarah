# Peziarah.com — Design Guide

Working reference for the site as built. Descriptive, not aspirational: every
value here is in use somewhere in the pages. Intended as the seed for a proper
brand kit and voice guide.

---

## 1. What the brand is

Peziarah is a **gift shop of faith** — devotional objects, pilgrimage merch,
hampers, and a travel service — for Indonesian Catholics. Two things run through
everything:

- **Objects meant to be used, not shelved.** The recurring promise is *dipakai
  tiap hari* — a rosary that goes in a pocket, a tote that goes to market.
- **Small batch, hand-checked, named.** Serial numbers, edition counts, local
  artisans, one-off drops. Scarcity is stated as fact, never as pressure.

The design job is to hold two registers at once: **reverent** (this is sacred
material) and **contemporary** (this is a shop with taste). Nothing pious-kitsch,
nothing ironic.

### Tone lines already in the product
> "Kalau setelah membaca kamu tidak beli apa pun, itu juga tidak apa-apa."
> "Sekali cetak. Nggak diulang."
> "Kado iman yang dipakai tiap hari."

---

## 2. Colour

Warm paper base, near-black ink, one liturgical accent, one loud accent.

| Role | Hex | Use |
|---|---|---|
| **Paper** | `#F7F3EA` | Page background, light text on dark, scrim colour |
| **Ink** | `#1A1712` | Body text, dark sections, solid buttons |
| **Violet** | `#6C4BA6` | Eyebrows, link hover, one hero word, full-bleed panels, ticker |
| **Lime** | `#C9E45B` | Primary CTA fill, review stars, edition badge — on ink or violet only |
| Paper alt | `#EFE9DC` `#EDE6D8` | Hero backing, inset panels |
| Card fill | `#EAE3D5` | Image placeholder behind every thumbnail |
| Rule | `#D6CBB8` `#E7DFD1` `#D0C5B1` | Hairlines, chip borders, section dividers |
| Body grey | `#5B5347` `#5C5347` `#4A4238` | Secondary prose |
| Mono grey | `#8A8172` `#9A9083` `#A8A092` | Labels, counts, slot text |
| Long-form ink | `#3A342B` | Article body copy |

Rules in force:
- **Max two background colours per view** (paper + one of ink/violet).
- Lime never sits on paper — contrast fails and it turns acidic. Ink or violet only.
- Violet is a *marker*, not a field: eyebrow labels, one accented word, one panel
  per page. `a:hover { color: #6C4BA6 }` is the global link state.
- `#EAE3D5` is the standing fallback behind every image; a blank cream box means
  a broken asset, not a design choice.

---

## 2b. Identity marks

Two assets, no third. There is no illustrated logo and none is planned.

**The mark — `assets/favicon.png`.** A Cinzel capital **P** in paper `#F7F3EA` on
an ink `#1A1712` square, with a short lime `#C9E45B` underscore centred beneath
it. Full-bleed square, no padding ring, no rounded corners baked in (let the
platform clip it). This single file is *both* the favicon and the profile picture
everywhere — Instagram, WhatsApp Business, Tokopedia, Google Business, email
sender avatar. Same crop every time, so the avatar and the browser tab are
recognisably one thing.

Rules:
- **Never** recolour it. Ink square, paper P, lime rule — that's the mark.
- Never place it on a coloured card or add an outer border; it already carries
  its own field.
- Never use it inline in page copy as a bullet or ornament.
- Minimum legible size 16px (verified at 64 · 32 · 16). Below that, use nothing.
- The lime underscore is the only element that may be dropped, and only for a
  hard single-colour reproduction (embroidery, embossing, foil).

**The logotype — `PEZIARAH`.** Cinzel 600, `letter-spacing: 0.16em`, set in ink
on paper or paper on ink. This is the wordmark for every context with room for
words: site header and mobile drawer, packaging, garment labels, invoices, deck
title slides, print. Word always full and uppercase — no abbreviation, no `PZR`,
never letterspaced tighter, never in Archivo.

**Which to use.** Square or tiny → the mark. Anything wider than it is tall →
the logotype. They are not locked up together; do not build a mark-plus-wordmark
composite.

---

## 3. Type

Four faces, four jobs. Loaded from Google Fonts:
`Archivo 600/700/800` · `Cinzel 400/500/600` · `Hanken Grotesk 400/500/600` ·
`Space Mono 400/700`.

**Cinzel — the wordmark only.** `PEZIARAH`, weight 600, `letter-spacing: 0.16em`.
Roman capitals; the one place the brand looks carved. Never used for headings or
body.

**Archivo — display.** Weight 800 for h1/h2, 700 for h3 and card titles. Always
optically tight: `letter-spacing: -0.03em` to `-0.05em`, `line-height: 0.86–0.95`.
Headline scale is fluid — `clamp(44px, 9vw, 148px)` for a page h1. Constrain by
`max-width: 14–20ch` with `text-wrap: balance`.

**Space Mono — the label voice.** All-caps, `10–13px`, `letter-spacing:
0.08em–0.14em`. Carries eyebrows, counts, prices, timestamps, image slot
captions, "LIHAT RUTE LENGKAP →". This is the layer that makes the site read as
catalogue/archive rather than storefront.

**Hanken Grotesk — body and UI.** 15–19px, `line-height: 1.55–1.68`, always
`text-wrap: pretty`, prose capped at `44–64ch`.

Minimum: nothing below 10px, and only Space Mono goes that small.

---

## 4. Layout

- Container `max-width: 1280px`, side padding `28px`.
- Section rhythm `padding: clamp(46px, 7vw, 92px)`; generous on landing (80–110px).
- **Flex-wrap grids with `gap`**, `flex: 1 1 300px; min-width: 270px` — the
  standard card row. No fixed column counts.
- Radii are large and consistent: `999px` pills, `18px` chips, `22–26px` images,
  `24–34px` panels and cards.
- Hairline `1px solid #D6CBB8` above a section title is the primary divider —
  used instead of extra whitespace.
- Sticky header, 56px tall, paper background, `1px solid #E7DFD1` bottom.

### The eyebrow pattern
Nearly every section opens with a Space Mono caps label — sometimes with an 8px
violet dot, sometimes paired with an Archivo heading on the same baseline. It is
the single most repeated device on the site and should be treated as a brand
asset.

---

## 5. Photography & heroes

Photos run at **full opacity with a minimal scrim** — never filtered, never
duotoned. Two scrim recipes, chosen by the photo's brightness:

**Dark photo → warm-black wash, light ink** (Ziarah, Sendangsono):
```
linear-gradient(8deg, rgba(26,23,18,0.8) 0%, rgba(26,23,18,0.52) 32%,
                      rgba(26,23,18,0.34) 62%, rgba(26,23,18,0.26) 100%)
```
Floor of 0.26 everywhere so text never sits on bare highlight. Breadcrumbs over
photo get a `text-shadow`, not a heavier wash.

**Bright photo → cream wash, dark ink** (Landing, Katalog, Jurnal):
```
linear-gradient(103deg, rgba(247,243,234,0.97) 0%, rgba(247,243,234,0.92) 28%,
                        rgba(247,243,234,0.5) 54%, rgba(247,243,234,0) 76%)
```
Plus a vertical fade top and bottom so the header and any overlaid controls
(rubrik pills) keep their footing. Controls sitting on a bright photo take
`background: rgba(247,243,234,0.82)` + `backdrop-filter: blur(6px)`.

Delivery: WebP at 1800px for on-page, a 1200px JPG alongside for social preview.
Every image gets a real Indonesian alt description of what is in frame.

---

## 6. Components

**Buttons.** Pill `999px`. Primary = lime fill on ink text, hover to paper.
Secondary on dark = `1px solid rgba(247,243,234,0.45)`, hover to a 14% wash.
Secondary on paper = ink outline, hover to ink fill. Padding `15–16px / 28–30px`.

**Tag chips.** `999px`, `1px solid #D6CBB8`, Space Mono 10px caps, `6px 13px`.

**Filter chips.** `18px` radius, two-line (label in Hanken 600 + Space Mono note),
active state = ink fill / paper text.

**Cards.** Media block first with `#EAE3D5` fallback and a centred Space Mono
`[ slot name ]` placeholder; then eyebrow → Archivo 700 title → grey dek → tag
row → a Space Mono link with a violet `border-bottom` and a trailing `→`.

**Section closer.** When a paragraph would otherwise orphan under a grid, it
becomes a panel: `#EDE6D8` fill, `#D6CBB8` border, `28px` radius, violet eyebrow,
Archivo h3 question, dek, and a solid ink pill on the right.

**Ticker.** Violet band, paper text, Space Mono caps separated by `✦`, 28s linear
scroll. Reserved for trust claims.

---

## 7. Voice (starting point)

Indonesian, second person informal (`kamu`). Sentences short. Periods inside
headlines — the full stop is part of the display style (`Pilih jalanmu.`
`Cerita di baliknya.`).

- **State, don't sell.** Facts and constraints do the persuading: minimum 12 pcs,
  10–14 hari kerja, 107/150 tersisa.
- **Permission to leave.** The brand repeatedly tells you it's fine not to buy.
  Keep that — it is the whole trust posture.
- **Casual where it's about people** (`nggak diulang`), **precise where it's about
  the object** (material, dimension, lead time).
- **Never** exclamation marks, urgency countdowns, emoji, or piety as a sales
  argument. Sacred imagery is never placed on a joke or on a body-adjacent good —
  the line is stated in the Jurnal essay and holds product-wide.
- Labels are uppercase and terse; prose is lowercase and warm. The contrast
  between those two is the voice.

---

## 7b. Editorial stance — speaking as Catholics, not for the Church

Peziarah sells devotional objects, so readers will default to hearing the Jurnal
as *the Church talking*. It isn't. The stance below exists so that assumption is
corrected before it's made — which is also what makes honest criticism possible
later.

### The standing we claim
**Lay, faithful, unauthorised.** We're Catholics with opinions and a workshop, not
catechists. Every Jurnal piece is **opinion** — including the theological ones,
including the ones by clergy or scholars. There is no imprimatur, we don't want
one, and we never imply one. What we have is *sensus fidelium*: the ordinary
standing of believers to say what they see. That is enough, and it is limited.

### What is ours to criticise
| Fair game | Not ours |
|---|---|
| Practice, habit, taste, culture | Dogma, doctrinal adjudication |
| Clericalism, abuse of position, neglect | Anyone's sincerity or state of grace |
| Commercialisation of devotion (ours included) | The devotion itself |
| Ugliness, kitsch, laziness in sacred art | The person who loves that object |
| Exclusion, gatekeeping, harshness | Prescribing how anyone must pray |

The distinction is always **practice, not the sacred; institutions and behaviour,
not persons' faith.**

### Three rules that hold whatever the topic
1. **Doctrine vs. practice.** We describe teaching, we don't rule on it. When a
   piece touches doctrine, it reports what the Church holds and then says plainly
   where the writer's own opinion begins.
2. **`Kami juga` — self-implicating always.** No critique points outward at "those
   Catholics." We sell the merch, we run the pilgrimages, we are inside every
   complaint we make. A critique that exempts Peziarah doesn't publish. This is
   the guard against becoming the tasteful-Catholic-superiority brand — the
   likeliest failure mode for a shop with this aesthetic.
3. **Devotion is never the punchline.** Mock a bad rosary, never someone praying
   it. Already the product line's rule; it governs editorial identically.

### Mechanics
- **Every piece signed**, with a one-line bio placing the writer (lay, awam,
  pastor, akademisi). No anonymous criticism, ever — a signature is what makes a
  text opinion rather than pronouncement.
- A standing **`OPINI`** label, in the Space Mono eyebrow, on every piece in the
  rubric. Visible at card level, not buried in the article.
- A **standing masthead line** on the Jurnal index, plain and unhedged: *tulisan
  di sini adalah opini penulis, bukan ajaran resmi Gereja.*
- **Correction policy**, published and used: what was wrong, when, corrected in
  place with a dated note. Never a silent edit.
- **Right of reply** offered to any named person or institution; the reply runs
  unedited except for length.
- **Scripture and liturgical text are never sales copy.** Quoted in editorial when
  it's the subject; never in a product description or promotion.
- Criticism runs in the Jurnal, never in product copy, never in the ticker, never
  in a caption. The shop doesn't argue with you while you're buying.

### Register
Same voice as everywhere else: short, plain, `kamu`, no exclamation marks. On
contentious pieces, **cooler, not hotter** — less adjective, more specific.
Anger is stated once and then evidenced; it isn't the texture of the whole piece.
We don't write to win, and we don't perform reverence to soften a hard point.

---

## 8. Open for the brand kit

Decisions the site implies but has not fixed:
- Full favicon/app-icon size set exported from the master mark (16 → 512, maskable).
- A single-colour stamp cut of the mark for embossing, foil, and embroidery.
- Whether lime stays the only CTA colour once print and packaging enter.
- A liturgical-season palette (Advent violet is already the house violet; what
  serves Lent, Easter, Ordinary Time?).
- Editorial photography direction: the flatlay-on-white register vs. the
  on-location night register currently coexist without a stated rule.
- English voice, if the shop ever ships outside Indonesia.
