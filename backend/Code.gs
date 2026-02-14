function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle Options request (preflight) if necessary, though usually GAS handles simple GET/POST
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const action = e.parameter.action;

  if (action === 'save') {
    return saveScore(e, sheet, headers);
  } else if (action === 'get') {
    return getLeaderboard(sheet, headers);
  } else {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Invalid action'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveScore(e, sheet, headers) {
  try {
    const name = e.parameter.name;
    const score = parseInt(e.parameter.score);
    const duration = parseInt(e.parameter.duration);
    const timestamp = new Date();

    if (!name || isNaN(score)) {
        throw new Error("Missing name or score");
    }

    // Calculate Play Count
    const data = sheet.getDataRange().getValues();
    let playCount = 1;
    // Skip header row if exists
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === name) { // Assuming Name is column B (index 1)
        playCount++;
      }
    }

    // Append Row: Timestamp, Name, Score, Duration, PlayCount
    sheet.appendRow([timestamp, name, score, duration, playCount]);

    const result = { status: 'success', playCount: playCount };
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getLeaderboard(sheet, headers) {
  const data = sheet.getDataRange().getValues();
  // Remove header row
  const rows = data.slice(1);

  // Map to objects: Timestamp(0), Name(1), Score(2), Duration(3), PlayCount(4)
  const formatted = rows.map(r => ({
    name: r[1],
    score: parseInt(r[2]),
    duration: parseInt(r[3]),
    playCount: parseInt(r[4])
  }));

  // Sort: Score DESC, then Duration ASC
  formatted.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.duration - b.duration;
  });

  // Top 10
  const top10 = formatted.slice(0, 10);

  return ContentService.createTextOutput(JSON.stringify(top10))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Score", "Duration", "PlayCount"]);
  }
}
