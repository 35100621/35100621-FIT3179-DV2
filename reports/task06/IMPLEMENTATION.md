# Three approved advanced visualisations

Approved following the audit in this task. All nine previous charts remain intact; total is twelve visualisations. The new map is a genuine non-contiguous polygon cartogram, distinct from the existing choropleth and proportional-symbol map. This is not a claim about course rubric scoring.

## Questions and placement

- **Chapter 3: provider treemap.** What institutional categories sit inside the public/private total? The public branch has MOH hospitals, MOH special institutions and other-government hospitals; the private branch has licensed private hospitals. Four mutually exclusive leaves sum to 71,968 beds. The 5,646 special-institution beds are 10.85% of public capacity. This unpacks institutional definitions rather than repeating the existing state rates, rankings, private locations or admission episodes.
- **Chapter 6: population pyramid.** How did the full age/sex distribution change between 2015 and 2024? Eighteen age bands and two sexes per year, with identical ±6% domains. Desktop panels sit together; mobile panels stack. Bars are shares of the published national both-sexes total in that year, not shares of each sex. This extends, and preserves, the existing national 65+ chart; cross-sections are not tracked cohorts.
- **Chapter 6: ageing cartogram.** Where are older residents concentrated, and how does population count differ from older-age prevalence? Selangor has 592,800 residents aged 65+; Perak's share is highest at 9.91%. Area represents counts, teal intensity represents share. The question is demographic geography, not a third account of private-bed concentration. All 16 states/territories remain selectable; regional views refit the same geometry. Within each view, all polygons share one area conversion factor.

## Reproduction and data validation

Use Python with Shapely 2.2.0, already pinned in `scripts/requirements.txt`, then run `python scripts/prepare_advanced.py`. For an isolated environment: `python3 -m venv .venv`, `.venv/bin/pip install shapely==2.2.0`, `.venv/bin/python scripts/prepare_advanced.py`.

The script reads original national/state population, reviewed Task 02 public/private tables and validated state geometry. It creates only new CSV/JSON assets and downloadable CSV copies. Population units are converted from thousands to residents. Exact lookup cardinality guards reject missing or duplicate population records. Aggregate population rows are excluded from pyramid bars. Source hashes are checked before/after processing.

`data-validation.json` records 72 pyramid rows, 16 state records, 71,968 provider beds, published rounding residuals, zero cartogram overlap pairs and proportional-area assertions. The 2015 sex-specific age-bin sums differ from published sex totals by +100 male / +300 female residents; 2024 residuals are −100 / +100. State older counts sum to 2,609,200 versus 2,609,000 nationally. These are retained without reconciliation. No existing processed values were regenerated.

### Cartogram geometry

Start from the previously validated boundary copy. Project to cylindrical equal-area coordinates `x = longitude radians`, `y = sin(latitude radians)`. Uniformly scale each state's full polygon/multipolygon about its projected centroid so projected area equals a shared factor times the older-resident count. Apply deterministic pairwise translations until a minimum gap separates states; test every pair for overlap and every area's count ratio. This preserves polygon shapes and the broad Peninsular/East Malaysia arrangement, but positions are displaced and shapes are not legal boundaries. Faint original outlines retain geographic context. No facility coordinates, flows, settlement locations or accessibility measures are inferred.

SVG path strings are generated data, rendered by Vega path marks with the same horizontal/vertical scale. They are not hand-drawn chart illustrations. Regional views apply a common scale/translation to a subset. Never compare physical shape sizes across differently zoomed views. Original boundaries are untouched; vintage and reuse caveats remain.

## Implementation files

- `src/charts/advanced.ts`: Vega-Lite pyramid, native Vega hierarchical treemap and cartogram specifications. Treemap uses stratify/treemap transforms; it is not a hand-positioned rectangle illustration.
- `src/components/AdvancedCharts.tsx`: chart explanations, state/region controls, source notes, accessible data tables and downloads.
- `src/components/VegaChart.tsx`: accepts native Vega as well as Vega-Lite; existing chart lifecycle unchanged.
- `src/App.tsx`, `src/styles/index.css`: story integration and responsive styling.
- `scripts/prepare_advanced.py`: deterministic preparation; source files read-only.
- `tests/advanced.spec.ts`: additional chart and control tests; existing story test only updates total chart count and scopes its public-map readout selector.

Navy/teal/slate/terracotta provider semantics match existing charts. The dark-background pyramid uses slate for male and teal for female, with an explicit sex legend. The demographic map uses the existing teal sequential palette, with its own clearly labelled percentage legend. Every new chart has exact-value tooltips, data tables, CSV downloads and analytical caveats.

## Validation and limitations

Production build and Chromium checks run against the existing GitHub Pages base path on local preview port 5187. Tests cover existing chart mark counts/values and interactions, 72 pyramid bars, four treemap leaves, sixteen cartogram states, map region filtering, exact selected-state readouts, provider tooltip/table values, reduced motion, and no horizontal overflow at 1440/768/390/320 pixels. Actual screenshots reviewed for all new idioms; mobile treemap typography and map label contrast refined after inspection.

No deployment performed. Existing source-reuse/boundary-vintage caveats remain. Cartogram shape size on an all-Malaysia mobile view is necessarily small: regional views, state selection and the table provide detail. No claim of healthcare need/access is made. The production Vega/data bundle retains the existing large-chunk warning, now with added cartogram path data. Safari/Firefox and a full assistive-technology audit remain outside the completed checks.

Final run: all eight browser tests passed (20.8 seconds). `npm run build` and `git diff --check` passed. Preservation check confirms no modified/deleted original data assets and no changes to existing chart definitions. Summary: `browser-validation.json`.
