# 05 — Missing data and priorities

Audit date: 15 October 2026. Author: Codex, for FIT3179 Task 01 review.

## Priority order

| Priority | Missing data or metadata | Why it matters / analysis enabled | Minimum acceptance test |
| --- | --- | --- | --- |
| 1 — essential if pressure remains central | Dated hospital utilisation history with hospital IDs, capacity, occupied beds, ICU/non-ICU distinction, reporting flags and methodology | Current CSVs are undated, mutually inconsistent and contain a negative capacity. Needed for sustained/seasonal pressure, state–hospital reconciliation and capacity/utilisation relationships | Explicit observation timestamp and reporting population; distinguish missing, zero, closed and not applicable; reconcile weighted aggregates; investigate Limbang and above-100% values |
| 1 — essential for maps | Boundary publisher, licence, vintage and validated state/district geometries | State geometry has one invalid feature and district geometry seven; 2025–2026 population geography has six additional districts | Preserve originals; validate a separate derived version; inspect repairs, feature IDs, state/district coverage, overlaps/gaps and coastal simplification |
| 1 — essential for district rates | Authoritative district crosswalk with effective dates and bed allocations consistent with population boundaries | Fifteen bed labels need mapping; seven 2024 population districts remain unmatched after proposed renames | Document every mapping's source and temporal validity; resolve splits by reallocating beds or aggregating both datasets to common boundaries; never zero-fill missing districts |
| 1 — essential for point map claims | Facility-register provenance, capture date, category definitions and validated hospital coordinates | Registry is public-only and undated. 166 HOSPITAL-category rows include three state-containment failures; completeness cannot be assumed | Verify Tuanku Fauziah, Semporna and Mukah; stable facility ID linkage; documented inclusion/exclusion of special institutions, recently opened/closed facilities and university hospitals |
| 2 — essential for an all-sector “hospital divide” | Private hospital bed counts by state and district, ideally annually 2015–2024; dated private hospital coordinates | PDF gives only national private capacity. Public-only state rankings do not describe total hospital supply | Same dates/geographies; distinguish hospitals from maternity/nursing homes, hospices and dialysis capacity; explicit official/active/staffed bed definition |
| 2 — strengthens demand section | Admissions and causes by state/hospital and year, with coding scheme, counts, response rates and population coverage | PDF national top tens cannot explain local activity or trends. Would enable composition heatmaps, temporal change and admissions per resident | Stable categories and denominator; distinguish admissions from unique patients/day care/outpatient encounters; disclose reporting completeness |
| 2 — resolves interpretation | Patient residence-to-hospital flows, referral/catchment information, occupancy methodology and staffed-bed definition | High territorial rates may reflect service to non-residents; population is an incomplete need proxy | Origin and destination geography, period, suppressed cells and compatible facility universe; do not estimate flows from beds alone |
| 3 — enables spatial-access analysis | Gridded population or settlement-weighted small-area population, roads/ferries and travel-time network | Required for defensible population-location dot density and access/isochrone maps | Matched year, spatial resolution, coordinate system, road connectivity and transport assumptions; validate geographic coverage |
| 3 — refines capacity/need | Staffing, bed type/service mix, staffed/open beds, morbidity and age-specific utilisation rates | Capacity counts and ageing alone cannot establish adequacy or unmet need | Consistent hospital universe and period, service definitions and measured denominators; avoid importing a universal shortage threshold |

## Sources to pursue

Use the [MOH KKMNOW utilisation dashboard](https://data.moh.gov.my/dashboard/hospital-bed-utilisation) and its documented export metadata for the utilisation follow-up; its displayed date is not proof that the two local CSVs share a date. The existing [MOH public-bed catalogue](https://data.gov.my/data-catalogue/hospital_beds) is the definition reference for the current series. These links identify source owners to investigate, not a promise that each requested historical dataset is available.

For population, retain the current [DOSM state](https://data.gov.my/data-catalogue/population_state) and [district](https://data.gov.my/data-catalogue/population_district) releases and their technical notes. The local files already extend through 2026, so more recent population alone is not the priority; matching geography and healthcare dates is.

The supplied Health Facts PDF is sufficient for selected 2024 national activity, causes and private-capacity context. A machine-readable transcription would improve reuse, but its absence does not mean admissions/causes data are wholly missing. A future transcription must retain panel numbers, units, submission/response notes and sector definitions and be verified independently against the PDF.

## Work that can proceed without additional numerical data after Task 01 approval

The public-sector state story for 2015–2024, national growth comparison, age profiles and 65+ shares are analytically supported. Map geometry repair and provenance work remain separate prerequisites. If utilisation history or private subnational data cannot be obtained, narrow the story explicitly to public capacity relative to resident population and treat unresolved pressure/access questions as limitations.

No additional source datasets were downloaded into the repository, and no source data was repaired in Task 01.
