# Focused two-chart addition

Added only the requested 2024 proportional symbol map (before connected dots) and bump chart (after connected dots). The seven original chart specifications and components are unchanged.

- Bump chart: all 16 states, two existing validated rank columns, rank 1 highest; gain/loss colours and Pulau Pinang 15 → 4 annotation. Same-year comparison, not a time trend.
- Symbol map: existing validated boundaries and licensed private counts. Linear size scale starts at zero: Vega-Lite symbol **area**, not radius, represents beds. Interior representative points of each state's largest polygon are display anchors, not hospital coordinates. Regenerate with `python scripts/prepare_private_locations.py` using the existing Python requirements.
- Selangor 5,496 + Kuala Lumpur 3,602 + Pulau Pinang 2,847 = 11,945 / 19,920 beds (59.96%). Zero-bed Labuan has no visible circle. Regional views, source notes, tooltips and accessible data tables included.

Validation: production build/TypeScript pass. All three production browser suites pass (1440, 390, 320 px), checking nine charts, 16 bump lines/32 endpoints, 16 map boundaries/state records and the seven original charts/interactions; no browser/HTTP errors or horizontal overflow. Mobile screenshots of both additions inspected. Source datasets and geographic assets unchanged; no research/downloads or unrelated V2 work.
