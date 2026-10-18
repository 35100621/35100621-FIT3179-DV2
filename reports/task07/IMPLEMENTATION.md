# Latest Storybook implementation

The 18 October ZIP is retained in `design-reference/latest/`; production code is separate. Its hero, editorial type, navy/cream/coral palette, six acts, sidebar/overview, split chart arrangements, bed illustration and coral closing are reproduced. The latest ZIP overrides older design instructions: notably the capacity cartogram appears once in Act VI and the closing is coral.

All twelve views use Vega-Lite through Vega-Embed. No illustrative chart SVGs or fabricated observations remain. Decorative hospital-bed shapes remain CSS. All 16 states/territories are preserved; the prototype only illustrated 12.

New preprocessing: `scripts/prepare_storybook.py` (Shapely 2.2.0). Cartogram polygons use an equal-area projection, area proportional to 2024 combined beds, uniform scaling and deterministic separation; they are rendered with Vega-Lite identity-projected geoshapes. The geography/capacity toggle switches datasets. The admissions treemap uses binary partition coordinates rendered with Vega-Lite rectangles; four provider categories exhaust the published reported total. No unsupported provider subcategories were invented.

Existing annual data, original research and source notes are retained. New output checks are in `data-validation.json`. The national narrative correctly says public beds grew faster than population. Two observed demographic years replace fictional projections. Population structure is not a hospital-demand estimate.

Interactions: linked state selectors and chart clicks, regional map views, indexed year scrubber, connected-chart public/combined toggle and sorting, bump rank reveal, admissions count/share switch, pyramid year switch, capacity/geography switch, chapter overview, scroll reveals, reduced-motion support, tooltips and CSV downloads.

## Local reproduction

```
npm install
npm run dev
npm run build
npx playwright test
# Python environment with scripts/requirements.txt installed:
python scripts/prepare_storybook.py
```

Vite retains the GitHub Pages base `/35100621-FIT3179-DV2/`. No hosting or publication was performed.

## Remaining limitations / V2

- Public release still needs source-reuse review; retain source links and coverage qualifications.
- External Google Fonts and the reference hero photograph need network access; bundled fonts and a dark background provide fallbacks.
- Vega/data bundle is large; code splitting and geometry simplification could improve initial load.
- Chart state changes re-embed Vega-Lite; controls function, but mark transitions are not a frame-for-frame copy of the illustrative animation.
- Real 16-state charts need more vertical space than the 12-state prototype. Small-screen layouts stack panels.
- No private hospital point locations, patient flows, current daily pressure or demographic projections are claimed.
- Historical Task 04 byte audit includes the old production CSS and therefore intentionally fails after this requested redesign; research input preservation is checked separately.
