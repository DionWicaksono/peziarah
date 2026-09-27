// Peziarah Essentials — shoppable photo sets, shown on the Hampers page (#essentials).
// Add a set = add an object here; the page grows a set switcher on its own.
//
// Set shape:
//   id      slug, used as ?set=<id>
//   cartId  optional cart line id (matches the hamper card in data/hampers.js)
//   name    display name
//   blurb   one paragraph
//   image   photo path (4:5)
//   bundle  rupiah, price of the core items bought as one set
//   spots   hotspots, in list order:
//     product  id in data/products.js (hidden until that product exists)
//     opt      optional variant index to preselect (e.g. 1 = pashmina)
//     x, y     position on the photo, % from left / top
//     role     "core" (in the bundle) | "optional" (add-on, full price) | "own" (not sold)
//     label    display name for role "own"
//     note     popup line for role "own"

export const ESSENTIALS = [
  { id: "harian", name: "Peziarah Essentials", cartId: "peziarah-essentials",
    blurb: "Yang dibawa setiap kali berangkat: tas untuk semuanya, kain untuk kepala dan bahu di depan gua, rosario yang tidak putus, satu lagi yang muat di dompet, dan kantong untuk sisanya. Beli satu set, atau ketuk titik di foto dan ambil satuan.",
    image: "/assets/peziarah-essentials.webp",
    bundle: 1500000,
    spots: [
      { product: "tote-sendangsono", x: 31, y: 30, role: "core" },
      { product: "batik-marian", opt: 1, x: 27, y: 58, role: "core" },
      { product: "dopp-kit-kulit", x: 85, y: 44, role: "core" },
      { product: "rosario-mutiara", x: 56, y: 85, role: "core" },
      { product: "kartu-rosario", x: 48, y: 76, role: "core" },
      { product: "card-holder-peziarah", x: 22, y: 76, role: "core" },
      { product: "guadalupe-nis", x: 78, y: 18, role: "optional" },
      { label: "Puji Syukur", x: 63, y: 60, role: "own", note: "Tidak dijual di sini — setiap peziarah membawa miliknya sendiri." }
    ] }
];
