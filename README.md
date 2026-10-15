# Malaysia's Hospital Divide

**Why Public Beds Tell Only Half the Story** — a six-chapter editorial data story using React, TypeScript, Vite, Vega-Lite and Vega-Embed. The approved Figma layout, locally bundled Fraunces/DM Sans typography, navy/cream/terracotta palette and seven original interactive charts are preserved, with two focused additions.

## Original V1 visualisations

1. Indexed public hospital beds and population, 2015–2024.
2. Public beds per 10,000 residents: 16-state choropleth, 2024.
3. State-year public bed-rate heatmap, 2015–2024.
4. Public versus combined public/private bed rates: connected dots across all 16 states/territories, 2024.
5. Ranked MOH annual bed occupancy with 72.61% national reference, 2024.
6. Reported admissions across four provider groups, 2024.
7. National population aged 65+, 2015 versus 2024.

The focused extension adds a **private-bed proportional symbol map** before the connected dots and a **public-versus-combined rank bump chart** after them. See [implementation and checks](reports/task03/TWO_ADDITIONAL_CHARTS.md).

Tooltips, regional map views, shared state highlighting, sorting, accessible tables and CSV downloads support the story. All nine charts are implemented. Desktop and mobile layouts are supported; no other V2 features were added.

## Repository structure

```text
AGENTS.md                       Task instructions retained from V1
src/                            React application and data imports
  components/                   Chart embedding, controls and tables
  charts/                       Seven Vega-Lite specifications
  styles/                       Shared editorial CSS
design-reference/               Unmodified approved Figma source
data/
  original/                     Original CSV/PDF sources (local, ignored)
  additional/raw/               Task02 acquired sources/provenance (local, ignored)
  additional/derived/           Five Task02 research tables
  additional/validation/        Hashes, acquisition logs and validation evidence
  processed/                    Canonical chart-ready CSV/JSON
  geographic/original/          Unmodified original boundaries (local, ignored)
  geographic/validated/         Derived, validated state geometry
public/data/                    Seven download CSVs and runtime state GeoJSON
reports/task01/                 Reports 01–06
reports/task02/                 Reports 07–12
reports/task03/                 V1 implementation and validation
reports/task04/                 Reorganisation inventory, move map and checks
scripts/                       V1 preparation/browser inspection
  validation/                  Task02 research validators
tests/                         Production browser tests
.github/workflows/deploy.yml    GitHub Pages deployment
```

JSON is imported from `data/processed/` and bundled by Vite. Only downloadable CSVs and browser-loaded GeoJSON are copied into `public/data/`. No raw PDFs, facility contacts, cached research extracts or source inventories are deployed. Generated dependencies, builds, test screenshots and caches remain ignored.

## Sources and provenance

MOH public bed counts and DOSM population estimates come from the [public-bed catalogue](https://data.gov.my/data-catalogue/hospital_beds), [state population](https://data.gov.my/data-catalogue/population_state) and [national population](https://data.gov.my/data-catalogue/population_malaysia). Official *Health Indicators 2025* supplies 2024 private capacity, annual MOH utilisation and admissions. DOSM geographic files supply state outlines.

- [Original dataset inventory](reports/task01/01_dataset_inventory.md): schemas, definitions and source hashes.
- [Acquired source manifest](data/additional/source_manifest.csv): exact URLs, publisher, access date, periods, SHA-256 and reuse notes for all 26 raw files.
- [Source research](reports/task02/07_additional_sources.md) and [new dataset audit](reports/task02/08_new_dataset_inventory.md).
- [Original hash manifest](data/additional/validation/original_hashes.json): current paths with unchanged original hashes.
- [V1 validation](reports/task03/DATA_VALIDATION.md): joins, denominators, coverage and geometry repair.

The three original boundary files remain untouched under `data/geographic/original/`. `data/geographic/validated/states.geojson` repairs Sarawak's invalid geometry and applies D3 ring winding; the full transformation and small pre-existing overlaps are documented in the V1 validation. Boundary effective vintage and reuse licence remain unresolved. The 2025 publication has an all-rights-reserved notice; public availability is not an open licence. Source PDFs and raw geography are not redistributed in Git. The derived state geometry is included for the chart; its reuse terms have not thereby been cleared. No blanket licence is granted to third-party datasets.

## Local setup

Use Node.js 22.12+ (verified with 22.18.0).

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/35100621-FIT3179-DV2/`. Committed processed assets are sufficient to run/build; Python and raw source files are unnecessary for website builds.

```sh
npm run typecheck
npm run build
npm run preview
```

The production output is `dist/`. Vite uses `/35100621-FIT3179-DV2/`, matching the supplied repository. Map and download URLs use `import.meta.env.BASE_URL`. Dependencies/fonts are bundled locally.

## Reproduce data and validation

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
python scripts/prepare_data.py
python scripts/verify_reorganisation.py
```

Restore originals at the paths in the hash manifest and acquisitions at the paths in the source manifest first. Large source files remain in this workspace and are intentionally excluded from Git. A fresh clone can build the website immediately, but requires these exact source files to reproduce data. Never substitute a newer download silently: hashes must match. The script re-extracts selected physical PDF pages, validates all 16 state identifiers and matching-year denominators, writes canonical processed files and validated geography, copies eight runtime assets, and updates Task03 validation records. All **195** V1 checks remain applicable and pass. No imputation or source writes occur.

Optional Task02 research revalidation:

```sh
pip install -r scripts/validation/requirements.txt
python scripts/validation/validate_sources.py
python scripts/validation/extract_indicators.py
python scripts/validation/extra_checks.py
python scripts/validation/validate_upi.py
```

The historical extraction script uses preserved PDF page-text caches in `data/additional/validation/`; these ignored local caches must also be restored. The V1 preparation script reads the PDF directly and does not depend on those caches.

```sh
npx playwright install chromium
npm run build
npm test
```

Tests start production preview on port 5174 at the repository subpath and verify seven rendered charts, exact values, tooltips, map views, sorting, shared highlighting, downloads, no HTTP errors and layout at 1440, 390 and 320 px. Results/screenshots are in ignored `test-results/`. To repeat the same tests against the published website:

```sh
PLAYWRIGHT_BASE_URL=https://35100621.github.io/35100621-FIT3179-DV2/ npm test
```

## GitHub Pages deployment

Destination: [35100621/35100621-FIT3179-DV2](https://github.com/35100621/35100621-FIT3179-DV2). GitHub reports default branch `main`; the remote was empty when inspected. **Published and verified:** [Malaysia’s Hospital Divide](https://35100621.github.io/35100621-FIT3179-DV2/). The deployment workflow succeeded and all three browser suites passed against this public URL.

The workflow builds using `npm ci` and `npm run build`, uploads only `dist/`, and deploys using the official GitHub Pages actions on pushes to `main` or manual dispatch. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. See [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Pages is enabled, the project is pushed to `main`, and no deployment setup steps remain. Deployment details and verification evidence are recorded in [Task04 results](reports/task04/RESULTS.md). Never treat a successful local build as a completed deployment.

## Known limits

Counts describe historical reported capacity, not current staffing, affordability, accessibility or unmet demand. Combined beds mix licensed private beds with public capacity, not operational availability. Annual occupancy covers MOH only. Private admissions include a broader facility population and 82.33% response; MOH submission is 97.94%. No response-rate correction is applied. Final author attribution remains unconfirmed. Source/geography reuse questions remain outstanding. The existing large Vega bundle produces a size advisory; this task does not redesign or optimise V2.

[Implementation record](reports/task03/IMPLEMENTATION.md) · [V1 browser verification and backlog](reports/task03/V1_VERIFICATION.md) · [Task04 audit](reports/task04/AUDIT.md)
