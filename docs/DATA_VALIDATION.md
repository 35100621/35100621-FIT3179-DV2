# V1 data validation

**PASS — 195 assertions.** Reproduce with `python3 scripts/prepare_data.py`. Full assertions, source/output hashes and geometry diagnostics: [data-validation.json](data-validation.json).

| Chart table | Rows | Check |
|---|---:|---|
| indexed_growth | 20 | Complete; no null chart measures |
| state_rates | 160 | Complete; no null chart measures |
| public_rates_2024 | 16 | Complete; no null chart measures |
| combined_capacity | 16 | Complete; no null chart measures |
| occupancy | 16 | Complete; no null chart measures |
| admissions | 4 | Complete; no null chart measures |
| ageing | 2 | Complete; no null chart measures |

## Reconciliation

- All 11 originals and 26 acquired raw files match the Task 02 SHA-256 evidence. No source edits.
- Ten annual observations per national series; all 160 state-year pairs. All 16 states/territories join exactly.
- Public beds: 52,048; private hospital beds: 19,920; combined: 71,968 in 2024. PDF public totals match the original CSV.
- MOH official/operational beds: 46,855 / 44,570; published national occupancy: 72.61%. State additive totals reconcile.
- Four admission groups sum to 4,270,356 reported episodes. No missing-report adjustment.
- Population is converted from thousands; both sexes / overall ethnicity selected once. National 65+ uses five bins, excludes all-age aggregate from the numerator, and uses the same-year overall denominator.

## Geometry

All 16 derived shapes valid. Only Sarawak required make_valid: 0.000000628446% planar area change, unchanged bounds and four polygon components. No simplification. Clockwise D3 winding changes ring order only. Small existing interstate boundary overlaps are recorded, not silently clipped (maximum about 0.000139 square degrees). This is adequate for the V1 state display, not a certified legal/statistical boundary revision. Effective vintage remains undocumented.

## Scope

Year-end beds use same-year mid-year resident estimates. Combined capacity adds licensed private hospital beds to public hospitals and special institutions; it is not operational or accessible capacity. Annual occupancy covers MOH only. MOH admissions submission: 97.94%; private response: 82.33%. Private admissions include maternity/nursing/hospice institutions. No invented or interpolated observations. PDF physical pages 133, 137, 140–152 and 160 are re-extracted directly. Public-release reuse conditions remain unresolved.
