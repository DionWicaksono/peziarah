// TARIF ZIARAH — satu sumber untuk /admin/ziarah/: tujuan, pos biaya, harga, rumus.
//
// Halaman admin membaca file ini setiap dibuka. Mengisi harga di sini = harga itu
// otomatis terisi saat pos ditambahkan; jumlah (qty) selalu dihitung otomatis dari
// peserta, hari, malam, kamar, dan kendaraan, kecuali diketik manual di halaman.
//
// basis (cara jumlah dihitung):
//   pax          jumlah peserta
//   days         jumlah hari            nights     jumlah malam (min. 1)
//   paxDays      peserta × hari          paxNights  peserta × malam
//   rooms        kamar ber-2 × malam     one        1
//   vehicles     jumlah kendaraan        vehicleDays kendaraan × hari
// Jumlah kendaraan = peserta ÷ kursi kendaraan pertama di daftar pos (dibulatkan ke atas).
// price: harga satuan dalam rupiah, atau null kalau belum ada (diisi di halaman).
// pct:   khusus pos persentase (mis. biaya layanan): persen dari biaya perjalanan
//        lainnya. null = tidak dipakai, harga diisi manual.
//
// Setelah mengubah file ini, naikkan TARIF_VERSION di /admin/ziarah/index.html
// (cache JS 7 hari di .htaccess).

// --- tujuan ------------------------------------------------------------------
// Diambil dari halaman rute dan peta Gua Maria di situs. open: false = rute belum
// dibuka (tampil abu-abu, tetap bisa dipilih untuk proposal).
// items: pos yang ikut ditambahkan saat tujuan dipilih (dan terhapus saat tujuan
// dilepas, selama belum diubah).
const LOKASI = [{ cat: "Tiket & izin", name: "Retribusi & parkir", unit: "per kendaraan", basis: "vehicles", price: null }];

export const REGIONS = ["DI Yogyakarta", "Jawa Tengah", "Jawa Barat", "Jawa Timur", "Bali", "Luar negeri"];

export const DESTINATIONS = [
  { id: "sendangsono", short: "Sendangsono", name: "Gua Maria Sendangsono", area: "Kulon Progo", region: "DI Yogyakarta", page: "/ziarah/rute/sendangsono/", items: LOKASI },
  { id: "ganjuran", short: "Ganjuran", name: "Candi Hati Kudus Tuhan Yesus Ganjuran", area: "Bambanglipuro, Bantul", region: "DI Yogyakarta", page: "/ziarah/rute/ganjuran/", items: LOKASI },
  { id: "tritis", short: "Tritis", name: "Gua Maria Tritis", area: "Paliyan, Gunungkidul", region: "DI Yogyakarta", items: LOKASI },
  { id: "muntilan", short: "Muntilan", name: "Kerkhof Muntilan, Makam Rm. Sanjaya & Museum Misi", area: "Muntilan, Magelang", region: "Jawa Tengah", page: "/ziarah/rute/muntilan/", items: LOKASI },
  { id: "kerep", short: "Kerep", name: "Gua Maria Kerep Ambarawa", area: "Ambarawa, Semarang", region: "Jawa Tengah", page: "/ziarah/rute/kerep/", items: LOKASI },
  { id: "semarang", short: "Tiga Gereja Semarang", name: "Tiga Gereja Tua Semarang (Gedangan, Randusari, Blenduk)", area: "Semarang", region: "Jawa Tengah", page: "/ziarah/rute/semarang-tiga-gereja/", items: LOKASI },
  { id: "sriningsih", short: "Sriningsih", name: "Gua Maria Sendang Sriningsih", area: "Klaten", region: "Jawa Tengah", items: LOKASI },
  { id: "kaliori", short: "Kaliori", name: "Gua Maria Kaliori", area: "Banyumas", region: "Jawa Tengah", items: LOKASI },
  { id: "lembah-karmel", short: "Lembah Karmel", name: "Gua Maria Lembah Karmel", area: "Cikanyere, Cianjur", region: "Jawa Barat", items: LOKASI },
  { id: "sawer-rahmat", short: "Sawer Rahmat", name: "Gua Maria Sawer Rahmat", area: "Cisantana, Kuningan", region: "Jawa Barat", page: "/ziarah/rute/sawer-rahmat/", items: LOKASI },
  { id: "puhsarang", short: "Puhsarang", name: "Gua Maria Lourdes Puhsarang", area: "Kediri", region: "Jawa Timur", page: "/ziarah/rute/puhsarang/", items: LOKASI },
  { id: "sendangrejo", short: "Sendangrejo", name: "Gua Maria Sendangrejo", area: "Blitar", region: "Jawa Timur", items: LOKASI },
  { id: "waluyojatiningsih", short: "Waluyojatiningsih", name: "Gua Maria Fatima Sendang Waluyojatiningsih", area: "Sooko, Ponorogo", region: "Jawa Timur", items: LOKASI },
  { id: "jatiningrum", short: "Jatiningrum", name: "Gua Maria Jatiningrum", area: "Banyuwangi", region: "Jawa Timur", items: LOKASI },
  { id: "tuka", short: "Tuka", name: "Gereja Tuka", area: "Dalung, Badung", region: "Bali", items: LOKASI },
  { id: "palasari", short: "Palasari", name: "Gua Maria Palasari", area: "Melaya, Jembrana", region: "Bali", items: LOKASI },
  { id: "gumbrih", short: "Gumbrih", name: "Gua Maria Gumbrih", area: "Pekutatan, Jembrana", region: "Bali", items: LOKASI },
  { id: "selabih", short: "Selabih", name: "Gua Maria Selabih", area: "Selemadeg Barat, Tabanan", region: "Bali", items: LOKASI },
  { id: "bedugul", short: "Bedugul", name: "Gua Maria Bunda Karmel Bedugul", area: "Baturiti, Tabanan", region: "Bali", items: LOKASI },
  { id: "pelaga", short: "Pelaga", name: "Gua Maria Ratu Surga Pelaga", area: "Petang, Badung", region: "Bali", items: LOKASI },
  { id: "lourdes", short: "Lourdes", name: "Lourdes", area: "Prancis", region: "Luar negeri", page: "/ziarah/rute/lourdes/", open: false, items: [] },
  { id: "iberia", short: "Iberia", name: "Fátima, Santiago, Barcelona", area: "Portugal & Spanyol", region: "Luar negeri", page: "/ziarah/rute/iberia/", open: false, items: [] },
  { id: "jerusalem", short: "Yerusalem", name: "Yerusalem — Tanah Suci", area: "Israel & Palestina", region: "Luar negeri", page: "/ziarah/rute/jerusalem/", open: false, items: [] }
];

// --- pos biaya ---------------------------------------------------------------
// seats: kursi per kendaraan (hanya pos kendaraan). hint: contoh isian keterangan.
export const CATALOG = [
  { cat: "Transportasi", items: [
    { name: "Bus pariwisata 45 kursi", unit: "per unit per hari", basis: "vehicleDays", seats: 45, price: null, detail: "termasuk sopir, BBM, tol, parkir" },
    { name: "Bus medium 31 kursi", unit: "per unit per hari", basis: "vehicleDays", seats: 31, price: null, detail: "termasuk sopir, BBM, tol, parkir" },
    { name: "Elf / Hiace 14 kursi", unit: "per unit per hari", basis: "vehicleDays", seats: 14, price: null, detail: "termasuk sopir, BBM, tol, parkir" },
    { name: "Mobil + sopir 6 kursi", unit: "per unit per hari", basis: "vehicleDays", seats: 6, price: null },
    { name: "Tiket kereta", unit: "per orang", basis: "pax", price: null },
    { name: "Tiket pesawat", unit: "per orang", basis: "pax", price: null },
    { name: "BBM, tol & parkir", unit: "paket", basis: "one", price: null },
    { name: "Penginapan & makan sopir", unit: "per kendaraan per malam", basis: "vehicles", price: null }
  ] },
  { cat: "Penginapan", items: [
    { name: "Hotel", unit: "per kamar per malam", basis: "rooms", price: null, hint: "Nama hotel, tipe kamar, sarapan" },
    { name: "Rumah retret / wisma", unit: "per orang per malam", basis: "paxNights", price: null, hint: "Nama rumah retret" },
    { name: "Extra bed", unit: "per malam", basis: "nights", price: null }
  ] },
  { cat: "Konsumsi", items: [
    { name: "Sarapan", unit: "per orang", basis: "paxNights", price: null },
    { name: "Makan siang", unit: "per orang", basis: "paxDays", price: null },
    { name: "Makan malam", unit: "per orang", basis: "paxNights", price: null },
    { name: "Restoran pilihan rombongan", unit: "per orang", basis: "pax", price: null, req: true, hint: "Nama restoran, menu" },
    { name: "Snack & air mineral", unit: "per orang per hari", basis: "paxDays", price: null },
    { name: "Nasi kotak perjalanan", unit: "per orang", basis: "pax", price: null }
  ] },
  { cat: "Pendampingan", items: [
    { name: "Koordinator lapangan", unit: "per kendaraan per hari", basis: "vehicleDays", price: null },
    { name: "Pemandu lokal", unit: "per hari", basis: "days", price: null },
    { name: "Tenaga kesehatan / P3K", unit: "per hari", basis: "days", price: null },
    { name: "Pendamping lansia & kursi roda", unit: "per hari", basis: "days", price: null }
  ] },
  { cat: "Ibadat", items: [
    { name: "Buku doa rute", unit: "per orang", basis: "pax", price: null },
    { name: "Perlengkapan ibadat", unit: "paket", basis: "one", price: null, detail: "lilin, teks lagu, salib prosesi" },
    { name: "Sound system portabel", unit: "per hari", basis: "days", price: null }
  ] },
  { cat: "Tiket & izin", items: [
    { name: "Tiket masuk / retribusi", unit: "per orang", basis: "pax", price: null },
    { name: "Retribusi & parkir", unit: "per kendaraan", basis: "vehicles", price: null },
    { name: "Izin rombongan", unit: "paket", basis: "one", price: null }
  ] },
  { cat: "Perlengkapan", items: [
    { name: "Seragam rombongan", unit: "per orang", basis: "pax", price: null },
    { name: "Name tag & lanyard", unit: "per orang", basis: "pax", price: null },
    { name: "Kit peziarah", unit: "per orang", basis: "pax", price: null, detail: "topi, jas hujan, botol minum" },
    { name: "Tas rombongan", unit: "per orang", basis: "pax", price: null }
  ] },
  { cat: "Lainnya", items: [
    { name: "Asuransi perjalanan", unit: "per orang", basis: "pax", price: null },
    { name: "Dokumentasi foto & video", unit: "paket", basis: "one", price: null },
    { name: "Biaya layanan Peziarah", unit: "paket", basis: "one", price: null, pct: null }
  ] }
];

// Titipan: diteruskan utuh, bukan pendapatan Peziarah.
export const TITIPAN = [
  { name: "Persembahan misa", hint: "Diserahkan ke pengelola tempat ziarah", price: null },
  { name: "Stipendium / transport pendamping rohani", detail: "diserahkan langsung ke romo", price: null },
  { name: "Kolekte / sumbangan rombongan", hint: "Diserahkan ke ...", price: null }
];

// --- rumus per peserta (opsional) -------------------------------------------
// Kalau nanti ada rumus harga per peserta, tulis di sini. Halaman memanggilnya
// setiap angka berubah dan menampilkan hasilnya di samping hitungan per pos;
// di tagihan per peserta, hasilnya jadi angka awal "Biaya per peserta".
//
// ctx = { pax, days, nights, rooms, vehicles, destinations: [id, ...],
//         cost (biaya perjalanan dari pos), titipan, lines: [{ name, cat, qty, price, sum }] }
// Kembalikan null (tidak dipakai) atau { perPax: angka, note: "penjelasan singkat" }.
//
// Contoh (belum aktif):
//   return { perPax: Math.round((ctx.cost / ctx.pax) * 1.1 / 1000) * 1000,
//            note: "biaya per pos dibagi peserta + 10%, dibulatkan ke Rp 1.000" };
export function formula(ctx) {
  return null;
}
