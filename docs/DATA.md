# Data sources and methods

## Sources

- MOH public beds: https://data.gov.my/data-catalogue/hospital_beds
- DOSM state population: https://data.gov.my/data-catalogue/population_state
- DOSM national population: https://data.gov.my/data-catalogue/population_malaysia
- Health Indicators 2025: 2024 private hospital capacity (table 4.4), MOH occupancy (table 4.6) and reported admissions (table 4.13). The exact publication URL and file hash are recorded in `data/additional/source_manifest.csv`.
- DOSM state boundaries: https://github.com/dosm-malaysia/data-open/tree/main/datasets/geodata

The source manifest and `data/additional/validation/original_hashes.json` retain source locations and expected hashes. Original local datasets and publications are excluded from Git and are not bundled into the website.

## Calculations

Population values published in thousands are converted to residents. Aggregate population selects both sexes and overall ethnicity, avoiding duplicate categories.

- Index = annual value / 2015 value × 100.
- Bed rate = beds / same-year residents × 10,000.
- Combined beds = public hospital/special-institution beds + licensed private hospital beds.
- Capacity ranks order rates from highest to lowest.
- Admission share = provider episodes / total reported episodes × 100.
- Ageing share = residents in age bands 65–69 through 85+ / all-age population × 100.
- Pyramid shares use the same-year national total; male values are negated only to place bars left of zero.

Year-end beds are compared with same-year mid-year population estimates. Resident population is not a hospital catchment. No synthetic or imputed observations are added.

## Geographic displays

Derived state geometry repairs Sarawak and adjusts polygon winding for rendering; originals are unchanged. The effective boundary vintage is undocumented. Symbol-map points are representative positions within states, not hospital locations.

The capacity cartogram uses an equal-area cylindrical projection, uniform shape scaling proportional to combined bed counts, and deterministic collision separation. Shape displacement does not encode distance or access. Treemap rectangles are computed by recursive proportional partitioning of reported admissions.

## Coverage and limits

The 2024 totals reconcile to 52,048 public beds, 19,920 licensed private hospital beds, and 71,968 combined beds. Official and operational bed definitions differ. MOH annual occupancy uses the published national reference of 72.61%, not an unweighted state average.

Four admission groups total 4,270,356 reported episodes. MOH submission is 97.94%; private response is 82.33%. No missing-report adjustment is made. Private admissions include maternity homes, nursing homes and hospices, whereas private bed capacity covers licensed hospitals only. Admissions are episodes, not unique people.

Population age-bin rounding is retained. Running the data-preparation scripts regenerates intermediate datasets and validation reports in ignored directories; these are not required to build the website.

Source and boundary reuse terms remain unresolved. Public availability does not establish an open licence. No blanket licence is granted to third-party data, and the geometry is not a legal boundary reference.

## Published dataset inventory

Only files consumed by charts, interface readouts or data-download links are published. All paths below are relative to `public/data/`. Chart numbers refer to [the visualisation inventory](VISUALISATIONS.md).

| Dataset | Consumer | Source / purpose |
|---|---|---|
| `indexed_growth.json` | Chart 1 and year/national readouts | MOH beds and DOSM population, indexed to 2015 |
| `public_rates_2024.json` | State search and selected-state readouts | Current MOH beds per DOSM resident population |
| `state_rates.json` | Chart 3 and historical readouts | State/year public capacity rates |
| `states.geojson` | Charts 2 and 4 | Validated DOSM state boundaries joined to current public rates |
| `private_bed_locations.json` | Chart 4 | Health Indicators private bed totals and interior state anchors |
| `combined_capacity.json` | Charts 5/6 and linked panels | Public and licensed private beds, rates and ranks |
| `occupancy.json` | Chart 7 and linked panel | Published annual MOH bed occupancy |
| `admissions.json` | Chart 8 | Four reported provider admission totals |
| `ageing.json` | Chart 9 and interface data loader | DOSM population aged 65+ |
| `capacity_shapes.json` | Chart 10 | Original and resized state features, distinguished by `_layout` |
| `population_pyramid.json` | Chart 11 | DOSM age/sex bins for 2015 and 2024 |
| `admissions_treemap.json` | Chart 12 | Deterministic rectangles proportional to reported admissions |
| `summary.json` | Linked readouts | National capacity/occupancy reference quantities |
| `indexed_growth.csv` | Download below chart 1 | Accessible reuse of the displayed series |
| `public_rates_2024.csv` | Download below chart 2 | Current public-bed rates |
| `state_rates.csv` | Download below chart 3 | State/year rates |
| `combined_capacity.csv` | Downloads below charts 4, 5, 6 and 10 | Capacity counts/rates/ranks |
| `occupancy.csv` | Download below chart 7 | Published occupancy values |
| `admissions.csv` | Downloads below charts 8 and 12 | Reported admission totals |
| `ageing.csv` | Download below chart 9 | Ageing population shares |
| `population_pyramid.csv` | Download below chart 11 | Population age/sex bins |

CSV and JSON pairs are intentional: JSON feeds the graphics; CSV provides the existing downloads. `capacity_shapes.json` intentionally contains both original and resized outlines for the cartogram mode and outline controls. No public dataset was removed during reorganisation.

## Reproduce and publish

The source paths in `data/additional/source_manifest.csv` and `data/additional/validation/original_hashes.json` must be available locally. Original datasets, publications, licence/readme evidence and acquisition snapshots are retained outside `public/` and ignored by Git; they are never copied into the production website.

Use Python 3.13 and the pinned dependencies in `scripts/requirements.txt`:

```sh
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
npm run prepare:data
```

The command runs these required stages in order:

1. `prepare_data.py`: checks source hashes, prepares core observations and validated geography, publishes core CSV downloads and GeoJSON.
2. `prepare_private_locations.py`: computes interior state symbol anchors from validated geometry.
3. `prepare_population.py`: prepares pyramid observations and publishes their CSV.
4. `prepare_layouts.py`: calculates cartogram features and treemap rectangles.
5. `sync-data.mjs`: publishes compact JSON and combines the two cartogram layouts without changing their coordinates or observations.

`sync:data` is a publishing step after offline processing, **not** a build/deployment dependency. Run `npm run sync:data` only when `data/processed/` has been regenerated. The committed `public/data/` files are sufficient for a fresh clone to build. Intermediate `data/processed/`, `data/geographic/validated/` and generated `docs/validation/` reports remain ignored. Update HTML narrative figures and accessible tables whenever intentionally updating source observations.
