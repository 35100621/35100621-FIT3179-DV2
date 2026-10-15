# 03 — Preliminary findings

Audit date: 15 October 2026. Author: Codex, for FIT3179 Task 01 review. Scope: read-only source audit; no webpage or charts implemented.

## 1. Public beds grew faster than resident population nationally

From 2015 to 2024, public beds increased **45,087 → 52,048 (+6,961; +15.44%)**, compared with population **31.1861 → 34.0521 million (+9.19%)**. Public beds per 10,000 residents increased **14.46 → 15.28 (+5.72%)**. This is a capacity-to-resident comparison, not a measure of access, clinical adequacy or all-sector supply.

Source: `hospital_beds.csv`, date/state/district/type/beds; filter Malaysia, All, all. Denominator: `population_malaysia.csv`, same year, both/overall/overall. Formula: `beds / (population * 1000) * 10000`; percent change = `(end/start - 1)*100`. Annual year-end beds and mid-year population are conventional but different reference instants. Private beds are excluded.

| date | beds | population | per_10000 |
| --- | --- | --- | --- |
| 2015-01-01 | 45087 | 31186.1 | 14.457 |
| 2016-01-01 | 45678 | 31633.5 | 14.44 |
| 2017-01-01 | 46054 | 32022.6 | 14.382 |
| 2018-01-01 | 46611 | 32382.3 | 14.394 |
| 2019-01-01 | 46988 | 32523.0 | 14.448 |
| 2020-01-01 | 48305 | 32447.4 | 14.887 |
| 2021-01-01 | 49781 | 32576.3 | 15.281 |
| 2022-01-01 | 49985 | 32698.1 | 15.287 |
| 2023-01-01 | 51100 | 33401.8 | 15.299 |
| 2024-01-01 | 52048 | 34052.1 | 15.285 |

## 2. State differences are larger than the broad East–Peninsular contrast

2024 state public-bed rates range from **11.32 in Selangor to 70.16 in Putrajaya**. Excluding federal territories, the range is **11.32 to 23.43 (Perak)**. Putrajaya’s small resident denominator and possible cross-border referral activity make its rate unsuitable as an automatic benchmark. Referral flows are not present in these datasets.

Sources: `hospital_beds.csv`, district=All Districts, type=all, date=2024-01-01; `population_state.csv`, same date and total filters. Exact 1:1 state-year join.

| state | beds | population | per10k |
| --- | --- | --- | --- |
| Selangor | 8334 | 7362.7 | 11.319 |
| Pulau Pinang | 2129 | 1800.5 | 11.824 |
| W.P. Labuan | 122 | 100.8 | 12.103 |
| Melaka | 1349 | 1046.7 | 12.888 |
| Johor | 5448 | 4184.4 | 13.02 |
| Kedah | 2919 | 2217.1 | 13.166 |
| Sabah | 5097 | 3742.0 | 13.621 |
| Kelantan | 2987 | 1887.9 | 15.822 |
| Pahang | 2646 | 1667.7 | 15.866 |
| Negeri Sembilan | 1977 | 1239.5 | 15.95 |
| Terengganu | 1971 | 1231.5 | 16.005 |
| Sarawak | 4189 | 2517.5 | 16.64 |
| Perlis | 517 | 296.8 | 17.419 |
| Perak | 6021 | 2569.4 | 23.433 |
| W.P. Kuala Lumpur | 5498 | 2067.5 | 26.593 |
| W.P. Putrajaya | 844 | 120.3 | 70.158 |

Define East Malaysia explicitly as Sabah + Sarawak + Labuan, and Peninsular as all remaining states/territories. Sum beds and population separately, then divide: East **9,408 / 6,360,300 × 10,000 = 14.79**; Peninsular **42,640 / 27,692,000 × 10,000 = 15.40**. These weighted regional summaries conceal state differences. Do not average state rates. State population sums differ from the national total by 200 people due to rounding.

## 3. National improvement was not universal

Seven of sixteen state/territory rates declined between 2015 and 2024. Selangor’s rate rose by **2.43 beds per 10,000**, but remained the lowest in 2024. Melaka’s fell by **2.74**. Reproduce with the same state-total join above, pivot year, then `rate_2024-rate_2015`. These are descriptive changes, not evidence that any particular policy caused them.

| state | 2015 | 2024 | change |
| --- | --- | --- | --- |
| Melaka | 15.624 | 12.888 | -2.736 |
| W.P. Putrajaya | 71.446 | 70.158 | -1.288 |
| W.P. Kuala Lumpur | 27.528 | 26.593 | -0.935 |
| Negeri Sembilan | 16.762 | 15.95 | -0.812 |
| Johor | 13.761 | 13.02 | -0.741 |
| W.P. Labuan | 12.829 | 12.103 | -0.725 |
| Pulau Pinang | 12.049 | 11.824 | -0.224 |
| Perak | 23.357 | 23.433 | 0.076 |
| Kedah | 12.654 | 13.166 | 0.511 |
| Perlis | 16.419 | 17.419 | 1.001 |
| Sabah | 12.555 | 13.621 | 1.066 |
| Kelantan | 14.251 | 15.822 | 1.571 |
| Terengganu | 14.169 | 16.005 | 1.836 |
| Sarawak | 14.599 | 16.64 | 2.04 |
| Selangor | 8.891 | 11.319 | 2.428 |
| Pahang | 13.421 | 15.866 | 2.445 |

## 4. Recorded district capacity is concentrated, but normalised district rankings need a crosswalk

There are **153 district-level total records in 2024; 26 report zero beds**. Kuala Lumpur has 5,498; Kinta (Ipoh) 3,354; Gombak (Rawang) 3,103; Johor Bahru 3,042. These are source-labelled areas, not a validated common set of present-day districts. A zero reports no public beds assigned to that source area; it does not establish no hospital access, no private beds, or unmet need.

Source: `hospital_beds.csv`, 2024, type=all, district neither All nor All Districts; sort/count beds. Only 138 of 153 names match population districts directly. After the unverified 15-name crosswalk, seven population districts still have no record. District per-capita leaderboards are therefore withheld.

## 5. Population ageing is measurable

National residents aged 65+ increased from **1.8215 million (5.84%) in 2015 to 2.6090 million (7.66%) in 2024**, a rise of **1.82 percentage points**. In 2024, Perak has the largest state/territory share (**9.91%**) and Putrajaya the smallest (**1.91%**).

Sources: national/state population CSVs, sex=both, ethnicity=overall; sum population for 65-69, 70-74, 75-79, 80-84 and 85+; divide by the corresponding age=overall total. Those bins are mutually exclusive in these years. A 60+ analysis is also possible but must be separately labelled. Do not interpret age share alone as hospital demand or age-adjusted need.

| state | share65 |
| --- | --- |
| Perak | 9.909 |
| Kedah | 9.088 |
| Sarawak | 8.64 |
| Perlis | 8.255 |
| Selangor | 8.051 |
| Pulau Pinang | 8.014 |
| Negeri Sembilan | 7.64 |
| Johor | 7.389 |
| Kelantan | 7.04 |
| Pahang | 6.776 |
| W.P. Kuala Lumpur | 6.771 |
| Melaka | 6.764 |
| Sabah | 6.176 |
| Terengganu | 6.074 |
| W.P. Labuan | 5.159 |
| W.P. Putrajaya | 1.912 |

## 6. Facility locations are usable only after quality review

`facilities_master.csv` contains **166 HOSPITAL-category records**, all public, with complete coordinates: **151 KKM, 10 KPT and 5 ATM**. Sabah has 26, Sarawak 23 and Selangor 17. They are undated registry counts, not confirmed 2024 hospital totals. Three fail the state containment check; Hospital Tuanku Fauziah is clearly inconsistent with its Perlis label. Point maps must disclose the snapshot’s unknown date and reviewed/excluded records. Clinics and offices must be filtered out.

Reproduce: filter KATEGORI_FASILITI=HOSPITAL, group NEGERI/SUBSEKTOR; normalise territory names as in report 02; create points (LONGITUD,LATITUD), test state geometry covers(point). Original invalid geometries were not repaired, so borderline failures are diagnostic only.

## 7. Utilisation is a data-quality finding, not a reliable pressure trend

The undated state file reports national non-ICU utilisation **55.78%**, ICU **57.56%**, and ventilator **29.96%**; capacities are 30,860 non-ICU beds, 893 ICU beds and 2,176 ventilators. These are source values, not audit-validated contemporary indicators. State non-ICU figures range from Labuan 0% to Perlis 83.10%; the zero requires reporting-status verification. The official dashboard’s displayed 6 September 2024 date and matching rounded state values are circumstantial evidence only; see report 01.

The facility file has 40/149 fully missing metric rows. Non-ICU utilisation is present for 104/149 (69.80%); ICU for 56/149 (37.58%); ventilation for 61/149 (40.94%). Hospital Limbang contains **-4 non-ICU beds and -1525% utilisation**. Six non-ICU and four ICU values exceed 100%, with the ICU maximum **162.5% at Hospital Kajang**. Above-100% may have operational explanations, but these exports do not document them. Do not cap them or label them errors without verification.

Within the facility file, filtering only beds_nonicu>0 and nonmissing util_nonicu gives **n=103, Pearson r=-0.028** between capacity and utilisation. Excluding zero-utilisation rows changes this to **n=91, r=0.324**. This sensitivity diagnostic demonstrates why a capacity-pressure relationship is not established; excluding zero is not endorsed as a cleaning rule. Retain over-100 values in both diagnostics, exclude Limbang via positive-capacity condition. There is no historical utilisation series, and dated annual beds must not be merged to these undated percentages.

## 8. The PDF supplies national activity context and a private-sector caveat

`HEALTH_FACTS_2025.pdf`, printed panels 4–7 (physical sheet 2), reports 2024 public capacity of **41,209 MOH hospital beds + 5,646 special-institution beds + 508 army + 4,685 university = 52,048**, exactly agreeing with the bed CSV. It separately reports **214 private hospitals and 19,920 official beds**. The latter excludes separately listed private maternity/nursing/hospice categories; do not call 52,048+19,920 an exhaustive all-facility bed universe.

Printed panels 10–11 (physical sheet 1): MOH hospital admissions **2,579,373**, special medical institution admissions **133,543**, non-MOH hospital admissions **197,530**, private admissions **1,359,910**, all 2024. MOH 2024 is preliminary (97.94% submission); private includes multiple facility types and 82.33% response. These counts are not a complete, like-for-like public/private comparison.

Printed panels 12–14: pregnancy/childbirth/puerperium is the largest listed MOH hospitalisation cause (**17.22%**); infectious/parasitic diseases lead private (**18.97%**); respiratory disease leads the combined MOH/private table (**14.13%**). Respiratory shares are close (MOH **14.18%**, private **14.03%**), while pregnancy shares differ (17.22% versus **5.26%**). These are percentages of reported hospitalisations, not population disease prevalence. Shared categories may support a national composition comparison; omitted top-ten categories must not become zero. Do not infer causal sector preferences or clinical severity from the differences.

## Reproducible core calculations

Run read-only from the repository root; pandas is required. No source is rewritten.

```python
import pandas as pd
b = pd.read_csv("hospital_beds.csv")
pn = pd.read_csv("population_malaysia.csv")
ps = pd.read_csv("population_state.csv")
def totals(p):
    return p.query("sex == 'both' and age == 'overall' and ethnicity == 'overall'")
n = b.query("state == 'Malaysia' and district == 'All' and type == 'all'")
n = n.merge(totals(pn), on="date", validate="one_to_one")
n["rate"] = n.beds * 10 / n.population
s = b.query("district == 'All Districts' and type == 'all'")
s = s.merge(totals(ps), on=["state", "date"], validate="one_to_one")
s["rate"] = s.beds * 10 / s.population
older = ps.query("sex == 'both' and ethnicity == 'overall'")
older = older[older.age.isin(["65-69","70-74","75-79","80-84","85+"])]
older = older.groupby(["state","date"]).population.sum().reset_index(name="older")
older = older.merge(totals(ps), on=["state","date"], validate="one_to_one")
older["share65"] = 100 * older.older / older.population
u = pd.read_csv("bedutil_facility.csv")
q = u[u.beds_nonicu.gt(0) & u.util_nonicu.notna()]
print(n, s, older)
print(len(q), q.beds_nonicu.corr(q.util_nonicu))
q_positive = q[q.util_nonicu.gt(0)]
print(len(q_positive), q_positive.beds_nonicu.corr(q_positive.util_nonicu))
```

Established: descriptive counts, rates, ageing and the audit discrepancies above. Unresolved hypotheses: adequacy, accessibility, cross-state referral effects, causes of regional differences and sustained hospital pressure. No causal or shortage conclusion is supported.
