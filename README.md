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
The build writes `dist/`. `vite.config.js` sets the GitHub Pages base path. Vite publishes `public/` directly, including specifications at `dist/specs/`. The deployment workflow builds pushes to `main` without TypeScript compilation.

## Repository structure

```text
.github/workflows/        GitHub Pages deployment
public/
  specs/                 Twelve canonical JSON specifications and manifest
  data/                  Runtime JSON/GeoJSON and CSV downloads
src/
  css/                   Styles and decorative artwork
  js/                    Rendering, controls, shared state and motion
scripts/                 Offline data preparation and publishing
data/                    Source manifest, hashes and local source archives
docs/                    Data methods, chart inventory and cleanup report
index.html               Narrative and chart containers
package.json             Commands and dependencies
package-lock.json        Reproducible dependency versions
vite.config.js           GitHub Pages base path and build target
```

No separate `public/assets/` folder is needed: there are no local standalone image assets. Fonts are package imports; the existing hero image is externally hosted.

## Where the code lives

| File/directory | Responsibility |
|---|---|
| `index.html` | Six-act narrative, headings, chart containers, controls, source notes, accessible data tables and CSV links |
| `src/css/styles.css` | Layout, typography, colours, responsive styles, transitions and decorative bed artwork |
| `public/specs/*.json` | **Canonical chart definitions:** marks, channels, scales, projections, layers, annotations, tooltips, parameters and transforms |
| `public/specs/manifest.json` | Maps each HTML chart ID to its JSON file |
| `src/js/charts.js` | Loads JSON, embeds SVG, observes width, forwards hover/click events and applies declarative metadata |
| `src/js/state.js` | Central shared state and per-chart control values |
| `src/js/interactions.js` | Buttons, sliders, dropdowns, state search and seven linked insight panels |
| `src/js/data.js` | Shared request cache, data loading and numeric formatting |
| `src/js/motion.js` | Chapter navigation, scroll entrances and count-up animation; honours reduced motion |
| `src/js/main.js` | Application startup and font/style imports |
| `public/data/` | Browser-loaded JSON/GeoJSON and downloadable CSV |
| `scripts/` | Reproducible Python data preparation and publishing |

Chart specifications are **not generated from JavaScript**. Edit their JSON directly. The previous TypeScript exporter and generated snapshots were removed so there is only one maintained chart definition per chart. Runtime copies in `dist/` are build artifacts.

## Visualisations

See the [12-chart inventory](docs/VISUALISATIONS.md) for every JSON link, idiom, dataset, control and standalone limitation. The [specification manifest](public/specs/manifest.json) connects the chart containers to these files.

- [1. Indexed line](public/specs/01-indexed-line.json)
- [2. Choropleth](public/specs/02-choropleth-map.json)
- [3. Heatmap](public/specs/03-heatmap.json)
- [4. Proportional symbols](public/specs/04-proportional-symbol-map.json)
- [5. Connected dots](public/specs/05-connected-dot.json)
- [6. Rank slope](public/specs/06-rank-slope.json)
- [7. Occupancy dots](public/specs/07-ranked-dot.json)
- [8. Admissions bars](public/specs/08-admissions-bar.json)
- [9. Ageing bars](public/specs/09-ageing-bar.json)
- [10. Cartogram](public/specs/10-non-contiguous-cartogram.json)
- [11. Population pyramid](public/specs/11-population-pyramid.json)
- [12. Treemap](public/specs/12-admissions-treemap.json)

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

The site contains **12 charts and three map idioms**: choropleth, proportional-symbol map and non-contiguous cartogram. It remains one vertically scrollable page and uses MOH and DOSM sources. Under the teaching-team definitions supplied for the visual-polish review, eight are advanced: the three maps, heatmap, connected dots, rank slope, population pyramid and treemap. The indexed line, occupancy dots, admissions bars and ageing bars remain basic. This classification does not guarantee an assessment outcome.

## Attribution and AI acknowledgement

Authorship and original source citations remain on the website. See [data methods and source references](docs/DATA.md) for MOH, DOSM and geographic provenance. OpenAI Codex assisted with code implementation, architecture migration, repository organisation and verification. Statistical observations come from the cited sources, not AI-generated data. Confirm the wording and any additional disclosure requirements against the assignment rubric.

See [repository maintenance report](docs/REPOSITORY.md) for the audit, moves, prior cleanup record and verification results.

See the [visual polish and accessibility review](docs/VISUAL-POLISH.md) for the audit, layout system, chart checklist, viewport comparisons and verification results.
