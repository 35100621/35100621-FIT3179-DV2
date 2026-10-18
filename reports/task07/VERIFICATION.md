# Verification — 19 October 2026

- `npm run build`: passes TypeScript and Vite production compilation. Existing GitHub Pages base retained. Vite warns that the main bundle exceeds 500 kB.
- `npx playwright test`: **12 passed**, Chromium at 1440×1000, 768×1024, 390×844 and 320×740.
- All 12 charts become ready without browser console/runtime errors. Twelve specs/components use Vega-Lite; raw-Vega advanced views have been replaced.
- Rendered marks: 20 indexed points, 160 heatmap cells, 16 choropleth features, 16 private symbols, 32 connected endpoints, 16 bump lines, 16 occupancy dots, four admission bars, two age bars, 36 pyramid bars per selected year, 16 cartogram shapes and four treemap rectangles.
- Tests check Pulau Pinang's rendered 11.82→27.64 rates and #15→#4 ranks, Labuan's 12.10 public rate, provider counts, CSV downloads, tooltips, coordinated selectors, year scrubber, capacity toggle, rank reveal, admissions metric, pyramid year, cartogram mode and chapter navigation.
- No document horizontal overflow at any tested width; chart SVGs fit their cards.
- Actual screenshots inspected for geography, private-sector comparisons, demographic/pyramid/cartogram layout and mobile activity/treemap. Small treemap category labels are omitted when they cannot fit; the adjacent key retains all names, counts and shares. Screenshot evidence is in ignored `test-results/`.
- Latest ZIP source was used for page layout, typography, section colours and placement. No separately supplied Figma screenshots exist. Real 16-state plots are taller than the illustrative 12-state reference, and mobile panels stack for readability.
- `scripts/prepare_storybook.py`: all 16 cartogram areas proportional to combined beds, zero polygon overlaps, total 71,968 beds; all four treemap rectangle areas proportional to admissions, total 4,270,356. Source SHA-256 values retained in `data-validation.json`.
- 42 original/acquired research inputs and Task 02 derived files match historical hashes: `input-preservation.json`.

No fabricated observations or fictional projections were retained. Raw publications were not published. Unresolved release rights, large bundle, external assets, and re-embed rather than tweened chart transitions are documented in IMPLEMENTATION.md.
