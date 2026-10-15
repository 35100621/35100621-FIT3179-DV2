# 12 — Remaining gaps and recommended decisions

Reviewed 15 October 2026 · Task 02 · Author: Codex (technical audit). No visualisations implemented.

Task 02 is complete: all five priorities were investigated,16 data-bearing files and 10 support files acquired, selected analyses validated, reports 07–12 and the manifest produced. Nine data-bearing files add substantive information; seven are duplicate/near-duplicate provenance copies. All 11 originals remain unchanged. Nothing below authorises automatic visualisation work.

|Priority|Gap / evidence|Effect and recommended decision|
|---|---|---|
|1|2025 Health Indicators PDF expressly reserves reproduction rights;2024PDF/CKAPS/geography/COVID reuse licences not verified|Keep audit locally; resolve permitted reuse of extracts before public publication. Link to publisher sources and do not assume CC BY applies to every government file. Workforce is explicitly CC BY 4.0; KKMNOW repository has MIT software/documentation wording.|
|1|Daily KKMNOW negative capacities, extreme ratios, substantial ICU nulls and state/facility inconsistencies|Use published annual MOH BOR for a cautious historical activity section. Exclude unqualified daily-pressure claims until source methodology/corrections are obtained. Do not drop or fix anomalies silently.|
|1|2023/2024MOH admissions submission100%/97.94%; private response86.04%/82.33%|Do not interpret raw admission change as demand change or scale missing submissions without evidence. Show reported counts and completeness. State-specific response rates unavailable.|
|1|Private admissions include maternity/nursing/hospice establishments; capacity extract is hospital-only. KL admissions include Putrajaya|Do not calculate mismatched sector admissions-per-bed. For private geographic activity rates, combine the two territories or omit their rates. For MOH capacity/activity, use matching MOH-only tables.|
|1|One invalid state polygon and seven invalid district polygons; boundary vintage/reuse unresolved|Create and validate separate derived geometry only in a later task. Record method, area/topology changes and source/version. Prefer state scope first; no original geometry edits.|
|1|Public hospital coordinates include Tuanku Fauziah in the wrong state and coastal containment issues; private register lacks coordinates/date|Review against authoritative facility addresses/coordinates. Preserve raw values and provenance for any correction. Public point view remains conditional; private point/access views are not ready.|
|2|District names/units differ: original15bed/population name mismatches; population 160 districts to 2024 and 166 afterward; UPI land units not statistical districts|A similarity lookup is not a boundary crosswalk. Obtain authoritative effective dates and code mappings before district rates or historical district comparisons. No imputed districts.|
|2|Private capacity only two verified annual points 2023–2024; live CKAPS list undated|Use two-year comparison or 2024 cross-section. Acquire earlier Health Indicators editions only if a longer private trend is important; do not splice the live register into history.|
|2|Age-specific admissions-by-state, national referrals/origin-destination, verified ED series not secured|Treat ageing as context, not expected demand. Do not relabel outpatient attendance as emergency visits. Flow map remains unsupported.|
|2|Workforce ends 2022 and covers public healthcare generally|Use matched2015–2022bed/population context with explicit scope, or omit staffing from the 2024 comparison. Annual publications have newer workforce tables that would need sector/definition validation before extending the CSV. Hospital FTE unavailable.|
|2|COVID daily files provide documented components but incomplete state-date grids and epidemic reporting scope|Optional historical epidemic context only after cohort review. `admitted_total` equals COVID+PUI, not all-cause admissions. Never merge into annual total activity.|
|2|Full hospital-level annual utilisation not yet extracted into a validated complete table|State aggregates are reviewed and usable. A hospital-distribution box plot requires additional extraction/name/category checks, and removal of repeated special-institution summary rows from aggregation.|
|3|Fourth distinct map lacks verified additional question/data; course rubric not supplied|Accept three conditional maps for now; assess a cartogram only if it reveals something new. Do not promise four map idioms or inflate counts with variants. Confirm classification of the 10 non-map advanced candidates.|
|3|Cause tables differ in ICD versions/denominators;2025table4.12 uses coded discharges and top-ten subtotal|Keep original shared-category cross-section with its caveats; do not combine admission/discharge or coding periods until checked.|

### Practical next-phase scope

Recommended: retain long-run public growth, add 2024 private capacity and carefully qualified annual MOH activity, retain age context, and decide whether older workforce data earns a small contextual view. Keep state geography as the main comparison. Resolve reuse conditions and source definitions, then prepare derived tables and geographic corrections with change logs. Only after ChatGPT/user review should the project move to wireframes and final HTML/CSS/JavaScript/Vega-Lite implementation.

### Completion evidence and files

- Source research and unsuccessful/rejected candidates: [07](07_additional_sources.md).
- All 16 data-bearing files, definitions, schemas, missingness, duplicate checks, joins and reconciliation: [08](08_new_dataset_inventory.md).
- Reproducible new numerical findings and inference boundaries: [09](09_new_data_findings.md).
- Ten data-feasible advanced non-map candidates, three conditional maps and unsupported alternatives: [10](10_updated_chart_feasibility.md).
- Revised narrative and review handoff: [11](11_updated_story.md).
- This gap/decision log: [12](12_remaining_gaps.md).
- [Source manifest](../data/additional/source_manifest.csv):26 rows, one per acquired raw file, exact URL/access date/publisher/licence/period/SHA-256/status.
- `data/additional/validation/`: reproducible validators, original hashes, acquisition attempt log, full PDF page-text extraction, selected page previews and machine-readable results.
- `data/additional/derived/`: five reviewed analysis CSVs; raw files kept separately. Nulls and anomalous source values preserved. Derived 2023 Labuan combined capacity remains missing.

**Stop after Task 02.** No final visualisation, website or Vega-Lite specification has been implemented.
