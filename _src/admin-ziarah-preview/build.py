#!/usr/bin/env python3
"""Build the claude.ai artifact preview of /admin/ziarah/ from the live page.

usage: python3 _src/admin-ziarah-preview/build.py <out-dir>      (run from the repo root)

The preview is the same page, runtime and data files, with three changes:
  - nothing is sent: DRIVE_URL is emptied, so no PDF upload and no request-row update;
  - PDFs open in an on-page viewer (pdf.js from cdnjs), because artifacts cannot download;
  - script and data paths are relative, and a PRATINJAU banner is added.
Publish the out-dir files as a multi-file artifact (index.html, support.js,
data/invoice.js, data/ziarah-tarif.js, assets/peziarah-wordmark-ink.png).
"""
import os, re, shutil, sys

ROOT = os.getcwd()
HERE = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1] if len(sys.argv) > 1 else "/tmp/admin-ziarah-preview"
for d in ("data", "assets"):
    os.makedirs(os.path.join(out, d), exist_ok=True)

s = open(os.path.join(ROOT, "admin/ziarah/index.html"), encoding="utf-8").read()

def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        sys.exit(f"build: expected {count}x, found {n}x: {a[:70]!r}")
    s = s.replace(a, b)

rep("<title>Tagihan Ziarah | Peziarah Admin</title>", "<title>Tagihan Ziarah · Pratinjau</title>")
rep('<script defer src="/support.js"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>\n'
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>\n'
    '<script defer src="support.js"></script>')
rep('<link rel="icon" href="/assets/favicon.png" type="image/png">\n', "")
s, n = re.subn(r'const INVOICE_JS = "[^"]*";', 'const INVOICE_JS = new URL("data/invoice.js", document.baseURI).href;', s)
assert n == 1, "INVOICE_JS"
s, n = re.subn(r'const TARIF_JS = "[^"]*";', 'const TARIF_JS = new URL("data/ziarah-tarif.js", document.baseURI).href;', s)
assert n == 1, "TARIF_JS"
rep('const DATA = "/data/";', 'const DATA = new URL("data/", document.baseURI).href;')
for path in ("/admin/kuitansi/", "/admin/resi/"):
    rep(f'href="{path}"', f'href="https://peziarah.com{path}" target="_blank" rel="noopener"')
rep('<div style="max-width:960px;margin:0 auto;padding:28px 24px 80px;display:flex;flex-direction:column;gap:30px">\n  <header',
    '<div style="max-width:960px;margin:0 auto;padding:28px 24px 80px;display:flex;flex-direction:column;gap:30px">\n'
    '  <div style="padding:12px 16px;border-radius:12px;background:#1A1712;color:#F7F3EA;font-size:13px;line-height:1.55">\n'
    '    <span style="font-family:\'Space Mono\',monospace;letter-spacing:0.12em;color:#C9E45B">PRATINJAU</span> · Halaman dan PDF sama dengan /admin/ziarah/. '
    'Di sini tidak ada yang dikirim ke Google Sheet atau Drive, dan PDF tampil di halaman (artifact tidak bisa mengunduh file). Draf tersimpan di browser ini saja.\n'
    '  </div>\n  <header')
viewer = open(os.path.join(HERE, "viewer.html"), encoding="utf-8").read()
rep("</body>\n</html>", viewer + "</body>\n</html>")
open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(s)

shutil.copy(os.path.join(ROOT, "support.js"), os.path.join(out, "support.js"))
shutil.copy(os.path.join(ROOT, "data/ziarah-tarif.js"), os.path.join(out, "data/ziarah-tarif.js"))
shutil.copy(os.path.join(ROOT, "assets/peziarah-wordmark-ink.png"), os.path.join(out, "assets/peziarah-wordmark-ink.png"))
inv = open(os.path.join(ROOT, "data/invoice.js"), encoding="utf-8").read()
inv, n = re.subn(r'^export const DRIVE_URL = ".*";', 'export const DRIVE_URL = ""; // PREVIEW: never upload', inv, flags=re.M)
assert n == 1, "DRIVE_URL"
open(os.path.join(out, "data/invoice.js"), "w", encoding="utf-8").write(inv)
print("preview built in", out)
