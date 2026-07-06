# Order Management App — Google Apps Script MVP

Implements the spec in `OrderManagementAppMVPDocumentation.pdf`: a cashier
ordering screen, sales history, analytics dashboard, and menu/inventory
management, running entirely on Google Sheets + Apps Script + Drive + Gmail.

## Files

| File | Role |
|---|---|
| `appsscript.json` | Project manifest (webapp config, timezone) |
| `Code.gs` | Constants, `doGet`, `include()`, shared low-level helpers |
| `Setup.gs` | One-time setup, custom Sheet menu, hourly trigger installer |
| `MenuService.gs` | Cached menu reads, add/edit item, stock add/change + Changelog |
| `OrderService.gs` | `confirmOrder` — the core order-confirmation flow |
| `ReceiptService.gs` | Builds the receipt Google Doc, saves to Drive, emails it |
| `DashboardService.gs` | Aggregations for the analytics dashboard |
| `SalesService.gs` | Sales list + per-order detail for the Sales View |
| `Index.html` | Page shell (sidebar nav, theme toggle, includes) |
| `Styles.html` | All CSS: theme variables, layout, animations |
| `Scripts.html` | All client-side JS |
| `OrderView.html`, `SalesView.html`, `DashboardView.html`, `MenuManagementView.html` | View fragments toggled by the sidebar nav |

## Deploying

This is not an npm project — it deploys straight to a Google Apps Script
project bound to a Google Sheet, using [`clasp`](https://github.com/google/clasp):

```bash
npm install -g @google/clasp
clasp login                      # opens a browser to authorize your Google account
```

1. Create a new Google Sheet (this becomes the database).
2. In the Sheet: **Extensions → Apps Script**. This creates a bound script project.
3. Note the Script ID: **Project Settings → Script ID**.
4. From this `apps-script/` folder:
   ```bash
   clasp clone <SCRIPT_ID> --rootDir .
   # or, if clasp complains about existing files, instead:
   clasp create --type sheets --rootDir . --parentId <SPREADSHEET_ID>
   clasp push
   ```
5. Open the script project (`clasp open`) or the Sheet itself, reload the
   Sheet, and use the new **Order App** menu:
   - **Run Setup (sheets + folders)** — creates the `Menu`, `Changelog`,
     `Sales`, `Staff` tabs with headers, the `Receipts` and `Food Images`
     Drive folders, and installs the hourly cache-refresh trigger.
   - Add cashier/staff names to the **Staff** tab (used by the manual
     dropdown described in the spec).
6. Deploy as a web app: **Deploy → New deployment → Web app**.
   - Execute as: **User accessing the web app** (or "Me", if you want every
     order attributed to a single Google identity regardless of who opens it).
   - Who has access: your organization, or "Anyone with the link" per your needs.
7. Open the deployment URL — that's the app.

The first run of any function will prompt an OAuth consent screen (Sheets,
Drive, Gmail scopes) — accept it once from the Apps Script editor by running
`setupSpreadsheet` manually, since triggers/web app calls can't grant consent interactively.

## Google Sheet schema

**Menu** — `Item ID, Category, Name, RSP Price, SRP Price, Image, Quantity`
**Changelog** — `Timestamp, Item Name, Action, Quantity Changed, User`
**Sales** — `Order ID, Food/Item, Category, Quantity, SRP, Line Total, Timestamp, User`
**Staff** — `Name` (pre-populate with your cashier/staff names)

## Design notes / deliberate deviations from the literal spec

- **Sales tab gained `Quantity` and `Line Total` columns.** The spec's listed
  fields (Order ID, Food/Item, Category, Timestamp, User, SRP) can't
  reconstruct order totals or dashboard earnings without a quantity, so this
  was added as the minimum necessary extension.
- **Changelog gained a third `Action` value, `"Sale"`,** alongside the
  spec'd `Add`/`Delete`, so that order-driven stock decrements (required by
  §5.5) are distinguishable in the audit log from manual stock adjustments
  made from Menu Management.
- **"Total profit" and "earnings by RSP vs SRP":** the data model has no
  cost-of-goods field, so:
  - *Total Earnings (SRP)* = actual revenue collected (sum of line totals).
  - *Total Earnings (RSP)* = hypothetical revenue if every sale had been at
    the item's current regular price — a proxy for "value given up" via
    specials.
  - *Total Profit* is reported as realized revenue (SRP-based), since no
    cost basis exists to net against. If you have real per-item cost data,
    add a `Cost` column to Menu and adjust `getDashboardData` in
    `DashboardService.gs`.
- **Receipt "HTML page saved as a Google Doc":** implemented as a
  `DocumentApp` doc built to mirror the reference receipt's structure
  (business header, itemized table, totals, footer), stored in the
  `Receipts` folder under the Receipt ID. The email body is the HTML
  rendering of the same data, with a link to the Doc (no PDF is generated
  or attached, per the "not a PDF" requirement).
- **Currency symbol** defaults to ₱ (`CURRENCY_SYMBOL` in `Code.gs`) —
  change freely.
- **Business header** (name/address/phone in `ReceiptService.gs`) is a
  placeholder — update `BUSINESS_NAME`, `BUSINESS_ADDRESS`, `BUSINESS_PHONE`
  to match the real receipt template reference once available.
- Menu item images referenced from the app use
  `https://drive.google.com/uc?id=<fileId>` after setting the file to
  "Anyone with the link can view" — required for `<img>` tags to load them
  in the browser.

## Not included (needs the reference screenshots to finish 1:1)

The UI/menu-grid and receipt layout were built from the written structural
description in the doc (grid + right-side order summary; itemized receipt
with header/footer). The actual reference screenshot and receipt image
mentioned in the spec ("to be uploaded separately") weren't attached to this
build — if you share them, the CSS/markup can be refined to match pixel-for-pixel.
