// Route detail content — one entry per pilgrimage destination offered on the
// Ziarah page. This is the single source of truth for BOTH the route cards on
// Ziarah.dc.html and the detail pages rendered by Rute.dc.html.
//
// Route shape:
//   id            string  slug; Rute.dc.html#<id>
//   name          string  full name, used as page H1
//   short         string  short name for cards, breadcrumbs, related rails
//   region        string  uppercase locality line
//   tagline       string  one line under the H1
//   note          string  the card blurb on Ziarah.dc.html
//   tags          array   pill labels on the card
//   image/heroAlt string  hero photo (empty = striped placeholder)
//   h             number  card media height, px
//   durasi        string  headline duration
//   medan         string  terrain in one clause
//   akses         string  accessibility note — always answer this honestly
//   tenang        string  when it is quiet
//   intro         array   2-3 paragraphs of context
//   sorotan       array   {title, body} — what you actually see there
//   itinerary     array   {day, items:[{time, title, body}]}
//   praktis       array   [label, value] rows for the practical table
//   catatan       array   planning caveats (lansia, anak, cuaca, jadwal misa)
//   post          string  matching Catatan Ziarah slug in data/journal.js
//   produk        array   product ids surfaced as "bawa/oleh-oleh" rail
//
// Adding a route: add an entry here, and a matching `route` key on its post in
// data/journal.js if a written note exists. Nothing else needs editing.

export const ROUTES = [
  {
    id: "sendangsono",
    seoName: "Sendangsono",
    name: "Sendangsono & Makam Rm. Sanjaya",
    short: "Sendangsono",
    region: "KULON PROGO, DIY",
    tagline: "Gua Maria di antara pohon sono — batu kali, mata air, dan jalan salib yang menanjak perlahan.",
    note: "Gua Maria di antara pohon sono, dirancang Romo Mangunwijaya. Paling tenang di hari kerja.",
    tags: ["1 HARI", "JALAN KAKI RINGAN", "COCOK LANSIA"],
    image: "/assets/sendangsono-hero.webp",
    heroAlt: "Gua Maria Sendangsono — patung Bunda Maria di gua batu kali, dikelilingi bunga dan lilin peziarah",
    h: 300,
    durasi: "1 hari penuh",
    medan: "Undakan batu, jalan setapak menurun ke sendang",
    akses: "Sebagian jalur berupa tangga batu tanpa pegangan — kursi roda tidak bisa sampai gua. Area atas dan kapel bisa diakses.",
    tenang: "Selasa–Kamis sebelum jam sepuluh",
    intro: [
      "Sendangsono adalah tempat di mana Katolik Jawa punya tanggal lahirnya sendiri: Desember 1904, di mata air di bawah gua, Romo Frans van Lith membaptis kelompok besar orang Jawa dari Kalibawang. Yang berdiri di sini sekarang bukan monumen atas peristiwa itu, melainkan kompleks ziarah yang dibangun jauh sesudahnya.",
      "Yang membuatnya berbeda dari hampir semua gua Maria di Jawa adalah arsitekturnya. Kompleks ini dirancang Y.B. Mangunwijaya dengan bahan yang tidak berusaha terlihat suci — batu kali disusun tangan, kayu, tanah. Tidak ada marmer, tidak ada permukaan yang memantulkan cahaya.",
      "Untuk rombongan, Sendangsono adalah titik yang paling mudah dijalani: satu hari cukup, medannya ringan, dan hampir selalu bisa digabung dengan Muntilan yang jaraknya sebelas kilometer."
    ],
    sorotan: [
      { title: "Gua dan mata air", body: "Sendang — mata air — yang memberi nama tempat ini, di bawah gua utama. Peziarah membawa jeriken; airnya air, dan tidak ada yang menjanjikan apa pun kepada siapa pun." },
      { title: "Jalan salib batu kali", body: "Empat belas perhentian menyusuri lereng, semuanya dari batu susun tangan. Ritmenya bisa diatur sendiri kalau kamu tidak datang dengan bus." },
      { title: "Arsitektur Mangunwijaya", body: "Undakan, dinding, dan bidang duduk dirancang mengikuti kontur tanah, bukan meratakannya. Untuk tempat yang menampung ribuan orang di bulan puncak, kompleks ini anehnya tidak berteriak." },
      { title: "Kerkhof Muntilan (Makam Rm. Sanjaya)", body: "Titik tambahan sekitar sebelas kilometer: kompleks pemakaman tua yang orang setempat sebut kerkhof — dari bahasa Belanda untuk kuburan. Di sini dimakamkan Rm. Sanjaya, dan titik ini jarang masuk itinerary bus." }
    ],
    itinerary: [
      { day: "HARI 1 — SATU HARI PENUH", items: [
        { time: "05.30", title: "Berangkat dari Yogyakarta", body: "± 40 km lewat Jalan Godean–Nanggulan, 1,5 jam. Berangkat sebelum subuh kalau ingin sampai sebelum peziarah lain." },
        { time: "07.00", title: "Tiba di kompleks, misa atau ibadat pembuka", body: "Slot misa rombongan harus dipesan lebih dulu ke pengelola. Tanpa pemesanan, ibadat sabda dipimpin pendamping rohani rombongan." },
        { time: "08.00", title: "Jalan salib", body: "Empat belas perhentian, sekitar 60–90 menit tergantung ritme. Rombongan campur usia sebaiknya dibagi dua kelompok dengan dua pendamping." },
        { time: "09.45", title: "Gua Maria dan sendang", body: "Waktu bebas, doa pribadi, mengambil air. Bawa botol sendiri; tidak ada yang berjualan sepagi ini." },
        { time: "11.30", title: "Makan siang di Muntilan", body: "Soto dan tahu di sekitar pasar lebih baik daripada rumah makan besar yang biasa dipakai bus." },
        { time: "13.00", title: "Museum Misi Muntilan & makam Romo van Lith", body: "Satu jam minimum. Ini konteks yang membuat pagi tadi masuk akal — lihat rute Muntilan untuk detailnya." },
        { time: "15.30", title: "Kembali ke Yogyakarta", body: "Sampai kota sebelum jam lima, sebelum lalu lintas sore mengunci Jalan Magelang." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Banjaroya, Kalibawang, Kulon Progo, DIY"],
      ["Dari Yogyakarta", "± 40 km, 1,5 jam"],
      ["Dari Muntilan", "± 11 km, 30 menit"],
      ["Puncak peziarah", "Mei & Oktober, dan setiap malam Jumat pertama"],
      ["Biaya masuk", "Tanpa tiket; kotak persembahan di dekat gua"],
      ["Fasilitas", "Toilet, parkir bus, warung di luar gerbang, area misa terbuka"],
      ["Sinyal", "Tipis di jalur pulang arah Nanggulan"]
    ],
    catatan: [
      "Batu di dekat sendang licin sepanjang tahun — sandal atau sepatu yang boleh basah.",
      "Bawa uang tunai kecil. Lilin, air, dan parkir tidak menerima QRIS.",
      "Bulan Mei dan Oktober sangat ramai; untuk rombongan lansia hindari dua bulan itu.",
      "Slot misa harus dipesan berbulan-bulan sebelumnya di musim puncak."
    ],
    post: "sendangsono-tanpa-rombongan",
    produk: ["rosario-sonokeling", "kaos-peziarah", "tote-peziarah"]
  },

  {
    id: "ganjuran",
    seoName: "Ganjuran",
    name: "Candi Hati Kudus Ganjuran",
    short: "Ganjuran",
    region: "BANTUL, DIY",
    tagline: "Hati Kudus Yesus dipahat sebagai raja Jawa, bersila di dalam bilik candi.",
    note: "Hati Kudus Yesus dalam wujud arca Jawa. Misa subuh dan tirta perwitasari.",
    tags: ["1 HARI", "MISA SUBUH"],
    image: "/assets/ganjuran-candi.webp",
    heroAlt: "Candi Hati Kudus Yesus Ganjuran — candi batu bergaya Jawa di halaman gereja, dengan tangga naik ke arca Hati Kudus",
    h: 340,
    durasi: "Setengah hari, atau 1 hari digabung pantai selatan",
    medan: "Datar; undakan candi untuk mencapai bilik arca",
    akses: "Area kompleks datar dan ramah kursi roda. Bilik arca di atas undakan — tidak bisa diakses kursi roda.",
    tenang: "04.00–06.30 hari kerja",
    intro: [
      "Hampir semua tempat ziarah Katolik di Jawa punya bentuk yang bisa diduga: gua batu, patung dalam jubah biru-putih, deretan bangku. Ganjuran tidak. Di tengah kompleksnya berdiri sebuah candi dengan proporsi dan susunan batu Hindu-Jawa, dan di bilik puncaknya ada arca Hati Kudus Yesus yang dipahat sebagai raja Jawa — bersila, bermahkota Jawa.",
      "Candi ini dibangun keluarga Schmutzer pada 1924, pemilik pabrik gula di Gondanglipuro. Keputusan mereka bukan sekadar selera arsitektur: mereka memilih untuk tidak mengimpor bentuk Eropa ke tanah yang sudah punya bahasa rupanya sendiri.",
      "Gempa 2006 merusak berat gedung gerejanya; candi batunya bertahan. Gereja yang berdiri sekarang adalah bangunan pengganti — lebih terbuka, dan sengaja dibuat tidak menyaingi candi di sebelahnya."
    ],
    sorotan: [
      { title: "Arca Hati Kudus dalam bilik candi", body: "Untuk melihatnya kamu naik undakan dan melepas sandal, sama seperti masuk candi mana pun. Tidak ada antrean sebelum jam tujuh pagi." },
      { title: "Misa Jawa dengan gamelan", body: "Pada jadwal tertentu, misa diiringi gamelan dan jemaat menyanyi hafal — yang paling hafal justru yang paling tua. Konfirmasi jadwalnya ke paroki." },
      { title: "Tirta Perwitasari", body: "Sumber air di sisi kompleks. Antreannya panjang di akhir pekan dan kosong jam lima pagi hari Selasa. Bawa wadah sendiri." },
      { title: "Kompleks pagi hari", body: "Antara jam empat dan lima, tidak ada pengeras suara, tidak ada yang mengatur siapa duduk di mana. Sistem itu runtuh begitu bus pertama masuk sekitar setengah tujuh." }
    ],
    itinerary: [
      { day: "OPSI A — SETENGAH HARI, MISA SUBUH", items: [
        { time: "03.45", title: "Berangkat dari Yogyakarta", body: "± 20 km lewat Jalan Bantul, 45 menit. Menginap di Bantul kalau tidak mau berangkat sedini ini." },
        { time: "04.30", title: "Kompleks sebelum terang", body: "Waktu paling sepi dalam sehari. Doa pribadi, naik ke bilik arca tanpa antre." },
        { time: "05.00", title: "Misa subuh", body: "Kalau kebetulan Misa Jawa, gamelannya bukan tempelan untuk turis." },
        { time: "06.15", title: "Tirta Perwitasari", body: "Mengambil air tanpa antrean. Rombongan besar tetap perlu 30 menit di sini." },
        { time: "07.00", title: "Sarapan di Bantul, lalu pulang", body: "Selesai sebelum kompleks ramai; rombongan sampai Yogyakarta sebelum jam sembilan." }
      ] },
      { day: "OPSI B — SATU HARI PENUH", items: [
        { time: "04.30–07.00", title: "Ganjuran seperti Opsi A", body: "Misa subuh dan waktu bebas di kompleks." },
        { time: "08.30", title: "Gereja HKTY Ganjuran & sekitarnya", body: "Bangunan pengganti pasca-2006 dan area katekese; cocok untuk rombongan sekolah." },
        { time: "11.00", title: "Pantai selatan Bantul", body: "Parangtritis atau Depok, tergantung selera rombongan. Titik istirahat, bukan titik doa." },
        { time: "14.00", title: "Kembali ke Yogyakarta", body: "Sampai kota sekitar jam tiga." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Sumbermulyo, Bambanglipuro, Bantul, DIY"],
      ["Dari Yogyakarta", "± 20 km, 45 menit"],
      ["Misa harian", "Subuh; Misa Jawa pada jadwal tertentu — konfirmasi ke paroki"],
      ["Biaya masuk", "Tanpa tiket; kotak persembahan di dekat candi"],
      ["Fasilitas", "Toilet, parkir bus, area misa rombongan, pedagang di luar gerbang"],
      ["Digabung dengan", "Pantai selatan Bantul, atau Sendangsono dengan tambah satu hari"]
    ],
    catatan: [
      "Lepas sandal sebelum naik undakan candi. Tidak ada yang menegur, tapi semua orang melakukannya.",
      "Untuk misa subuh rombongan, menginap di Bantul atau Yogyakarta selatan — bukan di pusat kota.",
      "Airnya air. Kalau ada yang menjual sesuatu di sekitar kompleks dengan janji hasil tertentu, itu urusan dagang orang tersebut.",
      "Akhir pekan sangat ramai; untuk keheningan datang hari kerja."
    ],
    post: "ganjuran-jam-empat-pagi",
    produk: ["rosario-mutiara", "syal-tenun-sumba", "kaos-peziarah"]
  },

  {
    id: "muntilan",
    seoName: "Muntilan",
    name: "Muntilan — Museum Misi & Makam Romo van Lith",
    short: "Muntilan",
    region: "MAGELANG, JATENG",
    tagline: "Titik awal Katolik Jawa: sebuah sekolah, sebuah museum, dan satu makam yang sangat sederhana.",
    note: "Titik awal Katolik Jawa. Sering digabung dengan Sendangsono dalam satu hari.",
    tags: ["1 HARI", "HISTORIS"],
    image: "/assets/muntilan-aerial-kini.webp",
    heroAlt: "Foto udara kompleks Muntilan — SMA Van Lith dan Gereja Muntilan",
    h: 300,
    durasi: "Setengah hari; 1 hari digabung Sendangsono",
    medan: "Datar, dalam ruangan dan halaman",
    akses: "Bangunan satu lantai dengan lantai ubin rata — paling ramah kursi roda di antara semua rute ini.",
    tenang: "Pagi hari kerja, di luar musim kunjungan sekolah",
    intro: [
      "Kalau kamu pernah ikut ziarah rombongan di Jawa Tengah, kemungkinan besar bus kamu berhenti di Muntilan — biasanya untuk makan, kadang untuk mampir ke satu museum dengan durasi kunjungan dua puluh menit. Dua puluh menit itu tidak cukup.",
      "Frans van Lith datang ke Muntilan pada 1896 dan mengambil kesimpulan yang waktu itu tidak populer: kalau Gereja mau berakar di Jawa, ia tidak boleh berdiri sebagai lembaga asing yang menawarkan bantuan. Ia harus masuk ke dalam bahasa dan cara berpikir Jawa — dan alatnya bukan khotbah, tapi sekolah.",
      "Dari lingkungan sekolah guru yang ia dirikan keluar Albertus Soegijapranata, uskup pertama berkebangsaan Indonesia, dan I.J. Kasimo, politikus yang duduk di kabinet Indonesia awal. Untuk rombongan sekolah dan katekis, Muntilan adalah perhentian yang paling banyak isinya."
    ],
    sorotan: [
      { title: "Museum Misi Muntilan", body: "Koleksi dari paroki-paroki tua sekitarnya: benda liturgi, mesin cetak lama, foto hitam-putih, papan keterangan yang dicetak sederhana. Tidak ada layar sentuh; datang untuk membaca." },
      { title: "Makam Romo van Lith", body: "Di kompleks yang sama, jauh lebih sederhana daripada makam banyak orang yang jasanya lebih kecil. Ia meninggal 1926 — sebelum republik ini ada." },
      { title: "Kompleks sekolah", body: "Bangunan rendah berlantai ubin yang dulunya sekolah guru. Berdiri di halamannya adalah bagian yang paling sulit dijelaskan di brosur mana pun." },
      { title: "Kuliner pasar Muntilan", body: "Soto dan tahu di sekitar pasar. Lebih baik, dan lebih murah, daripada rumah makan besar di jalan utama." }
    ],
    itinerary: [
      { day: "DIGABUNG SENDANGSONO — SATU HARI", items: [
        { time: "05.30", title: "Berangkat dari Yogyakarta", body: "Sendangsono dulu, Muntilan sesudahnya. Urutan ini yang kami sarankan — tapi kalau rombongan ingin konteks sejarah lebih dulu, boleh dibalik." },
        { time: "11.30", title: "Makan siang di Muntilan", body: "Sekitar pasar, bukan rumah makan bus." },
        { time: "13.00", title: "Museum Misi Muntilan", body: "Satu jam minimum, dua jam untuk rombongan yang membaca papan keterangan. Telepon dulu — hari tertentu tutup." },
        { time: "14.15", title: "Makam Romo van Lith", body: "Doa singkat di kompleks belakang. Rombongan biasanya diam saja di sini, dan itu tidak perlu diisi." },
        { time: "15.00", title: "Kembali ke Yogyakarta", body: "± 25 km, 45–60 menit lewat Jalan Magelang." }
      ] },
      { day: "MUNTILAN SAJA — SETENGAH HARI", items: [
        { time: "08.00", title: "Tiba di museum", body: "Paling sepi sebelum rombongan sekolah masuk." },
        { time: "10.00", title: "Makam dan kompleks sekolah", body: "Waktu bebas, cocok untuk sesi refleksi katekese di halaman." },
        { time: "11.30", title: "Makan siang, selesai", body: "Rombongan bisa lanjut ke Borobudur atau Magelang kota kalau ada waktu sisa." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Muntilan, Kabupaten Magelang, Jawa Tengah"],
      ["Dari Yogyakarta", "± 25 km, 45–60 menit"],
      ["Dari Sendangsono", "± 11 km, 30 menit"],
      ["Jam buka", "Pagi–sore; tutup pada hari tertentu — konfirmasi dulu"],
      ["Biaya masuk", "Sumbangan sukarela"],
      ["Fasilitas", "Toilet, parkir bus, ruang pertemuan untuk rombongan"],
      ["Cocok untuk", "Rombongan sekolah, katekis, OMK, siapa pun yang mau sejarah sebelum devosi"]
    ],
    catatan: [
      "Telepon dulu sebelum datang. Informasi jam buka di internet sering tidak diperbarui.",
      "Alokasikan satu jam penuh, bukan dua puluh menit seperti jadwal bus pada umumnya.",
      "Bawa tunai kecil untuk sumbangan dan parkir.",
      "Rombongan besar sebaiknya dibagi dua gelombang — ruang koleksinya tidak luas."
    ],
    galeri: [
      { src: "/assets/vanlith-portrait.webp", ratio: "5 / 7",
        caption: "Franciscus Georgius Josephus van Lith (1863–1926) — di Jawa cukup disebut Frans van Lith. Ia datang ke Muntilan pada 1896 dan dimakamkan di kompleks yang sama." },
      { src: "/assets/muntilan-aerial-1930.webp", ratio: "3 / 2",
        caption: "Kompleks Muntilan dari udara pada masa kolonial: deret bangunan sekolah, halaman dalam, dan sawah yang mengelilinginya." },
      { src: "/assets/muntilan-aerial-kini.webp", ratio: "4 / 3",
        caption: "Kompleks yang sama hari ini — SMA Van Lith dan Gereja Muntilan. Sebagian besar denah aslinya masih terbaca dari atas." }
    ],
    post: "muntilan-orang-yang-memulai",
    produk: ["buku-confessions", "jurnal-koptik", "tote-peziarah"]
  },

  {
    id: "semarang-tiga-gereja",
    seoName: "3 Gereja Tua Semarang",
    name: "Tiga Gereja Tua Semarang",
    short: "Semarang",
    region: "SEMARANG, JATENG",
    tagline: "Rute jalan kaki 6,4 km melewati tiga bangunan dari tiga zaman yang saling tidak bicara.",
    note: "Rute jalan kaki 6,4 km melewati tiga arsitektur dari tiga zaman. Ada soto di antaranya.",
    tags: ["1 HARI", "JALAN KAKI 6 KM", "MUDA"],
    image: "/assets/semarang-blenduk.webp",
    heroAlt: "Gereja Blenduk di Kota Lama Semarang — kubah tembaga merah dan dua menara jam bercat putih",
    h: 360,
    durasi: "1 hari, 07.00–14.00",
    medan: "Trotoar kota; datar sampai Gedangan, menanjak ke Randusari",
    akses: "Tidak cocok untuk lansia, kursi roda, atau anak kecil sebagai rute jalan kaki. Versi mobil antar-titik tersedia dan datar di ketiga lokasi.",
    tenang: "Sebelum jam delapan pagi di Kota Lama",
    intro: [
      "Semarang cocok untuk rute jalan kaki karena bangunan tuanya berkumpul, bukan tersebar. Tiga gereja dalam rute ini dibangun pada tiga zaman berbeda, oleh tiga kelompok yang tidak sedang bicara satu sama lain — dan tidak satu pun dirancang untuk dilihat sebagai bagian dari rangkaian.",
      "Perlu disebut sejak awal supaya rutenya jujur: Gereja Blenduk bukan gereja Katolik. Ia gereja Protestan, GPIB Immanuel, dan berdiri di Kota Lama sejak pertengahan abad ke-18. Ia masuk rute ini karena tidak mungkin bicara soal bagaimana iman Kristen masuk ke kota ini tanpa berdiri di depan bangunan tertua yang masih dipakai.",
      "Rute ini kami sarankan untuk OMK dan rombongan muda. Enam kilometer bukan prestasi, tapi kamu akan tahu bentuk kotanya — dan tidak ada bus yang bisa memberi itu."
    ],
    sorotan: [
      { title: "Gereja Blenduk, Kota Lama", body: "Kubah tembaga yang menamai bangunannya — \"blenduk\" artinya kubah, dan nama itu diberikan orang di luar gerejanya. Datang sebelum jam delapan kalau tidak mau masuk ke foto pranikah orang lain." },
      { title: "St. Yusuf Gedangan", body: "Gereja Katolik tertua di Semarang, berdiri sejak 1875. Gelap, tinggi, banyak kayu, dan paling sedikit difoto orang — menurut kami perhentian terbaik di rute ini." },
      { title: "Katedral Randusari", body: "Gereja Santa Perawan Maria Ratu Rosario Suci, katedral Keuskupan Agung Semarang, akhir 1920-an. Terang dan tegas: dibangun untuk menampung, bukan untuk menyelipkan." },
      { title: "Soto Semarang di antaranya", body: "Kuah bening, potongan ayam, sate kerang di piring kecil yang selalu terlihat lebih banyak dari yang kamu niatkan. Bukan tempelan — rute jalan kaki di kota tropis gagal karena orang meremehkan jumlah perhentian." }
    ],
    itinerary: [
      { day: "HARI 1 — VERSI JALAN KAKI", items: [
        { time: "07.00", title: "Gereja Blenduk, Kota Lama", body: "Kota Lama masih setengah bangun. Bagian luar bisa dilihat bebas; masuk ke dalam tergantung jadwal ibadah." },
        { time: "08.15", title: "Jalan ke arah selatan", body: "± 2,5 km. Trotoarnya bagus di Kota Lama dan berhenti mendadak setelahnya — sepatu, bukan sandal." },
        { time: "09.30", title: "St. Yusuf Gedangan", body: "Tanpa tiket, tanpa petugas penyambut. Sisakan 30 menit untuk duduk di dalam." },
        { time: "11.15", title: "Soto, dan perhentian wajib", body: "Hitung tiga perhentian sepanjang hari, bukan satu. Isi ulang air di warung." },
        { time: "13.00", title: "Katedral Randusari", body: "± 2 km menanjak dari Gedangan. Cek jadwal misa harian; masuk lebih mudah tepat sesudah misa." },
        { time: "14.00", title: "Selesai", body: "Rombongan bisa lanjut ke Lawang Sewu atau kembali ke Kota Lama untuk sore." }
      ] },
      { day: "VERSI MOBIL — UNTUK ROMBONGAN CAMPUR USIA", items: [
        { time: "08.00", title: "Randusari lebih dulu", body: "Urutan dibalik supaya bus mudah menunggu dan Kota Lama jadi titik terakhir." },
        { time: "10.00", title: "St. Yusuf Gedangan", body: "Parkir bus terbatas — turunkan peserta, bus menunggu di titik terpisah." },
        { time: "12.00", title: "Makan siang", body: "Soto Semarang, area Gedangan atau Kota Lama." },
        { time: "13.30", title: "Kota Lama & Blenduk", body: "Titik terakhir, area datar, waktu bebas dan foto rombongan." }
      ] }
    ],
    praktis: [
      ["Rute", "Blenduk (Kota Lama) → St. Yusuf Gedangan → Katedral Randusari"],
      ["Jarak", "± 6,4 km jalan kaki; tambah 20% untuk salah jalan"],
      ["Waktu", "07.00–14.00 termasuk makan dan perhentian"],
      ["Biaya masuk", "Tanpa tiket; siapkan tunai untuk makan dan sumbangan"],
      ["Fasilitas", "Toilet di kafe Kota Lama dan di kompleks gereja; air isi ulang di warung"],
      ["Catatan penting", "Blenduk adalah gereja Protestan — masuk rute sebagai bangunan sejarah, bukan titik devosi Katolik"]
    ],
    catatan: [
      "Mulai jam tujuh pagi. Bukan saran — Semarang jam satu siang tidak bisa diajak jalan kaki.",
      "Sepatu, bukan sandal. Trotoarnya berhenti dan mulai tanpa pola.",
      "Bawa air satu liter per orang; tidak ada penjual air antara Gedangan dan Randusari.",
      "Untuk rombongan di atas 25 orang, pakai versi mobil antar-titik dan balik urutannya."
    ],
    post: "tiga-gereja-dalam-satu-hari",
    produk: ["kaos-peziarah", "bucket-peziarah", "dry-bag-20l"]
  },

  {
    id: "puhsarang",
    seoName: "Puhsarang",
    name: "Gua Maria Lourdes Puhsarang",
    short: "Puhsarang",
    region: "KEDIRI, JATIM",
    tagline: "Gereja 1936 yang berdiri tanpa semen, plus jalan salib empat belas perhentian di lereng.",
    note: "Kompleks batu tanpa semen karya Maclaine Pont, plus jalan salib di lereng.",
    tags: ["2 HARI 1 MALAM", "JALAN SALIB"],
    image: "/assets/puhsarang-hero.webp",
    heroAlt: "Gereja Puhsarang Kediri — atap genteng melengkung di atas dinding batu kali yang disusun tanpa semen",
    h: 320,
    durasi: "2 hari 1 malam",
    medan: "Area gua datar; jalan salib menanjak di lereng bukit",
    akses: "Area gua dan gereja datar serta bisa diakses kursi roda. Jalan salib lereng tidak bisa — dan tidak perlu dipaksakan.",
    tenang: "Selasa–Kamis pagi",
    intro: [
      "Ada dua cara sampai ke Puhsarang. Yang pertama seperti kebanyakan orang: langsung ke Gua Maria Lourdes, foto, pulang. Yang kedua: masuk lewat gerejanya dulu, dan berdiri di dalamnya sampai kamu sadar bahwa bangunan itu seharusnya tidak bisa berdiri.",
      "Gua Marianya baru dibangun akhir 1990-an; gerejanya dari 1936. Henri Maclaine Pont — lebih dulu dikenal sebagai perancang kampus teknik di Bandung — menyusun batu gereja ini tanpa semen portland sebagai pengikat utama, mengandalkan bentuk batu, perhitungan tekanan, dan adukan kapur. Bangunan ini berdiri karena geometri, bukan karena lem.",
      "Untuk rombongan, ini rute dua hari: satu hari untuk kompleks dan jalan salib penuh, satu untuk perjalanan dan misa. Titik yang paling perlu direncanakan adalah lerengnya."
    ],
    sorotan: [
      { title: "Gereja 1936", body: "Bentuk atapnya tidak mengikuti langgam gereja Eropa mana pun; orang menyebutnya perahu, joglo terbalik, mulut gua. Semuanya salah sedikit dan benar sedikit." },
      { title: "Pieta", body: "Menurut kami karya terbaik di seluruh area, dan yang paling sering dilewati rombongan karena letaknya tidak di jalur foto. Proporsinya tidak manis — dan justru karena itu ia bekerja." },
      { title: "Jalan salib lereng", body: "Empat belas perhentian menanjak, jarak antar-perhentian cukup jauh, licin kalau hujan turun sore sebelumnya. Sebagian peserta akan berhenti di perhentian keenam, dan itu tidak masalah." },
      { title: "Gua Maria Lourdes", body: "Besar, terawat, dan sangat ramai di akhir pekan. Ada area luas untuk misa rombongan dan tempat lilin. Kalau butuh sepi, datang Selasa pagi." }
    ],
    itinerary: [
      { day: "HARI 1 — PERJALANAN & MISA", items: [
        { time: "07.00", title: "Berangkat dari Surabaya", body: "± 130 km, 3 jam. Dari Kediri kota hanya 10 km, 25 menit." },
        { time: "11.00", title: "Tiba, masuk lewat gereja 1936", body: "Bukan langsung ke gua. Urutan ini mengubah seluruh kunjungan." },
        { time: "12.00", title: "Makan siang di area kompleks", body: "Pedagang di luar gerbang; untuk rombongan besar pesan lebih dulu." },
        { time: "14.00", title: "Misa rombongan", body: "Slot harus dipesan lebih dulu — jangan datang dan berharap dapat waktu." },
        { time: "16.00", title: "Gua Maria Lourdes & Pieta", body: "Waktu bebas. Sisakan sepuluh menit khusus untuk berdiri di depan Pieta." },
        { time: "18.00", title: "Check-in penginapan Kediri", body: "Kelas penginapan adalah komponen terbesar yang bisa diatur untuk menekan biaya per orang." }
      ] },
      { day: "HARI 2 — JALAN SALIB & PULANG", items: [
        { time: "06.00", title: "Jalan salib lereng", body: "Sebelum jam delapan, sebelum panas. Dua pendamping: satu memimpin, satu di kelompok belakang." },
        { time: "08.30", title: "Sarapan, waktu bebas", body: "Peserta yang tidak ikut lereng menunggu di area gua yang datar." },
        { time: "10.00", title: "Ibadat penutup", body: "Di area gua atau kapel, dipimpin pendamping rohani rombongan." },
        { time: "11.30", title: "Perjalanan pulang", body: "Sampai Surabaya sekitar jam tiga; ke Yogyakarta jauh lebih panjang — pertimbangkan menginap dua malam." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Puhsarang, Semen, Kabupaten Kediri, Jawa Timur"],
      ["Dari Kediri kota", "± 10 km, 25 menit"],
      ["Dari Surabaya", "± 130 km, 3 jam"],
      ["Puncak peziarah", "Mei & Oktober, dan setiap akhir pekan"],
      ["Biaya masuk", "Tanpa tiket; parkir dan sumbangan tunai"],
      ["Fasilitas", "Toilet, parkir bus, area misa besar, pedagang, penginapan di Kediri kota"],
      ["Catatan medan", "Lereng jalan salib tidak ramah kursi roda; area gua datar dan bisa diakses"]
    ],
    catatan: [
      "Masuk dari gereja 1936, bukan langsung ke gua. Urutannya penting.",
      "Jalan salib pagi sebelum jam delapan atau sore setelah jam empat — jangan tengah hari.",
      "Sepatu bersol kasar untuk lereng; sandal jepit ide buruk.",
      "Sejak awal jangan menjanjikan bahwa semua peserta harus sampai perhentian keempat belas."
    ],
    post: "puhsarang-batu-tanpa-semen",
    produk: ["rosario-regina-lucis", "salib-sonokeling-kuningan", "dry-bag-20l"]
  },

  {
    id: "kerep",
    seoName: "Gua Kerep",
    name: "Gua Maria Kerep Ambarawa",
    short: "Kerep",
    region: "AMBARAWA, JAWA TENGAH",
    tagline: "Gua batu dari 1950-an dan patung Bunda Maria Assumpta puluhan meter, di halaman yang sama.",
    note: "Gua tua dari 1950-an dan patung Assumpta yang jauh lebih baru. Datang sebelum jam delapan.",
    tags: ["1 HARI", "MEDAN RINGAN", "COCOK LANSIA"],
    image: "/assets/kerep-gua.webp",
    heroAlt: "Gua Maria Kerep Ambarawa pada malam hari — patung Bunda Maria bercahaya di ceruk batu, dikelilingi karangan bunga dan deretan lilin peziarah",
    h: 300,
    durasi: "Setengah hari; 1 hari kalau digabung Semarang",
    medan: "Kompleks datar dengan beberapa bagian menanjak pelan",
    akses: "Sebagian besar kompleks bisa dilalui pelan-pelan oleh peserta lansia. Jalur ke gua beraspal; ada tanjakan pendek menuju area patung.",
    tenang: "Hari kerja sebelum jam delapan pagi",
    intro: [
      "Ada dua tempat di halaman yang sama di Kerep, dan keduanya bekerja dengan cara yang berbeda. Yang pertama gua kecil dari pertengahan 1950-an — batu, pagar rendah, lelehan lilin yang bertumpuk bertahun-tahun. Yang kedua patung Bunda Maria Assumpta setinggi puluhan meter, diresmikan pertengahan 2010-an, yang tidak bisa masuk satu foto kalau kamu berdiri terlalu dekat.",
      "Perbedaan itu bukan sekadar soal ukuran. Patung mengumpulkan orang yang semula tidak berniat berziarah; gua menahan orang yang sudah berhenti. Untuk rombongan, keputusan pentingnya cuma satu: mana yang kamu kunjungi lebih dulu.",
      "Kerep cocok sebagai titik setengah hari — dekat Semarang, medannya ringan, tanpa tiket masuk. Paling sering kami pasang berpasangan dengan rute tiga gereja tua Semarang di hari yang sama."
    ],
    sorotan: [
      { title: "Gua tua (1950-an)", body: "Bagian tertua kompleks, dan masih terasa seperti tempat doa kampung: sederhana, sedikit lembap, tidak dirancang untuk kamera. Cukup kecil untuk membuat kamu merasa sedang berkunjung, bukan sedang menonton." },
      { title: "Patung Maria Assumpta", body: "Puluhan meter, berdiri di atas pilar bergaya klasik, menandai lokasi kompleks jauh sebelum kamu melihat gerbangnya. Sempat disebut salah satu yang tertinggi di kawasan ini." },
      { title: "Jalan salib", body: "Menyusuri kompleks dengan ritme yang bisa diatur sendiri kalau kamu tidak datang bersama bus. Pagi hari kerja, hampir seluruh jalur bisa dilalui tanpa berhenti menunggu rombongan lain." },
      { title: "Udara Ambarawa", body: "Lebih dingin dari Semarang, terutama pagi dan setelah hujan. Ini juga alasan paling praktis untuk datang awal." }
    ],
    itinerary: [
      { day: "SETENGAH HARI — VERSI YANG KAMI SARANKAN", items: [
        { time: "06.00", title: "Berangkat dari Semarang", body: "± 40 km, 1–1,5 jam tergantung lalu lintas. Dari Yogyakarta ± 90 km lewat Magelang, 2,5–3 jam — berangkat jam empat." },
        { time: "07.15", title: "Masuk lewat gua, bukan patung", body: "Ini urutan yang membedakan harimu. Rombongan yang berfoto lebih dulu hampir selalu kehilangan ritme untuk berdoa sesudahnya." },
        { time: "08.00", title: "Jalan salib", body: "Sekitar 60–75 menit dengan rombongan campur usia. Bagi dua kelompok kalau ada peserta lansia." },
        { time: "09.30", title: "Patung Assumpta dan waktu foto", body: "Foto jadi penutup, bukan pembuka. Kompleks mulai penuh menjelang tengah hari, jadi bagian ini justru paling longgar sekarang." },
        { time: "10.30", title: "Lanjut atau pulang", body: "Kalau digabung Semarang, jalan balik ke kota untuk gereja tua sesudah makan siang. Kalau berhenti di sini, sampai Semarang sebelum jam dua." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Kerep, Ambarawa, Kabupaten Semarang, Jawa Tengah"],
      ["Dari Semarang", "± 40 km, 1–1,5 jam"],
      ["Dari Yogyakarta", "± 90 km lewat Magelang, 2,5–3 jam"],
      ["Biaya masuk", "Tanpa tiket; kotak persembahan di dalam kompleks"],
      ["Puncak peziarah", "Mei & Oktober, dan akhir pekan menjelang tengah hari"],
      ["Fasilitas", "Toilet, parkir bus, penjual lilin dan bunga, area misa terbuka"],
      ["Catatan medan", "Kompleks relatif ramah lansia; ada tanjakan pendek ke area patung"]
    ],
    catatan: [
      "Balik urutannya untuk rombongan: gua dan jalan salib dulu, patung terakhir.",
      "Datang sebelum jam delapan kalau ingin gua yang sepi.",
      "Bawa jaket tipis — Ambarawa lebih dingin dari Semarang.",
      "Uang tunai kecil untuk lilin, bunga, dan parkir.",
      "Mei dan Oktober jauh lebih ramai; untuk rombongan lansia pilih bulan lain."
    ],
    post: "gua-maria-kerep-ambarawa",
    produk: ["rosario-mutiara", "kaos-peziarah", "tote-peziarah"]
  },

  {
    id: "sawer-rahmat",
    seoName: "Sawer Rahmat",
    name: "Gua Maria Fatima Sawer Rahmat",
    short: "Sawer Rahmat",
    region: "CISANTANA, KUNINGAN, JABAR",
    tagline: "464 anak tangga di lereng timur Ciremai — jalan salibnya bukan pelengkap, ia rutenya sendiri.",
    note: "Jalan salib menanjak 464 anak tangga di lereng Ciremai, berakhir di gua yang sangat sederhana.",
    tags: ["1 HARI", "JALAN SALIB MENANJAK", "UDARA DINGIN"],
    image: "/assets/sawer-rahmat-gua.webp",
    heroAlt: "Gua Maria Sawer Rahmat Cisantana — patung Bunda Maria Fatima di ceruk batu, dikelilingi pakis, orkid, dan undakan berlumut",
    h: 340,
    durasi: "1 hari dari Cirebon; 2 hari dari Jakarta atau Bandung",
    medan: "464 anak tangga menanjak, ± 1 km, sebagian berlumut",
    akses: "Tidak bisa diakses kursi roda, dan tidak bisa dibuat bisa. Area bawah — Taman Getsemani, kapel, parkir — datar; gua di puncak hanya lewat tangga.",
    tenang: "Hari kerja pagi, di luar Jumat Kliwon dan masa Prapaskah",
    intro: [
      "Di hampir semua gua Maria di Jawa, jalan salib adalah tambahan: kamu bisa melewatinya dan tetap sampai ke gua. Di Cisantana tidak bisa. Gua itu berada di puncak Bukit Totombok, dan satu-satunya jalan ke sana adalah 464 anak tangga yang menanjak melewati perhentian satu per satu. Rutenya memaksa bentuk doanya.",
      "Kompleksnya mulai dibangun 1988 atas inisiatif penduduk Cisantana sendiri, dan diberkati Kardinal Jozef Tomko pada 21 Juli 1990. Namanya datang dari Curug Sawer di kaki bukit — sawer, air yang jatuh terus-menerus, dibagikan. Orang setempat lebih sering menyebutnya Gua Maria Totombok, dari nama bukit yang dulu dianggap tidak pernah menguntungkan kalau dijadikan sawah.",
      "Ini titik ziarah utama untuk umat di Jawa Barat — Bandung, Cirebon, Bekasi, Jakarta — dan kompleks yang paling sering kami sarankan untuk rombongan yang mampu jalan. Untuk rombongan lansia, kami biasanya menyarankan rute lain, dan mengatakannya sejak usulan pertama."
    ],
    sorotan: [
      { title: "Jalan salib 464 anak tangga", body: "Dimulai dari Taman Getsemani di bawah, empat belas perhentian menanjak sepanjang ± 1 km di bawah pohon rimbun. Satu jam untuk rombongan yang berdoa di setiap perhentian — bukan angka yang bisa ditawar dengan berjalan lebih cepat." },
      { title: "Salib besar di perhentian kedua belas", body: "Titik tertinggi yang paling terbuka, dan tempat rombongan biasanya paling lama berhenti tanpa disuruh. Dari sini lereng timur Ciremai terlihat utuh kalau pagi belum berkabut." },
      { title: "Gua dan pancuran air", body: "Gua di puncak sangat sederhana — patung Bunda Maria Fatima putih, lilin, pakis dan orkid yang tumbuh sampai ke mulut gua. Di sisinya beberapa pancuran dari Curug Sawer; peziarah membasuh muka dan mengambil air. Airnya air." },
      { title: "Pemakaman di dekat parkir", body: "Nisan salib dan nisan pipih lonjong dalam satu pagar. Cigugur adalah daerah di mana mesjid dan gereja berdiri berdekatan, dan pemakaman itu menjelaskannya lebih cepat daripada kalimat mana pun di papan keterangan." }
    ],
    itinerary: [
      { day: "1 HARI — DARI CIREBON ATAU KUNINGAN", items: [
        { time: "05.30", title: "Berangkat dari Cirebon", body: "± 35 km, 1–1,5 jam lewat Sumber–Cigugur. Dari pusat kota Kuningan hanya ± 8 km, 15–20 menit." },
        { time: "07.00", title: "Ibadat pembuka di Taman Getsemani", body: "Area datar di bawah, cukup untuk rombongan satu bus. Kapel di dekatnya bisa dipakai untuk misa — slotnya harus dipesan lebih dulu." },
        { time: "07.30", title: "Jalan salib naik", body: "Satu jam sampai satu setengah jam. Dua pendamping: satu memimpin di depan, satu bertahan di kelompok paling belakang. Jangan menjanjikan seluruh rombongan sampai perhentian keempat belas." },
        { time: "09.00", title: "Gua Maria, doa pribadi, pancuran", body: "Waktu bebas minimum 45 menit. Bawa botol sendiri; di puncak tidak ada yang berjualan." },
        { time: "10.30", title: "Turun, dan pasar suvenir", body: "Turun lebih cepat dan lebih licin daripada naik. Di bawah ada pedagang rosario, patung, dan lilin." },
        { time: "12.00", title: "Makan siang di Cigugur atau Kuningan kota", body: "Untuk rombongan besar pesan lebih dulu; pilihan di Cisantana sendiri terbatas." },
        { time: "13.30", title: "Gereja Cisantana atau Cigugur", body: "Perhentian tambahan yang memberi konteks: umat Katolik di desa ini sebagian besar bertani dan beternak sapi perah, dan gerejanya bagian dari kampung, bukan tamu di dalamnya." },
        { time: "15.00", title: "Kembali ke Cirebon", body: "Sampai kota sebelum jam lima. Kalau rombongan dari Jakarta atau Bandung, jadikan ini hari kedua dan menginap di Kuningan." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Bukit Totombok, Desa Cisantana, Cigugur, Kabupaten Kuningan, Jawa Barat"],
      ["Dari Kuningan kota", "± 8 km, 15–20 menit"],
      ["Dari Cirebon", "± 35 km, 1–1,5 jam"],
      ["Ketinggian", "± 700 m dpl; udara dingin, terutama pagi"],
      ["Jalan salib", "14 perhentian, ± 1 km, 464 anak tangga menanjak"],
      ["Biaya masuk", "Tanpa tiket; kotak persembahan dan parkir tunai"],
      ["Puncak peziarah", "Jumat Kliwon, Jumat Agung, Prapaskah, Mei & Oktober"],
      ["Fasilitas", "Toilet, parkir bus, kapel, area misa di Taman Getsemani, pasar suvenir"]
    ],
    catatan: [
      "Ini rute paling menuntut secara fisik di antara semua rute kami. Sampaikan jumlah anak tangganya ke peserta sebelum hari-H, bukan di kaki bukit.",
      "Sepatu bersol kasar. Undakan berlumut dan sisa hujan sore sebelumnya bertahan sampai pagi.",
      "Naik pagi. Setelah jam sepuluh panas, dan setelah tengah hari kabut atau hujan sering turun di lereng Ciremai.",
      "Jumat Agung dan Jumat Kliwon sangat ramai — bagus untuk mengalami prosesinya, buruk untuk keheningan.",
      "Sediakan rencana untuk peserta yang berhenti di tengah: satu pendamping tetap di area bawah, dan itu bukan kegagalan siapa pun."
    ],
    produk: ["rosario-sonokeling", "kaos-peziarah", "dry-bag-20l"]
  },

  {
    id: "lourdes",
    seoName: "Lourdes",
    name: "Lourdes — Grotte de Massabielle",
    short: "Lourdes",
    region: "HAUTES-PYRÉNÉES, PRANCIS",
    tagline: "Gua di tepi Gave de Pau tempat Bernadette Soubirous melihat “Aku adalah Yang Dikandung Tanpa Dosa”.",
    note: "Rute internasional pertama yang sedang kami susun. Belum dibuka — kamu bisa masuk daftar tunggu.",
    tags: ["SEGERA", "10–12 HARI", "INTERNASIONAL"],
    soon: {
      label: "SEGERA",
      title: "Rute ini masih draf — belum pernah kami jalankan.",
      body: "Semua keterangan di halaman ini adalah data tempatnya, yang bisa kamu periksa sendiri di situs resmi Sanctuaire Notre-Dame de Lourdes. Yang belum ada: harga, tanggal keberangkatan, dan mitra penyelenggara di Prancis. Kami sedang menyiapkan ketiganya, dan sampai selesai kami tidak menerima pembayaran apa pun untuk rute ini."
    },
    heroFull: true,
    image: "/assets/lourdes-hero.webp",
    heroAlt: "Lourdes — patung Bunda Maria di Grotte de Massabielle, dengan Basilika Rosario dan Basilika Immaculate Conception serta Pegunungan Pyrenees di latar",
    h: 340,
    durasi: "10–12 hari dari Indonesia, biasanya digabung Fatima, Nevers, atau Paris",
    medan: "Kompleks sanctuary datar dan beraspal; jalan salib bukit berbatu dan menanjak",
    akses: "Salah satu tempat ziarah paling ramah kursi roda yang ada: kompleks utama, tiga basilika, dan area gua bisa dilalui kursi roda, tersedia kursi dorong biru (voiturettes) dan sukarelawan pendorong. Jalan salib di bukit Espélugues tidak bisa — untuk itu ada jalan salib datar khusus peziarah sakit di dalam kompleks.",
    tenang: "Sebelum jam tujuh pagi; dan November–Maret, saat prosesi berkurang dan kota jauh lebih lengang",
    intro: [
      "Antara 11 Februari dan 16 Juli 1858, seorang anak berusia empat belas tahun bernama Bernadette Soubirous melihat delapan belas kali penampakan di sebuah gua batu di tepi Sungai Gave de Pau, di pinggir kota Lourdes. Keluarganya saat itu tinggal di bekas ruang tahanan yang disebut le Cachot. Pada 25 Maret, penampakan itu menyebut dirinya dalam bahasa Oksitan setempat: “Que soy era Immaculada Councepciou” — Aku adalah Yang Dikandung Tanpa Dosa.",
      "Yang tumbuh di tempat itu sekarang adalah kompleks ziarah terbesar di dunia Katolik Barat: gua aslinya dibiarkan apa adanya, dengan mata air yang mengalir di bawahnya, dan di atasnya berdiri tiga basilika — Basilika Immaculate Conception yang ditahbiskan 1871, Basilika Rosario yang selesai di akhir 1890-an, dan Basilika bawah tanah Santo Pius X yang dibuka pada 1958 dan menampung sekitar dua puluh lima ribu orang.",
      "Lourdes juga satu-satunya tempat ziarah besar yang seluruh tata ruangnya disusun untuk orang sakit: ada rumah penginapan khusus peziarah sakit (Accueil Notre-Dame), lajur kursi dorong di setiap prosesi, dan sebuah kantor medis — Bureau des Constatations Médicales — yang memeriksa laporan kesembuhan dengan standar yang sengaja dibuat sangat ketat, dan yang sepanjang sejarahnya hanya mengakui tujuh puluh kasus."
    ],
    sorotan: [
      { title: "Grotte de Massabielle", body: "Gua aslinya, dengan patung Bunda Maria di ceruk tempat Bernadette melihatnya. Antrean berjalan pelan menyentuh dinding batu yang sudah licin karena tangan. Tidak ada pengeras suara di sini; petugas akan meminta kamu diam kalau kamu lupa." },
      { title: "Mata air dan gestes de l'eau", body: "Mata air yang muncul saat penampakan kesembilan masih mengalir; airnya bisa diambil gratis dari deretan keran di samping gua. Bak air (piscines) sempat lama ditutup dan kini dilayani lewat ritus air — gestes de l'eau — dengan jadwal yang berubah-ubah, jadi selalu cek jadwal harian di pintu masuk." },
      { title: "Prosesi Sakramen Mahakudus dan prosesi lilin", body: "Setiap hari pada musim ziarah: prosesi Sakramen Mahakudus sore hari, dan prosesi Maria dengan lilin pada malam hari melintasi esplanade. Yang berjalan paling depan adalah peziarah sakit. Di luar musim, keduanya berkurang atau ditiadakan." },
      { title: "Jejak Bernadette di kota", body: "Le Cachot tempat keluarganya tinggal, Moulin de Boly tempat ia lahir, dan desa Bartrès tempat ia menggembala. Bernadette sendiri meninggal di Nevers pada 1879 dan dikanonisasi 1933 — jasadnya ada di Nevers, bukan di Lourdes, dan banyak rombongan menambahkan satu hari ke sana." }
    ],
    itinerary: [
      { day: "RANGKA SEMENTARA — 11 HARI, BELUM FINAL", items: [
        { time: "HARI 1–2", title: "Jakarta → Paris atau Barcelona", body: "Satu kali transit, 17–20 jam terbang. Dari Paris ada TGV langsung ke Lourdes (± 5 jam); dari Barcelona ditempuh darat lewat Toulouse. Bandara terdekat Tarbes–Lourdes–Pyrénées (LDE), 10 km dari kota." },
        { time: "HARI 3", title: "Tiba di Lourdes, gua pada malam pertama", body: "Kami menaruh kunjungan pertama ke gua pada malam hari, bukan siang — paling sepi, dan perbedaan suasananya jauh." },
        { time: "HARI 4", title: "Misa internasional, jalan salib, mata air", body: "Misa internasional di Basilika Santo Pius X pada hari tertentu di musim ziarah; siang jalan salib; malam prosesi lilin." },
        { time: "HARI 5", title: "Jejak Bernadette dan Bartrès", body: "Le Cachot, Moulin de Boly, Bartrès, lalu waktu bebas di gua." },
        { time: "HARI 6–8", title: "Tambahan yang paling sering diminta", body: "Nevers (jasad Santa Bernadette), atau menyeberang ke Fatima di Portugal, atau Rue du Bac dan Ars di Prancis. Ini bagian yang paling menentukan panjang dan biaya perjalanan." },
        { time: "HARI 9–11", title: "Paris dan pulang", body: "Dua malam untuk Notre-Dame, Rue du Bac, dan Sacré-Cœur sebelum penerbangan kembali." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Lourdes, Hautes-Pyrénées, Occitanie, Prancis"],
      ["Dari Indonesia", "17–20 jam terbang dengan satu transit, lalu kereta atau darat"],
      ["Bandara & stasiun terdekat", "Tarbes–Lourdes–Pyrénées (LDE) 10 km; Gare de Lourdes ± 1,5 km dari sanctuary"],
      ["Visa", "Schengen — pengurusan realistis 4–8 pekan sebelum berangkat"],
      ["Biaya masuk", "Tidak ada, termasuk air dari mata airnya"],
      ["Musim ziarah", "Sekitar April sampai Oktober; puncaknya 11 Februari, 15 Agustus, dan Rosary Pilgrimage awal Oktober"],
      ["Fasilitas", "Accueil Notre-Dame untuk peziarah sakit, kursi dorong dan sukarelawan, kapel adorasi 24 jam, ruang pengakuan berbagai bahasa"],
      ["Bahasa", "Prancis; misa dan panduan tersedia dalam banyak bahasa, tapi belum tentu Indonesia"]
    ],
    catatan: [
      "Rute ini belum dibuka. Tidak ada harga, tanggal, atau uang muka yang kami terima untuk sekarang.",
      "Visa Schengen adalah penentu jadwal, bukan tiket. Mulai dari sana, dan siapkan asuransi perjalanan sesuai syarat Schengen.",
      "November–Maret jauh lebih sepi dan lebih murah, tapi banyak prosesi berkurang dan Pyrenees dingin — untuk rombongan lansia pertimbangkan Mei atau September.",
      "Rombongan dengan peziarah sakit atau berkursi roda harus mendaftar ke Accueil jauh sebelumnya; ini yang paling sering terlewat.",
      "Hitung jalan kaki 5–8 km sehari di dalam dan sekitar kompleks, meski medannya datar.",
      "Hotel di Lourdes habis berbulan-bulan sebelumnya untuk 15 Agustus dan Rosary Pilgrimage Oktober."
    ],
    post: "",
    produk: ["rosario-sonokeling", "rosario-mutiara", "kaos-peziarah"]
  },


  {
    id: "jerusalem",
    seoName: "Jerusalem",
    name: "Yerusalem — Tanah Suci",
    short: "Yerusalem",
    region: "YERUSALEM, TANAH SUCI",
    tagline: "Kota tempat peristiwanya benar-benar terjadi: Kalvari, makam kosong, dan jalan sempit di antara keduanya.",
    note: "Rute internasional kedua yang sedang kami susun. Belum dibuka — jadwalnya bergantung pada kondisi keamanan.",
    tags: ["SEGERA","10–14 HARI","INTERNASIONAL"],
    soon: {"label":"SEGERA","title":"Rute ini masih draf — belum pernah kami jalankan.","body":"Semua keterangan di halaman ini adalah data tempatnya, yang bisa kamu periksa sendiri lewat Custodia Terrae Sanctae (kustodian Fransiskan di Tanah Suci). Yang belum ada: harga, tanggal keberangkatan, penyelenggara berizin, dan — yang paling menentukan — kepastian kondisi keamanan serta jalur masuk yang bisa dipakai peziarah Indonesia. Sampai keempatnya jelas kami tidak menerima pembayaran apa pun untuk rute ini."},
    heroFull: true,
    image: "/assets/jerusalem-hero.webp",
    heroAlt: "Yerusalem — Basilika Makam Kudus dengan kubah batunya, Kubah Batu berlapis emas di kejauhan, dan tembok Kota Lama di antara pohon zaitun dan sipres",
    h: 340,
    durasi: "10–14 hari dari Indonesia, biasanya digabung Betlehem, Galilea, dan Yordania",
    medan: "Kota Lama berundak dan berbatu; banyak tangga sempit tanpa pegangan, beberapa situs Galilea menanjak",
    akses: "Sangat bervariasi. Basilika Makam Kudus punya undakan di beberapa titik dan Kalvari hanya bisa dicapai lewat tangga sempit; Betlehem, Gereja Kelahiran, Getsemani, dan sebagian besar situs Galilea lebih datar dan bisa dijangkau kursi roda dengan pendamping. Via Dolorosa melewati pasar berbatu yang licin — untuk peziarah lansia rencanakan versi pendeknya.",
    tenang: "Sebelum jam tujuh pagi di Kota Lama; dan di luar Pekan Suci, Natal, serta hari raya besar Yahudi dan Islam, saat kota jauh lebih padat",
    intro: [
      "Yerusalem bukan tempat penampakan. Ini tempat peristiwanya: kota yang di dalamnya Yesus mengajar, diadili, disalibkan, dan dimakamkan, dengan jarak antar-titik yang jauh lebih pendek daripada yang dibayangkan sebagian besar orang — dari Getsemani ke Kalvari bisa ditempuh kaki dalam kurang dari satu jam, lewat jalan yang sekarang menjadi pasar.",
      "Pusatnya adalah Basilika Makam Kudus, dibangun pertama kali atas perintah Kaisar Konstantinus pada abad keempat di atas dua tempat sekaligus: bukit penyaliban dan kubur batu di sebelahnya. Bangunan yang berdiri sekarang sebagian besar dari masa Tentara Salib abad kedua belas, dengan Aedicule di atas makam yang direstorasi pada 2016–2017. Gereja ini dikelola bersama oleh beberapa Gereja — Ortodoks Yunani, Fransiskan Kustodi Tanah Suci, dan Ortodoks Armenia sebagai pemegang utama — di bawah kesepakatan lama yang disebut Status Quo, sebab itu jam, jalur, dan bahkan lampu di dalamnya diatur sampai ke detail yang tampak aneh bagi pengunjung baru.",
      "Di sekelilingnya ada rangkaian tempat yang biasanya dijalankan sebagai satu perjalanan: Bukit Zaitun dan taman Getsemani dengan pohon-pohon zaitun tuanya, Ruang Perjamuan Terakhir di Bukit Sion, Betlehem dan Gereja Kelahiran sembilan kilometer ke selatan, lalu Galilea di utara — Nazaret, Kapernaum, Tabgha, dan Bukit Sabda Bahagia — tempat sebagian besar pelayanan publik Yesus berlangsung. Jalur masuk, lintas wilayah, dan izin untuk peziarah Indonesia adalah bagian yang paling rumit, dan itu justru bagian yang masih kami kerjakan."
    ],
    sorotan: [
      { title: "Basilika Makam Kudus", body: "Kalvari di lantai atas lewat tangga sempit di kanan pintu masuk, Batu Pengurapan di bawahnya, dan Aedicule di rotunda. Antrean masuk ke makam bisa satu sampai tiga jam pada musim ramai dan jauh lebih pendek sebelum jam enam pagi. Ada juga misa Fransiskan harian dan prosesi sore yang bisa diikuti rombongan." },
      { title: "Via Dolorosa", body: "Empat belas perhentian dari daerah Benteng Antonia sampai ke dalam Basilika. Jalurnya melewati pasar yang hidup dan berjualan seperti biasa — itu bukan gangguan, itu kotanya. Prosesi bersama Fransiskan berjalan setiap Jumat sore dan itu cara terbaik menjalaninya." },
      { title: "Getsemani dan Bukit Zaitun", body: "Gereja Segala Bangsa di atas batu tempat doa Yesus, taman zaitun di sisinya, lalu turun lewat Dominus Flevit dan Pater Noster. Untuk rombongan, ini bagian paling hening di seluruh perjalanan — jadwalkan pagi." },
      { title: "Betlehem dan Galilea", body: "Gereja Kelahiran dengan Pintu Kerendahan Hati dan gua di bawah altarnya; lalu ke utara: Nazaret (Basilika Kabar Sukacita), Kapernaum, Tabgha, Bukit Sabda Bahagia, dan Sungai Yordan. Betlehem berada di wilayah Palestina — lintasnya perlu direncanakan, bukan diimprovisasi." }
    ],
    itinerary: [
      { day: "RANGKA SEMENTARA — 12 HARI, BELUM FINAL", items: [
        { time: "HARI 1–2", title: "Jakarta → Tanah Suci", body: "Satu kali transit lewat Doha, Dubai, atau Istanbul; 13–16 jam terbang. Jalur masuk — langsung, atau lewat Amman dan menyeberang darat — ditentukan penyelenggara berizin sesuai kondisi saat itu." },
        { time: "HARI 3", title: "Betlehem", body: "Gereja Kelahiran, Padang Gembala, misa rombongan. Kami mulai dari kelahiran, bukan dari sengsara." },
        { time: "HARI 4", title: "Kota Lama: Makam Kudus", body: "Masuk sebelum jam enam pagi, saat antrean makam masih pendek. Siang untuk Bukit Sion dan Ruang Perjamuan Terakhir." },
        { time: "HARI 5", title: "Via Dolorosa dan Getsemani", body: "Jalan salib pagi di Kota Lama; sore Bukit Zaitun, Dominus Flevit, dan Getsemani." },
        { time: "HARI 6–8", title: "Galilea", body: "Nazaret, Kana, Kapernaum, Tabgha, Bukit Sabda Bahagia, perahu di Danau Galilea, dan pembaruan janji baptis di Sungai Yordan." },
        { time: "HARI 9–10", title: "Kembali ke Yerusalem", body: "Hari bebas untuk kembali ke Makam Kudus tanpa jadwal, ditambah Ain Karem dan Laut Mati kalau waktu memungkinkan." },
        { time: "HARI 11–12", title: "Tambahan Yordania dan pulang", body: "Gunung Nebo, Madaba, dan Betania di seberang Yordan sebelum penerbangan kembali. Bagian ini yang paling menentukan panjang dan biaya perjalanan." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Yerusalem, Betlehem, dan Galilea — Tanah Suci"],
      ["Dari Indonesia", "13–16 jam terbang dengan satu transit; jalur masuk ditentukan penyelenggara"],
      ["Bandara terdekat", "Ben Gurion (TLV); alternatif Queen Alia Amman (AMM) lalu darat lewat perlintasan Allenby/King Hussein"],
      ["Izin masuk", "Indonesia tidak punya hubungan diplomatik dengan Israel, jadi peziarah Indonesia berangkat lewat penyelenggara berizin yang mengurus dokumen dan jalur masuknya. Ini bagian tersulit dari rute ini dan tidak bisa diurus sendiri."],
      ["Keamanan", "Jadwal keberangkatan mengikuti kondisi keamanan dan imbauan resmi Kementerian Luar Negeri RI. Kalau kondisinya tidak aman, rute ini tidak jalan."],
      ["Biaya masuk", "Gereja-gereja utama gratis; beberapa situs arkeologi dan nasional berbayar"],
      ["Musim terbaik", "Maret–Mei dan September–November; puncaknya Pekan Suci dan Natal"],
      ["Bahasa", "Ibrani dan Arab; pemandu berbahasa Indonesia tersedia lewat penyelenggara"]
    ],
    catatan: [
      "Rute ini belum dibuka. Tidak ada harga, tanggal, atau uang muka yang kami terima untuk sekarang.",
      "Keberangkatan ke Tanah Suci bergantung pada kondisi keamanan, bukan pada keinginan kita. Kami tidak akan menjalankan rute ini kalau imbauan resmi mengatakan sebaliknya.",
      "Dokumen dan jalur masuk wajib lewat penyelenggara berizin. Waspadai penawaran yang menjanjikan hal ini murah dan cepat.",
      "Kota Lama berundak dan sempit. Hitung jalan kaki 6–9 km sehari, banyak di antaranya di batu licin.",
      "Pekan Suci adalah pengalaman yang tidak ada bandingnya dan sekaligus paling padat, paling mahal, dan paling melelahkan. Untuk rombongan lansia pertimbangkan Oktober.",
      "Berpakaian tertutup di semua situs — bahu dan lutut. Ini berlaku untuk situs Kristen, Yahudi, dan Muslim."
    ],
    post: "",
    produk: ["rosario-sonokeling","rosario-mutiara","kaos-peziarah"]
  },
  {
    id: "iberia",
    seoName: "Iberia",
    name: "Iberia — Fátima, Santiago, Barcelona",
    short: "Iberia",
    region: "PORTUGAL & SPANYOL",
    tagline: "Tiga tempat dengan tiga watak berbeda: penampakan 1917, jalan kaki seribu tahun, dan gereja yang belum selesai.",
    note: "Rute internasional ketiga yang sedang kami susun. Belum dibuka — kamu bisa masuk daftar tunggu.",
    tags: ["SEGERA","12–14 HARI","INTERNASIONAL"],
    soon: {"label":"SEGERA","title":"Rute ini masih draf — belum pernah kami jalankan.","body":"Semua keterangan di halaman ini adalah data tempatnya, yang bisa kamu periksa sendiri di situs resmi Santuário de Fátima, Catedral de Santiago, dan Basílica de la Sagrada Família. Yang belum ada: harga, tanggal keberangkatan, dan mitra penyelenggara di Portugal dan Spanyol. Kami sedang menyiapkan ketiganya, dan sampai selesai kami tidak menerima pembayaran apa pun untuk rute ini."},
    heroFull: true,
    image: "/assets/iberia-hero.webp",
    heroAlt: "Iberia — menara Katedral Santiago de Compostela, Basilika Fátima dengan patung Bunda Maria di depannya, dan menara Sagrada Família di Barcelona",
    h: 340,
    durasi: "12–14 hari dari Indonesia, tiga kota besar dalam satu perjalanan",
    medan: "Fátima datar dan beraspal; Santiago berbukit dengan jalan batu; Barcelona kota besar dengan banyak jalan kaki dan tangga stasiun",
    akses: "Fátima adalah yang paling ramah kursi roda dari ketiganya: esplanade datar, Kapel Penampakan dan kedua basilika bisa dijangkau. Katedral Santiago punya undakan di beberapa pintu dan Kota Lama berbatu tidak rata. Sagrada Família sendiri sepenuhnya bisa dijangkau kursi roda, kecuali menaranya yang hanya lewat lift sempit dan tangga turun.",
    tenang: "Fátima sebelum jam delapan pagi dan di luar tanggal 12–13 setiap bulan; Santiago di luar Juli–Agustus; Sagrada Família pada slot pertama pagi",
    intro: [
      "Ini rute yang menggabungkan tiga hal yang biasanya dijual terpisah, dan menurut kami memang sebaiknya disatukan justru karena wataknya berbeda. Fátima adalah tempat penampakan: pada 13 Mei 1917 tiga anak gembala — Lúcia, Francisco, dan Jacinta — melihat Bunda Maria di Cova da Iria, berulang setiap tanggal 13 sampai Oktober, dan pada 13 Oktober 1917 puluhan ribu orang hadir di sana untuk peristiwa yang dikenal sebagai Mukjizat Matahari.",
      "Santiago de Compostela adalah tempat tujuan, bukan tempat penampakan. Katedralnya dipercaya menyimpan makam Santo Yakobus Rasul, dan sejak abad kesembilan menjadi ujung jaringan jalan peziarah yang membentang melintasi Eropa — Camino. Kamu tidak harus jalan seribu kilometer untuk mendapat sertifikat Compostela: seratus kilometer terakhir sudah cukup, dan itu bisa ditempuh dalam lima hari dari Sarria. Untuk rombongan, kami merancang versi pendeknya.",
      "Barcelona menutup perjalanan dengan hal yang lain lagi: Sagrada Família, gereja rancangan Antoni Gaudí yang mulai dibangun 1882 dan masih belum selesai, ditahbiskan sebagai basilika oleh Paus Benediktus XVI pada 2010 saat bangunannya sendiri belum berkubah penuh. Gaudí sendiri dimakamkan di kriptanya. Ini tempat ziarah yang bentuknya masih berubah — argumen paling jelas bahwa Gereja membangun untuk waktu yang lebih panjang dari satu generasi."
    ],
    sorotan: [
      { title: "Cova da Iria dan Kapel Penampakan", body: "Kapel kecil di titik penampakan, berdiri di tengah esplanade yang bisa menampung ratusan ribu orang. Rosario internasional setiap hari, dan prosesi lilin malam. Tanggal 12–13 setiap bulan adalah puncaknya — luar biasa untuk dialami, sangat padat untuk dijadwalkan." },
      { title: "Aljustrel dan Valinhos", body: "Kampung tempat ketiga anak itu tinggal, rumah aslinya masih ada, dan Valinhos tempat penampakan Agustus 1917. Makam Lúcia, Francisco, dan Jacinta ada di dalam Basilika Nossa Senhora do Rosário." },
      { title: "Katedral Santiago dan Pórtico da Gloria", body: "Misa peziarah harian, Pórtico da Gloria karya Master Mateo dari abad kedua belas yang sudah direstorasi, dan botafumeiro — pedupaan raksasa yang diayunkan melintasi transept pada hari tertentu, bukan setiap hari. Pelukan tradisional pada arca Santo Yakobus di belakang altar tetap bisa dilakukan." },
      { title: "Camino seratus kilometer terakhir", body: "Sarria sampai Santiago, lima hari jalan kaki, sekitar dua puluh kilometer sehari lewat Galicia yang hijau dan sering basah. Untuk peserta yang tidak berjalan, kami sediakan pendamping dan kendaraan yang bertemu di setiap titik akhir hari." },
      { title: "Sagrada Família", body: "Masuk harus pesan tiket bertanggal jauh sebelumnya; slot pagi paling sepi dan cahaya sisi timur — Fasad Kelahiran — paling bagus saat itu. Sisakan waktu untuk kripta tempat Gaudí dimakamkan, dan untuk duduk diam sepuluh menit di nave tanpa memegang kamera." }
    ],
    itinerary: [
      { day: "RANGKA SEMENTARA — 13 HARI, BELUM FINAL", items: [
        { time: "HARI 1–2", title: "Jakarta → Lisbon", body: "Satu kali transit lewat Doha, Dubai, atau Istanbul; 17–20 jam terbang. Fátima ditempuh darat ± 1,5 jam dari bandara Lisbon." },
        { time: "HARI 3", title: "Fátima: esplanade dan prosesi lilin", body: "Kami menaruh kunjungan pertama pada malam hari, saat prosesi lilin. Perbedaan suasananya dengan siang hari jauh." },
        { time: "HARI 4", title: "Fátima: Aljustrel, Valinhos, jalan salib", body: "Pagi ke kampung ketiga anak gembala, siang jalan salib Hungaria, sore misa rombongan." },
        { time: "HARI 5", title: "Lisbon dan Porto", body: "Belém dan Gereja Santo Antonius di Lisbon, lalu ke utara. Bisa juga langsung ke Porto untuk menghemat satu hari." },
        { time: "HARI 6–10", title: "Camino: Sarria → Santiago", body: "Lima hari jalan kaki seratus kilometer terakhir, dengan pilihan ikut sebagian saja. Bagasi diangkut kendaraan antar-penginapan." },
        { time: "HARI 11", title: "Santiago de Compostela", body: "Misa peziarah, Pórtico da Gloria, kantor peziarah untuk Compostela, dan waktu bebas di Kota Lama." },
        { time: "HARI 12–13", title: "Barcelona dan pulang", body: "Penerbangan domestik ke Barcelona, Sagrada Família pada slot pagi, Montserrat kalau waktu memungkinkan, lalu penerbangan kembali." }
      ] }
    ],
    praktis: [
      ["Lokasi", "Fátima (Portugal); Santiago de Compostela dan Barcelona (Spanyol)"],
      ["Dari Indonesia", "17–20 jam terbang dengan satu transit ke Lisbon, kembali dari Barcelona"],
      ["Bandara terdekat", "Lisbon (LIS) ± 1,5 jam darat ke Fátima; Santiago (SCQ); Barcelona (BCN)"],
      ["Visa", "Schengen — pengurusan realistis 4–8 pekan sebelum berangkat; satu visa untuk Portugal dan Spanyol"],
      ["Biaya masuk", "Fátima dan Katedral Santiago gratis; Sagrada Família berbayar dan wajib pesan tiket bertanggal"],
      ["Musim terbaik", "Mei–Juni dan September–Oktober; puncaknya 13 Mei dan 13 Oktober di Fátima, serta Juli–Agustus di Camino"],
      ["Camino", "Seratus kilometer terakhir dari Sarria, lima hari, untuk memenuhi syarat Compostela; peserta boleh ikut sebagian"],
      ["Bahasa", "Portugis dan Spanyol; misa serta panduan tersedia dalam banyak bahasa, tapi belum tentu Indonesia"]
    ],
    catatan: [
      "Rute ini belum dibuka. Tidak ada harga, tanggal, atau uang muka yang kami terima untuk sekarang.",
      "Visa Schengen adalah penentu jadwal, bukan tiket. Mulai dari sana, dan siapkan asuransi perjalanan sesuai syarat Schengen.",
      "Tiket Sagrada Família bertanggal dan berjam — kalau jadwal rombongan bergeser, tiketnya hangus. Ini bagian yang paling kaku di seluruh perjalanan.",
      "Bagian Camino menentukan panjang, biaya, dan tingkat kebugaran yang dibutuhkan. Versi tanpa Camino memangkas perjalanan jadi sekitar sembilan hari.",
      "Penginapan di Fátima habis jauh sebelumnya untuk tanggal 12–13, terutama Mei dan Oktober.",
      "Galicia sering hujan bahkan di musim panas. Untuk bagian Camino, jas hujan dan dua pasang kaus kaki jauh lebih berguna daripada sepatu baru."
    ],
    post: "",
    produk: ["rosario-sonokeling","rosario-mutiara","kaos-peziarah"]
  },
  {
    id: "custom",
    name: "Rute rombongan kamu sendiri",
    short: "Rute custom",
    region: "SELURUH INDONESIA",
    tagline: "Makam pendiri kongregasi, gereja di kampung asal, ziarah tujuh gereja versi parokimu.",
    note: "Makam pendiri kongregasi, gereja di kampung asal, ziarah tujuh gereja versi paroki kamu.",
    tags: ["FLEKSIBEL", "MIN. 12 PESERTA"],
    image: "/assets/peta-gua-maria-jawa.webp",
    heroAlt: "Peta sebelas gua Maria di Pulau Jawa, dari Cianjur sampai Banyuwangi",
    h: 280,
    durasi: "1–5 hari, sesuai rute",
    medan: "Ditentukan oleh titik yang dipilih",
    akses: "Kami susun sesuai komposisi peserta — persentase lansia menentukan medan, bukan sebaliknya.",
    tenang: "Ditentukan bersama; hari kerja hampir selalu lebih sepi",
    intro: [
      "Sebagian besar permintaan yang masuk ke kami tidak berbunyi \"kami mau ke Sendangsono\". Bunyinya lebih sering: rombongan lingkungan dua puluh delapan orang, ada empat lansia, anggaran per orang segini, panitianya baru berkumpul tiga minggu lagi, rute belum ada.",
      "Itu justru pekerjaan yang paling sering kami kerjakan. Rute terbaik biasanya bukan yang paling terkenal, tapi yang punya alasan — dan alasan itu datang dari rombongannya sendiri, bukan dari daftar tempat ziarah populer.",
      "Tidak ada biaya konsultasi. Usulan pertama dikirim dalam dua hari kerja, dan kamu bebas memakainya sendiri tanpa memesan apa pun dari kami."
    ],
    sorotan: [
      { title: "Mulai dari alasan", body: "Ulang tahun lingkungan, makam pendiri kongregasi, gereja tua di kampung asal sebagian besar anggota, satu tema devosi, atau urutan sejarah bagaimana iman ini masuk ke daerahmu." },
      { title: "Ziarah tujuh gereja", body: "Versi paroki sendiri, disusun berdasarkan jarak nyata dan waktu tempuh — bukan tujuh nama yang kelihatan bagus di poster." },
      { title: "Rombongan sekolah & OMK", body: "Ritme, medan, dan durasi disesuaikan. Untuk peserta muda kami dorong rute jalan kaki dan titik sejarah, bukan hanya gua Maria." },
      { title: "Seragam rombongan", body: "Kaos, outerwear, syal tenun, sampai tag koper — nama paroki, tanggal, dan rute. Minimum 12 pcs, produksi 10–14 hari kerja, bisa dipesan tanpa ikut perjalanan." }
    ],
    itinerary: [
      { day: "PROSES — DARI PERMINTAAN SAMPAI BERANGKAT", items: [
        { time: "HARI 0", title: "Kirim permintaan", body: "Lima hal sekaligus: nama rombongan dan kota asal, perkiraan peserta plus berapa lansia atau anak, bulan yang diincar, alasan perjalanan dalam satu kalimat, dan anggaran per orang walau masih kisaran." },
        { time: "+2 HARI", title: "Usulan pertama", body: "Rute, penginapan, transportasi, dan estimasi biaya per orang. Kalau kamu sudah punya rute sendiri, pekerjaan kami berubah dari menyusun jadi memeriksa — dan itu lebih cepat." },
        { time: "+1 PEKAN", title: "Revisi bareng", body: "Sesuaikan anggaran, tambah atau kurangi titik, atur ritme untuk lansia atau anak. Biasanya dua putaran revisi." },
        { time: "H-30", title: "Yang tidak bisa mendadak", body: "Slot misa di lokasi, pendamping rohani, buku doa rute, dan seragam rombongan — ukuran harus dikumpulkan lebih dulu." },
        { time: "H-0", title: "Berangkat", body: "Koordinator lapangan ikut sepanjang jalan; satu koordinator per bus." }
      ] }
    ],
    praktis: [
      ["Cakupan", "Seluruh Indonesia"],
      ["Minimum peserta", "12 orang"],
      ["Biaya konsultasi", "Tidak ada"],
      ["Usulan pertama", "2 hari kerja setelah permintaan masuk"],
      ["Seragam rombongan", "Minimum 12 pcs, produksi 10–14 hari kerja"],
      ["Yang paling menentukan harga", "Transportasi, lalu penginapan, lalu makan — tempat ziarahnya sendiri hampir selalu gratis"]
    ],
    catatan: [
      "Maksimal dua titik utama per hari; tiga hanya kalau ketiganya berjarak di bawah 30 menit.",
      "Sisakan minimum 90 menit di setiap titik utama, dan satu titik \"kosong\" tanpa acara per hari.",
      "Jangan menaruh perjalanan darat terpanjang di hari terakhir.",
      "Sumbangan ke pengelola tempat ziarah adalah komponen yang menurut kami tidak boleh dipotong."
    ],
    post: "menyusun-rute-sendiri",
    produk: ["kaos-peziarah", "syal-tenun-sumba", "patch-mc-peziarah"]
  }
];

export function byId(id) {
  return ROUTES.find(r => r.id === id) || null;
}
