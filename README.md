# ⚙️ ToolHub

12 free, private, client-side web tools. No sign-up, nothing uploaded — everything runs in the browser.

**Live:** https://buildscript-dev.github.io/toolhub/

## Tools
Word counter · Password generator · QR code generator · JSON formatter · Base64 · URL encoder · Hash (SHA) · Case converter · Color converter · Unit converter · Lorem ipsum · Image compressor.

## Stack
React + Vite + Tailwind (SPA) · Express (for Railway/Node hosting) · AdSense-ready ad slots.

## Develop
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & run (Node / Railway)
```bash
npm run build      # → dist/
npm start          # Express serves dist on $PORT
```

## Deploy to GitHub Pages
```bash
VITE_BASE=/toolhub/ npm run build
# push dist/ to gh-pages branch
```

## Deploy to Railway (when a plan slot is free)
```bash
railway init --name toolhub
railway up
railway domain
```

## Enable ads
Set env var `VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX` (from Google AdSense),
replace placeholder slot IDs in `src/components/AdSlot.jsx` / `Layout.jsx` / `ToolShell.jsx`,
and update the script in `index.html`. Rebuild & redeploy.

See `REPORT.md` for the full status and monetization steps.
