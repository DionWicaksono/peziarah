# /salve-regina/ — source

The live page is `salve-regina/index.html` + `salve-regina/salve-regina.js`. Both are BUILT from this folder; edit here, then rebuild.
This folder is blocked by `.htaccess`, so it deploys with the repo but is never served.

- `src/verses.ts` — the Douay-Rheims verses on the drawing (public domain). Add or change verses here.
- `src/TransmissionEngine.ts` — the WebGL drawing (three.js).
- `src/main.ts` — scroll story, passage buttons, lens. Binds to the prerendered HTML.
- `src/maryPaths.ts` — the drawing's lines, traced from `salve-regina/maria.jpg` by `trace.py`.
- `page.py` — writes the prerendered `salve-regina/index.html` (copy, verse list, SEO, footer copied from /bulan-rosario/).

Rebuild: `npm install`, then `npm run build`. After changing the script, bump `?v=` in page.py so returning visitors don't keep the 7-day cached copy.
