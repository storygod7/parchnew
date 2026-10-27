# Parché Christmas 2026

Static HTML, CSS and JavaScript site. The main page is `index.html`; event details are in `events.html`. No build step is required.

## Local preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ .

## v4 update

- Sticky mobile header, header-aware profile navigation, modal/menu fades, and keyboard-accessible focus treatment.
- Footer logo and social links have individual hit areas. External links open in a new tab; internal Back stays in the current tab.
- Corrected desktop background/snow, Goods illustration proportions, and post-opening scroll position.
- Copyright 2026; floating TOP removed while footer TOP remains.
- Product details load once on first demand from `modal-data.js`; lower-page images use lazy loading.
- WOFF2 subsets retain all supported characters used by the current pages and 53 product details. Original TTF files remain preserved. Font license: `assets/OFL.txt`. If text changes, regenerate the subsets or restore full font coverage. The original font does not contain 凮; system fallback remains in use for that character.

Chrome verification covered all 53 product modals, four profile targets, menu, accordions, link mappings and responsive widths 320–1440px. Actual iPhone/Safari/Firefox and all external destination pages were not tested. Pending source content remains unchanged.
