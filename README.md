# AXON 3D Intelligence — merged project

## Structure
- `index.html` — Main gallery/hub page (Home, About, Models, Process, Journey, Contact).
  The "Neural Network" card links internally to `nn-model/index.html`.
- `nn-model/` — The interactive Unity visualizer page.
  - `index.html` — redesigned: short intro/heading first, then the Unity frame,
    then architecture/training/interaction details below. Footer now includes
    Privacy/Terms/Disclaimer.
  - `Build/` — put your existing Unity WebGL build files here (not included —
    see the .txt note inside).
  - `StreamingAssets/` — put your Unity streaming assets here if used.
  - `TemplateData/` — Unity's default template assets (logos, progress bars,
    favicon) — copied as-is from what you provided.
- `learn/` — your 7 existing learning-guide articles, unchanged, plus the
  guides landing page (`learn/index.html`).
- `pages/` — about, contact, privacy, terms, disclaimer —
  your existing content, unchanged, just wired into the new nav structure.
- `assets/css/site.css`, `assets/js/site.js` — your existing shared site
  styling/scripts, unchanged.
- `robots.txt`, `sitemap.xml`, `server.py`, `start_server.bat` — unchanged.

## Navigation
- Main page → click the Neural Network card → `nn-model/index.html` (same tab,
  smooth fade transition).
- `nn-model/index.html` → "← Gallery" link in the top nav (and the footer)
  → back to the main page, same smooth fade transition.
- Every page's footer now links to Learn, About, Contact,
  Privacy, Terms and Disclaimer.

## Before deploying
1. Copy your real Unity `Build` folder contents into `nn-model/Build/`.
2. If you use `StreamingAssets`, copy those into `nn-model/StreamingAssets/`.
3. Open `index.html` locally (or run `start_server.bat` / `python server.py`)
   to test the full click-through: main page → NN model → back to main page.
4. Deploy the whole folder as-is (Netlify, Vercel, GitHub Pages, etc.) —
   `index.html` at the root is the entry point.
