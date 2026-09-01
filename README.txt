TERANG CO. — paket publish
==========================

Dibuat ulang: 20 Agustus 2026 (rev. 2)

Isi folder ini sudah siap di-upload apa adanya ke web root Hostinger
(biasanya public_html/). Struktur akhirnya:

  public_html/
    index.html                -> /                    (Landing)
    katalog/index.html        -> /katalog/
    produk/<id>/index.html    -> /produk/<id>/        (38 halaman produk)
    produk/index.html         -> /produk/?id=<id>     (link lama, tetap jalan)
    keranjang/index.html      -> /keranjang/
    ziarah/index.html         -> /ziarah/
    hampers/index.html        -> /hampers/
    jurnal/index.html         -> /jurnal/
    jurnal/artikel/<slug>/    -> /jurnal/artikel/<slug>/  (12 artikel)
    jurnal/artikel/index.html -> /jurnal/artikel/#<slug>   (link lama, tetap jalan)
    ziarah/rute/<slug>/       -> /ziarah/rute/<slug>/ (6 rute + custom)
    tentang/index.html        -> /tentang/
    kontak/index.html         -> /kontak/
    kebijakan-privasi/        -> /kebijakan-privasi/
    syarat-ketentuan/         -> /syarat-ketentuan/
    404.html                  -> halaman tidak ditemukan
    .htaccess                 -> routing 404, redirect HTTPS, MIME WebP,
                                 cache header, security header
    faq/index.html            -> /faq/
    support.js
    robots.txt                -> /robots.txt
    sitemap.xml               -> /sitemap.xml
    llms.txt                  -> /llms.txt   (ringkasan toko untuk AI/chatbot)
    data/                     <- konten katalog, jurnal, hampers, form
    assets/                   <- semua foto produk & artikel

CARA UPLOAD
1. Zip isi folder publish/ (bukan foldernya sendiri).
2. Hostinger > File Manager > public_html > Upload > Extract.
3. Selesai. Buka domainmu.

MENGUBAH KONTEN SETELAH LIVE
Tidak perlu menyentuh HTML. Semua isi ada di:
  data/products.js     produk + kategori (termasuk sub-kategori)
  data/journal.js      metadata artikel (judul, dek, penulis, foto)
  data/post-bodies.js  isi tulisan artikel
  data/hampers.js      paket hampers
  data/verses.js       ayat harian di header
  data/forms.js        endpoint Google Form (pesanan, ziarah, vendor)
  data/cart.js         logika keranjang (jangan diedit tanpa perlu)
Edit file itu di File Manager, save, refresh. Foto baru: upload ke
assets/ lalu tulis "/assets/nama-file.webp" di entri produknya.

FORMAT FOTO
Semua foto disimpan WebP, maksimal 2000 × 2500 px (4:5 portrait, margin
12–15%). Kalau kamu punya PNG/JPG baru, konversi dulu ke WebP sebelum
upload — ukuran filenya turun 80–90% tanpa beda terlihat di layar.

CATATAN: artikel yang sudah ditulis utuh muncul otomatis di bagian
"Baru terbit" di /jurnal/ — dasarnya keberadaan slug-nya di
data/post-bodies.js. Tidak perlu ditandai manual.

CATATAN TEKNIS
- Halaman ini HARUS diakses lewat http/https, bukan dibuka langsung
  dari file (data/*.js dimuat sebagai ES module).
- Semua path di dalam HTML bersifat absolut (/assets/, /data/,
  /support.js), jadi paket ini harus berada di web ROOT — bukan di
  subfolder seperti /toko/.
- React & Babel dimuat dari unpkg.com saat halaman dibuka. Kalau nanti
  mau lepas dari CDN, unduh tiga file di support.js (REACT_URL,
  REACT_DOM_URL, BABEL_URL), simpan di /vendor/, lalu ganti URL-nya.
- SEMUA 70 halaman sudah di-prerender: isinya tertulis langsung di HTML,
  jadi Google membacanya tanpa JavaScript. Rincian: 1 landing, 1 katalog,
  38 produk, 1 ziarah, 7 rute, 1 jurnal, 12 artikel, 1 hampers, 1 keranjang,
  1 tentang, 1 kontak, 1 FAQ, 2 legal, + 2 halaman kompatibilitas link lama
  (/produk/?id= dan /jurnal/artikel/#slug). Plus 404.html.
- Keranjang & checkout mengirim pesanan lewat Google Form ke Sheets;
  pembayaran masih manual (transfer + konfirmasi WhatsApp).

SEO & SOSIAL
Setiap halaman punya <title>, description, canonical, Open Graph, dan
Twitter Card di dalam <head>. Domain yang dipakai: https://peziarah.com
Kalau domainnya berubah, ganti string itu di:
  - <head> setiap file index.html (canonical + og:url + og:image)
  - robots.txt, sitemap.xml, llms.txt
  - fungsi seo() di produk/index.html
Gambar share: /assets/og-peziarah.jpg (1200x630, JPEG — di bawah 600 KB supaya preview WhatsApp muncul). Favicon: /assets/favicon.png
Setelah live: daftarkan sitemap.xml di Google Search Console, lalu tes
tampilan share lewat Facebook Sharing Debugger & WhatsApp.

SEMUA HALAMAN SUDAH DI-PRERENDER
Setiap produk punya foldernya sendiri dengan <title>, deskripsi, canonical,
Open Graph, gambar share sendiri (/assets/og/<id>.jpg), dan data terstruktur
Product + BreadcrumbList yang sudah tertulis di dalam HTML — tidak perlu
JavaScript. Isi ringkas produk juga ditulis di dalam <noscript> supaya
crawler yang tidak menjalankan JS tetap membaca nama, harga, deskripsi,
dan spesifikasi.

PENTING — HALAMAN INI HASIL BUILD:
Kalau kamu mengubah harga, nama, atau deskripsi di data/products.js lewat
File Manager, katalog langsung berubah TAPI 38 halaman produk masih memuat
teks lama di <head> dan <noscript>-nya. Minta build ulang lalu upload lagi
folder produk/ setiap kali ada perubahan harga atau copy produk.

MASIH PLACEHOLDER — GANTI SEBELUM DIIKLANKAN
- Nomor WhatsApp (wa.me/6281200000000) di semua halaman, termasuk link WA
  di footer.
- Rekening bank di /keranjang/ dan /faq/.
- Nama badan usaha & alamat terdaftar di /kebijakan-privasi/ dan
  /syarat-ketentuan/ (sekarang masih generik).
- Sekitar sepertiga foto produk masih placeholder bergaris.

BARU 20 AGUSTUS
- Produk baru: Jaket Bomber Bordir Custom (/produk/bomber-bordir-angkatan/),
  masuk kategori Merch. Foto asli: contoh Van Lith angkatan 32.
- Blok "Seragam Rombongan" di /ziarah/ sekarang memakai dua foto jaket itu
  (sebelumnya placeholder).

SUDAH BERES (tidak perlu diapa-apakan lagi)
- Kebijakan Privasi & Syarat Ketentuan sudah jadi halaman, link footer
  di seluruh 69 halaman sudah menunjuk ke sana.
- Instagram & Facebook di footer sudah menunjuk URL sungguhan.
- Semua path gambar/data absolut (/assets/, /data/).
- .htaccess sudah mengatur 404, HTTPS, MIME WebP, cache, security header.

GOOGLE ANALYTICS
----------------
Semua 71 file HTML (70 halaman + 404.html) sudah memuat tag GA4 (G-H8J9GKJ2NT) tepat sebelum
</head>. Kalau nanti ada halaman baru hasil build ulang, tag ini harus
ditambahkan lagi — file sumber (*.dc.html) sengaja tidak memuatnya supaya
kunjungan saat mendesain tidak ikut terhitung.
