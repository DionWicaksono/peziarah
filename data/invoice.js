// INVOICE PDF — built client-side from the cart with jsPDF (loaded on first use,
// so the library never weighs on the normal cart page). Vector text, A4.
// Identical file in data/ and publish/data/: the logo resolves relative to this
// module, so it works from both the project root and the domain root.

// Admin copy in Google Drive: the Apps Script web-app URL (Deploy > Web app).
// Empty = no upload. Same value in data/ and publish/data/.
export const DRIVE_URL = "https://script.google.com/macros/s/AKfycbwsv5HJvIljg_GChYzn79PUtUovtB1ZHFvsYddkSNkwHjDnJpReOh-jwN4cegS6fzY/exec";

// GA4 browser ids, so the server-side purchase (sent by the Apps Script when the
// order is marked LUNAS) is credited to the buyer's own visit and traffic source.
export function gaContext() {
  const c = n => { try { const m = document.cookie.match(new RegExp("(?:^|; )" + n + "=([^;]*)")); return m ? decodeURIComponent(m[1]) : ""; } catch (e) { return ""; } };
  const cid = (c("_ga").match(/^GA\d\.\d\.(.+)$/) || [])[1] || "";
  const s = c("_ga_H8J9GKJ2NT");
  const sid = (s.match(/^GS2\.\d\.s(\d+)/) || s.match(/^GS1\.\d\.(\d+)/) || [])[1] || "";
  return cid ? { cid, sid } : null;
}

// Checkout without an invoice: hand the GA ids to the Apps Script on their own.
export function sendGa(code) {
  const ga = gaContext();
  if (!DRIVE_URL || !ga || !code) return;
  fetch(DRIVE_URL, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ code, kind: "ga", ga }) }).catch(() => {});
}

const JSPDF_URL = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
const LOGO_URL = new URL("../assets/peziarah-wordmark-ink.png", import.meta.url).href;

const INK = [26, 23, 18], MUTED = [138, 129, 114], LINE = [214, 203, 184], ACC = [108, 75, 166], PAPER = [239, 232, 218];
const SELLER = ["Peziarah", "Muntilan, Magelang", "Jawa Tengah, Indonesia", "WA +62 815-4261-5445", "peziarah.com"];

let libPromise = null;
function loadLib() {
  if (window.jspdf) return Promise.resolve(window.jspdf.jsPDF);
  if (!libPromise) libPromise = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = JSPDF_URL;
    s.onload = () => res(window.jspdf.jsPDF);
    s.onerror = () => { libPromise = null; rej(new Error("jsPDF failed to load")); };
    document.head.appendChild(s);
  });
  return libPromise;
}

function loadLogo() {
  return fetch(LOGO_URL).then(r => (r.ok ? r.blob() : null)).then(b => b && new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(null);
    fr.readAsDataURL(b);
  })).catch(() => null);
}

// Standard PDF fonts are Latin-1 only; anything else would print as garbage.
function safe(s) {
  return String(s == null ? "" : s)
    .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-").replace(/\u2026/g, "...").replace(/\u00D7/g, "x")
    .replace(/[^\x00-\xFF]/g, "").trim();
}

const rp = n => "Rp " + Math.round(n).toLocaleString("id-ID");

// Same shape as checkout order codes (PZ-XXXXX).
export function invoiceNumber() {
  return "PZ-" + Date.now().toString(36).slice(-5).toUpperCase();
}

const GREEN = [46, 106, 64], BODY = [91, 83, 71];
const W = 210, M = 18, R = W - M, BOTTOM = 270;
const WA_LINE = "+62 815-4261-5445";

// Shared page kit: same header, footer, bank box and Drive upload for every document.
function kit(JsPDF, logo) {
  const doc = new JsPDF({ unit: "mm", format: "a4" });
  const col = c => doc.setTextColor(c[0], c[1], c[2]);
  const font = (f, st, sz) => { doc.setFont(f, st); doc.setFontSize(sz); };
  const label = (t, x, y, align) => { font("courier", "normal", 7.5); col(MUTED); doc.text(t, x, y, { align: align || "left", charSpace: 0.4 }); };
  const hr = (y, c) => { doc.setDrawColor(...(c || LINE)); doc.setLineWidth(0.25); doc.line(M, y, R, y); };
  const k = { doc, col, font, label, hr };

  k.header = (title, no, sub) => {
    let y = M;
    if (logo) {
      const p = doc.getImageProperties(logo);
      const h = 13;
      doc.addImage(logo, "PNG", M, y, h * p.width / p.height, h);
    } else {
      font("times", "normal", 18); col(INK); doc.text("PEZIARAH", M, y + 9, { charSpace: 2 });
    }
    font("helvetica", "bold", 24); col(INK); doc.text(title, R, y + 8, { align: "right" });
    font("courier", "bold", 10); col(ACC); doc.text(no, R, y + 14, { align: "right" });
    if (sub) { label(sub, R, y + 19, "right"); }
    y += 24; hr(y, INK);
    return y;
  };

  // Returns the y below the seller block.
  k.seller = (x, y) => {
    SELLER.forEach((t, i) => { font("helvetica", i ? "normal" : "bold", 9.5); col(i ? BODY : INK); doc.text(t, x, y); y += 4.6; });
    return y;
  };

  // confirm: text shown on an unpaid document, right half of the box.
  k.bank = (y, bank, paid, payer, confirm) => {
    bank = bank || {};
    doc.setFillColor(...PAPER); doc.roundedRect(M, y, R - M, 36, 4, 4, "F");
    label(paid ? "DITERIMA DI REKENING - TRANSFER BANK" : "PEMBAYARAN - TRANSFER BANK", M + 7, y + 8);
    font("helvetica", "bold", 10.5); col(INK); doc.text(safe(bank.name), M + 7, y + 15);
    font("courier", "bold", 14); doc.text(safe(bank.number), M + 7, y + 22.5, { charSpace: 0.3 });
    font("helvetica", "normal", 9.5); col(BODY); doc.text("a.n. " + safe(bank.holder), M + 7, y + 29);
    const ix = M + 100;
    if (paid) {
      label("DIBAYAR OLEH", ix, y + 8);
      font("helvetica", "bold", 10.5); col(INK); doc.text(safe(paid.from) || payer || "-", ix, y + 15);
      label("TANGGAL DITERIMA", ix, y + 23);
      font("helvetica", "normal", 9.5); col(INK); doc.text(safe(paid.date), ix, y + 29);
    } else {
      label("KONFIRMASI", ix, y + 8);
      font("helvetica", "normal", 9); col(INK);
      doc.splitTextToSize(confirm, R - ix - 7).forEach((l, i) => doc.text(l, ix, y + 14.5 + i * 4.3));
    }
    return y + 36;
  };

  k.stamp = (x, y, word, date) => {
    const sw = 62, sh = 24;
    doc.setDrawColor(...GREEN); doc.setLineWidth(0.9); doc.roundedRect(x, y, sw, sh, 3, 3, "S");
    doc.setLineWidth(0.3); doc.roundedRect(x + 1.6, y + 1.6, sw - 3.2, sh - 3.2, 2, 2, "S");
    font("helvetica", "bold", 20); col(GREEN); doc.text(word, x + sw / 2, y + 12.5, { align: "center", charSpace: 2 });
    font("courier", "bold", 8); doc.text(safe(date).toUpperCase(), x + sw / 2, y + 19, { align: "center", charSpace: 0.4 });
  };

  k.footer = no => {
    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      hr(284);
      font("courier", "normal", 7.5); col(MUTED);
      doc.text("PEZIARAH.COM  -  MUNTILAN, MAGELANG  -  WA " + WA_LINE, M, 289, { charSpace: 0.3 });
      doc.text(`${no}  -  ${i}/${pages}`, R, 289, { align: "right" });
    }
  };

  // Upload BEFORE saving: on mobile the PDF often opens in this tab and unloads the page.
  // opts.ga === false: issued by admin, so the admin's own GA ids must not be attached.
  // opts.trip: ziarah details the Apps Script writes onto the request row.
  k.finish = async (no, paid, opts) => {
    if (opts.upload && DRIVE_URL) {
      const pdf = doc.output("datauristring").split(",")[1];
      const ga = paid || opts.ga === false ? undefined : gaContext();
      await Promise.race([
        fetch(DRIVE_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ code: no, kind: paid ? "kuitansi" : "invoice", pdf, ga, trip: opts.trip }) }).catch(() => {}),
        new Promise(r => setTimeout(r, opts.save === false ? 15000 : 2500))
      ]);
    }
    if (opts.save !== false) doc.save(`${paid ? "Kuitansi" : "Invoice"}-${no}.pdf`);
  };
  return k;
}

const today = () => new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

// data: { no, items:[{name, detail, qty, unit}], buyer:{name,phone,email,addr}, note,
//         shipping:{zone, cost}, bank:{name,number,holder},
//         paid?:{date, from, amount} }  <- set = receipt (KUITANSI), issued by admin only
// opts: { upload: true } also sends this exact PDF to Drive; { save: false } skips the download;
//       { ga: false } leaves the GA ids out of the upload (admin re-issue).
export async function downloadInvoice(data, opts) {
  opts = opts || {};
  const paid = data.paid || null;
  const [JsPDF, logo] = await Promise.all([loadLib(), loadLogo()]);
  const k = kit(JsPDF, logo);
  const { doc, col, font, label, hr } = k;
  const date = today();

  // Header
  let y = k.header(paid ? "KUITANSI" : "INVOICE", data.no);

  // Parties
  y += 8;
  const cx = [M, M + 58, R];
  label("DARI", cx[0], y); label("KEPADA", cx[1], y); label("TANGGAL", cx[2], y, "right");
  let yb = y + 6;
  const ys = k.seller(cx[0], y + 6);

  const b = data.buyer || {};
  const buyerName = safe(b.name);
  if (buyerName) { font("helvetica", "bold", 9.5); col(INK); doc.text(buyerName, cx[1], yb); yb += 4.6; }
  [b.phone && "WA " + safe(b.phone), safe(b.email)].filter(Boolean).forEach(t => { font("helvetica", "normal", 9.5); col(BODY); doc.text(t, cx[1], yb); yb += 4.6; });
  if (safe(b.addr)) {
    font("helvetica", "normal", 9.5); col(BODY);
    doc.splitTextToSize(safe(b.addr), 70).forEach(l => { doc.text(l, cx[1], yb); yb += 4.4; });
  }
  if (yb === y + 6) { font("helvetica", "normal", 9.5); col(MUTED); doc.text("Dikonfirmasi via WhatsApp", cx[1], yb); yb += 4.6; }

  font("helvetica", "normal", 9.5); col(INK); doc.text(date, cx[2], y + 6, { align: "right" });
  label("STATUS", cx[2], y + 15, "right");
  const totalDue = (data.items || []).reduce((s, it) => s + it.unit * it.qty, 0) + ((data.shipping || {}).cost || 0);
  const partial = paid && paid.amount && paid.amount < totalDue;
  font("helvetica", "bold", 9.5); col(paid ? GREEN : ACC);
  doc.text(paid ? (partial ? "Dibayar sebagian" : "LUNAS") : "Menunggu pembayaran", cx[2], y + 21, { align: "right" });
  y = Math.max(ys, yb, y + 24) + 6;

  // Items table
  const X = { no: M + 3, name: M + 12, qty: M + 116, unit: M + 146, sum: R - 3 };
  const head = () => {
    doc.setFillColor(...PAPER); doc.rect(M, y, R - M, 8, "F");
    [["NO", X.no, "left"], ["BARANG", X.name, "left"], ["QTY", X.qty, "right"], ["HARGA", X.unit, "right"], ["JUMLAH", X.sum, "right"]]
      .forEach(([t, x, a]) => label(t, x, y + 5.3, a));
    y += 8;
  };
  head();
  let subtotal = 0;
  (data.items || []).forEach((it, i) => {
    font("helvetica", "bold", 10);
    const nameLines = doc.splitTextToSize(safe(it.name), 92);
    font("courier", "normal", 8);
    const detLines = it.detail ? doc.splitTextToSize(safe(it.detail), 92) : [];
    const h = 5 + nameLines.length * 4.6 + detLines.length * 3.8 + 2;
    if (y + h > BOTTOM) { doc.addPage(); y = M; head(); }
    let ty = y + 6;
    font("courier", "normal", 9); col(MUTED); doc.text(String(i + 1).padStart(2, "0"), X.no, ty);
    font("helvetica", "bold", 10); col(INK); nameLines.forEach((l, j) => doc.text(l, X.name, ty + j * 4.6));
    font("courier", "normal", 8); col(MUTED); detLines.forEach((l, j) => doc.text(l, X.name, ty + nameLines.length * 4.6 - 0.6 + j * 3.8));
    const line = it.unit * it.qty; subtotal += line;
    font("courier", "normal", 9.5); col(INK);
    doc.text(String(it.qty), X.qty, ty, { align: "right" });
    doc.text(rp(it.unit), X.unit, ty, { align: "right" });
    font("courier", "bold", 9.5); doc.text(rp(line), X.sum, ty, { align: "right" });
    y += h; hr(y);
  });

  // Totals
  if (y + (paid ? 52 : 34) > BOTTOM) { doc.addPage(); y = M; }
  y += 8;
  const TL = M + 98;
  const row = (l, v, bold) => {
    font("helvetica", bold ? "bold" : "normal", bold ? 12 : 9.5); col(bold ? INK : BODY); doc.text(l, TL, y);
    font("courier", bold ? "bold" : "normal", bold ? 12 : 9.5); col(INK); doc.text(v, X.sum, y, { align: "right" });
  };
  const ship = data.shipping || { zone: "", cost: 0 };
  row("Subtotal", rp(subtotal)); y += 6;
  row("Ongkos kirim" + (ship.zone ? " (" + safe(ship.zone) + ")" : ""), ship.cost ? rp(ship.cost) : "Gratis"); y += 4;
  doc.setDrawColor(...INK); doc.setLineWidth(0.4); doc.line(TL, y, R, y); y += 7;
  const total = subtotal + (ship.cost || 0);
  const yStamp = y - 24;
  row("TOTAL", rp(total)); y += 12;
  if (paid) {
    const amt = paid.amount || total;
    y -= 4;
    row("Dibayar " + safe(paid.date), rp(amt)); y += 6;
    if (amt < total) { font("helvetica", "bold", 9.5); col(ACC); doc.text("Sisa tagihan", TL, y); font("courier", "bold", 9.5); doc.text(rp(total - amt), X.sum, y, { align: "right" }); y += 6; }
    y += 6;
    k.stamp(M + 4, yStamp, amt < total ? "DIBAYAR" : "LUNAS", paid.date);
  }

  // Note
  const note = safe(data.note);
  if (note) {
    const lines = doc.splitTextToSize(note, R - M);
    if (y + 8 + lines.length * 4.4 > BOTTOM) { doc.addPage(); y = M; }
    label("CATATAN", M, y); y += 5.5;
    font("helvetica", "normal", 9.5); col(BODY); lines.forEach(l => { doc.text(l, M, y); y += 4.4; });
    y += 6;
  }

  // Payment
  if (y + 38 > BOTTOM) { doc.addPage(); y = M; }
  k.bank(y, data.bank, paid, buyerName, `Transfer sesuai total, lalu kirim bukti transfer ke WhatsApp ${WA_LINE} dengan menyebut nomor invoice ${data.no}.`);
  y += 46;
  font("helvetica", "italic", 9); col(MUTED); doc.text("Terima kasih telah berbelanja di Peziarah. Berkah Dalem.", M, y);
  if (paid) { y += 5; font("helvetica", "normal", 8); doc.text(`Kuitansi ini sah bila diterima langsung dari WhatsApp resmi Peziarah, ${WA_LINE}.`, M, y); }

  k.footer(data.no);
  await k.finish(data.no, paid, opts);
  return { no: data.no, subtotal };
}

// ============================================================================
// ZIARAH — invoice & kuitansi per termin, for group and private trips.
// Same header, footer and bank box as the shop documents above.
// ============================================================================

// Standard terms (owner, 6 Nov 2026). Percentages of the trip total.
export const TRIP_STAGES = [
  { key: "DP", label: "Uang muka", pct: 30, when: "Saat konfirmasi" },
  { key: "T2", label: "Termin 2", pct: 50, days: 14 },
  { key: "LN", label: "Pelunasan", pct: 20, days: 7 }
];
export const TRIP_SINGLE = { key: "LN", label: "Lunas sekaligus", pct: 100, when: "Saat konfirmasi" };
// Cancellation by the group: share of the trip cost (titipan excluded) that is kept.
// from/to = days before departure, inclusive.
export const TRIP_CANCEL = [
  { from: Infinity, to: 15, pct: 30 },
  { from: 14, to: 8, pct: 50 },
  { from: 7, to: 7, pct: 75 },
  { from: 6, to: 0, pct: 100 }
];
export const DP_DAYS = 3; // uang muka due this many days after the invoice date

const DAY = 864e5;
const isoToDate = s => new Date(String(s).slice(0, 10) + "T12:00:00");
export const fmtDate = (d, short) => (typeof d === "string" ? isoToDate(d) : d)
  .toLocaleDateString("id-ID", short ? { day: "numeric", month: "short" } : { day: "numeric", month: "long", year: "numeric" });
const addDays = (d, n) => new Date(d.getTime() + n * DAY);
const round1000 = n => Math.round(n / 1000) * 1000;

// Amounts and due dates for every termin. Non-final termins are rounded to
// Rp 1.000; the final one takes the remainder, so the sum is always the total.
// A due date that would fall on or before the issue date reads "Segera".
export function tripSchedule(total, startIso, issueIso, single) {
  const start = isoToDate(startIso), issue = isoToDate(issueIso || new Date().toISOString());
  const stages = single ? [TRIP_SINGLE] : TRIP_STAGES;
  let used = 0;
  return stages.map((s, i) => {
    const last = i === stages.length - 1;
    const amount = last ? total - used : round1000(total * s.pct / 100);
    used += amount;
    // Uang muka: DP_DAYS after the invoice, but never on or after departure day.
    const dpDue = new Date(Math.min(addDays(issue, DP_DAYS).getTime(), Math.max(issue.getTime(), addDays(start, -1).getTime())));
    const due = s.days != null ? addDays(start, -s.days) : dpDue;
    const late = s.days != null && due.getTime() <= issue.getTime();
    return { ...s, amount, due, dueLabel: late ? "Segera" : fmtDate(due), whenLabel: s.days != null ? `H-${s.days}` : s.when };
  });
}

// Rows whose window has already passed on the issue date are left out.
export function tripCancelRows(startIso, issueIso) {
  const start = isoToDate(startIso), issue = issueIso ? isoToDate(issueIso) : null;
  return TRIP_CANCEL.filter(c => !issue || addDays(start, -c.to).getTime() >= issue.getTime()).map(c => {
    let a = c.from === Infinity ? null : addDays(start, -c.from);
    const b = addDays(start, -c.to);
    if (a && issue && a.getTime() < issue.getTime()) a = issue;
    let when;
    if (!a) when = `Sampai ${fmtDate(b)}`;
    else if (c.from === c.to) when = `${fmtDate(b)} (H-${c.to})`;
    else if (c.to === 0) when = `${fmtDate(a, true)} - hari berangkat`;
    else when = `${fmtDate(a, true)} - ${fmtDate(b)}`;
    const span = c.from === Infinity ? `sebelum H-${c.to - 1}` : c.from === c.to ? `H-${c.to}` : c.to === 0 ? `kurang dari H-${c.from + 1}` : `H-${c.from} s.d. H-${c.to}`;
    return { when, span, pct: c.pct };
  });
}

// Sums used by both the admin page and the PDF.
export function tripTotals(data) {
  const lineSum = arr => (arr || []).reduce((s, l) => s + Math.round((l.price || 0) * (l.qty || 0)), 0);
  const cost = data.participant ? Math.round(data.participant.cost || 0) : lineSum(data.lines);
  const titipan = data.participant ? Math.round(data.participant.titipan || 0) : lineSum(data.titipan);
  const tax = data.tax && data.tax.rate ? Math.round(cost * data.tax.rate) : 0;
  return { cost, tax, titipan, total: cost + tax + titipan };
}

// data: {
//   no: "ZR-AB12C-DP"            document number (trip code + termin; + -P03 for one participant)
//   code: "ZR-AB12C"             trip code from the request form
//   stage: "DP" | "T2" | "LN"    termin billed / received by this document
//   single: bool                 one payment for everything (late bookings)
//   issue: "2026-11-06"          invoice date (ISO)
//   trip: { route, start, end, pax, paxNote, stops: [name, ...] }
//   buyer: { org, name, phone, email, addr, npwp }
//   participant?: { name, id: "P03", cost, titipan }   per-participant document
//   lines: [{ cat, name, detail, unit, qty, price, req }]   cost items (group document)
//   titipan: [{ name, detail, qty, price }]               passed on in full, not Peziarah income
//   tax?: { label: "PPN 11%", rate: 0.11 }
//   paidBefore: number           received before this document
//   paid?: { date, from, amount }  set = KUITANSI
//   note, bank
// }
export async function downloadTripInvoice(data, opts) {
  opts = opts || {};
  const paid = data.paid || null;
  const [JsPDF, logo] = await Promise.all([loadLib(), loadLogo()]);
  const k = kit(JsPDF, logo);
  const { doc, col, font, label, hr } = k;
  const t = tripTotals(data);
  const trip = data.trip || {};
  const plan = tripSchedule(t.total, trip.start, data.issue, data.single);
  const cur = plan.find(s => s.key === data.stage) || plan[0];
  const curIdx = plan.indexOf(cur);
  const before = Math.max(0, Math.round(data.paidBefore || 0));
  const received = paid ? Math.round(paid.amount || cur.amount) : 0;
  const bill = paid ? received : Math.max(0, Math.min(cur.amount, t.total - before));
  const after = Math.max(0, t.total - before - bill);
  const stageTitle = (cur.label + (data.single ? "" : ` ${cur.pct}%`)).toUpperCase();
  const issueDate = data.issue ? fmtDate(data.issue) : today();
  const ensure = h => { if (y + h > BOTTOM) { doc.addPage(); y = M; return true; } return false; };

  let y = k.header(paid ? "KUITANSI" : "INVOICE", data.no, "ZIARAH - " + stageTitle);

  // Parties
  y += 8;
  const cx = [M, M + 58, R];
  label("DARI", cx[0], y); label("KEPADA", cx[1], y); label("TANGGAL", cx[2], y, "right");
  const ys = k.seller(cx[0], y + 6);
  const b = data.buyer || {};
  let yb = y + 6;
  const payer = safe(data.participant ? data.participant.name : (b.org || b.name));
  const put = (t, bold, wrap) => {
    font("helvetica", bold ? "bold" : "normal", 9.5); col(bold ? INK : BODY);
    doc.splitTextToSize(t, wrap || 66).forEach(l => { doc.text(l, cx[1], yb); yb += 4.5; });
  };
  if (data.participant) {
    put(safe(data.participant.name), true);
    put(`Peserta ${safe(data.participant.id)} - ${safe(b.org || b.name)}`);
    if (b.org && b.name) put("Koordinator: " + safe(b.name));
  } else {
    if (safe(b.org)) put(safe(b.org), true);
    if (safe(b.name)) put(b.org ? "u.p. " + safe(b.name) : safe(b.name), !b.org);
  }
  if (safe(b.phone)) put("WA " + safe(b.phone));
  if (safe(b.email)) put(safe(b.email));
  if (safe(b.addr)) put(safe(b.addr));
  if (safe(b.npwp)) put("NPWP " + safe(b.npwp));

  font("helvetica", "normal", 9.5); col(INK); doc.text(paid ? safe(paid.date) : issueDate, cx[2], y + 6, { align: "right" });
  label(paid ? "STATUS" : "JATUH TEMPO", cx[2], y + 15, "right");
  font("helvetica", "bold", 9.5);
  if (paid) { col(GREEN); doc.text(after ? `${cur.label} diterima` : "LUNAS", cx[2], y + 21, { align: "right" }); }
  else { col(ACC); doc.text(cur.dueLabel, cx[2], y + 21, { align: "right" }); }
  y = Math.max(ys, yb, y + 24) + 5;

  // Trip box
  const tripLines = [];
  const dates = trip.start ? (trip.end && trip.end !== trip.start ? `${fmtDate(trip.start)} - ${fmtDate(trip.end)}` : fmtDate(trip.start)) : "";
  if (dates) tripLines.push("Berangkat " + dates);
  if (trip.pax) tripLines.push(`${trip.pax} peserta${trip.paxNote ? " (" + safe(trip.paxNote) + ")" : ""}`);
  tripLines.push("Kode perjalanan " + safe(data.code));
  font("helvetica", "bold", 11);
  const routeLines = doc.splitTextToSize(safe(trip.route) || "Perjalanan ziarah", R - M - 14);
  font("courier", "normal", 8.5);
  const infoLines = doc.splitTextToSize(tripLines.join("   -   "), R - M - 14);
  const stops = (trip.stops || []).map(safe).filter(Boolean);
  font("helvetica", "normal", 9);
  const stopLines = stops.length ? doc.splitTextToSize("Tujuan: " + stops.map((n, i) => `${i + 1}. ${n}`).join("   "), R - M - 14) : [];
  const boxH = 10 + routeLines.length * 5 + stopLines.length * 4.3 + infoLines.length * 4 + 2;
  doc.setFillColor(...PAPER); doc.roundedRect(M, y, R - M, boxH, 3, 3, "F");
  label("PERJALANAN", M + 7, y + 6.5);
  font("helvetica", "bold", 11); col(INK); routeLines.forEach((l, i) => doc.text(l, M + 7, y + 12 + i * 5));
  let iy = y + 12.5 + routeLines.length * 5;
  font("helvetica", "normal", 9); col(INK); stopLines.forEach(l => { doc.text(l, M + 7, iy - 0.5); iy += 4.3; });
  font("courier", "normal", 8.5); col(BODY);
  infoLines.forEach((l, i) => doc.text(l, M + 7, iy + i * 4));
  y += boxH + 7;

  // Summary right under the trip: total, schedule, what this document bills or receives.
  const TL = M + 98, SUM = R - 3;
  const row = (l, v, bold, c) => {
    font("helvetica", bold ? "bold" : "normal", bold ? 12 : 9.5); col(c || (bold ? INK : BODY)); doc.text(l, TL, y);
    font("courier", bold ? "bold" : "normal", bold ? 12 : 9.5); col(c || INK); doc.text(v, SUM, y, { align: "right" });
  };

  const SX = { no: M + 3, name: M + 12, when: M + 64, due: M + 94, pct: M + 138, sum: R - 3 };
  label("JADWAL PEMBAYARAN", M, y); y += 3;
  doc.setFillColor(...PAPER); doc.rect(M, y, R - M, 7, "F");
  [["TERMIN", SX.name, "left"], ["WAKTU", SX.when, "left"], ["JATUH TEMPO", SX.due, "left"], ["%", SX.pct, "right"], ["JUMLAH", SX.sum, "right"]]
    .forEach(([tt, x, a]) => label(tt, x, y + 4.8, a));
  y += 7;
  let cum = 0;
  plan.forEach((s, i) => {
    cum += s.amount;
    const isCur = i === curIdx;
    const done = i < curIdx ? before >= cum - 1 : (isCur && paid);
    if (isCur) { doc.setFillColor(247, 243, 234); doc.setDrawColor(...ACC); doc.setLineWidth(0.4); doc.rect(M, y, R - M, 7.5, "FD"); }
    const ty = y + 5;
    font("courier", "normal", 9); col(MUTED); doc.text(String(i + 1).padStart(2, "0"), SX.no, ty);
    font("helvetica", isCur ? "bold" : "normal", 9.5); col(INK); doc.text(s.label, SX.name, ty);
    const tx = SX.name + doc.getTextWidth(s.label) + 2.5;
    font("helvetica", "normal", 9); col(BODY); doc.text(safe(s.whenLabel), SX.when, ty);
    doc.text(safe(s.dueLabel), SX.due, ty);
    font("courier", "normal", 9); col(INK); doc.text(String(s.pct) + "%", SX.pct, ty, { align: "right" });
    font("courier", isCur ? "bold" : "normal", 9.5); doc.text(rp(s.amount), SX.sum, ty, { align: "right" });
    if (done) { font("courier", "bold", 6.5); col(GREEN); doc.text("DIBAYAR", tx, ty - 0.3, { charSpace: 0.3 }); }
    else if (isCur && !paid) { font("courier", "bold", 6.5); col(ACC); doc.text("DITAGIH", tx, ty - 0.3, { charSpace: 0.3 }); }
    y += 7.5; if (!isCur) hr(y);
  });

  y += 5;
  const yStamp = y;
  y += 6;
  row("Total perjalanan", rp(t.total)); y += 6;
  if (before) { row("Sudah dibayar sebelumnya", rp(before)); y += 6; }
  y -= 2; doc.setDrawColor(...INK); doc.setLineWidth(0.4); doc.line(TL, y, R, y); y += 7;
  if (paid) row("Diterima", rp(received), true, GREEN);
  else row("Tagihan ini", rp(bill), true, ACC);
  y += 7;
  row(after ? (paid ? "Sisa tagihan" : "Sisa setelah termin ini") : "Sisa", after ? rp(after) : "Rp 0"); y += 6;
  if (paid) { k.stamp(M + 4, yStamp + 2, after ? "DIBAYAR" : "LUNAS", paid.date); y = Math.max(y, yStamp + 28); }
  y += 5;

  // Note
  const note = safe(data.note);
  if (note) {
    const lines = doc.splitTextToSize(note, R - M);
    ensure(8 + lines.length * 4.4);
    label("CATATAN", M, y); y += 5.5;
    font("helvetica", "normal", 9.5); col(BODY); lines.forEach(l => { doc.text(l, M, y); y += 4.4; });
    y += 5;
  }

  // Payment
  ensure(40);
  y = k.bank(y, data.bank, paid, payer, `Transfer ${rp(bill)} paling lambat ${cur.dueLabel === "Segera" ? "segera" : cur.dueLabel}, lalu kirim bukti transfer ke WhatsApp ${WA_LINE} dengan menyebut nomor ${data.no}.`);
  y += 6;
  if (paid) { font("helvetica", "normal", 8); col(MUTED); doc.text(`Kuitansi ini sah bila diterima langsung dari WhatsApp resmi Peziarah, ${WA_LINE}.`, M, y); y += 6; }
  y += 4;

  // Cost breakdown
  const X = { no: M + 3, name: M + 12, qty: M + 110, unit: M + 143, sum: R - 3 };
  const head = (title) => {
    doc.setFillColor(...PAPER); doc.rect(M, y, R - M, 8, "F");
    [["NO", X.no, "left"], [title, X.name, "left"], ["QTY", X.qty, "right"], ["HARGA", X.unit, "right"], ["JUMLAH", X.sum, "right"]]
      .forEach(([tt, x, a]) => label(tt, x, y + 5.3, a));
    y += 8;
  };
  const measure = it => {
    font("helvetica", "bold", 9.5);
    const nameLines = doc.splitTextToSize(safe(it.name), 86);
    const det = [it.detail, it.unit && it.unit !== "paket" ? it.unit : "", it.req ? "atas permintaan rombongan" : ""].map(safe).filter(Boolean).join(" - ");
    font("courier", "normal", 8);
    const detLines = det ? doc.splitTextToSize(det, 86) : [];
    return { nameLines, detLines, h: 4.5 + nameLines.length * 4.4 + detLines.length * 3.6 + 2 };
  };
  let n = 0;
  const itemRow = (it, title) => {
    const { nameLines, detLines, h } = measure(it);
    if (ensure(h)) head(title);
    const ty = y + 5.5;
    n++;
    font("courier", "normal", 9); col(MUTED); doc.text(String(n).padStart(2, "0"), X.no, ty);
    font("helvetica", "bold", 9.5); col(INK); nameLines.forEach((l, j) => doc.text(l, X.name, ty + j * 4.4));
    font("courier", "normal", 8); col(it.req ? ACC : MUTED); detLines.forEach((l, j) => doc.text(l, X.name, ty + nameLines.length * 4.4 - 0.6 + j * 3.6));
    const line = Math.round((it.price || 0) * (it.qty || 0));
    font("courier", "normal", 9.5); col(INK);
    doc.text(String(it.qty), X.qty, ty, { align: "right" });
    doc.text(rp(it.price), X.unit, ty, { align: "right" });
    font("courier", "bold", 9.5); doc.text(rp(line), X.sum, ty, { align: "right" });
    y += h; hr(y);
  };
  // A category label never sits alone at the foot of a page.
  const catRow = (cat, next, title) => {
    if (ensure(8 + measure(next).h)) head(title);
    y += 5.5; label(safe(cat).toUpperCase(), X.name, y, "left"); y += 0.5;
  };
  const table = (title, rows, withCats, caption) => {
    ensure((caption ? 3 : 0) + 8 + (rows[0] ? measure(rows[0]).h + (withCats ? 8 : 0) : 0));
    if (caption) { label(caption, M, y); y += 3; }
    head(title);
    let lastCat = null;
    rows.forEach(it => {
      if (withCats && it.cat && it.cat !== lastCat) { catRow(it.cat, it, title); lastCat = it.cat; }
      itemRow(it, title);
    });
  };

  if (data.participant) {
    const rows = [{ name: "Biaya ziarah per peserta", detail: safe(trip.route), qty: 1, price: t.cost }];
    if (t.titipan) rows.push({ name: "Titipan per peserta", detail: "diteruskan utuh, bukan pendapatan Peziarah", qty: 1, price: t.titipan });
    table("RINCIAN", rows, false, "RINCIAN BIAYA");
  } else {
    table("POS BIAYA", data.lines || [], true, "RINCIAN BIAYA");
    if ((data.titipan || []).length) { y += 6; table("TITIPAN - DITERUSKAN UTUH", data.titipan, false); }
  }

  // Totals
  ensure(30);
  y += 8;
  row("Biaya perjalanan", rp(t.cost)); y += 6;
  if (t.tax) { row(safe(data.tax.label || "Pajak"), rp(t.tax)); y += 6; }
  if (t.titipan) { row("Titipan", rp(t.titipan)); y += 6; }
  y -= 2; doc.setDrawColor(...INK); doc.setLineWidth(0.4); doc.line(TL, y, R, y); y += 7;
  row("TOTAL", rp(t.total), true); y += 6;
  if ((data.titipan || []).length || (data.participant && t.titipan)) {
    font("helvetica", "normal", 8); col(MUTED);
    doc.splitTextToSize("Titipan kami terima atas nama rombongan dan kami serahkan utuh ke pihak yang dituju. Bukan pendapatan Peziarah.", R - TL).forEach(l => { doc.text(l, TL, y); y += 3.6; });
  }
  y += 8;

  // Cancellation terms
  const cancel = tripCancelRows(trip.start, data.issue);
  const notes = [
    "Potongan dihitung dari biaya perjalanan, di luar titipan. Titipan yang belum kami serahkan dikembalikan utuh.",
    "Pembayaran yang sudah masuk diperhitungkan dengan potongan; kelebihannya kami kembalikan ke rekening pengirim."
  ];
  font("helvetica", "normal", 8.5);
  const noteLines = notes.flatMap(s => doc.splitTextToSize(s, R - M - 14));
  const cH = 12 + cancel.length * 5.6 + 3 + noteLines.length * 3.9 + 4;
  ensure(cH + 12);
  doc.setDrawColor(...LINE); doc.setLineWidth(0.3); doc.roundedRect(M, y, R - M, cH, 3, 3, "S");
  label("PEMBATALAN OLEH ROMBONGAN", M + 7, y + 7);
  let cy = y + 13.5;
  cancel.forEach(c => {
    font("helvetica", "normal", 9.5); col(INK); doc.text(c.when, M + 7, cy);
    font("courier", "normal", 8.5); col(MUTED); doc.text(c.span, M + 100, cy);
    font("courier", "bold", 9.5); col(INK); doc.text(c.pct + "%", R - 7, cy, { align: "right" });
    cy += 5.6;
  });
  cy += 1.5;
  font("helvetica", "normal", 8.5); col(BODY); noteLines.forEach(l => { doc.text(l, M + 7, cy); cy += 3.9; });
  y += cH + 8;
  font("helvetica", "italic", 9); col(MUTED); doc.text("Terima kasih telah mempercayakan perjalanan ini kepada Peziarah. Berkah Dalem.", M, y);

  k.footer(data.no);
  await k.finish(data.no, paid, { ...opts, ga: false });
  return { no: data.no, total: t.total, bill, after };
}
