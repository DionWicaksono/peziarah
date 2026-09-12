# Peziarah.com — project rules

## Publish build: asset paths MUST be root-absolute
The site is served from the domain root, and pages live in subfolders
(`/ziarah/`, `/ziarah/rute/<id>/`, `/jurnal/artikel/<slug>/`, `/produk/<id>/`).
A relative path like `"assets/foo.webp"` therefore resolves to
`/ziarah/assets/foo.webp` → 404 → cards render as blank cream boxes.

**Rule:** every asset reference inside `publish/**` starts with a slash:
`"/assets/foo.webp"`. This applies to `publish/data/*.js` (routes, journal,
products, post-bodies, hampers) and to every `publish/**/index.html`.

Source `data/*.js` at the project root stays RELATIVE (`"assets/foo.webp"`) —
the .dc.html previews load from the project root. Only the publish copies get
the leading slash. So when syncing source → publish, add the slash.

Check before every publish handoff:

    grep -n '"assets/' publish   # must return nothing

This has broken the Ziarah route thumbnails more than once. Always run the check.

### Root cause, diagnosed 2026-08-21 — read this before debugging blank cards
Symptom: route/journal thumbnails render as blank cream boxes; console shows
404s for the 8 route heroes. The 404 URL is `/ziarah/assets/<file>.webp` —
note the `/ziarah/` — i.e. a RELATIVE path resolved against the subfolder.

Two facts that cost a full session to establish. Do not re-derive them:

1. **The cards are CSS backgrounds, not `<img>`.** In every publish page the
   route/journal/product thumbs are built as
   `background:#EAE3D5 url("${r.image}") center/cover` (see
   publish/ziarah/index.html ~line 576). A CSS background 404 fires NO `error`
   event, so an image-error listener cannot see it. The cream box IS the
   `#EAE3D5` fallback colour. Any fix must handle inline styles, not just imgs.
2. **File-reading tools HTML-escape their output.** `&amp;` and `=&gt;` seen in a
   pasted or tool-read .js file are display artifacts, NOT file contents. Check
   real bytes with run_script + readFile before concluding a file is corrupt.
   (Chased this as a syntax-error theory. It was nothing.)

Diagnostic order that actually works: get the FULL failing URL from DevTools →
Network → Copy link address. Chrome's console prints only the filename, which
makes a subfolder-relative path indistinguishable from a missing file. One URL
identifies the whole problem; everything else is guesswork.

### Safety net: the asset path guard in publish/support.js
The top of `publish/support.js` carries an `asset path guard` that neutralises
this bug class whatever the deployed data files say. It does two things:
- a MutationObserver + DOMContentLoaded sweep rewriting any inline
  `style` containing `url("assets/...` to `url("/assets/...` — this is the one
  that fixes the route thumbnails, because they are CSS backgrounds;
- a capture-phase `error` listener retrying `<img src>`/`<source srcset>`
  root-absolute.
Verified working on all three shapes (static, JS-added, img). Never strip it
when regenerating publish/, and keep it FIRST in the file so it is listening
before any page renders. It is a net, not a licence — the grep check above
still has to pass.

### Dynamic `import()` in publish pages is root-absolute too
Every `publish/**/index.html` loads its data modules as `import("/data/x.js")`,
never `import("./data/x.js")` — same reason as the asset paths, and the asset
guard does NOT cover module specifiers. Source `.dc.html` keeps `./data/x.js`.

When syncing a source change into a publish page, a find-and-replace anchored
on the SOURCE text (`import("./data/…`) silently matches nothing in the publish
copy, because that copy already says `/data/…`. A no-match is a no-op, not an
error, so the line never lands and the feature fails only in production.
This lost the shuttle form's Sheet logging on 2026-09-10: `FORMS` stayed null,
so `submit()` was skipped while the WhatsApp handoff still worked — the form
looked fine and recorded nothing.

Grep both shapes after any sync that touches `componentDidMount`:

    grep -n 'import("\./data' publish   # must return nothing

## Second guard in publish/support.js: hash jumps
Directly after the asset guard sits a `hash jump guard`. Every page renders
client-side, so the browser performs its `#anchor` jump before the target
element exists, finds nothing, and gives up silently — cross-page links like
`/#shuttle` or `/ziarah/#form-ziarah` land at the top of the page instead.
The guard polls for the id, scrolls when it appears, then re-checks for ~0.8s
so a late map or image can't leave the reader mid-section; it also handles
`hashchange`, which the browser no-ops for the same reason.

Like the asset guard: never strip it when regenerating publish/, and keep both
guards ahead of the runtime.

## Every publish page must hide its own <x-dc> template
Each page ships a prerendered static block (`#__pr`) AND the raw `<x-dc>`
template. Nothing hid the template, so between HTML parse and the runtime
mounting, visitors saw the real content followed by a wall of literal
`{{ cartCount }}`, `{{ r.name }}`, `{{ h.name }}`. On throttled mobile that
window is seconds long; a reviewer read it as "site still under construction".

The rule: every publish page carries `<style>x-dc{display:none}</style>` in
`<head>` — unconditional, NOT only inside `<noscript>`. This is safe because
the runtime REMOVES `x-dc` from the DOM once it renders (verified: after mount
there is a `#dc-root` and no `x-dc`), so the rule only bites before mount.

Never add that style to a page without a `#__pr` fallback — hiding the template
with nothing behind it yields a blank page. `keranjang/` had no fallback (cart
contents are per-visitor); it now has a minimal branded "Memuat keranjang…"
placeholder plus the standard handover script.

Audit after regenerating publish/ — must return nothing:

    # any page with {{ holes }} but no x-dc hide rule is exposed

### Query strings must precede the fragment
`/ziarah/#form-ziarah?dest=Sendangsono` is wrong — the `?dest=` becomes part of
the fragment, so the id never matches AND `location.search` is empty. Correct
shape is `/ziarah/?dest=Sendangsono#form-ziarah`. Ziarah's `arriveFromHash()`
reads `?dest=` on mount to prefill the route field; GuaMariaMap builds the URL
by splitting `askHref` at its `#` before appending the param.
