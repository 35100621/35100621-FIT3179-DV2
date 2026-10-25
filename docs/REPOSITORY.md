# Repository maintenance report

## Scope and checkpoint

Audit performed against the actual filesystem and Git index. Neither `AGENTS.md` nor `agent.md` existed; none was invented. Work is on `codex/repository-reorganisation`. Checkpoint `e8ca288` records the previously requested cleanup exactly as it stood before this reorganisation; `6f00cc1` preserves the files removed in that earlier request.

## Before and after

```text
Before                            After
.github/workflows/                .github/workflows/
css/styles.css                    src/css/styles.css
js/*.js                           src/js/*.js
specs/*.json                      public/specs/*.json
specs/manifest.json               public/specs/manifest.json
public/data/                      public/data/ (unchanged)
scripts/                          scripts/ (unchanged)
data/                             data/ (source evidence retained)
docs/DATA.md                      docs/DATA.md
                                  docs/VISUALISATIONS.md
                                  docs/REPOSITORY.md
index.html                        index.html (module path updated)
vite.config.js                    vite.config.js (copy plugin removed)
package.json / lockfile            package.json / lockfile
README.md                         README.md
```

No empty asset folders or extra source nesting were created. Vite now publishes `public/specs/` directly, removing the custom copy step and its Node filesystem imports. Runtime URLs remain `./specs/...` and `../data/...`; the GitHub Pages base path remains `/35100621-FIT3179-DV2/`. The relative stylesheet import remains correct because JS and CSS moved together.

## Relocation record

All moves used `git mv`; no specification content changed.

| Old path | New path |
|---|---|
| `css/styles.css` | `src/css/styles.css` |
| `js/charts.js` | `src/js/charts.js` |
| `js/data.js` | `src/js/data.js` |
| `js/interactions.js` | `src/js/interactions.js` |
| `js/main.js` | `src/js/main.js` |
| `js/motion.js` | `src/js/motion.js` |
| `js/state.js` | `src/js/state.js` |
| `specs/01-indexed-line.json` | `public/specs/01-indexed-line.json` |
| `specs/02-choropleth-map.json` | `public/specs/02-choropleth-map.json` |
| `specs/03-heatmap.json` | `public/specs/03-heatmap.json` |
| `specs/04-proportional-symbol-map.json` | `public/specs/04-proportional-symbol-map.json` |
| `specs/05-connected-dot.json` | `public/specs/05-connected-dot.json` |
| `specs/06-rank-slope.json` | `public/specs/06-rank-slope.json` |
| `specs/07-ranked-dot.json` | `public/specs/07-ranked-dot.json` |
| `specs/08-admissions-bar.json` | `public/specs/08-admissions-bar.json` |
| `specs/09-ageing-bar.json` | `public/specs/09-ageing-bar.json` |
| `specs/10-non-contiguous-cartogram.json` | `public/specs/10-non-contiguous-cartogram.json` |
| `specs/11-population-pyramid.json` | `public/specs/11-population-pyramid.json` |
| `specs/12-admissions-treemap.json` | `public/specs/12-admissions-treemap.json` |
| `specs/manifest.json` | `public/specs/manifest.json` |

## Deletion and duplicate decisions

**No further source or committed data files were deleted in this reorganisation.** Generated intermediates/reports were recreated for verification and removed again afterwards, using the paths and reproducibility reasons in the table below. All 21 public datasets have active consumers. CSV/JSON pairs are intentional download/runtime representations, not unused copies. All 37 local source/archive files are covered by the source manifest or original-hash checks; they remain outside `public/` and are not deployed. No uncertain source file was removed.

The prior cleanup removed the following files before this task started. They are recorded here so the complete pending maintenance history is reviewable, not presented as new deletions:

| Prior removed path | Reason / recovery |
|---|---|
| `data/additional/validation/acquisition_log.json` | Historical acquisition/check report removed at the preceding explicit request; retained in Git at 6f00cc1. Current source manifest and original hashes remain. |
| `data/additional/validation/extra_checks.json` | Historical acquisition/check report removed at the preceding explicit request; retained in Git at 6f00cc1. Current source manifest and original hashes remain. |
| `data/additional/validation/indicator_checks.json` | Historical acquisition/check report removed at the preceding explicit request; retained in Git at 6f00cc1. Current source manifest and original hashes remain. |
| `data/additional/validation/indicator_summary.txt` | Historical acquisition/check report removed at the preceding explicit request; retained in Git at 6f00cc1. Current source manifest and original hashes remain. |
| `data/additional/validation/upi_validation.json` | Historical acquisition/check report removed at the preceding explicit request; retained in Git at 6f00cc1. Current source manifest and original hashes remain. |
| `data/additional/validation/validation_results.json` | Historical acquisition/check report removed at the preceding explicit request; retained in Git at 6f00cc1. Current source manifest and original hashes remain. |
| `data/geographic/validated/states.geojson` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/admissions.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/admissions.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/admissions_treemap.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/ageing.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/ageing.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/capacity_cartogram.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/capacity_geography.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/combined_capacity.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/combined_capacity.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/indexed_growth.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/indexed_growth.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/occupancy.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/occupancy.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/population_pyramid.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/population_pyramid.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/private_bed_locations.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/public_rates_2024.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/public_rates_2024.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/state_rates.csv` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/state_rates.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `data/processed/summary.json` | Generated intermediate; offline preparation recreates it. Published chart/download data retained. |
| `docs/MIGRATION.md` | Historical migration report removed at the preceding explicit request; archived at 6f00cc1. |
| `docs/validation/core.json` | Generated processing report; recreated by offline preparation. |
| `docs/validation/core.md` | Generated processing report; recreated by offline preparation. |
| `docs/validation/layouts.json` | Generated processing report; recreated by offline preparation. |
| `docs/validation/population.json` | Generated processing report; recreated by offline preparation. |
| `playwright.config.js` | Test suite/configuration removed at the preceding explicit request; archived at 6f00cc1. |
| `scripts/tests/architecture.test.mjs` | Test suite/configuration removed at the preceding explicit request; archived at 6f00cc1. |
| `scripts/validate-specs.mjs` | Validation-only script removed at the preceding explicit request; archived at 6f00cc1. |
| `tests/charts.spec.js` | Test suite/configuration removed at the preceding explicit request; archived at 6f00cc1. |
| `tests/data.spec.js` | Test suite/configuration removed at the preceding explicit request; archived at 6f00cc1. |
| `tests/interactions.spec.js` | Test suite/configuration removed at the preceding explicit request; archived at 6f00cc1. |
| `tests/resources.spec.js` | Test suite/configuration removed at the preceding explicit request; archived at 6f00cc1. |
| `tests/story.spec.js` | Test suite/configuration removed at the preceding explicit request; archived at 6f00cc1. |

Temporary migration captures, browser results and the old build output were also removed in the preceding cleanup. New verification artifacts are kept under `/tmp/dv2-reorganisation/`, outside the repository. Regenerated intermediates and reports remain ignored; no test suite or test dependency was reintroduced.

## File audit and classifications

Categories: **runtime** (page/chart/download), **build** (build/deploy/format), **reproduce** (offline data preparation/provenance), **documentation** (submission/methodology). Dependencies in `node_modules/` and output in `dist/` are generated and ignored. No authored TS, TSX, JSX, React dependency or obsolete tsconfig was found.

| File at start of task | Classification and decision |
|---|---|
| `.github/workflows/deploy.yml` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |
| `.gitignore` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |
| `.prettierignore` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |
| `.prettierrc.json` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |
| `README.md` | Documentation: retain and update. |
| `css/styles.css` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `data/additional/raw/Kod UPI_1303024.xlsx` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/PETUNJUK_KESIHATAN_2024.pdf` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/PETUNJUK_KESIHATAN_2025.pdf` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/administrative_1_state.geojson` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/administrative_2_district.geojson` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/bed_util.json` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/bedutil_01_table_facility.parquet` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/bedutil_01_table_state.parquet` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/bedutil_02_timeseries_facility.parquet` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/bedutil_02_timeseries_state.parquet` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/bedutil_facility.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/bedutil_state.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/ckaps_private_hospitals.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/covid_epidemic_README.md` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/covid_hospital.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/covid_icu.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/dosm_README.md` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/dosm_geo_commits.json` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/facilities_master.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/healthcare_staff.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/kkmnow_LICENSE` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/kkmnow_README.md` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/kkmnow_back_tree.json` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/kkmnow_commits.json` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/resources_README.md` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/raw/resources_commits.json` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/additional/source_manifest.csv` | Reproduce: source manifest or expected original hashes; retain. |
| `data/additional/validation/original_hashes.json` | Reproduce: source manifest or expected original hashes; retain. |
| `data/geographic/original/administrative_0_malaysia.geojson` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/geographic/original/administrative_1_state.geojson` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/geographic/original/administrative_2_district.geojson` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/HEALTH_FACTS_2025.pdf` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/bedutil_facility.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/bedutil_state.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/facilities_master.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/hospital_beds.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/population_district.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/population_malaysia.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `data/original/population_state.csv` | Reproduce: source/archive referenced by manifest/hash integrity checks; retain locally, not deployed. |
| `docs/DATA.md` | Documentation: retain and update. |
| `index.html` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `js/charts.js` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `js/data.js` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `js/interactions.js` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `js/main.js` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `js/motion.js` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `js/state.js` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `package-lock.json` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |
| `package.json` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |
| `public/data/admissions.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/admissions.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/admissions_treemap.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/ageing.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/ageing.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/capacity_shapes.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/combined_capacity.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/combined_capacity.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/indexed_growth.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/indexed_growth.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/occupancy.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/occupancy.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/population_pyramid.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/population_pyramid.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/private_bed_locations.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/public_rates_2024.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/public_rates_2024.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/state_rates.csv` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/state_rates.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/states.geojson` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `public/data/summary.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `scripts/prepare_data.py` | Reproduce: required stage in prepare:data; retain. |
| `scripts/prepare_layouts.py` | Reproduce: required stage in prepare:data; retain. |
| `scripts/prepare_population.py` | Reproduce: required stage in prepare:data; retain. |
| `scripts/prepare_private_locations.py` | Reproduce: required stage in prepare:data; retain. |
| `scripts/requirements.txt` | Reproduce: required stage in prepare:data; retain. |
| `scripts/sync-data.mjs` | Reproduce: required stage in prepare:data; retain. |
| `specs/01-indexed-line.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/02-choropleth-map.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/03-heatmap.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/04-proportional-symbol-map.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/05-connected-dot.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/06-rank-slope.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/07-ranked-dot.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/08-admissions-bar.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/09-ageing-bar.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/10-non-contiguous-cartogram.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/11-population-pyramid.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/12-admissions-treemap.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `specs/manifest.json` | Runtime: active chart, interface, style or download; retain (moves listed above). |
| `tsconfig.tsbuildinfo` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |
| `vite.config.js` | Build: dependency, formatting, Git or deployment configuration; retain and update paths as needed. |

## Reproducibility and remaining constraints

The four Python scripts have distinct required jobs and remain separate. `sync-data.mjs` is required after preprocessing; it is not a build/deployment dependency. Original source archives are local/ignored, so a fresh clone builds from committed public data but requires source restoration to regenerate it. The source manifest records locations and hashes. See DATA.md for the pipeline and sources; VISUALISATIONS.md owns the detailed chart inventory.

The existing external Google Fonts/Unsplash resources and source citations remain unchanged. Vite retains its nonfatal large-bundle warning. No new visual design, interaction or real-world data changes were made. The branch is prepared for deployment; this maintenance task does not republish the live site.

## Verification

- `npm run build`: passed with the configured GitHub Pages base path. All **56 production files** have identical SHA-256 hashes to the build immediately before reorganisation.
- Offline pipeline executed using `/tmp/dv2-cleanup-py313/bin/python` for each of the four Python scripts, followed by `npm run sync:data`: passed **195 core checks**, population checks, 16-state geometry checks and treemap/cartogram proportionality checks. Published datasets and all 13 specification/manifest files retained identical byte hashes.
- `node /tmp/dv2-reorganisation/checks/validate.mjs`: passed all **12 Vega-Lite schemas and 36 standalone SVG render scenarios**, including alternative regions, years and controls. This temporary copy of the previous validator changes only its file/module paths.
- No test suite remained in the repo after the prior explicit cleanup. Historical JavaScript tests from `6f00cc1` were run from temporary storage, with unchanged assertions and updated external fixture/report paths. `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5181/35100621-FIT3179-DV2/ node /tmp/dv2-reorganisation/checks/node_modules/@playwright/test/cli.js test --config /tmp/dv2-reorganisation/checks/playwright.config.mjs`: **30 passed across six viewports in 1.3 minutes**. The first temporary harness attempt failed due to a missing `type: module`; correcting the temporary harness allowed the full suite to execute.
- Browser coverage includes all 12 charts, the three map idioms, tooltips, controls, linked selection, correct values, CSV downloads, data/spec paths, cache behaviour, console errors and horizontal overflow.
- Browser screenshot comparison: hero plus six acts at 1280 and 390 px, **14 pairs**. Thirteen pairs had no pixels differing by more than 12 RGB levels. One laptop Act VI capture differed in 0.322% of pixels, isolated to population-pyramid text/plot spacing; manual inspection confirmed the same values and colours. Identical production bytes establish no implementation change; runtime font measurement can vary between captures. Screenshots are outside the repo under `/tmp/dv2-reorganisation/visual/`.
- `npm run format:check` and `git diff --check`: passed. Project/source JSON syntax parsing also passed, including retained local provenance snapshots.

All twelve JSON descriptions are in `public/specs/`, linked from README and VISUALISATIONS.md. Twelve charts and three distinct map idioms remain. The project can be built and deployed without tests, preprocessing, React or TypeScript. The existing external assets and source-restoration requirement are unchanged; this task does not certify the separate HD advanced-idiom criterion.
