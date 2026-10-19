# Final refinement results — 19 October 2026

## Outcome

Refined the existing six-act website and all twelve Vega-Lite views without replacing its design or source statistics. Added analytical state selection, linked geographic context, consistent controls and clearer provider composition labels. No grade outcome is claimed: final assessment remains with the course assessors.

## Chart-by-chart changes

|Chart|Interaction / analytical change|
|---|---|
|01 Indexed lines|Existing year scrubber retained. Act-level text now connects national growth with seven declining state rates, without claiming access adequacy.|
|02 Choropleth|Three regional buttons; click/hover emphasis; state panel gives public rate, national rate, difference, 2015 and 2024 rates, and exact observed change.|
|03 Heatmap|Shared selection from search or cell click; historical comparison panel; other states remain readable.|
|04 Private symbols|Regional buttons and shared selection now affect symbols; panel gives licensed beds, national share and largest-state comparison. State-anchor and overlapping-symbol caveats retained.|
|05 Connected dots|Linked endpoints, exact rate addition and private share; public-only toggle no longer overwrites the real combined rate in tooltips. Sort control retained.|
|06 Bump chart|Shared trajectory selection, public/combined ranks and direction of movement. Pulau Pinang remains 15th→4th, up 11 places. A bridge explicitly connects Charts 05/06 as two definitions within 2024.|
|07 Occupancy|Dot selection gives state rate, published 72.61% reference and signed percentage-point difference. Annual/MOH-only qualification retained.|
|08 Admissions|Count/share switch retained; provider colours now match the treemap. Bars support precise counts and ranking.|
|09 Age bars|National-only data and original comparison retained; state selection does not filter this chart.|
|10 Cartogram|Original outlines remain behind capacity shapes by default; outline toggle, regional buttons, fixed mode coordinate frame, coral linked hover/selection and exact capacity/share/rate panel.|
|11 Pyramid|Observed-year switch retained; national-only data does not respond to state selection.|
|12 Treemap|Centred category/percentage groups; larger bold percentages, percent signs, fit-aware small-label omission and shared provider colours. Area still encodes reported admission composition. Full details remain in tooltips/key.|

One searchable native datalist replaces repeated state dropdowns. Reset clears persistent selection and returns regional controls to All Malaysia. Search and native buttons support keyboard operation; focus indicators remain visible. A single chart click updates all seven state views; hover is temporary and does not replace persistent selection.

## Geometry and numerical validation

`python scripts/prepare_storybook.py` with Shapely 2.2.0:

- All 16 geographic units present; combined beds sum to **71,968**.
- Uniform linear scale = square root of target-area/original-area. No state-specific minimum size or arbitrary size adjustments.
- Capacity polygons have **zero overlapping pairs**.
- Maximum relative area error: **8.271161533457416e-14**.
- Gap reduced from 0.00045 to 0.00012 projected units; smaller collision steps and constrained centroid attraction minimise unnecessary separation.
- Final attraction step reduces total centroid displacement from 0.0566886494 to 0.0546407078 projected units (about 3.61%); accepted moves maintain the gap.
- Broad north/south ordering preserved for pairs whose original projected centroid latitude differs by more than 0.025. Sabah remains northeast of Sarawak. This is an explicit broad-order check, not a claim that every close neighbouring pair retains its exact order.
- Both geometry arrays share the same screen transformation; an invisible fit layer keeps the mode/outline-toggle projection stable. Regional views refit both arrays together. Area comparisons are valid within a view.
- Admissions remain **4,270,356** in four mutually exclusive groups; all treemap rectangle areas reconcile to their original shares.
- Validated source geometry, capacity and admissions input hashes are unchanged. Original research preservation check also passes (42 files).

Detailed machine results: `data-validation.json` and `input-preservation.json`.

## QA and build

`npm run build` passes TypeScript and Vite. `npx playwright test --project=desktop --project=laptop --project=large-tablet --project=tablet --project=mobile`: **20 passed**.

|Width|Result|
|---|---|
|1440 desktop|All four tests pass; split layouts retained.|
|1280 laptop|All four tests pass; controls and plots fit.|
|1024 tablet|All four tests pass; stacked panels avoid narrow plots.|
|768 tablet|All four tests pass; shared search and regional controls fit.|
|390 mobile|All four tests pass; no horizontal overflow; readable two-column insights.|

Tests verify all twelve rendered charts, exact plotted values, source-derived insights, direct selections from maps/symbols/dots/lines/cells, persistent selection, reset, regional counts, linked original/capacity highlighting, outline toggle, year/rank/metric controls, tooltip values and downloads. No browser runtime or Vega-Lite warnings remain in the passing suite. Actual screenshots were inspected for the controls, analytical panels, private comparison section, original-outline cartogram and centred treemap labels. Evidence is in ignored `test-results/`.

Production retains the existing GitHub Pages base. No deployment was performed.

## Files changed

- `src/components/StateInsights.tsx`: shared state context, searchable state control, reset, regional segmented control, analytical panels.
- `src/components/StoryCharts.tsx`, `AdvancedCharts.tsx`: chart-level integration and removal of redundant selectors.
- `src/charts/specs.ts`, `advanced.ts`: hover/selection encodings, stable cartogram layers, treemap label placement and provider palette.
- `src/components/VegaChart.tsx`: transient hover signal, click bridge and staged render replacement that keeps the prior chart visible while the new view prepares.
- `src/App.tsx`: shared state search and narrative bridge.
- `src/styles/index.css`: reusable control height/spacing, select arrow placement, insights, map keys and mobile layouts.
- `scripts/prepare_storybook.py`, `data/processed/capacity_cartogram.json`, `capacity_geography.json`: constrained cartogram placement and validation.
- `playwright.config.ts`, `tests/refinement.spec.ts`, `latest.spec.ts`, `story.spec.ts`: requested viewport coverage and regression checks.
- `reports/task08/`, `README.md`: plan, geometry report and handoff.

## Remaining limitations

- Geometry does not interpolate vertex-by-vertex between modes. A stable common projection and brief view fade are used; the previous chart stays visible until its replacement is ready. Reduced-motion preferences disable the fade. This deliberately avoids unreliable morphing and altered area encodings.
- Overlapping private symbols around Kuala Lumpur/Selangor can intercept each other's clicks. The shared searchable selection is the precise alternative; counts, anchors and symbol areas have not been distorted to avoid overlap.
- Tiny territories remain tiny to preserve area proportionality. Search and linked outlines make them discoverable.
- Native datalist suggestion appearance varies by browser. Exact full state names select reliably; there is no custom fuzzy-match interface.
- Chromium responsive QA passed; no separate Safari/Firefox or screen-reader audit was performed.
- Source reuse conditions and undocumented geographic vintage remain unresolved for public release. Annual observations are not live availability or access measures.
- Vite still reports a large main bundle. No additional package or deployment changes were introduced.
- The previously exported PDF is a snapshot of the prior version; it has not been regenerated as part of this website-only refinement.
