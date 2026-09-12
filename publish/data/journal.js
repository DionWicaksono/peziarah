// Journal content. Single source of truth — a CMS can replace this module with a
// fetch of the same shape.
//
// FOUR PILLARS, divided by whose voice it is:
//   produk    — brand voice: motif, pengrajin, studio process
//   iman      — reader voice (UGC): submitted stories, quote-led cards
//   ziarah    — place-based writing: pilgrimage routes and shrines
//   editorial — editor voice: opinion, essay, liturgical calendar column
//
// Post shape:
//   id       string  slug (article pages not built yet — links resolve to #)
//   pillar   string  must match a PILLARS id
//   kolom    string  optional recurring-column label shown above the title
//   title    string
//   dek      string  one-sentence standfirst
//   author   string
//   date     string  display date, id-ID
//   read     number  minutes
//   image    string  path or "" for the striped placeholder
//   slot     string  placeholder caption
//   feature  bool    true for the one lead story (only ever one)
//
// UGC posts (pillar "iman") additionally carry, and are rendered differently:
//   quote    string  the reader's own line — pulled large, replaces the dek
//   paroki   string  parish, for the credit line
//   kota     string  city, for the credit line
// UGC cards deliberately omit read time: they are testimony, not features.

export const PILLARS = [
  { id: "produk",    name: "Cerita Produk", note: "Motif, pengrajin, studio" },
  { id: "iman",      name: "Cerita Iman",   note: "Dikirim pembaca", ugc: true },
  { id: "ziarah",    name: "Catatan Ziarah", note: "Perjalanan & tempat" },
  { id: "editorial", name: "Editorial",     note: "Opini & esai" }
];

export const POSTS = [
  { id: "muntilan-dua-hari", pillar: "produk", kolom: "Pengrajin",
    title: "Dua hari di Muntilan",
    dek: "Pak Sujadi sudah merangkai rosario sejak 1987. Ia menghitung dengan telinga, bukan mata.",
    author: "Renata Silalahi", date: "28 Juni 2026", read: 11,
    image: "/assets/hero-rosario.webp", slot: "[ bengkel rosario muntilan ]" },

  { id: "tenun-ende-yang-hampir-hilang", pillar: "produk", kolom: "Pengrajin",
    title: "Tenun Ende yang hampir hilang",
    dek: "Dari 40 penenun di satu kampung, tinggal sembilan. Delapan di antaranya berusia di atas 60.",
    author: "Maria Kusumaningrum", date: "3 Mei 2026", read: 14,
    image: "/assets/selendang-tenun-ende.webp", slot: "[ foto: penenun ende ]" },

  // — Cerita Iman (UGC) —
  { id: "ugc-rosario-di-saku-jas", pillar: "iman",
    quote: "Rosario itu ada di saku jas saya waktu sidang tesis. Tidak saya keluarkan, cuma saya pegang.",
    dek: "Bertahan di ruang sidang selama dua jam empat puluh menit, tanpa sekali pun terlihat.",
    author: "Ratna Widyaningrum", paroki: "Paroki Kristus Raja", kota: "Surabaya", date: "1 Agustus 2026",
    image: "", slot: "[ foto kiriman pembaca ]" },

  { id: "ugc-kaos-untuk-bapak", pillar: "iman",
    quote: "Bapak saya tidak pernah mau pakai kaos rohani. Yang ini dipakainya tiap Sabtu.",
    dek: "Soal memberi hadiah iman kepada orang tua yang tidak suka dibilang religius.",
    author: "Bernard Tanjung", paroki: "Paroki St. Yakobus", kota: "Medan", date: "19 Juli 2026",
    image: "/assets/kaos-peziarah-2.webp", slot: "[ foto kiriman pembaca ]" },

  { id: "ugc-kembali-setelah-sebelas-tahun", pillar: "iman",
    quote: "Sebelas tahun saya tidak masuk gereja. Yang membawa saya kembali bukan khotbah — tapi undangan makan siang.",
    dek: "Kiriman terpanjang yang kami terima bulan ini, dipotong seperlunya saja.",
    author: "Andreas Lim", paroki: "Paroki Katedral", kota: "Jakarta", date: "5 Juli 2026",
    image: "", slot: "[ foto kiriman pembaca ]" },

  { id: "ugc-tato-nama-ibu", pillar: "iman",
    quote: "Saya minta tanggal kematian ibu saya di dalam salibnya. Gilang menolak dua kali sebelum akhirnya mau.",
    dek: "Kenapa penolakan itu ternyata yang paling ia syukuri.",
    author: "Fransiskus Wanggai", paroki: "Paroki Sang Penebus", kota: "Sorong", date: "12 Juni 2026",
    image: "", slot: "[ foto kiriman pembaca ]" },

  // — Catatan Ziarah —
  { id: "sendangsono-tanpa-rombongan", pillar: "ziarah", route: "sendangsono",
    title: "Sendangsono tanpa rombongan",
    dek: "Datang sendiri di hari kerja, tanpa bus, tanpa jadwal. Catatan perjalanan yang tidak direncanakan.",
    author: "Maria Kusumaningrum", date: "14 Juni 2026", read: 8,
    image: "/assets/sendangsono-gua.webp", slot: "[ foto: jalan setapak sendangsono ]" },

  { id: "ganjuran-jam-empat-pagi", pillar: "ziarah", route: "ganjuran",
    title: "Ganjuran, jam empat pagi",
    dek: "Sebelum peziarah lain datang, candi itu terasa seperti milik siapa pun yang mau bangun paling pagi.",
    author: "Dion Wicaksono", date: "27 Mei 2026", read: 9,
    image: "/assets/ganjuran-candi.webp", slot: "[ foto: candi ganjuran subuh ]" },

  { id: "muntilan-orang-yang-memulai", pillar: "ziarah", route: "muntilan",
    title: "Muntilan, dan orang yang memulai semuanya",
    dek: "Sebuah museum kecil, satu makam di halaman belakang, dan alasan kenapa hampir semua rute ziarah Jawa lewat kota ini.",
    author: "Renata Silalahi", date: "22 Juli 2026", read: 10,
    image: "/assets/vanlith-portrait.webp", slot: "" },

  { id: "tiga-gereja-dalam-satu-hari", pillar: "ziarah", route: "semarang-tiga-gereja",
    title: "Tiga gereja tua dalam satu hari di Semarang",
    dek: "Rute jalan kaki 6,4 km, tiga arsitektur yang saling tidak bicara, dan satu warung soto di antaranya.",
    author: "Renata Silalahi", date: "8 Mei 2026", read: 10,
    image: "/assets/semarang-blenduk.webp", slot: "[ foto: gereja blenduk semarang ]" },

  { id: "puhsarang-batu-tanpa-semen", pillar: "ziarah", route: "puhsarang",
    title: "Puhsarang: batu yang disusun tanpa semen",
    dek: "Gereja paling aneh di Jawa Timur dirancang orang yang lebih dulu terkenal karena membangun kampus teknik.",
    author: "Maria Kusumaningrum", date: "2 Juli 2026", read: 11,
    image: "/assets/puhsarang-hero.webp", slot: "[ foto: gereja puhsarang kediri ]" },

  { id: "menyusun-rute-sendiri", pillar: "ziarah", route: "custom",
    title: "Menyusun rute ziarah rombonganmu sendiri",
    dek: "Rute terbaik biasanya bukan yang paling terkenal, tapi yang punya alasan. Cara menyusunnya dari nol.",
    author: "Dion Wicaksono", date: "11 Juni 2026", read: 9,
    image: "/assets/peta-gua-maria-jawa.webp", slot: "[ foto: rapat panitia ziarah paroki ]" },

  { id: "gua-maria-kerep-ambarawa", pillar: "ziarah",
    title: "Gua Maria Kerep, dan patung yang terlalu besar untuk difoto",
    dek: "Gua kecil dari tahun 1950-an, lalu sebuah patung raksasa di halaman yang sama. Dua cara memuliakan yang tidak selalu akur.",
    author: "Dion Wicaksono", date: "8 Agustus 2026", read: 9,
    image: "/assets/kerep-gua.webp", slot: "[ foto: gua maria kerep ambarawa ]",
    photoCredit: "Foto oleh Elisabeth Woro Setyowati" },

  { id: "shuttle-kerkhof-sendangsono", pillar: "ziarah", route: "sendangsono",
    title: "Shuttle Kerkhof Muntilan–Sendangsono, dan kenapa kami akhirnya menyewa satu mobil",
    dek: "Sebelas kilometer yang selama ini bikin orang batal ziarah sendiri. Sekarang ada mobil yang jalan bolak-balik setiap hari, empat trip.",
    author: "Dion Wicaksono", date: "29 Agustus 2026", read: 7,
    image: "/assets/shuttle-hero.webp", slot: "[ foto: shuttle bus peziarah ]" },

  // — Editorial —
  { id: "warna-ungu-dan-kenapa", pillar: "editorial", kolom: "Kalender Liturgi",
    title: "Ungu, dan kenapa kami memakainya sepanjang tahun",
    dek: "Warna Adven dan Prapaskah dipakai gereja hanya dua kali setahun. Kami memakainya terus — ini alasannya.",
    author: "Dion Wicaksono", date: "2 Juni 2026", read: 5,
    image: "/assets/hampers-adven.webp", slot: "[ swatch ungu liturgi ]" },

  { id: "batas-merch-iman", pillar: "editorial",
    title: "Di mana batas merch iman",
    dek: "Ada barang yang kami tolak produksi. Daftarnya lebih panjang daripada katalognya.",
    author: "Dion Wicaksono", date: "16 Mei 2026", read: 9,
    image: "/assets/tato-kalvari.webp", slot: "[ tato salib kalvari ]" },

  { id: "ketika-romo-berulah", pillar: "editorial",
    title: "Ketika Romo “berulah”, umat harus bagaimana",
    dek: "Lima cara umat menanggapi kabar soal imamnya sendiri — dan kenapa hampir semuanya salah alamat.",
    author: "Dion Wicaksono", date: "4 September 2026", read: 15,
    image: "/assets/romo-berulah.webp", slot: "" },

  { id: "devosi-bukan-estetika", pillar: "editorial", feature: true,
    title: "Devosi bukan estetika — tapi estetika bukan dosa",
    dek: "Soal tuduhan bahwa toko seperti kami menjual iman sebagai gaya hidup. Sebagian tuduhannya benar.",
    author: "Renata Silalahi", date: "21 April 2026", read: 11,
    image: "/assets/ikon-maria-lino.webp", slot: "[ ilustrasi: rak devosi ]" }
];

// Evergreen service journalism — always visible, deliberately NOT a pillar so it
// doesn't compete with the front page for attention.
export const PANDUAN = [
  { id: "kado-yang-tidak-bikin-canggung", title: "Kado iman yang tidak bikin canggung", sub: "Untuk orang yang tidak seagama denganmu." },
  { id: "merawat-batik-tulis", title: "Merawat batik tulis", sub: "Lerak, jemur balik, gulung — jangan dilipat." },
  { id: "cara-berdoa-rosario", title: "Cara berdoa rosario", sub: "Lima peristiwa, satu putaran, sepuluh menit." },
  { id: "memilih-ukuran-salib-dinding", title: "Memilih ukuran salib dinding", sub: "Aturan sepertiga lebar bidang kosong." }
];

// UGC submission terms, surfaced on the page so expectations are set up front.
export const KIRIMAN = { max: 600, moderasi: "2–5 hari kerja", kredit: "Nama, paroki, kota" };
