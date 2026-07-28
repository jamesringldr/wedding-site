/**
 * Paste this into Extensions → Apps Script on your RSVP Google Sheet.
 * Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Then copy the Web app URL into NEXT_PUBLIC_RSVP_WEB_APP_URL.
 *
 * Sheet tab name: RSVPs
 * Header row (A1:K1):
 * Timestamp | Status | Full Name | Party Name | Email | Phone | Guests | Boat Day | Welcome Party | Ceremony | Room Reserved
 */

const SHEET_NAME = "RSVPs";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return json_({ ok: false, error: 'Missing sheet tab named "RSVPs"' });
    }

    const guests = Array.isArray(data.guests)
      ? data.guests.filter(Boolean).join(", ")
      : "";

    sheet.appendRow([
      new Date(),
      data.status || "",
      data.fullName || "",
      data.partyName || "",
      data.email || "",
      data.phone || "",
      guests,
      boolLabel_(data.boatDay),
      boolLabel_(data.welcomeParty),
      boolLabel_(data.ceremony),
      data.roomReserved || "",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, message: "RSVP endpoint is live" });
}

function boolLabel_(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "";
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
