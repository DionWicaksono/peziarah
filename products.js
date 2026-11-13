// Shared catalogue data for Toi, Moi et la Mer.
// Static-host friendly: plain ES module, no build step.
// Every piece points at a real campaign frame in assets/ with its own crop focus.

export const CATEGORIES = [
  "All", "Dresses", "Bikini", "Hats", "Sunglasses", "Sarong & Kain",
  "Outerwear", "Modest", "Skorts & Shorts", "Lingerie", "Yoga", "Padel", "Bags"
];

export const PRODUCTS = [
  { id: "p1", name: "Nothing-Planned Wrap", price: 285, cat: "Dresses", fabric: "washed linen, madder-dyed", tone: "#D8CBBE",
    img: "/assets/jungle-swing.webp", pos: "62% 62%", zoom: "auto 150%", shot: "look 01 · Ubud ridge",
    detail: "/assets/p2-kaftan.webp", detailPos: "50% 50%", detailZoom: "cover",
    note: "One panel, wrapped twice, tied where you like it. Full enough to swing in.",
    care: "Cold wash, dry flat in shade.", origin: "Loomed in Gianyar · dyed in Kerobokan" },

  { id: "p2", name: "Long Lunch Kaftan", price: 240, cat: "Dresses", fabric: "fringed linen gauze", tone: "#E7EEF0",
    img: "/assets/p2-kaftan.webp", pos: "50% 50%", zoom: "cover", shot: "look 02 · poolside",
    detail: "/assets/jungle-swing.webp", detailPos: "62% 62%", detailZoom: "auto 150%",
    note: "Raw-edge shoulders, cut wide, throws straight over a wet bikini.",
    care: "Cold wash, line dry.", origin: "Loomed in Gianyar" },

  { id: "p3", name: "Salt Triangle Bikini", price: 155, cat: "Bikini", fabric: "quick-dry linen-blend jersey", tone: "#CFDCD3",
    img: "/assets/infinity-pool.webp", pos: "50% 60%", zoom: "auto 165%", shot: "look 03 · infinity edge",
    detail: "/assets/coconut-hat.webp", detailPos: "44% 82%",
    note: "Scoop back, high leg, no plastic shell. Dries on the walk up from the pool.",
    care: "Rinse after swimming, dry flat.", origin: "Cut in Canggu" },

  { id: "p4", name: "Still Water Bikini", price: 150, cat: "Bikini", fabric: "square-neck linen jersey", tone: "#DFE4E2",
    img: "/assets/infinity-pool.webp", pos: "50% 62%", zoom: "auto 300%", shot: "look 04 · Bingin sand",
    detail: "/assets/coconut-hat.webp", detailPos: "52% 62%", detailZoom: "cover",
    note: "Straight neckline, wide straps, a high brief that stays put in the shore break.",
    care: "Rinse after swimming, dry flat.", origin: "Cut in Canggu" },

  { id: "p5", name: "Wide Brim Sun Hat", price: 95, cat: "Hats", fabric: "hand-woven raffia straw", tone: "#EDE6D8",
    img: "/assets/p5-sun-hat.webp", pos: "50% 50%", zoom: "cover", shot: "look 05 · long brim",
    detail: "/assets/p6-bucket-hat.webp", detailPos: "50% 50%", detailZoom: "cover", sizes: ["One size"],
    note: "A brim wide enough to read under. Rolls flat into a bag, springs back open.",
    care: "Steam the brim if it creases.", origin: "Woven in Tenganan" },

  { id: "p6", name: "Crochet Bucket Hat", price: 85, cat: "Hats", fabric: "hand-crocheted raffia", tone: "#EBE1D2",
    img: "/assets/p6-bucket-hat.webp", pos: "50% 50%", zoom: "cover", shot: "look 06 · bucket",
    detail: "/assets/p5-sun-hat.webp", detailPos: "50% 50%", detailZoom: "cover", sizes: ["One size"],
    note: "Short brim, open stitch, made in three sittings by one pair of hands.",
    care: "Spot clean only.", origin: "Crocheted in Sidemen" },

  { id: "p7", name: "Heart of the Matter Sunglasses", price: 120, cat: "Sunglasses", fabric: "bio-acetate, red", tone: "#E9D9D6",
    img: "/assets/poolside-linen.webp", pos: "60% 31%", zoom: "auto 330%", shot: "look 07 · red hearts",
    detail: "/assets/p5-sun-hat.webp", detailPos: "50% 50%", detailZoom: "cover", sizes: ["One size"],
    note: "Heart frames in plant-based acetate, smoke-blue lenses. Not a serious pair.",
    care: "Cloth pouch included, use it.", origin: "Cut and polished in Bandung" },

  { id: "p8", name: "Beach Kain, Gold Block Print", price: 130, cat: "Sarong & Kain", fabric: "hand-loomed linen, gold block print", tone: "#E4D7B6",
    img: "/assets/kain-gold-long.webp", pos: "50% 52%", zoom: "auto 116%", shot: "look 08 · two metres",
    detail: "/assets/kain-gold-beach.webp", detailPos: "50% 62%", detailZoom: "cover", sizes: ["One size"],
    note: "Two metres of cloth: knot it at the hip as a maxi sarong, or spread it out and it is the towel. Blocks stamped by hand in gold, so the register wanders.",
    care: "Cold wash, gets softer. Do not bleach the print.", origin: "Loomed in Gianyar · printed in Sidemen" }
  ,
  // Awaiting campaign photography — render as cloth swatches until the shoot lands.
  { id: "p9", name: "Rinse-Off Wrap Dress", price: 195, cat: "Outerwear", fabric: "double-gauze cotton", tone: "#F2F0EC",
    img: "/assets/wrap-dress-white.webp", pos: "50% 52%", zoom: "cover", shot: "look 09 · knotted at the hip",
    detail: "/assets/wrap-dress-white.webp", detailPos: "60% 62%", detailZoom: "auto 260%",
    note: "Short, cuffed sleeve, one long tie knotted at the hip. Goes on over a wet bikini and stays on through lunch.",
    care: "Cold wash, line dry, never iron.", origin: "Cut and sewn in Canggu" },
  { id: "p10", name: "Tie-Front Wrap Skirt, Chalk", price: 165, cat: "Skorts & Shorts", fabric: "washed linen", tone: "#F1EFEA",
    img: "/assets/wrap-skirt-white.webp", pos: "50% 50%", zoom: "cover", shot: "look 10 · chalk",
    detail: "/assets/wrap-skirt-white-model.webp", detailPos: "62% 55%", detailZoom: "auto 150%",
    note: "Mini length with a true wrap front and a sash long enough to knot twice. Shorts hidden underneath, so the wind can do what it likes.",
    care: "Cold wash, warm iron on the reverse.", origin: "Cut in Canggu" },
  { id: "p11", name: "Tie-Front Wrap Skirt, Sand", price: 165, cat: "Skorts & Shorts", fabric: "washed linen", tone: "#C9A780",
    img: "/assets/wrap-skirt-sand.webp", pos: "50% 50%", zoom: "cover", shot: "look 11 · sand",
    detail: "/assets/wrap-skirt-sand-model.webp", detailPos: "60% 58%", detailZoom: "auto 150%",
    note: "The same wrap in a warmer ground — dyed the colour of the path up from the pool. Reads as a skirt, wears like a towel you can leave the house in.",
    care: "Cold wash, warm iron on the reverse.", origin: "Loomed in Gianyar · cut in Canggu" },
  { id: "p12", name: "Blue Hour Set", price: 175, cat: "Lingerie", fabric: "silk satin, scalloped lace", tone: "#4E2C60",
    img: "/assets/p12-lingerie.webp", pos: "50% 46%", zoom: "auto 130%", shot: "look 12 · blue hour",
    detail: "/assets/p12-lingerie.webp", detailPos: "50% 40%", detailZoom: "auto 320%",
    note: "Underwired satin cup edged in lace, low-rise brief to match. Cut for a room, not a beach.",
    care: "Hand wash cool, dry flat in shade.", origin: "Cut and sewn in Kerobokan" },
  { id: "p13", name: "Slow Flow Tank & Pant", price: 190, cat: "Yoga", fabric: "linen jersey", tone: "#E9EEEF",
    img: "", pos: "50% 50%", zoom: "cover", shot: "look 13", detail: "", detailPos: "50% 50%", detailZoom: "cover",
    note: "Knitted linen that breathes on a hot mat and holds its shape.",
    care: "Cold wash, dry flat.", origin: "Knitted and cut in Canggu" },
  { id: "p14", name: "Court Dress, No. 3", price: 210, cat: "Padel", fabric: "linen piqué", tone: "#E4EBEC",
    img: "", pos: "50% 50%", zoom: "cover", shot: "look 14", detail: "", detailPos: "50% 50%", detailZoom: "cover",
    note: "Built for a 7am court: bonded shorts beneath, ball pocket at the hip.",
    care: "Cold wash, line dry.", origin: "Cut in Canggu" },
  { id: "p15", name: "Sundown Kimono", price: 320, cat: "Outerwear", fabric: "silk jacquard, crane weave", tone: "#5A3370",
    img: "/assets/p15-kimono.webp", pos: "42% 52%", zoom: "auto 125%", shot: "look 15 · after dark",
    detail: "/assets/p15-kimono.webp", detailPos: "30% 58%", detailZoom: "auto 280%",
    note: "Full-length, wide sleeve, cranes woven into the ground rather than printed on it. Wears open over the set or nothing at all.",
    care: "Hand wash cool, hang damp.", origin: "Woven in Gianyar · sewn in Kerobokan" },

  { id: "p16", name: "Late Checkout Shirtdress, Ink", price: 265, cat: "Dresses", fabric: "double-gauze cotton, wooden buttons", tone: "#26262A",
    img: "/assets/shirtdress-black-model.webp", pos: "50% 48%", zoom: "auto 118%", shot: "look 16 · ink",
    detail: "/assets/shirtdress-black.webp", detailPos: "12% 14%", detailZoom: "auto 330%",
    note: "Collared, buttoned the whole way down, wrapped over itself and tied at the waist. Cuffed short sleeve, side vents to the knee.",
    care: "Cold wash, line dry. The crinkle is the point.", origin: "Cut and sewn in Kerobokan" },

  { id: "p17", name: "Late Checkout Shirtdress, Chalk", price: 265, cat: "Dresses", fabric: "double-gauze cotton, wooden buttons", tone: "#F2F0EB",
    img: "/assets/shirtdress-white-model.webp", pos: "50% 42%", zoom: "auto 118%", shot: "look 17 · chalk",
    detail: "/assets/shirtdress-white-model.webp", detailPos: "50% 52%", detailZoom: "auto 300%",
    note: "The same dress in undyed gauze, which goes translucent at the hem in full sun. Wear the tie loose and it reads as a coat.",
    care: "Cold wash, line dry. The crinkle is the point.", origin: "Cut and sewn in Kerobokan" },

  { id: "p18", name: "Late Checkout Shirtdress, Clay", price: 275, cat: "Dresses", fabric: "double-gauze cotton, wooden buttons", tone: "#8C3F26",
    img: "/assets/shirtdress-rust.webp", pos: "56% 52%", zoom: "auto 118%", shot: "look 18 · clay",
    detail: "/assets/shirtdress-rust.webp", detailPos: "12% 14%", detailZoom: "auto 330%",
    note: "Dyed with iron-rich clay from the north coast, so no two runs land the same red. Coconut buttons, self-tie belt.",
    care: "Cold wash separately the first time.", origin: "Dyed in Singaraja · sewn in Kerobokan" },

  { id: "p19", name: "Balcony Underwire Bikini", price: 175, cat: "Bikini", fabric: "textured rib, recycled yarn", tone: "#EFEFED",
    img: "/assets/bikini-white-model.webp", pos: "56% 76%", zoom: "auto 150%", shot: "look 19 · pool edge",
    detail: "/assets/bikini-white-flat.webp", detailPos: "50% 50%", detailZoom: "cover",
    note: "A proper underwire cup with a scooped neckline and wide straps, on a high-cut brief. Ribbed so it holds its shape wet.",
    care: "Rinse after swimming, dry flat in shade.", origin: "Cut in Canggu" },

  { id: "p20", name: "Open Air Tie-Front Kimono", price: 225, cat: "Outerwear", fabric: "slub-woven cotton, crochet insert", tone: "#EFE9DC",
    img: "/assets/kimono-cream-tie.webp", pos: "50% 46%", zoom: "auto 120%", shot: "look 20 · undyed",
    detail: "/assets/kimono-cream-model.webp", detailPos: "50% 44%", detailZoom: "auto 130%",
    note: "Wide kimono sleeve, one knot at the sternum, open the whole way down. Crochet strips run the front band and cut across each cuff, so the light comes through in lines.",
    care: "Cold wash, dry flat in shade. Do not wring the crochet.", origin: "Loomed in Gianyar · sewn in Kerobokan" },

  { id: "p21", name: "Open Air Kimono, Full Length", price: 295, cat: "Outerwear", fabric: "slub-woven cotton, crochet insert", tone: "#F1ECE1",
    img: "/assets/kimono-cream-long.webp", pos: "50% 44%", zoom: "auto 116%", shot: "look 21 · to the ankle",
    detail: "/assets/kimono-cream-long.webp", detailPos: "50% 34%", detailZoom: "auto 280%",
    note: "The same knot and sleeve, dropped to the ankle and split to the hip on both sides. Walks open over a swimsuit and closes into a robe when the wind turns.",
    care: "Cold wash, dry flat in shade. Do not wring the crochet.", origin: "Loomed in Gianyar · sewn in Kerobokan" },

  { id: "p22", name: "Kain Wrap Skort", price: 155, cat: "Skorts & Shorts", fabric: "hand-loomed linen, gold block print", tone: "#E4D7B6",
    img: "/assets/kain-gold-short.webp", pos: "50% 62%", zoom: "auto 128%", shot: "look 22 · kain, worn short",
    detail: "/assets/kain-gold-long.webp", detailPos: "50% 58%", detailZoom: "auto 150%",
    note: "The Beach Kain cut down and built onto a hidden short: same gold blocks, same hip knot, none of the holding it closed. Wear it off the beach without thinking about the wind.",
    care: "Cold wash, warm iron on the reverse.", origin: "Loomed in Gianyar · printed in Sidemen · cut in Canggu" },

  { id: "p23", name: "Wordmark Tote, Natural", price: 78, cat: "Bags", fabric: "16oz undyed cotton canvas", tone: "#EFE7D7",
    img: "/assets/tote-natural-flat.webp", pos: "50% 52%", zoom: "auto 108%", shot: "the tote · natural",
    detail: "/assets/tote-natural-model.webp", detailPos: "42% 56%", detailZoom: "auto 130%",
    note: "The stacked wordmark screen-printed in ink on undyed canvas. Wide enough for a towel, a book and a wet swimsuit, with a flat base so it stands on its own.",
    care: "Cold wash, hang dry. Print softens with wear — it is meant to.", origin: "Canvas from Bandung · printed and sewn in Canggu",
    sizes: ["One size"] },

  { id: "p24", name: "Wordmark Tote, Navy", price: 78, cat: "Bags", tone: "#2B3350", fabric: "16oz garment-dyed cotton canvas",
    img: "/assets/tote-navy-flat.webp", pos: "50% 52%", zoom: "auto 108%", shot: "the tote · navy",
    detail: "/assets/tote-navy-hook.webp", detailPos: "50% 62%", detailZoom: "auto 150%",
    note: "The same tote, dyed deep navy with the wordmark in cream. Holds its colour through a season of salt and sun.",
    care: "Cold wash separately for the first two washes. Hang dry.", origin: "Canvas from Bandung · printed and sewn in Canggu",
    sizes: ["One size"] },

  // The Modest Edit — one undyed slub-cotton family, cut to cover and to layer.
  { id: "p25", name: "Golden Hour Duster", price: 285, cat: "Modest", fabric: "slub-woven cotton voile", tone: "#EFE8DA",
    img: "/assets/modest-studio-portrait.webp", pos: "50% 45%", zoom: "cover", shot: "modest · the duster",
    detail: "/assets/modest-pool-walk.webp", detailPos: "37% 45%", detailZoom: "cover",
    note: "Ankle-length, open the whole way down, with a kimono sleeve wide enough to cover the wrist when the arm lifts. Light enough to wear over everything at noon.",
    care: "Cold wash, dry flat in shade.", origin: "Loomed in Gianyar · sewn in Kerobokan" },
  { id: "p26", name: "Long Shade Wide-Leg Trouser", price: 195, cat: "Modest", fabric: "slub-woven cotton, elastic waist", tone: "#F0EADF",
    img: "/assets/modest-studio-wide.webp", pos: "50% 80%", zoom: "auto 175%", shot: "modest · to the floor",
    detail: "/assets/modest-pool-seated.webp", detailPos: "52% 80%", detailZoom: "auto 160%",
    note: "Full to the floor, soft elastic waist, deep side pockets. Cut generously so it never clings — sitting, walking, or kneeling on a mat.",
    care: "Cold wash, line dry.", origin: "Loomed in Gianyar · cut in Canggu" },
  { id: "p27", name: "Lattice Shell Top", price: 145, cat: "Modest", fabric: "jacquard cotton, lattice weave", tone: "#E9E0D0",
    img: "/assets/modest-studio-portrait.webp", pos: "48% 30%", zoom: "auto 230%", shot: "modest · the shell",
    detail: "/assets/modest-pool-seated.webp", detailPos: "40% 38%", detailZoom: "auto 200%",
    note: "High round neck, long sleeve, a hip-length body with room through the chest. The lattice is woven in, so it reads as texture rather than print.",
    care: "Cold wash, dry flat.", origin: "Woven in Gianyar · sewn in Kerobokan" },
  { id: "p28", name: "Ivory Voile Hijab", price: 65, cat: "Modest", fabric: "silk-cotton voile", tone: "#F2ECE2", sizes: ["One size"],
    img: "/assets/modest-studio-portrait.webp", pos: "44% 8%", zoom: "auto 300%", shot: "modest · the hijab",
    detail: "/assets/modest-pool-walk.webp", detailPos: "36% 10%", detailZoom: "auto 260%",
    note: "A long rectangle of silk-cotton that holds a drape without pins slipping. Opaque enough for full sun, cool enough to forget it is there.",
    care: "Hand wash cool, steam to refresh.", origin: "Woven in Gianyar" },
  { id: "p29", name: "The Golden Hour Set", price: 590, cat: "Modest", fabric: "duster, shell, trouser & hijab", tone: "#EFE8DA",
    img: "/assets/modest-pool-walk.webp", pos: "37% 50%", zoom: "cover", shot: "modest · the full set",
    detail: "/assets/modest-studio-wide.webp", detailPos: "50% 50%", detailZoom: "cover",
    note: "All four pieces in one undyed ground: duster, shell, wide-leg trouser and voile hijab. Belt the duster with its own sash for the walk, leave it open by the pool.",
    care: "Cold wash, dry flat in shade.", origin: "Loomed in Gianyar · sewn in Kerobokan" }
];

export function frame(src) {
  return src ? "url(" + src + ")" : "repeating-linear-gradient(124deg,rgba(34,51,59,.07) 0 8px,rgba(34,51,59,0) 8px 16px)";
}

export const SIZES = ["XS", "S", "M", "L"];

export function sizesFor(p) {
  return (p && p.sizes) || SIZES;
}

export function findProduct(id) {
  return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
}

// ---- Site settings: edit these before going live -------------------------
export const SITE = {
  url: "https://toimoietlamer.com",
  whatsapp: "6281234567890",          // international format, digits only — orders go here
  email: "studio@toimoietlamer.com",
  formEndpoint: "",                    // Google Apps Script web-app URL (see DEPLOY.md)
  idrRate: 16000,                      // 1 USD → IDR, used for every IDR price
  villaFeeUsd: 12
};

export function idr(n) {
  return Math.round((n * SITE.idrRate) / 1000) * 1000;
}

export function money(n, currency) {
  if (currency === "USD") return "$" + n.toLocaleString("en-US");
  return "Rp " + idr(n).toLocaleString("id-ID");
}

// Posts to the Google Sheet. no-cors: the request lands, the response is opaque.
export function sendForm(kind, data) {
  if (!SITE.formEndpoint) return Promise.resolve(false);
  const body = JSON.stringify(Object.assign({ kind, page: location.href, at: new Date().toISOString() }, data));
  return fetch(SITE.formEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body })
    .then(() => true).catch(() => false);
}

// Builds the order as a WhatsApp message (prices in IDR) and logs it to the sheet.
export function checkoutWhatsApp(cart, opts) {
  if (!cart || !cart.length) return;
  const villa = !!(opts && opts.villa);
  const ref = "TM-" + Date.now().toString(36).toUpperCase().slice(-6);
  const goods = cart.reduce((t, i) => t + idr(i.price) * i.qty, 0);
  const fee = villa ? idr(SITE.villaFeeUsd) : 0;
  const rp = n => "Rp " + n.toLocaleString("id-ID");
  const lines = cart.map(i => "• " + i.name + " — " + i.size + " × " + i.qty + " — " + rp(idr(i.price) * i.qty));
  const msg = ["Hello Toi, Moi et la Mer — I'd like to order (ref " + ref + "):", ""]
    .concat(lines)
    .concat(["", villa ? "Delivery: direct to my villa in Bali (" + rp(fee) + ")" : "Delivery: shipping — please confirm the rate",
      "Total: " + rp(goods + fee), "", "Name:", "Address:"]).join("\n");
  window.open("https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  sendForm("order", { ref, items: cart.map(i => i.name + " / " + i.size + " x" + i.qty).join("; "), totalIdr: goods + fee, villa });
  return ref;
}
