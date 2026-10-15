# Malaysia's Hospital Divide — V1

**Why Public Beds Tell Only Half the Story**

A six-chapter React/TypeScript data story following the approved Figma Make reference in `design_reference/`. Seven real Vega-Lite visualisations replace its sample SVGs/placeholders. Original source data and the reference are unchanged.

## Run locally

Node.js 22.12+ recommended (tested with 22.18.0).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally http://127.0.0.1:5173). Processed data is already included; Python is **not** required to run or build the website.

```sh
npm run typecheck
npm run build
npm run preview
```

`dist/` is the production output. The project uses a relative asset base for static subdirectory hosting, but no public deployment is part of this task. All fonts and chart dependencies load locally; no API keys or external runtime requests are required. Publisher links in source notes open their official websites.

## Rebuild the data

Use Python 3.11+ and a virtual environment:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
python scripts/prepare_data.py
```

Run with the preserved original files present in the project root and the Task 02 acquisitions in `data/additional/raw/`. The script checks the 11 original hashes and all 26 acquisition hashes, reads the national/state CSVs and selected pages of the original Health Indicators 2025 PDF, and writes only `public/data/` and the V1 validation documents. No missing observations are invented, interpolated or substituted.

Large original/research datasets are intentionally excluded from Git; they remain in this workspace. A fresh clone runs from committed processed assets but needs the original local files to regenerate them. Exact acquired URLs/hashes are in `data/additional/source_manifest.csv`; original hashes are in `data/additional/validation/original_hashes.json`. Full source PDFs are not shipped with the website.

## What is implemented

1. Indexed annual public beds/population, 2015–2024 (20 observations).
2. State choropleth, 2024 (16 valid derived shapes), with regional view and state readout.
3. State-year public-bed heatmap (160 observations).
4. Public versus combined bed-rate connected dots (all 16 states/territories), with three orderings and shared state highlighting.
5. Ranked annual MOH occupancy (16 states), with the published 72.61% national reference.
6. Reported admission episodes across four provider groups.
7. National 65+ population shares in 2015 and 2024.

Every chart has source/definition notes, hover tooltips and a keyboard-accessible table/CSV alternative. The approved navy hero, cream editorial chapters, terracotta-accented reveal, typography, statistical callouts and navy conclusion are retained. No chart is a placeholder.

## Verification

```sh
npx playwright install chromium
npm run build
npm test
```

Playwright starts a production preview on port 5174, verifies all seven rendered charts and representative exact values, tests tooltips, highlighting, sorting, regional map views, CSV downloads and layout at 1440, 390 and 320 px. Stop any other process using port 5174 before running. Test results/screenshots go to `test-results/` (ignored by Git).

- [Data validation](docs/DATA_VALIDATION.md)
- [Build/browser verification and V2 backlog](docs/V1_VERIFICATION.md)
- [Implementation/feasibility record](docs/IMPLEMENTATION.md)

## Code locations

- `src/App.tsx`: six-chapter editorial composition.
- `src/components/StoryCharts.tsx`: controls, annotations, sources and data tables.
- `src/components/VegaChart.tsx`: responsive Vega-Embed lifecycle/error handling.
- `src/charts/specs.ts`: seven Vega-Lite specifications.
- `scripts/prepare_data.py`: reproducible extraction, joins, rates and boundary repair.
- `public/data/`: processed CSV/JSON and derived state geometry.

## Release limits

This is a local V1 draft, not a live 2026 capacity monitor. Final author attribution is still unconfirmed. Annual occupancy covers MOH only; private admissions have broader facility scope and 82.33% response. Capacity counts do not establish staffing, affordability, access or unmet demand. Boundary vintage and some source reuse conditions remain unresolved before public release. Do not redistribute source publications under an assumed open licence. V2 has not been started.
