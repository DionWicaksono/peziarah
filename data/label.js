// SHIPPING LABELS — jsPDF, vector text + Code128 barcode. Used by /admin/resi/.
// Identical file in data/ and publish/data/ (logo resolves relative to this module).
// labels: [{ code, name, phone, addr, zone, note, kado, courier, resi, partial, items:[{label, qty}] }]
// size: "thermal" (100×150 mm) | "compact" (70×100 mm) — one per page | "a4" (4 × A6 per A4 sheet)

const JSPDF_URL = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
const LOGO_URL = new URL("../assets/peziarah-wordmark-ink.png", import.meta.url).href;
export const SENDER = { name: "Peziarah.com", addr: "SW Building Bali", wa: "+62 815-4261-5445" };

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
function safe(s) {
  return String(s == null ? "" : s)
    .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-").replace(/\u2026/g, "...").replace(/\u00D7/g, "x")
    .replace(/[^\x00-\xFF]/g, "").trim();
}

// Code 128 set B. Returns module widths (bar, space, bar, …), quiet zones excluded.
const C128 = "212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 114131 311141 411131 211412 211214 211232 2331112".split(" ");
export function code128(text) {
  const vals = [104];
  for (const ch of String(text)) { const v = ch.charCodeAt(0) - 32; if (v >= 0 && v < 95) vals.push(v); }
  let sum = vals[0];
  for (let i = 1; i < vals.length; i++) sum += vals[i] * i;
  vals.push(sum % 103, 106);
  return vals.map(v => C128[v]).join("").split("").map(Number);
}

function drawLabel(doc, L, x0, y0, W, H, logo, logoRatio, k) {
  k = k || 1;
  const f = v => Math.max(5.5, v * k), d = v => v * k;
  const M = d(5), x = x0 + M, w = W - 2 * M, R = x + w, B = y0 + H - M;
  const ink = () => doc.setTextColor(26, 23, 18), mute = () => doc.setTextColor(91, 83, 71);
  doc.setDrawColor(26, 23, 18);
  let y = y0 + M;

  // Sender
  if (logo) { const lw = d(30); doc.addImage(logo, "PNG", x, y, lw, lw / logoRatio); }
  else { doc.setFont("helvetica", "bold"); doc.setFontSize(f(12)); ink(); doc.text("PEZIARAH", x, y + d(4)); }
  doc.setFont("helvetica", "normal"); doc.setFontSize(f(7)); mute();
  doc.text("PENGIRIM", R, y + d(1.8), { align: "right" });
  doc.setFontSize(f(8.5)); ink();
  doc.text([SENDER.name, SENDER.addr, "WA " + SENDER.wa], R, y + d(5.4), { align: "right", lineHeightFactor: 1.25 });
  y += d(15);
  doc.setLineWidth(d(0.6)); doc.line(x, y, R, y); y += d(5.5);

  // Recipient
  doc.setFont("helvetica", "normal"); doc.setFontSize(f(7)); mute(); doc.text("PENERIMA", x, y); y += d(5.5);
  doc.setFont("helvetica", "bold"); doc.setFontSize(f(15)); ink();
  const nm = doc.splitTextToSize(safe(L.name) || "-", w).slice(0, 2);
  doc.text(nm, x, y, { lineHeightFactor: 1.1 }); y += nm.length * d(6.2);
  doc.setFont("courier", "bold"); doc.setFontSize(f(12)); doc.text(safe(L.phone) || "-", x, y); y += d(6);
  doc.setFont("helvetica", "normal"); doc.setFontSize(f(10.5));
  const ad = doc.splitTextToSize(safe(L.addr) || "-", w).slice(0, 6);
  doc.text(ad, x, y, { lineHeightFactor: 1.3 }); y += ad.length * f(10.5) * 0.4586 + d(1);
  if (L.zone) { doc.setFontSize(f(8)); mute(); doc.text(safe(L.zone).toUpperCase(), x, y); y += d(4); }
  y += d(1.5);

  // Courier / order strip
  const sh = d(10);
  doc.setLineWidth(0.3); doc.rect(x, y, w, sh);
  doc.line(x + w / 2, y, x + w / 2, y + sh);
  doc.setFontSize(f(6.5)); mute(); doc.text("KURIR", x + d(2), y + d(3.2)); doc.text("NO. PESANAN", x + w / 2 + d(2), y + d(3.2));
  doc.setFont("helvetica", "bold"); doc.setFontSize(f(10)); ink();
  doc.text(safe([L.courier, L.resi].filter(Boolean).join("  ")) || "-", x + d(2), y + d(8), { maxWidth: w / 2 - d(4) });
  doc.setFont("courier", "bold"); doc.text(safe(L.code) || "-", x + w / 2 + d(2), y + d(8));
  y += sh + d(3);

  // Barcode (bar width floored so thermal printers can still resolve it)
  if (L.code) {
    const mods = code128(L.code.toUpperCase()), total = mods.reduce((a, b) => a + b, 0);
    const bw = Math.min(w, total * Math.max(0.33, 0.42 * k)), mw = bw / total, bh = d(11);
    let bx = x + (w - bw) / 2;
    doc.setFillColor(26, 23, 18);
    mods.forEach((m, i) => { if (i % 2 === 0) doc.rect(bx, y, m * mw, bh, "F"); bx += m * mw; });
    y += bh + d(4);
  }

  const footY = B - d(1);
  doc.setFont("helvetica", "normal"); doc.setFontSize(f(7)); mute();
  doc.text("Terima kasih - Berkah Dalem.", x, footY);
  doc.text("peziarah.com", R, footY, { align: "right" });
  let limit = footY - d(5);

  const tags = [L.kado ? "KADO - JANGAN SERTAKAN HARGA" : "", L.partial ? "KIRIMAN SEBAGIAN - SISA MENYUSUL" : ""].filter(Boolean);
  doc.setFontSize(f(8));
  const noteLines = L.note ? doc.splitTextToSize(safe(L.note), w - d(4)).slice(0, 2) : [];
  if (tags.length || noteLines.length) {
    const lh = f(8) * 0.47;
    const nh = tags.length * lh + noteLines.length * lh + d(3);
    const ny = limit - nh;
    doc.setLineWidth(0.3); doc.rect(x, ny, w, nh);
    let ty = ny + d(1.5) + lh * 0.8;
    doc.setFont("helvetica", "bold"); doc.setFontSize(f(7.5)); ink();
    tags.forEach(t => { doc.text(t, x + d(2), ty); ty += lh; });
    doc.setFont("helvetica", "normal"); doc.setFontSize(f(8));
    noteLines.forEach(t => { doc.text(t, x + d(2), ty); ty += lh; });
    limit = ny - d(3);
  }

  // Packing checklist
  doc.setLineWidth(0.2); doc.line(x, y - d(1.5), R, y - d(1.5));
  doc.setFont("helvetica", "normal"); doc.setFontSize(f(6.5)); mute(); doc.text("ISI PAKET", x, y + d(2));
  y += d(6);
  doc.setFontSize(f(8.5)); ink();
  const lh = f(8.5) * 0.435, box = d(3);
  const items = L.items || [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const lines = doc.splitTextToSize(safe(it.label), w - d(16)).slice(0, 2);
    const need = lines.length * lh;
    if (y + need > limit) { mute(); doc.setFontSize(f(7.5)); doc.text("+ " + (items.length - i) + " barang lainnya", x + d(5), y); break; }
    doc.setLineWidth(0.25); doc.rect(x, y - box * 0.87, box, box);
    doc.text(lines, x + d(5), y, { lineHeightFactor: 1.2 });
    doc.setFont("courier", "bold"); doc.text("x" + it.qty, R, y, { align: "right" }); doc.setFont("helvetica", "normal");
    y += need + d(1.2);
  }
}

async function build(labels, size) {
  const [JsPDF, logo] = await Promise.all([loadLib(), loadLogo()]);
  const thermal = size !== "a4", compact = size === "compact";
  const PW = compact ? 70 : 100, PH = compact ? 100 : 150, K = compact ? 0.68 : 1;
  const doc = new JsPDF({ unit: "mm", format: thermal ? [PW, PH] : "a4", orientation: "portrait" });
  let ratio = 4;
  if (logo) { try { const p = doc.getImageProperties(logo); ratio = p.width / p.height; } catch (e) {} }
  labels.forEach((L, i) => {
    if (thermal) { if (i) doc.addPage([PW, PH], "portrait"); drawLabel(doc, L, 0, 0, PW, PH, logo, ratio, K); return; }
    const k = i % 4;
    if (i && !k) doc.addPage("a4", "portrait");
    if (!k) { doc.setDrawColor(185, 175, 158); doc.setLineWidth(0.15); doc.setLineDashPattern([1.5, 1.5], 0); doc.line(105, 4, 105, 293); doc.line(4, 148.5, 206, 148.5); doc.setLineDashPattern([], 0); }
    drawLabel(doc, L, (k % 2) * 105, Math.floor(k / 2) * 148.5, 105, 148.5, logo, ratio);
  });
  return doc;
}

const fname = labels => "Label-" + (labels.length === 1 ? labels[0].code || "pesanan" : labels.length + "-paket") + ".pdf";
export async function downloadLabels(labels, size) { (await build(labels, size)).save(fname(labels)); }
// win: a window opened synchronously in the click handler (popup blockers).
export async function printLabels(labels, size, win) {
  const doc = await build(labels, size);
  doc.autoPrint();
  const url = doc.output("bloburl");
  if (win && !win.closed) win.location.href = url; else window.open(url, "_blank");
}
