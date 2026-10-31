# Enable phone–laptop sync for Pantry & Plenty

The GitHub Pages copy and the original published Site save data only in the browser where they are opened. This Apps Script version keeps one shared copy in a private Google Sheet in your Drive, so your phone and laptop can use the same pantry, weekly plan, checklists, and baking notes.

## Create the synced version

1. Open [Google Apps Script](https://script.google.com/) while signed in to the Google account you use on both devices, then choose **New project**.
2. Replace the contents of `Code.gs` with [AppsScript/Code.gs](AppsScript/Code.gs).
3. Click **+** next to Files, choose **HTML**, name it exactly `Index`, and paste in [AppsScript/Index.html](AppsScript/Index.html).
4. In the function selector, choose `setupPantryPlenty` and click **Run**. Review the Google permissions. This creates a private spreadsheet called **Pantry & Plenty — Shared Kitchen** in your Drive. Run this once.
5. Choose **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Only myself
6. Deploy, authorize if prompted, and copy the web app URL ending in `/exec`.
7. Open that same URL on your laptop and phone. Sign in to the same Google account on each. The first device copies its existing local pantry and plan into the shared kitchen; the other device loads that shared copy.

The app keeps a local cache too, so it remains usable if you briefly lose connection and will sync again when the Apps Script app is open online. It checks for changes from the other device periodically and when you return to the tab.

## Important

Use the Apps Script `/exec` link on both devices for shared data. The existing ChatGPT Site and GitHub Pages copy remain device-local. The app source repository is public, but your pantry data and spreadsheet stay in your Google account. Keep the web app restricted to **Only myself**; broader access would let other visitors use the same shared kitchen.

To update the app later, copy the new `AppsScript/Index.html` and `AppsScript/Code.gs` files into your Apps Script project, save, then use **Deploy → Manage deployments → Edit → New version**.
