/**
 * Google Apps Script — webhook for BESTAUTO lead form.
 *
 * Setup:
 * 1. Create Google Sheet "BESTAUTO Leads"
 * 2. Add headers in row 1: Дата | Студия | Услуга | Телефон | Авто | Язык | Страница | Статус WA
 * 3. Open Extensions > Apps Script
 * 4. Paste this code
 * 5. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the URL and save as GOOGLE_SHEETS_WEBHOOK_URL in Cloudflare Pages
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.studio || '',
      data.service || '',
      data.phone || '',
      data.car || '',
      data.lang || '',
      data.page || '',
      data.wa_status || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
