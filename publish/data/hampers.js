// Hampers (gift sets). Single source of truth, same contract as data/products.js.
//
// Hamper shape:
//   id        string  slug
//   name      string
//   price     string  display string
//   base      number  rupiah, for the custom-builder maths
//   pieces    number  item count in the box
//   blurb     string
//   contents  string[] what is inside, in packing order
//   image     string  path or "" for the striped placeholder
//   slot      string  placeholder caption
//   tone      "light" | "dark" | "violet"
//   h         number  card media height, px (ignored when ratio is set)
//   ratio     string  optional CSS aspect-ratio for photo cards, e.g. "4 / 5"
//   badge     string
//   occasions string[] must match OCCASIONS ids

export const OCCASIONS = [
  { id: "natal",    name: "Natal" },
  { id: "paskah",   name: "Paskah" },
  { id: "baptis",   name: "Baptis" },
  { id: "komuni",   name: "Komuni Pertama" },
  { id: "nikah",    name: "Pernikahan" },
  { id: "duka",     name: "Duka" }
];

export const HAMPERS = [
  { id: "hampers-peziarah", name: "Hampers “Peziarah”", price: "Rp 850K", base: 850000, pieces: 5,
    badge: "PALING DIPILIH",
    blurb: "Satu set untuk orang yang baru mulai — atau baru kembali. Isinya bisa dipakai setiap hari, bukan disimpan di lemari.",
    contents: ["Rosario kayu sonokeling", "Tote kanvas “Peziarah”", "Jurnal perjalanan kecil", "Buku doa saku", "Lilin kedelai aroma kemenyan", "Kartu tulis tangan"],
    occasions: ["natal", "baptis", "komuni"],
    image: "/assets/hampers-peziarah-set.webp", slot: "[ hampers peziarah ]", tone: "light", h: 460 },

  { id: "hampers-adven", name: "Hampers Adven", price: "Rp 450K", base: 450000, pieces: 4,
    badge: "",
    blurb: "Kotak kecil untuk empat minggu menunggu. Dikirim akhir November supaya sampai sebelum minggu pertama.",
    contents: ["Lilin Adven 4 batang", "Buku renungan harian", "Rosario saku “Via Lucis”", "Kartu tulis tangan"],
    occasions: ["natal"],
    image: "/assets/hampers-adven.webp", slot: "", tone: "violet", h: 460, ratio: "4 / 5" },

  { id: "hampers-kalvari", name: "Hampers “Kalvari”", price: "Rp 1.650K", base: 1650000, pieces: 6,
    badge: "EDISI TERBATAS",
    blurb: "Set paling berat yang kami kirim. Untuk penanda besar — pernikahan, kaul, atau ulang tahun yang bulat.",
    contents: ["Salib dinding sonokeling — korpus kuningan", "Selendang batik kapel", "Poster risograf 50×70 cm", "Panel ayat kuningan mini", "Lilin kedelai aroma cedar", "Kartu tulis tangan"],
    occasions: ["nikah", "paskah"],
    image: "/assets/salib-sonokeling-kuningan.webp", slot: "[ hampers kalvari ]", tone: "dark", h: 420 },

  { id: "hampers-pernikahan", name: "Hampers Pernikahan “Lima Roti Dua Ikan”", price: "Rp 1.950K", base: 1950000, pieces: 8,
    page: "/hampers/pernikahan/",
    badge: "BISA DIUKIR NAMA",
    blurb: "Untuk pasangan yang baru saling berjanji. Temanya mukjizat lima roti dan dua ikan — yang sedikit, kalau diserahkan, jadi cukup untuk banyak orang. Nama dan tanggal pernikahan kami ukir di tutup kotaknya.",
    contents: ["Pendant kuningan “5 roti 2 ikan” — sepasang, bisa dipakai sebagai bros", "Kotak kayu putih, ukir nama pasangan & tanggal", "Buku Misa Pernikahan bersampul kulit — nama dicetak", "Rosario mutiara air tawar, krusifiks kuningan", "Lilin lebah “Matrimony” 1 batang", "Botol kecil minyak Krisma", "Kaleng “Panis Angelicus” — kue kering rumahan", "Kartu berkat tulis tangan"],
    occasions: ["nikah"],
    image: "/assets/hampers-pernikahan.webp", slot: "", tone: "light", h: 460, ratio: "4 / 5" },

  { id: "hampers-penghiburan", name: "Hampers Penghiburan", price: "Rp 690K", base: 690000, pieces: 4,
    badge: "",
    blurb: "Dikirim tanpa pita, tanpa warna terang. Untuk rumah yang sedang berkabung — kami tulis kartunya sesuai pesanmu.",
    contents: ["Rosario mutiara air tawar", "Lilin kedelai putih 2 batang", "Buku doa arwah", "Kartu tulis tangan"],
    occasions: ["duka"],
    image: "/assets/hampers-penghiburan.webp", slot: "", tone: "light", h: 460, ratio: "4 / 5" }
];

// Custom / bulk hampers: parish, office, school orders.
export const BULK = { min: 25, discount: 0.15, lead: "10–14 hari kerja" };
