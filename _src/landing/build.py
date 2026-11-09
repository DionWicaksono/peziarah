#!/usr/bin/env python3
"""Build /index.html (the landing page) from body.dc.html + the data files.

usage: python3 _src/landing/build.py        (run from the repo root)

- The <head> (meta, OG, JSON-LD, GTM) is HEAD below. Edit it here, not in
  index.html.
- The header and footer markup + chrome()/search() logic are copied from
  produk/index.html (header) and the shared footer, i.e. the design system's
  "Header" and "Footer" components, so the landing never drifts from the rest
  of the site.
- The static #__pr block (what search engines and no-JS visitors read) is
  generated from data/products.js, data/routes.js and data/journal.js with the
  same picks as the live page (FEATURED / ROUTE_IDS / POST_SKIP in body.dc.html).
"""
import html, json, os, re, subprocess

ROOT = os.getcwd()
SRC = os.path.join(ROOT, "_src/landing")
rd = lambda p: open(os.path.join(ROOT, p), encoding="utf-8").read()

body = open(os.path.join(SRC, "body.dc.html"), encoding="utf-8").read()
pdp = rd("produk/index.html")
old = rd("index.html")

# --- shared chrome from the product page template (design system "Header")
chrome = re.search(r"  chrome\(\) \{.*?\n  \}\n", pdp, re.S).group(0).rstrip("\n")
search = re.search(r"  // Inline expanding header search.*?\n  \}\n", pdp, re.S).group(0).rstrip("\n")
footer = re.search(r"  <footer.*?</footer>", pdp, re.S).group(0)
body = body.replace("%%CHROME%%", chrome).replace("%%SEARCH%%", search).replace("%%FOOTER%%", footer)

pick = lambda name: json.loads(re.search(r"const %s = (\[.*?\]);" % name, body).group(1).replace("'", '"'))
FEATURED, ROUTE_IDS, POST_SKIP = pick("FEATURED"), pick("ROUTE_IDS"), pick("POST_SKIP")

data = json.loads(subprocess.run(["node", "--input-type=module", "-e", """
import * as p from '%(r)s/data/products.js';
import * as r from '%(r)s/data/routes.js';
import * as j from '%(r)s/data/journal.js';
const lab = p.statusLabel || (x => x.status || 'SEGERA'), mode = p.buyMode || (() => 'ready');
console.log(JSON.stringify({
  products: p.PRODUCTS.map(x => ({ id: x.id, name: x.name, price: x.price, cat: x.cat, label: lab(x), mode: mode(x) })),
  cats: p.CATEGORIES.filter(c => !c.parent).map(c => ({ id: c.id, name: c.name })),
  routes: r.ROUTES.filter(x => x.id !== 'custom').map(x => ({ id: x.id, name: x.name, region: x.region, note: x.note, durasi: x.durasi })),
  posts: j.POSTS.filter(x => x.title && x.image && !String(x.id).startsWith('ugc-')).map(x => ({ id: x.id, title: x.title, date: x.date }))
}));""" % {"r": ROOT}], capture_output=True, text=True, check=True).stdout)

BULAN = dict(zip("januari februari maret april mei juni juli agustus september oktober november desember".split(), range(1, 13)))
def when(d):
    x = (d or "").lower().split()
    return (int(x[2]), BULAN.get(x[1], 0), int(x[0])) if len(x) == 3 else (0, 0, 0)

P = {x["id"]: x for x in data["products"]}
catname = {c["id"]: c["name"] for c in data["cats"]}
featured = [P[i] for i in FEATURED if i in P and P[i]["mode"] in ("ready", "preorder")]
routes = [r for i in ROUTE_IDS for r in data["routes"] if r["id"] == i]
posts = sorted([p for p in data["posts"] if p["id"] not in POST_SKIP], key=lambda p: when(p["date"]), reverse=True)[:3]
used = {x["cat"] for x in data["products"]}
NP, NC, NR = len(data["products"]), len([c for c in data["cats"] if c["id"] in used]), len(data["routes"])

e = html.escape
H2 = "font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:800;font-size:clamp(24px,3.4vw,38px);letter-spacing:-0.03em;margin:44px 0 18px"
UL = "list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px 26px"
LI = "border-top:1px solid #E0D8C8;padding-top:10px"
def li(href, title, sub):
    return (f'<li style="{LI}"><a href="{href}" style="color:inherit;text-decoration:none">'
            f'<span style="font-weight:600;font-size:15px;line-height:1.3;display:block">{e(title)}</span>'
            f'<span style="font-family:\'Space Mono\',monospace;font-size:11px;color:#6E6559;display:block;margin-top:3px">{e(sub)}</span></a></li>')
P_ = "font-size:17px;line-height:1.55;color:#5B5347;max-width:56ch;margin:0 0 18px"
pr = f'''<div id="__pr" style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;background:#F7F3EA;color:#1A1712;padding:28px 28px 60px;max-width:1180px;margin:0 auto">
<span style="font-family:'Cinzel',Georgia,serif;font-weight:600;font-size:19px;letter-spacing:0.16em;display:block;margin-bottom:28px"><a href="/" style="color:inherit;text-decoration:none">PEZIARAH</a></span>
<p style="font-family:'Space Mono',monospace;font-size:12px;letter-spacing:0.14em;color:#6C4BA6;margin:0 0 14px">OPERATOR ZIARAH · TOKO ROHANI · JURNAL — MUNTILAN</p>
<h1 style="font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:800;font-size:clamp(38px,7vw,86px);letter-spacing:-0.045em;line-height:0.9;margin:0 0 22px;max-width:13ch">Ziarah yang kami jalani sendiri.</h1>
<p style="font-size:18px;line-height:1.55;color:#3A342B;max-width:52ch;margin:0 0 22px">Rute ke Gua Maria dan gereja tua di Jawa, barang rohani dari pengrajin yang kami sebut namanya, dan bacaan untuk minggu depan. Dikerjakan satu tim, dari Muntilan.</p>
<p style="margin:0 0 8px"><a href="/ziarah/" style="color:#1A1712">Susun ziarah →</a> · <a href="/katalog/" style="color:#1A1712">Belanja katalog →</a> · <a href="https://wa.me/6281542615445" style="color:#1A1712">Tanya CS di WhatsApp →</a></p>
<h2 style="{H2}">Rute yang sudah kami tempuh.</h2>
<p style="{P_}">Kami tidak menjual paket yang belum pernah kami jalani. Tiap rute punya catatan jam paling tenang, medan, dan akses kursi roda. {NR} rute, rombongan paroki atau grup kecil 2–8 orang.</p>
<ul style="{UL}">{"".join(li(f"/ziarah/rute/{r['id']}/", r["name"], f"{r['region']} · {r['durasi']}") for r in routes)}{li("/ziarah/#rute", "Semua rute", f"{NR} RUTE")}{li("/ziarah/grup-kecil/", "Grup kecil 2–8 orang", "MOBIL · JADWAL LONGGAR")}</ul>
<h2 style="{H2}">Shuttle Kerkhof Muntilan – Sendangsono: segera hadir.</h2>
<p style="{P_}">Belum beroperasi. Rencananya Rp 45K per orang pulang-pergi, empat trip tiap hari, 14 kursi per trip. <a href="/jurnal/artikel/shuttle-kerkhof-sendangsono/" style="color:#1A1712">Baca rencananya →</a></p>
<h2 style="{H2}">Dibuat untuk dipakai, bukan dipajang.</h2>
<p style="{P_}">{NP} produk dalam {NC} kategori, batch kecil dari pengrajin di Ungaran, Jogja, Sumba, dan Ende. Barang bertanda PRE-ORDER dibuat setelah kamu pesan: 10–14 hari kerja, lalu dikirim.</p>
<ul style="{UL}">{"".join(li(f"/produk/{p['id']}/", p["name"], f"{p['price']} · {p['label']}") for p in featured)}{li("/katalog/", "Buka katalog lengkap", f"{NP} PRODUK")}</ul>
<h2 style="{H2}">Kado untuk momen yang nggak terulang.</h2>
<ul style="{UL}">{li("/hampers/", "Hampers Komuni Pertama, Krisma, Penghiburan", "HAMPERS")}{li("/hampers/pernikahan/", "Hampers pernikahan", "HAMPERS")}</ul>
<h2 style="{H2}">Bacaan untuk minggu depan.</h2>
<ul style="{UL}">{"".join(li(f"/jurnal/artikel/{p['id']}/", p["title"], "OPINI · " + p["date"].upper()) for p in posts)}{li("/jurnal/", "Semua tulisan Jurnal", "JURNAL")}</ul>
<h2 style="{H2}">Kami baru mulai tahun ini.</h2>
<p style="{P_}">Belum ada ulasan publik untuk ditampilkan. Dijawab orang, bukan bot: Senin–Sabtu 08.00–20.00 WIB lewat WhatsApp. Transfer, QRIS, atau COD. Salah ukuran boleh tukar sekali, gratis, dalam 14 hari.</p>
</div>'''

handoff = re.search(r'<script>\n/\* Hands the page over.*?</script>', old, re.S).group(0)
head = re.search(r"(<!DOCTYPE html>.*?<body>.*?<!-- End Google Tag Manager \(noscript\) -->)", open(os.path.join(SRC, "head.html"), encoding="utf-8").read(), re.S).group(1)
out = head + "\n" + pr + "\n" + handoff + "\n" + body
open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(out)
print("index.html:", len(out), "bytes ·", len(featured), "products ·", len(routes), "routes ·", len(posts), "posts")
