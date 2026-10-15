# 06 — Recommended story and handoff

Audit date: 15 October 2026. Author: Codex, for FIT3179 Task 01 review.

## Recommended scope

Retain **Malaysia's Hospital Divide** as a working title, with an explicit subtitle such as **Public hospital capacity and population, 2015–2024**. The current evidence supports a story about the distribution of public capacity and changing resident population. It does not establish a shortage, unequal realised access or sustained utilisation pressure.

Refine the central question to: **How has public hospital capacity kept pace with population, and how do differences across states compare with population ageing?** Retain utilisation as an unresolved extension unless dated, coherent data can be secured.

## Evidence-led sequence

1. **Public capacity grew faster than population nationally.** Public beds increased 15.44% between 2015 and 2024 while population increased 9.19%; the rate rose from 14.46 to 15.28 beds per 10,000. Lead with an indexed line chart and actual endpoint values. Source and exact calculation: report 03, finding 1.

2. **The national average hides state differences.** The 2024 rate ranges from 11.32 in Selangor to 70.16 in Putrajaya; among non-territory states, Perak is highest at 23.43. Seven state/territory rates declined over the decade. Use a repaired state choropleth, followed by one endpoint-change chart or a state-year heatmap. Annotate the resident-denominator limitation for territories without asserting an unmeasured referral effect. Report 03, findings 2–3.

3. **Location and provider composition explain what is being counted.** A reviewed public-hospital point map could show the 166 registry entries, while a proportional-symbol map could show absolute beds. The register is undated and has coordinate issues; these are conditional views. Explain that non-MOH beds are public government beds, and the PDF's 19,920 private hospital beds are outside the CSV series. Report 03, findings 6 and 8. Do not use registry counts as a confirmed 2024 census.

4. **Population is ageing at different rates and from different starting points.** National 65+ share rose from 5.84% to 7.66%; Perak's 2024 share is 9.91% and Putrajaya's 1.91%. Use a population pyramid and a compact state-age comparison. An age-versus-capacity scatterplot can ask whether patterns align, without implying an age-adjusted resource-need measure. Report 03, finding 5.

5. **Activity context helps, but pressure remains an open question.** If useful to the narrative, use a restrained national hospitalisation-cause comparison: respiratory shares are similar across MOH/private reporting, while pregnancy shares differ. Keep the reporting caveats visible. Omit the current utilisation leaderboard from public-facing conclusions: missing dates, inconsistent totals and negative capacity make it unsuitable as pressure evidence. Report 03, findings 7–8.

This revises the provisional section ordering: national capacity/population is a stronger opening than an unsupported local-demand story. Admissions may be a short contextual section rather than a full geographical demand section. The broad East–Peninsular rate difference (14.79 versus 15.40) is modest relative to state variation, so it should not dominate the narrative.

## Established findings and unresolved questions

| Established from the supplied data | Still unresolved |
| --- | --- |
| Public bed growth outpaced population growth nationally in 2015–2024 | Whether staffing, bed availability, case mix or accessibility improved |
| State rates vary widely, and seven declined over the decade | Whether lower public rates imply unmet need after private supply and referral flows |
| Older-population proportions can be calculated consistently for the matching years | How much hospital demand ageing creates without age-specific activity data |
| District names/coverage and some geometries require reconciliation | Comparable district per-capita rankings and travel access |
| National activity and causes are present in the PDF | Comparable state/hospital admissions and cause time series |
| Utilisation exports contain substantial quality and reconciliation problems | Persistent ICU/non-ICU pressure and relationships with annual capacity |

## Decisions for ChatGPT and the user before the next task

- Accept public-sector capacity as the main scope, or prioritise acquisition of private state/district capacity before framing an all-sector divide.
- Decide whether utilisation is essential. If yes, obtain dated, consistent history; otherwise remove pressure claims from the core research question.
- Choose state-level analysis as the initial reliable geography. District comparison should wait for documented crosswalk and boundary work.
- Confirm the course's advanced-idiom classifications. Nine candidate advanced non-map idioms are feasible; three maps are conditional, and a fourth useful map is not established. Do not promise rubric counts by repeating questions in different forms.
- Supply the final webpage author name and publication date at implementation time. “Codex” here is the audit author, not an assumed student attribution.

These decisions do not block completion of this audit; they govern the next stage.

## Completed work and outstanding work

Completed: recursive discovery of all 11 source files; schemas, dates, missingness and duplicates; geographic validation; exact and proposed joins; population normalisation; ageing, capacity and utilisation diagnostics; PDF panel verification; idiom assessment; prioritised missing data; six reports. SHA-256 checks confirm all original source files remain unchanged.

Outstanding: source provenance for facility/boundary exports; utilisation timestamp/definition reconciliation; geometry and coordinate review in derived copies; authoritative district mappings; optional private-sector/activity/access data; final storyline and rubric decisions. No corrections were silently applied to sources.

## Report index

- [01 — Dataset inventory](01_dataset_inventory.md)
- [02 — Dataset relationships](02_dataset_relationships.md)
- [03 — Preliminary findings](03_preliminary_findings.md)
- [04 — Chart feasibility](04_chart_feasibility.md)
- [05 — Missing data](05_missing_data.md)
- [06 — Recommended story](06_recommended_story.md)

**Task 01 stops here.** No webpage, Vega-Lite specification or final visualisation has been built. Task 02 requires ChatGPT's review and the user's approval.
