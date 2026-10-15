# Task 03 — Build Malaysia's Hospital Divide V1 Website

We have completed Task 01 (initial dataset audit), Task 02 (additional dataset acquisition and feasibility analysis), and the Figma Make visual prototype.

Now implement Version 1 of the actual data visualisation website.

Read and follow `agents.md` before beginning.

## Available resources

1. Task 01 and Task 02 reports, numbered 01–12.
2. Original and newly acquired healthcare datasets.
3. Source manifest and data provenance records, where available.
4. Figma design-reference files:
   - `design-reference/App.tsx`
   - `design-reference/index.css`
   - `design-reference/main.tsx`

The Figma files contain the approved design, including the complete narrative layout, styling and illustrative chart components.

The website must reproduce this visual direction while replacing hardcoded chart illustrations with real Vega-Lite visualisations.

## Phase A — Inspect and plan

First inspect the repository and identify:
- Available data files and schemas.
- Existing application code.
- Dependencies and build configuration.
- Design-reference files.
- Research reports.
- Existing scripts.
- Missing inputs.

Read the Task 02 reports carefully.

Produce a concise implementation plan and a chart feasibility table showing:
- Chart name.
- Required datasets.
- Required fields.
- Whether sufficient validated data exists.
- Processing requirements.
- Expected visualisation idiom.
- Blockers, if any.

Use the actual reports to determine feasibility rather than assuming all proposed charts are ready.

Proceed with supported charts and document blocked ones.

## Phase B — Prepare chart-ready datasets

Create reproducible processed CSV/JSON datasets for each supported chart.

Required chart data:

1. Public hospital beds and population by year, 2015–2024.
2. Public hospital beds per 10,000 residents by state, 2024.
3. Public hospital beds per 10,000 residents by state and year, 2015–2024.
4. Public and combined public/private hospital beds per 10,000 residents by state, 2024.
5. MOH annual bed occupancy by state, 2024.
6. Reported admissions by provider, 2024.
7. Population aged 65+ statistics for 2015 and 2024.

Use the actual validated datasets.

Do not generate synthetic data to complete missing records.

Check units, denominators, join keys, reporting coverage and source definitions.

Create a short validation report recording the checks and results.

## Phase C — Implement the website

Use React, TypeScript and Vega-Lite with Vega-Embed, unless an existing compatible project setup provides a better implementation path.

Reproduce the Figma design as closely as practical.

Preserve:
- Hero composition.
- Typography.
- Colour palette.
- Editorial spacing.
- Six chapter sequence.
- Chart cards.
- Source notes.
- Statistical callouts.
- Terracotta private-sector reveal.
- Dark conclusion.
- Methodology footer.

Use the existing Figma source as a reference or starting point, but keep production application code separate from `design-reference/`.

Do not leave hardcoded illustrative SVG charts in place when validated data-driven versions can be implemented.

## Phase D — Implement visualisations

Implement these in story order:

**Chart 1 — Indexed line chart**
Public hospital beds versus population, 2015–2024.

**Chart 2 — Choropleth**
Public beds per 10,000 residents by Malaysian state, 2024.

**Chart 3 — Heatmap**
State-year public bed rates, 2015–2024.

**Chart 4 — Connected dot chart**
Public versus combined capacity by state, 2024.

This is the main hero visualisation. Make it prominent and show all validated states.

**Chart 5 — Ranked dot plot**
MOH annual bed occupancy by state, 2024, with a national reference.

**Chart 6 — Horizontal bar chart**
Reported admissions by provider, 2024.

**Chart 7 — Demographic visualisation**
Population ageing, 2015 versus 2024.

If a chart is blocked by missing or invalid data, preserve the section with an explicit explanation. Do not fabricate observations.

## Phase E — Improve interactions and usability

Implement:
- Useful hover tooltips.
- State highlighting where appropriate.
- Direct labels for important findings.
- Meaningful chart ordering.
- Responsive layouts.
- Consistent chart colours.
- Readable legends and axis labels.

Avoid unnecessary interactions.

## Phase F — Test and verify

Run the application locally.

Verify:
- The project builds successfully.
- Each implemented chart renders.
- Chart data matches validated datasets.
- Geographic joins work correctly.
- No invented values appear.
- Charts remain readable on desktop and mobile.
- The website retains the Figma visual direction.

If browser preview or screenshots are available, inspect the actual rendered website and correct layout issues.

If browser access is unavailable, report that limitation rather than claiming the visual inspection passed.

## Deliverables

1. Functional V1 website.
2. Vega-Lite chart specifications/components.
3. Chart-ready datasets.
4. Reproducible data processing scripts.
5. Validation report.
6. Local run instructions.
7. Implementation summary.
8. Remaining issues and V2 backlog.

## Important constraints

- Do not redesign the website from scratch.
- Do not invent data.
- Do not overwrite original research datasets.
- Do not silently change hospital-sector definitions.
- Do not remove source notes or caveats.
- Do not add unrelated features.
- Do not assume Figma's hardcoded values are authoritative.
- Do not claim completion for charts that remain placeholders.

## Working approach

Implement the website incrementally and commit after meaningful milestones.

Prioritise a functioning, visually coherent V1 over optional enhancements.

Use the available data to make the website as complete as possible.

At the end, report exactly what was completed, what was validated, and what still needs work.

Begin by inspecting the repository and reading the design references and Task 02 reports, then proceed with implementation.