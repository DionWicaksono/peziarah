#!/usr/bin/env python3
"""Build /christian-core/ ("Katolik Yang Mana Kamu?") from _src/christian-core/page.html.

    python3 _src/christian-core/build.py              # site pages + OG images
    python3 _src/christian-core/build.py --preview OUT  # self-contained preview folder (claude.ai artifact)

Writes:
    christian-core/index.html              main page
    christian-core/<slug>/index.html       one share page per persona (same page,
                                           own title / OG card, opens on that persona)
    assets/og/christian-core*.jpg          1200x630 share cards (needs Pillow + the
                                           fonts in _src/christian-core/fonts/)

Data: data/looks.js (personas, quiz, photo spots) and data/products.js (names,
prices, options, buy mode). Both are read with node so the static parts (SEO list,
JSON-LD, OG text) always match what the page shows. Bump V_* below when a data
file changes (.htaccess caches JS for 7 days).
"""
import json, os, re, shutil, subprocess, sys, html

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.dirname(os.path.abspath(__file__))
V_PRODUCTS = "20261113"
V_LOOKS = "20261119"
V_CART = "20261109"
SITE = "https://peziarah.com"
TITLE = "Katolik Yang Mana Kamu? — Lookbook Christian-core | Peziarah"
DESC = ("Tujuh wajah umat paroki yang pasti pernah kamu temui di gereja, atau kamu sendiri. "
        "Ikut kuisnya, lalu belanja tampilannya: hoodie Berkah Dalem, bandana Triquetra, tote Sendangsono, dan lainnya.")


def load_data():
    js = f"""
    const P = await import({json.dumps('file://' + os.path.join(ROOT, 'data/products.js'))});
    const L = await import({json.dumps('file://' + os.path.join(ROOT, 'data/looks.js'))});
    console.log(JSON.stringify({{ products: P.PRODUCTS, lead: P.PREORDER_LEAD,
      modes: Object.fromEntries(P.PRODUCTS.map(p => [p.id, P.buyMode(p)])),
      personas: L.PERSONAS, short: L.SHORT, quiz: L.QUIZ, quizResult: L.quizResult.toString() }}));
    """
    out = subprocess.run(["node", "--input-type=module", "-e", js], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def esc(t):
    return html.escape(t, quote=True)


def head(d, persona=None):
    url = f"{SITE}/christian-core/" + (f"{persona['slug']}/" if persona else "")
    if persona:
        title = f"Aku {persona['name']}. Kamu Katolik yang mana? | Peziarah"
        desc = f"{persona['sub']}. {persona['mood']} Ikut kuisnya dan lihat tampilannya."
        og = f"{SITE}/assets/og/christian-core-{persona['slug']}.jpg"
        alt = f"{persona['name']} — {persona['sub']}"
    else:
        title, desc, og, alt = TITLE, DESC, f"{SITE}/assets/og/christian-core.jpg", "Katolik Yang Mana Kamu? Lookbook Christian-core Peziarah"
    byid = {p["id"]: p for p in d["products"]}
    ids = []
    for x in d["personas"]:
        for a in x.get("angles", []):
            for s in a["spots"]:
                if s["product"] in byid and s["product"] not in ids:
                    ids.append(s["product"])
    itemlist = {"@context": "https://schema.org", "@type": "ItemList", "name": "Barang di lookbook Christian-core",
                "itemListElement": [{"@type": "ListItem", "position": k + 1, "url": f"{SITE}/produk/{i}/", "name": byid[i]["name"]} for k, i in enumerate(ids)]}
    page = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Katolik Yang Mana Kamu?", "description": DESC, "url": f"{SITE}/christian-core/"}
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Beranda", "item": f"{SITE}/"},
        {"@type": "ListItem", "position": 2, "name": "Merch", "item": f"{SITE}/katalog/#merch"},
        {"@type": "ListItem", "position": 3, "name": "Christian-core", "item": f"{SITE}/christian-core/"}]}
    return f"""<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="{SITE}/christian-core/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Peziarah">
<meta property="og:locale" content="id_ID">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{esc(alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{og}">
<meta name="theme-color" content="#F7F3EA">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="modulepreload" href="/data/products.js?v={V_PRODUCTS}">
<link rel="modulepreload" href="/data/looks.js?v={V_LOOKS}">
<link rel="modulepreload" href="/data/cart.js?v={V_CART}">
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':
new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
}})(window,document,'script','dataLayer','GTM-NQS6GCB7');</script>
<!-- End Google Tag Manager -->
<script type="module" src="/data/track.js"></script>
<script type="application/ld+json">{json.dumps(page, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(crumbs, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(itemlist, ensure_ascii=False)}</script>"""


def seo(d, link=""):
    """Static text of the page: read by search engines and shown without JS."""
    byid = {p["id"]: p for p in d["products"]}
    out = ['<section class="sr" id="__pr" aria-label="Isi halaman">',
           "<h2>Katolik Yang Mana Kamu? — tujuh persona umat paroki</h2>"]
    for x in d["personas"]:
        out.append(f"<h3>{esc(x['name'])} — {esc(x['sub'])}</h3><p>{esc(x['mood'])} {esc(x['story'])}</p>")
        ids = []
        for a in x.get("angles", []):
            for s in a["spots"]:
                if s["product"] in byid and s["product"] not in ids:
                    ids.append(s["product"])
        if ids:
            out.append("<ul>" + "".join(f'<li><a href="{link}/produk/{i}/">{esc(byid[i]["name"])}</a> — {esc(byid[i]["price"])}</li>' for i in ids) + "</ul>")
    out.append("</section>")
    return "\n".join(out)


GTM_NOSCRIPT = """<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQS6GCB7"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->"""

SITE_IMPORTS = f"""import {{ PRODUCTS, buyMode, PREORDER_LEAD, ADMIN }} from "/data/products.js?v={V_PRODUCTS}";
import {{ PERSONAS, SHORT, QUIZ, quizResult }} from "/data/looks.js?v={V_LOOKS}";
import * as CART from "/data/cart.js?v={V_CART}";
import {{ track }} from "/data/track.js";
import("/data/verses.js").then(m => {{ const v = document.getElementById("verse"); if (v && m.currentVerse) v.textContent = m.currentVerse(); }}).catch(() => {{}});
const LINK = "";"""


def preview_imports(d):
    prods = json.loads(json.dumps(d["products"]).replace('"/assets/', '"assets/'))
    personas = json.loads(json.dumps(d["personas"]).replace('"/assets/', '"assets/'))
    modes = d["modes"]
    return f"""// PREVIEW BUILD: data inlined from data/products.js + data/looks.js; cart and
// tracking are stand-ins (localStorage + console) so nothing leaves this page.
const PRODUCTS = {json.dumps(prods, ensure_ascii=False)};
const MODES = {json.dumps(modes)};
const buyMode = p => MODES[p.id] || "ready";
const PREORDER_LEAD = {json.dumps(d["lead"])};
const ADMIN = false;
const PERSONAS = {json.dumps(personas, ensure_ascii=False)};
const SHORT = {json.dumps(d["short"], ensure_ascii=False)};
const QUIZ = {json.dumps(d["quiz"], ensure_ascii=False)};
const quizResult = {d["quizResult"].replace("export function", "function")};
const CART = (() => {{
  const K = "peziarah.cart.v1", fns = [];
  const read = () => {{ try {{ const v = JSON.parse(localStorage.getItem(K) || "[]"); return Array.isArray(v) ? v : []; }} catch (e) {{ return []; }} }};
  const write = v => {{ try {{ localStorage.setItem(K, JSON.stringify(v)); }} catch (e) {{}} fns.forEach(f => f(v)); }};
  return {{ count: () => read().reduce((n, i) => n + i.qty, 0),
    add(it) {{ const v = read(), k = it.id + "|" + (it.variant || ""), f = v.find(i => i.id + "|" + (i.variant || "") === k);
      if (f) f.qty++; else v.push({{ ...it, qty: 1 }}); write(v); track("add_to_cart", {{ value: it.unit, items: [{{ item_id: it.id, item_name: it.name, item_variant: it.variant, price: it.unit, quantity: 1 }}] }}); }},
    subscribe(fn) {{ fns.push(fn); }} }};
}})();
function track(name, p) {{ try {{ (window.dataLayer = window.dataLayer || []).push({{ event: "pz_" + name, ...p }}); console.log("[track]", name, p); }} catch (e) {{}} }}
const LINK = "{SITE}";"""


def render(d, template, imports, persona=None, preview=False):
    s = template
    s = s.replace("@@HEAD@@", head(d, persona) if not preview else
                  f"<title>Peziarah · Katolik Yang Mana Kamu? · Pratinjau</title>\n<meta name=\"robots\" content=\"noindex\">")
    start = f'<script>window.PZ_START={json.dumps(persona["slug"])};</script>' if persona else ""
    s = s.replace("@@BODYTOP@@", ("" if preview else GTM_NOSCRIPT) + start)
    s = s.replace("@@DRAFT@@", '<span class="draft">PRATINJAU</span>' if preview else "")
    s = s.replace("@@SEO@@", seo(d, SITE if preview else ""))
    s = s.replace("@@IMPORTS@@", imports)
    if preview:
        s = s.replace('href="/', f'href="{SITE}/')
    else:
        s = s.replace(f'href="{SITE}/', 'href="/')
    return s


# ---------------------------------------------------------------- OG cards
def og_cards(d):
    try:
        from PIL import Image, ImageDraw, ImageFont, ImageChops
    except ImportError:
        print("Pillow missing: OG images skipped"); return
    F = os.path.join(SRC, "fonts")
    f = lambda n, s: ImageFont.truetype(os.path.join(F, n), s)
    PAPER, INK, VIOLET, MUTE = (247, 243, 234), (26, 23, 18), (108, 75, 166), (120, 112, 100)
    os.makedirs(os.path.join(ROOT, "assets/og"), exist_ok=True)

    def wrap(dr, text, font, width):
        words, lines, cur = text.split(), [], ""
        for w in words:
            t = (cur + " " + w).strip()
            if dr.textlength(t, font=font) <= width: cur = t
            else: lines.append(cur); cur = w
        if cur: lines.append(cur)
        return lines

    def figure(img_path, h):
        im = Image.open(img_path).convert("RGB")
        w = round(h * im.width / im.height)
        return im.resize((w, h), Image.LANCZOS)

    def silhouette(h):
        w = round(h * 900 / 1118)
        im = Image.new("RGB", (w, h), (255, 255, 255)); dr = ImageDraw.Draw(im); k = h / 1118
        dr.ellipse([(392 * k, 72 * k), (508 * k, 204 * k)], fill=(238, 233, 224))
        pts = [(372, 230), (528, 230), (596, 262), (624, 310), (640, 560), (616, 592), (600, 592), (578, 360), (572, 610), (574, 1060), (496, 1072), (462, 640), (438, 640), (404, 1072), (326, 1060), (328, 610), (322, 360), (300, 592), (284, 592), (260, 560), (276, 310), (304, 262)]
        dr.polygon([(x * k, y * k) for x, y in pts], fill=(238, 233, 224))
        return im

    def card(slug, name, sub, line, img):
        W, H = 1200, 630
        c = Image.new("RGB", (W, H), PAPER); dr = ImageDraw.Draw(c)
        if img is not None:
            fig = img
            x = W - fig.width - 40; y = H - fig.height + 10
            # multiply onto paper so the white studio background disappears
            region = c.crop((x, y, x + fig.width, y + fig.height))
            c.paste(ImageChops.multiply(region, fig), (x, y))
        lx, maxw = 70, 640
        dr.text((lx, 66), "KATOLIK YANG MANA KAMU?", font=f("SpaceMono.ttf", 22), fill=VIOLET)
        y = 116
        if name:
            dr.text((lx, y), "Aku", font=f("Archivo-800.ttf", 64), fill=INK); y += 76
            for ln in wrap(dr, name + ".", f("Archivo-800i.ttf", 92), maxw)[:2]:
                dr.text((lx, y), ln, font=f("Archivo-800i.ttf", 92), fill=INK); y += 98
            dr.text((lx, y + 6), sub.upper(), font=f("SpaceMono.ttf", 20), fill=MUTE); y += 52
        for ln in wrap(dr, line, f("Archivo-700.ttf", 32), maxw)[:3]:
            dr.text((lx, y), ln, font=f("Archivo-700.ttf", 32), fill=(70, 64, 56)); y += 42
        dr.text((lx, H - 82), "PEZIARAH", font=f("Cinzel-600.ttf", 30), fill=INK)
        dr.text((lx + 200, H - 76), "peziarah.com/christian-core", font=f("SpaceMono.ttf", 20), fill=MUTE)
        c.save(os.path.join(ROOT, f"assets/og/{slug}.jpg"), quality=86)

    for x in d["personas"]:
        a = (x.get("angles") or [None])[0]
        img = figure(os.path.join(ROOT, a["image"].lstrip("/")), 600) if a else silhouette(560)
        card(f"christian-core-{x['slug']}", x["name"], x["sub"], x["mood"] + " Kamu yang mana?", img)
    # main card: the photographed personas side by side
    W, H = 1200, 630
    c = Image.new("RGB", (W, H), PAPER); dr = ImageDraw.Draw(c)
    shots = [x for x in d["personas"] if x.get("angles")]
    centers = [700, 880, 1060][:len(shots)]
    for x, cx in zip(shots, centers):
        fig = figure(os.path.join(ROOT, x["angles"][0]["image"].lstrip("/")), 540)
        px, py = cx - fig.width // 2, H - 540 + 10
        region = c.crop((px, py, px + fig.width, py + fig.height))
        c.paste(ImageChops.multiply(region, fig), (px, py))
    from PIL import ImageFont as IF
    dr.text((70, 66), "LOOKBOOK CHRISTIAN-CORE", font=f("SpaceMono.ttf", 22), fill=VIOLET)
    for k, ln in enumerate(["Katolik", "Yang Mana", "Kamu?"]):
        dr.text((70, 116 + k * 96), ln, font=f("Archivo-800i.ttf" if k == 2 else "Archivo-800.ttf", 88), fill=INK)
    dr.text((70, 440), "Tujuh persona umat paroki.", font=f("Archivo-700.ttf", 32), fill=(70, 64, 56))
    dr.text((70, 482), "Ikut kuisnya.", font=f("Archivo-700.ttf", 32), fill=(70, 64, 56))
    dr.text((70, H - 82), "PEZIARAH", font=f("Cinzel-600.ttf", 30), fill=INK)
    c.save(os.path.join(ROOT, "assets/og/christian-core.jpg"), quality=86)
    print("OG cards written")


def main():
    d = load_data()
    template = open(os.path.join(SRC, "page.html"), encoding="utf-8").read()
    if "--preview" in sys.argv:
        out = sys.argv[sys.argv.index("--preview") + 1]
        os.makedirs(out, exist_ok=True)
        open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(render(d, template, preview_imports(d), preview=True))
        # copy every product image + lookbook photo the preview can show
        files = {p["image"] for p in d["products"] if p.get("image")}
        for p in d["products"]:
            files.update((p.get("opt") or {}).get("shots") or [])
        for x in d["personas"]:
            for a in x.get("angles", []): files.add(a["image"])
        for f in files:
            src = os.path.join(ROOT, f.lstrip("/"))
            if os.path.exists(src):
                dst = os.path.join(out, f.lstrip("/")); os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy(src, dst)
        print("preview ->", out, len(files), "images"); return
    imports = SITE_IMPORTS
    os.makedirs(os.path.join(ROOT, "christian-core"), exist_ok=True)
    open(os.path.join(ROOT, "christian-core/index.html"), "w", encoding="utf-8").write(render(d, template, imports))
    for x in d["personas"]:
        dd = os.path.join(ROOT, "christian-core", x["slug"]); os.makedirs(dd, exist_ok=True)
        open(os.path.join(dd, "index.html"), "w", encoding="utf-8").write(render(d, template, imports, persona=x))
    print("pages: christian-core/ +", len(d["personas"]), "persona pages")
    og_cards(d)


if __name__ == "__main__":
    main()
