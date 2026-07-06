/**
 * Order Management App — MVP
 * Single-file Code.gs (all server-side logic).
 *
 * This is a container-bound Apps Script project: bind it to the Google
 * Sheet database (Extensions > Apps Script from the Sheet). Run
 * "Order App > Run Setup" from the Sheet's custom menu once before
 * first use.
 */

// =============================================================================
// Code
// =============================================================================

// ---- Sheet / Drive / business constants -----------------------------------

var SHEET_MENU = 'Menu';
var SHEET_CHANGELOG = 'Changelog';
var SHEET_SALES = 'Sales';
var SHEET_STAFF = 'Staff';

var MENU_HEADERS = ['Item ID', 'Category', 'Name', 'RSP Price', 'SRP Price', 'Image', 'Quantity'];
var CHANGELOG_HEADERS = ['Timestamp', 'Item Name', 'Action', 'Quantity Changed', 'User'];
// Quantity + Line Total are added beyond the original spec fields because the
// Dashboard (total earnings, profit, most-ordered items) cannot be computed
// from a unit price alone — see README "Design notes".
var SALES_HEADERS = ['Order ID', 'Food/Item', 'Category', 'Quantity', 'SRP', 'Line Total', 'Timestamp', 'User'];
var STAFF_HEADERS = ['Name'];

var RECEIPTS_FOLDER_NAME = 'Receipts';
var IMAGES_FOLDER_NAME = 'Food Images';

var RECEIPT_EMAIL = 'ksison001@gmail.com';
var TAX_RATE = 0.10;
var CURRENCY_SYMBOL = '₱'; // Philippine peso; change freely.

var CACHE_KEY_MENU = 'menu_data_v1';
var CACHE_TTL_SECONDS = 3600; // 1 hour — refreshed hourly by a time-driven trigger too.

var PROP_RECEIPTS_FOLDER_ID = 'RECEIPTS_FOLDER_ID';
var PROP_IMAGES_FOLDER_ID = 'IMAGES_FOLDER_ID';

// ---- Web app entry point ----------------------------------------------------

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Order Management')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ---- Low-level helpers ------------------------------------------------------

function ss_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function sheet_(name) {
  var sh = ss_().getSheetByName(name);
  if (!sh) {
    throw new Error('Missing sheet "' + name + '". Run "Order App > Run Setup" from the Sheet menu first.');
  }
  return sh;
}

function readRows_(sheetName) {
  var sh = sheet_(sheetName);
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (row.every(function (c) { return c === '' || c === null; })) continue;
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    obj._row = i + 1; // 1-indexed sheet row, for in-place updates
    rows.push(obj);
  }
  return rows;
}

function newId_(prefix) {
  var tz = Session.getScriptTimeZone();
  var ts = Utilities.formatDate(new Date(), tz, 'yyyyMMddHHmmss');
  var rand = Math.floor(100 + Math.random() * 900);
  return prefix + ts + '-' + rand;
}

function getOrCreateFolder_(name, propKey) {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty(propKey);
  if (id) {
    try {
      return DriveApp.getFolderById(id);
    } catch (err) {
      // fall through and recreate if the stored id is stale
    }
  }
  var existing = DriveApp.getFoldersByName(name);
  var folder = existing.hasNext() ? existing.next() : DriveApp.createFolder(name);
  props.setProperty(propKey, folder.getId());
  return folder;
}

function receiptsFolder_() {
  return getOrCreateFolder_(RECEIPTS_FOLDER_NAME, PROP_RECEIPTS_FOLDER_ID);
}

function imagesFolder_() {
  return getOrCreateFolder_(IMAGES_FOLDER_NAME, PROP_IMAGES_FOLDER_ID);
}

function formatCurrency_(n) {
  return CURRENCY_SYMBOL + (Math.round(Number(n) * 100) / 100).toFixed(2);
}

function round2_(n) {
  return Math.round(Number(n) * 100) / 100;
}

// =============================================================================
// Setup
// =============================================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Order App')
    .addItem('Run Setup (sheets + folders)', 'setupSpreadsheet')
    .addItem('Install Hourly Cache Trigger', 'installHourlyTrigger')
    .addItem('Refresh Menu Cache Now', 'refreshMenuCache')
    .addToUi();
}

function setupSpreadsheet() {
  ensureSheet_(SHEET_MENU, MENU_HEADERS);
  ensureSheet_(SHEET_CHANGELOG, CHANGELOG_HEADERS);
  ensureSheet_(SHEET_SALES, SALES_HEADERS);
  var staffSheet = ensureSheet_(SHEET_STAFF, STAFF_HEADERS);
  if (staffSheet.getLastRow() < 2) {
    staffSheet.getRange(2, 1, 2, 1).setValues([['Cashier 1'], ['Cashier 2']]);
  }

  receiptsFolder_();
  imagesFolder_();
  installHourlyTrigger();
  refreshMenuCache();

  SpreadsheetApp.getUi().alert(
    'Setup complete.\n\n' +
    '- Sheets created: Menu, Changelog, Sales, Staff\n' +
    '- Drive folders created: Receipts, Food Images\n' +
    '- Hourly cache-refresh trigger installed\n\n' +
    'Add staff names to the Staff tab, then add menu items from the app\'s Menu Management view.'
  );
}

function ensureSheet_(name, headers) {
  var ss = ss_();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
  }
  var existingHeaders = sh.getRange(1, 1, 1, headers.length).getValues()[0];
  var needsHeaders = existingHeaders.join('|') !== headers.join('|');
  if (needsHeaders) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function installHourlyTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'refreshMenuCache') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('refreshMenuCache').timeBased().everyHours(1).create();
}

// =============================================================================
// MenuService
// =============================================================================

function getMenuData() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(CACHE_KEY_MENU);
  if (cached) return JSON.parse(cached);
  return refreshMenuCache();
}

/** Recomputes the menu cache from the Sheet. Called hourly by trigger,
 * after any menu/stock change, and on cache miss. */
function refreshMenuCache() {
  var rows = readRows_(SHEET_MENU).map(function (r) {
    return {
      itemId: r['Item ID'],
      category: r['Category'],
      name: r['Name'],
      rsp: Number(r['RSP Price']) || 0,
      srp: Number(r['SRP Price']) || 0,
      image: r['Image'] || '',
      quantity: Number(r['Quantity']) || 0
    };
  });
  CacheService.getScriptCache().put(CACHE_KEY_MENU, JSON.stringify(rows), CACHE_TTL_SECONDS);
  return rows;
}

function invalidateMenuCache_() {
  CacheService.getScriptCache().remove(CACHE_KEY_MENU);
}

function getStaffList() {
  return readRows_(SHEET_STAFF)
    .map(function (r) { return r['Name']; })
    .filter(function (n) { return !!n; });
}

/**
 * item: { category, name, rsp, srp, quantity, imageBase64, imageMimeType, imageName }
 * imageBase64/imageMimeType/imageName are optional — if omitted, Image is left blank.
 */
function addMenuItem(item) {
  var sh = sheet_(SHEET_MENU);
  var itemId = newId_('ITEM-');
  var imageUrl = item.imageBase64 ? saveImageToDrive_(item.imageBase64, item.imageMimeType, item.imageName, itemId) : '';

  sh.appendRow([
    itemId,
    item.category,
    item.name,
    Number(item.rsp) || 0,
    Number(item.srp) || 0,
    imageUrl,
    Number(item.quantity) || 0
  ]);

  invalidateMenuCache_();
  return refreshMenuCache();
}

/**
 * fields: { category, name, rsp, srp, quantity, imageBase64?, imageMimeType?, imageName? }
 * Any field omitted/undefined is left unchanged.
 */
function updateMenuItem(itemId, fields) {
  var sh = sheet_(SHEET_MENU);
  var rows = readRows_(SHEET_MENU);
  var target = rows.filter(function (r) { return r['Item ID'] === itemId; })[0];
  if (!target) throw new Error('Item not found: ' + itemId);

  var category = fields.category !== undefined ? fields.category : target['Category'];
  var name = fields.name !== undefined ? fields.name : target['Name'];
  var rsp = fields.rsp !== undefined ? Number(fields.rsp) : target['RSP Price'];
  var srp = fields.srp !== undefined ? Number(fields.srp) : target['SRP Price'];
  var quantity = fields.quantity !== undefined ? Number(fields.quantity) : target['Quantity'];
  var imageUrl = target['Image'];
  if (fields.imageBase64) {
    imageUrl = saveImageToDrive_(fields.imageBase64, fields.imageMimeType, fields.imageName, itemId);
  }

  sh.getRange(target._row, 1, 1, MENU_HEADERS.length).setValues([[itemId, category, name, rsp, srp, imageUrl, quantity]]);

  invalidateMenuCache_();
  return refreshMenuCache();
}

/**
 * action: 'Add' (increase stock) or 'Delete' (decrease stock).
 * Logs every change to the Changelog tab.
 */
function changeStock(itemId, action, qty, user) {
  qty = Math.abs(Number(qty) || 0);
  if (qty <= 0) throw new Error('Quantity must be greater than zero.');

  var sh = sheet_(SHEET_MENU);
  var rows = readRows_(SHEET_MENU);
  var target = rows.filter(function (r) { return r['Item ID'] === itemId; })[0];
  if (!target) throw new Error('Item not found: ' + itemId);

  var current = Number(target['Quantity']) || 0;
  var updated = action === 'Add' ? current + qty : current - qty;
  if (updated < 0) throw new Error('Cannot remove more stock than is available.');

  sh.getRange(target._row, MENU_HEADERS.indexOf('Quantity') + 1).setValue(updated);
  logChangelog_(target['Name'], action, qty, user);

  invalidateMenuCache_();
  return refreshMenuCache();
}

function logChangelog_(itemName, action, qty, user) {
  sheet_(SHEET_CHANGELOG).appendRow([new Date(), itemName, action, qty, user || '']);
}

function saveImageToDrive_(base64Data, mimeType, fileName, itemId) {
  var bytes = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(bytes, mimeType || 'image/png', (fileName || itemId) + '');
  var file = imagesFolder_().createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return 'https://drive.google.com/uc?id=' + file.getId();
}

// =============================================================================
// OrderService
// =============================================================================

/**
 * payload: { user: string, items: [{ itemId, name, category, qty, srp }] }
 * Returns: { orderId, receiptId, receiptUrl, subtotal, tax, total }
 */
function confirmOrder(payload) {
  if (!payload || !payload.items || !payload.items.length) {
    throw new Error('Order has no items.');
  }
  if (!payload.user) {
    throw new Error('A user must be selected before confirming an order.');
  }

  var menuSheet = sheet_(SHEET_MENU);
  var menuRows = readRows_(SHEET_MENU);
  var menuById = {};
  menuRows.forEach(function (r) { menuById[r['Item ID']] = r; });

  // Validate stock up front so a partial failure can't decrement some items and not others.
  payload.items.forEach(function (line) {
    var row = menuById[line.itemId];
    if (!row) throw new Error('Unknown item: ' + line.itemId);
    if (Number(row['Quantity']) < Number(line.qty)) {
      throw new Error('Not enough stock for "' + row['Name'] + '".');
    }
  });

  var orderId = newId_('ORD-');
  var timestamp = new Date();
  var subtotal = 0;

  payload.items.forEach(function (line) {
    var row = menuById[line.itemId];
    var qty = Number(line.qty);
    var srp = Number(line.srp !== undefined ? line.srp : row['SRP Price']);
    var lineTotal = round2_(srp * qty);
    subtotal += lineTotal;

    sheet_(SHEET_SALES).appendRow([
      orderId, row['Name'], row['Category'], qty, srp, lineTotal, timestamp, payload.user
    ]);

    var newQty = Number(row['Quantity']) - qty;
    menuSheet.getRange(row._row, MENU_HEADERS.indexOf('Quantity') + 1).setValue(newQty);
    // Order-driven decrements are also logged to the Changelog (Action: "Sale"),
    // distinct from manual "Add"/"Delete" stock adjustments.
    logChangelog_(row['Name'], 'Sale', qty, payload.user);
  });

  invalidateMenuCache_();
  refreshMenuCache();

  subtotal = round2_(subtotal);
  var tax = round2_(subtotal * TAX_RATE);
  var total = round2_(subtotal + tax);

  var receipt = generateReceipt({
    orderId: orderId,
    timestamp: timestamp,
    user: payload.user,
    items: payload.items.map(function (line) {
      var row = menuById[line.itemId];
      var srp = Number(line.srp !== undefined ? line.srp : row['SRP Price']);
      return { name: row['Name'], qty: Number(line.qty), srp: srp, lineTotal: round2_(srp * Number(line.qty)) };
    }),
    subtotal: subtotal,
    tax: tax,
    total: total
  });

  return {
    orderId: orderId,
    receiptId: receipt.receiptId,
    receiptUrl: receipt.url,
    subtotal: subtotal,
    tax: tax,
    total: total
  };
}

// =============================================================================
// ReceiptService
// =============================================================================

var BUSINESS_NAME = 'Your Restaurant Name';
var BUSINESS_ADDRESS = '123 Sample Street, Quezon City, Philippines';
var BUSINESS_PHONE = '(02) 8123-4567';
var RECEIPT_FOOTER = 'Thank you for visiting!';

/**
 * order: { orderId, timestamp, user, items: [{name, qty, srp, lineTotal}], subtotal, tax, total }
 * Returns: { receiptId, url }
 */
function generateReceipt(order) {
  var receiptId = 'RCPT-' + order.orderId;
  removeExistingReceiptFile_(receiptId);

  var doc = buildReceiptDoc_(receiptId, order);
  var file = DriveApp.getFileById(doc.getId());
  var folder = receiptsFolder_();
  folder.addFile(file);
  var parents = file.getParents();
  while (parents.hasNext()) {
    var parent = parents.next();
    if (parent.getId() !== folder.getId()) parent.removeFile(file);
  }

  var htmlBody = buildReceiptHtml_(receiptId, order);
  GmailApp.sendEmail(RECEIPT_EMAIL, 'Receipt ' + receiptId + ' — Order ' + order.orderId, htmlBody.replace(/<[^>]+>/g, ' '), {
    htmlBody: htmlBody + '<p>Doc: <a href="' + doc.getUrl() + '">' + doc.getUrl() + '</a></p>',
    name: BUSINESS_NAME
  });

  return { receiptId: receiptId, url: doc.getUrl() };
}

/** Re-sends/re-creates the receipt for an already-confirmed order. */
function regenerateReceipt(orderId) {
  var order = getOrderDetail(orderId);
  return generateReceipt(order);
}

function removeExistingReceiptFile_(receiptId) {
  var folder = receiptsFolder_();
  var files = folder.getFilesByName(receiptId);
  while (files.hasNext()) {
    files.next().setTrashed(true);
  }
}

function buildReceiptDoc_(receiptId, order) {
  var doc = DocumentApp.create(receiptId);
  var body = doc.getBody();
  body.setMarginTop(36).setMarginBottom(36);

  body.appendParagraph(BUSINESS_NAME).setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(BUSINESS_ADDRESS).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(BUSINESS_PHONE).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendHorizontalRule();

  var tz = Session.getScriptTimeZone();
  body.appendParagraph('Order ID: ' + order.orderId);
  body.appendParagraph('Receipt ID: ' + receiptId);
  body.appendParagraph('Date/Time: ' + Utilities.formatDate(new Date(order.timestamp), tz, 'MMM d, yyyy h:mm a'));
  body.appendParagraph('Cashier: ' + order.user);
  body.appendParagraph(' ');

  var tableData = [['Item', 'Qty', 'Price', 'Line Total']];
  order.items.forEach(function (it) {
    tableData.push([it.name, String(it.qty), formatCurrency_(it.srp), formatCurrency_(it.lineTotal)]);
  });
  var table = body.appendTable(tableData);
  table.getRow(0).editAsText().setBold(true);

  body.appendParagraph(' ');
  body.appendParagraph('Subtotal: ' + formatCurrency_(order.subtotal)).setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
  body.appendParagraph('Tax (10%): ' + formatCurrency_(order.tax)).setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
  var totalPara = body.appendParagraph('Total: ' + formatCurrency_(order.total));
  totalPara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT).editAsText().setBold(true);

  body.appendHorizontalRule();
  body.appendParagraph(RECEIPT_FOOTER).setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  doc.saveAndClose();
  return doc;
}

function buildReceiptHtml_(receiptId, order) {
  var tz = Session.getScriptTimeZone();
  var dateStr = Utilities.formatDate(new Date(order.timestamp), tz, 'MMM d, yyyy h:mm a');
  var rows = order.items.map(function (it) {
    return '<tr><td style="padding:4px 8px;">' + it.name + '</td>' +
      '<td style="padding:4px 8px;text-align:center;">' + it.qty + '</td>' +
      '<td style="padding:4px 8px;text-align:right;">' + formatCurrency_(it.srp) + '</td>' +
      '<td style="padding:4px 8px;text-align:right;">' + formatCurrency_(it.lineTotal) + '</td></tr>';
  }).join('');

  return '' +
    '<div style="font-family:Arial,sans-serif;max-width:420px;margin:auto;">' +
    '<h2 style="text-align:center;margin-bottom:0;">' + BUSINESS_NAME + '</h2>' +
    '<p style="text-align:center;margin:2px 0;">' + BUSINESS_ADDRESS + '<br/>' + BUSINESS_PHONE + '</p>' +
    '<hr/>' +
    '<p>Order ID: ' + order.orderId + '<br/>Receipt ID: ' + receiptId + '<br/>Date/Time: ' + dateStr + '<br/>Cashier: ' + order.user + '</p>' +
    '<table style="width:100%;border-collapse:collapse;">' +
    '<thead><tr><th style="text-align:left;padding:4px 8px;">Item</th><th style="padding:4px 8px;">Qty</th><th style="text-align:right;padding:4px 8px;">Price</th><th style="text-align:right;padding:4px 8px;">Total</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' +
    '<p style="text-align:right;margin:4px 0;">Subtotal: ' + formatCurrency_(order.subtotal) + '<br/>' +
    'Tax (10%): ' + formatCurrency_(order.tax) + '<br/>' +
    '<b>Total: ' + formatCurrency_(order.total) + '</b></p>' +
    '<hr/><p style="text-align:center;">' + RECEIPT_FOOTER + '</p>' +
    '</div>';
}

// =============================================================================
// DashboardService
// =============================================================================

/**
 * period: 'daily' | 'weekly' | 'monthly' — filters the "most ordered items" list only.
 * All other figures (totals, monthly overview) are all-time.
 */
function getDashboardData(period) {
  var salesRows = readRows_(SHEET_SALES);
  var menuRows = readRows_(SHEET_MENU);
  var rspByName = {};
  menuRows.forEach(function (r) { rspByName[r['Name']] = Number(r['RSP Price']) || 0; });

  var totalSRP = 0;
  var totalRSP = 0;
  var monthlyTotals = {}; // 'YYYY-MM' -> sum
  var tz = Session.getScriptTimeZone();

  salesRows.forEach(function (r) {
    var lineTotal = Number(r['Line Total']) || 0;
    var qty = Number(r['Quantity']) || 0;
    var rsp = rspByName[r['Food/Item']] !== undefined ? rspByName[r['Food/Item']] : Number(r['SRP']) || 0;

    totalSRP += lineTotal;
    totalRSP += rsp * qty;

    var monthKey = Utilities.formatDate(new Date(r['Timestamp']), tz, 'yyyy-MM');
    monthlyTotals[monthKey] = round2_((monthlyTotals[monthKey] || 0) + lineTotal);
  });

  var monthKeys = Object.keys(monthlyTotals).sort();
  var monthlySales = monthKeys.slice(-12).map(function (k) { return { month: k, total: monthlyTotals[k] }; });

  var range = periodRange_(period);
  var qtyByItem = {};
  salesRows
    .filter(function (r) { return withinRange_(new Date(r['Timestamp']), range); })
    .forEach(function (r) {
      var name = r['Food/Item'];
      qtyByItem[name] = (qtyByItem[name] || 0) + (Number(r['Quantity']) || 0);
    });
  var mostOrdered = Object.keys(qtyByItem)
    .map(function (name) { return { name: name, qty: qtyByItem[name] }; })
    .sort(function (a, b) { return b.qty - a.qty; })
    .slice(0, 8);

  return {
    period: period || 'monthly',
    totalEarningsSRP: round2_(totalSRP),
    totalEarningsRSP: round2_(totalRSP),
    totalProfit: round2_(totalSRP),
    monthlySales: monthlySales,
    mostOrderedItems: mostOrdered
  };
}

function periodRange_(period) {
  var now = new Date();
  var start;
  if (period === 'daily') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === 'weekly') {
    start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), 1); // monthly = calendar month to date
  }
  return { start: start, end: now };
}

function withinRange_(date, range) {
  return date >= range.start && date <= range.end;
}

// =============================================================================
// SalesService
// =============================================================================

function getSalesList() {
  var rows = readRows_(SHEET_SALES);
  var byOrder = {};
  var order = [];

  rows.forEach(function (r) {
    var id = r['Order ID'];
    if (!byOrder[id]) {
      byOrder[id] = {
        orderId: id,
        timestamp: r['Timestamp'],
        user: r['User'],
        itemCount: 0,
        total: 0
      };
      order.push(id);
    }
    byOrder[id].itemCount += Number(r['Quantity']) || 0;
    byOrder[id].total = round2_(byOrder[id].total + (Number(r['Line Total']) || 0));
  });

  return order
    .map(function (id) { return byOrder[id]; })
    .sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
}

/** Returns full order detail, including subtotal/tax/total, for receipts/regeneration. */
function getOrderDetail(orderId) {
  var rows = readRows_(SHEET_SALES).filter(function (r) { return r['Order ID'] === orderId; });
  if (!rows.length) throw new Error('Order not found: ' + orderId);

  var items = rows.map(function (r) {
    return {
      name: r['Food/Item'],
      category: r['Category'],
      qty: Number(r['Quantity']),
      srp: Number(r['SRP']),
      lineTotal: Number(r['Line Total'])
    };
  });

  var subtotal = round2_(items.reduce(function (sum, it) { return sum + it.lineTotal; }, 0));
  var tax = round2_(subtotal * TAX_RATE);
  var total = round2_(subtotal + tax);

  return {
    orderId: orderId,
    timestamp: rows[0]['Timestamp'],
    user: rows[0]['User'],
    items: items,
    subtotal: subtotal,
    tax: tax,
    total: total
  };
}

function regenerateReceiptForOrder(orderId) {
  return regenerateReceipt(orderId);
}

