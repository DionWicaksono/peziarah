// Article prose, keyed by post slug (the `id` in data/journal.js).
//
// This is the ONLY file to touch when writing or editing an article. Metadata
// (title, dek, author, date, image) stays in data/journal.js; the body lives
// here as a list of blocks so nobody has to edit HTML or styling:
//
//   { p: "paragraf biasa" }
//   { h2: "subjudul" }
//   { quote: "kutipan besar", by: "opsional" }
//   { figure: "/assets/foo.webp", slot: "[ caption placeholder ]", caption: "keterangan" }
//   { list: ["poin", "poin"] }                      bullet
//   { box: "Bekal Praktis", rows: [["Rute","..."]] } kotak info di tengah artikel
//
// Blocks render in order. Unknown keys are ignored, so a new block type only
// needs a case added in Post.dc.html.

export const BODIES = {
  "shuttle-kerkhof-sendangsono": [
    { p: "“Dari Muntilan ke Sendangsono naik apa?” adalah pertanyaan yang sering muncul di kalangan para peziarah — bisa ke diri sendiri, bisa ke satu sama lain. Jawaban jujurnya selama ini kadang bikin geli: nawar ojek di depan pasar, atau menunggu ada rombongan paroki yang kursinya sisa." },
    { p: "Jadi mulai bulan ini kami menyewa satu mobil, empat belas kursi, dan menjalankannya bolak-balik di satu ruas saja: Kerkhof Muntilan — tempat Romo Sanjaya dan para perintis misi Jawa dimakamkan — ke Sendangsono, lalu kembali ke titik yang sama, 4 kali sehari." },

    { h2: "Kenapa cuma satu ruas" },
    { p: "Karena ruas ini yang paling sering memutus perjalanan orang. Sebelas kilometer, jalan naik, sinyal tipis di beberapa titik, dan taksi online yang sering tidak mau ambil order balik dari Sendangsono karena kosong di jalan pulang. Untuk peziarah yang datang sendiri atau berdua, biaya transportnya jadi lebih mahal daripada seluruh sisa perjalanannya." },
    { p: "Kami tidak menambah rute lain dulu. Satu mobil, satu ruas, jadwal tetap — supaya kalau gagal, gagalnya kecil dan kelihatan." },

    { figure: "/assets/shuttle-hero.webp", slot: "", caption: "Satu mobil, empat belas kursi, satu ruas. Kalau QR di kacanya dipindai, ia membuka halaman pendaftaran yang sama." },

    { h2: "Kenapa tarifnya kami tulis terbuka" },
    { p: "Tarif Rp 45.000 bukan harga hasil survei pasar. Itu hasil bagi biaya sewa unit dan biaya jalan dengan jumlah kursi yang realistis terisi — sekitar separuh dari yang kami jalankan. Rinciannya kami pasang di halaman shuttle, lengkap dengan titik impasnya, supaya siapa pun bisa menghitung ulang sendiri." },
    { p: "Alasannya sederhana: kalau angkanya kelihatan, janji kami bisa ditagih. Kalau kursinya konsisten penuh, yang turun duluan adalah tarifnya, bukan jumlah tripnya." },

    { h2: "Kalau ternyata tidak jalan" },
    { p: "Ini layanan yang bisa gagal. Satu mobil sewaan, biaya tetap yang jalan terus entah ada penumpang atau tidak, dan pasar yang belum pernah kami uji. Kami sengaja mulai dari ukuran yang kalau rugi, ruginya tidak menyeret hal lain." },
    { quote: "Ziarah tidak seharusnya batal karena urusan sebelas kilometer." },
    { p: "Kalau ternyata penuh terus, kami tambah hari. Kalau ternyata sepi, kami hentikan dan mengaku di jurnal ini juga." },

    { cta: "Daftar kursi", href: "Landing.dc.html#shuttle",
      note: "Isi nama, tanggal, dan jumlah kursi — kami konfirmasi lewat WhatsApp. Jadwal dan rincian tarifnya ada di halaman shuttle." }
  ],

  "sendangsono-tanpa-rombongan": [
    { p: "Bus peziarah berangkat dari paroki jam lima pagi hari Sabtu, dan saya sudah tiga kali membatalkan ikut. Bukan karena tidak mau ke Sendangsono. Karena saya tidak yakin bisa berdoa sambil dihitung: empat puluh dua orang, satu koordinator, satu pengeras suara, dan jadwal yang harus selesai sebelum makan siang di Muntilan." },
    { p: "Jadi saya datang sendiri, hari Selasa, naik bus kota sampai Muntilan lalu menyewa ojek yang tarifnya ditawar di depan pasar. Tukang ojeknya bertanya rombongan saya di mana. Saya bilang tidak ada. Ia mengangguk seperti sudah sering mengantar orang yang menjawab begitu." },

    { h2: "Yang berubah kalau tidak ada rombongan" },
    { p: "Sendangsono di hari kerja hampir tidak bersuara. Bukan sunyi — ada air yang jatuh terus dari mata air di bawah gua, ada anak-anak sekolah yang lewat di jalan atas, ada satu ibu yang menyapu daun sono dengan sapu ijuk dan tidak berhenti selama satu jam penuh saya di sana. Tapi tidak ada pengeras suara. Tidak ada yang memimpin doa. Tidak ada yang memberi tahu kapan waktunya pindah ke perhentian berikutnya." },
    { p: "Awalnya itu justru bikin gugup. Saya berdiri di perhentian pertama Jalan Salib selama mungkin dua menit tanpa tahu harus apa, karena selama ini yang menentukan kapan saya selesai berdoa adalah orang lain." },
    { quote: "Ternyata saya tidak pernah tahu berapa lama saya sendiri butuh untuk satu perhentian. Jawabannya, hari itu, jauh lebih lama dari yang disediakan bus." },

    { figure: "", slot: "[ foto: jalan setapak batu ke gua ]",
      caption: "Tangga batu ke arah gua. Arsitekturnya karya Y.B. Mangunwijaya — batu kali, tanpa marmer, tanpa pagar besi." },

    { h2: "Batu, air, dan pohon sono" },
    { p: "Kompleksnya dibangun dari bahan yang tidak berusaha terlihat suci: batu kali yang disusun tangan, kayu, dan tanah. Tidak ada satu pun permukaan yang memantulkan cahaya. Untuk tempat yang menampung ribuan peziarah setiap Mei dan Oktober, Sendangsono anehnya tidak berteriak." },
    { p: "Di bawah gua ada mata air yang memberi nama tempat ini — sendang, dan pohon sono yang tumbuh di sekitarnya. Di air inilah, pada Desember 1904, Romo van Lith membaptis kelompok pertama orang Jawa dari daerah ini. Sebagian peziarah membawa jeriken. Saya cuma membasahi tangan, dan merasa agak turis karena itu." },
    { list: [
      "Bawa uang kecil. Lilin, air, dan parkir semua dibayar tunai, tidak ada yang menyodorkan QRIS.",
      "Sandal yang bisa basah. Batu di dekat sendang licin sepanjang tahun.",
      "Kalau mau sepi: Selasa sampai Kamis, sebelum jam sepuluh. Hindari Mei dan Oktober kalau kamu tidak tahan ramai."
    ] },

    { box: "Bekal Praktis", rows: [
      ["Lokasi", "Banjaroya, Kalibawang, Kulon Progo, DIY"],
      ["Dari Yogyakarta", "± 40 km, 1,5 jam lewat Jalan Godean–Nanggulan"],
      ["Dari Muntilan", "± 11 km, ojek atau taksi online (sinyal tipis di kembalinya)"],
      ["Waktu tenang", "Selasa–Kamis pagi; puncak peziarah Mei & Oktober"],
      ["Biaya", "Tanpa tiket; kotak persembahan di dekat gua"]
    ] },

    { h2: "Pulang tanpa cerita bus" },
    { p: "Yang hilang kalau datang sendiri: tidak ada yang menyanyi di jalan pulang, tidak ada bekal yang dibagi, tidak ada orang yang bercerita soal nazar yang terkabul sambil bus menikung. Ziarah memang aslinya dilakukan bersama-sama, dan saya tidak mau berpura-pura bahwa versi sendiri lebih murni." },
    { p: "Tapi ada satu hal yang cuma bisa saya dapat hari Selasa itu: saya tahu berapa lama saya berhenti di perhentian kesebelas, dan tidak ada satu orang pun yang menunggu saya di parkiran." },
    { p: "Kalau kamu sudah lama ingin pergi tapi selalu batal karena rombongannya penuh — pergi saja sendiri. Bawa rosario yang sudah kamu punya. Tidak perlu yang baru." }
  ],

  "devosi-bukan-estetika": [
    { p: "Tuduhannya kira-kira begini: toko seperti kami mengambil sesuatu yang seharusnya dijalani, lalu menjualnya sebagai gaya. Rosario jadi aksesori. Ayat jadi grafis. Iman jadi selera. Sebagian tuduhan itu benar, dan kami tidak akan berpura-pura tidak pernah melewati garisnya. Tapi bagian yang tidak benar — bagian yang menganggap bahwa keindahan itu sendiri yang mencurigakan — perlu dijawab, karena kalau dibiarkan, yang dibuang bukan cuma toko kami. Yang dibuang dua ribu tahun karya." },

    { h2: "Coba masuk ke gereja mana pun, lalu hitung" },
    { p: "Sebelum bicara soal merch, bicara dulu soal gedungnya. Berdirilah di tengah gereja paroki mana saja di Indonesia — yang paling sederhana sekalipun — lalu hitung ada berapa karya seni di dalamnya. Bangunannya sendiri: proporsi, cahaya, arah hadap, semuanya keputusan estetis yang dibuat orang. Empat belas relief Jalan Salib di dinding. Patung Bunda Maria di sudut kiri, patung Hati Kudus di kanan. Lukisan atau mozaik di belakang altar. Kaca patri kalau anggarannya cukup, kalau tidak, kain. Salib yang dipahat, bukan disilangkan dua batang begitu saja." },
    { p: "Lalu yang tidak menempel di dinding: kasula yang warnanya berganti mengikuti musim liturgi, sulaman di kainnya, bentuk piala, bentuk lilin, huruf yang dipakai untuk menulis nama santo pelindung di depan gereja, dan musik — bagian seni yang paling jarang disebut seni karena kita terlanjur menyebutnya nyanyian." },
    { p: "Tidak ada satu pun dari itu yang dibutuhkan secara teknis. Misa sah tanpa relief. Doa didengar tanpa kaca patri. Semua itu ada karena Gereja, sejak awal sekali, memutuskan bahwa iman boleh — bahkan layak — dikerjakan dengan tangan dan mata, bukan cuma dengan mulut." },
    { quote: "Kalau estetika adalah dosa, maka bangunan paling berdosa di kota ini adalah katedralnya." },

    { h2: "Tradisi yang umurnya ribuan tahun" },
    { p: "Seni bertema Kristiani bukan cabang kecil dari sejarah seni rupa. Untuk periode yang sangat panjang, ia adalah sejarah seni rupa. Dari gambar-gambar di dinding katakomba, ikon Bizantium, iluminasi manuskrip, katedral Gotik, seluruh Renaisans, sampai patung Barok — sebagian besar karya yang hari ini dipajang di museum dunia dibuat untuk alasan devosional, dibiayai oleh paroki, ordo, atau orang yang bernazar." },
    { p: "Dan hasilnya bukan cuma banyak, tapi khas. Ada segelintir perbendaharaan visual yang bisa dikenali orang lintas benua, lintas bahasa, lintas abad: salib, merpati, domba, jangkar, ikan, api, mawar, hati yang tertusuk, tangan yang menengadah. Sedikit sekali tradisi visual yang punya kosakata sekuat itu. Orang yang tidak pernah membaca satu halaman Injil pun tahu apa artinya lingkaran cahaya di belakang kepala." },
    { p: "Menyebut kosakata itu \"cuma estetika\" adalah salah paham dua arah. Ia memang estetika — dan justru karena itu ia bertahan lebih lama daripada hampir semua argumen yang pernah ditulis untuk membelanya." },

    { h2: "Memindahkan seni dari gereja ke hari Senin" },
    { p: "Pertanyaan sebenarnya bukan apakah iman boleh punya bentuk, tapi apakah bentuk itu boleh keluar dari gedungnya. Kami pikir bukan cuma boleh — itu satu-satunya arah yang masuk akal bagi orang yang benar-benar tergerak oleh apa yang ia lihat di dalam." },
    { p: "Sebab begitulah cara kerja orang yang terinspirasi. Ia tidak menyimpan yang menggerakkannya di satu ruangan dan mengunci pintunya sampai Minggu berikutnya. Ia membawanya. Dulu dibawa dalam bentuk medali di leher, skapulir di bawah baju, gambar kecil di dompet, salib di atas pintu rumah, dan rosario yang dipegang di dalam saku jas waktu sidang tesis. Tidak ada satu pun dari benda itu yang lahir di dalam gereja. Semuanya devosi rumahan, dibuat orang awam, untuk hari kerja." },
    { p: "Kaos, poster cetak, tas, tato — mediumnya baru, logikanya tidak. Memindahkan gambar yang sama ke bahan yang dipakai orang setiap hari bukan penistaan. Itu kelanjutan paling wajar dari kebiasaan yang sudah berumur belasan abad." },

    { h2: "Lalu di mana bedanya dengan devosi" },
    { p: "Di sini kami harus jujur soal batasnya sendiri, karena semua argumen di atas bisa dipakai untuk membenarkan apa saja kalau tidak diberi rem." },
    { p: "Devosi adalah hubungan; estetika adalah bentuk. Bentuk melayani hubungan, tidak menggantikannya. Rosario yang bagus tidak membuat doanya lebih didengar. Kaos bertuliskan ayat tidak menjadikan pemakainya lebih beriman daripada orang di sebelahnya yang memakai kaos polos. Kalau ada yang menjual kesan sebaliknya — bahwa membeli adalah bentuk beriman — itu yang layak ditolak, dan tuduhan di awal tulisan ini memang mengenai sasaran." },
    { list: [
      "Barang boleh mengingatkan. Barang tidak boleh menggantikan.",
      "Gambarnya boleh indah. Keindahannya tidak boleh jadi alasan utama membeli.",
      "Boleh dipakai di luar gereja. Tidak boleh dipakai untuk mengukur siapa yang lebih saleh."
    ] },
    { p: "Tiga kalimat itu yang kami pakai sebagai rem. Selebihnya, kami tidak minta maaf karena barangnya dibuat bagus. Membuat sesuatu sebaik mungkin untuk alasan yang paling tinggi adalah persis yang dilakukan setiap pemahat relief, setiap penenun kasula, dan setiap orang yang pernah menyulam nama santo di atas kain." },
    { p: "Batas mana saja yang kami tolak — dan kenapa tato masuk katalog sementara barang lain tidak — kami tulis terpisah, di “Di mana batas merch iman”." }
  ],

  "ketika-romo-berulah": [
    { p: "Kamu baru buka Threads. Belum sempat mencari apa pun, dan yang muncul paling atas di feed-mu adalah tangkapan layar: Romo X di Paroki Y, katanya, [...] (isi sendiri titik-titiknya). Di bawahnya sudah ada empat ratus komentar. Dua di antaranya dari orang yang kamu kenal — satu tetangga lingkungan, satu pemazmur." },
    { p: "Kamu berhenti scroll bukan karena kabarnya seru. Kamu berhenti karena itu romomu. Itu parokimu. Minggu depan kamu masih akan duduk di bangku yang sama, dan orang yang sedang dibicarakan seluruh timeline itu yang akan mengangkat hosti di depan matamu." },
    { p: "Tulisan ini bukan tentang kasus itu, karena kasus seperti itu jumlahnya banyak dan bentuknya berbeda-beda. Tulisan ini tentang detik-detik setelah kamu berhenti scroll." },

    { h2: "Pertama, satu kata yang menipu: “berulah”" },
    { p: "Kata itu memuat terlalu banyak hal sekaligus, dan di situlah percakapan biasanya mulai rusak. Dalam satu bulan, di grup WhatsApp yang sama, “romo berulah” bisa berarti: khotbahnya sepuluh menit terlalu politis; ia bikin konten TikTok berjoget; ia galak ke petugas tatib; laporan keuangan pembangunan tidak pernah keluar; ia menjalin hubungan dengan seorang perempuan; atau ia melakukan sesuatu kepada seorang anak." },
    { p: "Enam hal itu diletakkan dalam satu kata, lalu ditanggapi dengan satu nada. Kadang nadanya marah semua, kadang maklum semua. Dua-duanya salah, karena yang terakhir bukan versi lebih berat dari yang pertama — ia bukan spesies yang sama." },
    { box: "Empat lapis yang harus dipisah sebelum bersikap", rows: [
      ["Selera", "Gaya khotbah, humor, media sosial, pilihan lagu, mobil, cara berpakaian. Boleh tidak disukai. Bukan pelanggaran."],
      ["Kelalaian pastoral", "Pilih kasih, kasar, tidak bisa dihubungi saat ada yang sakratul maut, uang paroki yang tidak dipertanggungjawabkan. Ini urusan struktur, dan ada salurannya."],
      ["Kaul yang dilanggar", "Hubungan dengan seorang perempuan — selibat yang tidak lagi dijalani. Nyata, berat, dan bukan urusan umat untuk mengadili. Tapi juga bukan urusan yang boleh dibiarkan menggantung bertahun-tahun, karena yang paling dirugikan dari menggantung itu perempuan tersebut."],
      ["Kejahatan", "Kekerasan, penyalahgunaan kuasa, apa pun terhadap anak dan orang rentan. Ini bukan urusan internal. Ini urusan hukum, dan menahannya di dalam adalah bagian dari kejahatannya."]
    ] },
    { p: "Lapis ketiga itu yang paling sering ditumpuk ke lapis keempat oleh timeline, dan paling sering ditarik ke lapis pertama oleh paroki. Dua-duanya keliru. Seorang imam yang menjalin hubungan dengan perempuan dewasa, atas kehendak keduanya, sedang melanggar kaul yang ia ikrarkan — bukan melakukan kejahatan. Tapi kalau perempuan itu orang yang ia dampingi, ia bimbing, ia dengar pengakuannya, atau ia atasi secara struktural, maka kesetaraan yang diandaikan kata ‘dewasa’ itu tidak ada, dan perkaranya pindah ke lapis keempat. Pertanyaan yang memisahkan keduanya bukan ‘apakah ia mencintainya’, tapi ‘apakah ia punya kuasa atas dirinya’." },

    { h2: "Empat sikap yang selalu muncul" },
    { p: "Coba baca kolom komentar mana pun. Empat suara ini hampir selalu ada." },

    { h2: "1. Yang kritis" },
    { p: "“Justru karena ia imam, standarnya lebih tinggi. Umat berhak tahu. Diam itu yang selama puluhan tahun membuat hal-hal seperti ini bisa berpindah paroki dan mulai lagi dari nol.”" },
    { p: "Sikap ini punya sejarah di belakangnya, dan sejarahnya kuat. Hampir semua perbaikan serius di Gereja mana pun tidak datang dari kebaikan hati struktur, tapi dari tekanan yang tidak mau berhenti — sebagian besar dari umat sendiri, banyak yang awalnya dituduh merusak nama baik Gereja." },
    { p: "Kelemahannya satu: ia gampang kehilangan lapisan. Ketika energi yang benar untuk lapis ketiga dipakai untuk lapis pertama, yang terjadi bukan reformasi, tapi perburuan. Dan umat paroki yang pernah memburu satu romo karena hal sepele akan lebih sulit dipercaya waktu ia bicara soal hal yang serius." },

    { h2: "2. Yang old school" },
    { p: "“Itu romo. Jangan diumbar. Ada caranya sendiri — lapor ke keuskupan, jangan ke Threads. Kalau nama imam dirusak di depan umum, yang rusak bukan cuma orangnya, tapi kepercayaan orang pada Ekaristi yang ia layani.”" },
    { p: "Bagian yang benar dari sikap ini sering diabaikan orang yang buru-buru menertawakannya: pengumuman publik memang bukan alat yang presisi. Ia tidak bisa dibatalkan, tidak bisa diverifikasi ulang, dan tidak bisa membedakan dugaan dari temuan. Ada romo yang hidupnya patah karena tuduhan yang belakangan tidak terbukti, dan tidak ada satu pun utas yang menghapus dirinya sendiri setelahnya." },
    { p: "Tapi sikap ini punya beban sejarah yang jauh lebih berat. Kalimat “ada caranya sendiri” adalah kalimat yang paling sering dipakai untuk memastikan tidak ada cara apa pun yang dipakai. “Jangan bikin ribut” terdengar seperti menjaga Gereja; dalam praktiknya, berkali-kali, ia menjaga pelaku." },
    { quote: "Menjaga nama baik Gereja dan menjaga orang yang merusaknya sering kali adalah tindakan yang sama, dilakukan dengan alasan yang berbeda." },

    { h2: "3. Yang tidak peduli" },
    { p: "“Saya ke gereja untuk Ekaristi, bukan untuk romonya. Sakramen tetap sah siapa pun yang memberikan. Saya datang, saya komuni, saya pulang.”" },
    { p: "Secara teologis, kalimat pertama tidak bisa dibantah: keabsahan sakramen tidak bergantung pada kekudusan pelayannya — kalau bergantung, tidak ada satu pun dari kita yang bisa yakin pernah dibaptis. Sikap ini juga jujur soal keterbatasan. Umat kebanyakan tidak punya akses, tidak punya bukti, dan tidak punya kuasa apa pun atas penempatan imam." },
    { p: "Yang perlu diakui: ini bukan sikap netral, ini keputusan. Orang yang bisa berkata “saya tidak terpengaruh” hampir selalu orang yang memang tidak terkena. Yang terkena — perempuan itu, keluarganya, petugas yang dimaki, korban — tidak punya opsi untuk datang, komuni, lalu pulang." },

    { h2: "4. Yang tidak masalah" },
    { p: "“Romo juga manusia. Kita ini siapa, kok menuntut orang lain sempurna. Coba kamu yang jadi dia.”" },
    { p: "Ini yang paling simpatik dan paling sering menyelamatkan orang. Beban satu imam paroki di Indonesia tidak masuk akal: ribuan umat, misa berlapis, wilayah yang luas, undangan yang tidak bisa ditolak, dan hampir tidak ada orang yang bertanya bagaimana keadaan dirinya. Umat yang bisa memaklumi romonya yang lelah adalah umat yang sehat." },
    { p: "Tapi belas kasih punya arah yang bisa keliru. “Romo juga manusia” bisa dipakai untuk menjelaskan kenapa khotbahnya datar dan sumbunya pendek. Dipakai untuk lapis keempat, ia berhenti jadi belas kasih dan berubah jadi izin. Dan yang membayar izin itu bukan yang memberikannya." },

    { h2: "Sintesis: bukan pilih satu, tapi pasangkan" },
    { p: "Empat sikap di atas dibicarakan seolah kita harus memilih salah satu identitas. Menurut kami itu keliru. Tiga dari empat itu bukan sikap — itu cara menghindar yang punya alasan berbeda: yang old school menghindar demi struktur, yang tidak peduli menghindar demi ketenangan sendiri, yang tidak masalah menghindar demi kenyamanan bersama. Dan yang kritis, kalau tanpa lapisan, menghindar juga — dari kerja yang lebih lambat dan lebih membosankan daripada menulis komentar." },
    { p: "Yang lebih berguna: pasangkan sikap dengan lapisan." },
    { list: [
      "Lapis selera — pakai sikap keempat. Bilang di grup kalau perlu, lalu selesai. Ini bukan salib yang perlu dipikul siapa pun.",
      "Lapis kelalaian — pakai sikap pertama, dengan cara sikap kedua. Bicara langsung kalau mungkin; kalau tidak, lewat Dewan Pastoral Paroki, dengan catatan tanggal dan kejadian, tertulis. Kalau tiga bulan tidak ada apa-apa, naik ke keuskupan — juga tertulis, juga tercatat. Yang membuat saluran internal bekerja bukan kesopanannya, tapi jejaknya.",
      "Lapis kaul — pakai sikap pertama dan keempat sekaligus, dan itu tidak kontradiktif. Belas kasih untuk dua orang yang keadaannya tidak sederhana; ketegasan bahwa keadaan itu harus diselesaikan, bukan dipelihara diam-diam selama satu dekade. Yang layak diperjuangkan umat bukan hukuman, tapi kejelasan — ia meminta laisisasi, atau ia kembali menjalani kaulnya. Menggantung adalah pilihan yang paling merugikan perempuannya, dan paling nyaman bagi semua orang lain.",
      "Lapis kejahatan — tidak ada perdebatan sikap di sini. Dampingi orang yang mengalami, jangan interogasi dia, dan bawa ke aparat serta ke keuskupan sekaligus. Menunggu izin siapa pun sebelum melapor bukan kesantunan; itu keterlibatan.",
      "Untuk semua lapisan: pisahkan “saya dengar” dari “saya tahu”. Satu tangkapan layar bukan keduanya."
    ] },
    { p: "Dan satu hal yang tidak muat di mana pun dalam empat sikap itu: kemungkinan bahwa kabar yang kamu baca tidak lengkap. Bukan bohong — tidak lengkap. Kebanyakan utas yang meledak adalah potongan satu menit dari relasi bertahun-tahun antara satu orang dan satu umat, ditulis oleh orang yang paling marah pada menit itu. Itu tidak membuatnya salah. Itu membuatnya belum cukup." },

    { h2: "Kenapa kami menulis ini di jurnal" },
    { p: "Karena hampir semua yang kami jual dipakai orang di paroki — dan paroki bukan tempat netral. Kami tidak berada di posisi untuk menilai imam siapa pun, dan tidak berminat. Yang kami lihat berulang, dari ratusan percakapan dengan panitia ziarah dan pengurus lingkungan, adalah orang baik yang bingung: sudah tahu ada yang tidak benar, tidak mau jadi orang yang meributkan, lalu memilih diam dan menyebutnya kerendahan hati." },
    { quote: "Diam yang dipilih karena tidak tahu harus ke mana bukan kerendahan hati. Itu cuma tidak tahu harus ke mana." },
    { p: "Itu yang tulisan ini coba jawab. Bukan supaya kamu punya pendapat yang lebih tajam soal Romo X di Paroki Y, tapi supaya kalau suatu hari yang di timeline itu benar-benar romomu, kamu tahu urutan langkahnya — dan tahu bahwa lapisannya tidak satu, dan yang paling berat tidak boleh diselesaikan di dalam." }
  ],

  "batas-merch-iman": [
    { p: "Daftar barang yang kami tolak produksi lebih panjang daripada katalognya. Sebagian ditolak karena selera, sebagian karena alasan yang lebih keras dari selera. Tulisan ini soal yang kedua — dan soal satu barang di katalog kami yang paling sering ditanyakan orang." },

    { h2: "Pertanyaan yang paling sering masuk: tato" },
    { p: "Kami menjual desain tato, dan mengerjakannya lewat studio mitra. Setiap kali daftar produk ini dibagikan, pertanyaannya datang dalam nada yang sama: apakah pantas? Apakah tato termasuk seni terapan yang sah, atau ia berada di kategori lain yang seharusnya tidak berada satu halaman dengan rosario?" },
    { p: "Pertanyaan itu wajar, dan di Indonesia lebih wajar lagi. Untuk sebagian besar umat Katolik di sini, tato masih terbaca sebagai penanda sosial sebelum terbaca sebagai gambar: preman, mantan, anak nakal, orang yang \"belum selesai\". Kami tidak akan berpura-pura asosiasi itu tidak ada. Kami cuma berpendapat bahwa itu asosiasi, bukan argumen." },
    { p: "Kalau pertanyaannya benar-benar soal seni terapan — apakah gambar yang dikerjakan tangan terlatih, pada permukaan yang dipilih, dengan komposisi yang direncanakan, bisa disebut karya — maka jawabannya sudah dijawab jauh sebelum kami. Peziarah Kristen ke Yerusalem sudah pulang membawa tanda salib di lengan selama berabad-abad, dari keluarga penato yang sampai hari ini masih membuka pintu di Kota Tua dengan cetakan kayu warisan leluhurnya. Koptik di Mesir menato salib kecil di pergelangan tangan sebagai penanda baptis, dan sudah melakukannya selama lebih dari seribu tahun." },
    { quote: "Yang membedakan bukan mediumnya. Yang membedakan apa yang digambar, siapa yang menggambar, dan kenapa orang itu memintanya." },
    { p: "Karena itu tato ada di katalog kami dengan syarat yang lebih ketat daripada produk lain: hanya perbendaharaan devosional, dikerjakan satu studio yang kami kenal, dan dengan hak menolak permintaan yang ada di tangan penatonya, bukan di tangan pembeli." },

    { figure: "/assets/tato-kalvari-full.webp", slot: "[ tato salib kalvari ]",
      caption: "Salib Kalvari, garis tunggal. Motif ziarah yang paling tua dan paling sedikit berubah." },

    { h2: "Sekarang bagian yang kami tolak" },
    { p: "Ada spektrum di merch iman, dan ujung-ujungnya tidak setara. Menyamakan semuanya sebagai \"komersialisasi agama\" membuat percakapannya jadi malas. Lebih berguna kalau diurutkan." },
    { box: "Spektrum, dari paling ringan ke paling tidak bisa ditawar", rows: [
      ["Ringan", "Toko daring di Amerika yang menjual kopi bermerek nama santo, lengkap dengan pelesetan di kemasannya. Terasa jenaka atau murahan tergantung selera — tapi nama santo dipakai untuk menghormati, bukan merendahkan."],
      ["Menengah", "Kutipan ayat yang dipotong sampai hilang isinya, dicetak besar di atas barang yang tidak ada hubungannya, semata karena hurufnya bagus."],
      ["Berat", "Nama pribadi Allah dicetak di pakaian dalam. Kami pernah melihatnya: sepotong kain sekecil itu, dengan sebutan Pribadi Ketiga Tritunggal tercetak melintang di depannya."],
      ["Tolak mutlak", "Apa pun yang meletakkan nama, gambar, atau lambang kudus di posisi yang tujuannya menggoda, melucu, atau merendahkan."]
    ] },
    { p: "Bedanya bukan soal berapa harganya, atau apakah barangnya \"religius\". Bedanya soal posisi. Kopi bernama santo meletakkan nama itu di posisi hormat yang agak konyol. Yang di baris terakhir meletakkannya di posisi yang secara sengaja bertabrakan dengan kekudusannya — dan tabrakan itulah produknya. Itu bukan salah selera. Itu tujuan desainnya." },

    { h2: "Kenapa mediumnya boleh tidak konvensional" },
    { p: "Kami memakai medium yang tidak semuanya biasa dipakai untuk barang rohani di Indonesia: kaos, tote, cetak risograf, kulit manusia. Tapi medium tidak pernah jadi tempat garis itu ditarik, karena kalau ditarik di situ, kaca patri dulu juga barang baru, dan cetak kayu dulu juga dianggap terlalu murah untuk gambar suci." },
    { p: "Garisnya ditarik di penggambarannya. Di semua barang yang kami keluarkan, berlaku hal yang sama dan tidak dinegosiasikan:" },
    { list: [
      "Gambar dan lambang kudus tidak pernah diletakkan di barang atau posisi yang tujuannya menggoda, melucu, atau merendahkan.",
      "Ayat dikutip utuh secukupnya, dengan rujukannya, tidak dipotong sampai berubah arti.",
      "Wajah Kristus, Bunda Maria, dan para kudus digambar dengan perbendaharaan devosional — bukan sebagai maskot, karikatur, atau tempelan tren.",
      "Tidak ada barang yang dijual dengan janji bahwa membelinya menambah rahmat, keberuntungan, atau perlindungan.",
      "Kalau satu barang cuma bisa dijelaskan sebagai lelucon, ia tidak diproduksi."
    ] },
    { p: "Itu sebabnya daftar tolakan kami lebih panjang daripada katalognya, dan kemungkinan besar akan terus begitu. Menolak lebih murah daripada menarik barang dari peredaran — dan jauh lebih murah daripada menjelaskan kepada seseorang kenapa benda yang ia beli untuk ibunya ternyata melewati batas." }
  ],

  "ganjuran-jam-empat-pagi": [
    { p: "Ojek online tidak mau mengantar saya ke Ganjuran jam setengah empat pagi, jadi saya menginap di Bantul dan berjalan kaki dua kilometer terakhir. Jalannya gelap, kanan-kirinya sawah, dan satu-satunya yang bergerak selain saya adalah orang yang menyalakan lampu warung soto di pertigaan. Ia melihat saya lewat, menebak arah saya, dan menyebut satu kata: \"Candi?\" Saya mengangguk. Ia bilang misanya jam lima, jangan buru-buru." },
    { p: "Ternyata ia benar. Saya sampai jam empat kurang sedikit, dan selama hampir satu jam kompleks itu praktis milik saya sendiri." },

    { h2: "Yang bikin Ganjuran berbeda dari gua Maria mana pun" },
    { p: "Hampir semua tempat ziarah Katolik di Jawa punya bentuk yang bisa diduga: gua batu, patung Bunda Maria dalam jubah biru-putih, deretan bangku, lilin. Ganjuran tidak begitu. Di tengah kompleksnya berdiri sebuah candi — bentuk, proporsi, dan susunan batunya mengikuti candi Hindu-Jawa, lengkap dengan undakan dan bilik di puncaknya. Di dalam bilik itu ada arca Hati Kudus Yesus yang dipahat sebagai raja Jawa: bersila, memakai mahkota Jawa, dengan tangan yang menunjuk ke hatinya." },
    { p: "Candi ini dibangun keluarga Schmutzer pada 1924, pemilik pabrik gula di Gondanglipuro. Keputusan mereka bukan sekadar selera arsitektur. Mereka memilih untuk tidak mengimpor bentuk Eropa ke tanah yang sudah punya bahasa rupanya sendiri — dan hasilnya, seratus tahun kemudian, masih terasa lebih berani daripada hampir semua bangunan gereja yang dibuat sesudahnya." },
    { quote: "Saya besar dengan gambar Hati Kudus versi cetakan Eropa: wajah pucat, rambut panjang, latar emas. Di Ganjuran wajah itu punya bentuk mata yang sama dengan wajah orang-orang di halte bus Yogyakarta." },
    { p: "Gempa 2006 merusak berat gedung gerejanya. Candi batunya bertahan. Kalau kamu datang sekarang, gereja yang kamu lihat adalah bangunan pengganti — lebih terbuka, lebih banyak angin, dan sengaja dibuat tidak menyaingi candi di sebelahnya." },

    { figure: "", slot: "[ foto: arca hati kudus dalam bilik candi ]",
      caption: "Arca di bilik atas candi. Untuk melihatnya kamu harus naik undakan dan melepas sandal — sama seperti masuk candi mana pun." },

    { h2: "Jam empat sampai jam lima" },
    { p: "Ini bagian yang tidak bisa saya dapatkan kalau ikut bus. Antara jam empat dan lima, yang ada di kompleks itu cuma beberapa orang: satu bapak yang duduk di undakan candi tanpa bersuara selama empat puluh menit, dua perempuan yang berdoa rosario dengan suara sangat kecil, dan satu petugas yang menyapu tanpa menyalakan lampu tambahan." },
    { p: "Tidak ada yang mengatur siapa duduk di mana. Tidak ada antrean untuk naik ke bilik. Kamu naik kalau tidak ada orang di atas, dan turun kalau merasa sudah cukup. Sistem itu berjalan sendiri tanpa satu pun petunjuk tertulis, dan runtuh total begitu bus pertama masuk sekitar jam setengah tujuh." },
    { p: "Jam lima misa dimulai. Kalau kebetulan hari itu Misa Jawa, gamelan yang mengiringi bukan tempelan budaya untuk turis — jemaatnya menyanyi hafal, dan yang paling hafal justru yang paling tua." },

    { h2: "Tirta Perwitasari, dan apa yang sebaiknya tidak kamu harapkan" },
    { p: "Di sisi kompleks ada sumber air yang disebut Tirta Perwitasari. Orang membawa jeriken, botol, kadang derigen dua puluh liter. Antreannya bisa panjang di akhir pekan; jam lima pagi hari Selasa, tidak ada antrean sama sekali." },
    { p: "Saya perlu menulis ini terang-terangan: airnya air. Yang membuat orang datang bukan kandungan mineralnya, dan tidak ada yang menjanjikan apa pun kepada siapa pun. Kalau ada orang di sekitar situ yang menjual sesuatu dengan janji hasil tertentu, itu urusan dagang orang tersebut, bukan bagian dari tempatnya." },
    { list: [
      "Datang jam empat kalau mau sepi, jam lima kalau mau misa, jam tujuh kalau mau ramai dan hidup.",
      "Bawa botol sendiri kalau berniat mengambil air. Tidak ada yang menjual botol jam empat pagi.",
      "Lepas sandal sebelum naik undakan candi. Tidak ada yang menegur, tapi semua orang melakukannya.",
      "Malam sebelumnya menginap di Bantul atau Yogyakarta selatan — bukan di kota, kecuali kamu siap berangkat jam tiga."
    ] },

    { box: "Bekal Praktis", rows: [
      ["Lokasi", "Sumbermulyo, Bambanglipuro, Bantul, DIY"],
      ["Dari Yogyakarta", "± 20 km, 45 menit lewat Jalan Bantul"],
      ["Misa harian", "Subuh; Misa Jawa dengan gamelan pada jadwal tertentu — konfirmasi ke paroki"],
      ["Waktu tenang", "04.00–06.30 hari kerja"],
      ["Biaya", "Tanpa tiket; kotak persembahan di dekat candi"],
      ["Digabung dengan", "Sendangsono (beda arah, tambah satu hari) atau pantai selatan Bantul"]
    ] },

    { p: "Yang saya bawa pulang dari Ganjuran bukan air. Yang saya bawa pulang adalah satu hal yang selalu saya tahu tapi tidak pernah saya lihat sejelas itu: iman ini tidak datang ke Jawa untuk mengganti Jawa. Di kompleks seluas itu, dua bahasa rupa berdiri di atas fondasi yang sama, dan tidak ada satu pun yang tampak sedang mengalah." }
  ],

  "muntilan-orang-yang-memulai": [
    { p: "Kalau kamu pernah ikut ziarah rombongan di Jawa Tengah, kemungkinan besar bus kamu berhenti di Muntilan — biasanya untuk makan, kadang untuk mampir ke satu museum yang durasi kunjungannya dijatah dua puluh menit. Saya termasuk yang pernah mendapat dua puluh menit itu, dan kembali sendiri empat tahun kemudian karena merasa dibohongi oleh jadwal." },
    { p: "Museum Misi Muntilan berdiri di kompleks yang dulunya sekolah. Bangunannya rendah, lantainya ubin, dan tidak ada satu pun bagian yang berusaha membuat kamu terkesan. Tapi hampir semua rute ziarah Katolik Jawa, kalau ditarik ke belakang, bermuara di halaman ini." },

    { h2: "Satu orang, dan keputusan yang tidak populer" },
    { p: "Franciscus Georgius Josephus van Lith — di Jawa orang cukup menyebutnya Frans van Lith — imam Yesuit Belanda, datang ke Muntilan pada 1896. Yang ia temukan adalah pekerjaan misi yang jalan di tempat: sedikit orang Jawa yang tertarik, dan kebanyakan yang tertarik pun mendekat karena alasan praktis, bukan karena percaya." },
    { p: "Kesimpulan yang ia ambil kemudian menjadi alasan kenapa namanya masih disebut hari ini, dan waktu itu bukan kesimpulan yang disukai atasannya: kalau Gereja mau berakar di Jawa, ia tidak boleh berdiri sebagai lembaga asing yang menawarkan bantuan. Ia harus masuk ke dalam bahasa, adat, dan cara berpikir Jawa — dan cara paling ampuh untuk itu bukan khotbah, tapi sekolah." },
    { p: "Van Lith belajar bahasa Jawa sampai tingkat yang bikin orang Jawa sendiri kaget, termasuk tingkat tutur halusnya. Ia mendirikan sekolah guru di Muntilan. Bukan sekolah untuk mencetak umat, tapi untuk mencetak guru — orang Jawa yang mengajar orang Jawa, dengan kualitas yang tidak bisa diremehkan penjajah." },
    { quote: "Ia tidak menanam pohon. Ia menanam orang yang menanam pohon — dan itu sebabnya hasilnya baru kelihatan setelah ia mati." },

    { figure: "/assets/vanlith-portrait.webp", ratio: "5 / 7",
      caption: "Franciscus Georgius Josephus van Lith (1863–1926). Tiga puluh tahun kerja, dan hampir semua hasilnya terjadi setelah ia tidak ada." },

    { h2: "Yang keluar dari sekolah itu" },
    { p: "Daftar alumni sekolah guru Muntilan adalah alasan kenapa museum ini penting melampaui minat rohani. Dari lingkungan inilah keluar Albertus Soegijapranata, yang kemudian menjadi uskup pertama berkebangsaan Indonesia dan tokoh yang berdiri di sisi Republik pada masa paling genting. Dari lingkungan yang sama keluar I.J. Kasimo, politikus yang memimpin partai Katolik dan duduk di kabinet Indonesia awal." },
    { p: "Artinya taruhan van Lith terbayar dengan cara yang bahkan lebih besar dari niat awalnya. Sekolah yang ia bangun untuk mencetak guru desa ikut mencetak orang yang menulis sejarah republik." },
    { p: "Di museum, bagian ini disajikan dengan cara yang sangat tidak dramatis: foto hitam-putih, papan keterangan yang dicetak sederhana, beberapa benda liturgi, mesin cetak lama, dan koleksi yang dikumpulkan dari paroki-paroki tua sekitarnya. Tidak ada layar sentuh, tidak ada tata cahaya. Kalau kamu datang dengan harapan museum modern, kamu akan kecewa. Kalau kamu datang untuk membaca, dua puluh menit sama sekali tidak cukup." },

    { figure: "/assets/vanlith-hb8.webp", ratio: "4 / 5",
      caption: "Romo van Lith (berjubah, kiri) bersama Hamengku Buwono VIII — saat foto ini diambil masih putra mahkota Kraton Yogyakarta. Sekolah di Muntilan membuat Gereja punya urusan dengan orang Jawa terpelajar, bukan sebaliknya." },

    { figure: "/assets/muntilan-aerial-1930.webp", ratio: "3 / 2",
      caption: "Kompleks Muntilan dari udara pada masa kolonial: deret bangunan sekolah, halaman dalam, dan sawah yang mengelilinginya." },

    { figure: "/assets/muntilan-aerial-kini.webp", ratio: "4 / 3",
      caption: "Kompleks yang sama hari ini — SMA Van Lith dan Gereja Muntilan. Sebagian besar denah aslinya masih terbaca dari atas." },

    { h2: "Makam di belakang" },
    { p: "Van Lith meninggal pada 1926 dan dimakamkan di Muntilan, di kompleks yang sama. Makamnya sederhana sekali — jauh lebih sederhana daripada makam banyak orang yang jasanya jauh lebih kecil." },
    { p: "Saya berdiri di sana cukup lama, dan yang mengganggu saya bukan haru, tapi hitungan: ia bekerja tiga puluh tahun untuk sesuatu yang hasilnya sebagian besar baru terjadi setelah ia tidak ada. Ia tidak melihat Soegijapranata jadi uskup. Ia tidak melihat republik ini ada." },
    { p: "Orang yang berdoa di makam ini biasanya diam saja. Tidak ada nazar yang ditempel, tidak ada bunga yang dijual di depan. Ada satu buku tamu, dan tulisan tangan di dalamnya sebagian besar dari rombongan pelajar." },

    { h2: "Kenapa Muntilan biasanya digabung dengan Sendangsono" },
    { p: "Bukan kebetulan kalau dua tempat ini selalu masuk itinerary yang sama. Pada Desember 1904, di mata air Sendangsono, van Lith membaptis kelompok besar orang Jawa dari Kalibawang — jumlah yang biasa dicatat seratus tujuh puluh satu orang. Sendangsono adalah tempat kejadiannya; Muntilan adalah tempat pekerjaan yang membuat kejadian itu mungkin." },
    { p: "Kalau harus memilih urutan, datang ke Muntilan dulu, lalu Sendangsono. Terbalik pun bisa, tapi Sendangsono terasa berbeda kalau kamu sudah tahu siapa yang berdiri di air itu dan apa yang ia kerjakan selama delapan tahun sebelumnya." },
    { list: [
      "Alokasikan minimal satu jam untuk museumnya, dua jam kalau kamu tipe pembaca papan keterangan.",
      "Hari Senin dan hari besar sering tutup — telepon dulu, jangan andalkan informasi di internet.",
      "Bawa uang tunai kecil untuk sumbangan dan parkir.",
      "Muntilan juga kota kuliner — soto dan tahu di sekitar pasar lebih baik daripada rumah makan yang biasa dipakai bus."
    ] },

    { box: "Bekal Praktis", rows: [
      ["Lokasi", "Muntilan, Kabupaten Magelang, Jawa Tengah"],
      ["Dari Yogyakarta", "± 25 km, 45–60 menit lewat Jalan Magelang"],
      ["Dari Sendangsono", "± 11 km, 30 menit"],
      ["Jam buka", "Pagi sampai sore; tutup pada hari tertentu — konfirmasi dulu"],
      ["Biaya", "Sumbangan sukarela"],
      ["Cocok untuk", "Rombongan sekolah, katekis, siapa pun yang mau sejarah sebelum devosi"]
    ] },

    { p: "Rute ziarah paling sering dijual sebagai perjalanan ke tempat-tempat yang tenang. Muntilan bukan itu. Muntilan adalah tempat kerja — dan kalau kamu berdiri di halaman sekolahnya cukup lama, yang muncul bukan ketenangan, tapi pertanyaan yang agak mengganggu soal apa yang sedang kamu bangun yang hasilnya baru kelihatan setelah kamu tidak ada." }
  ],

  "tiga-gereja-dalam-satu-hari": [
    { p: "Rencananya sederhana: jalan kaki, tiga gereja, satu hari, tanpa naik apa pun kecuali kaki sendiri. Total 6,4 kilometer menurut ponsel saya, meskipun angka itu naik jadi hampir delapan karena dua kali salah jalan dan satu kali berhenti karena tidak tahan bau soto." },
    { p: "Semarang cocok untuk ini karena bangunan tuanya berkumpul, bukan tersebar. Dan tiga gereja yang saya pilih hari itu dibangun pada tiga zaman yang berbeda, oleh tiga kelompok yang tidak sedang bicara satu sama lain." },

    { h2: "Pukul 07.10 — Gereja Blenduk, dan kejujuran soal rute ini" },
    { p: "Saya mulai dari Kota Lama, dari bangunan berkubah yang semua orang sebut Gereja Blenduk. Perlu saya sebut sejak awal supaya rutenya jujur: Blenduk bukan gereja Katolik. Ia gereja Protestan, GPIB Immanuel, dan berdiri di sini sejak pertengahan abad ke-18 — bangunan yang kita lihat sekarang hasil perombakan besar setelahnya." },
    { p: "Saya memasukkannya bukan untuk menambah angka, tapi karena tidak mungkin bicara soal bagaimana iman Kristen masuk ke kota ini tanpa berdiri di depan bangunan tertua yang masih dipakai. \"Blenduk\" sendiri artinya kubah, dan namanya diberi orang di luar gerejanya — sebuah bangunan yang dinamai oleh tetangganya, bukan oleh pemiliknya." },
    { p: "Jam tujuh pagi, Kota Lama masih setengah bangun. Kubah tembaganya kelihatan bagus dari sudut manapun, yang menjelaskan kenapa separuh orang di halaman itu sedang sesi foto pranikah." },

    { figure: "", slot: "[ foto: kubah gereja blenduk dari halaman ]",
      caption: "Kubah tembaga Blenduk. Datang sebelum jam delapan kalau tidak mau masuk ke foto pranikah orang lain." },

    { h2: "Pukul 09.30 — St. Yusuf Gedangan" },
    { p: "Dari Kota Lama saya jalan ke arah selatan, melewati jalan yang trotoarnya berhenti dan mulai tanpa pola, sampai ke Gedangan. Gereja St. Yusuf berdiri di sini sejak 1875 dan merupakan gereja Katolik tertua di Semarang." },
    { p: "Ini bagian rute yang paling sedikit difoto orang, dan menurut saya yang paling bagus. Di dalamnya gelap dan tinggi, kayunya banyak, dan pagi itu ada satu orang yang mengelap bangku satu per satu tanpa terlihat sedang mengejar waktu. Tidak ada tiket, tidak ada petugas yang menyambut, tidak ada yang menganggap kedatangan saya sebagai peristiwa." },
    { p: "Saya duduk dua puluh menit dan tidak ada satu pun orang lain masuk. Di kota berpenduduk satu setengah juta, itu terasa seperti kesalahan administrasi yang menguntungkan saya." },
    { quote: "Gereja tertua di kota ini adalah satu-satunya perhentian hari itu yang tidak dijaga siapa pun, tidak dijual siapa pun, dan tidak diantre siapa pun." },

    { h2: "Pukul 11.15 — soto, dan bagian yang tidak bisa dihindari" },
    { p: "Jarak Gedangan ke Randusari kira-kira dua kilometer, menanjak, dan matahari Semarang pukul sebelas tidak bisa dinegosiasikan. Di antaranya saya berhenti di warung soto — soto Semarang, kuah bening, potongan ayam, dengan sate kerang di piring kecil yang selalu terlihat lebih banyak dari yang kamu niatkan." },
    { p: "Saya menulis bagian ini karena rute jalan kaki di kota tropis gagal bukan karena jaraknya, tapi karena orang meremehkan berapa kali ia perlu berhenti. Hitung tiga perhentian, bukan satu." },

    { h2: "Pukul 13.00 — Katedral Randusari" },
    { p: "Perhentian terakhir: Gereja Santa Perawan Maria Ratu Rosario Suci di Randusari, katedral Keuskupan Agung Semarang, dibangun akhir 1920-an. Kalau Gedangan gelap dan intim, Randusari terang dan tegas — bangunan yang dibuat untuk menampung, bukan untuk menyelipkan." },
    { p: "Di sini saya berpapasan dengan kelompok pertama sepanjang hari: satu keluarga yang jelas sedang mengurus jadwal baptis, dan dua remaja yang duduk di belakang dengan tas sekolah masih di punggung." },
    { p: "Tiga gereja itu, kalau ditaruh berurutan, tidak menyusun satu cerita yang rapi. Yang pertama Protestan dan dinamai orang luar. Yang kedua Katolik dan hampir tidak terlihat. Yang ketiga pusat keuskupan dan paling sibuk. Mereka dibangun dengan alasan berbeda, oleh orang berbeda, dan tidak satu pun dirancang untuk dilihat sebagai bagian dari rangkaian." },
    { p: "Justru itu yang membuat hari itu berguna. Ziarah rombongan biasanya menyusun perhentian supaya membentuk kesimpulan. Jalan kaki sendiri di kota tidak menawarkan kesimpulan — cuma tiga bangunan yang berdiri di kota yang sama dan sudah lebih dulu ada daripada hampir semua orang yang lewat di depannya hari ini." },

    { list: [
      "Mulai jam tujuh pagi. Bukan saran, syarat — Semarang jam satu siang tidak bisa diajak jalan kaki.",
      "Sepatu, bukan sandal. Trotoarnya bagus di Kota Lama dan berhenti mendadak setelahnya.",
      "Cek jadwal misa harian; masuk gereja lebih mudah kalau ada misa atau tepat sesudahnya.",
      "Bawa air satu liter, isi ulang di warung. Tidak ada penjual air di antara Gedangan dan Randusari.",
      "Kalau bawa rombongan besar, urutannya dibalik: Randusari dulu, Kota Lama terakhir supaya bus mudah menunggu."
    ] },

    { box: "Bekal Praktis", rows: [
      ["Rute", "Blenduk (Kota Lama) → St. Yusuf Gedangan → Katedral Randusari"],
      ["Jarak", "± 6,4 km jalan kaki, tambah 20% untuk salah jalan"],
      ["Waktu", "07.00–14.00 termasuk makan dan berhenti"],
      ["Medan", "Datar sampai Gedangan, menanjak ke Randusari"],
      ["Biaya", "Tanpa tiket; siapkan tunai untuk makan dan sumbangan"],
      ["Tidak cocok untuk", "Lansia dan anak kecil — untuk mereka pakai mobil antar-titik"]
    ] },

    { p: "Rute ini saya rekomendasikan untuk orang yang bosan dengan ziarah yang seluruh perpindahannya terjadi di dalam kendaraan. Enam kilometer bukan prestasi. Tapi kamu akan tahu bentuk kotanya, dan tidak ada bus yang bisa memberi kamu itu." }
  ],

  "puhsarang-batu-tanpa-semen": [
    { p: "Ada dua cara sampai ke Puhsarang. Yang pertama seperti kebanyakan orang: naik kendaraan dari Kediri kota, masuk ke kompleks, langsung ke Gua Maria Lourdes, foto, lalu pulang. Yang kedua: masuk lewat gerejanya dulu, dan berdiri di dalamnya sampai kamu sadar bahwa bangunan itu seharusnya tidak bisa berdiri." },
    { p: "Saya sarankan cara kedua, karena Gua Marianya baru dibangun akhir 1990-an sementara gerejanya dari 1936 — dan gerejanya adalah alasan sebenarnya kenapa tempat ini penting." },

    { h2: "Orang yang merancangnya bukan arsitek gereja" },
    { p: "Henri Maclaine Pont lebih dulu dikenal sebagai perancang kampus teknik di Bandung — bangunan besar dengan atap yang mengambil bentuk lokal dan konstruksi yang memaksa orang memikirkan ulang apa yang bisa dilakukan bahan sederhana. Ia bukan spesialis bangunan ibadat." },
    { p: "Di Puhsarang ia mengerjakan sesuatu yang lebih ekstrem daripada gaya. Batu-batu penyusun gereja ini disusun tanpa semen portland sebagai pengikat utama — mengandalkan bentuk batu, perhitungan tekanan, dan adukan kapur. Artinya bangunan ini berdiri karena geometri, bukan karena lem." },
    { p: "Kalau kamu pernah melihat foto interiornya dan merasa bentuk atapnya aneh, itu bukan kesalahan lensa. Bentuknya memang tidak mengikuti langgam gereja Eropa mana pun; orang menggambarkannya bermacam-macam — perahu, joglo terbalik, mulut gua. Semuanya salah sedikit dan benar sedikit, yang biasanya tanda bahwa perancangnya tidak sedang mengutip siapa-siapa." },
    { quote: "Bangunan ini tidak berdiri karena semen. Ia berdiri karena seseorang menghitung dengan sangat teliti ke arah mana beban ingin jatuh, lalu tidak melawannya." },

    { figure: "", slot: "[ foto: interior gereja puhsarang ]",
      caption: "Interior gereja 1936. Perhatikan sambungan batunya — tidak ada permukaan yang diaci rata." },

    { h2: "Pieta, dan bagian yang paling sering dilewati" },
    { p: "Di kompleks ini ada Pieta yang menurut saya adalah karya terbaik di seluruh area, dan justru itu yang paling sering dilewati rombongan karena letaknya tidak di jalur foto. Tubuh Kristus di pangkuan ibunya dikerjakan dengan proporsi yang tidak manis — dan justru karena tidak manis, ia bekerja." },
    { p: "Saya berdiri di depannya bersama satu orang lain, bapak berumur enam puluhan, yang setelah beberapa menit bicara tanpa saya tanya: anaknya meninggal tahun lalu. Ia tidak minta tanggapan, dan saya tidak memberi. Kami berdiri saja beberapa menit lagi, lalu ia pergi." },

    { h2: "Jalan salib di lereng" },
    { p: "Bagian yang menuntut fisik adalah jalan salib yang menanjak di lereng bukit. Empat belas perhentian, jarak antar-perhentian cukup jauh, dan tanahnya bisa licin kalau hujan turun sore sebelumnya. Untuk rombongan campur usia, ini titik yang paling perlu direncanakan: sebagian akan berhenti di perhentian keenam atau ketujuh, dan itu tidak masalah selama sejak awal tidak ada yang menjanjikan bahwa semua orang harus sampai atas." },
    { p: "Saya jalan pagi, sekitar jam tujuh, dan sampai perhentian terakhir dengan kaus yang sudah basah seluruhnya. Dari atas, yang kelihatan bukan pemandangan spektakuler — cuma kompleks di bawah, atap gerejanya, dan Kediri di kejauhan. Nilainya ada di jalannya, bukan di puncaknya." },

    { h2: "Gua Maria Lourdes, dan soal keramaian" },
    { p: "Gua Marianya besar, terawat, dan sangat ramai pada akhir pekan, Mei, dan Oktober. Ada area yang cukup luas untuk misa rombongan, tempat lilin, dan pedagang di luar gerbang. Kalau kamu datang mencari keheningan pada hari Sabtu, kamu salah hari — bukan salah tempat." },
    { p: "Saya justru tidak keberatan pada bagian ini. Kompleks seperti ini memang dibangun untuk menampung banyak orang, dan menuntut kesunyian dari tempat yang tugasnya menampung ribuan peziarah adalah tuntutan yang tidak adil. Kalau butuh sepi, datang Selasa pagi dan mulai dari gerejanya." },
    { list: [
      "Masuk dari gereja 1936, bukan langsung ke gua. Urutannya mengubah seluruh kunjungan.",
      "Jalan salib pagi sebelum jam delapan, atau sore setelah jam empat. Jangan tengah hari.",
      "Sepatu bersol kasar untuk lereng; sandal jepit ide buruk.",
      "Cari Pieta-nya dan sisakan sepuluh menit untuk berdiri di depannya.",
      "Rombongan yang mau misa harus memesan jadwal lebih dulu — jangan datang dan berharap dapat slot."
    ] },

    { box: "Bekal Praktis", rows: [
      ["Lokasi", "Puhsarang, Semen, Kabupaten Kediri, Jawa Timur"],
      ["Dari Kediri kota", "± 10 km, 25 menit"],
      ["Dari Surabaya", "± 130 km, 3 jam"],
      ["Waktu ideal", "2 hari 1 malam kalau digabung jalan salib penuh dan misa rombongan"],
      ["Waktu tenang", "Selasa–Kamis pagi; puncak Mei & Oktober dan setiap akhir pekan"],
      ["Biaya", "Tanpa tiket masuk; parkir dan sumbangan tunai"],
      ["Catatan medan", "Lereng jalan salib tidak ramah kursi roda; area gua datar dan bisa diakses"]
    ] },

    { p: "Yang membuat saya kembali ke Puhsarang bukan gua batunya, dan bukan juga jalan salibnya. Yang membuat saya kembali adalah bangunan tahun 1936 yang berdiri tanpa semen selama hampir sembilan puluh tahun karena seseorang memutuskan untuk memahami bahan yang ada di tempat itu, bukan mengimpor bahan yang lebih mudah. Itu, kalau dipikir agak lama, bukan cuma soal teknik bangunan." }
  ],

  "menyusun-rute-sendiri": [
    { p: "Sebagian besar permintaan yang masuk ke kami tidak berbunyi \"kami mau ke Sendangsono\". Bunyinya lebih sering seperti ini: rombongan lingkungan dua puluh delapan orang, ada empat lansia, anggaran per orang segini, dan panitianya baru berkumpul tiga minggu lagi. Rute belum ada." },
    { p: "Tulisan ini untuk panitia seperti itu — dan bisa dipakai walaupun kamu tidak menyusunnya bersama kami. Tidak ada satu pun bagian di bawah yang mengharuskan kamu memesan apa pun." },

    { h2: "Mulai dari alasan, bukan dari daftar tempat" },
    { p: "Kesalahan paling umum: panitia langsung membuka daftar tempat ziarah terkenal, lalu memilih yang paling banyak muncul di internet. Hasilnya rute yang benar secara administratif dan hampa secara isi — semua orang datang, foto, pulang, dan tidak ada yang bisa menjelaskan kenapa titik-titik itu berurutan seperti itu." },
    { p: "Yang jauh lebih baik: tentukan dulu satu alasan, lalu cari tempatnya. Alasan yang biasanya menghasilkan rute bagus:" },
    { list: [
      "Ulang tahun lingkungan atau paroki — cari gereja yang seangkatan, atau makam pendiri paroki kamu.",
      "Kongregasi — makam pendiri, novisiat pertama, atau sekolah pertama yang dibuka ordo itu di Indonesia.",
      "Kampung asal — gereja tua di daerah asal sebagian besar anggota rombongan.",
      "Satu tema devosi — hanya gua Maria, hanya jalan salib bukit, atau ziarah tujuh gereja versi paroki kamu.",
      "Sejarah — bagaimana iman ini masuk ke daerahmu, dengan urutan waktu yang benar."
    ] },
    { quote: "Rute yang punya alasan bisa dijelaskan dalam satu kalimat kepada orang yang tidak ikut. Kalau kamu tidak bisa, rute itu belum jadi." },

    { h2: "Hitung tiga hal sebelum menyentuh peta" },
    { p: "Tiga angka menentukan hampir semua bentuk perjalanan, dan urutannya begini." },
    { box: "Tiga angka penentu", rows: [
      ["Jumlah peserta", "Di bawah 12 orang biasanya lebih murah pakai kendaraan kecil dan tanpa panitia. Di atas 40 orang, dua bus berarti dua ritme berbeda — siapkan dua koordinator."],
      ["Komposisi usia", "Persentase lansia menentukan medan, bukan sebaliknya. Satu titik dengan tanjakan panjang bisa mengubah seluruh susunan hari."],
      ["Anggaran per orang", "Tentukan sebelum memilih penginapan. Anggaran yang ditentukan belakangan selalu dipaksa naik oleh keputusan yang sudah diambil."]
    ] },

    { map: "Lihat jaraknya dulu",
      note: "Peta ini berguna untuk melihat jarak sebenarnya — bukan untuk dijadikan rute. Ketuk penanda untuk membaca medan dan keramaian tiap titik. Kalau sebelas titik ini dikerjakan sekaligus, rangkaiannya melanggar hampir semua aturan di bawah: Jakarta–Banyuwangi butuh lebih dari seminggu, dan tidak ada satu titik pun yang kebagian sembilan puluh menit." },

    { h2: "Aturan yang kami pakai sendiri" },
    { p: "Ini bukan teori. Ini hasil memperbaiki kesalahan yang kami buat di perjalanan sebelumnya." },
    { list: [
      "Maksimal dua titik utama per hari. Tiga titik hanya kalau ketiganya berjarak di bawah 30 menit satu sama lain.",
      "Sisakan minimum 90 menit di titik utama. Di bawah itu, orang cuma sempat turun dan naik lagi.",
      "Satu titik \"kosong\" per hari — tidak ada acara, tidak ada doa terjadwal. Tanpa ini, hari ketiga selalu terasa seperti pekerjaan.",
      "Jangan menaruh perjalanan darat terpanjang di hari terakhir. Taruh di hari pertama, waktu semua orang masih segar.",
      "Makan siang jam dua belas, bukan jam satu lewat. Jadwal ziarah paling sering rusak karena lapar, bukan karena macet.",
      "Toilet menentukan rute lebih sering daripada yang mau diakui panitia mana pun. Catat lokasinya sejak awal."
    ] },

    { h2: "Yang perlu diurus jauh sebelumnya" },
    { p: "Ada empat hal yang tidak bisa diurus mendadak, dan tiga di antaranya sering dilupakan panitia baru." },
    { list: [
      "Jadwal misa di lokasi. Tempat ziarah besar punya slot terbatas dan sudah dipesan rombongan lain berbulan-bulan sebelumnya.",
      "Pendamping rohani. Imam atau biarawan yang ikut sepanjang jalan harus dikonfirmasi lebih dulu — jangan berasumsi bisa minta di lokasi.",
      "Buku doa rute. Kalau rombonganmu berdoa bersama di jalan, satu buku cetak kecil mengubah kualitas perjalanan lebih besar daripada kualitas busnya.",
      "Seragam rombongan, kalau mau. Produksi butuh 10–14 hari kerja, minimum 12 pcs, dan ukuran harus dikumpulkan lebih dulu — bagian yang paling sering terlambat."
    ] },

    { h2: "Soal biaya, terus terang" },
    { p: "Komponen yang paling menentukan harga per orang, dari yang paling besar: transportasi, penginapan, lalu makan. Tempat ziarahnya sendiri hampir selalu gratis — yang kamu bayar adalah cara sampai ke sana dan tempat tidur setelahnya." },
    { p: "Karena itu cara paling efektif menurunkan biaya bukan memotong titik, tapi mengubah dua hal: kelas penginapan, dan apakah rutenya bisa diselesaikan tanpa menginap. Rute Yogyakarta–Muntilan–Sendangsono, misalnya, bisa satu hari penuh tanpa penginapan sama sekali." },
    { p: "Dan satu hal yang menurut kami tidak boleh dipotong: sumbangan ke pengelola tempat ziarah. Tempat-tempat itu dirawat orang yang tidak menagih tiket kepada siapa pun. Rombongan dua puluh delapan orang yang lewat tanpa meninggalkan apa pun bukan rombongan yang hemat." },

    { h2: "Bentuk permintaan yang bikin kerja panitia lebih cepat" },
    { p: "Kalau kamu akhirnya mengirim permintaan — ke kami atau ke penyelenggara mana pun — kirim lima hal ini sekaligus. Dengan ini, usulan pertama biasanya sudah 80% benar." },
    { list: [
      "Nama rombongan atau paroki, dan kota asal.",
      "Perkiraan jumlah peserta, plus berapa yang lansia atau anak.",
      "Bulan yang diincar, bukan tanggal pasti — tanggal disesuaikan belakangan.",
      "Alasan atau tema perjalanan, satu kalimat.",
      "Anggaran per orang, walaupun masih kisaran."
    ] },
    { p: "Yang tidak perlu kamu siapkan: rute. Itu bagian kami, dan kalau kamu sudah punya rute sendiri, kami justru lebih senang — pekerjaan kami berubah dari menyusun jadi memeriksa, dan memeriksa selalu lebih cepat." }
  ],

  "muntilan-dua-hari": [
    { p: "Bengkelnya tidak ada tandanya. Rumah biasa di gang sempit di Muntilan, pintu kayu dibuka setengah, dan di ruang depan yang seharusnya jadi ruang tamu ada empat baskom manik kayu, satu tang, dan satu kursi rotan yang jelas sudah lama tidak dipindah. Pak Sujadi merangkai rosario di kursi itu sejak 1987." },
    { p: "Kami datang dua hari, bukan satu, karena hari pertama hampir seluruhnya habis untuk hal yang tidak bisa dilewati: duduk, minum teh yang terlalu manis, dan mendengar kenapa ia tidak mau menambah karyawan." },

    { h2: "Menghitung dengan telinga" },
    { p: "Yang pertama membuat kami berhenti mencatat adalah caranya menghitung. Satu rosario butuh 59 manik. Pak Sujadi tidak pernah melihat baskomnya saat mengambil. Tangannya masuk, keluar dengan segenggam, lalu manik-manik itu jatuh satu per satu ke tampah kayu — dan ia berhenti tepat di angka yang benar, karena bunyi manik ke-59 berbeda dari manik ke-58." },
    { p: "Kami tidak percaya, jadi kami hitung ulang. Tiga kali. Tiga kali benar. Keempat kalinya ia keliru satu, dan ia sendiri yang bilang “kurang satu” sebelum kami selesai menghitung." },
    { quote: "Kalau saya lihat, saya jadi ragu. Kalau saya dengar, tidak.", by: "Sujadi, perangkai rosario" },

    { figure: "/assets/hero-rosario.webp", slot: "[ bengkel rosario muntilan ]",
      caption: "Sonokeling yang sudah dibubut dan diampelas, menunggu dirangkai. Warna gelapnya asli — tidak dicat, tidak diplitur mengilap." },

    { h2: "Dari balok jadi rosario" },
    { p: "Kayunya datang dari perajin bubut di kampung sebelah, bukan dari Pak Sujadi sendiri. Ini penting untuk dipahami kalau kamu membeli rosario kayu di mana pun: hampir tidak ada satu orang yang mengerjakan seluruh prosesnya." },
    { list: [
      "Balok sonokeling dipotong dan dibubut jadi manik bulat — dikerjakan tetangganya, satu keluarga, dengan mesin bubut kaki.",
      "Manik diampelas dua kali, halus lalu sangat halus, tanpa lapisan kimia apa pun.",
      "Lubang dibor ulang kalau miring. Yang miring lebih dari sedikit dibuang, bukan dipakai.",
      "Rangkaian dikerjakan dengan rantai kuningan atau benang lilin, tergantung pesanan.",
      "Salib dan medali datang dari pemasok di Semarang — ini bagian yang paling tidak romantis dari seluruh rantai."
    ] },

    { box: "Angka dari dua hari itu", rows: [
      ["Mulai merangkai", "1987, awalnya untuk toko devosional di depan gereja"],
      ["Kapasitas", "12–18 rosario per hari kalau bahan lengkap"],
      ["Orang yang terlibat", "Pak Sujadi, istrinya, satu keluarga pembubut, satu pemasok logam"],
      ["Bahan utama", "Sonokeling dan kayu jati sisa mebel"],
      ["Yang paling lama", "Bukan merangkai — menunggu manik kering setelah diampelas"]
    ] },

    { h2: "Kenapa ia menolak menambah orang" },
    { p: "Pertanyaan kami di hari kedua terdengar seperti pertanyaan konsultan: kalau permintaan naik, kenapa tidak menambah dua orang? Jawabannya tidak sentimental. Ia pernah mencoba, tahun 2011, dan dua bulan kemudian ada rosario yang lubangnya miring keluar dari bengkelnya. Yang mengembalikan bukan tokonya, tapi satu ibu dari paroki yang mengenalnya." },
    { p: "“Yang saya jual bukan rosario,” katanya, “yang saya jual nama saya.” Kalimat itu terdengar seperti bahan iklan, dan kami sempat ragu menuliskannya. Tapi ia mengatakannya sambil membuang tiga manik ke keranjang bawah meja, jadi kami anggap itu bukan slogan." },

    { h2: "Yang kami ubah setelah dua hari itu" },
    { p: "Kami datang untuk menaikkan volume pesanan. Kami pulang dengan kesepakatan yang berlawanan: batch tetap kecil, maksimal 40 rosario sekali pesan, dan tanggal kirim ditentukan olehnya, bukan oleh kalender kampanye kami. Harga naik sekitar dua belas persen dari kesepakatan awal — permintaan kami, bukan permintaannya." },
    { p: "Konsekuensinya jelas dan tidak nyaman: rosario sonokeling di katalog kami akan sering habis, dan kami tidak akan berpura-pura itu strategi kelangkaan. Itu cuma satu orang di satu kursi rotan di Muntilan." }
  ],

  "tenun-ende-yang-hampir-hilang": [
    { p: "Di satu kampung di Ende, Flores, dulu ada sekitar empat puluh penenun. Sekarang sembilan. Delapan di antaranya berusia di atas enam puluh. Angka itu bukan hasil sensus resmi — itu hitungan Mama Yuliana, yang menyebut nama mereka satu per satu sambil menekuk jari, dan berhenti karena jarinya kurang untuk yang sudah meninggal." },
    { p: "Kami datang untuk membeli tenun. Kami tidak menyangka pulang dengan pertanyaan yang jauh lebih tidak enak: apakah membeli itu cukup." },

    { h2: "Empat bulan untuk satu lembar" },
    { p: "Satu sarung tenun ikat penuh — yang motifnya dihitung, bukan diulang bebas — butuh tiga sampai empat bulan kalau dikerjakan di antara pekerjaan lain, dan hampir semua penenun mengerjakannya di antara pekerjaan lain: kebun, cucu, dan ibadat lingkungan." },
    { list: [
      "Kapas dipilin jadi benang dengan tangan — bagian yang paling sering diloncati produsen modern dengan benang pabrik.",
      "Ikat: benang diikat rapat mengikuti motif, sebelum diwarnai. Motifnya harus sudah ada di kepala, bukan di kertas.",
      "Warna dari mengkudu untuk merah tanah dan indigo untuk biru gelap. Merah bisa perlu berbulan-bulan pengulangan sampai matang.",
      "Tenun gedog di alat tenun sederhana, dengan punggung sebagai penahan tegangan.",
      "Kesalahan tidak bisa dibongkar sebagian. Kalau motifnya salah jauh, yang salah adalah empat bulan."
    ] },

    { quote: "Anak saya bisa menenun. Ia tidak mau menenun. Dua hal itu berbeda, dan yang kedua bukan salahnya.", by: "Mama Yuliana, penenun" },

    { figure: "", slot: "[ foto: penenun ende ]",
      caption: "Alat tenun gedog. Tegangan benang ditahan punggung penenun — sebabnya bekerja lebih dari dua jam berturut-turut hampir tidak mungkin." },

    { h2: "Kenapa harganya bukan tanda kesejahteraan" },
    { p: "Tenun ikat Ende dijual mahal di Jakarta. Itu benar. Yang tidak selalu benar adalah kesimpulan berikutnya — bahwa penenunnya ikut mahal. Rantai antara kampung dan galeri bisa berisi tiga sampai lima tangan, dan margin terbesar biasanya bukan di tangan yang menenun." },
    { p: "Kami tidak berpura-pura sudah memperbaiki itu. Yang kami lakukan cuma tiga: membeli langsung, membayar di muka penuh sebelum kain dikerjakan, dan menuliskan berapa yang sampai ke penenun. Untuk syal tenun di katalog kami, bagian penenun ada di kisaran 55–60 persen dari harga jual sebelum ongkos kirim." },

    { box: "Bekal angka", rows: [
      ["Penenun aktif di kampung itu", "9, delapan di antaranya di atas 60 tahun"],
      ["Waktu satu sarung ikat penuh", "3–4 bulan, dikerjakan di antara pekerjaan lain"],
      ["Pewarna", "Mengkudu (merah tanah), indigo (biru gelap)"],
      ["Yang kami beli", "Syal dan outer — bukan sarung upacara, yang bukan barang dagangan"],
      ["Bagian penenun", "55–60% dari harga jual, dibayar penuh di muka"]
    ] },

    { h2: "Yang tidak kami jual" },
    { p: "Ada tenun yang dipakai untuk kematian, perkawinan, dan penerimaan tamu adat. Kami tidak membelinya, tidak memotongnya jadi produk, dan tidak menawarkannya sebagai “edisi terbatas”. Bukan karena mahal — karena bukan milik kami untuk dijual." },
    { p: "Kalau motif tertentu ditolak Mama Yuliana untuk kami, kami tidak bertanya dua kali. Sejauh ini itu terjadi tiga kali." },

    { h2: "Apa yang sebenarnya dibutuhkan" },
    { p: "Membeli menahan; membeli tidak menyelamatkan. Yang bisa membuat jumlah penenun berhenti menyusut cuma satu: ada anak muda yang melihat menenun sebagai pekerjaan yang bisa menghidupi, bukan sebagai warisan yang wajib dihormati." },
    { p: "Itu artinya pesanan yang bisa diprediksi, bukan pesanan besar yang datang sekali lalu hilang setahun. Kami sedang mencoba yang pertama, dengan pesanan terjadwal dua kali setahun. Terlalu dini untuk menyebutnya berhasil." }
  ],

  "warna-ungu-dan-kenapa": [
    { p: "Gereja memakai ungu dua kali setahun: Adven dan Prapaskah. Kami memakainya sepanjang tahun, di hampir semua yang kami cetak. Beberapa pembaca menulis untuk menanyakan apakah itu keliru, atau setidaknya lancang. Pertanyaannya wajar, jadi ini jawabannya." },

    { h2: "Apa arti ungu di liturgi" },
    { p: "Ungu adalah warna masa persiapan: menunggu, bertobat, menahan diri. Ia dipakai justru pada dua musim ketika perayaan belum tiba. Setelah Adven datang putih Natal, setelah Prapaskah datang putih Paskah — dan ungu disimpan lagi." },
    { list: [
      "Putih — Natal, Paskah, pesta Tuhan dan orang kudus bukan martir.",
      "Merah — Pentakosta, Minggu Palma, pesta para martir.",
      "Hijau — Masa Biasa, sepanjang tahun yang tidak sedang merayakan apa pun secara khusus.",
      "Ungu — Adven dan Prapaskah, dan sering dipakai untuk misa arwah."
    ] },

    { h2: "Kenapa kami tidak memakai hijau" },
    { p: "Kalau mengikuti kalender, warna yang paling logis untuk sebuah toko yang buka setiap hari adalah hijau: Masa Biasa memakan porsi terbesar tahun liturgi. Kami tetap memilih ungu, dengan dua alasan yang mau kami tulis apa adanya." },
    { p: "Yang pertama jujur secara rohani: bagi banyak orang, hidup imannya lebih mirip Adven daripada Natal. Lebih sering menunggu daripada merayakan. Ungu terasa lebih tepat sebagai warna sehari-hari daripada warna dua musim." },
    { p: "Yang kedua jujur secara komersial: ungu bekerja sangat baik di sebelah kayu, kuningan, dan tenun berwarna tanah. Kami tidak akan berpura-pura alasan ini tidak ada. Kalau kami hanya menyebut alasan pertama, kami sedang merohanikan keputusan desain." },

    { figure: "/assets/hampers-adven.webp", ratio: "4 / 5",
      caption: "Hampers Adven — kotak ungu, lilin, dan kartu masa penantian. Satu-satunya produk kami yang warnanya benar-benar sesuai kalendernya." },

    { quote: "Warna liturgi milik perayaan, bukan milik toko. Yang kami pakai adalah rujukan, bukan jabatan." },

    { h2: "Batas yang kami jaga" },
    { p: "Ungu kami bukan ungu liturgi dalam arti yang mengikat. Kami tidak menyebut produk sebagai “resmi”, tidak menjual kain untuk kepentingan altar, dan tidak mencetak apa pun yang bisa disalahpahami sebagai perlengkapan liturgi. Perlengkapan liturgi punya aturannya sendiri, dan aturan itu bukan urusan katalog." },
    { p: "Kalau kamu mencari stola, kasula, atau antependium untuk paroki, belilah dari pemasok liturgi, bukan dari kami. Itu bukan kerendahan hati — itu pembagian tugas." }
  ],

  "gua-maria-kerep-ambarawa": [
    { p: "Ada dua hal di halaman yang sama di Kerep, Ambarawa, dan keduanya tidak berbicara satu sama lain. Yang pertama gua kecil dari pertengahan 1950-an: batu, pagar rendah, tempat lilin yang lelehannya bertumpuk bertahun-tahun. Yang kedua patung Bunda Maria setinggi puluhan meter, jauh lebih baru, yang tidak bisa masuk ke satu foto kalau kamu berdiri terlalu dekat." },
    { p: "Saya datang pagi hari kerja, sengaja, karena ingin tahu mana dari keduanya yang lebih dulu membuat orang berhenti." },

    { h2: "Gua yang tua" },
    { p: "Gua Maria Kerep sudah menjadi tujuan peziarah sejak 1950-an, dan bagian tertuanya masih terasa seperti tempat doa kampung: sederhana, sedikit lembap, tidak dirancang untuk kamera. Di jam tujuh pagi ada empat orang di sana. Tidak ada yang berbicara. Satu ibu mengganti air bunga tanpa menoleh ke arah saya sekali pun." },
    { p: "Yang membuat tempat ini nyaman bukan keindahannya, tapi ukurannya. Gua itu cukup kecil untuk membuat kamu merasa sedang berkunjung, bukan sedang menonton." },

    { h2: "Patung yang besar" },
    { p: "Lalu ada patung Bunda Maria Assumpta, dibangun jauh sesudahnya dan diresmikan pertengahan 2010-an. Tingginya puluhan meter dan sempat disebut sebagai salah satu yang tertinggi di kawasan ini. Dari jauh, ia menandai lokasi kompleks jauh sebelum kamu melihat gerbangnya." },
    { p: "Reaksi saya, kalau harus jujur, campur. Skala sebesar itu berhasil melakukan satu hal yang tidak bisa dilakukan gua kecil: ia membuat orang yang tidak berniat berziarah tetap datang, lalu berhenti. Tapi ia juga mengubah cara orang bergerak di kompleks — sebagian besar pengunjung pagi itu menuju patung lebih dulu, foto, baru turun ke gua kalau masih ada waktu." },
    { pair: [
      { figure: "/assets/kerep-assumpta.webp", ratio: "3 / 4",
        caption: "Foto Maria Assumpta, Kerep. Abaikan dua orang yang sedang saling jatuh cinta di depannya." },
      { figure: "/assets/kerep-roti.webp", ratio: "4 / 3",
        caption: "Abaikan yang ini juga. Ditaruh di sini hanya karena penulis dipaksa." }
    ] },

    { quote: "Tempat yang besar mengumpulkan orang. Tempat yang kecil menahan mereka. Kerep punya keduanya, dan urutannya menentukan bagaimana harimu terasa." },

    { figure: "/assets/kerep-gua.webp", slot: "[ foto: gua maria kerep ambarawa ]",
      caption: "Gua tuanya: patung Bunda Maria di ceruk batu, bunga di “tempat bunga”, dan lilin yang menyala sepanjang hari." },

    { h2: "Kalau membawa rombongan, balik urutannya" },
    { p: "Saran yang paling praktis dari pagi itu: masuk lewat gua dan jalan salib dulu, patung terakhir. Bukan karena patungnya kurang penting, tapi karena rombongan yang sudah selesai berfoto hampir selalu kehilangan ritme untuk berdoa sesudahnya. Dengan urutan dibalik, foto jadi penutup, bukan pembuka." },
    { list: [
      "Datang sebelum jam delapan kalau ingin gua yang sepi; kompleks mulai penuh menjelang tengah hari.",
      "Bawa jaket tipis. Ambarawa lebih dingin dari Semarang, terutama pagi dan setelah hujan.",
      "Jalur di dalam kompleks relatif ramah — sebagian besar bisa dilalui pelan-pelan oleh peserta lansia, meski ada bagian menanjak.",
      "Uang tunai kecil untuk lilin, bunga, dan parkir.",
      "Mei dan Oktober jauh lebih ramai. Untuk rombongan lansia, pilih bulan lain."
    ] },

    { box: "Bekal praktis", rows: [
      ["Lokasi", "Kerep, Ambarawa, Kabupaten Semarang, Jawa Tengah"],
      ["Dari Semarang", "± 40 km, sekitar 1–1,5 jam tergantung lalu lintas"],
      ["Dari Yogyakarta", "± 90 km lewat Magelang, sekitar 2,5–3 jam"],
      ["Biaya masuk", "Tanpa tiket; kotak persembahan di dalam kompleks"],
      ["Fasilitas", "Parkir bus, toilet, warung di sekitar kompleks, area misa"],
      ["Bisa digabung dengan", "Museum Kereta Api Ambarawa, atau Bandungan untuk menginap sejuk"],
      ["Paling tenang", "Hari kerja sebelum jam delapan pagi"]
    ] },

    { h2: "Yang saya bawa pulang" },
    { p: "Saya masuk dengan prasangka bahwa patung sebesar itu berlebihan, dan keluar tanpa prasangka itu sepenuhnya utuh. Bukan karena patungnya membuat saya terharu — tidak — tapi karena di bawahnya, sore itu, ada rombongan anak SMP yang berdoa dengan cara yang jelas tidak mereka pelajari dari brosur." },
    { p: "Devosi ternyata tidak terlalu peduli pada skala. Ia menempel pada apa pun yang tersedia: gua kecil dari 1950-an, atau bayangan patung yang terlalu besar untuk difoto." }
  ]
};
