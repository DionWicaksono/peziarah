// SHARED CART — localStorage only, no backend.
// Every page imports this module; the TAS (n) counter and /tas page read the
// same store. Swap the read/write pair for API calls when a backend lands:
// `read()` -> GET /api/cart, `write()` -> PUT /api/cart. Nothing else changes.

const KEY = "peziarah.cart.v1";
const EVT = "peziarah:cart";

// "Rp 2.450K" -> 2450000 ; "Rp 249K" -> 249000
export function toRupiah(display) {
  if (!display) return 0;
  const m = String(display).replace(/[^\d.,K]/gi, "");
  const k = /k$/i.test(m);
  const n = parseFloat(m.replace(/[.,]/g, "").replace(/k$/i, ""));
  if (!isFinite(n)) return 0;
  return k ? n * 1000 : n;
}

export function formatRupiah(n) {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function write(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  try { window.dispatchEvent(new CustomEvent(EVT, { detail: items })); } catch (e) {}
  return items;
}

export function getCart() { return read(); }

export function count() {
  return read().reduce((n, i) => n + i.qty, 0);
}

export function subtotal() {
  return read().reduce((n, i) => n + i.unit * i.qty, 0);
}

// A line is unique by product id + chosen variant + gift-wrap flag.
function lineKey(item) {
  return [item.id, item.variant || "", item.gift ? "g" : ""].join("|");
}

export function add(item, qty = 1) {
  const items = read();
  const key = lineKey(item);
  const found = items.find(i => lineKey(i) === key);
  if (found) found.qty += qty;
  else items.push({
    id: item.id,
    name: item.name,
    cat: item.cat || "",
    variant: item.variant || "",
    variantLabel: item.variantLabel || "",
    unit: item.unit || 0,
    image: item.image || "",
    gift: !!item.gift,
    note: item.note || "",
    qty
  });
  return write(items);
}

export function setQty(key, qty) {
  let items = read();
  if (qty <= 0) items = items.filter(i => lineKey(i) !== key);
  else items.forEach(i => { if (lineKey(i) === key) i.qty = Math.min(99, qty); });
  return write(items);
}

export function remove(key) { return setQty(key, 0); }

export function clear() { return write([]); }

export function keyOf(item) { return lineKey(item); }

// Re-render hook: returns an unsubscribe fn. Also listens to `storage` so the
// counter stays right when the user has two tabs open.
export function subscribe(fn) {
  const local = () => fn(read());
  const cross = e => { if (e.key === KEY) fn(read()); };
  window.addEventListener(EVT, local);
  window.addEventListener("storage", cross);
  return () => {
    window.removeEventListener(EVT, local);
    window.removeEventListener("storage", cross);
  };
}
