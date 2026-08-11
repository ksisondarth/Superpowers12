// ============================================================
// GOOGLE APPS SCRIPT — Portfolio Contact Form Handler
// Deploy this as a Web App, then paste the URL into Contact.tsx
// ============================================================

var SHEET_ID = '1WRa26Ab56FraeIIu8A7EoRysUByGm7jbHTHD4fdzASU';
var SHEET_TAB = 'Contact_Submissions';
var NOTIFY_EMAIL = 'ksison001@gmail.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // --- Save to Google Sheet ---
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_TAB);

    // Create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.email,
      data.subject,
      data.message,
    ]);

    // --- Send email notification ---
    var subject = '📬 New Portfolio Contact: ' + data.subject;
    var body = [
      'You have a new message from your portfolio website.',
      '',
      'Name:    ' + data.name,
      'Email:   ' + data.email,
      'Subject: ' + data.subject,
      '',
      'Message:',
      data.message,
      '',
      '---',
      'Sent via keansison.com contact form',
    ].join('\n');

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: body,
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this function manually in Apps Script editor to verify sheet + email
function testSubmission() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Message',
        message: 'This is a test submission from the Apps Script editor.',
        timestamp: new Date().toISOString(),
      })
    }
  });
}
