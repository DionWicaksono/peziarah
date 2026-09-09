// FORM SUBMISSION — Google Forms as the order/enquiry log.
//
// Each form's hidden POST endpoint accepts FormData keyed by entry.NNNNNNNNN.
// The POST is `mode: "no-cors"`, so the browser cannot read Google's reply —
// we never know for certain that it landed. Two consequences, both handled:
//   1. Every submission is ALSO written to localStorage (see `archive()`), so a
//      silently-failed POST is still recoverable from the buyer's device.
//   2. The UI never claims "sent" on Google's behalf — it shows a reference code
//      and hands off to WhatsApp, which is the real confirmation channel.
//
// Replacing this with a real backend later means rewriting `submit()` only.

const FORMS = {
  pesanan: {
    id: "1FAIpQLSfupmYSyyj7ZoRfUu1bdvyHUTo7Ywx1l8JH_qIRuAQT2OXFXw",
    fields: {
      kode_pesanan: "entry.338213574",
      nama: "entry.1225691919",
      telepon: "entry.1614373824",
      email: "entry.498016497",
      alamat: "entry.1386858446",
      zona_pengiriman: "entry.1243107839",
      subtotal: "entry.975037081",
      ongkir: "entry.1471604901",
      total: "entry.1829428442",
      rincian_barang: "entry.707483323",
      catatan: "entry.1946709289"
    }
  },
  ziarah: {
    id: "1FAIpQLSfbu1EGuCCr06ZgNSSvXQzYFmMYXA5GezBiqT-gUjHOGI-Ttw",
    fields: {
      kode: "entry.648078294",
      rombongan: "entry.153381432",
      nama_kontak: "entry.1277617868",
      telepon: "entry.1889033760",
      jumlah_peserta: "entry.1452372506",
      bulan: "entry.1535909132",
      rute: "entry.14233846",
      seragam: "entry.2025480568",
      intensi: "entry.1516614689"
    }
  },
  // Ziarah > Isi Form > tab "Susun Sendiri"
  "ziarah-susun-sendiri": {
    id: "1FAIpQLSepbQvqoJt0wh-1A1JsxkmAkDF2ymI2PPGIN2OUv2FO9Fp-CA",
    fields: {
      kode: "entry.703849438",
      nama_kontak: "entry.816256591",
      telepon: "entry.403766276",
      jumlah_orang: "entry.1569515252",
      intensi: "entry.1548954716",
      destinasi: "entry.1213985974",
      gaya: "entry.1491789214",
      pengalaman_rohani: "entry.1153465734",
      minat: "entry.1618334888",
      pace: "entry.1424827999"
    }
  },
  // /ziarah/grup-kecil/ — private trips, 2-8 people
  concierge: {
    id: "1FAIpQLSfkUvh1ZxrtD5iwbTXDM2-QV9kxiM3xxFe2UYs07zi2MwU9tA",
    fields: {
      kode: "entry.171551440",
      nama_kontak: "entry.1590764818",
      telepon: "entry.812654982",
      jumlah_orang: "entry.1654339630",
      lama: "entry.829856438",
      waktu: "entry.653476284",
      destinasi: "entry.1938164244",
      perhatian: "entry.2283438",
      intensi: "entry.297185404"
    }
  },
  vendor: {
    id: "1FAIpQLSdeoeidNDOTr8dTvisyB1IlP6jQNQr73Ple-srOn9TmSBFMUw",
    fields: {
      kode: "entry.541252923",
      brand: "entry.2026895337",
      nama_kontak: "entry.66540725",
      telepon: "entry.56137646",
      kota: "entry.23845835",
      kapasitas: "entry.1336273248",
      katalog_link: "entry.1961492205",
      kategori: "entry.435907536",
      proses: "entry.1545195110"
    }
  }
};

const ARCHIVE_KEY = "peziarah.submissions.v1";

// Local copy of everything submitted, newest last, capped at 50 entries.
function archive(kind, values) {
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push({ kind, at: new Date().toISOString(), values });
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(list.slice(-50)));
  } catch (e) {}
}

export function getArchive() {
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

// Fire-and-forget. Resolves true once the request was dispatched without a
// network error — NOT a guarantee that Google accepted it.
export function submit(kind, values) {
  archive(kind, values);

  const form = FORMS[kind];
  if (!form || !form.id) {
    if (typeof console !== "undefined") console.warn("[forms] no endpoint mapped for", kind, "— archived locally only");
    return Promise.resolve(false);
  }

  const body = new FormData();
  Object.keys(values).forEach(k => {
    const entry = form.fields[k];
    const v = values[k];
    if (entry && v !== undefined && v !== null && String(v).trim() !== "") {
      body.append(entry, String(v));
    }
  });

  return fetch(`https://docs.google.com/forms/d/e/${form.id}/formResponse`, {
    method: "POST",
    mode: "no-cors",
    body
  }).then(() => true).catch(() => false);
}
