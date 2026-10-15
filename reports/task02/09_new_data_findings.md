# 09 — New numerical findings

Reviewed 15 October 2026 · Task 02 · Author: Codex (technical audit). No visualisations implemented.

All findings refer to observed source periods, not October 2026 conditions. Original Task 01 growth/ageing findings remain valid. Files named below are under `data/additional/` unless identified as original files in `data/original/`. Derived CSVs retain source edition, table and physical page. Reproduce with `scripts/validation/extract_indicators.py` and the other audit scripts.

### 1. Private capacity changes the regional comparison

Health Indicators 2025 table 4.4 (physical p 137, reporting 31 December 2024) lists **214 private hospitals and 19,920 hospital beds**. This exactly reconciles to the original Health Facts 2025 national total. Public table 4.1 (p 133) reports **52,048 government beds**, comprising 41,209 MOH hospital beds, 5,646 MOH special-institution beds and 5,193 other-government beds. Public plus private hospital capacity is **71,968 beds**, or **21.13 per 10,000 residents**, versus **15.28 public beds per 10,000**. Private hospital beds are **27.68%** of that defined combined total.

This combined measure is public hospital/special-institution official beds plus licensed private hospital beds. It is not a count of staffed, available acute beds. Private maternity, nursing, hospice and ambulatory beds are excluded; official public and licensed private capacities have different operational meanings.

Formula: `combined_beds = public_total_beds + private_hospital_beds`; `rate_per10000 = beds * 10 / population_in_thousands`. Join year/state to original population_state.csv, filtered sex=both, age=overall, ethnicity=overall. Use population_malaysia.csv for national denominators. For ranks, exclude Malaysia, rank descending across 16 states/territories with minimum-rank tie handling. No ties occur in 2024.

| State | Public beds/10k | Combined beds/10k | Public rank | Combined rank | Private share % |
|---|---|---|---|---|---|
| Johor | 13.02 | 17.74 | 12.0 | 11.0 | 26.61 |
| Kedah | 13.17 | 17.0 | 11.0 | 14.0 | 22.53 |
| Kelantan | 15.82 | 17.01 | 9.0 | 13.0 | 6.98 |
| Melaka | 12.89 | 21.7 | 13.0 | 6.0 | 40.6 |
| Negeri Sembilan | 15.95 | 21.83 | 7.0 | 5.0 | 26.94 |
| Pahang | 15.87 | 20.45 | 8.0 | 7.0 | 22.4 |
| Perak | 23.43 | 28.34 | 3.0 | 3.0 | 17.32 |
| Perlis | 17.42 | 19.47 | 4.0 | 8.0 | 10.55 |
| Pulau Pinang | 11.82 | 27.64 | 15.0 | 4.0 | 57.21 |
| Sabah | 13.62 | 14.72 | 10.0 | 15.0 | 7.45 |
| Sarawak | 16.64 | 19.06 | 5.0 | 9.0 | 12.69 |
| Selangor | 11.32 | 18.78 | 16.0 | 10.0 | 39.74 |
| Terengganu | 16.0 | 17.2 | 6.0 | 12.0 | 6.94 |
| W.P. Kuala Lumpur | 26.59 | 44.01 | 2.0 | 2.0 | 39.58 |
| W.P. Labuan | 12.1 | 12.1 | 14.0 | 16.0 | 0.0 |
| W.P. Putrajaya | 70.16 | 72.15 | 1.0 | 1.0 | 2.76 |

**Pulau Pinang moves from 15th to 4th; Selangor from 16th to 10th; Melaka from 13th to 6th.** Sabah moves from 10th to 15th and Labuan from 14th to 16th. The result materially changes a public-only “divide” narrative. It does not demonstrate affordable access, adequate staffing or lower unmet need. Residents can receive care across state borders; a territorial denominator does not define a hospital catchment.

Selangor (5,496), Kuala Lumpur (3,602) and Pulau Pinang (2,847) contain **11,945 / 19,920 = 59.96%** of licensed private hospital beds. Pulau Pinang's private beds represent **57.21%** of its combined capacity. Sources and calculations: `derived/private_state_2023_2024.csv`, `derived/capacity_comparison_2023_2024.csv`, year=2024; sum the named states only, never add Malaysia.

### 2. Two years of private supply are now comparable

From the 2024 and 2025 publications' table 4.4 (physical pp136/137), national private hospital beds rose **18,779 → 19,920**, an increase of **1,141 (6.08%)**, while licensed hospital counts rose **212 → 214**. Public beds rose **51,100 → 52,048**, or **948 (1.86%)**. Combined beds rose **69,879 → 71,968**, or **2,089 (2.99%)**, in 2023–2024. Combined national beds per 10,000 rose **20.92 → 21.13** using matching original population estimates.

Formula: `(2024 / 2023 - 1)*100`. Private growth contributed `1,141 / 2,089 = 54.62%` of the combined bed increase. These are two observed year-end stocks, not a verified decade-long private trend. Changes in licensing or institutional classifications may affect facility counts. The 2023 Labuan private dash is preserved as missing; no combined Labuan 2023 rank is manufactured. National totals are explicitly supplied in both years.

The live CKAPS register contains **224 records and 21,195 beds**, with no duplicate state/name/address keys. Its **10 duplicate serial numbers** make `BIL` unsuitable as a key. Without a reporting date, the difference from 214 hospitals/19,920 beds is **not evidence of growth since 2024**. No national row or coordinates exists; current list geography cannot silently replace dated annual tables.

### 3. Annual utilisation can be used with a limited claim

The MOH annual tables report **72.61% national bed occupancy in 2024**, compared with **73.25% in 2023**: a **0.64 percentage-point decline in the published annual rate**. These are source-reported rates, not averages calculated from daily KKMNOW percentages. In 2024, **46,855 official MOH beds versus 44,570 operational beds** differ by **2,285 (4.88% of official capacity)**. An official-bed count is not synonymous with operational availability; the difference alone does not identify why beds were unavailable.

The 2024 state annual BOR ranges from **60.68% in Labuan to 81.92% in Kedah**; Negeri Sembilan is **80.67%** and Johor **79.58%**. These state averages hide hospital/ward variation and seasonality. Do not label a state “safe”, “overloaded” or “short of beds” using an unverified threshold.

Source: `derived/moh_utilisation_state_2023_2024.csv`, 2025 PDF table 4.6 pp 140–152 and 2024 PDF table 4.61 pp 195–208. State sums of official beds, operational beds, admissions and deaths reconcile exactly to their national rows. MOH hospital+special-institution admissions from the sector tables match all 34 state/year utilisation records. Special-institution summary pages repeat rows already included geographically: never sum them again. BOR/ALOS/turnover are not additive.

The published special-institution summary reports Hospital Tunku Azizah BOR **102.67% in 2024** (2025 PDF p 153) and **105.59% in 2023** (2024 PDF p 209), with negative turnover intervals. Thus, above-100 occupancy is not automatically a transcription error. The inspected tables do not fully document the bed-day denominator or changes during the year. Retain the published rate and its context; do not infer that every >100 daily dashboard observation is valid. Annual rates are usable as **reported MOH utilisation**, not current ICU/non-ICU pressure. Public reuse conditions remain unresolved.

### 4. Admissions add activity, but not a clean demand-growth estimate

In 2024, reported MOH hospital admissions were **2,579,373**, special-institution admissions **133,543**, other-government admissions **197,530**, and private-sector admissions **1,359,910**, totalling **4,270,356 episodes**. MOH hospital plus special admissions equal **2,712,916**, exactly matching the annual utilisation table. The same reconciliation holds for 2023.

MOH hospital admissions changed **2,613,161 → 2,579,373 (-1.29%)** and reported private admissions **1,362,564 → 1,359,910 (-0.19%)**. **Do not interpret these as demand declines**: MOH submission fell from **100% to 97.94%**, private response from **86.04% to 82.33%**. No response-rate inflation or missing-activity estimates were applied.

Pulau Pinang reported **203,376 private-sector admissions versus 139,808 MOH hospital admissions** in 2024. This is a useful provider-mix observation, but private reporting includes maternity/nursing/hospice institutions, and admissions are episodes rather than unique patients or resident incidence. Kuala Lumpur private figures include Putrajaya; combine those territories for an eventual private-activity rate or omit territorial private rates. Do not divide broad private admissions by hospital-only private beds.

Sources: `derived/admissions_state_2023_2024.csv`, 2024 PDF table 4.11 p 144, 2025 PDF table 4.13 p 160. Geographic totals locate providers, not patient origins. Annual capacity-versus-activity analysis is feasible at MOH state level using matching MOH scope; it cannot prove that low capacity causes high occupancy.

Cause tables require care: 2025 PDF table 4.12 p 159 counts **discharges with ICD-11 codes**, not admission episodes. Respiratory discharges are 543,686 (14.13% of coded discharges). Its displayed 3,140,944 /81.64% “All Causes” row is the sum of its ten listed categories, not the full denominator. Cross-edition trends and comparisons to Health Facts cause percentages need coding/denominator review.

### 5. Dated daily exports resolve timestamps, not quality

The original facility snapshot matches **3 September 2024** in all **894/894 metric cells across 149 hospitals**; the original state snapshot matches **31 August 2024**, **102/102 cells across 17 rows**. Matching used state/hospital keys, NaN equality and numeric tolerance 1e-9. The dashboard's 6 September update label must not override these results.

Historical facility data contain **52,746 records across 354 days**, 7 September 2023–6 September 2024, with **12 whole missing dates**. Non-ICU utilisation is missing in **18.07%** of rows and ICU utilisation in **59.35%**. There are **194 negative non-ICU bed counts**: Limbang 100, Segamat 48, Port Dickson 33, Banting 13. Limbang's original -4 beds/-1525% is preserved. The maximum non-ICU utilisation is **134,781.87%**, Hospital Shah Alam on 14 October 2023, alongside 364 reported beds. This is not credible evidence for a pressure story without source correction.

State history has **6,048 rows across 356 days**, through 31 August 2024, four whole missing dates plus four missing Labuan state-days. Even after matching dates, **2,797 of 5,516 common state-days** have non-ICU capacities differing from the summed facility records (ICU 3,425; ventilators 3,767). Reporting population/aggregation cannot be assumed consistent. Never average hospital percentages to make a state rate.

The investigation therefore does **not** clear raw KKMNOW history for a sustained-pressure narrative. It provides precise diagnostics for future source clarification. No negative values were corrected, >100 rates clipped or missingness filled.

### 6. An alternative epidemic series supplies explicit components

The MOH COVID hospital/ICU files run **24 March 2020–31 May 2025**, with 29,765 and 29,605 state-day rows respectively. The ICU identity `beds_icu + beds_icu_rep = beds_icu_total` holds in every row. Hospital `admitted_total = admitted_covid + admitted_pui` and the equivalent discharge identity also hold in every row: these totals **exclude non-COVID flows**, despite the presence of non-COVID occupancy stocks. They are unsuitable as total hospital-demand measures.

Missing state-date combinations (555 hospital,715 ICU) and occupancy exceeding capacity (63 hospital,767 ICU rows) remain. Source documentation explicitly warns that not every state/date must be represented. An epidemic historical context view is conditional on cohort/coverage review; it is not a replacement for all-hospital 2024 occupancy or evidence of current strain. Daily hospital, ICU and annual counts must remain separate.

### 7. Workforce is a new, reproducible contextual dimension

Public-sector doctors increased **33,545 → 58,193 (+73.48%)** between 2015 and 2022; registered nurse category headcount **69,590 → 79,397 (+14.09%)**. Doctors per 10,000 residents rose **10.76 → 17.80**; nurses **22.31 → 24.28**. Community nurses remain a separate source category and are excluded from these nurse values.

Source: raw/healthcare_staff.csv, state=Malaysia, type=doctor or nurse, dates2015-01-01/2022-01-01; join national population on year with both/overall/overall totals; rate=staff×10/population. State comparisons have complete matched population years; bed overlap 2015–2022. `all` and Malaysia are aggregate rows, not extra staff. Counts are active public healthcare workers, not hospital FTE, shifts or bedside availability; there is no justified staff-per-hospital-bed productivity claim.

### 8. Geography and attribution still limit readiness

DOSM's downloaded state/district polygons reproduce the original geometries, including one invalid state and seven invalid districts. PGN's code workbook provides useful administrative identifiers but contains blanks and land-district/division units that do not match the statistical-district universe. It is not an automatic remedy for the original 15 name mismatches or six newer population districts.

The strongest new geographic analysis is **state-level public/private capacity**, not private facility points or travel access. A fourth meaningful map is still unconfirmed. All 11 original hashes remain unchanged; no source correction or visualisation has been made.
