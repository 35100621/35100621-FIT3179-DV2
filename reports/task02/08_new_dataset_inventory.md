# 08 — New dataset inventory and validation

Reviewed 15 October 2026 · Task 02 · Author: Codex (technical audit). No visualisations implemented.

**16 downloaded data-bearing files; 26 raw files including provenance.** Original datasets were not replaced. Full hashes and URLs: [manifest](../../data/additional/source_manifest.csv). Machine audit: [validation_results.json](../../data/additional/validation/validation_results.json), [extra_checks.json](../../data/additional/validation/extra_checks.json), [indicator_checks.json](../../data/additional/validation/indicator_checks.json), [UPI audit](../../data/additional/validation/upi_validation.json).

### Kod UPI_1303024.xlsx

145,673 bytes. Publisher: National Geospatial Centre (PGN). Period: Effective boundary date not stated in inspected sheet; HTTP modified 2024-03-18. Status: **reference only; land administration is not a statistical-district crosswalk**. Reuse: PGN copyright; no open redistribution licence verified.

One sheet `KOD UPI PINDAAN `, 3,321 rows ×8 columns after header. Columns are alternating codes/names for state, district/division, locality and section; all read as text. No duplicate complete rows or composite four-code keys. 26 missing state codes,25 state names,28 locality codes/names and 1,930 section codes/names. Some blanks may reflect spreadsheet layout; not forward-filled. `03 ` has trailing whitespace. State/district code08/06 has two names. 146 raw state-district pairs includes incomplete keys; do not equate this with 146 statistical districts.36 population-2024 district names are absent even in a permissive national name lookup. No geometry; date not proved by filename.

### PETUNJUK_KESIHATAN_2024.pdf

19,122,250 bytes. Publisher: MOH Health Informatics Centre. Period: Selected hospital tables 2023; other tables have their own periods. Status: **selected tables validated and reconciled; not every table audited**. Reuse: No explicit open licence verified; public redistribution not cleared.

Readable PDF, 217 pages; text extracted for all pages. Quantitative validation is limited to selected tables, not a certification of the entire publication. Physical page numbers below are one-based; printed pages are one lower.

### PETUNJUK_KESIHATAN_2025.pdf

25,100,291 bytes. Publisher: MOH Health Informatics Centre. Period: Selected hospital tables 2024; other tables have their own periods. Status: **selected tables validated and reconciled; not every table audited**. Reuse: All rights reserved, PDF p 3; written permission stated for reproduction; public redistribution not cleared.

Readable PDF, 225 pages; text extracted for all pages. Quantitative validation is limited to selected tables, not a certification of the entire publication. Physical page numbers below are one-based; printed pages are one lower.

### administrative_1_state.geojson

391,521 bytes. Publisher: DOSM. Period: Boundary vintage undocumented; repository commit 2022-06-22. Status: **semantic duplicates; invalid geometries retained**. Reuse: No licence verified; LICENSE/ LICENSE.txt requests failed.

16 features; CRS {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS 84'}}; schema `{'state': 'object', 'code_state': 'int64'}`; missing `{'state': 0, 'code_state': 0}`; duplicate property records 0; invalid geometry count 1. Exact JSON-value match to original: True. State invalid: Sarawak. District invalid: Kluang, Tangkak, Kota Setar, Timur Laut, Kota Kinabalu, Ranau and Penampang. No repairs applied.

### administrative_2_district.geojson

947,755 bytes. Publisher: DOSM. Period: Boundary vintage undocumented; repository commit 2022-06-22. Status: **semantic duplicates; invalid geometries retained**. Reuse: No licence verified; LICENSE/ LICENSE.txt requests failed.

160 features; CRS {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS 84'}}; schema `{'state': 'object', 'district': 'object', 'code_state': 'int64', 'code_district': 'int64', 'code_state_district': 'object'}`; missing `{'state': 0, 'district': 0, 'code_state': 0, 'code_district': 0, 'code_state_district': 0}`; duplicate property records 0; invalid geometry count 7. Exact JSON-value match to original: True. State invalid: Sarawak. District invalid: Kluang, Tangkak, Kota Setar, Timur Laut, Kota Kinabalu, Ranau and Penampang. No repairs applied.

### bedutil_01_table_facility.parquet

9,472 bytes. Publisher: MOH. Period: 2024-09-03 inferred by all-cell match to dated official series. Status: **duplicate snapshot; anomalies retained**. Reuse: MIT for parquet repository; CSV repository requests MOH attribution, exact policy unresolved.

149 rows × 8 columns. Duplicate complete records: 0. Tested key: `['state', 'hospital']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| hospital | object | 0 | 0.0 | — |
| state | object | 0 | 0.0 | — |
| beds_nonicu | float 64 | 40 | 26.846 | -4.0 to 1672.0 |
| util_nonicu | float 64 | 45 | 30.201 | -1525.0 to 110.77441077441077 |
| beds_icu | float 64 | 40 | 26.846 | 0.0 to 87.0 |
| util_icu | float 64 | 93 | 62.416 | 0.0 to 162.5 |
| vent | float 64 | 40 | 26.846 | 0.0 to 158.0 |
| util_vent | float 64 | 88 | 59.06 | 0.0 to 82.22222222222221 |

### bedutil_01_table_state.parquet

5,989 bytes. Publisher: MOH. Period: 2024-08-31 inferred by all-cell match to dated official series. Status: **duplicate snapshot; not simultaneous with facility snapshot**. Reuse: MIT for parquet repository; CSV repository requests MOH attribution, exact policy unresolved.

17 rows × 7 columns. Duplicate complete records: 0. Tested key: `['state']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| state | object | 0 | 0.0 | — |
| beds_nonicu | int 64 | 0 | 0.0 | 115 to 30860 |
| util_nonicu | float 64 | 0 | 0.0 | 0.0 to 83.09572301425662 |
| beds_icu | float 64 | 0 | 0.0 | 7.0 to 893.0 |
| util_icu | float 64 | 0 | 0.0 | 0.0 to 100.0 |
| vent | float 64 | 0 | 0.0 | 28.0 to 2176.0 |
| util_vent | float 64 | 0 | 0.0 | 0.0 to 55.3030303030303 |

### bedutil_02_timeseries_facility.parquet

231,427 bytes. Publisher: MOH. Period: 2023-09-07 to 2024-09-06. Status: **quarantine for pressure claims: negative capacity, extreme ratios and missingness**. Reuse: Repository MIT; retain copyright; wording refers to software/documentation.

52,746 rows × 9 columns. Duplicate complete records: 0. Tested key: `['date', 'state', 'hospital']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| date | object | 0 | 0.0 | — |
| hospital | object | 0 | 0.0 | — |
| state | object | 0 | 0.0 | — |
| beds_nonicu | float 64 | 8280 | 15.698 | -12.0 to 1800.0 |
| util_nonicu | float 64 | 9531 | 18.07 | -2662.5 to 134781.86813186813 |
| beds_icu | float 64 | 8279 | 15.696 | 0.0 to 87.0 |
| util_icu | float 64 | 31304 | 59.349 | 0.0 to 266.66666666666663 |
| vent | float 64 | 8279 | 15.696 | 0.0 to 158.0 |
| util_vent | float 64 | 28676 | 54.366 | 0.0 to 275.0 |

Observed date labels: 2023-09-07–2024-09-06; 354 distinct labels.

### bedutil_02_timeseries_state.parquet

98,208 bytes. Publisher: MOH. Period: 2023-09-07 to 2024-08-31. Status: **conditional: mismatched facility totals and reporting gaps**. Reuse: Repository MIT; retain copyright; wording refers to software/documentation.

6,048 rows × 8 columns. Duplicate complete records: 0. Tested key: `['state', 'date']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| date | object | 0 | 0.0 | — |
| state | object | 0 | 0.0 | — |
| beds_nonicu | int 64 | 0 | 0.0 | 110 to 40165 |
| util_nonicu | float 64 | 0 | 0.0 | 0.0 to 210.4006163328197 |
| beds_icu | float 64 | 22 | 0.364 | 0.0 to 1093.0 |
| util_icu | float 64 | 23 | 0.38 | 0.0 to 147.05882352941177 |
| vent | float 64 | 22 | 0.364 | 0.0 to 2709.0 |
| util_vent | float 64 | 23 | 0.38 | 0.0 to 72.8395061728395 |

Observed date labels: 2023-09-07–2024-08-31; 356 distinct labels.

### bedutil_facility.csv

9,211 bytes. Publisher: MOH. Period: 2024-09-03 inferred by all-cell match to dated official series. Status: **duplicate snapshot; anomalies retained**. Reuse: MIT for parquet repository; CSV repository requests MOH attribution, exact policy unresolved.

149 rows × 8 columns. Duplicate complete records: 0. Tested key: `['state', 'hospital']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| hospital | object | 0 | 0.0 | — |
| state | object | 0 | 0.0 | — |
| beds_nonicu | float 64 | 40 | 26.846 | -4.0 to 1672.0 |
| util_nonicu | float 64 | 45 | 30.201 | -1525.0 to 110.77441077441075 |
| beds_icu | float 64 | 40 | 26.846 | 0.0 to 87.0 |
| util_icu | float 64 | 93 | 62.416 | 0.0 to 162.5 |
| vent | float 64 | 40 | 26.846 | 0.0 to 158.0 |
| util_vent | float 64 | 88 | 59.06 | 0.0 to 82.22222222222221 |

### bedutil_state.csv

1,318 bytes. Publisher: MOH. Period: 2024-08-31 inferred by all-cell match to dated official series. Status: **duplicate snapshot; not simultaneous with facility snapshot**. Reuse: MIT for parquet repository; CSV repository requests MOH attribution, exact policy unresolved.

17 rows × 7 columns. Duplicate complete records: 0. Tested key: `['state']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| state | object | 0 | 0.0 | — |
| beds_nonicu | int 64 | 0 | 0.0 | 115 to 30860 |
| util_nonicu | float 64 | 0 | 0.0 | 0.0 to 83.09572301425662 |
| beds_icu | float 64 | 0 | 0.0 | 7.0 to 893.0 |
| util_icu | float 64 | 0 | 0.0 | 0.0 to 100.0 |
| vent | float 64 | 0 | 0.0 | 28.0 to 2176.0 |
| util_vent | float 64 | 0 | 0.0 | 0.0 to 55.3030303030303 |

### ckaps_private_hospitals.csv

29,166 bytes. Publisher: MOH Medical Practice Division / CKAPS. Period: Undated live licensed-hospital list; accessed 2026-10-15. Status: **conditional inventory: no coordinates/date; serial is not unique**. Reuse: No explicit open-data licence verified.

224 rows × 18 columns. Duplicate complete records: 0. Tested key: `[]`; duplicate keys: None.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| BIL | int 64 | 0 | 0.0 | 1 to 225 |
| NAMA_PENUH_FASILITI | object | 0 | 0.0 | — |
| ALAMAT | object | 0 | 0.0 | — |
| POSKOD | int 64 | 0 | 0.0 | 1000 to 98107 |
| BANDAR | object | 0 | 0.0 | — |
| NEGERI | object | 0 | 0.0 | — |
| JUMLAH_KATIL | int 64 | 0 | 0.0 | 2 to 812 |
| KERUSI_SANDAR | float 64 | 171 | 76.339 | 0.0 to 47.0 |
| BASINET | float 64 | 39 | 17.411 | 0.0 to 37.0 |
| KOT | float 64 | 139 | 62.054 | 1.0 to 19.0 |
| KATIL_KOT | float 64 | 204 | 91.071 | 2.0 to 34.0 |
| KOT_FOTOTERAPI | float 64 | 170 | 75.893 | 1.0 to 11.0 |
| KERUSI_DIALISIS | float 64 | 134 | 59.821 | 2.0 to 52.0 |
| KATIL_DIALISIS | float 64 | 203 | 90.625 | 1.0 to 21.0 |
| MOBILE_MESIN_DIALISIS | float 64 | 194 | 86.607 | 1.0 to 16.0 |
| KERUSI_PERGIGIAN | float 64 | 194 | 86.607 | 1.0 to 13.0 |
| MH_CHAMBER | float 64 | 223 | 99.554 | 2.0 to 2.0 |
| KATIL_BLOOD_DONOR | float 64 | 223 | 99.554 | 4.0 to 4.0 |

`BIL` has 10 duplicate values and is not an identifier. State + full name + address has no duplicate records. Read postcodes as text in future (leading zeros matter). 224 facilities sum to 21,195 beds; no national aggregate row; no coordinates/date. Ancillary chairs/cots/bassinets are different units and cannot be added to beds. No blank-to-zero filling.

### covid_hospital.csv

1,724,392 bytes. Publisher: MOH. Period: 2020-03-24 to 2025-05-31; dated epidemic reporting. Status: **conditional historical epidemic context; coverage gaps and excess occupancy**. Reuse: No repository LICENSE retrieved (404); attribution and reuse terms require confirmation.

29,765 rows × 14 columns. Duplicate complete records: 0. Tested key: `['state', 'date']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| date | object | 0 | 0.0 | — |
| state | object | 0 | 0.0 | — |
| beds | int 64 | 0 | 0.0 | 48 to 6568 |
| beds_covid | int 64 | 0 | 0.0 | 0 to 4713 |
| beds_noncrit | int 64 | 0 | 0.0 | 30 to 6224 |
| admitted_pui | int 64 | 0 | 0.0 | 0 to 451 |
| admitted_covid | int 64 | 0 | 0.0 | 0 to 789 |
| admitted_total | int 64 | 0 | 0.0 | 0 to 914 |
| discharged_pui | int 64 | 0 | 0.0 | 0 to 236 |
| discharged_covid | int 64 | 0 | 0.0 | 0 to 658 |
| discharged_total | int 64 | 0 | 0.0 | 0 to 732 |
| hosp_covid | int 64 | 0 | 0.0 | 0 to 4218 |
| hosp_pui | int 64 | 0 | 0.0 | 0 to 992 |
| hosp_noncovid | int 64 | 0 | 0.0 | 0 to 13131 |

Observed date labels: 2020-03-24–2025-05-31; 1891 distinct labels.

### covid_icu.csv

1,701,908 bytes. Publisher: MOH. Period: 2020-03-24 to 2025-05-31; dated epidemic reporting. Status: **conditional historical epidemic context; coverage gaps and excess occupancy**. Reuse: No repository LICENSE retrieved (404); attribution and reuse terms require confirmation.

29,605 rows × 16 columns. Duplicate complete records: 0. Tested key: `['state', 'date']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| date | object | 0 | 0.0 | — |
| state | object | 0 | 0.0 | — |
| beds_icu | int 64 | 0 | 0.0 | 4 to 247 |
| beds_icu_rep | int 64 | 0 | 0.0 | 0 to 227 |
| beds_icu_total | int 64 | 0 | 0.0 | 5 to 455 |
| beds_icu_covid | int 64 | 0 | 0.0 | 0 to 380 |
| vent | int 64 | 0 | 0.0 | 4 to 534 |
| vent_port | int 64 | 0 | 0.0 | 0 to 196 |
| icu_covid | int 64 | 0 | 0.0 | 0 to 532 |
| icu_pui | int 64 | 0 | 0.0 | 0 to 80 |
| icu_noncovid | int 64 | 0 | 0.0 | 0 to 135 |
| vent_covid | int 64 | 0 | 0.0 | 0 to 294 |
| vent_pui | int 64 | 0 | 0.0 | 0 to 41 |
| vent_noncovid | int 64 | 0 | 0.0 | 0 to 861 |
| vent_used | int 64 | 0 | 0.0 | 0 to 402 |
| vent_port_used | int 64 | 0 | 0.0 | 0 to 75 |

Observed date labels: 2020-03-24–2025-05-31; 1891 distinct labels.

### facilities_master.csv

955,590 bytes. Publisher: MOH. Period: 31 December 2025 per repository README. Status: **near duplicate; 16 address whitespace cells changed; coordinate anomalies persist**. Reuse: MOH attribution requested; specific licence unresolved.

5,160 rows × 20 columns. Duplicate complete records: 0. Tested key: `['KOD_FASILITI']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| Index | int 64 | 0 | 0.0 | 1 to 5729 |
| KOD_FASILITI | object | 0 | 0.0 | — |
| STATUS | object | 0 | 0.0 | — |
| SEKTOR | object | 0 | 0.0 | — |
| SUBSEKTOR | object | 0 | 0.0 | — |
| PROGRAM_GROUP | float 64 | 5160 | 100.0 | nan to nan |
| NEGERI | object | 0 | 0.0 | — |
| DAERAH | object | 0 | 0.0 | — |
| KATEGORI_FASILITI | object | 0 | 0.0 | — |
| JENIS_FASILITI | object | 0 | 0.0 | — |
| NAMA | object | 0 | 0.0 | — |
| ALAMAT | object | 1 | 0.019 | — |
| BANDAR | float 64 | 5160 | 100.0 | nan to nan |
| POSKOD | float 64 | 137 | 2.655 | 1000.0 to 99700.0 |
| DAERAH_PENTADBIRAN | object | 5153 | 99.864 | — |
| TELEFON | object | 4624 | 89.612 | — |
| EMEL | object | 5101 | 98.857 | — |
| URBAN_RURAL | float 64 | 5160 | 100.0 | nan to nan |
| LATITUD | float 64 | 0 | 0.0 | 0.9841142 to 48.019915 |
| LONGITUD | float 64 | 0 | 0.0 | 3.513038 to 119.2321153 |

### healthcare_staff.csv

25,802 bytes. Publisher: MOH / data.gov.my. Period: 2014–2022; annual year-end headcount. Status: **usable with scope caveat**. Reuse: CC BY 4.0.

765 rows × 4 columns. Duplicate complete records: 0. Tested key: `['state', 'type', 'date']`; duplicate keys: 0.

| Column | Parsed type | Missing | Missing % | Numeric range |
|---|---|---|---|---|
| state | object | 0 | 0.0 | — |
| type | object | 0 | 0.0 | — |
| date | object | 0 | 0.0 | — |
| staff | int 64 | 0 | 0.0 | 6 to 167690 |

Observed date labels: 2014-01-01–2022-01-01; 9 distinct labels.

### Definitions, aggregates and reconciliation

- **Workforce:** active public-sector healthcare headcount at 31 December, annual labels stored as 1 January. `all` equals doctor+nurse+nurse_community+dentist for every state-year; never sum all with components. Malaysia equals the 16 state totals. Actual column `type` differs from catalogue's `staff_type`. No missing or duplicate observations. 720state/type/year observations join population with zero unmatched records; bed overlap 2015–2022. Not an estimate of hospital staffing, FTE or staff on duty.
- **KKMNOW:** `beds_nonicu`, `beds_icu`, `vent` are counts; `util_*` percentages. Facility/state totals cannot be stacked together. State series includes Malaysia; exclude it when aggregating states.149 facility identifiers recur; hospital names are not a stable join to the facility register without a crosswalk. Four Parquet tables and two CSV snapshots have no duplicate tested keys, but nulls are substantial. Null ICU utilisation is not zero occupancy.
- **Dated snapshots:** all 894 facility metric cells match 3 September 2024 and all 102 state cells match 31 August 2024; the dated match is an inference supported by complete values, not embedded metadata in the CSV. Parquet table snapshots repeat the same values. The public master differs from the original in 16 address whitespace cells only; repository date does not repair its coordinate errors.
- **COVID hospital:**29,765×14,16 states,2020-03-24–2025-05-31. No nulls, negatives or duplicate state/dates.4whole missing days;555 missing combinations on the full 16-state daily grid.63 rows have patient stocks greater than beds. README warns state-date exhaustiveness is not guaranteed. `admitted_total` and `discharged_total` must not be assumed all-cause annual admissions; actual identity checks are in the supplemental audit. There is no Malaysia row.
- **COVID ICU:**29,605×16, same span and 16 states. No nulls/negatives/duplicate state-dates;4 whole missing days,715 missing combinations. Gazetted+repurposed beds equals total in every row.767 rows exceed total beds using COVID+PUI+non-COVID ICU stocks. No zero total-bed denominators. These component definitions are stronger than KKMNOW metadata, but coverage still needs explanation. State names match population; do not join daily stocks to annual bed counts as if denominators were interchangeable.

### Reviewed PDF tables and separately stored derivatives

| Extract |2023 source physical page/table|2024 source physical page/table|Validation and scope|
|---|---|---|---|
|`public_state_2023_2024.csv`|2024 PDF p 131 /4.1|2025PDF p 133 /4.1|34rows;10count fields plus provenance. Includes MOH hospitals, special institutions, other government hospitals and totals. All 34 public-bed observations exactly match original hospital_beds.csv. Aggregates must not be double-counted.|
|`private_state_2023_2024.csv`|2024 PDF p 136 /4.4|2025PDF p 137 /4.4|34rows; hospital count and licensed beds only. Excludes maternity/nursing/hospice/ambulatory beds.2023 Labuan dashes retained null;2024 explicit zeros retained. State reported values sum to published national totals both years.|
|`admissions_state_2023_2024.csv`|2024 PDF p 144 /4.11|2025PDF p 160 /4.13|34rows;5count measures plus provenance. Sector and national reported sums reconcile. KL private admissions includes Putrajaya: do not assign Putrajaya dash zero or compute separate territory private rates.|
|`moh_utilisation_state_2023_2024.csv`|2024 PDF pp 195–208 /4.61|2025PDF pp 140–152 /4.6|34rows; official/operational beds, BOR%, admissions, daily admissions, deaths, ALOS days and turnover days.16 state rows plus Malaysia per year; no missing/duplicate state-year records. Additive state sums match national beds, admissions, deaths. BOR and ALOS are not additive.|
|`capacity_comparison_2023_2024.csv`|Derived from above + population|Same|34 rows; matching state/year rates and ranks.2023 Labuan combined rate left null because private source is dash.2024 all 16 state joins complete. National population drawn from national CSV.|

Derivatives are in `data/additional/derived/`; raw-token, page, edition and table provenance are retained in source extracts. PDF text was checked against rendered2023/2024private-capacity and admissions pages and the 2024 utilisation total page. Public totals also cross-check independent original CSV cells. Header superscript 3 appended to Kuala Lumpur private admission values was explicitly removed as a footnote marker, not as a numeric digit. Dashes remain null. Melaka 2024 non-MOH zero-bed footnote says inpatient services suspended for building upgrading;0 is not missing.

MOH admissions from the sector table (hospital+special) match the utilisation table for all34state/year records. Special-institution pages repeat facilities already included in state totals; never append those pages as extra hospitals. The 2024 MOH annual table has 46,855 official and 44,570 operational beds; it does not cover all 52,048 government beds. A capacity-versus-occupancy comparison should use MOH-specific beds, not all-sector totals.

### Publication limitations and joins

Annual admissions 2023: MOH 100% submission, private 86.04% response.2024: MOH 97.94% submission, private 82.33% response. Sector changes mix real activity and reporting changes. Counts are episodes at provider location, not unique resident patients. Private admissions include other private care establishments, while the private bed extract is hospital-only: admissions-per-private-hospital-bed is unsuitable without matching scope.

Health Indicators 2025 cause table 4.12 (physical p 159) uses **discharges with ICD-11 codes**, despite its hospitalisation title; it is not the same measure as admission episodes. Its “All Causes” row is the listed top-ten subtotal 81.64%, not a 100% denominator.2023 and 2024 cause coding comparability needs review before time trends. Outpatient tables are available (2024 edition p 145;2025 p 161) but not extracted as ED visits;2025 English total column misleadingly says inpatient while table title is outpatient. No verified age-specific state-admission or ED series was acquired.

State joins are safe structurally with exact labels in reviewed PDF extracts. CKAPS needs explicit uppercase and WP name mapping, with no invented Labuan row. PGN UPI cannot bridge population statistical districts merely through similar names: land districts/divisions differ, especially in East Malaysia. Boundary copies keep the 160 feature geography while population expands to 166 districts in 2025–2026. No district historical comparison is certified.

### Reproduction and preservation

Run `validate_sources.py`, `extract_indicators.py`, `extra_checks.py` and `validate_upi.py` from `scripts/validation/` with Python, pandas, pyarrow, shapely, pdfplumber and openpyxl installed. The extraction script reads the cached full PDF page text; it does not alter source files. All 11 original SHA-256 hashes match `original_hashes.json`. Exact schemas and column-specific null percentages/ranges are provided above and in JSON. Support files (10) are read-only READMEs, licence, source configuration, repository tree and commit JSON; they are individually hashed in the manifest, not counted as new observational data.

### Derived-table completeness and ranges

All five extracts have unique year/state keys. Blank source dashes remain null; numerical ranges include aggregate rows and therefore are not state-only ranges. The capacity comparison has null national ranks by design and a null 2023 Labuan combined rate. These are not source defects.

**admissions_state_2023_2024.csv** — 34 rows, 11 columns, 0 duplicate year/state keys.

| Numeric field | Missing | Min | Max |
|---|---:|---:|---:|
| year | 0 | 2023.0000 | 2024.0000 |
| moh_hospital_admissions | 0 | 8558.0000 | 2613161.0000 |
| moh_special_admissions | 18 | 13.0000 | 133543.0000 |
| other_public_admissions | 14 | 0.0000 | 197530.0000 |
| private_admissions | 4 | 4378.0000 | 1362564.0000 |
| total_admissions | 0 | 8558.0000 | 4289884.0000 |
| pdf_page | 0 | 144.0000 | 160.0000 |
| table | 0 | 4.1100 | 4.1300 |

**capacity_comparison_2023_2024.csv** — 34 rows, 26 columns, 0 duplicate year/state keys.

| Numeric field | Missing | Min | Max |
|---|---:|---:|---:|
| year | 0 | 2023.0000 | 2024.0000 |
| moh_hospitals | 0 | 1.0000 | 139.0000 |
| moh_hospital_beds | 0 | 122.0000 | 41209.0000 |
| moh_special_institutions | 18 | 1.0000 | 11.0000 |
| moh_special_beds | 18 | 92.0000 | 5646.0000 |
| moh_total_facilities | 0 | 1.0000 | 150.0000 |
| moh_total_beds | 0 | 122.0000 | 46855.0000 |
| other_public_hospitals | 14 | 1.0000 | 14.0000 |
| other_public_beds | 14 | 0.0000 | 5193.0000 |
| public_total_facilities | 0 | 1.0000 | 164.0000 |
| public_total_beds | 0 | 122.0000 | 52048.0000 |
| pdf_page | 0 | 131.0000 | 133.0000 |
| table | 0 | 4.1000 | 4.1000 |
| private_hospital_beds | 1 | 0.0000 | 19920.0000 |
| population | 0 | 99.0000 | 34052.1000 |
| private_beds_for_combination | 1 | 0.0000 | 19920.0000 |
| combined_beds | 1 | 122.0000 | 71968.0000 |
| public_total_beds_per10000 | 0 | 11.1405 | 70.1579 |
| private_beds_for_combination_per10000 | 1 | 0.0000 | 17.7494 |
| combined_beds_per10000 | 1 | 12.1032 | 72.1530 |
| public_total_beds_rank | 2 | 1.0000 | 16.0000 |
| combined_beds_rank | 3 | 1.0000 | 16.0000 |
| private_share_percent | 1 | 0.0000 | 57.2146 |

**moh_utilisation_state_2023_2024.csv** — 34 rows, 13 columns, 0 duplicate year/state keys.

| Numeric field | Missing | Min | Max |
|---|---:|---:|---:|
| year | 0 | 2023.0000 | 2024.0000 |
| official_beds | 0 | 122.0000 | 46855.0000 |
| operational_beds | 0 | 122.0000 | 44570.0000 |
| bor_percent | 0 | 55.1000 | 81.9200 |
| admissions | 0 | 8558.0000 | 2744681.0000 |
| daily_admissions | 0 | 23.4500 | 7519.6700 |
| deaths | 0 | 180.0000 | 72339.0000 |
| alos_days | 0 | 2.7200 | 5.3900 |
| turnover_interval_days | 0 | 0.7900 | 3.0900 |
| pdf_page | 0 | 140.0000 | 208.0000 |
| table | 0 | 4.6000 | 4.6100 |

**private_state_2023_2024.csv** — 34 rows, 8 columns, 0 duplicate year/state keys.

| Numeric field | Missing | Min | Max |
|---|---:|---:|---:|
| year | 0 | 2023.0000 | 2024.0000 |
| private_hospitals | 1 | 0.0000 | 214.0000 |
| private_hospital_beds | 1 | 0.0000 | 19920.0000 |
| pdf_page | 0 | 136.0000 | 137.0000 |
| table | 0 | 4.4000 | 4.4000 |

**public_state_2023_2024.csv** — 34 rows, 16 columns, 0 duplicate year/state keys.

| Numeric field | Missing | Min | Max |
|---|---:|---:|---:|
| year | 0 | 2023.0000 | 2024.0000 |
| moh_hospitals | 0 | 1.0000 | 139.0000 |
| moh_hospital_beds | 0 | 122.0000 | 41209.0000 |
| moh_special_institutions | 18 | 1.0000 | 11.0000 |
| moh_special_beds | 18 | 92.0000 | 5646.0000 |
| moh_total_facilities | 0 | 1.0000 | 150.0000 |
| moh_total_beds | 0 | 122.0000 | 46855.0000 |
| other_public_hospitals | 14 | 1.0000 | 14.0000 |
| other_public_beds | 14 | 0.0000 | 5193.0000 |
| public_total_facilities | 0 | 1.0000 | 164.0000 |
| public_total_beds | 0 | 122.0000 | 52048.0000 |
| pdf_page | 0 | 131.0000 | 133.0000 |
| table | 0 | 4.1000 | 4.1000 |

