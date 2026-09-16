// TANYA AWAM — anonymous reader questions with verified answers.
//
// One entry per published answer. Adding an answer means adding an object
// here; the hub archive, the search, and the answer page all read this file.
//
// Rules that live in design.md §7c and are enforced by this shape:
//   - No identity fields. `source.alias` is a credential, never a name, and
//     there is no field for the asker at all beyond topic and date.
//   - No quasi-identifiers: topic + month only. Do NOT add gender, age band,
//     city, parish, or occupation — four such fields name a person in a
//     parish-sized readership.
//   - `blocks[].kind` is one of ajaran | disiplin | pendapat. The labels are
//     load-bearing: they are what makes the rubric honest rather than oracular.
//     A block with no kind renders as plain prose (use for a closing line).
//   - Corrections are dated and in place, never silent. Fill `correction` and
//     bump `updated`.
//   - No product links in any text here. Ever. The shop does not appear on an
//     answer page.

export const TOPICS = [
  { id: "pernikahan", name: "Pernikahan & keluarga" },
  { id: "sakramen", name: "Sakramen & liturgi" },
  { id: "iman", name: "Iman & keraguan" },
  { id: "moral", name: "Moral & hidup sehari-hari" },
  { id: "lain", name: "Lain-lain" }
];

export const BLOCK_KINDS = {
  ajaran: {
    label: "Ajaran",
    note: "Yang diimani dan diajarkan Gereja. Tidak berubah karena tempat atau selera."
  },
  disiplin: {
    label: "Disiplin",
    note: "Aturan atau kebiasaan yang berlaku — bisa berbeda antarkeuskupan, bisa berubah."
  },
  pendapat: {
    label: "Pendapat",
    note: "Pertimbangan pastoral narasumber. Boleh Anda timbang, boleh Anda tidak setuju."
  }
};

export const ANSWERS = [
  {
    slug: "menikah-catatan-sipil-komuni",
    topic: "pernikahan",
    date: "2026-09-16",
    updated: "2026-09-16",
    q: "Saya menikah di catatan sipil saja, tidak di gereja. Sudah delapan tahun. Setiap Misa saya duduk saja waktu orang lain maju. Apa saya memang tidak boleh?",
    title: "Menikah di catatan sipil, bolehkah menyambut komuni?",
    dek: "Seorang pembaca bertanya tanpa nama tentang perkawinan sipil dan komuni. Dijawab oleh imam diosesan.",
    source: { alias: "Romo A.", credential: "imam diosesan, 14 tahun karya paroki" },
    blocks: [
      { kind: "ajaran", text: "Bagi orang Katolik, perkawinan dianggap sah kalau dirayakan dalam bentuk yang ditetapkan Gereja — di hadapan imam atau diakon dan dua saksi. Menikah hanya di catatan sipil berarti bentuk itu tidak terpenuhi, dan Gereja belum memandang perkawinan itu sah. Karena itulah selama ini ada yang mengganjal waktu Anda hendak menyambut komuni." },
      { kind: "disiplin", text: "Situasi ini bisa dibereskan, dan jauh lebih sederhana daripada yang dibayangkan kebanyakan orang. Namanya konvalidasi atau pengesahan perkawinan. Anda berdua datang ke paroki, mengikuti pembekalan singkat, lalu menyatakan kesepakatan nikah di hadapan imam dan dua saksi. Tidak perlu gaun, tidak perlu resepsi, tidak perlu mengumumkan apa pun kepada siapa pun. Di banyak paroki urusannya selesai dalam hitungan minggu." },
      { kind: "pendapat", text: "Saya ingin mengatakan satu hal yang sering tidak dikatakan. Delapan tahun duduk sendirian di bangku sementara orang lain maju itu berat, dan keberatan itu nyata. Tapi kesetiaan Anda datang ke Misa selama delapan tahun tanpa bisa menyambut komuni bukan tanda Anda jauh. Sebaliknya. Datanglah ke pastor paroki, bukan dengan rasa bersalah, tapi dengan kalimat sederhana: saya mau membereskan ini. Itu percakapan yang sudah biasa kami dengar." }
    ],
    correction: null
  }
];

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
  "Agustus", "September", "Oktober", "November", "Desember"];

// Month and year only — never a day. A precise date is one more field that
// narrows who asked.
export function monthLabel(iso) {
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function topicName(id) {
  const t = TOPICS.find(x => x.id === id);
  return t ? t.name : "Lain-lain";
}

export function bySlug(slug) {
  return ANSWERS.find(a => a.slug === slug) || null;
}

export function latest(n) {
  return ANSWERS.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, n || ANSWERS.length);
}

// Topics in TOPICS order, empty ones dropped — the archive should never show a
// heading with nothing under it.
export function grouped() {
  return TOPICS
    .map(t => ({ ...t, items: latest().filter(a => a.topic === t.id) }))
    .filter(g => g.items.length > 0);
}
