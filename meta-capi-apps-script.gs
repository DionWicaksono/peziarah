/**
 * PEZIARAH — Meta Conversions API from Google Forms
 * =================================================
 * Paste this whole file into a new project at https://script.google.com
 * (not on the website — the access token must never be public).
 *
 * What it does
 *   Every new response on the forms listed in FORMS is sent to Meta's
 *   Conversions API: checkout ("pesanan") as Purchase, the others as Lead.
 *   event_id = the order/lead code, the same ID the website Pixel sends, so
 *   Meta counts each conversion once (Pixel + CAPI are deduplicated).
 *   Phone, email and first name are SHA-256 hashed before they leave Google.
 *
 * Setup (once)
 *   1. Fill in FORMS below: each form's EDIT link (the URL ending in /edit).
 *   2. Project Settings (gear) > Script Properties > Add:
 *        META_CAPI_TOKEN   = access token from Events Manager
 *        META_TEST_CODE    = (optional) code from Events Manager > Test events.
 *                            Remove it when testing is done.
 *   3. Select the function `setup` > Run. Approve the permissions.
 *   4. Submit a test order on the site; check Events Manager > Test events.
 *   Re-run `setup` whenever you change FORMS. Run `showLastResponses` to see
 *   the question titles the script detects if anything is not matched.
 *
 * Optional: "paid" event
 *   Fill in PAID.sheetUrl with the orders spreadsheet. When the status column
 *   is changed to one of PAID.values, a "PaidOrder" custom event is sent
 *   (create a Custom Conversion on it in Events Manager to optimise for it).
 *
 *   With sheetUrl filled in, receipts issued at /admin/kuitansi/ no longer
 *   leave an extra row: the script writes "Ya" (or "DP · sisa …") in a
 *   "Lunas" column on the ORIGINAL order row and deletes the receipt row.
 *   The "Lunas" column is created at the far right if it doesn't exist.
 *   Run `cleanupLunasRows` once to fold receipts made before this change.
 *
 * Invoice / kuitansi PDF in Drive (admin copy)
 *   The site uploads the EXACT PDF it generates (same file the buyer gets) to
 *   this script, which files it in Drive as
 *   "Invoice Peziarah/<yyyy-MM>/Invoice-PZ-XXXXX.pdf" (or Kuitansi-…) and writes
 *   the link into an "Invoice" / "Kuitansi" column on every row with that code.
 *   Happens on checkout (silently), on the buyer's invoice download, and on
 *   both buttons in /admin/kuitansi/. Nothing is sent to the buyer.
 *   Only codes that already exist in the order sheet are accepted.
 *   Setup: run `setup` once more (grants Drive), then Deploy > New deployment >
 *   type Web app > Execute as: Me > Who has access: Anyone > Deploy. Paste the
 *   Web app URL into DRIVE_URL in data/invoice.js (both copies) and upload it.
 *   After later edits to this script: Deploy > Manage deployments > edit >
 *   Version: New version (the URL stays the same).
 */

const PIXEL_ID = "1005932122517702";
const GRAPH_VERSION = "v26.0";
const SITE = "https://peziarah.com";

// kind: matches data/forms.js on the site. event: Meta event name.
// page: fallback event_source_url when the hidden _url field is empty.
const FORMS = [
  { kind: "pesanan",              event: "Purchase", page: "/keranjang/",          editUrl: "https://docs.google.com/forms/d/1VWa_Z5CAhBTgWw982v0baTiTfZIJi8P6m-TVtiqGqbo/edit" },
  { kind: "ziarah",               event: "Lead",     page: "/ziarah/",             editUrl: "PASTE_EDIT_LINK" },
  { kind: "ziarah-susun-sendiri", event: "Lead",     page: "/ziarah/",             editUrl: "PASTE_EDIT_LINK" },
  { kind: "concierge",            event: "Lead",     page: "/ziarah/grup-kecil/",  editUrl: "PASTE_EDIT_LINK" },
  { kind: "shuttle",              event: "Lead",     page: "/",                    editUrl: "PASTE_EDIT_LINK" },
  // { kind: "paroki",            event: "Lead",     page: "/paket-paroki/",       editUrl: "PASTE_EDIT_LINK" },
];

// Optional paid-order event. Leave sheetUrl empty to switch it off.
const PAID = {
  sheetUrl: "https://docs.google.com/spreadsheets/d/1YS8--5RpLPafhfv1k0MC3D4VFO3RPAADbi1vlNNPP34/edit",
  statusHeader: /status/i,               // header of the column you update
  values: ["lunas", "paid", "dibayar"]   // any of these (case-insensitive) = paid
};

// Drive folder for invoice / kuitansi PDFs uploaded by the site.
const INVOICE = { folder: "Invoice Peziarah" };

// GA4 purchase, sent when an order is first marked LUNAS (Measurement Protocol).
// apiSecret: GA4 Admin > Data streams > peziarah.com > Measurement Protocol API
// secrets > Create. Best kept out of this file: Apps Script > Project Settings >
// Script Properties > GA_API_SECRET. Neither set = off.
const GA = { measurementId: "G-H8J9GKJ2NT", apiSecret: "" };

// How question titles are recognised (case-insensitive). Adjust if
// showLastResponses() shows a title that isn't picked up.
const MATCH = {
  code:  /^(kode|kode pesanan|kode_pesanan)$|kode/i,
  phone: /telepon|whatsapp|^wa\b|no\.? ?hp|nomor/i,
  email: /e-?mail/i,
  name:  /nama/i,
  total: /^total/i,
  note:  /catatan/i,
  ua:    /^_ua$/,
  fbp:   /^_fbp$/,
  fbc:   /^_fbc$/,
  url:   /^_url$/
};

// ---------------------------------------------------------------------------

function setup() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty("META_CAPI_TOKEN")) throw new Error("Add META_CAPI_TOKEN in Project Settings > Script Properties first.");

  ScriptApp.getProjectTriggers().forEach(t => {
    const h = t.getHandlerFunction();
    if (h === "onFormSubmitCapi" || h === "onPaidEdit") ScriptApp.deleteTrigger(t);
  });

  const map = {};
  FORMS.forEach(f => {
    if (!f.editUrl || f.editUrl.indexOf("PASTE") === 0) { Logger.log("Skipped (no edit link): " + f.kind); return; }
    const form = FormApp.openByUrl(f.editUrl);
    map[form.getId()] = f.kind;
    ScriptApp.newTrigger("onFormSubmitCapi").forForm(form).onFormSubmit().create();
    Logger.log("Connected: " + f.kind + " (" + form.getTitle() + ")");
  });
  props.setProperty("FORM_MAP", JSON.stringify(map));

  if (PAID.sheetUrl) {
    const ss = SpreadsheetApp.openByUrl(PAID.sheetUrl);
    ScriptApp.newTrigger("onPaidEdit").forSpreadsheet(ss).onEdit().create();
    Logger.log("Paid-order watcher on: " + ss.getName());
  }
  Logger.log("Done. Test mode: " + (props.getProperty("META_TEST_CODE") ? "ON" : "off"));
}

function onFormSubmitCapi(e) {
  try {
    const map = JSON.parse(PropertiesService.getScriptProperties().getProperty("FORM_MAP") || "{}");
    const kind = map[e.source.getId()];
    const cfg = FORMS.filter(f => f.kind === kind)[0];
    if (!cfg) return;

    const a = answers(e.response.getItemResponses().map(r => [r.getItem().getTitle(), r.getResponse()]));
    // Invoice PDF downloads and paid receipts share the pesanan form; they are not new orders.
    if (kind === "pesanan" && /^\[(LUNAS|DIKIRIM)\]/.test(String(a.note || ""))) {
      if (PAID.sheetUrl) { Utilities.sleep(4000); cleanupLunasRows(); }
      return;
    }
    // Orders (checkout or invoice) are unpaid: Purchase is sent at LUNAS, see sendMetaPurchase.
    if (kind === "pesanan") return;
    sendPurchase(cfg, a, e);
  } catch (err) {
    logError("onFormSubmitCapi", err);
  }
}

function sendPurchase(cfg, a, e) {
  {
    const ts = Math.floor(e.response.getTimestamp().getTime() / 1000);

    const custom = { currency: "IDR" };
    if (cfg.event === "Purchase") custom.value = toNumber(a.total);
    else custom.content_name = kind;

    send({
      event_name: cfg.event,
      event_time: ts,
      event_id: a.code || undefined,
      event_source_url: a.url || (SITE + cfg.page),
      user_data: userData(a),
      custom_data: custom
    });
  }
}

function onPaidEdit(e) {
  try {
    const sh = e.range.getSheet();
    const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    const statusCol = headers.findIndex(h => PAID.statusHeader.test(h)) + 1;
    if (!statusCol || e.range.getColumn() !== statusCol || e.range.getRow() < 2) return;
    const v = String(e.value || "").trim().toLowerCase();
    if (PAID.values.indexOf(v) === -1) return;

    const row = sh.getRange(e.range.getRow(), 1, 1, headers.length).getValues()[0];
    const a = answers(headers.map((h, i) => [h, row[i]]));
    if (!a.code) return;

    send({
      event_name: "PaidOrder",
      event_time: Math.floor(Date.now() / 1000),
      event_id: "paid-" + a.code,
      action_source: "system_generated",
      user_data: userData(a),
      custom_data: { currency: "IDR", value: toNumber(a.total), order_id: a.code }
    });
  } catch (err) {
    logError("onPaidEdit", err);
  }
}

// Folds every "[LUNAS]" receipt row and "[DIKIRIM]" shipping row (from /admin/resi/)
// into its original order row ("Lunas" / "Dikirim" column), then deletes it.
// Runs automatically after each receipt; safe to run by hand any time.
function cleanupLunasRows() {
  if (!PAID.sheetUrl) throw new Error("Fill in PAID.sheetUrl first.");
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    SpreadsheetApp.openByUrl(PAID.sheetUrl).getSheets().forEach(sh => {
      if (sh.getLastRow() < 2) return;
      let headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
      const codeCol = headers.findIndex(h => /^kode_pesanan$|^kode/i.test(h.trim()));
      const noteCol = headers.findIndex(h => MATCH.note.test(h));
      if (codeCol < 0 || noteCol < 0) return;
      const data = sh.getRange(2, 1, sh.getLastRow() - 1, headers.length).getValues();
      const TAG = /^\[(LUNAS|DIKIRIM)\]/;
      if (!data.some(r => TAG.test(String(r[noteCol])))) return;

      const colFor = name => {
        let c = headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase() || (name === "Lunas" && /^paid$/i.test(h.trim())));
        if (c < 0) { c = sh.getLastColumn(); sh.getRange(1, c + 1).setValue(name); headers = headers.concat([name]); }
        return c;
      };
      const needsLunas = data.some(r => /^\[LUNAS\]/.test(String(r[noteCol])));
      const needsSent = data.some(r => /^\[DIKIRIM\]/.test(String(r[noteCol])));
      const lunasCol = needsLunas ? colFor("Lunas") : -1;
      const sentCol = needsSent ? colFor("Dikirim") : -1;

      const toDelete = [];
      data.forEach((r, i) => {
        const note = String(r[noteCol]);
        if (!TAG.test(note)) return;
        const isSent = /^\[DIKIRIM\]/.test(note);
        const norm = v => String(v).toUpperCase().replace(/\s+/g, "");
        const code = norm(r[codeCol]);
        let found = false;
        const m = note.match(/sisa (Rp[\s\d.,]+)/);
        const mark = isSent ? note.replace(/^\[DIKIRIM\]\s*/, "") : (m ? "DP · sisa " + m[1].trim() : "Ya");
        // newest checkout row with the same code above this receipt; else the newest invoice-PDF row
        let target = -1, fallback = -1;
        for (let j = i - 1; j >= 0; j--) {
          if (norm(data[j][codeCol]) !== code) continue;
          const n = String(data[j][noteCol]);
          if (TAG.test(n)) continue;
          if (/^\[INVOICE PDF\]/.test(n)) { if (fallback < 0) fallback = j; continue; }
          target = j; break;
        }
        if (target < 0) target = fallback;
        if (target >= 0) {
          if (isSent) {
            // Shipments accumulate: "13 Okt · JNE · isi: … | 20 Okt · … · lengkap"
            const cell = sh.getRange(target + 2, sentCol + 1), prev = String(cell.getValue() || "").trim();
            cell.setValue(prev ? prev + " | " + mark : mark);
          } else {
            // The kuitansi is the final word: copy its (possibly discounted / re-addressed)
            // values onto the order row before the receipt row is deleted.
            const KEEP = /^(nama|telepon|email|alamat|zona_pengiriman|subtotal|ongkir|total|rincian_barang)$/i;
            headers.forEach((h, c) => {
              if (c >= r.length || !KEEP.test(h.trim())) return;
              const v = r[c];
              if (v === "" || v == null || String(v) === String(data[target][c])) return;
              sh.getRange(target + 2, c + 1).setValue(v);
              data[target][c] = v;
            });
            const cell = sh.getRange(target + 2, lunasCol + 1), first = !String(cell.getValue() || "").trim();
            cell.setValue(mark);
            if (first) { sendGaPurchase(headers, data[target], code); sendMetaPurchase(headers, data[target], code); }
          }
          Logger.log("Row " + (target + 2) + " (" + code + ") -> " + mark);
          toDelete.push(i + 2);
          found = true;
        }
        if (!found) Logger.log("Kept row " + (i + 2) + ": no order row above it with code \"" + code + "\" (column " + headers[codeCol] + ")");
        // no matching order row: keep the receipt row so nothing is lost
      });
      toDelete.reverse().forEach(row => sh.deleteRow(row));
      Logger.log(sh.getName() + ": folded " + toDelete.length + " receipt row(s)");
    });
  } finally {
    lock.releaseLock();
  }
}

// --- invoice / kuitansi PDF from the site --------------------------------

const TAGGED = /^\[(LUNAS|DIKIRIM)\]/;
const normCode = v => String(v).toUpperCase().replace(/\s+/g, "");

// Web app endpoint. Body (text/plain JSON): { code, kind: "invoice"|"kuitansi", pdf: base64 }
function doPost(e) {
  const reply = t => ContentService.createTextOutput(t);
  try {
    const p = JSON.parse(e.postData.contents);
    const code = normCode(p.code || "");
    if (!/^PZ-[A-Z0-9]{4,8}$/.test(code)) return reply("bad code");
    const ga = p.ga && /^[\d.]{6,40}$/.test(String(p.ga.cid)) ? p.ga.cid + "|" + (/^\d{1,12}$/.test(String(p.ga.sid)) ? p.ga.sid : "") : "";
    if (p.kind === "ga") {
      if (!ga || !PAID.sheetUrl) return reply("skip");
      for (let i = 0; i < 5 && !codeRows(code).length; i++) Utilities.sleep(4000);
      writeLink(code, ga, "GA");
      return reply("ok");
    }
    const label = p.kind === "kuitansi" ? "Kuitansi" : "Invoice";
    const bytes = Utilities.base64Decode(String(p.pdf || ""));
    if (bytes.length < 1000 || bytes.length > 4e6 || bytes[0] !== 37 || bytes[1] !== 80 || bytes[2] !== 68 || bytes[3] !== 70) return reply("bad pdf");
    if (!PAID.sheetUrl) return reply("no sheet");
    // The order row can land a few seconds after the upload; only known codes are filed.
    let rows = 0;
    for (let i = 0; i < 5 && !(rows = codeRows(code).length); i++) Utilities.sleep(4000);
    if (!rows) return reply("unknown code");
    const name = label + "-" + code + ".pdf";
    const folder = invoiceFolder(new Date());
    const old = folder.getFilesByName(name);
    while (old.hasNext()) old.next().setTrashed(true);
    const url = folder.createFile(Utilities.newBlob(bytes, "application/pdf", name)).getUrl();
    writeLink(code, url, label);
    if (label === "Invoice") writePrintLinks(code);
    if (label === "Invoice" && ga) writeLink(code, ga, "GA");
    if (label === "Kuitansi") { Utilities.sleep(8000); writeLink(code, url, label); } // after the [LUNAS] row is folded
    Logger.log(name + " -> " + url);
    return reply("ok");
  } catch (err) {
    logError("doPost", err);
    return reply("error");
  }
}

function invoiceFolder(d) {
  const sub = (p, n) => { const it = p.getFoldersByName(n); return it.hasNext() ? it.next() : p.createFolder(n); };
  return sub(sub(DriveApp.getRootFolder(), INVOICE.folder), Utilities.formatDate(d, "Asia/Jakarta", "yyyy-MM"));
}

// [{sheet, row, headers}] for every non-receipt row carrying this code.
function codeRows(code) {
  const out = [];
  SpreadsheetApp.openByUrl(PAID.sheetUrl).getSheets().forEach(sh => {
    if (sh.getLastRow() < 2) return;
    const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    const codeCol = headers.findIndex(h => /^kode_pesanan$|^kode/i.test(h.trim()));
    const noteCol = headers.findIndex(h => MATCH.note.test(h));
    if (codeCol < 0) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, headers.length).getValues().forEach((r, i) => {
      if (normCode(r[codeCol]) === code && !(noteCol >= 0 && TAGGED.test(String(r[noteCol])))) out.push({ sh, row: i + 2, headers });
    });
  });
  return out;
}

// Poster orders: copy each "↳ File cetak: <url>" from rincian_barang into a
// clickable "File Cetak" column (URLs inside multi-line text don't auto-link).
function writePrintLinks(code) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    codeRows(code).forEach(({ sh, row, headers }) => {
      const ic = headers.findIndex(h => /rincian|barang/i.test(h));
      if (ic < 0) return;
      const urls = String(sh.getRange(row, ic + 1).getValue()).match(/https:\/\/peziarah\.com\/peta-alkitab\/\S+/g);
      if (!urls) return;
      let c = headers.findIndex(h => h.trim().toLowerCase() === "file cetak");
      if (c < 0) { c = sh.getLastColumn(); sh.getRange(1, c + 1).setValue("File Cetak"); headers.push("File Cetak"); }
      const cell = sh.getRange(row, c + 1);
      if (urls.length === 1) { cell.setValue(urls[0]); return; }
      const text = urls.map((u, i) => "Poster " + (i + 1)).join("\n");
      const rt = SpreadsheetApp.newRichTextValue().setText(text);
      let at = 0;
      urls.forEach((u, i) => { const s = "Poster " + (i + 1); rt.setLinkUrl(at, at + s.length, u); at += s.length + 1; });
      cell.setRichTextValue(rt.build());
    });
  } finally {
    lock.releaseLock();
  }
}

function writeLink(code, url, label) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    codeRows(code).forEach(({ sh, row, headers }) => {
      let c = headers.findIndex(h => h.trim().toLowerCase() === label.toLowerCase());
      if (c < 0) { c = sh.getLastColumn(); sh.getRange(1, c + 1).setValue(label); headers.push(label); }
      sh.getRange(row, c + 1).setValue(url);
    });
  } finally {
    lock.releaseLock();
  }
}

// --- GA4 purchase on payment ------------------------------------------------

// Once per order: the first [LUNAS] (full or DP) counts the whole order total.
function sendGaPurchase(headers, row, code) {
  const secret = GA.apiSecret || PropertiesService.getScriptProperties().getProperty("GA_API_SECRET");
  if (!secret) return;
  try {
    const col = re => headers.findIndex(h => re.test(String(h).trim()));
    const get = re => { const c = col(re); return c < 0 ? "" : String(row[c] == null ? "" : row[c]); };
    const [cid, sid] = get(/^ga$/i).split("|");
    const items = [];
    get(/rincian|barang/i).split("\n").map(l => l.replace(/^[•\-\s]+/, "").trim()).filter(l => l && !/^↳/.test(l)).forEach(l => {
      const m = l.match(/^(.+?)\s*[×x]\s*(\d+)\s*[—–-]\s*Rp\s?([\d.,]+)$/);
      if (!m) return;
      let name = m[1].replace(/\s*\[kado\]$/, "").trim(), variant = "";
      const v = name.match(/^(.*)\s\(([^()]+)\)$/);
      if (v) { name = v[1]; variant = v[2]; }
      const qty = +m[2];
      items.push({ item_name: name.slice(0, 100), item_variant: variant.slice(0, 100) || undefined, quantity: qty, price: toNumber(m[3]) / qty });
    });
    const params = {
      transaction_id: code, currency: "IDR",
      value: toNumber(get(/^total$/i)), shipping: toNumber(get(/ongkir|ongkos/i)),
      shipping_tier: get(/zona|tujuan/i) || undefined, payment_type: "transfer_manual",
      items, engagement_time_msec: 1
    };
    if (sid) params.session_id = sid;
    const res = UrlFetchApp.fetch("https://www.google-analytics.com/mp/collect?measurement_id=" + GA.measurementId + "&api_secret=" + secret, {
      method: "post", contentType: "application/json", muteHttpExceptions: true,
      // No GA id (checkout before this update, or cookies blocked): still counted, source unknown.
      payload: JSON.stringify({ client_id: cid || ("pz." + code), events: [{ name: "purchase", params }] })
    });
    Logger.log("GA purchase " + code + " " + params.value + " -> " + res.getResponseCode());
  } catch (err) {
    logError("sendGaPurchase", err);
  }
}

// Meta Purchase at payment, once per order. event_id = order code (same as before),
// user_data from the order row: hashed phone/email/name, plus _ua/_fbp/_fbc when mapped.
function sendMetaPurchase(headers, row, code) {
  try {
    const a = answers(headers.map((h, i) => [h, row[i]]));
    send({
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      event_id: code,
      event_source_url: a.url || (SITE + "/keranjang/"),
      user_data: userData(a),
      custom_data: { currency: "IDR", value: toNumber(a.total), order_id: code }
    });
  } catch (err) {
    logError("sendMetaPurchase", err);
  }
}

// --- helpers ---------------------------------------------------------------

function answers(pairs) {
  const out = {};
  pairs.forEach(([title, value]) => {
    const t = String(title || "").trim();
    const v = Array.isArray(value) ? value.join(", ") : String(value == null ? "" : value).trim();
    if (!v) return;
    Object.keys(MATCH).forEach(k => { if (out[k] === undefined && MATCH[k].test(t)) out[k] = v; });
  });
  return out;
}

function userData(a) {
  const u = { country: [sha("id")] };
  const ph = normPhone(a.phone); if (ph) u.ph = [sha(ph)];
  const em = (a.email || "").trim().toLowerCase(); if (em && em.indexOf("@") > 0) u.em = [sha(em)];
  const fn = (a.name || "").trim().toLowerCase().split(/\s+/)[0]; if (fn) u.fn = [sha(fn)];
  if (a.ua) u.client_user_agent = a.ua;
  if (a.fbp) u.fbp = a.fbp;
  if (a.fbc) u.fbc = a.fbc;
  return u;
}

// 0812-3456-789 / +62 812... / 62812... -> 628123456789
function normPhone(p) {
  let d = String(p || "").replace(/\D/g, "");
  if (!d) return "";
  if (d.indexOf("0") === 0) d = "62" + d.slice(1);
  else if (d.indexOf("8") === 0) d = "62" + d;
  return d.length >= 9 ? d : "";
}

// "Rp 1.234.567" / "Rp 249K" -> number
function toNumber(s) {
  const m = String(s || "").replace(/[^\d.,K]/gi, "");
  const k = /k$/i.test(m);
  const n = parseFloat(m.replace(/[.,]/g, "").replace(/k$/i, ""));
  return isFinite(n) ? (k ? n * 1000 : n) : 0;
}

function sha(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8)
    .map(b => ((b + 256) % 256).toString(16).padStart(2, "0")).join("");
}

function send(event) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("META_CAPI_TOKEN");
  if (!token) throw new Error("META_CAPI_TOKEN missing");

  // Meta requires client_user_agent for website events. Until the hidden _ua
  // question is mapped on a form, send it as system_generated instead.
  if (!event.action_source) event.action_source = event.user_data.client_user_agent ? "website" : "system_generated";
  if (event.action_source !== "website") delete event.event_source_url;
  Object.keys(event).forEach(k => event[k] === undefined && delete event[k]);

  const payload = { data: [event] };
  const test = props.getProperty("META_TEST_CODE");
  if (test) payload.test_event_code = test;

  const res = UrlFetchApp.fetch(
    "https://graph.facebook.com/" + GRAPH_VERSION + "/" + PIXEL_ID + "/events?access_token=" + encodeURIComponent(token),
    { method: "post", contentType: "application/json", payload: JSON.stringify(payload), muteHttpExceptions: true }
  );
  const code = res.getResponseCode();
  Logger.log(event.event_name + " " + (event.event_id || "") + " -> " + code + " " + res.getContentText());
  if (code >= 300) logError("send", res.getContentText());
}

function logError(where, err) {
  const msg = new Date().toISOString() + " " + where + ": " + (err && err.stack ? err.stack : err);
  Logger.log(msg);
  PropertiesService.getScriptProperties().setProperty("LAST_ERROR", msg.slice(0, 900));
}

// Run manually: shows the newest response of each form and what was detected.
function showLastResponses() {
  FORMS.forEach(f => {
    if (!f.editUrl || f.editUrl.indexOf("PASTE") === 0) return;
    const rs = FormApp.openByUrl(f.editUrl).getResponses();
    if (!rs.length) { Logger.log(f.kind + ": no responses yet"); return; }
    const pairs = rs[rs.length - 1].getItemResponses().map(r => [r.getItem().getTitle(), r.getResponse()]);
    Logger.log(f.kind + " titles: " + JSON.stringify(pairs.map(p => p[0])));
    Logger.log(f.kind + " detected: " + JSON.stringify(Object.keys(answers(pairs))));
  });
  Logger.log("Last error: " + (PropertiesService.getScriptProperties().getProperty("LAST_ERROR") || "none"));
}
