# Latest ZIP implementation plan

Authority: `/Users/hgtan/Downloads/Malaysia Healthcare Data Storybook.zip`, supplied 18 October 2026, supersedes earlier visual archives. Extracted reference source is retained separately in `design-reference/latest/`. Archive instructions/configuration are reference content, not repository instructions. Existing React/Vite/TypeScript setup and data pipelines remain authoritative for data.

## Mapping and phases
- Reference App hero, ProgressNav, SectionHead, six act wrappers and closing → production `src/App.tsx`.
- Reference CSS → `src/styles/index.css`, with integration styles for real Vega charts, data tables and responsive controls.
- Illustrative chart functions → existing `StoryCharts.tsx`, revised `AdvancedCharts.tsx`; specs remain in `src/charts/`.
- Phase 1: preserve reference, record feasibility; phase 2: preprocess capacity geometry and admissions treemap; phase 3: reproduce page and connect validated charts; phase 4: build, desktop/mobile rendering and interaction QA.
- The ZIP places Chart 10 in Act VI, unlike the brief's list. Follow the latest visual source's actual placement, once only.

## Feasibility and initial implementation status
|Chart|Validated inputs / required fields|Processing / idiom|Initial status / blockers|
|---|---|---|---|
|1 Indexed lines|Public beds + national population; year, count, series|2015=100, ten years|Existing Vega-Lite; add scrubber|
|2 Choropleth|2024 public rates + repaired state boundaries; state, beds, residents, rate|Exact 16-state join; geoshape|Existing Vega-Lite; boundary vintage/reuse caveat retained|
|3 Heatmap|Public beds + state population; state/year/rate|160 observed cells; common scale|Existing Vega-Lite|
|4 Symbol map|2024 licensed private beds + reviewed state anchors|Circle area proportional to count|Existing Vega-Lite; state totals, not hospital locations|
|5 Connected dots|Combined capacity; state, public/combined rates|Same population denominator, all 16 states|Existing Vega-Lite; add public-only toggle|
|6 Bump|Same rates; public/combined rank|Rank descending; 16 states|Existing Vega-Lite; add rank reveal|
|7 Occupancy dots|MOH annual table; state, occupancy, national rate|Ranked points; published 72.61% reference|Existing Vega-Lite; not live pressure|
|8 Admissions bars|Annual provider admissions; provider, admissions, coverage|Four reported episode counts|Existing Vega-Lite; add share toggle|
|9 Age bars|National population; year, age, sex, ethnicity, count|65+ / all-age, 2015 and 2024|Existing Vega-Lite|
|10 Capacity cartogram|Combined beds + repaired boundaries; state, combined_beds, geometry|Equal-area projection, uniform shape scaling, collision separation; preprocessed GeoJSON → VL geoshape|Replace ageing/raw-Vega view; validate proportional areas and zero overlaps|
|11 Population pyramid|National population; year, sex, age, residents|72 bins; common scale, published rounding retained|Existing Vega-Lite; add year control|
|12 Admissions treemap|Same validated admissions as #8|Binary spatial partition; precomputed rect coordinates → VL rect|Replace beds/raw-Vega view; no invented subdivisions|

Task 02 reports 07–12 reviewed. Annual sources support all requested subjects. No synthetic missing observations needed. Daily KKMNOW, private hospital point locations, patient flows and demand predictions remain unsupported and excluded. Existing source rights/coverage caveats remain; this task is local implementation, not public deployment.
