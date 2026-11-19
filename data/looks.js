// "Katolik Yang Mana Kamu?" — the Christian-core lookbook (/christian-core/).
// One persona = one look. Names, stories and photos live here; product names,
// prices, options and buy mode (pre-order / WhatsApp-only / sold) always come
// from data/products.js, so a price change there shows up here automatically.
//
//   slug     URL of the share page: /christian-core/<slug>/ (built by
//            _src/christian-core/build.py) and the in-page hash #<slug>
//   wears    option index the model wears, per product (same as ?opt= on /produk/)
//   angles   one photo per angle; two angles = Depan/Belakang switch.
//            Photos are 900 × 1118 on white. top/feet = head and feet in % of
//            the photo height, used to stand every model on the same floor line.
//            spots: product id + x/y in % of the photo.
//   others   note for things in the photo that are not in the catalog
//   photo:false  persona without a photo yet (outline figure, story only)
//
// Tone (owner, 19 Nov 2026): funny and warm, never sarcastic. Real people
// everyone meets at church, or recognises in themselves. Sacred things are
// never the joke.

export const PERSONAS = [
  { slug: "omk-boys", name: "OMK Boys", sub: "Anak Tongkrongan Paroki",
    mood: "Rumah keduanya punya menara lonceng.",
    story: "Kalau dicari di kos tidak ada, coba cek ruang rapat paroki. Dia yang memasang tenda Paskah, menggulung kabel sound sesudah Misa, dan tahu di laci mana kunci gudang disimpan. Koster memanggilnya dengan nama depan, ibu-ibu dapur menyisihkan satu nasi kotak untuknya. Rapat evaluasinya bisa sampai jam sebelas malam, lalu ditutup dengan main kartu dan tawa yang agak terlalu keras untuk jam segitu.",
    nudge: "Biasanya dia juga yang terakhir mematikan lampu aula.",
    height: 168, size: "M",
    others: "Kacamata, celana, dan sepatu di foto bukan dari Peziarah.",
    wears: { "bandana-triquetra": 3, "hoodie-berkah-dalem": 1, "tote-sendangsono": 1, "knuckle-duster-yesaya": 0 },
    angles: [
      { label: "Depan", image: "/assets/lookbook/omk-boys-depan.webp", top: 6.7, feet: 96.2,
        spots: [{ product: "bandana-triquetra", x: 50, y: 23 }, { product: "hoodie-berkah-dalem", x: 58, y: 32 }, { product: "tote-sendangsono", x: 65, y: 53 }] },
      { label: "Belakang", image: "/assets/lookbook/omk-boys-belakang.webp", top: 7.6, feet: 97.0,
        spots: [{ product: "hoodie-berkah-dalem", x: 46, y: 31 }, { product: "knuckle-duster-yesaya", x: 41, y: 45 }, { product: "tote-sendangsono", x: 48, y: 58 }] }
    ] },
  { slug: "katolik-ktp", name: "Katolik KTP", sub: "Spesialis Paskah & Natal",
    mood: "Setahun dua kali, dan selalu datang dengan versi terbaiknya.",
    story: "Jalan ke gereja tetap hafal, walau cuma dilewati saat Natal dan Paskah. Berdiri, duduk, berlutut: dia ikut saja bapak di bangku depan, dan sejauh ini belum pernah meleset. Lengannya bertato tiga salib Kalvari, kacamata hitamnya baru dilepas setelah dapat tempat duduk. Lalu “Malam Kudus” mulai dinyanyikan, dan suaranya ikut keluar, pelan, hafal sampai bait terakhir.",
    nudge: "Mungkin ini kamu, mungkin sepupumu. Bangku gereja selalu muat satu lagi.",
    others: "Kaos, celana, sepatu, dan kacamata di foto belum ada di katalog Peziarah.",
    wears: { "bandana-triquetra": 3, "bagcharm-berkah-dalem": 0, "tato-kalvari": 0 },
    angles: [
      { label: "Depan", image: "/assets/lookbook/katolik-ktp.webp", top: 7.2, feet: 96.2,
        spots: [{ product: "bandana-triquetra", x: 50, y: 26 }, { product: "tato-kalvari", x: 64, y: 46.5 }, { product: "bagcharm-berkah-dalem", x: 42, y: 60 }] }
    ] },
  { slug: "choir-diva", name: "Choir Diva", sub: "Aktivis Koor",
    mood: "Nomor lagunya sudah di kepala sebelum papan nomor dipasang.",
    story: "Begitu petugas menempel angka di papan, dia sudah bergumam nadanya. Datang sejam sebelum Misa untuk pemanasan, kipasnya bergerak pelan mengikuti tempo, dan dia tahu persis kapan suara dua harus masuk. Kalau dirigen lupa memberi aba-aba, dia yang mengangguk kecil ke barisan alto. Di latihan, kalimat favoritnya: “Sekali lagi, dari refrein.”",
    nudge: "Kalau Misa minggu ini terdengar indah, ada dia di balkon.",
    others: "Dress batik, kipas, gelang, dan kacamata di foto belum ada di katalog Peziarah.",
    wears: { "ichthys-anting-perak": 0, "ichthys-kalung-perak": 0 },
    angles: [
      { label: "Depan", image: "/assets/lookbook/choir-diva.webp", top: 8.1, feet: 96.9,
        spots: [{ product: "ichthys-anting-perak", x: 46, y: 18.5 }, { product: "ichthys-kalung-perak", x: 51, y: 27.5 }] }
    ] },
  { slug: "satpam-rohani", name: "Satpam Rohani", sub: "Bapak Pengurus Lingkungan", photo: false,
    mood: "Tes, satu, dua. Rosario lingkungan siap dimulai.",
    story: "Paling awal datang, paling akhir pulang. Dia yang menyalakan genset, menata kursi plastik, dan mengetes mik dengan dua ketukan yang sangat yakin. Kantong kolekte berpindah dari tangannya secepat dan serapi pit stop balapan, tidak ada satu baris pun yang terlewat. Kemejanya batik, gantungan kunci motornya salib kayu, dan wanginya perpaduan minyak kayu putih, balsam, dan kopi hitam yang entah kenapa menenangkan.",
    nudge: "Setiap lingkungan punya satu. Semoga gensetnya awet." },
  { slug: "pasukan-elit-doa", name: "Pasukan Elit Doa", sub: "Ibu WKRI / Legio Maria", photo: false,
    mood: "Kalendernya penuh novena, tasnya penuh persiapan.",
    story: "Jadwal doanya lebih padat dari jadwal arisan, dan dua-duanya tetap jalan. Brokatnya rapi, bros Bunda Maria-nya berkilau, dan tas kainnya muat segalanya: payung lipat, brosur ziarah, permen jahe, dan botol minum yang cukup untuk satu rombongan. Dia tahu warna liturgi minggu ini tanpa melihat kalender, dan dengan sabar membisikkan nomor halaman kalau kamu tertinggal.",
    nudge: "Kalau kamu pernah dipinjami payung sepulang Misa, kamu sudah bertemu beliau." },
  { slug: "vip-lounge-altar", name: "VIP Lounge Altar", sub: "Bapak Prodiakon", photo: false,
    mood: "Langkahnya tenang, tangannya mantap, alba-nya licin.",
    story: "Dia berjalan di lorong gereja dengan ketenangan yang bikin anak kecil ikut diam. Saat membagikan Komuni, tangannya bergerak hati-hati, seolah membawa hal paling berharga di dunia, karena memang begitu. Begitu alba dilepas di sakristi, jaket touring dipakai lagi, HP dicek sebentar, dan dia pulang naik motor sebagai bapak-bapak gang yang sama.",
    nudge: "Pelayan di altar, tetangga di gang. Dua-duanya sungguhan." },
  { slug: "sekte-kipas-angin", name: "Sekte Kipas Angin", sub: "Pasukan Tenda Parkiran", photo: false,
    mood: "Ikut Misa dari tenda, ditemani angin sepoi dan wangi bakso.",
    story: "Di dalam gedung terasa gerah, jadi dia memilih tenda di parkiran: lebih semilir, katanya. Datang pas lonceng berbunyi, rosario di tangan kanan, kipas suvenir nikahan di tangan kiri. Konsentrasinya sesekali diuji wangi bakso dari luar pagar dan HP yang bergetar di pangkuan, tapi begitu Bapa Kami dimulai, dia berdiri dan suaranya paling lantang di barisannya.",
    nudge: "Gereja tidak berhenti di pintu. Tenda parkiran juga bagian dari umat." }
];

// Short labels for hotspot tags and chips (the full name comes from products.js).
export const SHORT = {
  "hoodie-berkah-dalem": "Hoodie Berkah Dalem",
  "bandana-triquetra": "Bandana Triquetra",
  "tote-sendangsono": "Tote Sendangsono",
  "knuckle-duster-yesaya": "Knuckle Duster Yesaya",
  "bagcharm-berkah-dalem": "Bag Charm Berkah Dalem",
  "tato-kalvari": "Tato Kalvari",
  "ichthys-kalung-perak": "Kalung Ichthys",
  "ichthys-anting-perak": "Anting Ichthys"
};

// The quiz. Each answer adds one point to the personas listed in `p`.
// Ties go to the persona that comes first in PERSONAS (photo first).
export const QUIZ = [
  { q: "Misa Minggu jam 07.00. Kamu sampai jam berapa?",
    a: [{ t: "05.45. Kunci aula aku yang pegang.", p: ["omk-boys", "satpam-rohani"] },
        { t: "06.00. Pemanasan suara dulu.", p: ["choir-diva"] },
        { t: "06.30. Biar dapat bangku dekat Bunda Maria.", p: ["pasukan-elit-doa", "vip-lounge-altar"] },
        { t: "07.00 pas. Loncengnya jadi alarmku.", p: ["sekte-kipas-angin", "katolik-ktp"] }] },
  { q: "Tempat duduk favoritmu?",
    a: [{ t: "Balkon, dekat organ.", p: ["choir-diva"] },
        { t: "Bangku depan, sebelah lorong.", p: ["vip-lounge-altar", "pasukan-elit-doa"] },
        { t: "Belakang dekat pintu, siap kalau dimintai tolong.", p: ["omk-boys", "satpam-rohani"] },
        { t: "Tenda parkiran. Anginnya juara.", p: ["sekte-kipas-angin"] },
        { t: "Di mana saja, asal bisa lihat bapak di depan.", p: ["katolik-ktp"] }] },
  { q: "Isi tasmu kalau ke gereja?",
    a: [{ t: "Payung lipat, permen jahe, botol minum besar.", p: ["pasukan-elit-doa"] },
        { t: "Kunci gudang, lakban, kabel roll.", p: ["omk-boys", "satpam-rohani"] },
        { t: "Partitur dan pelega tenggorokan.", p: ["choir-diva"] },
        { t: "Kipas suvenir nikahan.", p: ["sekte-kipas-angin"] },
        { t: "HP dan kacamata hitam. Cukup.", p: ["katolik-ktp", "vip-lounge-altar"] }] },
  { q: "Sesudah Misa, kamu biasanya…",
    a: [{ t: "Rapat evaluasi, lanjut main kartu.", p: ["omk-boys"] },
        { t: "Menumpuk kursi plastik dan menghitung kolekte.", p: ["satpam-rohani"] },
        { t: "Langsung ke tukang bakso depan pagar.", p: ["sekte-kipas-angin", "katolik-ktp"] },
        { t: "Lanjut novena di rumah umat.", p: ["pasukan-elit-doa"] },
        { t: "Melipat alba, pulang naik motor.", p: ["vip-lounge-altar"] },
        { t: "Bahas lagu minggu depan.", p: ["choir-diva"] }] },
  { q: "Momen Misa yang paling kamu tunggu?",
    a: [{ t: "“Malam Kudus”. Setahun sekali, tapi hafal.", p: ["katolik-ktp"] },
        { t: "Mazmur, waktu suara dua masuk pas.", p: ["choir-diva"] },
        { t: "Komuni, waktu semuanya hening.", p: ["vip-lounge-altar"] },
        { t: "Pengumuman. Siapa tahu ada kerja bakti.", p: ["omk-boys", "satpam-rohani"] },
        { t: "Doa Rosario di bulan Mei dan Oktober.", p: ["pasukan-elit-doa"] },
        { t: "Bapa Kami. Aku berdiri paling lantang.", p: ["sekte-kipas-angin"] }] }
];

export function quizResult(answers) {
  const score = Object.fromEntries(PERSONAS.map(x => [x.slug, 0]));
  answers.forEach((ai, qi) => { const a = QUIZ[qi] && QUIZ[qi].a[ai]; if (a) a.p.forEach(s => { score[s] += 1; }); });
  let best = PERSONAS[0].slug;
  PERSONAS.forEach(x => { if (score[x.slug] > score[best]) best = x.slug; });
  return best;
}

// Personas whose photo shows this product (for the "Dipakai di tampilan" link on /produk/<id>/).
export function looksFor(productId) {
  return PERSONAS.filter(x => (x.angles || []).some(a => a.spots.some(s => s.product === productId)));
}

export const LOOKBOOK_URL = "/christian-core/";
