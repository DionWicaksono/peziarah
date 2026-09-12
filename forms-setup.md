# Menghubungkan form ke Google Form → Sheet

Tiga form yang perlu diurus. Yang pertama sudah ada dan hanya butuh **satu
pertanyaan tambahan**; dua lainnya form baru.

Semua mapping ada di `data/forms.js` (dan salinannya di `publish/data/forms.js`
— keduanya harus sama).

**Status: keempat form sudah terpasang penuh** (10 Sep 2026). Bagian "cara
mengambil entry id" di bawah hanya perlu dibaca lagi kalau kamu menambah
pertanyaan baru atau membuat form baru.

| Form | `id` | Kunci di kode |
|---|---|---|
| Ziarah (rombongan) | `1FAIpQLSfbu1EG…Ttw` | `ziarah` |
| Peziarah-Susun Sendiri | `1FAIpQLSepbQvq…CA` | `ziarah-susun-sendiri` |
| Peziarah — Grup Kecil | `1FAIpQLSfkUvh1…tA` | `concierge` |
| Shuttle | `1FAIpQLScXaIE6…XA` | `shuttle` |

Kalau nanti ada `id` atau `entry` yang dikosongkan lagi, `submit()` tetap
menulis ke localStorage pengunjung dan tombol WhatsApp tetap jalan — yang
berhenti hanya pencatatan ke Sheet.

---

## Cara mengambil `id` form dan `entry.NNN`

1. Buka Google Form → **Send** → tab tautan `< >` → salin URL.
   Bagian panjang setelah `/e/` adalah **`id`**.
   Contoh: `.../forms/d/e/1FAIpQLSf…OXFXw/viewform` → `id: "1FAIpQLSf…OXFXw"`
2. Buka URL `viewform` itu di browser → klik kanan → **View page source**.
3. Cari `entry.` — setiap pertanyaan punya satu, urut sesuai urutan di form.
   Lebih mudah: cari nama pertanyaannya, `entry.NNNNNNNNN` ada di dekatnya.
4. Tempel angkanya ke `data/forms.js`, lalu salin file itu ke `publish/data/`.

Cara alternatif yang lebih cepat kalau pertanyaannya banyak: di form, klik
**⋮ → Get pre-filled link**, isi setiap kolom dengan nama kolomnya sendiri
(mis. ketik `nama_kontak` di kolom nama), klik **Get link**. URL hasilnya berisi
pasangan `entry.NNN=nama_kontak` untuk semua pertanyaan sekaligus.

Setelah form jadi: tab **Responses** → ikon Sheets → **Create new spreadsheet**.

---

## 1. Form `ziarah` (sudah ada) — tambah 1 pertanyaan ✓ selesai

Form permintaan rombongan sekarang ikut mengirim intensi.

| Pertanyaan | Tipe | Wajib | Entry |
|---|---|---|---|
| Intensi | Paragraph | tidak | `entry.1516614689` |

---

## 2. Form **Peziarah-Susun Sendiri** ✓ selesai

Kunci di kode: `"ziarah-susun-sendiri"`. Semua pertanyaan **Short answer**
kecuali yang ditandai, dan **semua tidak wajib** — validasi sudah dilakukan di
halaman, dan Google Form yang mewajibkan kolom akan menolak POST-nya diam-diam.

| Urutan | Judul pertanyaan | Tipe | Kunci di `fields` |
|---|---|---|---|
| 1 | Kode | Short answer | `kode` |
| 2 | Nama kontak | Short answer | `nama_kontak` |
| 3 | Telepon | Short answer | `telepon` |
| 4 | Jumlah orang | Short answer | `jumlah_orang` |
| 5 | Intensi | Paragraph | `intensi` |
| 6 | Destinasi | Paragraph | `destinasi` |
| 7 | Gaya perjalanan | Short answer | `gaya` |
| 8 | Pengalaman rohani | Short answer | `pengalaman_rohani` |
| 9 | Minat | Short answer | `minat` |
| 10 | Pace | Short answer | `pace` |

Catatan: nomor 7–10 di halaman berupa pilihan chip, tapi di Google Form **tetap
Short answer**, bukan Multiple choice. Pilihan ganda akan menolak nilai yang
tidak persis sama dengan opsinya, dan `pengalaman_rohani` serta `minat`
dikirim sebagai satu baris dipisah koma (`"Misa, Rosario"`).

Kode referensi berformat `BY-XXXXX`.

---

## 3. Form **Peziarah — Grup Kecil** ✓ selesai

Kunci di kode: `"concierge"`. Aturan yang sama: semua tidak wajib.

| Urutan | Judul pertanyaan | Tipe | Kunci di `fields` |
|---|---|---|---|
| 1 | Kode | Short answer | `kode` |
| 2 | Nama kontak | Short answer | `nama_kontak` |
| 3 | Telepon | Short answer | `telepon` |
| 4 | Jumlah orang | Short answer | `jumlah_orang` |
| 5 | Lama perjalanan | Short answer | `lama` |
| 6 | Perkiraan waktu | Short answer | `waktu` |
| 7 | Destinasi | Paragraph | `destinasi` |
| 8 | Perlu diperhatikan | Short answer | `perhatian` |
| 9 | Intensi | Paragraph | `intensi` |

`perhatian` juga dikirim sebagai satu baris dipisah koma
(`"Lansia, Kursi roda"`). Kode referensi berformat `CG-XXXXX`.

---

## 4. Form **Shuttle** ✓ selesai

Kunci di kode: `"shuttle"`. Dipakai form "DAFTAR KURSI" di beranda
(section `#shuttle`). Kode referensi berformat `SH-XXXXX`.

Aturan yang sama seperti dua form sebelumnya: semua pertanyaan **Short answer**
dan **semua tidak wajib** — validasi sudah dilakukan di halaman, dan Google Form
yang mewajibkan kolom akan menolak POST-nya diam-diam.

| Urutan | Judul pertanyaan | Tipe | Kunci di `fields` | Entry |
|---|---|---|---|---|
| 1 | Kode | Short answer | `kode` | `entry.745457333` |
| 2 | Nama | Short answer | `nama` | `entry.861171670` |
| 3 | Telpon | Short answer | `telepon` | `entry.998831788` |
| 4 | Tanggal | Short answer | `tanggal` | `entry.2031690989` |
| 5 | Jumlah Kursi | Short answer | `jumlah_kursi` | `entry.637978168` |
| 6 | Keberangkatan | Short answer | `keberangkatan` | `entry.761298991` |
| 7 | Kembali | Short answer | `kembali` | `entry.1815178876` |

Catatan per kolom:

- **Tanggal** — biarkan Short answer, jangan tipe *Date*. Halaman mengirim
  nilai apa adanya dari `<input>`-nya; tipe Date di Google Form menolak format
  yang tidak persis sama.
- **Jumlah kursi** — Short answer, bukan Number. Alasannya sama; batas 1–14
  sudah dijaga di halaman.
- **Keberangkatan** dan **Kembali** — selalu terkirim terisi. Kalau pengunjung
  tidak mengubahnya, nilainya default `06.00 dari Kerkhof` dan
  `17.00 dari parkiran Sendangsono`.

Yang masih perlu dilakukan sekali di Google Form-nya:

1. Pastikan ketujuh pertanyaan **tidak** ditandai wajib (*Required* mati).
2. Tab **Responses** → ikon Sheets → **Create new spreadsheet**.
3. Opsional, notifikasi email: ikuti bagian Apps Script di bawah dengan
   `NAMA_FORM = "Shuttle"`.

Catatan urutan: `entry` di atas dipetakan dari urutan pertanyaan di form
(Kode → Nama → Telpon → Tanggal → Jumlah Kursi → Keberangkatan → Kembali).
Kalau pertanyaannya nanti diacak ulang, `entry`-nya **tidak** berubah — yang
berubah hanya urutan kolom di Sheet, jadi tidak perlu diperbaiki di kode.

---

## Cek setelah dipasang

1. Isi form di situs sampai muncul kode referensi.
2. Buka Sheet — baris baru harus muncul dalam beberapa detik.
3. Kalau tidak muncul: buka DevTools → Console. Peringatan
   `[forms] no endpoint mapped for …` berarti `id` masih kosong. Kalau tidak ada
   peringatan tapi baris tetap tidak masuk, biasanya ada pertanyaan yang
   ditandai **wajib** di Google Form — hilangkan tandanya.

POST-nya `mode: "no-cors"`, jadi browser tidak pernah tahu Google menerima atau
menolak. Karena itu halaman tidak pernah bilang "terkirim" — hanya menampilkan
kode dan mengarahkan ke WhatsApp. Salinan lokal setiap submission tersimpan di
localStorage kunci `peziarah.submissions.v1`.

---

# Notifikasi email tiap ada isian

## Cara cepat (bawaan Google, 30 detik per form)

Di Google Form → tab **Responses** → **⋮** → centang
**Get email notifications for new responses**.

Selesai. Tapi emailnya hanya bilang "ada respons baru" dengan tautan — isinya
tidak ikut, jadi kamu tetap harus buka Sheet. Hanya bisa ke alamat pemilik form,
dan tidak bisa diarahkan ke beberapa orang.

Cukup kalau yang kamu butuhkan sekadar tanda "ada yang masuk".

## Cara yang benar (Apps Script — isi lengkap, bisa banyak penerima)

Kirim email berisi seluruh jawaban, subject yang sudah membawa kode referensi,
jadi bisa dibalas dan dicari di inbox.

> **Jangan pakai tombol Deploy.** Deploy itu untuk web app, API, dan add-on.
> Yang kita pasang di sini adalah *installable trigger* — skripnya jalan di
> dalam akunmu sendiri dan langsung aktif begitu trigger-nya disimpan dan
> izinnya diberikan. Kalau di-deploy sebagai web app, kamu cuma dapat URL yang
> tidak dipakai siapa-siapa dan trigger-nya tetap tidak ada.

1. Buka **Spreadsheet** hasil form (bukan form-nya) →
   **Extensions → Apps Script**.
2. Hapus isi `Code.gs`, tempel skrip di bawah, ganti `TUJUAN` dan `NAMA_FORM`.
3. **Save** (ikon disket, atau Ctrl/Cmd+S). Beri nama proyeknya, mis.
   "Notifikasi Grup Kecil".
4. Ikon jam (**Triggers**) di bilah kiri → **Add trigger** (kanan bawah):
   - Choose which function to run: **`onFormSubmit`**
   - Select event source: **From spreadsheet**
   - Select event type: **On form submit**
   - Failure notification settings: **Notify me immediately**
5. **Save** → jendela izin muncul. Pilih akunmu → layar "Google hasn't verified
   this app" → **Advanced** → **Go to … (unsafe)** → **Allow**.
   Peringatan itu wajar: skripnya milikmu sendiri dan memang belum melewati
   proses verifikasi Google, yang hanya berlaku untuk aplikasi publik.
6. Isi form dari situs sekali untuk mengetes. Email harus masuk dalam hitungan
   detik.

Satu skrip per spreadsheet. Karena tiap form punya Sheet sendiri, ulangi
langkah 1–6 tiga kali dan hanya ganti `NAMA_FORM`.

```javascript
// Kirim email lengkap setiap ada isian form baru.
const TUJUAN = "halo@peziarah.com";           // pisahkan dengan koma untuk beberapa alamat
const NAMA_FORM = "Grup Kecil";               // ganti per spreadsheet: "Susun Sendiri", "Ziarah", dst

function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = e.range.getValues()[0];

  const rows = [];
  let kode = "", nama = "", telepon = "";

  headers.forEach(function (h, i) {
    const v = String(values[i] == null ? "" : values[i]).trim();
    if (!v) return;                            // lewati kolom kosong
    const key = String(h).toLowerCase();
    if (key.indexOf("kode") === 0) kode = v;
    if (key.indexOf("nama") === 0) nama = v;
    if (key.indexOf("telepon") === 0) telepon = v;
    rows.push(
      '<tr>' +
      '<td style="padding:7px 14px 7px 0;vertical-align:top;white-space:nowrap;' +
      'font:11px ui-monospace,monospace;letter-spacing:.08em;color:#8A8172">' +
      String(h).toUpperCase() + '</td>' +
      '<td style="padding:7px 0;vertical-align:top;font:15px/1.5 Helvetica,Arial,sans-serif;' +
      'color:#1A1712">' + v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>") + '</td>' +
      '</tr>'
    );
  });

  const waNomor = telepon.replace(/[^0-9]/g, "").replace(/^0/, "62");
  const waLink = waNomor
    ? '<p style="margin:24px 0 0"><a href="https://wa.me/' + waNomor + '" ' +
      'style="font:14px Helvetica,Arial,sans-serif;color:#6C4BA6">Balas lewat WhatsApp →</a></p>'
    : "";

  const html =
    '<div style="background:#F7F3EA;padding:28px;font-family:Helvetica,Arial,sans-serif">' +
    '<div style="font:11px ui-monospace,monospace;letter-spacing:.14em;color:#6C4BA6">' +
    NAMA_FORM.toUpperCase() + '</div>' +
    '<div style="font:700 24px/1.1 Helvetica,Arial,sans-serif;color:#1A1712;margin:8px 0 20px">' +
    (kode || "Isian baru") + '</div>' +
    '<table style="border-collapse:collapse">' + rows.join("") + '</table>' +
    waLink +
    '<p style="margin:26px 0 0;font:12px Helvetica,Arial,sans-serif;color:#8A8172">' +
    'Dikirim otomatis dari ' + sheet.getParent().getName() + '</p></div>';

  MailApp.sendEmail({
    to: TUJUAN,
    subject: "[" + NAMA_FORM + "] " + (kode || "isian baru") + (nama ? " — " + nama : ""),
    htmlBody: html,
    name: "Peziarah"
  });
}
```

Ulangi untuk tiap spreadsheet (Ziarah, Susun Sendiri, Grup Kecil) — cukup ganti
`NAMA_FORM`. Skripnya membaca baris header, jadi kalau nanti kamu menambah
pertanyaan, kolom baru itu ikut terkirim tanpa perlu mengubah apa pun.

Nilai `NAMA_FORM` per spreadsheet:

| Spreadsheet | `NAMA_FORM` | Kode referensi |
|---|---|---|
| Ziarah (rombongan) | `Ziarah` | `ZR-…` |
| Peziarah-Susun Sendiri | `Susun Sendiri` | `BY-…` |
| Peziarah — Grup Kecil | `Grup Kecil` | `CG-…` |
| Peziarah — Shuttle Harian | `Shuttle` | `SH-…` |

Batas kuota akun Gmail biasa: 100 email per hari. Jauh di atas kebutuhan.

### Kalau nanti mau kirim ke beberapa orang

`TUJUAN` menerima beberapa alamat dipisah koma:

```javascript
const TUJUAN = "halo@peziarah.com, operasional@peziarah.com";
```

Untuk memisahkan siapa menerima apa — mis. Grup Kecil ke kamu, rombongan ke tim
operasional — cukup beri `TUJUAN` yang berbeda di tiap spreadsheet.

### Kalau email tidak datang
- Cek folder **Spam** — email dari Apps Script kadang mendarat di sana pertama
  kali; tandai "Not spam" sekali saja.
- Di Apps Script → **Executions**, lihat apakah trigger-nya jalan dan error apa.
  Kalau tidak ada baris sama sekali, trigger-nya belum tersimpan.
- Trigger harus **On form submit**, bukan *On edit*. *On edit* tidak menyala
  untuk baris yang ditulis oleh Google Form.
- Skrip harus dipasang di **spreadsheet**-nya, bukan di form. Apps Script yang
  dibuka dari Google Form tidak punya event source "From spreadsheet".
- Fungsi bernama persis `onFormSubmit`. Kalau namanya diubah, ubah juga
  pilihannya di dialog trigger.

