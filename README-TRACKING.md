# Conversion tracking (via Google Tag Manager)

Every page loads GTM container **GTM-NQS6GCB7**. The old hardcoded GA snippet is gone — GA4 (**G-H8J9GKJ2NT**) now loads through GTM.

The site code (`data/track.js`) only pushes events into `dataLayer` as `pz_<event>`. GTM decides where they go. The ready-made tags are in `gtm-container-peziarah.json`.

## ⚠️ Order matters

**Publish the GTM container BEFORE pushing to the repo.** Hostinger deploys from Git, so a push goes live immediately. The new pages no longer contain GA directly, so if the container is empty when the site goes live, GA4 records nothing.

## Step 1 — Import the container (5 minutes)

1. tagmanager.google.com → open the **peziarah.com** container (GTM-NQS6GCB7).
2. **Admin → Import Container** → choose `gtm-container-peziarah.json`.
3. Workspace: **Existing → Default Workspace**. Option: **Merge → Overwrite conflicting tags, triggers and variables**.
4. Confirm. You should see 17 tags, 10 triggers, 17 variables.
5. Click **Submit → Publish**.

Note: "Meta - Pixel base" is set to fire **Once per page**. It is also the setup tag for every Meta event tag; with "Once per event" it re-ran `fbq('init')` + `PageView` before each ViewContent/AddToCart/Lead, inflating PageViews.

## Step 2 — Push the repo

`git add -A && git commit -m "Add tracking" && git push` — Hostinger deploys it.

`README-TRACKING.md`, `gtm-container-peziarah.json` and `meta-capi-apps-script.gs` are deployed too but blocked by `.htaccess` (they return the 404 page). Never put the access token or form edit links in the repo copy of the script — fill those in only at script.google.com.

Note: `.htaccess` caches `.js` files for 7 days, so a returning visitor may run the old `cart.js` / `forms.js` for up to a week. Product/cart views and WhatsApp clicks track for everyone immediately; add-to-cart and form events catch up as caches expire.

## Step 3 — Check it works

GTM → **Preview** → enter `https://peziarah.com`. Click around: open a product, add to cart, click a WhatsApp button. Each `pz_…` event should show its GA4 tag as **Fired**. Live data also shows in **GA4 → Admin → DebugView**.

Shortcut without GTM: open any page with `?track_debug=1` and every event logs to the browser console (`?track_debug=0` turns it off).

## Step 4 — GA4 settings (after ~24 h)

1. **Admin → Events**: mark as **key event**: `purchase` (often automatic), `generate_lead`, `whatsapp_click`.
2. **Admin → Custom definitions** → create Event-scoped dimensions: `form_type`, `route`, `page_type`, `link_text`.

## Events

| dataLayer event | GA4 event | When | Data sent |
|---|---|---|---|
| `pz_view_item` | view_item | Product page opens | ecommerce: value, items |
| `pz_add_to_cart` | add_to_cart | "Tambah ke Keranjang" | ecommerce |
| `pz_view_cart` | view_cart | `/keranjang/` opens | ecommerce |
| `pz_begin_checkout` | begin_checkout | First checkout field touched | ecommerce |
| `pz_purchase` | purchase | Checkout form submitted | ecommerce: transaction_id (order code), value, shipping, items |
| `pz_invoice_download` | invoice_download (+ Meta custom `InvoiceDownload`) | "Unduh Invoice (PDF)" on /keranjang/ | ecommerce: transaction_id (invoice no.), value, items |
| `pz_generate_lead` | generate_lead | Any other form | form_type, lead_id, route, group_size, style, pace, duration, sacrament, city, category |
| `pz_whatsapp_click` / `pz_phone_click` / `pz_email_click` | same | wa.me / tel: / mailto: click | link_text, page_type |

`form_type`: `ziarah`, `ziarah-susun-sendiri`, `concierge` (grup kecil), `shuttle`, `paroki`, `vendor`, `tanya`.

`purchase` = **order submitted**, not paid (payment is manual transfer). The order code matches the Google Sheet and the WhatsApp message.

Privacy: no name, phone, email, address or free text is ever pushed. `tanya` sends only `form_type`.

## Adding more tools later (all in GTM, no code changes)

- **Meta Pixel** (ID 1005932122517702) is already in the container: base pixel on all pages, plus `pz_view_item`→ViewContent, `pz_add_to_cart`→AddToCart, `pz_begin_checkout`→InitiateCheckout, `pz_purchase`→Purchase (eventID = order code), `pz_generate_lead`→Lead (skips tanya and vendor), `pz_whatsapp_click`→Contact. Product IDs match `item_group_id` in `meta-catalog.csv`. Test with the **Meta Pixel Helper** Chrome extension or Events Manager → **Test events**. Server-side events: see Meta Conversions API below.
- **Google tag GT-K82MXNPS**: check its destinations in Google Ads/Merchant Center → Google tag → Manage. If it already includes G-H8J9GKJ2NT, don't add it (double counting). If it's only a Google Ads `AW-` ID, add a Google Ads Conversion tag on `pz_purchase` / `pz_generate_lead` instead.

## Meta Conversions API (server-side, via Google Apps Script)

`meta-capi-apps-script.gs` sends every checkout (Purchase) and ziarah/shuttle/grup-kecil form (Lead) from Google Forms to Meta. It uses the same order/lead code as the Pixel's eventID, so Meta counts each conversion once. Phone, email and first name are SHA-256 hashed before sending. The access token lives only in the script's settings, never on the website.

### A. Add four hidden questions to each Google Form

Forms: checkout (pesanan), ziarah, ziarah susun sendiri, grup kecil (concierge), shuttle. Paroki has no Google Form yet; add these when you create it.

1. Open the form → add 4 **Short answer** questions, not required, titled exactly: `_ua`, `_fbp`, `_fbc`, `_url`. (Visitors never see the Google Form; the site posts to it directly.)
2. ⋮ → **Get pre-filled link** → type `x` in each of the 4 → **Get link** → copy it.
3. In the link, each answer looks like `entry.123456789=x`. Put those numbers into `data/forms.js` under that form's `_ua`, `_fbp`, `_fbc`, `_url` (e.g. `_ua: "entry.123456789"`), then commit and push `data/forms.js`.

Until this is done, CAPI still works but sends events as `system_generated` with hashed phone/email only (lower match quality, no browser dedup data).

### B. Install the script

1. https://script.google.com → **New project** → paste all of `meta-capi-apps-script.gs`.
2. In `FORMS`, replace each `PASTE_EDIT_LINK` with that form's edit URL (the one ending in `/edit`).
3. **Project Settings → Script Properties → Add**:
   - `META_CAPI_TOKEN` = Events Manager → your Pixel → Settings → Conversions API → **Generate access token**
   - `META_TEST_CODE` = (while testing) the code from Events Manager → **Test events**
4. Choose function **setup** → **Run** → approve permissions. The log lists each connected form.
5. Submit a test order on the site → it appears in Events Manager → Test events as *Server*. Then delete `META_TEST_CODE`.

If an event is missing, run **showLastResponses**: it prints each form's question titles, what was detected, and the last error.

### C. Optional: paid orders

In the script set `PAID.sheetUrl` to the orders spreadsheet (the one with a Status column) and run **setup** again. Changing Status to `lunas` / `paid` / `dibayar` sends a `PaidOrder` event with the order value. In Events Manager create a **Custom Conversion** on `PaidOrder` to optimise ads for paying customers.

## Pages without tracking

`/concierge/`, `/strategi/`, `/brandkit/`, `/businessmodelcanvas/`, `/empat/`, `GuaMariaMap.dc.html` have no GTM. They look internal; if any is public, add the GTM snippets + `<script type="module" src="/data/track.js"></script>`, or remove it from the live site.
