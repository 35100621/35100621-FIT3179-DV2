# Malaysia’s Hospital Divide

An interactive story about Malaysia’s hospital capacity, activity and population, using observed MOH and DOSM data through 2024. Built with React, TypeScript, Vite, Vega-Lite and Vega-Embed. All 12 charts render as SVG.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/35100621-FIT3179-DV2/.

```sh
npm run typecheck
npm run build
npm run preview
```

The production build is written to `dist/`. The GitHub Pages workflow in `.github/workflows/deploy.yml` builds and deploys pushes to `main`. The deployment base path is configured in `vite.config.ts`.

## Repository layout

```text
src/
  App.tsx                Six-act narrative and shared selection
  charts/                Vega-Lite specification functions
  components/            Chart embedding, controls and state insights
  styles/                Website styles and transitions
  data.ts                Processed-data imports and source links
data/
  processed/             Current chart-ready JSON and CSV
  geographic/validated/  Validated state boundaries
  geographic/original/   Original boundaries (local, ignored)
  original/              Original source datasets (local, ignored)
  additional/            Source manifest, acquisitions and provenance
public/data/             Downloadable CSV and browser-loaded GeoJSON
scripts/                 Reproducible chart-data processing
tests/                   Data, chart, interaction and responsive tests
docs/                    Data methods and validation records
.github/workflows/       GitHub Pages deployment
```

Processed JSON is imported and bundled by Vite. `public/data/` contains the CSV downloads and GeoJSON fetched at runtime; those copies are intentional. Raw publications and source datasets are not deployed. Committed processed data is sufficient to build the website.

## Charts

1. Indexed public beds and population, 2015–2024.
2. Public-bed-rate choropleth, 2024.
3. State-year public-bed-rate heatmap, 2015–2024.
4. Private-bed proportional-symbol map.
5. Public versus combined capacity connected dots.
6. Public versus combined capacity rank comparison.
7. Annual MOH occupancy ranked dots.
8. Reported admissions by provider, count/share bars.
9. Population aged 65+, 2015 and 2024.
10. Combined-capacity cartogram with geographic outlines.
11. Population pyramid with year selection.
12. Reported-admissions treemap.

The page groups the treemap with admissions, and the pyramid and cartogram in the final act. Shared state selection links seven views. Region controls, capacity/rank toggles and year switches are React controls; Vega-Lite defines the chart marks, encodings and tooltips.

## Reproduce data

Use Python 3.13 for the pinned processing dependencies. Restore source files at the paths recorded in `data/additional/source_manifest.csv` and `data/additional/validation/original_hashes.json`. Exact source hashes are checked; a fresh clone needs those local source files only to regenerate data.

```sh
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
npm run prepare:data
```

This runs, in order:

- `prepare_data.py`: core datasets, source checks, PDF extraction, geographic joins and downloadable copies.
- `prepare_private_locations.py`: state-level private-bed symbol anchors.
- `prepare_population.py`: age/sex population-pyramid data.
- `prepare_layouts.py`: capacity cartogram and admissions treemap geometry.

Validation output is written to `docs/validation/`. Original datasets are never overwritten. See [data methods](docs/DATA.md) and [core validation](docs/validation/core.md).

## Test

```sh
npx playwright install chromium
npm run build
npm test
```

Playwright starts the production preview and checks all 12 charts, quantities, selection, controls, tooltips, downloads and responsive layouts across six viewport sizes. Generated screenshots and reports go to ignored `test-results/`.

## Interpretation

Beds describe reported capacity, not affordability, staffing or access. Combined capacity adds public hospital/special-institution beds and licensed private hospital beds. Occupancy is annual and MOH-only. Admissions are episodes with incomplete reporting and broader private-provider coverage. Age structure provides context, not a demand forecast. Detailed source notes accompany the charts.

## Code formatting

Application code, styles, tests and configuration use Prettier with two-space indentation and an 80-character target line width.

```sh
npm run format
npm run format:check
```

Python processing scripts use Black:

```sh
python -m pip install black==26.10.1
python -m black scripts
```

Generated datasets and validation records are excluded from source-code formatting.

## Chart function names

React components use PascalCase. Matching Vega-Lite specification functions use camelCase with a `Spec` suffix.

| Visualisation | React component | Vega-Lite specification |
|---|---|---|
| Indexed line chart | `IndexedLineChart` | `indexedLineChartSpec` |
| Choropleth map | `ChoroplethMap` | `choroplethMapSpec` |
| Heatmap | `Heatmap` | `heatmapSpec` |
| Proportional-symbol map | `ProportionalSymbolMap` | `proportionalSymbolMapSpec` |
| Connected-dot chart | `ConnectedDotChart` | `connectedDotChartSpec` |
| Rank slope chart | `RankSlopeChart` | `rankSlopeChartSpec` |
| Ranked dot plot | `RankedDotPlot` | `rankedDotPlotSpec` |
| Admissions horizontal bar chart | `AdmissionsBarChart` | `admissionsBarChartSpec` |
| Ageing horizontal bar chart | `AgeingBarChart` | `ageingBarChartSpec` |
| Non-contiguous cartogram | `NonContiguousCartogram` | `nonContiguousCartogramSpec` |
| Population pyramid | `PopulationPyramid` | `populationPyramidSpec` |
| Admissions treemap | `AdmissionsTreemap` | `admissionsTreemapSpec` |

Components are in `src/components/StoryCharts.tsx` and `AdvancedCharts.tsx`; specifications are in `src/charts/specs.ts` and `advanced.ts`. The two bar charts retain subject prefixes to distinguish them.

## Human-readable Vega-Lite JSON specifications

Every chart has a committed, formatted JSON description in [public/specs](public/specs). These are generated from the **same TypeScript functions used by React**, not independently maintained chart definitions. Use GitHub’s file viewer or **Raw / Download** for the larger map files; after deployment, the same files are served under the website's `specs/` directory.

```sh
npm run export:specs        # Regenerate and validate all 12 files
npm run export:specs:check  # Validate and fail if committed exports are stale
npm run test:specs          # Check repeatability, coverage and source preservation
```

`npm run build` also exports specifications automatically before building. After changing a chart or its data, commit the regenerated JSON alongside the source change. The exporter checks every chart against the installed Vega-Lite JSON schema, compiles it, and renders standalone SVG to catch invalid expressions, missing signals and runtime errors. Outputs contain no timestamps or machine-specific paths. Exporting twice with unchanged sources produces identical files.

| Chart / JSON description | Exported view (900 px width) | Controls supplied by React |
|---|---|---|
| [1. Indexed line](public/specs/01-indexed-line.vl.json) | Full 2015–2024 series; reference at 2024 | Year slider and readout |
| [2. Choropleth](public/specs/02-choropleth-map.vl.json) | All Malaysia, no selected state | Region buttons, shared selection and detail panel |
| [3. Heatmap](public/specs/03-heatmap.vl.json) | All states and years | Shared selection and detail panel |
| [4. Proportional-symbol map](public/specs/04-proportional-symbol-map.vl.json) | All Malaysia | Region buttons, shared selection and detail panel |
| [5. Connected dots](public/specs/05-connected-dot.vl.json) | Combined capacity visible, ordered by combined rate | Capacity toggle, sorting, selection and detail panel |
| [6. Rank slope](public/specs/06-rank-slope.vl.json) | Public versus combined ranks revealed | Reveal/reset, selection and detail panel |
| [7. Ranked occupancy dots](public/specs/07-ranked-dot.vl.json) | All states and national reference | Shared selection and detail panel |
| [8. Admissions bars](public/specs/08-admissions-bar.vl.json) | Episode counts | Count/share buttons |
| [9. Ageing bars](public/specs/09-ageing-bar.vl.json) | Both 2015 and 2024 | External percentage callouts and count-up animation |
| [10. Non-contiguous cartogram](public/specs/10-non-contiguous-cartogram.vl.json) | Capacity mode, all Malaysia, original outlines visible | Mode, region, outlines, selection and detail panel |
| [11. Population pyramid](public/specs/11-population-pyramid.vl.json) | 2024 | Year buttons |
| [12. Admissions treemap](public/specs/12-admissions-treemap.vl.json) | All four providers | External provider key |

Each file includes inline chart data, including map geometry, so it can be loaded into a compatible Vega-Lite 6 host without resolving site-relative data URLs. For example, once deployed, [the choropleth JSON](https://35100621.github.io/35100621-FIT3179-DV2/specs/02-choropleth-map.vl.json) can be passed to `vegaEmbed`. GitHub's **Raw** button provides a direct JSON URL for repository files; the normal GitHub page is an HTML code viewer.

The exporter uses Vite to load the production TypeScript/JSON modules. `src/charts/presentation.ts` shares the renderer's colour adjustments and `hoveredState` parameter between the website and exports. Map URLs are replaced with the exact runtime GeoJSON features. Cartogram and treemap layouts remain the existing Python-precomputed geometry, not a new layout implementation. `usermeta.export` records the generator, arguments and limitations in every file.

**Standalone limits:** all 12 chart graphics render independently, but the complete interactive webpage cannot be represented by these static snapshots. Tooltip encodings are preserved and work in a tooltip-enabled host such as Vega-Embed. Hover emphasis is driven by JavaScript event listeners in `VegaChart.tsx`; the exported `hoveredState` parameter starts empty. Cross-chart state selection, surrounding source notes, buttons, information panels, scroll animations and responsive `ResizeObserver` updates remain in React. Dark-chart colours are preserved; backgrounds remain transparent, so use an appropriate host background. Fonts must be supplied by the host for matching typography. Decorative CSS bed illustrations are page artwork, not Vega-Lite diagrams.
