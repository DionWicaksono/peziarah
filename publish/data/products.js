// SINGLE SOURCE OF TRUTH for catalog content.
// Backend/CMS integration: replace the two exported consts below with a fetch()
// of the same shape (GET /api/categories, GET /api/products). Nothing in the
// page templates hardcodes product data, so a new item = one entry here.
//
// Product shape:
//   id      string   stable slug, used for the PDP url (/produk/<id>)
//   name    string
//   cat     string   must match a CATEGORIES id
//   price   string   display string incl. currency (backend sends formatted IDR)
//   badge   string   "" | "BARU" | "BEST SELLER" | "EDISI 150" | "HANDMADE" | "MIN. 12 PCS"
//   image   string   path/URL; empty string renders the striped placeholder
//   slot    string   placeholder caption shown while there is no image
//   desc    string   optional; overrides the per-category description paragraph
//   specs   array    optional; [{k,v}] overriding the per-category spec rows
//   fit     "cover"|"contain"  optional; "contain" mats tall/portrait art (posters)
//                    on bone instead of cropping it to the hero box
//   shots   string[] optional extra photos; PDP thumbnails become clickable and
//                    swap the hero image (falls back to striped labels if absent)
//   h       number   card height in px — art-direction knob for the staggered wall
//   tone    "light" | "dark" | "violet"   placeholder background treatment
//   rot     number   card rotation in deg (keep within -1.4..1.4)
//   stock   number   0 = SOLD OUT badge overrides `badge`
//   base    number   optional; price in rupiah, used when `opt.add` recomputes price
//   opt     object   optional per-product variant selector that overrides the PDP's
//                    category default: { label, values[], add[] } where add[] is the
//                    rupiah surcharge per value (e.g. sewing fee)

export const CATEGORIES = [
  { id: "rosario",   name: "Rosario",              count: 34, slot: "[ rosario kayu & batu ]", image: "/assets/hero-rosario.webp" },
  { id: "salib",     name: "Salib & Krusifiks",    count: 29, slot: "[ krusifiks dinding ]", image: "/assets/salib-sonokeling-kuningan.webp" },
  // `fit: "contain"` mats a product-on-white shot instead of cropping it.
  { id: "perhiasan", name: "Perhiasan & Aksesori", count: 41, slot: "[ cincin, gelang, kalung ]", image: "/assets/ichthys-kalung.webp", fit: "contain" },
  { id: "apparel",   name: "Tenun & Batik", count: 36, slot: "[ batik tulis & tenun ]", image: "/assets/batik-kenaikan.webp" },
  { id: "wallart",   name: "Wall Art",             count: 23, slot: "[ ikon & poster dinding ]", image: "/assets/wallart-maria-line.webp" },
  { id: "merch",     name: "Merch",                count: 43, slot: "[ kaos grafis & tote ]", image: "/assets/tote-peziarah-2.webp" },
  { id: "lilin",     name: "Lilin Aroma",          count: 12, slot: "[ lilin kedelai beraroma ]", image: "/assets/lilin-vespers.webp", fit: "contain" },
  { id: "carry",     name: "Carry Goods",          count: 9,  slot: "[ dopp kit & dry bag ]", image: "/assets/dopp-kit-kulit.webp", fit: "contain" },
  { id: "buku",      name: "Buku",                 count: 14, slot: "[ buku & jurnal jahit tangan ]", image: "/assets/buku-confessions.webp", fit: "contain" },
  // `parent` = sub-category: hidden from the top-level rail, shown as a sub-chip
  // when its parent is active, and included when the parent is filtered.
  // Body Art = studio tattoo appointments (permanent) + henna. Priced by size,
  // not by unit: see BODYART_RATE below.
  { id: "altar",     name: "Altar Rumah",          count: 6,  slot: "[ nis & altar meja ]", image: "/assets/guadalupe-nis.webp", fit: "contain", parent: "salib" },
  { id: "bodyart",   name: "Body Art",             count: 15, slot: "[ tato studio & henna ]", image: "/assets/tato-kalvari.webp" }
];

// Per-category product-page copy. The two cards under the specs ("Cara merawat"
// and the one next to it) plus the first assurance line come from here, so they
// read like the category instead of like boilerplate.
//
//   care    string           care instructions for that category
//   rite    {title, body}    the second card
//   line    {title, sub}     assurance 01
//
// Every category defines its own `rite` and `line` — the pre-packing promise is
// specific to what that object can actually go wrong at.

const ROSARIO_RITE = {
  title: "Sebelum masuk pouch",
  body: "Tiap simpul ditarik pelan satu per satu dan tiap mata rantai dijepit ulang — bagian yang paling dulu lepas kalau dilewatkan. Dibungkus kertas dan kain, tanpa plastik sekali pakai, dengan kartu perawatan dan nama perangkainya."
};
const ROSARIO_LINE = { title: "Tiap simpul ditarik satu per satu.", sub: "Sebelum masuk pouch flanel." };
const SALIB_RITE = {
  title: "Sebelum turun dari meja",
  body: "Korpus dicek dudukannya — tidak goyang, tidak miring — dan patinanya dibiarkan apa adanya. Sudut kayu dilapis pelindung, lalu dibungkus kertas dan kain dengan kartu perawatan serta nama pengukirnya."
};
const SALIB_LINE = { title: "Dudukan korpus dicek tangan.", sub: "Patina dibiarkan apa adanya." };
const PERHIASAN_RITE = {
  title: "Sebelum masuk kotak",
  body: "Kaitan dibuka-tutup sepuluh kali dan lapisan peraknya diperiksa di bawah cahaya siang sebelum dipoles terakhir kali. Masuk kantong kain tertutup bersama kain poles dan kartu bernama tukang peraknya."
};
const PERHIASAN_LINE = { title: "Kaitan diuji sepuluh kali.", sub: "Dipoles sebelum masuk kotak." };
const LILIN_RITE = {
  title: "Sebelum dibungkus",
  body: "Sumbu dipotong ke ukuran nyala pertama dan permukaan lilin dicek rata — retak rambut sedikit pun tidak kami kirim. Dibungkus kertas dan kain, tanpa plastik, dengan kartu cara menyalakan yang benar."
};
const LILIN_LINE = { title: "Permukaan lilin dicek rata.", sub: "Retak rambut tidak kami kirim." };

export const CATEGORY_COPY = {
  rosario: {
    care: "Lap dengan kain kering setelah dipakai. Hindari parfum langsung ke logam dan simpan di pouch flanel bawaan. Untuk kayu, sesekali oles minyak zaitun tipis agar warnanya tetap dalam.",
    rite: ROSARIO_RITE, line: ROSARIO_LINE
  },
  salib: {
    care: "Bersihkan dengan kain kering. Korpus kuningan cukup dilap — jangan disemir, patinanya bagian dari umurnya. Kayu sesekali diolesi minyak zaitun tipis. Jangan digantung di dinding yang sering lembap.",
    rite: SALIB_RITE, line: SALIB_LINE
  },
  perhiasan: {
    care: "Lepas saat mandi, berenang, dan tidur. Simpan di kantong kain tertutup supaya perak tidak menghitam; kalau sudah kusam, gosok dengan kain poles yang disertakan. Parfum dan losion jangan kena logamnya.",
    rite: PERHIASAN_RITE, line: PERHIASAN_LINE
  },
  lilin: {
    care: "Rapikan sumbu jadi ±5 mm sebelum tiap kali dinyalakan. Nyala pertama minimal dua jam supaya lilinnya turun rata. Jangan tinggalkan menyala tanpa ditunggu, dan berhenti pakai saat sisa 1 cm.",
    rite: LILIN_RITE, line: LILIN_LINE
  },
  apparel: {
    care: "Cuci tangan dengan lerak atau sabun batik, tanpa deterjen dan tanpa diperas kencang. Jemur balik di tempat teduh, setrika dari sisi dalam. Simpan digulung, bukan dilipat, agar garis lilinnya tidak pecah.",
    rite: { title: "Sebelum kain dilipat", body: "Setiap kain diperiksa di bawah cahaya siang, dilipat dengan kertas asam-netral, dan disertai kartu bernama pembatik atau penenunnya. Tanpa plastik sekali pakai." },
    line: { title: "Diperiksa di bawah cahaya siang.", sub: "Satu per satu, sebelum dilipat." }
  },
  merch: {
    care: "Cuci mesin dengan air dingin, dibalik, warna terang terpisah. Jangan pakai pemutih atau pengering panas — sablonnya bisa retak. Setrika dari sisi dalam, hindari langsung di atas cetakan.",
    rite: { title: "Sebelum masuk kemasan", body: "Sablon dicek satu per satu: retak sedikit, geser sedikit, atau warna beda sedikit pun tidak kami kirim. Dikemas dilipat dengan kertas, bukan plastik." },
    line: { title: "Sablon dicek satu per satu.", sub: "Retak sedikit, tidak kami kirim." }
  },
  wallart: {
    care: "Gantung jauh dari sinar matahari langsung agar tinta tidak pudar. Bersihkan dengan kuas lembut atau kain microfiber kering — jangan cairan pembersih. Untuk keping logam, sesekali lap tipis dengan minyak mineral.",
    rite: { title: "Sebelum masuk tabung", body: "Sudut dilapis pelindung, lalu dikirim dalam tabung kaku atau papan datar tergantung ukuran. Kartu edisi bernomor dan tanda tangan pencetaknya ikut di dalam." },
    line: { title: "Dikirim dalam tabung kaku.", sub: "Sudut dilapis, kartu edisi ikut." }
  },
  carry: {
    care: "Lap debu dengan kain kering; untuk kulit, kondisikan dua kali setahun dengan krim netral. Dry bag cukup dibilas air tawar dan dikeringkan terbuka. Jangan disimpan tergulung rapat dalam keadaan lembap.",
    rite: { title: "Sebelum dust bag ditutup", body: "Semua kancing, tarikan, dan jahitan ujung dicek tangan — bagian yang paling dulu rusak kalau dilewatkan. Dikirim dengan dust bag kain, tanpa plastik." },
    line: { title: "Hardware dicek tangan.", sub: "Kancing, tarikan, jahitan ujung." }
  },
  buku: {
    care: "Simpan berdiri di rak yang tidak kena matahari langsung. Kertasnya akan menguning sedikit — itu wajar dan tidak merusak. Jangan dilipat sampai punggungnya patah; pakai pita pembatasnya.",
    rite: { title: "Sebelum masuk kotak kirim", body: "Jilidannya dibuka-tutup sekali untuk memastikan tidak ada halaman yang terlewat atau terbalik, lalu pita pembatasnya diselipkan. Tanpa segel plastik — buku ini memang untuk dibuka." },
    line: { title: "Jilidan diperiksa halaman per halaman.", sub: "Tanpa segel plastik." }
  },
  ziarah: {
    care: "Cuci mesin air dingin, dibalik, tanpa pemutih. Setrika dari sisi dalam agar sablon nama rombongan tetap rapi. Simpan dilipat kering sebelum hari keberangkatan.",
    rite: { title: "Sebelum dikirim ke titik kumpul", body: "Dikelompokkan per ukuran dan diberi label nama, supaya tidak perlu dibongkar di titik kumpul jam empat pagi." },
    line: { title: "Dikelompokkan per ukuran.", sub: "Berlabel nama, siap dibagikan." }
  },
  altar: {
    care: "Lap dengan kain kering; jangan disemprot cairan pembersih — catnya berbasis akrilik tipis. Jauhkan dari matahari langsung dan AC yang menghembus lurus supaya kayunya tidak menyusut. Engsel cukup diputar buka-tutup sesekali, tanpa pelumas.",
    rite: { title: "Sebelum daunnya ditutup", body: "Engsel disetel sampai kedua daun menutup rapat tanpa dipaksa, dan cat figurnya dicek di bawah cahaya siang — sapuan yang meleber sedikit pun diulang. Dikirim dalam kotak kayu berlapis busa dengan kartu bernama pengecatnya." },
    line: { title: "Engsel disetel satu per satu.", sub: "Menutup rapat tanpa dipaksa." }
  },
  bodyart: {
    care: "Cuci dua kali sehari dengan air hangat dan sabun tanpa parfum, lalu tepuk kering. Oles salep tipis 2× sehari selama seminggu. Hindari sinar matahari langsung, kolam, dan laut selama dua minggu, dan jangan dikorek saat mengelupas.",
    careTitle: "Perawatan setelah sesi",
    rite: { title: "Didoakan sebelum tinta pertama", body: "Setiap sesi dibuka dengan doa singkat bersama — kamu, artist, dan intensi yang kamu bawa. Kalau ada ayat atau nama yang ingin disertakan dalam desain, ceritakan saat konsultasi." },
    line: { title: "Konsultasi desain gratis.", sub: "Sketsa direvisi sampai kamu setuju." }
  }
};

// Placeholder tattoo pricing: Rp 180K per cm of longest dimension, min. Rp 900K.
// Resident artist for the crucifixion pieces: Gilang “Bara” Prawira.
export const BODYART_RATE = { perCm: 180000, min: 900000 };

// Batik sold as kain (as-is) or made up; surcharge added on top of `base`.
export const SEWING = { kemeja: 450000, dress: 650000 };

// Products without photography are kept in the source data but not published.
const ALL_PRODUCTS = [
  { id: "batik-kenaikan", name: "Batik Tulis “Kenaikan” — Kain 170×100 cm", cat: "apparel", price: "Rp 2.450K", base: 2450000,
    opt: { label: "BENTUK", values: ["Kain 170×100 cm", "Dijahit kemeja", "Dijahit dress"], add: [0, SEWING.kemeja, SEWING.dress] },
    badge: "HANDMADE", image: "/assets/batik-kenaikan.webp", shots: ["/assets/batik-kenaikan-full.webp"], slot: "[ batik tulis kenaikan ]", h: 480, tone: "light", rot: -0.7, stock: 6 },
  { id: "rosario-sonokeling", name: "Rosario Kayu Sonokeling", cat: "rosario", price: "Rp 249K", badge: "BEST SELLER", image: "/assets/hero-rosario.webp", shots: ["/assets/hero-rosario-full.webp"], slot: "[ rosario sonokeling ]", h: 420, tone: "light", rot: -1.2, stock: 12 },
  { id: "rosario-mutiara", name: "Rosario Mutiara Air Tawar", cat: "rosario", price: "Rp 389K", badge: "BARU",
    desc: "Mutiara air tawar bulat-tak-sempurna, satu per satu dirangkai kawat perak dan dipuntir tangan — bukan diikat benang, jadi tidak akan putus berhamburan. Bapa-nya bermanik filigri, medali Regina sine labe originali concepta, dan krusifiks perak berjuntai di ujungnya. Untuk yang dipakai seumur hidup, bukan disimpan di laci.",
    specs: [{ k: "Manik", v: "Mutiara air tawar 7–8 mm, putih" }, { k: "Rangka", v: "Kawat perak 925, puntir tangan" }, { k: "Medali", v: "Regina sine labe, oval 22 mm" }, { k: "Panjang", v: "±58 cm termasuk krusifiks" }],
    fit: "contain", image: "/assets/rosario-mutiara.webp", slot: "[ rosario mutiara ]", h: 340, tone: "violet", rot: 0, stock: 8 },
  { id: "rosario-via-lucis", name: "Rosario Saku “Via Lucis”", cat: "rosario", price: "Rp 179K", badge: "EDISI 150", image: "", slot: "[ rosario saku ]", h: 300, tone: "dark", rot: 1.1, stock: 43 },
  { id: "salib-sonokeling-kuningan", name: "Salib Dinding Sonokeling — Korpus Kuningan", cat: "salib", price: "Rp 685K", badge: "BEST SELLER", image: "/assets/salib-sonokeling-kuningan.webp", shots: ["/assets/salib-sonokeling-kuningan-full.webp"], slot: "[ salib sonokeling kuningan ]", h: 400, tone: "light", rot: -1, stock: 16 },
  { id: "krusifiks-jati", name: "Krusifiks Dinding Jati", cat: "salib", price: "Rp 545K", badge: "", image: "", slot: "[ krusifiks jati ]", h: 460, tone: "light", rot: 0.8, stock: 5 },
  { id: "krusifiks-dayak", name: "Krusifiks Ukir Dayak — Sulur Enggang", cat: "salib", price: "Rp 2.450K", base: 2450000,
    opt: { label: "UKURAN", values: ["M — 45 cm", "L — 60 cm", "XL — 80 cm"], add: [0, 950000, 2100000] },
    desc: "Satu papan meranti dipahat tembus jadi sulur yang saling mengunci — ragam hias Dayak yang biasanya menutup dinding rumah panjang dan sarung mandau, di sini mengelilingi korpus. Ujung-ujungnya melengkung seperti kepala enggang, burung yang di Kalimantan dipakai untuk menyebut yang di atas. Warnanya dikuas tangan lapis demi lapis: merah, kuning, putih, hitam — empat warna yang sama yang dipakai pada perisai dan tato adat, bukan palet yang kami pilih sendiri. Korpusnya dipahat terpisah dan disatukan tanpa sekrup dari depan. Pengerjaan satu keping enam sampai delapan minggu, dan tidak ada dua yang sama persis.",
    specs: [{ k: "Bahan", v: "Kayu meranti, pahat tembus tangan" }, { k: "Warna", v: "Cat akrilik kuas tangan, finishing matte" }, { k: "Korpus", v: "Dipahat terpisah, disatukan pasak kayu" }, { k: "Gantungan", v: "Kait logam terpasang, siap dipaku" }, { k: "Waktu buat", v: "6–8 minggu per keping" }],
    fit: "contain", badge: "HANDMADE", image: "/assets/krusifiks-dayak.webp", shots: ["/assets/krusifiks-dayak-detail.webp"], slot: "[ krusifiks ukir dayak ]", h: 540, tone: "light", rot: 0, stock: 3 },
  { id: "san-damiano-mini", name: "Salib San Damiano — Wayang", cat: "salib", price: "Rp 1.290K", base: 1290000,
    opt: { label: "UKURAN", values: ["S — 30 cm", "M — 45 cm", "L — 60 cm"], add: [0, 380000, 820000] },
    desc: "San Damiano yang ditulis ulang dalam bahasa rupa Jawa: korpus digambar seperti tokoh wayang, para saksi memakai kain batik, dan tulisannya beraksara Jawa. Dilukis tangan di atas panel kayu mahoni dengan cat tempera dan prada emas, lalu difinishing sirlak — persis cara ikon lama dibuat, hanya tokohnya orang sini.",
    specs: [{ k: "Bahan", v: "Panel mahoni, tempera telur, prada emas" }, { k: "Teknik", v: "Lukis tangan, aksara Jawa" }, { k: "Finishing", v: "Sirlak, kait gantung di belakang" }, { k: "Waktu buat", v: "3–5 minggu per keping" }],
    badge: "", fit: "contain", image: "/assets/salib-san-damiano.webp", slot: "[ san damiano wayang ]", h: 520, tone: "light", rot: 0, stock: 7 },
  { id: "ichthys-kalung-perak", name: "Kalung Ichthys Perak 925", cat: "perhiasan", price: "Rp 459K", base: 459000,
    opt: { label: "PANJANG RANTAI", values: ["40 cm", "45 cm", "50 cm"], add: [0, 0, 25000] },
    desc: "Ichthys — tanda ikan yang dulu digores diam-diam di dinding katakombe. Liontinnya dibentuk dari satu batang perak 925 yang ditekuk dan dipoles cermin, digantung pada rantai kabel halus. Kecil, tidak menjelaskan diri, dan hanya dikenali oleh yang tahu.",
    specs: [{ k: "Bahan", v: "Perak 925, poles cermin" }, { k: "Liontin", v: "22 × 9 mm" }, { k: "Rantai", v: "Kabel 1,2 mm, kaitan lobster" }, { k: "Perawatan", v: "Termasuk kain poles; lepas saat berenang" }],
    fit: "contain", badge: "BARU", image: "/assets/ichthys-kalung.webp", slot: "[ kalung ichthys perak ]", h: 380, tone: "light", rot: 0, stock: 26 },
  { id: "ichthys-anting-perak", name: "Anting Ichthys Perak 925", cat: "perhiasan", price: "Rp 385K", base: 385000,
    opt: { label: "KAITAN", values: ["French hook", "Huggie klik"], add: [0, 40000] },
    desc: "Sepasang ichthys menggantung ringan dari kait perak — cukup panjang untuk bergerak saat kepala menunduk. Dibuat dari batang perak 925 yang sama dengan kalungnya, jadi keduanya bisa dipakai sebagai satu set.",
    specs: [{ k: "Bahan", v: "Perak 925, poles cermin" }, { k: "Ukuran", v: "38 mm total, liontin 22 mm" }, { k: "Kait", v: "French hook, anti-alergi" }, { k: "Berat", v: "1,4 g per sisi" }],
    fit: "contain", badge: "BARU", image: "/assets/ichthys-anting.webp", slot: "[ anting ichthys perak ]", h: 340, tone: "violet", rot: 1.1, stock: 19 },
  { id: "cincin-ora", name: "Cincin Doa “Ora”", cat: "perhiasan", price: "Rp 189K", badge: "", image: "", slot: "[ cincin doa ]", h: 300, tone: "light", rot: 1.3, stock: 18 },
  { id: "gelang-manik-tenun", name: "Gelang Manik Tenun", cat: "perhiasan", price: "Rp 129K", badge: "", image: "", slot: "[ gelang manik ]", h: 340, tone: "light", rot: 0, stock: 64 },
  { id: "syal-tenun-sumba", name: "Syal Tenun Sumba Liturgi", cat: "apparel", price: "Rp 675K", badge: "HANDMADE",
    desc: "Tenun ikat Sumba Timur dengan monogram IHS di tengah, diapit ayam dan bintang timur — motif adat yang dipakai penenun Kristen setempat untuk kisah imannya sendiri. Kapasnya dipintal tangan, dicelup indigo dan akar mengkudu, lalu ditenun di gedogan. Dipakai sebagai syal liturgi atau kain penutup meja doa.",
    specs: [{ k: "Bahan", v: "Kapas pintal tangan, tenun ikat lungsi Sumba" }, { k: "Pengrajin", v: "Penenun mitra kami di Sumba Timur" }, { k: "Pewarna", v: "Alami — indigo (wora) & akar mengkudu (kombu)" }, { k: "Motif", v: "Monogram IHS, salib, ayam & bintang timur" }, { k: "Ukuran", v: "±190 × 40 cm, rumbai tangan di kedua ujung" }, { k: "Kemasan", v: "Kotak kado + kartu nama penenun" }],
    image: "/assets/syal-tenun-sumba.webp", slot: "[ syal tenun sumba ]", h: 460, tone: "light", rot: 0, stock: 7 },
  { id: "outer-tenun-ende", name: "Selendang Tenun Ende", cat: "apparel", price: "Rp 1.150K", badge: "",
    desc: "Selendang tenun ikat dari Ende, Flores: benang lungsinya diikat dan dicelup dulu sebelum ditenun, jadi salib, merpati, dan kuda-kudanya tumbuh dari benang — bukan dicap di permukaan. Warnanya dari indigo dan akar mengkudu, dengan pita merah bata di kedua sisi. Cukup lebar untuk dikalungkan di leher atau disampirkan di meja doa.",
    specs: [{ k: "Bahan", v: "Kapas pintal tangan, tenun ikat Ende–Lio" }, { k: "Pengrajin", v: "Penenun mitra kami di Ende, Flores" }, { k: "Pewarna", v: "Alami — indigo (tarum) & akar mengkudu" }, { k: "Motif", v: "Salib, merpati, kuda & sulur — diikat, bukan dicetak" }, { k: "Ukuran", v: "±200 × 45 cm, rumbai tangan di kedua ujung" }, { k: "Kemasan", v: "Kotak kado + kartu nama penenun" }],
    image: "/assets/selendang-tenun-ende.webp", slot: "[ selendang tenun ende ]", h: 480, tone: "light", rot: 0, stock: 4 },
  { id: "batik-agnus", name: "Kemeja Batik Tulis “Agnus”", cat: "apparel", price: "Rp 749K", badge: "", image: "", slot: "[ kemeja batik tulis ]", h: 420, tone: "light", rot: 0, stock: 9 },
  { id: "selendang-batik-kapel", name: "Selendang Batik Kapel", cat: "apparel", price: "Rp 385K", badge: "", image: "", slot: "[ selendang batik ]", h: 320, tone: "violet", rot: 0, stock: 14 },
  { id: "ikon-bunda-maria", name: "Ikon Bunda Maria — Cetak Kayu / Lino", cat: "wallart", price: "Rp 465K", base: 465000,
    opt: { label: "UKURAN", values: ["A4 — 21×29,7 cm", "A3 — 29,7×42 cm", "40×50 cm"], add: [0, 145000, 320000] },
    desc: "Bunda Maria dan Kanak-kanak Yesus dipahat sebagai tokoh wayang: mahkota sungging, kain batik, tangan berdempak seperti figur kulit. Bloknya dipahat tangan, lalu dicetak satu per satu dengan tinta hitam di atas kertas daluang buatan tangan — jadi tidak ada dua cetakan yang identik. Blok aslinya disimpan, tidak dijual.",
    specs: [{ k: "Teknik", v: "Cukil kayu/lino, cetak tangan" }, { k: "Kertas", v: "Daluang buatan tangan, tepi sobek alami" }, { k: "Tinta", v: "Tinta relief hitam, tahan cahaya" }, { k: "Edisi", v: "Bernomor & ditandatangani, tanpa bingkai" }],
    fit: "contain", badge: "HANDMADE", image: "/assets/ikon-maria-lino.webp",
    shots: ["/assets/ikon-maria-lino-kertas.webp", "/assets/ikon-maria-lino-blok.webp"],
    slot: "[ ikon maria cukil kayu ]", h: 470, tone: "light", rot: 1, stock: 11 },
  { id: "wallart-maria-line", name: "Wall Art Bunda Maria — Line Art", cat: "wallart", price: "Rp 395K", badge: "BARU", image: "/assets/wallart-maria-line.webp", shots: ["/assets/wallart-maria-line-full.webp"], slot: "[ line art bunda maria ]", h: 470, tone: "light", rot: 0.6, stock: 24 },
  { id: "poster-john146", name: "Poster Risograph “John 14:6”", cat: "wallart", price: "Rp 285K", base: 285000,
    opt: { label: "UKURAN", values: ["A3 — 29,7×42 cm", "A2 — 42×59,4 cm", "50×70 cm"], add: [0, 120000, 240000] },
    badge: "EDISI 10", fit: "contain", image: "/assets/poster-john146.webp", shots: ["/assets/poster-john146-room.webp"], slot: "[ poster risograph john 14:6 ]", h: 470, tone: "violet", rot: 0, stock: 10 },
  { id: "wallart-crown-of-thorn", name: "Wall Art “Crown of Thorn” — Kawat Berduri", cat: "wallart", price: "Rp 1.850K", badge: "BARU",
    desc: "Mahkota duri dibentuk tangan dari kawat berduri yang sengaja dibiarkan berkarat, lalu dipasang mengapung di dalam kotak bayangan berpelat kuningan. Satu keping butuh dua hari kerja: memotong, memutar, menua, menyegel. Setiap mahkota berbeda bentuk — tidak bisa diulang.",
    specs: [{ k: "Bahan", v: "Kawat berduri berkarat, pelat kuningan" }, { k: "Bingkai", v: "Kotak bayangan kayu, 60×45 cm" }, { k: "Finishing", v: "Disegel matte, siap gantung" }, { k: "Kemasan", v: "Peti kayu, kirim berasuransi" }],
    image: "/assets/wallart-crown-of-thorn.webp", shots: ["/assets/wallart-crown-of-thorn-full.webp"], slot: "[ crown of thorn — kawat berduri ]", h: 360, tone: "light", rot: 0.5, stock: 4 },
  { id: "panel-ayat-kuningan", name: "Panel Ayat Kuningan", cat: "wallart", price: "Rp 590K", badge: "", image: "", slot: "[ panel kuningan ayat ]", h: 360, tone: "dark", rot: 0, stock: 6 },
  { id: "guadalupe-nis", name: "Bunda Guadalupe dalam Nis Kayu", cat: "altar", price: "Rp 1.650K", badge: "BARU",
    desc: "Nis lipat tiga daun dari kayu mahoni, dibubut utuh dari satu blok sehingga urat kayunya menyambung dari kubah ke alas — bukan potongan yang disatukan. Dua daun sampingnya berengsel kuningan dan menutup rapat jadi bentuk peluru; dibuka, keduanya jadi dinding pemantul cahaya buat figurnya. Di dalamnya Bunda Guadalupe dicetak 3D low poly lalu dicat tangan satu per satu: mantel biru berbintang, gaun mawar, sinar keemasan di belakangnya, dan malaikat di kakinya. Bidang-bidang datar low poly-nya sengaja dibiarkan terbaca — cara baru menggambar ikon yang umurnya sudah lima abad. Cukup kecil untuk meja samping tempat tidur, cukup tertutup untuk dibawa pindah kos.",
    specs: [{ k: "Nis", v: "Kayu mahoni, engsel kuningan solid" }, { k: "Figur", v: "Cetak 3D resin, dicat tangan" }, { k: "Tinggi", v: "28 cm termasuk alas" }, { k: "Lebar", v: "27 cm terbuka, 13 cm tertutup" }, { k: "Alas", v: "Ø 13 cm, bubut satu blok" }, { k: "Kemasan", v: "Kotak kayu berlapis busa" }],
    image: "/assets/guadalupe-nis.webp", shots: ["/assets/guadalupe-nis-tutup.webp", "/assets/guadalupe-nis-kosong.webp"],
    fit: "contain", slot: "[ bunda guadalupe dalam nis ]", h: 470, tone: "light", rot: 0, stock: 7 },
  { id: "tato-sacred-heart", name: "Tato “Sacred Heart” — 8 cm", cat: "bodyart", price: "Rp 1.440K", badge: "", image: "", slot: "[ tato sacred heart ]", h: 300, tone: "light", rot: -0.9, stock: 8 },
  { id: "tato-kalvari", name: "Tato “Kalvari” — Armband 14 cm", cat: "bodyart", price: "Rp 2.520K", badge: "BY GILANG PRAWIRA", image: "/assets/tato-kalvari.webp", shots: ["/assets/tato-kalvari-full.webp"], slot: "[ armband kalvari — gilang prawira ]", h: 320, tone: "dark", rot: 1.2, stock: 6 },
  { id: "set-henna-salib", name: "Set Henna Motif Salib", cat: "bodyart", price: "Rp 145K", badge: "BARU", image: "", slot: "[ set henna ]", h: 350, tone: "light", rot: 0, stock: 25 },
  { id: "kaos-peziarah", name: "Kaos Katun “Peziarah”", cat: "merch", price: "Rp 299K", base: 299000,
    opt: { label: "UKURAN", values: ["S", "M", "L", "XL", "XXL"], add: [0, 0, 0, 0, 25000] },
    badge: "BARU", image: "/assets/kaos-peziarah-detail.webp", shots: ["/assets/kaos-peziarah.webp", "/assets/kaos-peziarah-2.webp"], slot: "[ kaos peziarah ]", h: 400, tone: "light", rot: 0.9, stock: 38 },
  { id: "bomber-bordir-angkatan", name: "Jaket Bomber Bordir Custom", cat: "merch", price: "Rp 675K", base: 675000,
    opt: { label: "UKURAN", values: ["S", "M", "L", "XL", "XXL", "XXXL"], add: [0, 0, 0, 0, 40000, 70000] },
    desc: "Jaket angkatan yang tidak terlihat seperti jaket angkatan. Satin poliester hijau tua berlapis, ritsleting menyilang, rib knit di kerah dan pergelangan. Semua tulisan dibordir timbul satu warna — nama sekolah, angkatan, moto di lengan — jadi kelihatan hanya kalau cahaya jatuh miring; tidak berteriak, tapi yang tahu langsung tahu. Patch lambang dibordir terpisah lalu dijahit di dada. Contoh di foto: Van Lith angkatan 32, “berlari tanpa batas”. Minimum 12 pcs per pesanan, produksi 10–14 hari kerja.",
    specs: [{ k: "Bahan", v: "Satin poliester berlapis, rib knit kerah & manset" }, { k: "Bordir", v: "Timbul (puff) satu warna — dada, punggung, lengan" }, { k: "Patch", v: "Bordir penuh, dijahit (bukan lem panas)" }, { k: "Warna", v: "Hijau botol, hitam, maroon, navy" }, { k: "Minimum", v: "12 pcs per pesanan" }, { k: "Produksi", v: "10–14 hari kerja setelah approval mockup" }, { k: "Perawatan", v: "Cuci dingin, balik badan, jangan disetrika di atas bordir" }],
    badge: "CUSTOM", image: "/assets/bomber-vanlith-detail.webp", shots: ["/assets/bomber-vanlith.webp", "/assets/bomber-vanlith-sleeve.webp"], slot: "[ bomber bordir angkatan ]", h: 460, tone: "dark", rot: -0.6, stock: 12 },
  { id: "tote-peziarah", name: "Tote Kanvas “Peziarah”", cat: "merch", price: "Rp 189K", badge: "", image: "/assets/tote-peziarah-2.webp", shots: ["/assets/tote-peziarah.webp", "/assets/tote-peziarah-detail.webp"], slot: "[ tote peziarah ]", h: 470, tone: "light", rot: -1.3, stock: 47 },
  { id: "tote-sendangsono", name: "Tote Kanvas Ziarah — Sendangsono", cat: "merch", price: "Rp 219K", base: 219000,
    desc: "Gua Sendangsono digambar dari sisi yang biasanya luput: bukan wajah Bunda, tapi rimbun bugenvil yang menutup batu andesitnya dan barisan lilin yang tidak pernah benar-benar mati. Ilustrasi tinta dan cat air, dicetak di kanvas katun 12 oz warna natural — mata air pertama Katolik Jawa, dibawa pulang sebagai tas yang dipakai tiap hari.",
    specs: [{ k: "Bahan", v: "Kanvas katun 12 oz, warna natural" }, { k: "Ukuran", v: "38 × 42 cm · tinggi tali 30 cm" }, { k: "Cetak", v: "DTG, tinta berbasis air — tidak kaku di kanvas" }, { k: "Ilustrasi", v: "Sendangsono — tinta & cat air, digambar tangan" }, { k: "Daya angkut", v: "Sampai 8 kg, jahitan tali diperkuat silang" }, { k: "Perawatan", v: "Cuci tangan air dingin, jangan disetrika di atas cetakan" }],
    badge: "BARU", image: "/assets/tote-sendangsono.webp", shots: ["/assets/tote-sendangsono-wall.webp"], slot: "[ tote ziarah sendangsono ]", h: 470, tone: "light", rot: 0, stock: 24 },
  { id: "tote-ganjuran", name: "Tote Kanvas Ziarah — Ganjuran", cat: "merch", price: "Rp 219K", base: 219000,
    desc: "Candi Hati Kudus Ganjuran dalam sapuan tinta dan wash abu: batur candi Hindu-Jawa yang menaungi Kristus, tangga kembar yang harus dinaiki tanpa alas kaki. Dicetak di kanvas katun 12 oz warna natural, satu-satunya warna di tas ini adalah bayangan cat airnya.",
    specs: [{ k: "Bahan", v: "Kanvas katun 12 oz, warna natural" }, { k: "Ukuran", v: "38 × 42 cm · tinggi tali 30 cm" }, { k: "Cetak", v: "DTG, tinta berbasis air — tidak kaku di kanvas" }, { k: "Ilustrasi", v: "Ganjuran — tinta & cat air, digambar tangan" }, { k: "Daya angkut", v: "Sampai 8 kg, jahitan tali diperkuat silang" }, { k: "Perawatan", v: "Cuci tangan air dingin, jangan disetrika di atas cetakan" }],
    badge: "BARU", image: "/assets/tote-ganjuran.webp", shots: ["/assets/tote-ganjuran-wall.webp"], slot: "[ tote ziarah ganjuran ]", h: 470, tone: "light", rot: 0, stock: 24 },
  { id: "tote-puhsarang", name: "Tote Kanvas Ziarah — Gereja Puhsarang", cat: "merch", price: "Rp 219K", base: 219000,
    desc: "Puhsarang dari sisi barat: kubah batu kali tanpa semen, atap sirap merah bata yang melengkung seperti perahu, dan menara Maria di sebelahnya. Satu-satunya aksen warna di kanvas ini adalah terakota atapnya — sisanya tinta hitam di kanvas katun 12 oz warna natural.",
    specs: [{ k: "Bahan", v: "Kanvas katun 12 oz, warna natural" }, { k: "Ukuran", v: "38 × 42 cm · tinggi tali 30 cm" }, { k: "Cetak", v: "DTG, tinta berbasis air — tidak kaku di kanvas" }, { k: "Ilustrasi", v: "Gereja Puhsarang — tinta & cat air, digambar tangan" }, { k: "Daya angkut", v: "Sampai 8 kg, jahitan tali diperkuat silang" }, { k: "Perawatan", v: "Cuci tangan air dingin, jangan disetrika di atas cetakan" }],
    badge: "BARU", image: "/assets/tote-puhsarang.webp", shots: ["/assets/tote-puhsarang-wall.webp"], slot: "[ tote ziarah gereja puhsarang ]", h: 470, tone: "light", rot: 0, stock: 24 },
  { id: "tote-kerep", name: "Tote Kanvas Ziarah — Gua Maria Kerep", cat: "merch", price: "Rp 219K", base: 219000,
    desc: "Gua Kerep Ambarawa digambar dari seberang: tebing batu, Bunda dalam mantel biru — satu-satunya warna dingin di seluruh seri ini — dan menara gereja tua di belakang pohon randu. Kanvas katun 12 oz warna natural, cetak DTG tinta berbasis air.",
    specs: [{ k: "Bahan", v: "Kanvas katun 12 oz, warna natural" }, { k: "Ukuran", v: "38 × 42 cm · tinggi tali 30 cm" }, { k: "Cetak", v: "DTG, tinta berbasis air — tidak kaku di kanvas" }, { k: "Ilustrasi", v: "Gua Maria Kerep — tinta & cat air, digambar tangan" }, { k: "Daya angkut", v: "Sampai 8 kg, jahitan tali diperkuat silang" }, { k: "Perawatan", v: "Cuci tangan air dingin, jangan disetrika di atas cetakan" }],
    badge: "BARU", image: "/assets/tote-kerep.webp", shots: ["/assets/tote-kerep-wall.webp"], slot: "[ tote ziarah gua maria kerep ]", h: 470, tone: "light", rot: 0, stock: 24 },
  { id: "tote-sawer-rahmat", name: "Tote Kanvas Ziarah — Gua Maria Sawer Rahmat", cat: "merch", price: "Rp 219K", base: 219000,
    desc: "Sawer Rahmat Cisantana dari depan: anggrek dan sulur menggantung menutupi mulut gua, Bunda Fatima bermahkota di tengah, semuanya terbayang lagi di air. Ilustrasi tinta dengan wash abu tua, dicetak di kanvas katun 12 oz warna natural.",
    specs: [{ k: "Bahan", v: "Kanvas katun 12 oz, warna natural" }, { k: "Ukuran", v: "38 × 42 cm · tinggi tali 30 cm" }, { k: "Cetak", v: "DTG, tinta berbasis air — tidak kaku di kanvas" }, { k: "Ilustrasi", v: "Gua Maria Sawer Rahmat — tinta & cat air, digambar tangan" }, { k: "Daya angkut", v: "Sampai 8 kg, jahitan tali diperkuat silang" }, { k: "Perawatan", v: "Cuci tangan air dingin, jangan disetrika di atas cetakan" }],
    badge: "BARU", image: "/assets/tote-sawer-rahmat.webp", shots: ["/assets/tote-sawer-rahmat-wall.webp"], slot: "[ tote ziarah gua maria sawer rahmat ]", h: 470, tone: "light", rot: 0, stock: 24 },
  { id: "bucket-peziarah", name: "Topi Bucket “Peziarah”", cat: "merch", price: "Rp 249K", base: 249000,
    opt: { label: "UKURAN", values: ["S/M", "L/XL"], add: [0, 0] },
    badge: "", image: "/assets/bucket-peziarah.webp", shots: ["/assets/bucket-peziarah-full.webp"], slot: "[ bucket hat peziarah ]", h: 300, tone: "light", rot: 0, stock: 18 },
  { id: "patch-mc-peziarah", name: "Patch Bordir “Peziarah Motorcycle Club”", cat: "merch", price: "Rp 165K", base: 165000,
    opt: { label: "UKURAN", values: ["Pocket — 9×12 cm", "Back patch — 21×28 cm"], add: [0, 145000] },
    desc: "Back patch bordir di atas denim hitam: PEZIARAH melengkung dalam benang merah bata, mesin tua digambar sekali jalan dengan benang putih. Tepinya sengaja dibiarkan mentah — dijahit sendiri ke rompi atau flanel, makin lusuh makin benar. West Java, jalan pulang lewat gunung.",
    specs: [{ k: "Bahan", v: "Denim hitam 12 oz, benang poliester" }, { k: "Teknik", v: "Bordir mesin, kerapatan penuh" }, { k: "Pemasangan", v: "Jahit tangan/mesin — tanpa lem panas" }, { k: "Perawatan", v: "Cuci dingin, jangan diputihkan" }],
    badge: "BARU", image: "/assets/patch-mc.webp", shots: ["/assets/patch-mc-worn.webp"], slot: "[ patch peziarah mc ]", h: 440, tone: "dark", rot: 0.7, stock: 60 },
  { id: "lilin-vespers", name: "Lilin Aroma “Vespers” — 220 g", cat: "lilin", price: "Rp 285K", base: 285000,
    opt: { label: "UKURAN", values: ["220 g — ±45 jam", "380 g — ±80 jam"], add: [0, 160000] },
    desc: "Profil aroma senja, dirancang untuk renungan di jam malam: Rose of Sharon di depan, Fig Leaf yang hijau dan getir di tengah, Vanilla Bean hangat di dasarnya. Lilin kedelai murni dengan sumbu katun, dituang tangan di gelas bening yang bisa dipakai ulang setelah habis.",
    specs: [{ k: "Aroma", v: "Rose of Sharon, Fig Leaf, Vanilla Bean" }, { k: "Lilin", v: "Kedelai 100%, sumbu katun tanpa timbal" }, { k: "Bakar", v: "±45 jam (220 g)" }, { k: "Wadah", v: "Gelas bening, label cetak letterpress" }],
    fit: "contain", badge: "BARU", image: "/assets/lilin-vespers.webp", slot: "[ lilin vespers ]", h: 400, tone: "light", rot: -0.8, stock: 30 },
  { id: "lilin-hortus", name: "Lilin Aroma “Hortus” — 220 g", cat: "lilin", price: "Rp 285K", badge: "", image: "", slot: "[ lilin hortus — cedar & myrrh ]", h: 320, tone: "light", rot: 0, stock: 24 },
  { id: "dopp-kit-kulit", name: "Dopp Kit Kulit — Travel Kit", cat: "carry", price: "Rp 785K",
    desc: "Kulit sapi nabati tebal yang dijahit tangan, dibiarkan tanpa lapisan sintetis supaya warnanya menua sendiri — makin sering dibawa, makin gelap dan makin kamu. Ritsleting kuningan antik, ikat tangan di sisi, dan dasar rata supaya bisa berdiri sendiri di wastafel penginapan. Cukup untuk perlengkapan mandi tiga hari perjalanan.",
    specs: [{ k: "Bahan", v: "Kulit sapi samak nabati 2,0 mm" }, { k: "Ritsleting", v: "Kuningan antik, tarikan kulit" }, { k: "Ukuran", v: "24 × 12 × 11 cm" }, { k: "Lapis dalam", v: "Kanvas katun tahan air, bisa dilap" }],
    fit: "contain", badge: "BARU", image: "/assets/dopp-kit-kulit.webp", slot: "[ dopp kit kulit ]", h: 380, tone: "light", rot: -0.8, stock: 14 },
  { id: "dry-bag-20l", name: "Dry Bag 20L “Peziarah”", cat: "carry", price: "Rp 549K", base: 549000,
    opt: { label: "KAPASITAS", values: ["20 L", "30 L"], add: [0, 120000] },
    desc: "Untuk ziarah yang hujannya tidak bisa dinegosiasi. Tarpaulin TPU dengan jahitan dilas frekuensi tinggi, tutup gulung tiga lipatan, dan kantong depan berritsleting kedap — isi tetap kering saat kamu basah kuyup. Tali bahu bisa dilepas, jadi bisa digendong atau ditenteng di bak pikap.",
    specs: [{ k: "Bahan", v: "Tarpaulin TPU 500D, jahitan dilas" }, { k: "Ketahanan", v: "IPX6 — hujan deras & percikan" }, { k: "Volume", v: "20 L (tersedia 30 L)" }, { k: "Tali", v: "Bahu empuk, bisa dilepas" }],
    fit: "contain", badge: "BARU", image: "/assets/dry-bag-20l.webp", slot: "[ dry bag 20l ]", h: 470, tone: "light", rot: 0.6, stock: 22 },
  { id: "bandana-trisquera", name: "Bandana Trisquera", cat: "merch", price: "Rp 159K",
    desc: "Trisquera — simpul tiga sudut yang tidak punya awal dan tidak punya akhir: Bapa, Putra, Roh Kudus dalam satu garis yang sama. Motifnya kami tarik ulang dari simpul Insular abad ke-8, dicetak putih gading di atas katun hitam. Dipakai di leher, di kepala, atau diikat di tali dry bag saat hujan turun.",
    specs: [{ k: "Bahan", v: "Katun 100%, 55 × 55 cm" }, { k: "Cetak", v: "Sablon dua warna, tepi jahit lipat" }, { k: "Motif", v: "Trisquera / simpul Trinitas" }, { k: "Perawatan", v: "Cuci dingin, makin lembut tiap cuci" }],
    fit: "contain", badge: "BARU", image: "/assets/bandana-trisquera.webp", slot: "[ bandana trisquera ]", h: 400, tone: "dark", rot: 1.1, stock: 55 },
  { id: "buku-confessions", name: "The Confessions — St. Agustinus (Ignatius Critical Edition)", cat: "buku", price: "Rp 425K",
    desc: "Pengakuan-pengakuan Agustinus dalam terjemahan Maria Boulding, O.S.B. — versi yang paling banyak dipakai karena bahasanya doa, bukan risalah. Edisi kritis Ignatius: teks penuh, catatan kaki, dan esai dari beberapa pembaca yang tidak selalu sepakat. Buku untuk dibaca pelan, sedikit tiap malam.",
    specs: [{ k: "Penulis", v: "Santo Agustinus dari Hippo" }, { k: "Terjemahan", v: "Maria Boulding, O.S.B." }, { k: "Penyunting", v: "David Vincent Meconi, S.J." }, { k: "Format", v: "Paperback, bahasa Inggris" }],
    fit: "contain", badge: "", image: "/assets/buku-confessions.webp", slot: "[ the confessions ]", h: 470, tone: "light", rot: -0.6, stock: 18 },
  { id: "jurnal-koptik", name: "Jurnal Jahit Koptik — Kertas Tangan", cat: "buku", price: "Rp 465K",
    desc: "Dijahit satu per satu dengan jahitan Koptik: punggungnya terbuka, benangnya kelihatan, dan halamannya bisa dibuka rata sampai 180° — enak untuk menulis sampai ke lipatan. Kertas katun buatan tangan bertepi sobek alami, sampul kain bata dengan mawar rosette dicetak timbul. Halaman terakhir sudah ada doanya; sisanya kamu yang isi.",
    specs: [{ k: "Jilid", v: "Jahit Koptik, benang katun berlapis lilin" }, { k: "Kertas", v: "Katun buatan tangan 160 gsm, deckle edge" }, { k: "Isi", v: "144 halaman, tanpa garis" }, { k: "Ukuran", v: "14 × 19 cm, sampul kain bata" }],
    fit: "contain", badge: "HANDMADE", image: "/assets/jurnal-koptik.webp", shots: ["/assets/jurnal-koptik-spread.webp"], slot: "[ jurnal jahit koptik ]", h: 500, tone: "light", rot: 0.7, stock: 12 },
  { id: "buku-allegoria", name: "Allegoria — M. Dion Wicaksono", cat: "buku", price: "Rp 315K",
    desc: "Buku yang akhirnya selesai. Kata-kata pertamanya ditulis tahun 1998, sementara titik terakhir diketik di 2026. Autofiksi kehidupan si penulis. Ditaruh di sini sebagai sebuah manifestasi.",
    specs: [{ k: "Penulis", v: "M. Dion Wicaksono" }, { k: "Format", v: "Paperback, 288 halaman" }, { k: "Cetak", v: "Sampul satu warna, kertas book paper" }, { k: "Bahasa", v: "Indonesia" }],
    fit: "contain", badge: "BARU", image: "/assets/buku-allegoria.webp", slot: "[ allegoria ]", h: 440, tone: "light", rot: 0, stock: 20 }
];

export const PRODUCTS = ALL_PRODUCTS.filter(p => p.image);

