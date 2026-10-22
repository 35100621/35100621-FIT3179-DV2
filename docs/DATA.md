# Data sources and methods

## Sources

- MOH public beds: https://data.gov.my/data-catalogue/hospital_beds
- DOSM state population: https://data.gov.my/data-catalogue/population_state
- DOSM national population: https://data.gov.my/data-catalogue/population_malaysia
- Health Indicators 2025: 2024 private hospital capacity (table 4.4), MOH occupancy (table 4.6) and reported admissions (table 4.13). The exact publication URL and file hash are recorded in `data/additional/source_manifest.csv`.
- DOSM state boundaries: https://github.com/dosm-malaysia/data-open/tree/main/datasets/geodata

The source manifest and `data/additional/validation/` retain acquisition and provenance evidence. Original local datasets and publications are excluded from Git and are not bundled into the website.

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

Population age-bin rounding is retained and recorded in `validation/population.json`. Core source, join and geometry checks are in `validation/core.json`; cartogram and treemap checks are in `validation/layouts.json`. Saved reports record their generation runs; rerun the processing scripts to refresh them.

Source and boundary reuse terms remain unresolved. Public availability does not establish an open licence. No blanket licence is granted to third-party data, and the geometry is not a legal boundary reference.
