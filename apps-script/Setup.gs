/**
 * One-time setup: creates the required sheet tabs (with headers), the two
 * Drive folders, and the hourly cache-refresh trigger. Also adds a custom
 * "Order App" menu to the bound Spreadsheet's UI.
 */

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
