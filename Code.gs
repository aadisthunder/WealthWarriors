const SHEET_NAME = "Contacts";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.topic,
    data.message
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success", message: "Data saved successfully" })
  ).setMimeType(ContentService.MimeType.JSON);
} 
