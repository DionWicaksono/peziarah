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

import { trackSubmit } from "./track.js";

const FORMS = {
  pesanan: {
    id: "1FAIpQLSfupmYSyyj7ZoRfUu1bdvyHUTo7Ywx1l8JH_qIRuAQT2OXFXw",
    fields: {
      // Meta Conversions API matching (see README-TRACKING.md). Fill in the
      // entry IDs of the hidden _ua/_fbp/_fbc/_url questions; empty = not sent.
      _ua: "",
      _fbp: "",
      _fbc: "",
      _url: "",
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
      // Meta Conversions API matching (see README-TRACKING.md). Fill in the
      // entry IDs of the hidden _ua/_fbp/_fbc/_url questions; empty = not sent.
      _ua: "",
      _fbp: "",
      _fbc: "",
      _url: "",
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
      // Meta Conversions API matching (see README-TRACKING.md). Fill in the
      // entry IDs of the hidden _ua/_fbp/_fbc/_url questions; empty = not sent.
      _ua: "",
      _fbp: "",
      _fbc: "",
      _url: "",
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
      // Meta Conversions API matching (see README-TRACKING.md). Fill in the
      // entry IDs of the hidden _ua/_fbp/_fbc/_url questions; empty = not sent.
      _ua: "",
      _fbp: "",
      _fbc: "",
      _url: "",
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
  // Landing "Shuttle Harian" — Kerkhof Muntilan <-> Sendangsono seat booking
  shuttle: {
    id: "1FAIpQLScXaIE6faz3KBrdQAOKvOcsmEP0H03MKfPA36zE0qOqFENxXA",
    fields: {
      // Meta Conversions API matching (see README-TRACKING.md). Fill in the
      // entry IDs of the hidden _ua/_fbp/_fbc/_url questions; empty = not sent.
      _ua: "",
      _fbp: "",
      _fbc: "",
      _url: "",
      kode: "entry.745457333",
      nama: "entry.861171670",
      telepon: "entry.998831788",
      tanggal: "entry.2031690989",
      jumlah_kursi: "entry.637978168",
      keberangkatan: "entry.761298991",
      kembali: "entry.1815178876"
    }
  },
  // /paket-paroki/ — parish-scale volume orders (Komuni, Krisma, lingkungan).
  // No Google Form provisioned yet: with an empty id, submit() archives to
  // localStorage and warns, and the page still hands off to WhatsApp.
  paroki: {
    id: "",
    fields: {
      // Meta Conversions API matching (see README-TRACKING.md). Fill in the
      // entry IDs of the hidden _ua/_fbp/_fbc/_url questions; empty = not sent.
      _ua: "",
      _fbp: "",
      _fbc: "",
      _url: "",
      kode: "",
      paroki: "",
      kota: "",
      nama_kontak: "",
      peran: "",
      telepon: "",
      sakramen: "",
      jumlah_peserta: "",
      tanggal_acara: "",
      barang: "",
      catatan: ""
    }
  },
  // /tanya/ — Tanya Awam, anonymous reader questions.
  // Deliberately NOT archived to localStorage: these questions are the kind a
  // visitor would not want found on a shared device. Callers must pass
  // { archive: false } — see submit() below.
  tanya: {
    id: "1FAIpQLSf0LkAqQ-sOel0aKNowq-NEp5o4D4yLeGb1kGWANLabgflQ_Q",
    fields: {
      kode: "entry.1901366121",
      pertanyaan: "entry.22320445",
      topik: "entry.1774200180"
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
// Browser context for Meta Conversions API matching. Sent only on forms that
// have the hidden _ua/_fbp/_fbc/_url questions mapped above, and never on
// tanya or vendor. The Apps Script reads these from the response and forwards
// them to Meta; GA never sees them.
const META_KINDS = ["pesanan", "ziarah", "ziarah-susun-sendiri", "concierge", "shuttle", "paroki"];

function cookie(name) {
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : "";
  } catch (e) { return ""; }
}

function metaContext() {
  let fbc = cookie("_fbc");
  if (!fbc) {
    // Pixel normally sets _fbc itself; build it from ?fbclid= if it hasn't yet.
    try {
      const id = new URLSearchParams(location.search).get("fbclid");
      if (id) fbc = "fb.1." + Date.now() + "." + id;
    } catch (e) {}
  }
  return {
    _ua: (typeof navigator !== "undefined" && navigator.userAgent) || "",
    _fbp: cookie("_fbp"),
    _fbc: fbc,
    _url: (typeof location !== "undefined" && location.href.split("#")[0]) || ""
  };
}

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


// True once a Google Form endpoint is wired for this form. Pages whose only
// record of a submission is the Sheet must gate their UI on this instead of
// letting someone type a question that has nowhere to go.
export function hasEndpoint(kind) {
  return !!(FORMS[kind] && FORMS[kind].id);
}

// Fire-and-forget. Resolves true once the request was dispatched without a
// network error — NOT a guarantee that Google accepted it. Resolves the string
// "no-endpoint" when no form id is configured, which is NOT retryable.
export function submit(kind, values, opts) {
  // opts.archive === false skips the local copy entirely. Only Tanya Awam uses
  // it: a question about a marriage or a lapsed child must not sit in
  // localStorage on a phone someone else might pick up.
  if (!opts || opts.archive !== false) archive(kind, values);

  // Conversion event fires on the attempt, not on Google's reply (which no-cors
  // cannot read). Wrapped so a tracking error can never block an order.
  try { trackSubmit(kind, values); } catch (e) {}

  const form = FORMS[kind];
  if (!form || !form.id) {
    // Distinguish "never provisioned" from "network failed": callers cannot
    // offer a useful retry for the former. Tanya Awam depends on this — it has
    // no local archive and no WhatsApp fallback, so an unconfigured endpoint
    // destroys the submission outright.
    if (typeof console !== "undefined") {
      console.warn("[forms] no endpoint mapped for", kind,
        (!opts || opts.archive !== false)
          ? "— archived locally only"
          : "— NOT archived (archive:false) and NOT sent: this submission is lost");
    }
    return Promise.resolve("no-endpoint");
  }

  if (META_KINDS.indexOf(kind) !== -1) values = Object.assign({}, values, metaContext());

  const body = new FormData();
  Object.keys(values).forEach(k => {
    const entry = form.fields[k];
    const v = values[k];
    if (entry && v !== undefined && v !== null && String(v).trim() !== "") {
      body.append(entry, String(v));
    }
  });

  // keepalive: the caller usually navigates straight to WhatsApp (window.open,
  // or a location change on mobile) and an in-flight fetch would be cancelled
  // with the tab that started it. keepalive lets the browser finish the POST
  // after teardown. Body is far below the 64 KB keepalive cap.
  return fetch(`https://docs.google.com/forms/d/e/${form.id}/formResponse`, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    body
  }).then(() => true).catch(() => false);
}
