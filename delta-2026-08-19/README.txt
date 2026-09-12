PEZIARAH — DELTA PACK
Tanggal: 19 Agustus 2026

62 file HTML. Semua struktur folder sudah sama dengan public_html.
Upload dan overwrite. TIDAK ada asset baru, TIDAK ada perubahan di /data/,
support.js tidak berubah.


==========================================================
1. FOOTER — SELURUH SITUS (62 file)
==========================================================

TikTok dan Spotify dihapus dari baris IKUTI.
Instagram dan Facebook sekarang menunjuk ke URL sungguhan:

  Instagram  https://instagram.com/peziarahsociety
  Facebook   https://facebook.com/peziarahsociety
  WhatsApp   tetap href="#" (menunggu nomor)

Kecuali di index.html, WhatsApp sudah menunjuk ke wa.me/6281200000000 —
itu nomor contoh dari draf lama, masih perlu diganti.

INI SEBABNYA SEMUA 62 FILE MASUK PACK. Footer ditulis ulang di tiap
halaman, bukan dari satu file bersama. Kalau ke depannya footer sering
berubah, itu kandidat pertama untuk dipindah ke satu sumber.


==========================================================
2. HEADER LANDING (index.html)
==========================================================

Header landing dulu transparan dan melayang di atas hero
(position:fixed + mix-blend-mode:difference). Sekarang sama dengan
halaman lain:

  position:sticky; top:0; background:#F7F3EA;
  border-bottom:1px solid #E7DFD1

Penyesuaian yang mengikutinya, supaya tidak ada jarak ganda:
  - tinggi hero  100vh          -> calc(100vh - 56px)
  - min-height   740px          -> 680px
  - offset teks desktop  96px   -> 0
  - padding atas teks mobile 96px -> 40px
  - z-index header 50 -> 60, drawer menu 70 -> 80 (sama dengan katalog)


==========================================================
3. META DESCRIPTION (index.html, katalog/index.html)
==========================================================

Keduanya dulu terpotong di hasil Google (188 dan 178 karakter).
Diganti di tiga tempat sekaligus: meta description, og:description,
twitter:description.

  index.html    (128 karakter)
  "Rosario, salib, perhiasan, dan hampers rohani Katolik — dirangkai
   pengrajin lokal dalam batch kecil. Kirim ke seluruh Indonesia."

  katalog/index.html    (146 karakter)
  "Rosario, salib & krusifiks, perhiasan, tenun & batik, wall art, lilin,
   buku, sampai merch paroki. Harga jelas, stok nyata, buatan pengrajin
   lokal."


==========================================================
4. PRERENDER — index.html & katalog/index.html
==========================================================

Blok konten statis (id="__pr") tepat setelah <body>, dibangkitkan dari
data/products.js, data/hampers.js, data/journal.js:

  index.html         10 kategori, 12 produk pilihan, 4 hampers,
                     4 artikel jurnal, 4 poin kepercayaan, 7 tautan
  katalog/index.html 11 kategori (10 utama + sub Altar Rumah),
                     SELURUH 37 produk per kategori, dengan anchor
                     #rosario, #salib, dan seterusnya

Begitu aplikasi selesai mount, blok statis dihapus dari DOM. Kalau
aplikasi TIDAK pernah mount (support.js lambat atau gagal), setelah
8 detik skrip menyembunyikan <x-dc> supaya pengunjung melihat katalog
statis, bukan template mentah berisi {{ }}. Blok statis tidak pernah
dibuang selama belum ada penggantinya.

Tag <script src="/support.js"> sekarang punya fallback relatif kalau
path absolut gagal.


==========================================================
5. SEO / JSON-LD (index.html, katalog/index.html)
==========================================================

  index.html          Store  + logo, priceRange (Rp 129K – Rp 2.520K),
                             paymentAccepted (Transfer, QRIS, COD),
                             sameAs (Instagram + Facebook)
                      WebSite (entitas situs)
                      ItemList kategori
  katalog/index.html  BreadcrumbList (Beranda > Katalog)
                      ItemList 37 Product + harga IDR, gambar, stok

Font Google dipindah ke <head>. Sebelumnya ada di dalam <helmet> di body,
jadi baru diunduh setelah support.js jalan. Ini memperbaiki LCP.


==========================================================
YANG MASIH TERBUKA
==========================================================

- NOMOR WHATSAPP. Semua tautan WhatsApp masih href="#", kecuali
  index.html yang memakai nomor contoh 6281200000000.

- BODY ART DITAHAN. tato-sacred-heart, tato-kalvari, set-henna-salib
  sengaja tidak diberi data harga/ketersediaan di JSON-LD, karena
  studio Terang Ink belum beroperasi. Halaman dan harganya tetap tampil
  seperti biasa — yang ditahan hanya pernyataan "siap dibeli, stok ada"
  yang bisa dibaca mesin.

- 12 DARI 37 PRODUK BELUM ADA FOTO di data/products.js: rosario-via-lucis,
  krusifiks-jati, cincin-ora, gelang-manik-tenun, syal-tenun-sumba,
  outer-tenun-ende, batik-agnus, selendang-batik-kapel, panel-ayat-kuningan,
  lilin-hortus, tato-sacred-heart, set-henna-salib.
  Google mensyaratkan gambar untuk tampilan produk kaya, jadi 12 entri itu
  sah tapi tidak akan dapat tampilan penuh.

- BELUM DIPASANG: SearchAction (kotak pencarian di hasil Google).
  Halaman katalog baru membaca #kategori dari URL, belum ?q=.

- Blok statis dibangkitkan dari data. Kalau data/products.js berubah,
  blok itu kedaluwarsa dan perlu dibangkitkan ulang.
