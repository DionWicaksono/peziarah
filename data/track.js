// CONVERSION TRACKING — one place for every analytics event on the site.
//
// Where events come from:
//   data/cart.js   add()     -> add_to_cart
//   data/forms.js  submit()  -> purchase (checkout) / generate_lead (every other form)
//   this file, automatically on load:
//     /produk/<id>/           -> view_item
//     /keranjang/             -> view_cart, then begin_checkout on first form field touched
//     any wa.me / tel: / mailto: link click -> whatsapp_click / phone_click / email_click
//
// Where events go: window.dataLayer ONLY, as {event: "pz_<name>", ...}.
// Google Tag Manager (GTM-NQS6GCB7, snippet in every page <head>) picks them up
// and forwards them to GA4 (G-H8J9GKJ2NT) — and to Meta, Google Ads etc. once
// those tags are added in GTM. Ecommerce events carry an `ecommerce` object in
// the GA4 format, so GA4 event tags just tick "Send Ecommerce data".
// The tags, triggers and variables are in gtm-container-peziarah.json.
//
// Privacy rules (do not loosen):
//   - Never send name, phone, email, address or free-text answers. GA4 forbids PII.
//   - "tanya" questions are sensitive: only a bare form_type is sent.
//
// Debugging: GTM Preview mode (tagmanager.google.com > Preview), or open any
// page with ?track_debug=1 to log every event to the browser console.

const CURRENCY = "IDR";
const CART_KEY = "peziarah.cart.v1";

let DEBUG = false;
try {
  DEBUG = /[?&]track_debug=1/.test(location.search) || localStorage.getItem("pz_track_debug") === "1";
  if (/[?&]track_debug=1/.test(location.search)) localStorage.setItem("pz_track_debug", "1");
  if (/[?&]track_debug=0/.test(location.search)) { localStorage.removeItem("pz_track_debug"); DEBUG = false; }
} catch (e) {}

// "Rp 1.234.567" / "Rp 249K" / "mulai Rp 150K" / "Gratis" -> number
export function toNumber(display) {
  if (typeof display === "number") return display;
  if (!display) return 0;
  const m = String(display).replace(/[^\d.,K]/gi, "");
  const k = /k$/i.test(m);
  const n = parseFloat(m.replace(/[.,]/g, "").replace(/k$/i, ""));
  if (!isFinite(n)) return 0;
  return k ? n * 1000 : n;
}

function readCart() {
  try {
    const v = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

export function cartItems() {
  return readCart().map(cartLineToItem);
}

function cartLineToItem(i) {
  return {
    item_id: i.id,
    item_name: i.name,
    item_category: i.cat || undefined,
    item_variant: i.variant || undefined,
    price: Number(i.unit) || 0,
    quantity: Number(i.qty) || 1
  };
}

// ---- core ------------------------------------------------------------------

function clean(obj) {
  const out = {};
  Object.keys(obj || {}).forEach(k => {
    const v = obj[k];
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  });
  return out;
}

export function track(name, params) {
  const p = clean(params);
  if (p.value !== undefined && p.currency === undefined) p.currency = CURRENCY;
  try {
    window.dataLayer = window.dataLayer || [];
    if (p.items) {
      // GA4 ecommerce shape; clear the previous ecommerce object first so
      // items from one event never leak into the next (GTM recommendation).
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({ event: "pz_" + name, ecommerce: p });
    } else {
      window.dataLayer.push({ event: "pz_" + name, ...p });
    }
  } catch (e) {}
  if (DEBUG && typeof console !== "undefined") console.log("[track]", name, p);
}

// ---- form submissions (called from data/forms.js) ---------------------------

// Non-PII fields that are safe and useful as event parameters, per form.
const LEAD_PARAMS = {
  ziarah:                 { route: "rute", group_size: "jumlah_peserta", month: "bulan" },
  "ziarah-susun-sendiri": { route: "destinasi", group_size: "jumlah_orang", style: "gaya", pace: "pace" },
  concierge:              { route: "destinasi", group_size: "jumlah_orang", duration: "lama" },
  shuttle:                { group_size: "jumlah_kursi" },
  paroki:                 { sacrament: "sakramen", group_size: "jumlah_peserta", city: "kota" },
  vendor:                 { category: "kategori", city: "kota" },
  tanya:                  {}
};

export function trackSubmit(kind, values) {
  values = values || {};
  if (kind === "pesanan") {
    const items = cartItems();
    track("purchase", {
      transaction_id: values.kode_pesanan,
      value: toNumber(values.total),
      shipping: toNumber(values.ongkir),
      shipping_tier: values.zona_pengiriman,
      payment_type: "transfer_manual",
      items: items.length ? items : undefined
    });
    return;
  }
  const map = LEAD_PARAMS[kind] || {};
  const p = { form_type: kind, lead_id: kind === "tanya" ? undefined : values.kode };
  Object.keys(map).forEach(param => {
    const v = values[map[param]];
    if (v !== undefined && v !== null && v !== "") p[param] = String(v).slice(0, 100);
  });
  if (p.group_size !== undefined) {
    const n = parseInt(p.group_size, 10);
    if (isFinite(n)) p.group_size = n;
  }
  track("generate_lead", p);
}

// ---- automatic page events ---------------------------------------------------

function productIdFromUrl() {
  const m = location.pathname.match(/^\/produk\/([^/]+)\/?$/);
  if (m) return decodeURIComponent(m[1]);
  if (/^\/produk\/?$/.test(location.pathname)) {
    const q = new URLSearchParams(location.search).get("id");
    if (q) return q;
  }
  return null;
}

function autoViewItem() {
  const id = productIdFromUrl();
  if (!id) return;
  import("/data/products.js").then(m => {
    const list = m.PRODUCTS || [];
    const p = list.find(x => x.id === id);
    if (!p) return;
    const price = typeof p.base === "number" ? p.base : toNumber(p.price);
    track("view_item", {
      value: price,
      items: [{ item_id: p.id, item_name: p.name, item_category: p.cat, price, quantity: 1 }]
    });
  }).catch(() => {});
}

function autoCart() {
  if (!/^\/keranjang\/?$/.test(location.pathname)) return;
  const items = cartItems();
  const value = items.reduce((n, i) => n + i.price * i.quantity, 0);
  track("view_cart", { value, items });
  if (!items.length) return;
  let started = false;
  document.addEventListener("focusin", e => {
    if (started) return;
    const t = e.target;
    if (!t || !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    started = true;
    const now = cartItems();
    track("begin_checkout", { value: now.reduce((n, i) => n + i.price * i.quantity, 0), items: now });
  });
}

function linkLabel(a) {
  const t = (a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim();
  return t.slice(0, 60);
}

function autoContactClicks() {
  document.addEventListener("click", e => {
    const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    const href = a.getAttribute("href") || "";
    let name = null;
    if (/(^|\/\/)(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href) || /^whatsapp:/i.test(href)) name = "whatsapp_click";
    else if (/^tel:/i.test(href)) name = "phone_click";
    else if (/^mailto:/i.test(href)) name = "email_click";
    if (!name) return;
    track(name, { link_text: linkLabel(a), page_type: pageType() });
  }, true);
}

function pageType() {
  const p = location.pathname;
  if (p === "/" ) return "home";
  if (/^\/produk\//.test(p)) return "product";
  if (/^\/ziarah\/rute\//.test(p)) return "route";
  if (/^\/ziarah\//.test(p)) return "ziarah";
  if (/^\/jurnal\//.test(p)) return "journal";
  if (/^\/keranjang/.test(p)) return "cart";
  if (/^\/hampers/.test(p)) return "hampers";
  if (/^\/katalog/.test(p)) return "catalog";
  return p.split("/")[1] || "other";
}

function init() {
  if (typeof window === "undefined" || window.__pzTrackInit) return;
  window.__pzTrackInit = true;
  window.pzTrack = track; // handy for inline handlers and console testing
  autoContactClicks();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { autoViewItem(); autoCart(); });
  } else { autoViewItem(); autoCart(); }
}

init();
