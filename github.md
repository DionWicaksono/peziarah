repo: DionWicaksono/peziarah
branch: main
path: (repo root = the deploy bundle; mirrors this project's publish/ folder)

## Last sync

date: 2026-08-16T03:12:00Z
direction: read-only (inspected repo; nothing pushed — push access not available here)

### Updated in this project
- All 41 photos converted to WebP, capped at 2000 × 2500 px; every reference repointed.
- Per-category product copy replaced the blanket "Diberkati sebelum dikirim" claim.
- Jurnal gained a "Baru terbit" row; Arsip moved below the reader-story sections.
- publish/ rebuilt: all 10 routes + data/ + WebP assets only (PNGs dropped).

### Upstream is stale — replace wholesale
The repo still carries the 40 PNGs (~70 MB). Delete `assets/*.png` upstream and
upload the current publish/ contents; every HTML and data file now points at .webp.

## Screen map

| Repo file | Built from (this project) |
| --- | --- |
| index.html | Landing.dc.html |
| katalog/index.html | Katalog.dc.html |
| produk/index.html | Produk.dc.html |
| keranjang/index.html | Tas.dc.html |
| ziarah/index.html | Ziarah.dc.html |
| hampers/index.html | Hampers.dc.html |
| jurnal/index.html | Jurnal.dc.html |
| jurnal/artikel/index.html | Post.dc.html |
| kontak/index.html | Kontak.dc.html |
| faq/index.html | FAQ.dc.html |
| support.js | support.js |
| data/*.js | data/*.js (asset paths rewritten to /assets/) |
| assets/* | assets/* |

## Build notes

The repo root is generated, not hand-edited. Source of truth is the `*.dc.html`
files at this project's root; `publish/` is the build output and the repo is a
copy of it. Build rewrites: `./support.js` → `/support.js`, `./data/` →
`/data/`, `assets/` → `/assets/`, and `*.dc.html` links → clean routes
(`Tas.dc.html` → `/keranjang/`, `Post.dc.html` → `/jurnal/artikel/`, etc).
Paths are root-absolute, so the bundle must be served from the web root.
