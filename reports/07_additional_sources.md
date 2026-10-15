# 07 — Additional sources and research log

Reviewed 15 October 2026 · Task 02 · Author: Codex (technical audit). No visualisations implemented.

**18 source investigations** (logical publications, products or datasets; individual download URLs are not separately counted). **16 data-bearing files downloaded**, including **9 substantively new sources** and **7 duplicate/near-duplicate provenance copies**, plus **10 supporting files**: 26 raw files total. Two COVID files count separately because their units and denominators differ. Each Health Indicators edition counts once despite containing many tables. Five extracted analytical CSVs are derivatives, not additional acquisitions.

All sources were accessed on 15 October 2026. Exact successful download URLs, bytes, hashes, periods, reuse conditions and decisions are in [source_manifest.csv](../data/additional/source_manifest.csv); failed URLs and mirror retries are preserved in [acquisition_log.json](../data/additional/validation/acquisition_log.json). Public accessibility does not establish an open licence.

### S 01 — Healthcare Staff by State and Staff Type

Priority A/D. Publisher: MOH / data.gov.my. [Source](https://data.gov.my/data-catalogue/healthcare_staff). Downloaded CSV. Catalogue updated 1 Sep 2024; data as at 31 Dec 2022. 2014–2022 state/national active public healthcare headcounts; CC BY 4.0. Full annual grid. Not hospital-only or FTE.

### S 02 — KKMNOW processed bed-utilisation tables and histories

Priority A. Publisher: MOH. [Source](https://github.com/MoH-Malaysia/kkmnow-data). Four Parquets plus README, MIT licence and commit evidence acquired. State series ends 31 Aug 2024; facility series 6 Sep 2024; latest retrieved state-file commit 6 Sep 2024. Dated ratios and counts, material quality failures; not current data.

### S 03 — Public facility master and bed-utilisation CSV snapshots

Priority A/B. Publisher: MOH. [Source](https://github.com/MoH-Malaysia/data-resources-public). Three CSVs, README and commit history acquired. Master documented as 31 Dec 2025; latest retrieved commit 12 Jul 2026. Utilisation snapshots match different dates. Generic government-policy attribution terms; no precise data licence supplied.

### S 04 — KKMNOW backend bed-utilisation source configuration

Priority A. Publisher: MOH. [Source](https://github.com/MoH-Malaysia/kkmnow-back). bed_util.json and repository tree acquired. Confirms dashboard input paths and measures, not the full denominator/reporting methodology. Configuration is provenance, not extra observations.

### S 05 — Hospital Bed Utilisation dashboard

Priority A. Publisher: MOH / KKMNOW. [Source](https://data.moh.gov.my/dashboard/hospital-bed-utilisation). Accessible dashboard; update label 6 Sep 2024 cannot timestamp every export. Prefer actual dated series. No independent evidence explaining negative capacities.

### S 06 — Petunjuk Kesihatan 2025 / Health Indicators 2025

Priority B/C/A/D. Publisher: MOH Health Informatics Centre. [Source](https://myhdw.moh.gov.my/public/pub/-/document_library_display/QUU93ji8Vrjk/view/150318). 225-page PDF downloaded via official library after www.moh.gov.my downloads returned 403. Published November 2025, library uploaded December 2025. Selected 2024 tables: public/private beds, state/hospital MOH annual utilisation, sector admissions. All-rights-reserved notice. Reuse clearance outstanding.

### S 07 — Petunjuk Kesihatan 2024 / Health Indicators 2024

Priority B/C/A/D. Publisher: MOH Health Informatics Centre. [Source](https://myhdw.moh.gov.my/public/pub/-/document_library_display/QUU93ji8Vrjk/view/150318). 217-page PDF downloaded via library, version 1.1; library upload November 2024. Selected matching tables report 2023. National and state totals reconciled. Explicit open licence not verified.

### S 08 — Senarai Hospital Swasta Berlesen (linked live hospital register)

Priority B. Publisher: MOH CKAPS. [Source](https://hq.moh.gov.my/medicalprac/statistik/). Official page links a public Google Sheet. CSV downloaded: 224 facilities, beds and addresses, 15 observed state labels. No reporting date/coordinates. Licensed list must not be treated as a dated 2024 census. Licence unresolved.

### S 09 — myGeoCKAPS public map

Priority B/E. Publisher: MOH / PGN. [Source](https://mygos.mygeoportal.gov.my/mygeockaps_public/). Page accessible as iframe; no independently validated coordinate export acquired. Do not claim private point geography is ready.

### S 10 — Malaysia administrative state and district GeoJSON

Priority E. Publisher: DOSM data-open. [Source](https://github.com/dosm-malaysia/data-open/tree/main/datasets/geodata). Both files and commit evidence downloaded. Semantic duplicates of originals; commit 22 Jun 2022 is not boundary vintage. State/district fields remain names; invalid geometry unresolved; licence requests 404.

### S 11 — Unique Parcel Identifier; Kod UPI_1303024.xlsx

Priority E. Publisher: National Geospatial Centre. [Source](https://www.mygeoportal.gov.my/en/unique-parcel-identifier-upi). Official code workbook downloaded; HTTP modified 18 Mar 2024. Page describes 2011/2023 code publications. Land-administration hierarchy, no geometry or confirmed effective date; not a ready statistical-district join. Reuse licence unresolved.

### S 12 — Stats GeoPortal

Priority E. Publisher: DOSM. [Source](https://statsgeo.mycensus.gov.my/geostats/mapv2.php). Interactive state/district/mukim and population interface inspected; no verified downloadable licensed boundary revision obtained. UI availability is not proof of compatible vectors.

### S 13 — MapSempadanKecil ArcGIS service

Priority E. Publisher: MET Malaysia. [Source](https://metgeoportal.met.gov.my/arcgisserver/rest/services/PetaKecil/MapSempadanKecil/MapServer). Unavailable: web 502; direct request encountered expired certificate. No bypass or downloaded dataset. Coverage/vintage/licence unverified.

### S 14 — Referral-pattern/patient-flow study candidate, PubMed 41617516

Priority E/C. Publisher: Academic candidate indexed by NLM. [Source](https://pubmed.ncbi.nlm.nih.gov/41617516/). Search-discovered Hospital Sungai Buloh referral study; opened page returned no usable article content. Title/methodology/data not independently verified; no origin-destination dataset. Not evidence for a flow map.

### S 15 — COVID-19 epidemic hospital.csv

Priority A/C. Publisher: MOH. [Source](https://github.com/MoH-Malaysia/covid19-public/blob/main/epidemic/README.md). Downloaded as covid_hospital.csv, with README. 2020-03-24–2025-05-31 state daily beds, admission/discharge flows and occupancy stocks. No nulls but missing state-dates; epidemic reporting universe is not all annual public/private care. Licence 404.

### S 16 — COVID-19 epidemic icu.csv

Priority A. Publisher: MOH. [Source](https://github.com/MoH-Malaysia/covid19-public/blob/main/epidemic/README.md). Downloaded as covid_icu.csv. Same date span; ICU gazetted/repurposed/total beds and patient/ventilator counts. Denominator components documented, capacity identity passes; above-capacity observations need context. No current-pressure claims.

### S 17 — Legacy MOH bed-occupancy definition PDF candidate

Priority A. Publisher: MOH. [Source](https://www.moh.gov.my/moh/modules_resources/database_stores/87/195.pdf). Old link unavailable (404 in initial retrieval). No verified definition taken from snippets. Does not resolve KKMNOW numerator/denominator anomalies.

### S 18 — Senarai Hospital Swasta Dengan Perakuan Kelulusan Menubuhkan Atau Menyenggarakan Yang Sah Laku, 31 Ogos 2024

Priority B. Publisher: MOH CKAPS. [Source](https://hq.moh.gov.my/medicalprac/wp-content/uploads/2024/09/SENARAI-HOSPITAL-SWASTA-DENGAN-COA-YANG-SAH-LAKU-KEMAS-KINI-PADA-31-OGOS-2024_060924.pdf). Three-page PDF inspected online. Rejected for operating supply: approval to establish/maintain is not an operating hospital licence. Proposed capacities/addresses must not be added to licensed capacity. No local acquisition needed for this rejected alternative.

### Acquisition and reuse decisions

The successful Health Indicators downloads came from the official MyHDW library, not an unofficial mirror. Their exact long download URLs are in the manifest. Annual capacity is a year-end stock; admissions are yearly episodes; annual occupancy is a percentage, not a count. Private capacity tables concern hospitals only; admissions include private maternity homes, nursing homes and hospices. Completeness and all derived-table locations are detailed in reports 08–09.

No datasets were purchased, no private systems accessed, and no messages sent. Raw publications are retained locally for this audit. The 2025 PDF explicitly reserves reproduction rights; do not publish its full PDF, rendered pages or assume that its tables carry CC BY. Resolve permitted reuse of the planned extracted-data publication in the next phase. This did not prevent the authorized local acquisition and analysis.

Search coverage included official hospital/activity catalogues, publications and geographic portals. No verified age-specific admissions-by-state, nationwide patient movement, matched routing/settlement dataset, or hospital-level staff allocation was secured. Those are unresolved, not claims that such data do not exist.
