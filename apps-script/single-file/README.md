# Order Management App — single-file build

This folder mirrors the multi-file project one level up (`apps-script/`),
but consolidated into exactly the two files the tech stack in the spec
calls for, plus the database:

- **`Code.gs`** — all server-side logic (menu/inventory, orders, receipts,
  dashboard, sales, setup) in one file.
- **`Index.html`** — the entire client (styles + all 4 views + JS) in one
  file, no template includes.
- **`OrderManagementApp_Database.xlsx`** — the Google Sheet database:
  `Menu`, `Changelog`, `Sales`, `Staff` tabs with the correct headers
  (bold, frozen), and `Staff` pre-seeded with two sample names.

Functionally identical to the multi-file version in `../`; split into
separate `.gs`/`.html` files there only for readability. See `../README.md`
for full deployment steps, sheet schema, and the documented design
decisions (e.g. why `Sales` has `Quantity`/`Line Total`, why `Changelog`
has a `"Sale"` action, how "profit" is computed).

## Quick deploy

1. Upload `OrderManagementApp_Database.xlsx` to Google Drive → it opens as
   a Google Sheet (or File → Import if you'd rather merge it into an
   existing Sheet).
2. In that Sheet: **Extensions → Apps Script**.
3. Delete the default `Code.gs`/`appsscript.json` content, paste in this
   folder's `Code.gs`, then add a new HTML file named `Index` and paste in
   `Index.html`'s contents.
4. Save, reload the Sheet, use the new **Order App** menu → **Run Setup**
   (this is idempotent — safe to run even though the xlsx already has the
   tabs; it also creates the Drive folders and hourly trigger).
5. **Deploy → New deployment → Web app** to get the app's URL.
