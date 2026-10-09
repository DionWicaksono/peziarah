// INVOICE PDF — built client-side from the cart with jsPDF (loaded on first use,
// so the library never weighs on the normal cart page). Vector text, A4.
// Identical file in data/ and publish/data/: the logo resolves relative to this
// module, so it works from both the project root and the domain root.

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

// data: { no, items:[{name, detail, qty, unit}], buyer:{name,phone,email,addr}, note,
//         shipping:{zone, cost}, bank:{name,number,holder},
//         paid?:{date, from, amount} }  <- set = receipt (KUITANSI), issued by admin only
export async function downloadInvoice(data) {
  const paid = data.paid || null;
  const GREEN = [46, 106, 64];
  const [JsPDF, logo] = await Promise.all([loadLib(), loadLogo()]);
  const doc = new JsPDF({ unit: "mm", format: "a4" });
  const W = 210, M = 18, R = W - M, BOTTOM = 270;
  const col = c => doc.setTextColor(c[0], c[1], c[2]);
  const font = (f, st, sz) => { doc.setFont(f, st); doc.setFontSize(sz); };
  const label = (t, x, y, align) => { font("courier", "normal", 7.5); col(MUTED); doc.text(t, x, y, { align: align || "left", charSpace: 0.4 }); };
  const hr = (y, c) => { doc.setDrawColor(...(c || LINE)); doc.setLineWidth(0.25); doc.line(M, y, R, y); };
  const date = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  // Header
  let y = M;
  if (logo) {
    const p = doc.getImageProperties(logo);
    const h = 13;
    doc.addImage(logo, "PNG", M, y, h * p.width / p.height, h);
  } else {
    font("times", "normal", 18); col(INK); doc.text("PEZIARAH", M, y + 9, { charSpace: 2 });
  }
  font("helvetica", "bold", 24); col(INK); doc.text(paid ? "KUITANSI" : "INVOICE", R, y + 8, { align: "right" });
  font("courier", "bold", 10); col(ACC); doc.text(data.no, R, y + 14, { align: "right" });
  y += 24; hr(y, INK);

  // Parties
  y += 8;
  const cx = [M, M + 58, R];
  label("DARI", cx[0], y); label("KEPADA", cx[1], y); label("TANGGAL", cx[2], y, "right");
  let ys = y + 6, yb = y + 6;
  SELLER.forEach((t, i) => { font("helvetica", i ? "normal" : "bold", 9.5); col(i ? [91, 83, 71] : INK); doc.text(t, cx[0], ys); ys += 4.6; });

  const b = data.buyer || {};
  const buyerName = safe(b.name);
  if (buyerName) { font("helvetica", "bold", 9.5); col(INK); doc.text(buyerName, cx[1], yb); yb += 4.6; }
  [b.phone && "WA " + safe(b.phone), safe(b.email)].filter(Boolean).forEach(t => { font("helvetica", "normal", 9.5); col([91, 83, 71]); doc.text(t, cx[1], yb); yb += 4.6; });
  if (safe(b.addr)) {
    font("helvetica", "normal", 9.5); col([91, 83, 71]);
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
    font("helvetica", "bold", 10); col(INK); nameLines.forEach((l, k) => doc.text(l, X.name, ty + k * 4.6));
    font("courier", "normal", 8); col(MUTED); detLines.forEach((l, k) => doc.text(l, X.name, ty + nameLines.length * 4.6 - 0.6 + k * 3.8));
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
    font("helvetica", bold ? "bold" : "normal", bold ? 12 : 9.5); col(bold ? INK : [91, 83, 71]); doc.text(l, TL, y);
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
    // Stamp, left of the totals block
    const sw = 62, sh = 24, sx = M + 4;
    doc.setDrawColor(...GREEN); doc.setLineWidth(0.9); doc.roundedRect(sx, yStamp, sw, sh, 3, 3, "S");
    doc.setLineWidth(0.3); doc.roundedRect(sx + 1.6, yStamp + 1.6, sw - 3.2, sh - 3.2, 2, 2, "S");
    font("helvetica", "bold", 20); col(GREEN); doc.text(amt < total ? "DIBAYAR" : "LUNAS", sx + sw / 2, yStamp + 12.5, { align: "center", charSpace: 2 });
    font("courier", "bold", 8); doc.text(safe(paid.date).toUpperCase(), sx + sw / 2, yStamp + 19, { align: "center", charSpace: 0.4 });
  }

  // Note
  const note = safe(data.note);
  if (note) {
    const lines = doc.splitTextToSize(note, R - M);
    if (y + 8 + lines.length * 4.4 > BOTTOM) { doc.addPage(); y = M; }
    label("CATATAN", M, y); y += 5.5;
    font("helvetica", "normal", 9.5); col([91, 83, 71]); lines.forEach(l => { doc.text(l, M, y); y += 4.4; });
    y += 6;
  }

  // Payment
  const bank = data.bank || {};
  if (y + 38 > BOTTOM) { doc.addPage(); y = M; }
  doc.setFillColor(...PAPER); doc.roundedRect(M, y, R - M, 36, 4, 4, "F");
  label(paid ? "DITERIMA DI REKENING - TRANSFER BANK" : "PEMBAYARAN - TRANSFER BANK", M + 7, y + 8); col(ACC);
  font("helvetica", "bold", 10.5); col(INK); doc.text(safe(bank.name), M + 7, y + 15);
  font("courier", "bold", 14); doc.text(safe(bank.number), M + 7, y + 22.5, { charSpace: 0.3 });
  font("helvetica", "normal", 9.5); col([91, 83, 71]); doc.text("a.n. " + safe(bank.holder), M + 7, y + 29);
  const ix = M + 100;
  if (paid) {
    label("DIBAYAR OLEH", ix, y + 8);
    font("helvetica", "bold", 10.5); col(INK); doc.text(safe(paid.from) || buyerName || "-", ix, y + 15);
    label("TANGGAL DITERIMA", ix, y + 23);
    font("helvetica", "normal", 9.5); col(INK); doc.text(safe(paid.date), ix, y + 29);
  } else {
    label("KONFIRMASI", ix, y + 8);
    font("helvetica", "normal", 9); col(INK);
    doc.splitTextToSize(`Transfer sesuai total, lalu kirim bukti transfer ke WhatsApp +62 815-4261-5445 dengan menyebut nomor invoice ${data.no}.`, R - ix - 7)
      .forEach((l, k) => doc.text(l, ix, y + 14.5 + k * 4.3));
  }
  y += 46;
  font("helvetica", "italic", 9); col(MUTED); doc.text("Terima kasih telah berbelanja di Peziarah. Berkah Dalem.", M, y);
  if (paid) { y += 5; font("helvetica", "normal", 8); doc.text("Kuitansi ini sah bila diterima langsung dari WhatsApp resmi Peziarah, +62 815-4261-5445.", M, y); }

  // Footer on every page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    hr(284);
    font("courier", "normal", 7.5); col(MUTED);
    doc.text("PEZIARAH.COM  -  MUNTILAN, MAGELANG  -  WA +62 815-4261-5445", M, 289, { charSpace: 0.3 });
    doc.text(`${data.no}  -  ${i}/${pages}`, R, 289, { align: "right" });
  }

  doc.save(`${paid ? "Kuitansi" : "Invoice"}-${data.no}.pdf`);
  return { no: data.no, subtotal };
}
