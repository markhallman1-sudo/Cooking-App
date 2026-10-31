# Pantry & Plenty — phone and laptop sync

Your Apps Script deployment is here:

[Open the shared kitchen](https://script.google.com/macros/s/AKfycbx8NQy4qg03ekyRCRXE9QY7WobjizMSts9UmlMMF3AxaDuWSm_tXRJmI7MyQcReuYtn/exec)

The app uses Apps Script's built-in account access and `google.script.run`; **there is no shared secret to create or enter**. Keep the web app restricted to **Only myself** and use the same Google account on your phone and laptop.

## Fix the current deployment

I checked the URL above. It currently returns **“No HTML file named Index was found.”** The script's `doGet()` is looking for an HTML file named exactly `Index`.

1. Open the Apps Script project that owns the deployment URL above.
2. In the project editor, click **+ → HTML**, name the file exactly `Index`, then paste in [AppsScript/Index.html](AppsScript/Index.html).
3. Confirm `Code.gs` matches [AppsScript/Code.gs](AppsScript/Code.gs), then save.
4. Choose **Deploy → Manage deployments**, click the edit pencil for the existing web app, choose **New version**, and click **Deploy**. Keep **Execute as: Me** and **Who has access: Only myself**.
5. Open the same `/exec` URL on your phone and laptop. Sign in to the same Google account on each.

The existing deployment URL should keep working after you publish the new version. If the app then reports that setup has not been run, select `setupPantryPlenty` in the Apps Script editor and run it once; this creates the private **Pantry & Plenty — Shared Kitchen** spreadsheet in your Drive.

## How sync works

The Apps Script version stores the pantry, weekly plan, checklists, and baking notes in that private spreadsheet. It refreshes from the other device periodically and when you return to the tab, while keeping a local cache for brief offline use.

The ChatGPT Site and GitHub Pages copy remain device-local. Use the Apps Script `/exec` link above on both devices for the shared kitchen. Existing changes saved by the older copies do not transfer automatically.
