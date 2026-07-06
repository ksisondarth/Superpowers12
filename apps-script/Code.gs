/**
 * Order Management App — MVP
 * Core constants, web app entry point, and shared low-level helpers.
 *
 * This is a container-bound Apps Script project: bind it to the Google
 * Sheet that will act as the database (Extensions > Apps Script from the
 * Sheet). Run "Order App > Run Setup" from the Sheet's custom menu once
 * before first use (see Setup.gs).
 */

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
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Order Management')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Used by <?!= include('File') ?> templating in Index.html. */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
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
