/**
 * Receipt generation: builds the receipt as a Google Doc (structured after
 * the reference receipt template), saves it into the "Receipts" Drive
 * folder under the Receipt ID, and emails it to RECEIPT_EMAIL. The same
 * content is also rendered as HTML for the email body.
 */

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
