# V1 implementation record

Approved design: `design_reference/` (actual folder name). React/TypeScript/Vite + Vega-Lite/Vega-Embed; production code remains separate. Preserve the six chapters, editorial palette, type and spacing. Replace sample charts and stale incomplete-data copy. Build locally; do not deploy or redistribute full source PDFs.

Implementation sequence: (1) reproducible chart data and geometry QA, (2) seven Vega-Lite views in the approved composition, (3) build, data and desktop/mobile browser verification, (4) document results and stop at V1.

| Chart | Required fields / inputs | Data feasibility and processing |
|---|---|---|
| Indexed lines | Public beds date/state/district/type/beds; national population date/sex/age/ethnicity/population | Complete 2015–2024; total filters, thousands→people, 2015=100. |
| State choropleth | 2024 state public beds/population; state GeoJSON | 16 exact names; repair only derived Sarawak polygon, document area/topology; source vintage remains unverified. |
| Heatmap | State beds/population, 2015–2024 | 160 complete state-year observations; same denominator and colour scale. |
| Connected dots | 2024 state public beds + licensed private hospital beds (HI2025 table4.4), population | All16 states; exclude other private establishments, calculate rates/ranks; linear axis must include Putrajaya. |
| Occupancy dots | HI2025 table4.6 state BOR and national row | 16 states; use published annual MOH rate and72.61% national reference, not daily dashboard averages. |
| Admissions bars | HI2025 table4.13 national sector counts | Four groups; reported episodes; show97.94% MOH submission /82.33% private response and private-scope caveat. |
| Ageing | National population by age for2015/2024 | Sum65–69 through85+, both sexes/overall ethnicity; divide by all-age total; no rounded icon counts. |

No numerical chart is blocked. A valid derived state map is subject to technical repair checks. Local implementation is authorized; publication reuse conditions and author attribution remain release items.

## Outcome

All seven views are implemented. The geometry gate passed; Sarawak was repaired only in a derived copy. The prior missing-data placeholders were removed, and all16state/federal-territory observations are present. See `V1_VERIFICATION.md` for final build/browser results and `DATA_VALIDATION.md` for data checks. The website is a local V1 draft; no deployment or V2 implementation occurred.
