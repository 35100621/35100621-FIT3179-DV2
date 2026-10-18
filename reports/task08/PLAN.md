# Refinement plan

Inspected the twelve chart functions in `src/charts/specs.ts` and `advanced.ts`, their React wrappers, VegaChart event bridge, App state owner, CSS tokens/breakpoints, data imports and `prepare_storybook.py`. The seven state views already share selection via a custom click event, but Chart 04 ignores selected state and repeated dropdowns provide little insight. Cartogram switches between precomputed equal-area geometry arrays, losing original context. Source data, definitions and caveats are retained.

1. Add a reusable shared searchable state control, reset and chart-specific analytical panels; remove redundant selectors. Use temporary Vega hover signals and persistent React selection without filtering national charts.
2. Replace region selects with a shared segmented control in Charts 02, 04 and 10. Preserve denominators and quantitative scale domains.
3. Keep cartogram reference outlines in the same coordinate frame, add outline toggle and linked highlighting, reduce gap/displacement deterministically without size floors; revalidate 16 units, area proportionality, no overlaps and geographic ordering.
4. Centre treemap label groups with fit-aware omission, unify control metrics, improve paired-chart relationship, spacing and colour semantics.
5. Run production build, numerical checks and browser tests at 1440, 1280, 1024, 768 and 390 pixels. Inspect actual screenshots. Document limits and commit meaningful milestones.
