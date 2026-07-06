/**
 * Order confirmation: validates stock, logs Sales + Changelog rows,
 * decrements inventory, and triggers receipt generation/email.
 */

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
