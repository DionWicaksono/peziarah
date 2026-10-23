// Shoppable lookbook photos (ChristianCore.dc.html). Same spot shape as
// data/essentials.js: product id + x/y in % of the photo; role "own" = worn in
// the shot but not sold here (label + note).

export const LOOKS = [
  { id: "berkah-dalem", name: "Christian-core Fashion",
    blurb: "Salib, rosario, dan bahasa rupa devosi, dipakai bersama streetwear sehari-hari. Lima barang di foto ini dari kami — ketuk titiknya untuk detail, atau ambil satu tampilan sekaligus.",
    image: "/assets/christiancore-lookbook.webp", ratio: "1755/2194",
    spots: [
      { product: "hoodie-berkah-dalem", opt: 1, x: 60, y: 37 },
      { product: "bandana-triquetra", x: 54, y: 19 },
      { product: "kartu-rosario", x: 39, y: 47 },
      { product: "tote-sendangsono", x: 51, y: 50 },
      { product: "knuckle-duster-yesaya", x: 61, y: 55 },
      { label: "Kacamata — Cengdem", x: 59, y: 13, role: "own", note: "Bukan produk kami — dipakai di foto ini saja." },
      { label: "Celana — Kolpri", x: 49, y: 77, role: "own", note: "Bukan produk kami — dipakai di foto ini saja." },
      { label: "Sepatu — Ventela Low", x: 59, y: 93, role: "own", note: "Bukan produk kami — dipakai di foto ini saja." }
    ] }
];
