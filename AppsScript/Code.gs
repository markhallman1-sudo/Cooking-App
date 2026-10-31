const APP_TITLE = "Pantry & Plenty";
const DATA_TAB = "Kitchen";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle(APP_TITLE)
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function setupPantryPlenty() {
  const props = PropertiesService.getScriptProperties();
  let spreadsheetId = props.getProperty("PANTRY_PLENTY_SPREADSHEET_ID");
  let spreadsheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create("Pantry & Plenty — Shared Kitchen");
    spreadsheetId = spreadsheet.getId();
    props.setProperty("PANTRY_PLENTY_SPREADSHEET_ID", spreadsheetId);
  }

  let sheet = spreadsheet.getSheetByName(DATA_TAB);
  if (!sheet) sheet = spreadsheet.insertSheet(DATA_TAB);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 2).setValues([["State JSON", "Updated at"]]);
    sheet.setFrozenRows(1);
  }

  Logger.log("Pantry & Plenty sync is ready: " + spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function loadPantryState() {
  const sheet = getStateSheet_();
  const values = sheet.getRange(2, 1, 1, 2).getValues()[0];
  const json = values[0];
  return {
    state: json ? JSON.parse(String(json)) : null,
    updatedAt: values[1] ? String(values[1]) : null
  };
}

function savePantryState(state) {
  if (!state || typeof state !== "object" ||
      !Array.isArray(state.pantry) || !Array.isArray(state.week) ||
      !state.checks || typeof state.checks !== "object") {
    throw new Error("The kitchen data did not have the expected format.");
  }

  const json = JSON.stringify(state);
  if (json.length > 45000) throw new Error("The saved kitchen data is too large.");

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = getStateSheet_();
    const updatedAt = new Date().toISOString();
    sheet.getRange(2, 1, 1, 2).setValues([[json, updatedAt]]);
    return { ok: true, updatedAt: updatedAt };
  } finally {
    lock.releaseLock();
  }
}

function getStateSheet_() {
  const id = PropertiesService.getScriptProperties()
    .getProperty("PANTRY_PLENTY_SPREADSHEET_ID");
  if (!id) throw new Error("Run setupPantryPlenty once from the Apps Script editor first.");

  const sheet = SpreadsheetApp.openById(id).getSheetByName(DATA_TAB);
  if (!sheet) throw new Error("The Kitchen tab is missing. Run setupPantryPlenty again.");
  return sheet;
}