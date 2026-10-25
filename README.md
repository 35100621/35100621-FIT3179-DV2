# Malaysia’s Hospital Divide

A single-page investigation of Malaysia’s hospital capacity, activity and population using observed MOH and DOSM data through 2024. Built with **HTML, CSS, vanilla JavaScript and Vega-Lite 6 JSON**. All 12 statistical charts/maps render as SVG through Vega-Embed. React and TypeScript are no longer used.

[Website](https://35100621.github.io/35100621-FIT3179-DV2/) · [Data methods](docs/DATA.md)

## Run and build

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Development URL: http://127.0.0.1:5173/35100621-FIT3179-DV2/.
The build writes `dist/`. `vite.config.js` sets the GitHub Pages base path and copies canonical specifications into `dist/specs/`. The deployment workflow builds pushes to `main` without TypeScript compilation.

## Where the code lives

| File/directory | Responsibility |
|---|---|
| `index.html` | Six-act narrative, headings, chart containers, controls, source notes, accessible data tables and CSV links |
| `css/styles.css` | Layout, typography, colours, responsive styles, transitions and decorative bed artwork |
| `specs/*.json` | **Canonical chart definitions:** marks, channels, scales, projections, layers, annotations, tooltips, parameters and transforms |
| `specs/manifest.json` | Maps each HTML chart ID to its JSON file |
| `js/charts.js` | Loads JSON, embeds SVG, observes width, forwards hover/click events and applies declarative metadata |
| `js/state.js` | Central shared state and per-chart control values |
| `js/interactions.js` | Buttons, sliders, dropdowns, state search and seven linked insight panels |
| `js/data.js` | Shared request cache, data loading and numeric formatting |
| `js/motion.js` | Chapter navigation, scroll entrances and count-up animation; honours reduced motion |
| `js/main.js` | Application startup and font/style imports |
| `public/data/` | Browser-loaded JSON/GeoJSON and downloadable CSV |
| `scripts/` | Reproducible Python data preparation and publishing |

Chart specifications are **not generated from JavaScript**. Edit their JSON directly. The previous TypeScript exporter and generated snapshots were removed so there is only one maintained chart definition per chart. Runtime copies in `dist/` are build artifacts.

## Every chart and its JSON

All twelve specifications were schema-validated and rendered during migration. Dataset filenames refer to `public/data/`; source meanings and caveats are recorded in [data methods](docs/DATA.md).

| Chart / canonical JSON | Dataset / source | Preserved controls and interaction |
|---|---|---|
| [1. Indexed line](specs/01-indexed-line.json) | `indexed_growth.json`; MOH beds + DOSM population | Year slider/reference rule, readout, tooltip |
| [2. Choropleth](specs/02-choropleth-map.json) | `states.geojson`; DOSM boundaries joined to public-bed rates | Region, hover outline, shared state selection |
| [3. Heatmap](specs/03-heatmap.json) | `state_rates.json`; MOH + DOSM | State/year tooltip, selection, historical insight |
| [4. Proportional-symbol map](specs/04-proportional-symbol-map.json) | `states.geojson`, `private_bed_locations.json`; licensed private beds | Region, state selection, hover and tooltip |
| [5. Connected dots](specs/05-connected-dot.json) | `combined_capacity.json`; public + private beds, DOSM population | Public/combined toggle, three sort orders, selection |
| [6. Rank slope](specs/06-rank-slope.json) | `combined_capacity.json`; public/combined rates and ranks | Reveal/reset ranks, selection and tooltip |
| [7. Ranked occupancy dots](specs/07-ranked-dot.json) | `occupancy.json`; Health Indicators 2025 table 4.6 | National reference, state selection and tooltip |
| [8. Admissions bars](specs/08-admissions-bar.json) | `admissions.json`; Health Indicators table 4.13 | Count/share switch and tooltip |
| [9. Ageing bars](specs/09-ageing-bar.json) | `ageing.json`; DOSM national population | Tooltip; external animated callouts |
| [10. Non-contiguous cartogram](specs/10-non-contiguous-cartogram.json) | `capacity_shapes.json`; validated DOSM boundaries + combined capacity | Geography/capacity, region, original outlines, linked hover/selection |
| [11. Population pyramid](specs/11-population-pyramid.json) | `population_pyramid.json`; DOSM age/sex population | 2015/2024 switch and tooltip |
| [12. Admissions treemap](specs/12-admissions-treemap.json) | `admissions_treemap.json`; reported admissions, precomputed rectangle layout | Tooltip and responsive internal labels |

Use GitHub’s **Raw** button to access JSON. Published files use the same filenames under the website’s `specs/` directory, for example [choropleth JSON](https://35100621.github.io/35100621-FIT3179-DV2/specs/02-choropleth-map.json). Each specification references `../data/...`, resolved relative to its specification URL by the website loader. When using another Vega host/editor, retain the `specs/` and `data/` relative structure or configure its loader base URL accordingly.

### Standalone behaviour and external coordination

Each JSON renders its default chart independently with valid data references. Native parameters and expressions implement the year/region filters, capacity/rank switches, sorting and percentage calculations. Tooltips work in a tooltip-enabled host such as Vega-Embed.

The surrounding HTML buttons, state search, shared selection across seven views, detail panels, scroll animations and responsive resizing require the vanilla JavaScript host. Hover/click listeners update `hoveredState` and `selectedState`; an isolated JSON does not recreate those DOM controls or cross-chart links. No chart graphic requires React.

`usermeta.responsive` contains JSON-pointer patches for axis/legend/height properties that Vega-Lite cannot express as signals. `usermeta.parameterPatches` changes the admissions axis title when switching count/share. `prepareSpec` applies these generically; chart-specific marks/encodings remain in JSON. A standalone host ignores this optional metadata and uses the supplied default layout/title. For exact appearance, provide the page’s fonts and background colours (charts have transparent backgrounds).

Cartogram shapes and treemap rectangles use the existing Python-precomputed layouts. Decorative CSS beds are page artwork, not data diagrams. Legends are explanatory; the original site had no interactive legends.

## Data preparation and publishing

Committed `public/data/` files are the website’s datasets and are sufficient to build; no intermediate data or test tools are required. `npm run sync:data` publishes compact, value-identical JSON and combines original/resized cartogram features with a `_layout` tag. It does not change coordinates or observations. Shared request caching prevents repeated downloads when charts share datasets or rerender. All published data files together are approximately 2.7 MB uncompressed; chart specifications total approximately 84 KB.

To regenerate observations, restore original files at paths recorded in `data/additional/source_manifest.csv` and `data/additional/validation/original_hashes.json`, then use Python 3.13:

```sh
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
npm run prepare:data
```

This runs `prepare_data.py`, `prepare_private_locations.py`, `prepare_population.py`, `prepare_layouts.py`, then `sync-data.mjs`. Source hashes are checked; raw sources are never overwritten or deployed. Intermediate datasets in `data/processed/`, prepared boundaries in `data/geographic/validated/` and reports in `docs/validation/` are generated locally and ignored by Git. If observations change, also update the narrative/readouts and accessible HTML tables to match.

## Build and formatting

```sh
npm run build
npm run format:check
```

The build bundles the website and publishes the canonical JSON specifications. Use `npm run format` to format HTML, CSS, JavaScript and JSON. Automated test files, test dependencies and historical reports have been removed; the previous migration was verified before this cleanup.

## Interpretation and assignment scope

Beds describe reported capacity, not affordability, staffing or access. Combined capacity adds public hospital/special-institution beds and licensed private hospital beds using the same population denominator. Occupancy is historical annual MOH utilisation. Admissions are episodes, with different provider coverage. Age structure is context, not a demand forecast.

The site contains **12 charts and three map idioms**: choropleth, proportional-symbol map and non-contiguous cartogram. It remains one vertically scrollable page and uses MOH and DOSM sources. This migration preserves existing idioms; it does **not** establish that eight qualify as “advanced” under the HD rubric. That rubric interpretation remains a separate assessment.
