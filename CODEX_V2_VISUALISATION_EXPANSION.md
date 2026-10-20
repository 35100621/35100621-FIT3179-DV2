# Task 05 — Expand the FIT3179 Hospital Divide Data Story

Read `AGENTS.md` first. Inspect the current working website, datasets, scripts, and research reports before making changes.

## Objective

Extend **Malaysia's Hospital Divide: Why Public Beds Tell Only Half the Story** with the seven additional visualisations below. Keep the existing six-chapter editorial website, its seven current charts, palette, typography, and responsive layout. Integrate the new charts into the story rather than appending a dashboard.

The FIT3179 DV2 rubric calls for **more than 10 charts, at least 8 effective advanced idioms for the HD idioms criterion, and at least 3 different map idioms**. Small multiples or a series of similar charts count as one chart. All maps/diagrams must use Vega-Lite or Vega unless the tutor has approved an exception. Make readable JSON chart specifications available in the GitHub repository. Keep total downloadable data below a few megabytes.

## New visualisations and distinct story questions

| New # | Idiom | Specific question and encoding | Placement |
|---|---|---|---|
| 8 | **Proportional symbol map** | **Where are licensed private beds concentrated in absolute numbers?** Overlay area-proportional circles sized by **2024 private hospital bed count** on recognisable Malaysian state geography. Do not colour by combined capacity. Annotate the concentration in Selangor, Kuala Lumpur, and Pulau Pinang. | Chapter 3, before the Dorling cartogram |
| 9 | **Point location map** | **Where are verified public hospital facilities located, irrespective of bed counts?** Plot verified facility coordinates as equal-sized points, with classification and source/vintage clearly labelled. Do not imply equal capacity or accessibility. Use only if a trustworthy coordinate dataset exists. | Chapter 2, after the heatmap |
| 10 | **Bump chart** | **Which states change relative rank when private beds are counted?** Two columns/stages: 2024 **public-only rate rank** versus **combined rate rank**, all 16 states/territories. Highlight the largest movers and show the rank shift; do not repeat the connected-dot chart's numeric bed-rate emphasis. | Chapter 3, after the connected-dot chart |
| 11 | **Population pyramid** | **How has Malaysia's full age structure changed, beyond the 65+ headline?** Age groups by sex, using validated 2015 and 2024 population observations; toggle or compare years, with consistent age bins and scales. Do not infer hospital demand from age structure. | Chapter 6 |
| 12 | **Treemap** | **What provider categories make up recorded 2024 capacity?** Rectangle area proportional to beds for MOH hospitals, MOH special institutions, other-government beds, and licensed private hospital beds. Label categories, counts, and shares; define exclusions. This is a national **composition** story, not a geographic concentration story. | Chapter 3, after rank analysis or as a compact bridge to Chapter 4 |
| 13 | **Waterfall chart** | **What explains the change in recorded combined capacity from 2023 to 2024?** Start at 2023 combined beds; show public-bed change and private-bed change; end at 2024 combined beds. Recalculate and verify every number from existing source data. Explain that this is a one-year change, not a decade-long private-sector trend. | Chapter 1, after indexed growth chart |
| 14 | **Dorling cartogram** | **How is total recorded hospital capacity distributed across states, and how private-heavy is each state's mix?** Replace state polygons with **non-overlapping circles**, whose **areas** are proportional to **2024 combined public + licensed private beds**. Colour by **private share of combined capacity**. Use approximate geographic positions and preserve the Peninsular/East Malaysia distinction. This is *not* a proportional-symbol overlay. | Chapter 3, after the private-bed proportional symbol map |

## Resolve overlap deliberately

- **Proportional symbol map vs Dorling:** The former maps **private beds only** against actual geography; the latter replaces geography with circles for **total combined capacity**, using colour for private share. Different quantities, marks, and interpretive messages.
- **Connected dot vs bump:** Keep the existing connected-dot chart about **absolute change in beds per 10,000**. Make the bump chart about **relative rank movement**, with a different headline and annotations.
- **Ageing bar vs pyramid:** Convert the existing 2015/2024 ageing bar chart into a **prominent 5.84% → 7.66% statistical callout** if the pyramid makes the bar redundant. Do not count that callout as a separate chart. Verify that the resulting chart count and advanced idiom count still satisfy the rubric.
- **Treemap vs Dorling:** Treemap = **national provider composition**; Dorling = **state geography and private share**.

## Data and implementation rules

1. Audit available datasets first. Reuse verified 2023–2024 public/private state data, age-by-sex population data, geographic boundaries, and any validated facility register. Do not invent observations, facility coordinates, or map geometry.
2. Validate 2023/2024 totals and all 16 state/federal territory joins. Ensure circle **area**, not radius, represents magnitude. Handle zero private-bed values honestly.
3. Implement genuine idioms. A set of overlapping bubbles on a base map is **not** a Dorling cartogram. If necessary, use Vega's supported layout/transform capabilities or a reproducible preprocessing step to calculate non-overlapping cartogram coordinates, then render using Vega/Vega-Lite. Do not relabel a simpler map as a cartogram.
4. If reliable public hospital coordinates or age-by-sex data are unavailable, **do not fabricate them**. Report the blocker and propose a clearly differentiated replacement advanced idiom based on verified data. Obtain approval before replacing a planned chart.
5. Keep sources, years, definitions, reporting coverage, and limitations next to each chart. Avoid claiming that recorded beds imply access, affordability, staffing, operational availability, or patient catchments.
6. Use Vega/Vega-Lite for each chart, with human-readable chart specifications committed to the repo. Keep chart data lightweight and ensure assets work under the GitHub Pages Vite base path.
7. Build clear titles, annotations stating the actual finding, labels, units, accessible colours, tooltips, and responsive sizing. Interactions must support the narrative, not be decorative.
8. Keep the page as one continuous scroll, with no horizontal overflow on a small laptop. Maintain the established Figma-inspired editorial styling.
9. Preserve existing validated datasets and working V1 charts except for the optional ageing-bar-to-callout change. Avoid unrelated refactors.

## Workflow

1. **Feasibility audit:** Check each of the seven new charts against actual available data. Record feasible/blocked status, exact source files, key derived fields, and proposed finding. Do not stop at this plan: implement all feasible charts.
2. **Prepare data:** Write or extend reproducible scripts for chart-ready assets. Preserve originals and document any derived calculations and geographic positioning.
3. **Implement incrementally:** Add the seven charts in their specified chapters, with distinct annotations and explanatory transitions. Make logical Git commits.
4. **Verify:** Run existing data checks, type checking, production build, and browser preview. Confirm all existing and new charts render, map points and legends are correct, interactions work, and no runtime assets return 404. Test desktop and mobile.
5. **Rubric audit:** Report the final number of independently counted charts, **distinct** advanced idioms, and **different** map idioms. Do not inflate counts by counting small multiples or duplicated idioms as separate.
6. **Document:** Update README, chart/source manifest, citations, and a concise V2 implementation report. Note any unresolved licence, attribution, or geography issues.

## Completion criteria

Deliver a working, verified V2 website with the seven new visualisations wherever supported by validated data. Report any blocked items explicitly; do not claim they were implemented. Preserve the existing narrative and visual quality. Do not stop after drafting a plan, and do not start unrelated redesign or V3 work.
