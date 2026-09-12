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
    produk: ["rosario-via-lucis", "salib-sonokeling-kuningan", "dry-bag-20l"]
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
