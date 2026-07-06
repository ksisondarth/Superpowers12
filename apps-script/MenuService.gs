/**
 * Menu & inventory: cached reads, add/edit items, stock add/change (with
 * Changelog logging), and the staff dropdown list.
 */

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
