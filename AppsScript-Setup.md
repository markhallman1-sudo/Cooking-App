# Pantry & Plenty — phone and laptop sync

Your Apps Script deployment:

[Open the shared kitchen](https://script.google.com/macros/s/AKfycbx8NQy4qg03ekyRCRXE9QY7WobjizMSts9UmlMMF3AxaDuWSm_tXRJmI7MyQcReuYtn/exec)

The app HTML is served from [GitHub Pages](https://markhallman1-sudo.github.io/Cooking-App/), then Apps Script runs it through HtmlService so its `google.script.run` calls can save data to your private Google Sheet. **No shared secret is needed.** Keep the web app restricted to **Only myself** and use the same Google account on your phone and laptop.

## Fix and activate the deployment

The current deployment previously showed **“No HTML file named Index was found.”** The updated `Code.gs` no longer requires an Apps Script HTML file; it fetches the app page from GitHub Pages.

1. Open the Apps Script project that owns your deployment URL.
2. Replace `Code.gs` with [AppsScript/Code.gs](AppsScript/Code.gs), then save.
3. In the function selector, choose `setupPantryPlenty` and click **Run** once. Approve the Google permissions. This checks the GitHub Pages source and creates the private **Pantry & Plenty — Shared Kitchen** spreadsheet in your Drive. If you already ran it, it reuses that spreadsheet.
4. Choose **Deploy → Manage deployments**, click the edit pencil for the existing web app, choose **New version**, then **Deploy**. Keep **Execute as: Me** and **Who has access: Only myself**.
5. Open the same `/exec` URL on your phone and laptop. Sign in to the same Google account on each.

You do not need to add an `Index.html` file to the Apps Script project. The deployment fetches the current HTML from the public GitHub Pages address on each load. After future HTML edits are published to GitHub Pages, the Apps Script deployment does not need another version unless `Code.gs` changes.

## How sync works

The Apps Script version stores the pantry, weekly plan, checklists, and baking notes in a private spreadsheet in your Drive. It refreshes from the other device periodically and when you return to the tab, while keeping a local cache for brief offline use.

The ChatGPT Site and direct GitHub Pages copy remain device-local. Use the Apps Script `/exec` link above on both devices for the shared kitchen. Existing changes saved by the older copies do not transfer automatically.
