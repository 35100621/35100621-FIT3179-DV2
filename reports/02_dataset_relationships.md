# 02 — Dataset relationships

Audit date: 15 October 2026. Author: Codex, for FIT3179 Task 01 review. Scope: read-only source audit; no webpage or charts implemented.

## Grain and aggregation rules

Bed national totals use `state="Malaysia", district="All", type="all"`. State totals use `district="All Districts", type="all"`; district details exclude both `All` and `All Districts`. Population totals use `sex="both", age="overall", ethnicity="overall"`. A selected age profile instead uses individual age bins with ethnicity overall and either both sexes or male/female separately. Never sum totals with their components.

Tests found zero logical-key duplicates in all four dated CSVs. Bed type components sum exactly to type=all at every geographic/year key. District totals sum exactly to state totals and states to national totals for all ten years. This arithmetic does not establish current district-boundary equivalence.

| Dataset A → B | Join key / grain | Years | Expected relationship | Observed matching | Status and risk |
| --- | --- | --- | --- | --- | --- |
| hospital_beds → population_malaysia | date; national filters above | 2015–2024 | 1:1 | 10/10 years; 0 unmatched bed rows | Safe descriptive public beds/residents; year-end numerator versus mid-year denominator |
| hospital_beds → population_state | state,date; state-total filters | 2015–2024 | 1:1 | 160/160 state-years; 0 unmatched | Safe at state grain; no private capacity, residents are not catchment population |
| hospital_beds → population_district | state,district,date; detail totals | 2020–2024 | 1:1 after validated crosswalk | 2024 exact: 138 matches, 15 bed-only, 22 population-only | Conditional; district geography and name changes unresolved |
| population_state → state GeoJSON | state; filter one year/demographic slice | 1970–2026; all 16 since 2010 | many years:1 geometry | 2024 16/16; no name mismatch | Conditional mapping: Sarawak geometry invalid; older territories have different historical coverage |
| hospital_beds → state GeoJSON | state; state totals | 2015–2024 | many years:1 geometry | 16/16 each year | Conditional map repair/vintage; do not count Malaysia as 17th polygon |
| population_district → district GeoJSON | state,district; one demographic slice | 2020–2024 | 1:1 per year | 160/160 each year | Conditional geometry repair and vintage; seven invalid features |
| population_district → district GeoJSON | state,district | 2025–2026 | 1:1 expected | 160/166 names match; 6 population-only each year | Unsuitable as a complete current map; parent areas also need revision |
| hospital_beds → district GeoJSON | state,district; type=all details | 2024 | 1:1 expected | 138 matches, 15 bed-only, 22 boundary-only | Conditional crosswalk, geometry repair and boundary verification |
| bedutil_facility → facilities_master | state + normalised hospital/NAMA; hospital subset | Both undated | 1:1 intended | 133/149 exact normalised matches; 16 utilisation-only; 33 registry-only | Conditional manual facility-ID crosswalk; names can change; date unknown |
| bedutil_state → population_state or annual beds | state plus date required | Utilisation date absent | 1:1 if compatible | All 16 state names match; Malaysia must be handled separately | Unsuitable for dated capacity-pressure claims until snapshot and population coverage verified |
| bedutil_facility → bedutil_state | state aggregation, matching timestamp required | Undated | many:1 | 16/16 names match; all three capacity totals agree in only Melaka, Perlis and Labuan | Unsuitable to reconcile/merge as one snapshot; weighted rates also disagree |
| facilities_master → state boundaries | normalised NEGERI; coordinates as diagnostic | Undated | many:1 | 166 hospital state names map; 163 coordinates covered, 3 fail | Conditional location map; state polygon invalidity/simplification can affect point test |
| facilities_master → district statistics | state + DAERAH or spatial point-in-polygon | Undated | many:1 intended | No stable common district ID; DAERAH_PENTADBIRAN missing for every hospital | Conditional; do not equate health/administrative districts or auto-fuzzy-join |
| population_state → population_malaysia | date after aggregation; matched demographic filters | 2015–2024 tested totals | many:1 | State sums within 0.2 thousand of national totals | Safe rounded consistency check; use published national denominator for national rate |
| population_district → population_state | state,date after aggregation; total filters | 2020–2026 | many:1 | All 112 state-years reconcile within 0.3 thousand | Conditional historical comparability; ordinary rounding differences |
| PDF capacity → hospital_beds | year=2024 + equivalent public categories | 2024 | aggregate cross-check | 41,209 + 5,646 + 508 + 4,685 = 52,048 | Safe national reconciliation; private PDF capacity is additional, not hospital_non_moh |
| PDF causes/admissions → state/district datasets | No state/district key | 2024 | No supported relationship | All subnational values unavailable | Unsuitable; never allocate national admissions by population/bed shares |

## District crosswalk proposal — not applied to sources

The following 15 candidate substitutions remove all unmatched bed labels in a name-only 2024 trial: 153 matched bed records, zero residual bed-only names and seven population/boundary-only districts. This improves string matching only. Every row remains conditional on authoritative naming and boundary history; old aggregates may include newer districts. Do not fill the seven unmatched areas with zero.

| State | Bed label | Candidate population/boundary label |
| --- | --- | --- |
| Johor | Kulaijaya | Kulai |
| Johor | Ledang | Tangkak |
| Perak | Batang Padang (Tapah) | Batang Padang |
| Perak | Kinta (Ipoh) | Kinta |
| Perak | Larut & Matang (Taiping) | Larut Dan Matang |
| Perak | Manjung (Sitiawan) | Manjung |
| Pulau Pinang | Seberang Perai Utara (Butterworth) | Seberang Perai Utara |
| Pulau Pinang | Timur Laut (Georgetown) | Timur Laut |
| Sabah | Kota Penyu | Kuala Penyu |
| Sabah | Tongad | Tongod |
| Sarawak | Meradong | Maradong |
| Selangor | Gombak (Rawang) | Gombak |
| Selangor | Hulu Langat (Bangi) | Ulu Langat |
| Selangor | Hulu Selangor | Ulu Selangor |
| Selangor | Petaling (Subang Jaya) | Petaling |

Remaining seven population/boundary-only keys:

| state | district |
| --- | --- |
| Kelantan | Kecil Lojing |
| Perak | Bagan Datuk |
| Perak | Muallim |
| Perak | Selama |
| Sabah | Kalabakan |
| Sarawak | Telang Usan |
| Terengganu | Kuala Nerus |

Telang Usan has zero bed records in 2015–2021 and disappears entirely in 2022–2024. Absence after 2021 must not be interpreted as a verified zero. Additional 2025–2026 population districts absent from boundaries: Sabah/Membakut and Sarawak/Gedong, Sebuyau, Lingga, Siburan, Pantu.

Store a future crosswalk separately with source name, canonical name, state, effective years, rationale, authoritative evidence and review status. Where boundaries split, aggregate both numerator and denominator to a verified common ancestor, or obtain reallocated beds; do not simply rename a historical area. Use code_state_district only after confirming its version.

## Facility names and coordinates

Normalisation tested: uppercase, trim, collapse whitespace and replace literal `\n` with space; map `WILAYAH PERSEKUTUAN ...` to `W.P. ...`. Hospital-only registry keys are unique after this normalisation. No fuzzy matches were accepted. The unmatched utilisation names are:

| state | hospital |
| --- | --- |
| Johor | Hospital Sultanah Aminah |
| Johor | Hospital Pakar Sultanah Fatimah |
| Johor | Hospital Temenggong Seri Maharaja Tun Ibrahim |
| Kelantan | Hospital Raja Perempuan Zainab II |
| Kelantan | Hospital Tengku Anis |
| Negeri Sembilan | Hospital Tuanku Ampuan Najihah |
| Negeri Sembilan | Hospital Tuanku Ja'afar |
| Pahang | Hospital Tengku Ampuan Afzan |
| Pahang | Hospital Sultan Hj Ahmad Shah |
| Perak | Hospital Changkat Melintang |
| Selangor | Hospital Sungai Buloh |
| Selangor | Hospital Kajang |
| Selangor | Hospital Serdang |
| Terengganu | Hospital Sultanah Nur Zahirah |
| Sabah | Hospital Wanita Dan Kanak-Kanak |
| W.P. Kuala Lumpur | Hospital Universiti Kebangsaan Malaysia |

Hospital Tuanku Fauziah is labelled Perlis but located at 4.674394, 101.150932, inside the supplied Perak polygon; it shares those exact coordinates with Hospital Bahagia Ulu Kinta. Hospital Semporna (4.483205, 118.604336) and Hospital Mukah (2.902170, 112.077800) also fall outside their supplied state polygons; coastal simplification and Sarawak invalidity must be distinguished from bad coordinates. Do not auto-relocate these points. Facility coverage is undated, so registry counts cannot be reconciled to year-end 2024 counts as if contemporaneous.

## Utilisation mismatch

| Metric | Sum of facility values | Sum of 16 state values |
| --- | --- | --- |
| beds_nonicu | 31957.0 | 30860 |
| beds_icu | 1054.0 | 893.0 |
| vent | 2399.0 | 2176.0 |

The facility sums above deliberately retain source anomalies for diagnosis; they are not publishable capacity estimates. State totals and bed-weighted utilisation reconstruct the Malaysia row exactly within floating-point precision. Internal agreement does not validate dates or data quality.
