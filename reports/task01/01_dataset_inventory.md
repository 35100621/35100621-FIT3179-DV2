# 01 — Dataset inventory

Audit date: 15 October 2026. Author: Codex, for FIT3179 Task 01 review. Scope: read-only source audit; no webpage or charts implemented.

## Discovery and method

Recursively scanned every file under the project root, including hidden paths, for CSV, JSON, GeoJSON, TopoJSON, XLSX and PDF extensions. Found **11 source files: 7 CSV, 3 GeoJSON and 1 PDF**. No separate JSON, TopoJSON or XLSX source exists. At the time of the audit, the instruction file was `agents.md` (now `AGENTS.md`); its complete instructions were followed. No standalone admissions/cause CSV exists, but both subjects are present in the PDF.

CSV records were parsed with pandas; blank cells and parser-recognised NA tokens were counted as missing. Numeric ranges, complete-row duplicates and relevant logical-key duplicates were checked. ISO date strings were checked as year labels. GeoJSON was parsed and every geometry tested with Shapely/GEOS. PDF text was extracted and relevant panels visually checked. External documentation was consulted on the audit date to interpret units, without replacing local datasets. File hashes below provide preservation evidence.

| Relative path | Bytes | Dimensions | Observed coverage |
| --- | --- | --- | --- |
| data/original/bedutil_facility.csv | 9210 | 149 × 8 | Undated |
| data/original/bedutil_state.csv | 1317 | 17 × 7 | Undated |
| data/original/facilities_master.csv | 955489 | 5,160 × 20 | Undated |
| data/original/hospital_beds.csv | 325576 | 6,828 × 5 | 2015-01-01 to 2024-01-01 |
| data/original/population_district.csv | 24637855 | 451,668 × 7 | 2020-01-01 to 2026-01-01 |
| data/original/population_malaysia.csv | 677857 | 17,814 × 5 | 1970-01-01 to 2026-01-01 |
| data/original/population_state.csv | 12568035 | 270,063 × 6 | 1970-01-01 to 2026-01-01 |
| data/geographic/original/administrative_0_malaysia.geojson | 306327 | 1 features | Boundary vintage undocumented |
| data/geographic/original/administrative_1_state.geojson | 391520 | 16 features | Boundary vintage undocumented |
| data/geographic/original/administrative_2_district.geojson | 947754 | 160 features | Boundary vintage undocumented |
| data/original/HEALTH_FACTS_2025.pdf | 1799782 | 2 physical sheets; 17 numbered panels + cover | 2021–2025 across topics; hospital data 2024, some 2023 |

## hospital_beds.csv

MOH; matched schema and definitions in the [official catalogue](https://data.gov.my/data-catalogue/hospital_beds). Public-sector bed counts; annual date is a year label for year-end capacity. Non-MOH means other government agencies, not private hospitals. Local download provenance was not supplied.

Contains national, state and district aggregates plus type=all alongside its three components. Never sum all rows. District coverage changes from 154 to 153 in 2022. District names/boundaries need reconciliation; private beds absent.

| Column | Parsed type / role | Missing n | Missing % | Distinct non-null |
| --- | --- | --- | --- | --- |
| date | ISO annual date stored as text | 0 | 0.0000 | 10 |
| state | object | 0 | 0.0000 | 17 |
| district | object | 0 | 0.0000 | 156 |
| type | object | 0 | 0.0000 | 4 |
| beds | int64 | 0 | 0.0000 | 515 |

Complete-row duplicates: **0**. Logical key = date, state, district, type; duplicate keys: 0. All bed values are non-negative integers.

| Year label | Rows |
| --- | --- |
| 2015-01-01 | 684 |
| 2016-01-01 | 684 |
| 2017-01-01 | 684 |
| 2018-01-01 | 684 |
| 2019-01-01 | 684 |
| 2020-01-01 | 684 |
| 2021-01-01 | 684 |
| 2022-01-01 | 680 |
| 2023-01-01 | 680 |
| 2024-01-01 | 680 |

No skipped years between the observed endpoints. January 1 is the annual label, not a measured observation on that day.

**type values:** `all`, `hospital_moh`, `hospital_non_moh`, `special_medical_institution`.

**Geographic coverage:** Malaysia, Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Perak, Perlis, Pulau Pinang, Sabah, Sarawak, Selangor, Terengganu, W.P. Kuala Lumpur, W.P. Labuan, W.P. Putrajaya.

## population_malaysia.csv

DOSM; [official national catalogue](https://data.gov.my/data-catalogue/population_malaysia). Population values are thousands of people. Census-year values (1970, 1980, 1991, 2000, 2010, 2020) are adjusted census data; other years are mid-year estimates. Local download provenance was not supplied.

Do not add both sexes to male/female, overall age to individual ages, or overall ethnicity to ethnic categories. Older age bins change across 1970–1979, 1980–1990 and 1991 onward. One-decimal rounding prevents exact component reconciliation.

| Column | Parsed type / role | Missing n | Missing % | Distinct non-null |
| --- | --- | --- | --- | --- |
| date | ISO annual date stored as text | 0 | 0.0000 | 57 |
| sex | object | 0 | 0.0000 | 3 |
| age | object | 0 | 0.0000 | 21 |
| ethnicity | object | 0 | 0.0000 | 9 |
| population | float64 | 0 | 0.0000 | 7066 |

Complete-row duplicates: **0**. Logical key = date, sex, age, ethnicity; duplicate keys: 0.

| Year label | Rows |
| --- | --- |
| 1970-01-01 | 48 |
| 1971-01-01 | 48 |
| 1972-01-01 | 48 |
| 1973-01-01 | 48 |
| 1974-01-01 | 48 |
| 1975-01-01 | 48 |
| 1976-01-01 | 48 |
| 1977-01-01 | 48 |
| 1978-01-01 | 48 |
| 1979-01-01 | 48 |
| 1980-01-01 | 270 |
| 1981-01-01 | 270 |
| 1982-01-01 | 270 |
| 1983-01-01 | 270 |
| 1984-01-01 | 270 |
| 1985-01-01 | 270 |
| 1986-01-01 | 270 |
| 1987-01-01 | 270 |
| 1988-01-01 | 270 |
| 1989-01-01 | 270 |
| 1990-01-01 | 270 |
| 1991-01-01 | 399 |
| 1992-01-01 | 399 |
| 1993-01-01 | 399 |
| 1994-01-01 | 399 |
| 1995-01-01 | 399 |
| 1996-01-01 | 399 |
| 1997-01-01 | 399 |
| 1998-01-01 | 399 |
| 1999-01-01 | 399 |
| 2000-01-01 | 399 |
| 2001-01-01 | 399 |
| 2002-01-01 | 399 |
| 2003-01-01 | 399 |
| 2004-01-01 | 399 |
| 2005-01-01 | 399 |
| 2006-01-01 | 399 |
| 2007-01-01 | 399 |
| 2008-01-01 | 399 |
| 2009-01-01 | 399 |
| 2010-01-01 | 399 |
| 2011-01-01 | 399 |
| 2012-01-01 | 399 |
| 2013-01-01 | 399 |
| 2014-01-01 | 399 |
| 2015-01-01 | 399 |
| 2016-01-01 | 399 |
| 2017-01-01 | 399 |
| 2018-01-01 | 399 |
| 2019-01-01 | 399 |
| 2020-01-01 | 399 |
| 2021-01-01 | 399 |
| 2022-01-01 | 399 |
| 2023-01-01 | 399 |
| 2024-01-01 | 399 |
| 2025-01-01 | 399 |
| 2026-01-01 | 399 |

No skipped years between the observed endpoints. January 1 is the annual label, not a measured observation on that day.

**sex values:** `both`, `female`, `male`.

**age values:** `0-4`, `10-14`, `15-19`, `20-24`, `25-29`, `30-34`, `35-39`, `40-44`, `45-49`, `5-9`, `50-54`, `55-59`, `60-64`, `65-69`, `70+`, `70-74`, `75-79`, `80+`, `80-84`, `85+`, `overall`.

**ethnicity values:** `bumi`, `bumi_malay`, `bumi_other`, `chinese`, `indian`, `other`, `other_citizen`, `other_noncitizen`, `overall`.

## population_state.csv

DOSM; [official state catalogue](https://data.gov.my/data-catalogue/population_state). Units: thousands. Adjusted census observations and intercensal estimates, with changing historical age/ethnicity categories. Local download provenance was not supplied.

Same aggregate traps as national population. Federal territories start later: Kuala Lumpur 1980, Labuan 1991, Putrajaya 2010. Historical predecessor-state coverage changes prevent naive long-run state comparisons.

| Column | Parsed type / role | Missing n | Missing % | Distinct non-null |
| --- | --- | --- | --- | --- |
| state | object | 0 | 0.0000 | 16 |
| date | ISO annual date stored as text | 0 | 0.0000 | 57 |
| sex | object | 0 | 0.0000 | 3 |
| age | object | 0 | 0.0000 | 21 |
| ethnicity | object | 0 | 0.0000 | 9 |
| population | float64 | 0 | 0.0000 | 7112 |

Complete-row duplicates: **0**. Logical key = state, date, sex, age, ethnicity; duplicate keys: 0.

| Year label | Rows |
| --- | --- |
| 1970-01-01 | 624 |
| 1971-01-01 | 624 |
| 1972-01-01 | 624 |
| 1973-01-01 | 624 |
| 1974-01-01 | 624 |
| 1975-01-01 | 624 |
| 1976-01-01 | 624 |
| 1977-01-01 | 624 |
| 1978-01-01 | 624 |
| 1979-01-01 | 624 |
| 1980-01-01 | 3780 |
| 1981-01-01 | 3780 |
| 1982-01-01 | 3780 |
| 1983-01-01 | 3780 |
| 1984-01-01 | 3780 |
| 1985-01-01 | 3780 |
| 1986-01-01 | 3780 |
| 1987-01-01 | 3780 |
| 1988-01-01 | 3780 |
| 1989-01-01 | 3780 |
| 1990-01-01 | 3780 |
| 1991-01-01 | 5985 |
| 1992-01-01 | 5985 |
| 1993-01-01 | 5985 |
| 1994-01-01 | 5985 |
| 1995-01-01 | 5985 |
| 1996-01-01 | 5985 |
| 1997-01-01 | 5985 |
| 1998-01-01 | 5985 |
| 1999-01-01 | 5985 |
| 2000-01-01 | 5985 |
| 2001-01-01 | 5985 |
| 2002-01-01 | 5985 |
| 2003-01-01 | 5985 |
| 2004-01-01 | 5985 |
| 2005-01-01 | 5985 |
| 2006-01-01 | 5985 |
| 2007-01-01 | 5985 |
| 2008-01-01 | 5985 |
| 2009-01-01 | 5985 |
| 2010-01-01 | 6384 |
| 2011-01-01 | 6384 |
| 2012-01-01 | 6384 |
| 2013-01-01 | 6384 |
| 2014-01-01 | 6384 |
| 2015-01-01 | 6384 |
| 2016-01-01 | 6384 |
| 2017-01-01 | 6384 |
| 2018-01-01 | 6384 |
| 2019-01-01 | 6384 |
| 2020-01-01 | 6384 |
| 2021-01-01 | 6384 |
| 2022-01-01 | 6384 |
| 2023-01-01 | 6384 |
| 2024-01-01 | 6384 |
| 2025-01-01 | 6384 |
| 2026-01-01 | 6384 |

No skipped years between the observed endpoints. January 1 is the annual label, not a measured observation on that day.

**sex values:** `both`, `female`, `male`.

**age values:** `0-4`, `10-14`, `15-19`, `20-24`, `25-29`, `30-34`, `35-39`, `40-44`, `45-49`, `5-9`, `50-54`, `55-59`, `60-64`, `65-69`, `70+`, `70-74`, `75-79`, `80+`, `80-84`, `85+`, `overall`.

**ethnicity values:** `bumi`, `bumi_malay`, `bumi_other`, `chinese`, `indian`, `other`, `other_citizen`, `other_noncitizen`, `overall`.

**Geographic coverage:** Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Perak, Perlis, Pulau Pinang, Sabah, Sarawak, Selangor, Terengganu, W.P. Kuala Lumpur, W.P. Labuan, W.P. Putrajaya.

## population_district.csv

DOSM; [official district catalogue](https://data.gov.my/data-catalogue/population_district). Units: thousands. 2020 adjusted census; other years mid-year estimates. Catalogue text still describes 160 districts, whereas the local 2025–2026 records contain 166.

160 district/state pairs each year in 2020–2024; 166 each in 2025–2026. Existing boundaries have only 160 features. Matching names alone do not certify historically consistent district areas.

| Column | Parsed type / role | Missing n | Missing % | Distinct non-null |
| --- | --- | --- | --- | --- |
| state | object | 0 | 0.0000 | 16 |
| district | object | 0 | 0.0000 | 166 |
| date | ISO annual date stored as text | 0 | 0.0000 | 7 |
| sex | object | 0 | 0.0000 | 3 |
| age | object | 0 | 0.0000 | 19 |
| ethnicity | object | 0 | 0.0000 | 7 |
| population | float64 | 0 | 0.0000 | 2649 |

Complete-row duplicates: **0**. Logical key = state, district, date, sex, age, ethnicity; duplicate keys: 0.

| Year label | Rows |
| --- | --- |
| 2020-01-01 | 63840 |
| 2021-01-01 | 63840 |
| 2022-01-01 | 63840 |
| 2023-01-01 | 63840 |
| 2024-01-01 | 63840 |
| 2025-01-01 | 66234 |
| 2026-01-01 | 66234 |

No skipped years between the observed endpoints. January 1 is the annual label, not a measured observation on that day.

**sex values:** `both`, `female`, `male`.

**age values:** `0-4`, `10-14`, `15-19`, `20-24`, `25-29`, `30-34`, `35-39`, `40-44`, `45-49`, `5-9`, `50-54`, `55-59`, `60-64`, `65-69`, `70-74`, `75-79`, `80-84`, `85+`, `overall`.

**ethnicity values:** `bumi_malay`, `bumi_other`, `chinese`, `indian`, `other_citizen`, `other_noncitizen`, `overall`.

**Geographic coverage:** Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Perak, Perlis, Pulau Pinang, Sabah, Sarawak, Selangor, Terengganu, W.P. Kuala Lumpur, W.P. Labuan, W.P. Putrajaya.

## facilities_master.csv

No publisher, licence, capture date or data dictionary is embedded or supplied alongside this file. Names and KKM/KPT/ATM labels suggest a Malaysian public-facility register; treat exact provenance as unresolved.

5,160 public facilities are not 5,160 hospitals: only 166 rows have KATEGORI_FASILITI=HOSPITAL. All rows are AWAM and BUKA. No bed capacity or reporting year. Complete coordinates are not proof of accuracy. Three hospital coordinates fail the supplied state-polygon test.

| Column | Parsed type / role | Missing n | Missing % | Distinct non-null |
| --- | --- | --- | --- | --- |
| Index | int64 | 0 | 0.0000 | 5160 |
| KOD_FASILITI | object | 0 | 0.0000 | 5160 |
| STATUS | object | 0 | 0.0000 | 1 |
| SEKTOR | object | 0 | 0.0000 | 1 |
| SUBSEKTOR | object | 0 | 0.0000 | 3 |
| PROGRAM_GROUP | float64 | 5160 | 100.0000 | 0 |
| NEGERI | object | 0 | 0.0000 | 17 |
| DAERAH | object | 0 | 0.0000 | 192 |
| KATEGORI_FASILITI | object | 0 | 0.0000 | 11 |
| JENIS_FASILITI | object | 0 | 0.0000 | 41 |
| NAMA | object | 0 | 0.0000 | 5060 |
| ALAMAT | object | 1 | 0.0194 | 4736 |
| BANDAR | float64 | 5160 | 100.0000 | 0 |
| POSKOD | float64 | 137 | 2.6550 | 885 |
| DAERAH_PENTADBIRAN | object | 5153 | 99.8643 | 7 |
| TELEFON | object | 4624 | 89.6124 | 527 |
| EMEL | object | 5101 | 98.8566 | 59 |
| URBAN_RURAL | float64 | 5160 | 100.0000 | 0 |
| LATITUD | float64 | 0 | 0.0000 | 4783 |
| LONGITUD | float64 | 0 | 0.0000 | 4769 |

Complete-row duplicates: **0**. KOD_FASILITI and Index each uniquely identify all 5,160 records; NAMA has only 5,060 distinct values and is not a global join key. POSKOD is an identifier despite numeric inference.

**STATUS values:** `BUKA`.

**SEKTOR values:** `AWAM`.

**SUBSEKTOR values:** `ATM`, `KKM`, `KPT`.

**KATEGORI_FASILITI values:** `HOSPITAL`, `INSTITUSI`, `JABATAN KESIHATAN NEGERI`, `KLINIK`, `KLINIK PERGIGIAN`, `LAIN-LAIN`, `MAKMAL`, `PEJABAT FARMASI`, `PEJABAT KESIHATAN`, `PEJABAT KESIHATAN PERGIGIAN`, `PUSAT PROMOSI KESIHATAN`.

**JENIS_FASILITI values:** `CAWANGAN FARMASI LOGISTIK`, `HOSPITAL NEGERI`, `HOSPITAL PAKAR MAJOR`, `HOSPITAL PAKAR MINOR`, `HOSPITAL PENGAJAR`, `HOSPITAL TANPA PAKAR`, `HOSPITAL TENTERA`, `ILKKM`, `INSTITUSI PERUBATAN KHAS`, `JABATAN KESIHATAN NEGERI`, `KLINIK DESA`, `KLINIK KESIHATAN`, `KLINIK KESIHATAN IBU DAN ANAK`, `KLINIK KOMUNITI`, `KLINIK PERGIGIAN (STANDALONE)`, `KLINIK PERGIGIAN DI HOSPITAL`, `KLINIK PERGIGIAN DI INSTITUSI LAIN`, `KLINIK PERGIGIAN DI KLINIK KESIHATAN`, `KLINIK PERGIGIAN DI KLINIK KESIHATAN IBU DAN ANAK (KKIA)`, `KLINIK PERGIGIAN DI KLINIK KOMUNITI`, `KLINIK PERGIGIAN DI RTC`, `KLINIK PERGIGIAN DI UTC`, `KLINIK PERGIGIAN SEKOLAH (PUSAT PERGIGIAN SEKOLAH)`, `KLINIK PERGIGIAN SEKOLAH MENENGAH`, `KLINIK PERGIGIAN SEKOLAH RENDAH`, `MAKMAL KESELAMATAN  DAN KUALITI MAKANAN`, `MAKMAL KESIHATAN AWAM`, `MENTARI`, `PEJABAT FARMASI BAHAGIAN`, `PEJABAT FARMASI BEKALAN`, `PEJABAT KESIHATAN`, `PEJABAT KESIHATAN BAHAGIAN`, `PEJABAT KESIHATAN DAERAH`, `PEJABAT KESIHATAN DAERAH `, `PEJABAT KESIHATAN KAWASAN`, `PEJABAT KESIHATAN PERGIGIAN`, `PEJABAT KESIHATAN PERGIGIAN BAHAGIAN`, `PEJABAT KESIHATAN PERGIGIAN DAERAH`, `PEJABAT KESIHATAN PERGIGIAN KAWASAN`, `PUSAT DARAH`, `WELLNESS HUB`.

**NEGERI labels:** JOHOR, KEDAH, KELANTAN, MELAKA, NEGERI SEMBILAN, PAHANG, PERAK, PERLIS, PULAU PINANG, SABAH, SARAWAK, SELANGOR, TERENGGANU, WILAYAH PERSEKUTUAN KUALA LUMPUR, WILAYAH PERSEKUTUAN LABUAN, WILAYAH PERSEKUTUAN PUTRAJAYA, WILAYAH PERSEKUTUAN KUALA LUMPUR DAN PUTRAJAYA. The combined Kuala Lumpur/Putrajaya label occurs outside the hospital subset and must not be silently assigned to either territory. DAERAH has 192 non-null labels, with administrative compatibility unverified.

| KATEGORI_FASILITI | records |
| --- | --- |
| HOSPITAL | 166 |
| INSTITUSI | 19 |
| JABATAN KESIHATAN NEGERI | 15 |
| KLINIK | 2915 |
| KLINIK PERGIGIAN | 1682 |
| LAIN-LAIN | 41 |
| MAKMAL | 15 |
| PEJABAT FARMASI | 7 |
| PEJABAT KESIHATAN | 155 |
| PEJABAT KESIHATAN PERGIGIAN | 107 |
| PUSAT PROMOSI KESIHATAN | 38 |

Hospital subset: 166 records; 151 KKM, 10 KPT, 5 ATM. All have latitude/longitude, district and state. PROGRAM_GROUP, BANDAR, DAERAH_PENTADBIRAN, TELEFON, EMEL and URBAN_RURAL are entirely missing within this subset.

Coordinate range across the entire register is latitude 0.984114–48.019915 and longitude 3.513038–119.232115. All are legal longitude/latitude numbers, but two clinic records are far outside a broad Malaysian bounding box: KD ROMPON (Sabah), 44.781399 / 4.717406, and KKIA KUDAT (Sabah), 48.019915 / 3.513038. These do not affect the hospital-only subset, but demonstrate that complete coordinate columns are not necessarily trustworthy.

One hospital coordinate pair is duplicated: Hospital Tuanku Fauziah (Perlis) and Hospital Bahagia Ulu Kinta (Perak) both use 4.674394 / 101.150932. Do not deduplicate distinct hospitals by coordinate. Trailing/leading whitespace occurs in 5 DAERAH values, 1 JENIS_FASILITI value and 9 NAMA values. In particular, `PEJABAT KESIHATAN DAERAH` and its trailing-space variant are separate raw categories. Normalisation belongs in a documented derived layer.

## bedutil_state.csv

Likely MOH KKMNOW export; no source or date fields in the CSV. The [official dashboard](https://data.moh.gov.my/dashboard/hospital-bed-utilisation) displayed 6 September 2024 and all 17 non-ICU percentages agree with this file after rounding to one decimal. This is strong circumstantial dating evidence, not proof of the export date.

One undated cross-section, not a time series. Includes Malaysia aggregate. Zeros need reporting-status confirmation. Counts and weighted percentages reconcile internally, but facility file does not reconcile.

| Column | Parsed type / role | Missing n | Missing % | Distinct non-null |
| --- | --- | --- | --- | --- |
| state | object | 0 | 0.0000 | 17 |
| beds_nonicu | int64 | 0 | 0.0000 | 17 |
| util_nonicu | float64 | 0 | 0.0000 | 17 |
| beds_icu | float64 | 0 | 0.0000 | 17 |
| util_icu | float64 | 0 | 0.0000 | 17 |
| vent | float64 | 0 | 0.0000 | 17 |
| util_vent | float64 | 0 | 0.0000 | 17 |

Complete-row duplicates: **0**. Unique key = state (17).

**Geographic coverage:** Malaysia, Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Perak, Perlis, Pulau Pinang, Sabah, Sarawak, Selangor, Terengganu, W.P. Kuala Lumpur, W.P. Labuan, W.P. Putrajaya.

**Measures:** beds_nonicu and beds_icu are reported non-critical/critical capacity counts; vent is a ventilator count. util_nonicu, util_icu and util_vent are percentage-scale utilisation values, not fractions or admissions counts. The precise denominator, capacity definition and reporting-status handling remain undocumented for these exports.

| Metric | Non-null min | Non-null max |
| --- | --- | --- |
| beds_nonicu | 115 | 30860 |
| util_nonicu | 0.0 | 83.09572301425662 |
| beds_icu | 7.0 | 893.0 |
| util_icu | 0.0 | 100.0 |
| vent | 28.0 | 2176.0 |
| util_vent | 0.0 | 55.3030303030303 |

## bedutil_facility.csv

Likely MOH KKMNOW export by schema and hospital names. No embedded source, timestamp, reporting interval or inclusion rules. The state dashboard date must not be transferred to this file: its values fail to reconcile with the state file.

40 of 149 facilities have all six metrics missing. Missing utilisation is not zero. Hospital Limbang has -4 non-ICU beds and -1525% utilisation. Six non-ICU and four ICU percentages exceed 100%; investigate rather than clamp. No coordinates, facility code, district, sector or date.

| Column | Parsed type / role | Missing n | Missing % | Distinct non-null |
| --- | --- | --- | --- | --- |
| hospital | object | 0 | 0.0000 | 149 |
| state | object | 0 | 0.0000 | 16 |
| beds_nonicu | float64 | 40 | 26.8456 | 83 |
| util_nonicu | float64 | 45 | 30.2013 | 90 |
| beds_icu | float64 | 40 | 26.8456 | 30 |
| util_icu | float64 | 93 | 62.4161 | 34 |
| vent | float64 | 40 | 26.8456 | 48 |
| util_vent | float64 | 88 | 59.0604 | 42 |

Complete-row duplicates: **0**. Unique key = hospital (149), also unique with state.

**Geographic coverage:** Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Pulau Pinang, Perak, Perlis, Selangor, Terengganu, Sabah, Sarawak, W.P. Kuala Lumpur, W.P. Labuan, W.P. Putrajaya.

**Measures:** beds_nonicu and beds_icu are reported non-critical/critical capacity counts; vent is a ventilator count. util_nonicu, util_icu and util_vent are percentage-scale utilisation values, not fractions or admissions counts. The precise denominator, capacity definition and reporting-status handling remain undocumented for these exports.

| Metric | Non-null min | Non-null max |
| --- | --- | --- |
| beds_nonicu | -4.0 | 1672.0 |
| util_nonicu | -1525.0 | 110.77441077441075 |
| beds_icu | 0.0 | 87.0 |
| util_icu | 0.0 | 162.5 |
| vent | 0.0 | 158.0 |
| util_vent | 0.0 | 82.22222222222221 |

## Boundary files

All three are GeoJSON FeatureCollections with CRS `urn:ogc:def:crs:OGC:1.3:CRS84` (longitude, latitude). All geometries are MultiPolygon, none empty. No source, licence or boundary effective date is embedded. No original geometries were repaired. Validity checks establish structural/topological issues, not surveyed positional accuracy. State/district coverage includes the peninsula, Sabah, Sarawak and federal territories.

### administrative_0_malaysia.geojson

Features: 1. Bounds [west, south, east, north]: `[99.64083, 0.855, 119.26945, 7.38056]`.

| Property | Type | Missing n (%) |
| --- | --- | --- |
| country | object | 0 (0%) |
| code_iso | object | 0 (0%) |

Duplicate property rows: 0. country and code_iso are unique.

All geometries valid.

### administrative_1_state.geojson

Features: 16. Bounds [west, south, east, north]: `[99.6409, 0.85539, 119.26899, 7.36098]`.

| Property | Type | Missing n (%) |
| --- | --- | --- |
| state | object | 0 (0%) |
| code_state | int64 | 0 (0%) |

Duplicate property rows: 0. state and code_state are unique.

| Invalid feature | GEOS explanation |
| --- | --- |
| {'state': 'Sarawak', 'code_state': 13} | Self-intersection[111.283620239187 2.4254012198264] |

### administrative_2_district.geojson

Features: 160. Bounds [west, south, east, north]: `[99.6409, 0.85539, 119.26899, 7.36098]`.

| Property | Type | Missing n (%) |
| --- | --- | --- |
| state | object | 0 (0%) |
| district | object | 0 (0%) |
| code_state | int64 | 0 (0%) |
| code_district | int64 | 0 (0%) |
| code_state_district | object | 0 (0%) |

Duplicate property rows: 0. (state, district) and code_state_district are unique; code_district is only local within state, and state/code_state intentionally repeat.

| Invalid feature | GEOS explanation |
| --- | --- |
| {'state': 'Johor', 'district': 'Kluang', 'code_state': 1, 'code_district': 3, 'code_state_district': '1_3'} | Too few points in geometry component[103.30012 1.8261] |
| {'state': 'Johor', 'district': 'Tangkak', 'code_state': 1, 'code_district': 10, 'code_state_district': '1_10'} | Too few points in geometry component[102.53557 2.27333] |
| {'state': 'Kedah', 'district': 'Kota Setar', 'code_state': 2, 'code_district': 3, 'code_state_district': '2_3'} | Too few points in geometry component[100.34977 6.12378] |
| {'state': 'Pulau Pinang', 'district': 'Timur Laut', 'code_state': 7, 'code_district': 4, 'code_state_district': '7_4'} | Too few points in geometry component[100.29908 5.34408] |
| {'state': 'Sabah', 'district': 'Kota Kinabalu', 'code_state': 12, 'code_district': 7, 'code_state_district': '12_7'} | Too few points in geometry component[116.05337 5.92993] |
| {'state': 'Sabah', 'district': 'Ranau', 'code_state': 12, 'code_district': 8, 'code_state_district': '12_8'} | Too few points in geometry component[116.64977 5.93399] |
| {'state': 'Sabah', 'district': 'Penampang', 'code_state': 12, 'code_district': 11, 'code_state_district': '12_11'} | Too few points in geometry component[116.0747 5.92399] |

State joins match all 16 statistical state labels exactly. District boundaries match all 160 population keys in 2020–2024, but not the six additional 2025–2026 keys. Repair a derived copy and confirm boundary vintage before analytical mapping. District bed joins require the crosswalk in report 02.

## HEALTH_FACTS_2025.pdf

Publisher: Ministry of Health Malaysia, Health Informatics Centre, Planning Division; cover publication date November 2025. Two wide physical PDF sheets represent a folded brochure, not two ordinary pages. The cover states reference data for 2024. Hospital-related tables are national, without state, district, facility IDs or coordinates. The local PDF was read directly; its title is not the evidence for reporting years.

| Printed panels (physical sheet) | Table families | Time / units / structure |
| --- | --- | --- |
| 1–3 (sheet 2) | Land, population, vital statistics | Population/vital statistics 2022–2024; male/female/total columns; counts, thousands, percentages and various rate denominators |
| 3 (sheet 2) | Finance; National Health Accounts | 2025 budget; 2021–2023 spending, RM and percentages |
| 4–7 (sheet 2) | Healthcare facilities | 31 December 2024; sector/category rows, number and official beds; dental chairs, dialysis chairs and tanks are distinct units |
| 8–9 (sheet 2) | Health workforce | 2024 counts and population ratios, MOH/non-MOH/private/total; missing/not-applicable symbols occur |
| 10–11 (sheet 1) | Admissions/outpatient/support services | 2023/2024 for selected MOH metrics; 2024 national sector counts; response/submission caveats |
| 12–14 (sheet 1) | Hospitalisation causes | Three top-ten tables, 10 ranks each: MOH, private, combined; rank, cause text, percentage, 2024 |
| 12–13 (sheet 1) | Causes of deaths | Two top-ten tables: MOH underlying causes versus private immediate causes; not equivalent definitions |
| 15–16 (sheet 1) | Communicable disease rates | 2024 incidence and mortality per 100,000; notification-rate footnotes for selected diseases |
| 17 (sheet 1) | Immunisation/environmental coverage | 2024 percentages with denominator-specific footnotes |

PDF schema is panel-specific; a single rows×columns count, missing percentage or duplicate-record count is not meaningful without defining a transcription schema. Missingness is explicitly represented by `..` (not obtained) and `-` (not applicable); zero is distinct. No blank numeric values were observed in the hospital admission/capacity/top-ten hospitalisation tables used here. Categories omitted from a top ten are unreported, not zero. Repeated headings and MOH aggregate plus component rows are intentional, not duplicate observations. Do not combine inpatient admissions and outpatient attendances.

2024 MOH admissions are preliminary and based on 97.94% submission; private admissions/attendance have 82.33% response and include private hospitals, maternity/nursing homes and hospices. Day-care submission is 84.94%. These are reported activity, not unique patients, unmet need or comparable complete-sector counts. Detailed clinical-support tables have their own submission rates. The three hospitalisation top tens are percentages, not counts; no category-specific sample sizes or response denominators are printed next to them.

## Preservation manifest

SHA-256 was recorded before analysis and rechecked after report creation; all 11 original sources matched. No source was rewritten.

| Relative source path | SHA-256 |
| --- | --- |
| data/original/HEALTH_FACTS_2025.pdf | e7dff2de1f622bc324cb204e161c6f3b20064393d63ec467872a843684d78dcd |
| data/geographic/original/administrative_0_malaysia.geojson | d36b8819e1fbb714aa694e532dc7c3abf6b4842769be521fffd34f56b28c8205 |
| data/geographic/original/administrative_1_state.geojson | c808df58765eac095d8538fe74000934b97401b4c8816d28d5e8929624df8239 |
| data/geographic/original/administrative_2_district.geojson | aa3995872ea117e19732cae13e86c6f5eda3b15659743b5282a8c19d6ff636b0 |
| data/original/bedutil_facility.csv | ca880540768b535448d39434f626eda2adffd7111d45eec4ed925a399d25dbbb |
| data/original/bedutil_state.csv | 2dedd2485d8bdef3b3883c216d8165da5b428b39838d382dc3a8d29b2716db64 |
| data/original/facilities_master.csv | 63b3ca7fef29c65ba4e306d3761e1126e6af0f85a65be903e4ca3aa34b1346e1 |
| data/original/hospital_beds.csv | 97cb4cd999b525728c134324732cfc39bfd401b13fa991cde8b6b57d3b784862 |
| data/original/population_district.csv | 2c7caf2fc4bda1f58f12db6cc2d6d5f39148fbeaaa0516017eb59fb8e23784e0 |
| data/original/population_malaysia.csv | ed287ef3277e96e74d27fd65f2dc4ab88b37817780e265e11b0d478e6bc9fe04 |
| data/original/population_state.csv | a3ac1a8831a4e66dbc0bc0d018b699b3810eaead3775fbee4c95e9eb2cc44945 |
