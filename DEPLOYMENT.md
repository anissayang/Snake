# Google Apps Script Deployment Guide

To connect your Snake Game to Google Sheets, follow these steps:

## 1. Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2. Rename the sheet to "Snake Leaderboard" (or similar).
3. In the first row, add these headers: `Timestamp`, `Name`, `Score`, `Duration`, `PlayCount`.

## 2. Add the Script
1. Click **Extensions** > **Apps Script**.
2. Clear the default code and paste the content of `backend/Code.gs` (provided in your project).
3. Save the project (Cmd/Ctrl + S).

## 3. Deploy as Web App
1. Click the blue **Deploy** button > **New deployment**.
2. Select type: **Web app**.
3. **Description**: "Snake Game API".
4. **Execute as**: "Me" (your email).
5. **Who has access**: **"Anyone"** (Critical for the game to work without login).
6. Click **Deploy**.
7. Grant permissions if prompted (Click "Review permissions" > Choose account > Advanced > Go to (Project Name) (unsafe) > Allow).

## 4. Connect to Frontend
1. Copy the **Web App URL** provided (starts with `https://script.google.com/macros/s/...`).
2. Open your local project file `src/services/api.js`.
3. Paste the URL into the `API_URL` constant:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```

## CORS Details
Google Apps Script handles CORS by redirecting the request. The `fetch` API in the browser automatically follows these redirects. We use `URLSearchParams` to send data as a standard form POST, which is generally reliable with GAS.
