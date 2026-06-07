/**
 * Aura & Gear — Order logger (Google Apps Script Web App)
 *
 * Receives a JSON order POSTed from the site's /api/order route and appends
 * a row to the bound spreadsheet. Headers are created automatically on the
 * first order.
 *
 * SETUP
 * 1. Create a Google Sheet (this script is bound to it via Extensions > Apps Script).
 * 2. Paste this whole file into the script editor and Save.
 * 3. Deploy > New deployment > type "Web app":
 *      - Execute as:      Me
 *      - Who has access:  Anyone
 *    Deploy, authorize, and copy the Web app URL (ends with /exec).
 * 4. Put that URL in your site env as ORDER_WEBHOOK_URL.
 */

const SHEET_NAME = "Orders";

const HEADERS = [
  "Timestamp",
  "Order No",
  "Name",
  "Email",
  "Phone",
  "Address",
  "City",
  "Zone",
  "Payment",
  "Items",
  "Subtotal",
  "Shipping",
  "Total",
  "Notes",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two orders writing at once
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const d = JSON.parse(e.postData.contents);

    sheet.appendRow([
      d.placedAt ? new Date(d.placedAt) : new Date(),
      d.orderNo || "",
      d.name || "",
      d.email || "",
      d.phone || "",
      d.address || "",
      d.city || "",
      d.zone || "",
      d.payment || "",
      d.items || "",
      d.subtotal || "",
      d.shipping || "",
      d.total || "",
      d.notes || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Optional: lets you open the /exec URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput("Aura & Gear order endpoint is live.");
}
