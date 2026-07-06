/**
 * Sales View support: list past orders (grouped by Order ID) and fetch a
 * single order's detail for the receipt/regeneration flow.
 */

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
