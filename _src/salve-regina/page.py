"""Builds /salve-regina/index.html — prerendered. Run from the repo root: python3 _src/salve-regina/page.py .
The footer is copied from /bulan-rosario/index.html so it always matches the rest of the site."""
import html, json, os, re, sys

REPO = sys.argv[1]
B = os.path.dirname(os.path.abspath(__file__))
URL = 'https://peziarah.com/salve-regina/'
e = html.escape

# verses straight from the same file the script uses
src = open(f'{B}/src/verses.ts').read()
blocks = re.findall(r"^  (\w+): \[\n(.*?)\n  \],", src, re.S | re.M)
LABELS = {'mary': 'Maria', 'magnificat': 'Magnificat', 'passion': 'Sengsara'}
PASS = []
for key, body in blocks:
    vs = []
    for m in re.finditer(r"\{ ref: '([^']*)', text: (?:'((?:[^'\\]|\\.)*)'|\"([^\"]*)\") \}", body):
        vs.append((m.group(1), m.group(2) if m.group(2) is not None else m.group(3)))
    PASS.append((key, vs))
assert [k for k, _ in PASS] == ['mary', 'magnificat', 'passion'] and all(len(v) > 5 for _, v in PASS)

TITLE = 'Salve Regina — Maria, Digambar dengan Kitab Suci | Peziarah'
DESC = 'Gambar Bunda Maria yang setiap garisnya adalah ayat Kitab Suci (Douay-Rheims). Gulir untuk membacanya, dari wajah sampai kerudung, lalu Salve Regina.'

ld = [
    {"@context": "https://schema.org", "@type": "VisualArtwork", "@id": URL + "#karya", "name": "Salve Regina — Maria, digambar dengan Kitab Suci",
     "description": DESC, "url": URL, "image": "https://peziarah.com/assets/og-salve-regina.jpg", "artform": "Gambar garis interaktif",
     "inLanguage": "id", "creator": {"@id": "https://peziarah.com/#org"}, "about": {"@type": "Person", "name": "Maria, Bunda Yesus"},
     "isBasedOn": {"@type": "Book", "name": "Douay-Rheims Bible (revisi Challoner)", "inLanguage": "en"}},
    {"@context": "https://schema.org", "@type": "BreadcrumbList", "@id": URL + "#breadcrumb", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://peziarah.com/"},
        {"@type": "ListItem", "position": 2, "name": "Salve Regina", "item": URL}]},
]

CARDS = [
    ('/bulan-rosario/#urutan', '/assets/cara-berdoa-rosario.webp', 'Ilustrasi cara berdoa rosario di atas latar ungu', 'Doa', 'Cara berdoa rosario', 'Urutannya dari Tanda Salib sampai Salam, ya Ratu — doa yang namanya baru saja kamu lihat.', 'Baca urutannya'),
    ('/ziarah/rute/sendangsono/', '/assets/sendangsono-gua.webp', 'Gua Maria Sendangsono dengan lilin dan bunga di depan patung Maria', 'Ziarah', 'Gua Maria Sendangsono', 'Di perbukitan Menoreh. Ada shuttle harian dari Kerkhof Muntilan kalau kamu datang sendiri.', 'Lihat rutenya'),
    ('/jurnal/artikel/devosi-bukan-estetika/', '/assets/ikon-maria-lino.webp', 'Ikon Maria cetak lino', 'Jurnal · Opini', 'Devosi bukan estetika — tapi estetika bukan dosa', 'Soal tuduhan bahwa toko seperti kami menjual iman sebagai gaya hidup. Sebagian tuduhannya benar.', 'Baca tulisannya'),
    ('/katalog/#rosario', '/assets/hero-rosario.webp', 'Rosario kayu sonokeling dengan krusifiks kuningan', 'Toko', 'Rosario buatan tangan', 'Manik sonokeling dan mutiara air tawar, dironce tangan di Muntilan, dicek satu per satu.', 'Lihat rosario'),
]

LATIN = ('Salve, Regina, Mater misericordiae, vita, dulcedo, et spes nostra, salve. Ad te clamamus, exsules filii Hevae. '
         'Ad te suspiramus, gementes et flentes in hac lacrimarum valle. Eia, ergo, advocata nostra, illos tuos misericordes oculos ad nos converte. '
         'Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende. O clemens, O pia, O dulcis Virgo Maria.')

_br = open(f'{REPO}/bulan-rosario/index.html', encoding='utf-8').read()
footer = _br[_br.find('<footer'):_br.find('</footer>') + 9]
footer = footer.replace('{{ verse }}', 'Salve, Regina, Mater misericordiae')
footer = re.sub(r' style-hover="[^"]*"', '', footer)
assert '{{' not in footer

CSS = r"""
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0}
body{background:#F7F3EA;color:#1A1712;font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
a:hover{color:#6C4BA6}
::selection{background:#6C4BA6;color:#F7F3EA}
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}

/* ---------- the drawing ---------- */
.tx-track{position:relative;height:100vh;height:100svh;background:#1A1712;color:#F7F3EA}
.tx-live .tx-track{height:380vh}
.tx-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;overflow:clip;background:#1A1712;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.tx-live .tx-stage{cursor:crosshair}
.tx-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity 1.4s ease}
.tx-stage[data-status=ready] .tx-canvas{opacity:1}
.tx-still{position:absolute;left:50%;top:50%;height:min(92%,96vw);width:auto;max-width:none;transform:translate(-50%,-50%);transition:opacity .8s ease}
.tx-stage[data-status=ready] .tx-still,.tx-stage[data-status=loading] .tx-still{opacity:0}
.tx-top,.tx-log,.tx-head,.tx-aside,.tx-hint,.tx-dock,.tx-final,.tx-loader{position:absolute;z-index:2}
.tx-label{font-family:'Space Mono',ui-monospace,monospace;font-size:11px;line-height:1;letter-spacing:.14em;text-transform:uppercase}

.tx-top{top:0;left:clamp(16px,2.4vw,32px);right:clamp(16px,2.4vw,32px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:clamp(14px,1.8vw,22px) 0 13px;border-bottom:1px solid rgba(247,243,234,.16);color:#A8A092}
.tx-top__c{font-family:'Cinzel',Georgia,serif;font-weight:600;font-size:17px;letter-spacing:.16em;color:#F7F3EA;line-height:1}
.tx-top__c:hover{color:#C9E45B}
.tx-top__r{justify-self:end}

.tx-log{left:clamp(16px,2.4vw,32px);top:78px;margin:0;font:400 10px/1.7 'Space Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(247,243,234,.34);white-space:pre;pointer-events:none;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 40%);mask-image:linear-gradient(to bottom,transparent,#000 40%)}

.tx-head{left:clamp(16px,2.4vw,32px);bottom:clamp(24px,4vw,56px);margin:0;font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:800;font-size:clamp(50px,8.4vw,148px);line-height:.88;letter-spacing:-.045em;color:#F7F3EA;pointer-events:none;text-shadow:0 0 40px rgba(26,23,18,.85)}
.tx-head .ln{display:block;overflow:hidden;padding-bottom:.06em}
.tx-head .li{display:inline-block}
.tx-head em{font-style:normal;color:#C9E45B}

.tx-aside{right:clamp(16px,2.4vw,32px);bottom:clamp(92px,9vw,124px);width:min(300px,40vw);pointer-events:none}
.tx-aside__in{margin:0;font-size:14px;line-height:1.55;color:rgba(247,243,234,.72);text-wrap:pretty}
.tx-aside__how{display:none}
.tx-stage[data-status=ready] .tx-aside__how--mouse{display:inline}
.tx-touch .tx-stage[data-status=ready] .tx-aside__how--mouse{display:none}
.tx-touch .tx-stage[data-status=ready] .tx-aside__how--touch{display:inline}
.tx-stage[data-status=failed] .tx-aside__how--still{display:inline}

.tx-hint{left:50%;bottom:clamp(14px,2vw,24px);transform:translateX(-50%);pointer-events:none;color:#A8A092;display:none}
.tx-live .tx-hint{display:block}
.tx-hint__in{display:block;animation:tx-bob 2.4s ease-in-out infinite}
@keyframes tx-bob{50%{transform:translateY(5px);opacity:.5}}

.tx-dock{right:clamp(16px,2.4vw,32px);bottom:clamp(24px,4vw,56px);display:flex;gap:2px;padding:3px;border:1px solid rgba(247,243,234,.2);border-radius:999px;background:rgba(26,23,18,.7);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);visibility:hidden}
.tx-stage[data-status=ready] .tx-dock{visibility:visible}
.tx-dock button{appearance:none;border:0;background:transparent;color:#A8A092;font:400 11px/1 'Space Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;padding:10px 13px;border-radius:999px;cursor:pointer;transition:background .25s,color .25s}
.tx-dock button:hover{color:#F7F3EA}
.tx-dock button.is-active{background:#C9E45B;color:#1A1712}
.tx-dock button:focus-visible{outline:2px solid #C9E45B;outline-offset:2px}

.tx-final{inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(22px,4vw,64px);opacity:0;pointer-events:none;background:linear-gradient(8deg,rgba(26,23,18,.8) 0%,rgba(26,23,18,.52) 32%,rgba(26,23,18,.34) 62%,rgba(26,23,18,.26) 100%)}
.tx-final__kicker{margin:0 0 16px;color:#C9E45B}
.tx-final__title{margin:0;font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:800;font-size:clamp(54px,10vw,176px);line-height:.88;letter-spacing:-.05em;color:#F7F3EA}
.tx-final__body{margin:18px 0 24px;font-size:16px;line-height:1.55;color:rgba(247,243,234,.78);max-width:44ch}
.tx-final__row{display:flex;flex-wrap:wrap;gap:12px}
.btn{display:inline-flex;align-items:center;gap:8px;font-family:'Hanken Grotesk',system-ui,sans-serif;font-weight:600;font-size:15px;line-height:1.2;border-radius:999px;padding:15px 29px;border:1px solid transparent;cursor:pointer;transition:background .18s,color .18s;background:none}
.btn--lime{background:#C9E45B;color:#1A1712}
.btn--lime:hover{background:#F7F3EA;color:#1A1712}
.btn--ghost{border-color:rgba(247,243,234,.45);color:#F7F3EA}
.btn--ghost:hover{background:rgba(247,243,234,.14);color:#F7F3EA}
.btn:focus-visible{outline:2px solid #C9E45B;outline-offset:3px}

.tx-loader{inset:0;display:none;place-items:center;color:#A8A092}
.tx-stage[data-status=loading] .tx-loader{display:grid}

/* ---------- after the drawing ---------- */
.sr{max-width:1280px;margin:0 auto;padding:clamp(56px,8vw,104px) 28px clamp(46px,7vw,92px)}
.sr-hair{height:1px;background:#D6CBB8;margin-bottom:22px}
.sr-eyebrow{display:flex;align-items:center;gap:10px;color:#8A8172;margin-bottom:22px}
.sr-dot{width:8px;height:8px;border-radius:999px;background:#6C4BA6;flex:none}
.sr-intro{display:flex;flex-wrap:wrap;gap:28px 56px;margin-bottom:clamp(36px,5vw,56px)}
.sr-intro__l{flex:1 1 420px;min-width:280px}
.sr-h2{margin:0;font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:800;font-size:clamp(34px,5vw,64px);line-height:.92;letter-spacing:-.04em;max-width:16ch;text-wrap:balance}
.sr-deck{margin:22px 0 0;font-size:18px;line-height:1.62;color:#4A4238;max-width:52ch;text-wrap:pretty}
.sr-latin{flex:1 1 300px;min-width:260px;max-width:440px;align-self:flex-end;border-left:1px solid #D6CBB8;padding-left:22px}
.sr-latin p{margin:12px 0 0;font-family:'Cinzel',Georgia,serif;font-weight:500;font-size:15px;line-height:1.75;letter-spacing:.02em;color:#3A342B}
.sr-latin .tx-label{color:#6C4BA6}

.sr-grid{display:flex;flex-wrap:wrap;gap:20px}
.sr-card{flex:1 1 260px;min-width:250px;display:flex;flex-direction:column;border-radius:26px;overflow:hidden;border:1px solid #E7DFD1;background:#F7F3EA;color:#1A1712;transition:border-color .2s}
.sr-card:hover{color:#1A1712;border-color:#D6CBB8}
.sr-card:hover .sr-link{color:#6C4BA6}
.sr-card__media{aspect-ratio:4/3;background:#EAE3D5;overflow:hidden}
.sr-card__media img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.sr-card:hover .sr-card__media img{transform:scale(1.03)}
.sr-card__body{padding:22px;display:flex;flex-direction:column;gap:12px;flex:1}
.sr-card__eyebrow{color:#8A8172;font-size:10px}
.sr-card__title{font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:700;font-size:22px;line-height:.98;letter-spacing:-.03em;text-wrap:balance}
.sr-card__deck{margin:0;font-size:15px;line-height:1.58;color:#5B5347;text-wrap:pretty;flex:1}
.sr-link{align-self:flex-start;font-family:'Space Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #6C4BA6;padding-bottom:3px}

.rise-on [data-rise]{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
.rise-on [data-rise].is-in{opacity:1;transform:none}
.rise-on .sr-grid [data-rise]:nth-child(2){transition-delay:.08s}
.rise-on .sr-grid [data-rise]:nth-child(3){transition-delay:.16s}
.rise-on .sr-grid [data-rise]:nth-child(4){transition-delay:.24s}

.sr-closer{margin-top:clamp(40px,6vw,72px);background:#EDE6D8;border:1px solid #D6CBB8;border-radius:28px;padding:28px}
.sr-closer summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:space-between}
.sr-closer summary::-webkit-details-marker{display:none}
.sr-closer__t{display:flex;flex-direction:column;gap:10px}
.sr-closer__t .tx-label{color:#6C4BA6;font-size:10px}
.sr-closer__h{font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:700;font-size:26px;line-height:.98;letter-spacing:-.03em}
.sr-closer__d{font-size:15px;line-height:1.58;color:#4A4238;max-width:52ch;margin:0}
.sr-plus{font-family:'Space Mono',monospace;font-size:22px;color:#6C4BA6;transition:transform .2s}
.sr-closer[open] .sr-plus{transform:rotate(45deg)}
.sr-verses{display:flex;flex-wrap:wrap;gap:28px 40px;margin-top:28px;padding-top:24px;border-top:1px solid #D6CBB8}
.sr-verses section{flex:1 1 300px;min-width:260px}
.sr-verses h3{margin:0 0 14px;font-family:'Archivo',Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;letter-spacing:-.03em}
.sr-verses dl{margin:0}
.sr-verses dt{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#6C4BA6;margin-top:14px}
.sr-verses dd{margin:5px 0 0;font-size:15px;line-height:1.6;color:#3A342B}
.sr-credit{margin:24px 0 0;color:#5B5347;font-size:14px;line-height:1.55;max-width:64ch}

footer a{color:inherit}

@media (max-width:700px){
  .tx-top{grid-template-columns:1fr auto}
  .tx-top>span:first-child{display:none}
  .tx-top__c{justify-self:start}
  .tx-log{top:62px;font-size:9px;max-height:30vh;overflow:hidden}
  .tx-head{bottom:196px;font-size:clamp(44px,13.5vw,76px)}
  .tx-aside{left:16px;right:16px;width:auto;bottom:76px}
  .tx-aside__in{font-size:13px}
  .tx-dock{left:16px;right:auto;bottom:20px}
  .tx-dock button{padding:9px 11px}
  .tx-hint{display:none!important}
  .tx-still{height:auto;width:118vw}
}
@media (prefers-reduced-motion:reduce){
  .tx-hint__in{animation:none}
  .tx-canvas,.tx-still{transition:none}
  .rise-on [data-rise]{opacity:1;transform:none;transition:none}
}
"""

def a(path):  # asset / page path
    return path

def build(preview=False):
    def P(path):
        if not preview:
            return path
        if path.startswith('/salve-regina/'):
            return path[len('/salve-regina/'):]
        if path.startswith('/assets/'):
            return 'assets/' + path[len('/assets/'):]
        if path.startswith('/'):
            return 'https://peziarah.com' + path
        return path

    dock = ''.join(
        f'<button type="button" role="radio" data-passage="{k}" data-label="{e(LABELS[k])}" aria-checked="{"true" if k == "mary" else "false"}"'
        f'{" class=\"is-active\"" if k == "mary" else ""}>{e(LABELS[k])}</button>' for k, _ in PASS)

    cards = ''.join(f'''
      <a class="sr-card" href="{P(href)}" data-rise>
        <div class="sr-card__media"><img src="{P(img)}" alt="{e(alt)}" loading="lazy" decoding="async"></div>
        <div class="sr-card__body">
          <span class="tx-label sr-card__eyebrow">{e(eb)}</span>
          <span class="sr-card__title">{e(title)}</span>
          <p class="sr-card__deck">{e(deck)}</p>
          <span class="sr-link">{e(link)} →</span>
        </div>
      </a>''' for href, img, alt, eb, title, deck, link in CARDS)

    verses = ''.join(
        f'<section><h3>{e(LABELS[k])}</h3><dl>' + ''.join(f'<dt>{e(ref)}</dt><dd>{e(t)}</dd>' for ref, t in vs) + '</dl></section>'
        for k, vs in PASS)

    gtm_head = '' if preview else """<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NQS6GCB7');</script>
"""
    gtm_body = '' if preview else """<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQS6GCB7"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
"""
    track = '' if preview else '<script type="module" src="/data/track.js"></script>\n'
    foot = footer
    if preview:
        foot = re.sub(r'href="(/[^"]*)"', lambda m: f'href="{P(m.group(1))}"', foot)

    return f'''<!DOCTYPE html>
<html lang="id" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(TITLE)}</title>
<meta name="description" content="{e(DESC)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="{URL}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Peziarah">
<meta property="og:locale" content="id_ID">
<meta property="og:title" content="Salve Regina — Maria, Digambar dengan Kitab Suci">
<meta property="og:description" content="{e(DESC)}">
<meta property="og:url" content="{URL}">
<meta property="og:image" content="https://peziarah.com/assets/og-salve-regina.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Salve Regina — gambar garis Bunda Maria karya Peziarah">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Salve Regina — Maria, Digambar dengan Kitab Suci">
<meta name="twitter:description" content="{e(DESC)}">
<meta name="twitter:image" content="https://peziarah.com/assets/og-salve-regina.jpg">
<meta name="theme-color" content="#1A1712">
<link rel="icon" href="{P('/assets/favicon.png')}" type="image/png">
{''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False, separators=(",", ":"))}</script>' + chr(10) for x in ld)}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Cinzel:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="preload" href="{P('/salve-regina/maria.jpg')}" as="image">
<script>(function(d){{d.className=d.className.replace('no-js','js');try{{var c=document.createElement('canvas');if(c.getContext('webgl2')||c.getContext('webgl'))d.className+=' tx-live'}}catch(e){{}}}})(document.documentElement);</script>
{gtm_head}<script defer src="{P('/salve-regina/salve-regina.js')}{'' if preview else '?v=20261105'}"></script>
{track}<style>{CSS}</style>
</head>
<body>
{gtm_body}<main>
  <section class="tx-track" aria-label="Maria, digambar dengan Kitab Suci">
    <div class="tx-stage" data-status="static" data-drawing="{P('/salve-regina/maria.jpg')}">
      <img class="tx-still" src="{P('/salve-regina/maria.webp')}" alt="Gambar garis Bunda Maria dari samping, menunduk dan berkerudung. Gambar: Peziarah." width="1254" height="1254" fetchpriority="high">
      <canvas class="tx-canvas" aria-hidden="true"></canvas>

      <header class="tx-top">
        <span class="tx-label">Salve Regina</span>
        <a class="tx-top__c" href="{P('/')}" aria-label="Peziarah — beranda">PEZIARAH</a>
        <span class="tx-label tx-top__r">Douay-Rheims · <span data-tx-status>Maria</span></span>
      </header>

      <pre class="tx-log" aria-hidden="true"></pre>

      <h1 class="tx-head">
        <span class="ln"><span class="li">Setiap garis</span></span>
        <span class="ln"><span class="li"><em>adalah ayat.</em></span></span>
      </h1>

      <div class="tx-aside">
        <p class="tx-aside__in">Maria, digambar seluruhnya dengan Kitab Suci. Setiap garis wajah dan kerudungnya adalah ayat dari terjemahan Katolik Douay-Rheims, disusun langsung di layarmu.
          <span class="tx-aside__how tx-aside__how--mouse">Arahkan kursor untuk melihat gambar aslinya.</span><span class="tx-aside__how tx-aside__how--touch">Sentuh dan tahan untuk melihat gambar aslinya.</span><span class="tx-aside__how tx-aside__how--still">Browsermu tidak bisa menampilkan versi hidupnya, jadi ini gambar diamnya. Ayat-ayatnya ada di bawah.</span>
        </p>
      </div>

      <div class="tx-hint" aria-hidden="true"><span class="tx-label tx-hint__in">Gulir untuk membaca</span></div>

      <div class="tx-dock" role="radiogroup" aria-label="Pilih rangkaian ayat">{dock}</div>

      <div class="tx-final">
        <p class="tx-label tx-final__kicker">Semua ayat terbaca</p>
        <h2 class="tx-final__title">Salve Regina.</h2>
        <p class="tx-final__body">Setiap garis yang tadi kamu lihat adalah Kitab Suci.</p>
        <div class="tx-final__row">
          <a class="btn btn--lime" href="#lanjut" data-tx-next>Lanjutkan <span aria-hidden="true">↓</span></a>
          <button type="button" class="btn btn--ghost" data-tx-replay>Ulangi dari awal <span aria-hidden="true">↑</span></button>
        </div>
      </div>

      <div class="tx-loader tx-label" role="status">Menyiapkan gambar…</div>
    </div>
  </section>

  <section class="sr" id="lanjut" aria-labelledby="lanjut-h">
    <div class="sr-hair"></div>
    <div class="sr-eyebrow"><span class="sr-dot"></span><span class="tx-label">Salam, ya Ratu</span></div>
    <div class="sr-intro">
      <div class="sr-intro__l" data-rise>
        <h2 class="sr-h2" id="lanjut-h">Doa ini biasanya menutup rosario.</h2>
        <p class="sr-deck">Salve Regina — di sini kita mendoakannya sebagai Salam, ya Ratu — adalah doa terakhir sebelum rosario selesai. Kalau kamu ingin meneruskan, ini beberapa jalan. Kalau cukup sampai di sini, itu juga tidak apa-apa.</p>
      </div>
      <div class="sr-latin" data-rise>
        <span class="tx-label">Antifon Maria · Latin</span>
        <p lang="la">{e(LATIN)}</p>
      </div>
    </div>

    <div class="sr-grid">{cards}
    </div>

    <details class="sr-closer" data-rise>
      <summary>
        <span class="sr-closer__t">
          <span class="tx-label">Ayat dalam gambar</span>
          <span class="sr-closer__h">Baca semua ayatnya.</span>
          <span class="sr-closer__d">{sum(len(v) for _, v in PASS)} ayat dalam tiga rangkaian: Maria, Magnificat dan Sengsara. Terjemahan Douay-Rheims revisi Challoner, terjemahan Katolik berbahasa Inggris yang sudah menjadi domain publik.</span>
        </span>
        <span class="sr-plus" aria-hidden="true">+</span>
      </summary>
      <div class="sr-verses">{verses}</div>
      <p class="sr-credit">Gambar Maria dibuat oleh Peziarah. Garis-garisnya ditelusuri satu per satu, lalu setiap garis diisi ayat, huruf demi huruf, mengikuti lengkungnya.</p>
    </details>
  </section>
</main>
{foot}
<script>setTimeout(function(){{var s=document.querySelector('.tx-stage');if(s&&s.getAttribute('data-status')==='static')document.documentElement.className=document.documentElement.className.replace(' tx-live','')}},6000);</script>
</body>
</html>
'''

if __name__ == '__main__':
    if '--preview' in sys.argv:
        out = sys.argv[sys.argv.index('--preview') + 1]
        open(f'{out}/index.html', 'w').write(build(True))
    else:
        open(f'{REPO}/salve-regina/index.html', 'w').write(build(False))
    print('verses', [(k, len(v)) for k, v in PASS])
