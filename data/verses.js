// Footer verse rotation — one verse per 30-day window, same for every visitor on
// a given day, advancing forever with no backend. Both the list and the clock
// live here so all three pages read one source.
//
// To change the cadence: edit WINDOW_DAYS (e.g. 7 for weekly).
// To add a verse: append to VERSES — the loop length follows the array.
// On a real backend: GET /api/verse returning { t, r }.

const EPOCH = Date.UTC(2026, 0, 1); // window 0 starts 1 Jan 2026
const WINDOW_DAYS = 30;

export const VERSES = [
  { t: "Sebab kami hidup karena percaya, bukan karena melihat", r: "2 Kor 5:7" },
  { t: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku", r: "Mzm 119:105" },
  { t: "Tunjukkanlah jalan-Mu kepadaku, ya Tuhan, supaya aku hidup dalam kebenaran-Mu", r: "Mzm 86:11" },
  { t: "Akulah jalan dan kebenaran dan hidup", r: "Yoh 14:6" },
  { t: "Berbahagialah orang yang kekuatannya di dalam Engkau, yang berhasrat mengadakan perjalanan ke Sion", r: "Mzm 84:6" },
  { t: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat", r: "Mat 11:28" },
  { t: "Hatiku gelisah sampai ia beristirahat di dalam Engkau", r: "St. Agustinus" },
  { t: "Terangmu harus bercahaya di depan orang", r: "Mat 5:16" },
  { t: "Jadilah pada-Ku menurut perkataan-Mu", r: "Luk 1:38" },
  { t: "Kasih karunia Tuhan cukup bagimu, sebab justru dalam kelemahanlah kuasa-Nya menjadi sempurna", r: "2 Kor 12:9" },
  { t: "Sekalipun aku berjalan dalam lembah kekelaman, aku tidak takut", r: "Mzm 23:4" },
  { t: "Ia yang memulai pekerjaan yang baik di antara kamu akan meneruskannya sampai akhir", r: "Flp 1:6" }
];

// Which window are we in? Floor of elapsed windows, wrapped to the list length.
export function verseIndex(now = Date.now()) {
  const windows = Math.floor((now - EPOCH) / (WINDOW_DAYS * 86400000));
  return ((windows % VERSES.length) + VERSES.length) % VERSES.length;
}

// Display string for the footer: “TEXT” — REF, uppercased by CSS at render.
export function currentVerse(now = Date.now()) {
  const v = VERSES[verseIndex(now)];
  return `\u201C${v.t}\u201D \u2014 ${v.r}`;
}
