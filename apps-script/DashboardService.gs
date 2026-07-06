/**
 * Dashboard aggregations. There is no cost-of-goods field in the MVP data
 * model, so "profit" is treated as realized revenue (sum of Line Total,
 * i.e. what was actually charged at SRP). "Earnings by RSP" is the
 * hypothetical revenue had every sale been made at the item's *current*
 * RSP (regular price) instead — useful to see how much is being given up
 * via specials/discounts. This is documented in the README.
 */

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
