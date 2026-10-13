# Harvestly Complete Agriculture Pack

## Included features
- Existing data.gov.in mandi-price API integration and market-prices page.
- Existing Open-Meteo weather widget.
- Searchable crop guide at `/crops`, with crop records in `mern_project/src/data/crops.json`.
- Searchable fertilizer reference guide at `/fertilizers`, with fertilizer records in `mern_project/src/data/fertilizers.json`.
- Official reference links for ICAR, Meghdoot/IMD, Soil Health Card, and data.gov.in.
- Existing Farmer, Buyer, and FPO workspaces.

## Data notes
Crop and fertilizer records are local reference data. They are not live district-specific advisories, live fertilizer inventory, or live fertilizer retail prices. Verify crop-specific practices and nutrient rates with local KVK/state agriculture recommendations and soil-test results.

Mandi prices remain API-backed through the existing backend. Keep `server/.env` private; this archive excludes `.env` files.

## Run frontend
```powershell
cd mern_project
npm.cmd install
npm.cmd start
```

## Run backend in a second terminal
```powershell
cd server
npm.cmd install
npm.cmd start
```

If you already have a working `server/.env`, copy it privately into this extracted project's `server` folder. Do not commit it to GitHub.

## Pages
- `/` Home
- `/farmer` Farmer workspace
- `/buyer` Buyer workspace
- `/fpo` FPO workspace
- `/market-prices` Mandi prices
- `/crops` Crop guide
- `/fertilizers` Fertilizer guide

## Static marketplace and auction pages
- `/fertilizer-marketplace`: sample fertilizer seller listings and a form to add a demo listing. No real purchases, live stock, payment, or shared persistence.
- `/crop-auction`: sample farmer crop lots, buyer bids, current highest-bid leader, and a form to list a demo crop lot. Bids exist only in page memory and disappear on refresh. No real sale is awarded.
- These pages are demonstration-only. Future dynamic scope includes login/roles, database storage, verified seller/farmer identities, inventory updates, bid deadlines and audit logs, order/payment handling, and dispute processes.
