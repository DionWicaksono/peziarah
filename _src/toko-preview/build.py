#!/usr/bin/env python3
"""Build the claude.ai artifact preview of the shop (katalog, product pages,
keranjang, Essentials, Bulan Rosario) from the live files.

usage: python3 _src/toko-preview/build.py <out-dir>      (run from the repo root)

Same pages, runtime and data, with these changes:
  - every page is a flat file (katalog.html, produk-<id>.html, ...) and all
    /assets/, /data/, /support.js paths are relative, because an artifact is
    served from its own folder;
  - links to pages not in the preview go to https://peziarah.com;
  - forms.js and invoice.js are stubs: the cart can be filled and checked,
    but no order is ever sent to Google Forms / Sheets / Drive;
  - a PRATINJAU bar sits at the top of every page, linking back to index.html.
Publish every file in <out-dir> as one multi-file artifact.
"""
import json, os, re, shutil, subprocess, sys

ROOT = os.getcwd()
OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/toko-preview"
if os.path.exists(OUT): shutil.rmtree(OUT)
os.makedirs(os.path.join(OUT, "data")); os.makedirs(os.path.join(OUT, "assets"))

dump = subprocess.run(["node", "--input-type=module", "-e", """
import * as m from '%s/data/products.js';
console.log(JSON.stringify(m.PRODUCTS.map(p => ({ id: p.id, name: p.name, price: p.price, mode: m.buyMode(p), label: m.statusLabel(p), image: p.image }))));
""" % ROOT], capture_output=True, text=True, check=True).stdout
PRODUCTS = json.loads(dump)
IDS = {p["id"] for p in PRODUCTS}
PAGES = {"katalog": "katalog/index.html", "keranjang": "keranjang/index.html",
         "essentials": "essentials/index.html", "bulan-rosario": "bulan-rosario/index.html"}

def rel_assets(s):
    return re.sub(r'(["\'(\s,\[])/assets/', r'\1assets/', s)

def links(s):
    s = re.sub(r'import\("/data/([a-z-]+\.js)(\?v=\d+)?"\)', r'import(new URL("data/\1", document.baseURI).href)', s)
    s = re.sub(r'(src|href)="/(support\.js|data/[a-z-]+\.js)(\?v=\d+)?"', r'\1="\2"', s)
    s = re.sub(r'/produk/\$\{([^}]+)\}/(\$\{[^}]*\})?', r'produk-${\1}.html', s)
    def href(m):
        path = m.group(2)
        pid = re.fullmatch(r'/produk/([a-z0-9-]+)/(\?[^#]*)?', path)
        if pid and pid.group(1) in IDS: return m.group(1) + f'produk-{pid.group(1)}.html' + '"'
        base, _, frag = path.partition("#")
        name = base.strip("/")
        if name == "": return m.group(1) + "index.html" + '"'
        if name in PAGES: return m.group(1) + f"{name}.html" + (f"#{frag}" if frag else "") + '"'
        return m.group(1) + "https://peziarah.com" + path + '" target="_blank" rel="noopener' + '"'
    s = re.sub(r'(href=")(/[^"]*)"', href, s)
    return s

BAR = ('<div style="position:sticky;top:0;z-index:999;padding:8px 16px;background:#1A1712;color:#F7F3EA;'
       'font:13px/1.5 Helvetica,Arial,sans-serif"><span style="font-family:\'Space Mono\',monospace;letter-spacing:0.12em;'
       'color:#C9E45B">PRATINJAU</span> · Toko Peziarah, perubahan 9 Nov 2026. Pesanan tidak dikirim ke mana pun. '
       '<a href="index.html" style="color:#C9E45B">← daftar halaman</a></div>')

def page(src, out, pid=None):
    s = open(os.path.join(ROOT, src), encoding="utf-8").read()
    s = s.replace("<title>", "<title>Pratinjau · ", 1)
    s = links(rel_assets(s))
    if pid:
        s, n = re.subn(r'const fromPath = \(location\.pathname\.match\([^;]*;', f'const fromPath = "{pid}";', s)
        assert n == 1, pid
    s = re.sub(r"<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->\n", "", s, flags=re.S)
    s = re.sub(r"<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->\n", "", s, flags=re.S)
    s = s.replace("<body>", "<body>\n" + BAR, 1)
    open(os.path.join(OUT, out), "w", encoding="utf-8").write(s)
    return s

html = []
for name, src in PAGES.items(): html.append(page(src, f"{name}.html"))
for p in PRODUCTS: html.append(page(f"produk/{p['id']}/index.html", f"produk-{p['id']}.html", p["id"]))

# data
sup = open(os.path.join(ROOT, "support.js"), encoding="utf-8").read()
# The asset path guard rewrites relative assets/ to /assets/ (site root) —
# wrong inside an artifact folder. Turn it off for the preview.
a1 = "  var RX = /url\\((['\"]?)assets\\//g;"
assert sup.count(a1) == 1, "asset guard RX"
sup = sup.replace(a1, "  var RX = /$^/g; // PREVIEW: guard off").replace('if (!raw || i === -1 || raw.charAt(0) === "/") return;', 'return; // PREVIEW: guard off', 1)
open(os.path.join(OUT, "support.js"), "w", encoding="utf-8").write(sup)
for f in ("products.js", "cart.js", "track.js", "verses.js", "essentials.js"):
    s = rel_assets(open(os.path.join(ROOT, "data", f), encoding="utf-8").read())
    s = s.replace('import("/data/products.js")', 'import(new URL("data/products.js", document.baseURI).href)')
    open(os.path.join(OUT, "data", f), "w", encoding="utf-8").write(s)
    html.append(s)
open(os.path.join(OUT, "data/forms.js"), "w").write(
    "// PREVIEW stub: nothing is sent.\nexport function getArchive() { return []; }\n"
    "export function hasEndpoint() { return false; }\nexport function submit() { return Promise.resolve(\"no-endpoint\"); }\n")
open(os.path.join(OUT, "data/invoice.js"), "w").write(
    "// PREVIEW stub: no PDF, nothing uploaded.\nexport const DRIVE_URL = \"\";\nexport function sendGa() {}\n"
    "export async function downloadInvoice() {}\nexport function invoiceNumber() { return \"PRATINJAU\"; }\n")

# hub
G = {"wa": "Checkout ditutup — pesan via WhatsApp", "preorder": "Pre-order", "sold": "Terjual", "ready": "Lainnya (tidak berubah)"}
rows = ""
for mode in ("wa", "preorder", "sold", "ready"):
    items = "".join(f'<li><a href="produk-{p["id"]}.html">{p["name"]}</a> <span>{p["price"]} · {p["label"]}</span></li>' for p in PRODUCTS if p["mode"] == mode)
    rows += f'<h2>{G[mode]}</h2><ul>{items}</ul>'
hub = f"""<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toko Peziarah · Pratinjau</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Hanken+Grotesk:wght@400;600&family=Space+Mono&display=swap" rel="stylesheet">
<style>body{{margin:0;background:#F7F3EA;color:#1A1712;font-family:'Hanken Grotesk',Helvetica,sans-serif}}main{{max-width:960px;margin:0 auto;padding:36px 24px 80px}}
h1{{font-family:Archivo,sans-serif;font-weight:800;font-size:clamp(32px,6vw,56px);letter-spacing:-0.04em;margin:0 0 10px}}
h2{{font-family:Archivo,sans-serif;font-size:22px;letter-spacing:-0.02em;margin:38px 0 10px}}p{{color:#5B5347;line-height:1.6;max-width:60ch}}
ul{{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:0 24px}}
li{{border-top:1px solid #E0D8C8;padding:10px 0}}li span{{display:block;font-family:'Space Mono',monospace;font-size:11px;color:#8A8172;margin-top:2px}}
a{{color:#1A1712;font-weight:600;text-decoration:none}}a:hover{{color:#6C4BA6}}.pages a{{display:inline-block;margin:0 10px 10px 0;padding:10px 18px;border:1px solid #1A1712;border-radius:999px}}
.k{{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:0.14em;color:#6C4BA6}}</style></head>
<body><main><span class="k">PRATINJAU · 9 NOVEMBER 2026</span><h1>Toko Peziarah</h1>
<p>Halaman asli dari paket upload, bisa diklik. Keranjang berfungsi di browser ini, tapi pesanan tidak dikirim ke Sheet, Drive, atau WhatsApp otomatis. Video produk, gambar share, dan unduhan tidak tampil di pratinjau.</p>
<div class="pages"><a href="katalog.html">Katalog</a><a href="bulan-rosario.html#urutan">Bulan Rosario · cara berdoa</a><a href="essentials.html">Peziarah Essentials</a><a href="keranjang.html">Keranjang</a></div>
{rows}</main></body></html>"""
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(hub)

# assets actually referenced
refs = set()
for s in html: refs |= set(re.findall(r'assets/[A-Za-z0-9_./-]+\.(?:webp|jpg|jpeg|svg|gif)', s))
n = 0
for r in sorted(refs):
    src = os.path.join(ROOT, r)
    if os.path.exists(src) and not r.startswith(("assets/og/", "assets/meta/")):
        os.makedirs(os.path.dirname(os.path.join(OUT, r)), exist_ok=True)
        shutil.copy(src, os.path.join(OUT, r)); n += 1
print("preview built in", OUT, "·", len(os.listdir(OUT)), "top-level,", n, "images")
