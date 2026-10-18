# Visual storytelling redesign

## Scope and implementation plan

The pasted redesign request supersedes the original V1 build brief. The repository already contains nine functioning Vega-Lite charts, processed data, processing scripts and Task 01–04 provenance/validation reports. Retain these, the six chapters and the approved palette/typefaces. No new data acquisition or calculation is needed.

1. Widen primary graphics and introduce editorial sidebars and different supporting-chart layouts.
2. Add a restrained hospital vector motif, once-only statistic counts and section/ranking reveals, with reduced-motion support.
3. Build and check production rendering, data preservation, chart interactions and responsive layouts at the existing GitHub Pages base path.

## Existing chart feasibility

| Chart | Existing validated inputs/fields | Processing needed for redesign | Idiom / status |
|---|---|---|---|
| National growth | indexed_growth: year, series, count, index | None | Indexed lines; complete 2015–2024 |
| Public capacity map | public_rates_2024: state, beds, residents, rate; validated state geometry | None; retain exact existing join | Choropleth; 16 states/territories |
| Public capacity history | state_rates: state, year, rate | None | Heatmap; 160 observations |
| Private locations | private_bed_locations; combined_capacity private_beds; validated geometry | None | Proportional symbols; state totals, not facility locations |
| Combined capacity | combined_capacity: state, public_rate, combined_rate | None | Connected dots; all 16 states |
| Rankings | combined_capacity: public_rank, combined_rank | None | Bump chart; existing rank methodology |
| Occupancy | occupancy: state, occupancy; summary national_occupancy | None | Ranked dots; published national reference |
| Admissions | admissions: provider, admissions, coverage | None | Four horizontal bars; reporting caveats retained |
| Ageing | ageing: year, share, older_residents, residents | None | Existing demographic comparison; 2015/2024 |

No chart is blocked. Task 02 restrictions remain: licensed beds do not measure access, occupancy covers MOH only, admissions scopes/coverage differ, geographic vintage/reuse is unresolved, and anomalous daily utilisation is not suitable for current-pressure claims. Existing chart footnotes and tables remain intact.

## Implementation

- `src/App.tsx`: wider editorial compositions; contextual sidebars; transition into combined capacity; adjacent ranking callout; stronger concluding separation; nine-view footer correction.
- `src/components/StoryMotion.tsx`: IntersectionObserver entrances, requestAnimationFrame count-ups with exact accessible final labels, reduced-motion checks and cleanup; lightweight decorative hospital SVG.
- `src/components/StoryCharts.tsx`: ageing statistics use the shared count-up component. No chart spec/data/control changes.
- `src/styles/index.css`: responsive editorial styles, map/analysis hierarchy, enlarged hero and capacity comparison, terracotta centrepiece and navy ending.

Motion never initially hides content, runs once per mount and does not modify Vega marks. Reduced-motion readers see final figures immediately. The ranking note uses sticky positioning only on wide desktops; mobile returns to normal flow. No dependencies added. Original datasets, processed datasets, geography, chart specifications and Vite base path remain unchanged.

## Local use

`npm install`, then `npm run dev`. Open the printed URL with `/35100621-FIT3179-DV2/`. Production: `npm run build`, then `npm run preview`. `npm test` runs the existing production browser checks. If port 5174 is already serving this build, use `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5174/35100621-FIT3179-DV2/ npm test`.
