// Drawing + lookup helpers for the Peta Alkitab cross-reference arcs.
// Pure: no imports, data is passed in, so the page, the poster preview and the
// 300-dpi print export all draw from the same code.
//
// Layout: every verse sits on one baseline, Kejadian → Wahyu. Links inside one
// testament arc ABOVE the line; links that cross between Perjanjian Lama and
// Perjanjian Baru hang BELOW it — the old speaking to the new.

export const BG = "#1A1712";
export const INK = "#F7F3EA";
export const LIME = "#C9E45B";
export const VIOLET = "#6C4BA6";

// One colour per book group (Taurat … Wahyu): violets for the old, warm sand for
// the prophets, lime and cream for the new.
export const GROUP_COLORS = ["#8E6CCB", "#A58BD8", "#C4B1EA", "#D9B79B", "#D8C48E", "#C9E45B", "#A9D46A", "#E2EBA8", "#F2EEDC", "#EE9F78"];
// Distance ramp: short reach = violet, whole-Bible reach = lime.
export const SPAN_COLORS = ["#5A3E95", "#7E5CC0", "#A784D6", "#D59B86", "#D8C48E", "#C9E45B"];
export const FOCUS = "#F7F3EA";

export function decode(b64) {
  const s = atob(b64), u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return new Uint16Array(u.buffer);
}

export function layout(BOOKS) {
  const bookStart = new Int32Array(BOOKS.length + 1), chapStart = [];
  let n = 0;
  BOOKS.forEach((b, i) => {
    bookStart[i] = n; chapStart[i] = [];
    b.ch.forEach((c, ci) => { chapStart[i][ci] = n; n += c; });
  });
  bookStart[BOOKS.length] = n;
  const verseBook = new Uint8Array(n);
  for (let i = 0; i < BOOKS.length; i++) verseBook.fill(i, bookStart[i], bookStart[i + 1]);
  const ntStart = bookStart[39];
  const groups = [];
  BOOKS.forEach((b, i) => {
    const g = groups[b.g] || (groups[b.g] = { from: bookStart[i], to: bookStart[i] });
    g.to = bookStart[i + 1];
  });
  return { BOOKS, n, bookStart, chapStart, verseBook, ntStart, groups };
}

export function verseIndex(L, b, c, v) {
  const ch = L.BOOKS[b].ch;
  const ci = Math.max(1, Math.min(c, ch.length)) - 1;
  const vi = Math.max(1, Math.min(v, ch[ci])) - 1;
  return L.chapStart[b][ci] + vi;
}

export function refOf(L, idx) {
  const b = L.verseBook[idx], cs = L.chapStart[b];
  let c = cs.length - 1;
  while (c > 0 && cs[c] > idx) c--;
  return { b, c: c + 1, v: idx - cs[c] + 1 };
}

export function label(L, r, long) {
  const bk = L.BOOKS[r.b];
  return `${long ? bk.name : bk.short} ${r.c}:${r.v}`;
}

// "yoh 3:16", "Yohanes 3 16", "1kor13:4", "mzm 23" → {b,c,v} | null
export function parseRef(L, q) {
  const m = String(q || "").trim().toLowerCase().match(/^([1-3]?\s*[a-z][a-z\s-]*?)\s*(\d+)(?:\s*[:.\s]\s*(\d+))?$/);
  if (!m) return null;
  const key = m[1].replace(/[\s-]/g, "");
  let b = L.BOOKS.findIndex(x => x.short.toLowerCase() === key);
  if (b < 0) b = L.BOOKS.findIndex(x => x.name.toLowerCase().replace(/[\s-]/g, "").startsWith(key));
  if (b < 0) return null;
  const c = Math.min(+m[2], L.BOOKS[b].ch.length);
  const v = Math.min(+(m[3] || 1), L.BOOKS[b].ch[c - 1]);
  return { b, c, v };
}

// Links touching a verse (or a whole book when `book` is set), strongest first.
export function linksOf(L, links, count, { verse = -1, book = -1 } = {}) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const a = links[2 * i], c = links[2 * i + 1];
    if (verse >= 0 ? (a === verse || c === verse) : (L.verseBook[a] === book || L.verseBook[c] === book)) out.push(i);
  }
  return out;
}

export function bookTotals(L, links, count, book) {
  const per = new Int32Array(L.BOOKS.length);
  let total = 0;
  for (let i = 0; i < count; i++) {
    const ba = L.verseBook[links[2 * i]], bc = L.verseBook[links[2 * i + 1]];
    if (ba === book || bc === book) { total++; per[ba === book ? bc : ba]++; }
  }
  return { total, per };
}

// Geometry for a canvas of width W: returns baseline y and vertical scales.
export function geometry(W, { kUp = 0.62, kDown = 0.4 } = {}) {
  const up = Math.ceil(kUp * W * 0.5 * 0.78) + 4;
  const down = Math.ceil(kDown * W * 0.5) + 4;
  return { up, down, kUp, kDown, height: up + down };
}

function bucketOf(L, a, c, mode) {
  if (mode === "kelompok") return L.BOOKS[L.verseBook[a]].g;
  const f = (c - a) / L.n;
  return f < 0.02 ? 0 : f < 0.08 ? 1 : f < 0.2 ? 2 : f < 0.4 ? 3 : f < 0.6 ? 4 : 5;
}

// Draw `idxs` (or the first `count` links) as arcs. x0/w = horizontal extent,
// y = baseline. Paths are batched per colour bucket so 140k arcs stroke in a
// handful of calls.
export function drawArcs(ctx, L, links, o) {
  const { x0 = 0, w, y, kUp, kDown, mode = "jarak", alpha = 0.06, lw = 1, color = null, idxs = null, count = 0 } = o;
  const pal = mode === "kelompok" ? GROUP_COLORS : SPAN_COLORS;
  // Each bucket strokes every CH arcs: one stroke() never overlaps itself, so
  // chunking lets dense regions build up, while keeping the stroke count low
  // enough (~hundreds) that big print canvases don't lose their context.
  const CH = 220;
  const paths = pal.map(() => new Path2D()), cnt = pal.map(() => 0);
  ctx.save();
  ctx.globalCompositeOperation = o.blend || "source-over";
  ctx.lineWidth = lw;
  ctx.globalAlpha = alpha;
  const flush = b => { ctx.strokeStyle = color || pal[b]; ctx.stroke(paths[b]); paths[b] = new Path2D(); cnt[b] = 0; };
  const sx = w / L.n, nt = L.ntStart, n = idxs ? idxs.length : count;
  for (let k = 0; k < n; k++) {
    const i = idxs ? idxs[k] : k;
    const a = links[2 * i], c = links[2 * i + 1];
    const xa = x0 + (a + 0.5) * sx, xc = x0 + (c + 0.5) * sx;
    const r = (xc - xa) / 2, cx = xa + r;
    const cross = a < nt && c >= nt;
    const b = color ? 0 : bucketOf(L, a, c, mode), p = paths[b];
    p.moveTo(xa, y);
    if (cross) p.ellipse(cx, y, r, r * kDown, 0, Math.PI, 0, true);
    else p.ellipse(cx, y, r, r * kUp, 0, Math.PI, 2 * Math.PI);
    if (++cnt[b] >= CH) flush(b);
  }
  cnt.forEach((v, b) => { if (v) flush(b); });
  ctx.restore();
}

// The thin book band on the baseline: alternating tone per book, group colour
// as the tick.
export function drawBand(ctx, L, { x0 = 0, w, y, h = 6, active = -1, mode = "jarak" }) {
  const sx = w / L.n;
  ctx.save();
  L.BOOKS.forEach((b, i) => {
    const xa = x0 + L.bookStart[i] * sx, xb = x0 + L.bookStart[i + 1] * sx;
    ctx.fillStyle = i === active ? LIME : (mode === "kelompok" ? GROUP_COLORS[b.g] : (i % 2 ? "#5E5649" : "#8A8172"));
    ctx.globalAlpha = i === active ? 1 : mode === "kelompok" ? 0.85 : 1;
    ctx.fillRect(xa, y - h / 2, Math.max(0.5, xb - xa - Math.min(1, sx * 2)), h);
  });
  ctx.restore();
}

// Full poster composition. W×H in px of the target canvas (preview or 300 dpi).
// opts: { count, mode, focus (verse idx|-1), quote, cite, dedication, linksTotal }
export function drawPoster(ctx, L, links, W, H, o) {
  const u = Math.min(W / 1000, H / 560);
  const m = Math.round(W * 0.045);
  ctx.save();
  ctx.textBaseline = "alphabetic";
  // o.artOnly: draw everything above the footer (cacheable); o.art: reuse that layer.
  if (o.art) ctx.drawImage(o.art, 0, 0, W, H);
  else {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);

  // header
  ctx.fillStyle = LIME;
  ctx.font = `400 ${9 * u}px 'Space Mono', monospace`;
  spaced(ctx, "PETA RUJUKAN SILANG ALKITAB", m, m + 9 * u, 0.16 * 9 * u);
  ctx.fillStyle = "#A8A092";
  ctx.font = `400 ${8 * u}px 'Space Mono', monospace`;
  const stat = `${fmt(o.count)} RUJUKAN · 31.102 AYAT · 66 KITAB · KEJADIAN — WAHYU`;
  const sw = measureSpaced(ctx, stat, 0.12 * 8 * u);
  spaced(ctx, stat, W - m - sw, m + 9 * u, 0.12 * 8 * u);

  // arc field
  const top = m + 34 * u, bottom = H - m - 74 * u;
  let w = W - 2 * m;
  let g = geometry(w);
  const labelRoom = 34 * u;
  if (g.height + labelRoom > bottom - top) { w = w * (bottom - top - labelRoom) / g.height; g = geometry(w); }
  const x0 = (W - w) / 2;
  const y = top + g.up + Math.max(0, (bottom - top - labelRoom - g.height) / 2);
  const dim = o.focus >= 0 ? 0.6 : 1;
  drawArcs(ctx, L, links, { x0, w, y, kUp: g.kUp, kDown: g.kDown, mode: o.mode, count: o.count, alpha: alphaFor(o.count, dim), lw: Math.max(0.5, 0.55 * u) });
  drawBand(ctx, L, { x0, w, y, h: 3.2 * u, mode: o.mode });

  // book labels
  const sx = w / L.n;
  ctx.fillStyle = "#A8A092";
  ctx.font = `400 ${4.6 * u}px 'Space Mono', monospace`;
  L.BOOKS.forEach((b, i) => {
    const bw = (L.bookStart[i + 1] - L.bookStart[i]) * sx;
    if (bw < 6.2 * u) return;
    const cx = x0 + (L.bookStart[i] + L.bookStart[i + 1]) / 2 * sx;
    ctx.save(); ctx.translate(cx - 1.6 * u, y + 5 * u); ctx.rotate(Math.PI / 2);
    ctx.strokeStyle = BG; ctx.lineWidth = 2.2 * u; ctx.lineJoin = "round";
    ctx.strokeText(b.short.toUpperCase(), 0, 0);
    ctx.fillText(b.short.toUpperCase(), 0, 0); ctx.restore();
  });
  const GN = ["TAURAT", "SEJARAH", "PUISI", "NABI BESAR", "NABI KECIL", "INJIL", "KIS", "SURAT PAULUS", "SURAT UMUM", "WHY"];
  ctx.font = `400 ${4.4 * u}px 'Space Mono', monospace`;
  L.groups.forEach((g, i) => {
    const xa = x0 + g.from * sx, xb = x0 + g.to * sx, gy = y + 26 * u;
    ctx.fillStyle = "rgba(247,243,234,0.22)";
    ctx.fillRect(xa + 0.6 * u, gy - 4.6 * u, Math.max(1, xb - xa - 1.2 * u), Math.max(1, 0.35 * u));
    const t = GN[i], tw = measureSpaced(ctx, t, 0.1 * 4.4 * u);
    if (tw > xb - xa - 2 * u) return;
    ctx.strokeStyle = BG; ctx.lineWidth = 2.4 * u; ctx.lineJoin = "round";
    spaced(ctx, t, (xa + xb - tw) / 2, gy, 0.1 * 4.4 * u, true);
    ctx.fillStyle = "#B5AC9C";
    spaced(ctx, t, (xa + xb - tw) / 2, gy, 0.1 * 4.4 * u);
  });

  // focus verse
  if (o.focus >= 0) {
    const idxs = linksOf(L, links, o.count, { verse: o.focus });
    drawArcs(ctx, L, links, { x0, w, y, kUp: g.kUp, kDown: g.kDown, idxs, color: FOCUS, alpha: 0.7, lw: Math.max(0.6, 0.6 * u) });
    const fx = x0 + (o.focus + 0.5) * sx;
    ctx.fillStyle = FOCUS;
    ctx.beginPath(); ctx.arc(fx, y, 1.8 * u, 0, 2 * Math.PI); ctx.fill();
    const r = refOf(L, o.focus);
    ctx.font = `700 ${7.5 * u}px 'Space Mono', monospace`;
    const t = `${L.BOOKS[r.b].name.toUpperCase()} ${r.c}:${r.v} — ${idxs.length} BENANG`;
    const tw = measureSpaced(ctx, t, 0.1 * 7.5 * u);
    const tx = Math.max(m, Math.min(W - m - tw, fx - tw / 2));
    spaced(ctx, t, tx, y - g.up - 2 * u + 9 * u, 0.1 * 7.5 * u);
  }

  }
  if (o.artOnly) { ctx.restore(); return; }
  // footer: quote left, dedication right
  const fy = H - m;
  ctx.fillStyle = "rgba(247,243,234,0.18)";
  ctx.fillRect(m, fy - 52 * u, W - 2 * m, Math.max(1, 0.5 * u));
  if (o.quote) {
    ctx.fillStyle = INK;
    ctx.font = `500 italic ${10.5 * u}px 'Hanken Grotesk', sans-serif`;
    const lines = wrap(ctx, `“${o.quote}”`, (W - 2 * m) * 0.55).slice(0, 2);
    lines.forEach((ln, i) => ctx.fillText(ln, m, fy - 36 * u + i * 14 * u));
    if (o.cite) {
      ctx.fillStyle = LIME; ctx.font = `400 ${7 * u}px 'Space Mono', monospace`;
      spaced(ctx, o.cite.toUpperCase(), m, fy - 36 * u + lines.length * 14 * u + 1 * u, 0.12 * 7 * u);
    }
  }
  if (o.dedication) {
    ctx.fillStyle = INK;
    ctx.font = `500 ${12 * u}px 'Cinzel', serif`;
    const d = o.dedication.toUpperCase(), dw = measureSpaced(ctx, d, 0.12 * 12 * u);
    spaced(ctx, d, W - m - dw, fy - 30 * u, 0.12 * 12 * u);
  }
  ctx.fillStyle = "#8A8172";
  ctx.font = `400 ${5.6 * u}px 'Space Mono', monospace`;
  spaced(ctx, "DATA: OPENBIBLE.INFO, CC BY 4.0 — DARI TREASURY OF SCRIPTURE KNOWLEDGE · ATAS: SATU PERJANJIAN · BAWAH: PL – PB", m, fy, 0.08 * 5.6 * u);
  ctx.font = `600 ${8 * u}px 'Cinzel', serif`;
  const brand = "PEZIARAH", bw = measureSpaced(ctx, brand, 0.16 * 8 * u);
  spaced(ctx, brand, W - m - bw, fy, 0.16 * 8 * u);
  ctx.restore();
}

function fmt(n) { return Math.round(n).toLocaleString("id-ID"); }
function spaced(ctx, t, x, y, ls, halo) { for (const ch of t) { if (halo) ctx.strokeText(ch, x, y); else ctx.fillText(ch, x, y); x += ctx.measureText(ch).width + ls; } }
function measureSpaced(ctx, t, ls) { let w = 0; for (const ch of t) w += ctx.measureText(ch).width + ls; return w - ls; }
function wrap(ctx, t, max) {
  const out = []; let line = "";
  for (const word of t.split(/\s+/)) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > max && line) { out.push(line); line = word; } else line = test;
  }
  if (line) out.push(line);
  if (out.length > 2) out[1] = out[1].replace(/\s*\S+$/, "") + "…”";
  return out;
}

// Print sizes (cm) — keep in sync with the poster-peta-alkitab product opt.
export const PRINT_SIZES = [
  { id: "A2", label: "A2", cm: [59.4, 42], base: 350000, frame: 375000 },
  { id: "A1", label: "A1", cm: [84.1, 59.4], base: 550000, frame: 650000 },
  { id: "PANO", label: "Panorama", cm: [100, 40], base: 650000, frame: 600000 }
];

export function alphaFor(count, scale = 1) {
  return Math.max(0.012, Math.min(0.5, 1100 / count) * scale);
}
