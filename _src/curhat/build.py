#!/usr/bin/env python3
"""Build /curhat/index.html from _src/curhat/ (head.html + body.dc.html).

usage: python3 _src/curhat/build.py        (run from the repo root)

- Header, drawer, footer and chrome()/search() are copied from
  produk/index.html (design system "Header" / "Footer"), like the landing.
- JSON-LD (WebPage + Service with offers + FAQPage) and the static #__pr block
  are generated from the data in body.dc.html (prices, steps, guides, human, faq), so
  what Google reads always matches the page.
"""
import html, json, os, re

ROOT = os.getcwd()
SRC = os.path.join(ROOT, "_src/curhat")
rd = lambda p: open(os.path.join(ROOT, p), encoding="utf-8").read()
head = open(os.path.join(SRC, "head.html"), encoding="utf-8").read()
body = open(os.path.join(SRC, "body.dc.html"), encoding="utf-8").read()
pdp = rd("produk/index.html")

header = re.search(r"  <header.*?</header>\n\n  <div style=\"\{\{ drawerStyle \}\}\">.*?\n  </div>", pdp, re.S).group(0)
footer = re.search(r"  <footer.*?</footer>", pdp, re.S).group(0)
chrome = re.search(r"  chrome\(\) \{.*?\n  \}\n", pdp, re.S).group(0).rstrip("\n")
search = re.search(r"  // Inline expanding header search.*?\n  \}\n", pdp, re.S).group(0).rstrip("\n")
body = (body.replace("%%HEADER%%", header).replace("%%FOOTER%%", footer)
            .replace("%%CHROME%%", chrome).replace("%%SEARCH%%", search))

def arr(name):
    m = re.search(r"\n      %s: \[(.*?)\n      \]" % name, body, re.S).group(1)
    return [dict(re.findall(r'(\w+): "((?:[^"\\]|\\.)*)"', item)) for item in re.findall(r"\{[^{}]*\}", m)]
prices, steps, guides, faq, promises, human = (arr(n) for n in ("prices", "steps", "guides", "faq", "promises", "human"))

URL = "https://peziarah.com/curhat/"
num = lambda p: int(re.sub(r"\D", "", p)) * 1000
ld = [
    {"@context": "https://schema.org", "@type": "Service", "@id": URL + "#service", "name": "Curhat Katolik",
     "serviceType": "Teman curhat lewat WhatsApp", "url": URL, "areaServed": "ID", "availableLanguage": "id",
     "provider": {"@id": "https://peziarah.com/#org"},
     "description": "Curhat lewat WhatsApp dengan admin Peziarah yang dilatih mendengar; bila perlu disambungkan ke romo, psikolog berizin, konselor pernikahan dan keluarga, atau pendamping awam.",
     "hoursAvailable": {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "10:00", "closes": "21:00"},
     "offers": [{"@type": "Offer", "name": f"{p['mode'].title()} {p['dur']}", "price": num(p["price"]), "priceCurrency": "IDR"} for p in prices]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": f["q"], "acceptedAnswer": {"@type": "Answer", "text": f["a"]}} for f in faq]},
]
jsonld = "\n".join('<script type="application/ld+json">%s</script>' % json.dumps(x, ensure_ascii=False, separators=(",", ":")) for x in ld)
head = head.replace("%%JSONLD%%", jsonld)

e = html.escape
H2 = "font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:800;font-size:clamp(22px,3vw,32px);letter-spacing:-0.03em;margin:44px 0 16px"
P = "font-size:17px;line-height:1.6;color:#3A342B;max-width:64ch;margin:0 0 14px"
LI = "font-size:16px;line-height:1.6;color:#3A342B;margin-bottom:8px"
ul = lambda items: '<ul style="margin:0 0 18px;padding-left:20px;max-width:64ch">' + "".join(f'<li style="{LI}">{x}</li>' for x in items) + "</ul>"
WA = "https://wa.me/6281542615445?text=Halo%20Peziarah%2C%20saya%20mau%20curhat."
pr = f'''<div id="__pr" style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;background:#F7F3EA;color:#1A1712;padding:28px 28px 60px;max-width:820px;margin:0 auto">
<span style="font-family:'Cinzel',Georgia,serif;font-weight:600;font-size:19px;letter-spacing:0.16em;display:block;margin-bottom:20px"><a href="/" style="color:inherit;text-decoration:none">PEZIARAH</a></span>
<p style="font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#4A4238;margin:0 0 22px"><a href="/" style="color:inherit">BERANDA</a> › <a href="/tanya/" style="color:inherit">TANYA</a> › CURHAT KATOLIK</p>
<h1 style="font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:800;font-size:clamp(36px,7vw,72px);letter-spacing:-0.045em;line-height:0.92;margin:0 0 20px">Curhat Katolik: didengar, bukan diceramahi.</h1>
<p style="{P}">Tidak harus punya masalah. Kadang cuma perlu ada yang mendengar. Ngobrol lewat WhatsApp dengan admin Peziarah: orang asing yang aman, tanpa ceramah, tanpa menghakimi. Senin–Sabtu 10.00–21.00 WIB.</p>
<p style="{P}"><a href="{WA}" style="color:#6C4BA6">Mulai curhat di WhatsApp →</a></p>
<h2 style="{H2}">Harga per sesi</h2>
{ul([f"{e(p['mode'].title())} {e(p['dur'])} — {e(p['price'])}" for p in prices])}
<p style="{P}">Bayar lewat QRIS atau transfer sebelum sesi. Kalau setelah curhat kamu memilih sesi pendampingan, biaya curhat dipotong dari sesi pertamamu.</p>
<h2 style="{H2}">Cara kerjanya</h2>
{ul([f"<strong>{e(s['title'])}</strong> {e(s['body'])}" for s in steps])}
<h2 style="{H2}">Yang kami janjikan</h2>
{ul([f"<strong>{e(m['title'])}</strong> {e(m['body'])}" for m in promises])}
<p style="{P}">Semua obrolan rahasia. Satu pengecualian: kalau ada nyawa yang terancam, kami akan membantumu mencari pertolongan.</p>
<h2 style="{H2}">Pendampingan, kalau perlu lebih dari didengar</h2>
{ul([f"<strong>{e(g['name'])}</strong> — {e(g['body'])} {e(g['price'])}." for g in guides])}
<p style="{P}">Pengakuan dosa bukan bagian dari layanan ini. Sakramen selalu gratis, di paroki.</p>
<h2 style="{H2}">Bukan untuk keadaan darurat</h2>
<p style="{P}">Kalau kamu atau orang lain sedang dalam bahaya, hubungi 112 atau datang ke IGD terdekat.</p>
<h2 style="{H2}">Orang, bukan mesin</h2>
<p style="{P}">Kamu bisa curhat ke AI kapan saja, gratis. Kadang itu cukup. Tapi ada hal yang hanya bisa dilakukan orang.</p>
{ul([f"<strong>{e(h['title'])}</strong> {e(h['body'])}" for h in human])}
<h2 style="{H2}">Pertanyaan</h2>
{"".join(f'<p style="{P}"><strong>{e(f["q"])}</strong> {e(f["a"])}</p>' for f in faq)}
<p style="{P}">Lebih nyaman tanpa nama? <a href="/tanya/" style="color:#6C4BA6">Tanya Awam</a> tetap gratis dan anonim.</p>
</div>'''

handoff = re.search(r'<script>\n/\* Hands the page over.*?</script>', rd("index.html"), re.S).group(0)
os.makedirs(os.path.join(ROOT, "curhat"), exist_ok=True)
out = head + pr + "\n" + handoff + "\n" + body + "</body>\n</html>\n"
open(os.path.join(ROOT, "curhat/index.html"), "w", encoding="utf-8").write(out)
print("curhat/index.html:", len(out), "bytes ·", len(prices), "prices ·", len(faq), "faq")
