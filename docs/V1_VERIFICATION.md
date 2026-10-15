# V1 verification and handoff

Verified 15 October 2026. V1 implemented; no V2 work or public deployment started.

## Completed

All seven requested charts render from real processed data: indexed lines, state choropleth, 160-cell heatmap, all-16-state connected dots, ranked annual MOH occupancy, four-provider admissions, and national 65+ comparison. No chart is incomplete or a placeholder.

The six chapters and approved `design_reference/` composition are retained: navy hero, Fraunces/DM Sans typography, cream chart cards, terracotta-accented private reveal, statistical callouts, navy conclusion and methodology footer. Fonts are bundled locally. Figma's incorrect statements about missing annual observations and absent state tables were replaced with actual coverage/definitions.

## Checks and results

| Check | Result |
|---|---|
| `npm run build` | PASS: TypeScript + production Vite build |
| `npm run typecheck` | PASS: no TypeScript errors |
| Data preparation | PASS: 195 assertions; all 11 original and 26 acquired raw hashes preserved |
| Chart completeness | 20 indexed observations, 16 state shapes, 160 heatmap cells, 32 connected endpoints, 16 occupancy dots, 4 bars, 2 ageing bars |
| Production desktop browser | PASS: Chromium, 1440 × 1000 |
| Production mobile viewport | PASS: Chromium, 390 × 844 |
| Production narrow viewport | PASS: Chromium, 320 × 740 |
| Browser runtime | No page errors, console warnings/errors or failed HTTP responses in final checks |
| Interaction | Tooltips, shared state selection, 3 connected-dot orderings, map regional views, small-territory readout and CSV download verified |
| Accessibility alternatives | Keyboard skip link tested; labelled native selectors; accessible SVG labels; expandable HTML tables and CSV links |
| Overflow | No page-level horizontal overflow; every chart SVG fits its chart container at all 3 widths |
| Exact representative values | Pulau Pinang 11.82→27.64 and #15→#4; Labuan 12.10; admission counts2,579,373 and1,359,910 checked in rendered UI |
| Geometry | All16 valid; Sarawak repair changes planar area by0.000000628446%, preserves bounds and4parts; small source overlaps logged |

`npm test` runs three production-page tests (one per viewport); final result **3 passed**. Screenshots and machine-readable results are in `test-results/` (generated, not committed). Desktop hero/map/reveal and mobile hero/indexed/heatmap/reveal/occupancy/admissions/ageing screenshots were visually inspected. Fixes included explicit sorting to remove Vega domain warnings, shorter mobile provider labels, the correct locally hosted Fraunces family, and extra mobile hero space for the scroll cue.

The automated browser tests cover Chromium viewport behaviour, not a physical mobile-device certification or full screen-reader audit. SVG legends/source notes are available without hovering; exact table values remain accessible when marks are small.

## Reproducibility and source scope

[DATA_VALIDATION.md](DATA_VALIDATION.md) summarises filters and reconciliations; [data-validation.json](data-validation.json) retains all assertions, input/output SHA-256 hashes, planar geometry/overlap diagnostics and rounding differences. `scripts/prepare_data.py` re-reads source CSVs and selected original PDF pages; it does not trust Figma values or require the earlier extracted CSVs.

Public capacity includes MOH hospitals, special medical institutions and other government hospitals. Private capacity includes licensed hospitals only. Occupancy includes MOH hospitals/special institutions only; no daily dashboard metrics enter the page. Admissions retain97.94%MOH submission and82.33%private response caveats, with broader private facility definitions. Year-end beds use same-year mid-year residents; age65+uses five source bins. No imputation or interpolation was performed.

## Remaining release items and V2 backlog

1. Confirm the author's name and final public publication date. The footer explicitly says the author is unconfirmed and identifies15October2026as the local draft date; no student identity was invented.
2. Resolve source reuse conditions and boundary effective vintage before public release. Full source PDFs are not bundled or redistributed; all source links point to publishers.
3. Consider clearer federal-territory inset maps and alternative views of the Putrajaya outlier, while retaining all16states and an honest scale. Current state selectors/table alternatives expose every value.
4. Consider splitting/lazy-loading the Vega runtime. The build succeeds with a large-bundle advisory (approximately1.13MB JavaScript,378kB gzip); this is a performance improvement, not a rendering blocker.
5. Test physical touch devices, additional browsers and screen readers; refine chart annotations after review. Do not add idioms or views solely to satisfy a numerical target.

No current-pressure, shortage, affordability or access conclusions are warranted by these measures. V2 remains a backlog only.
