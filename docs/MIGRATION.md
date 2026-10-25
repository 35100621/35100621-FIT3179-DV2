# Migration inventory

Audit: 25 October 2026. No agent.md exists. Original implementation retained until replacement verification; original source remains recoverable in Git. Pre-existing test deletions are not reversed; migrated JavaScript tests are used for verification.

| Component | Current implementation | Target | Risk |
|---|---|---|---|
| Nine core charts | src/charts/specs.ts | Editable JSON with parameters/transforms | Medium: dynamic sorting, labels, responsive settings |
| Three advanced charts | src/charts/advanced.ts | Editable JSON | High: cartogram fitting and original footprints |
| Colours and hover signal | presentation.ts / VegaChart.tsx | Colours and parameters in JSON | Medium |
| Rendering | React VegaChart, ResizeObserver | Generic vanilla JSON loader and Vega-Embed | Medium |
| State selection | React context, custom chart-state events | Central store; Vega signals and DOM panels | High |
| Controls | React buttons, range, select | Same HTML, DOM event listeners | Medium |
| Narrative / tables / sources | JSX | Static semantic HTML | Low: preserve text and whitespace |
| Motion / navigation | React effects | IntersectionObserver, requestAnimationFrame | Low |
| Layout and fonts | CSS and font packages | Identical CSS and font imports | Low |
| Data preparation | Python; processed CSV/JSON | Preserve sources and calculations | Low |
| Build/deploy | TypeScript + React + Vite | Vanilla Vite, JSON validation, GitHub Pages | Medium |

## Interaction audit

1. Indexed lines: year slider moves reference rule and updates numeric readout, all years retained.
2. Choropleth: three region buttons, tooltip, click-to-select, hover outline and linked insight.
3. Heatmap: state/year tooltip, state selection and dimming, historical insight.
4. Private symbols: region buttons, tooltip, circle outline emphasis, selection.
5. Connected dots: public/combined toggle, three sort orders, selection; all 16 states retained.
6. Rank slope: reveal/reset, click/hover, rank movement insight.
7. Occupancy: national reference, click/hover, published-rate insight.
8. Admissions: counts/share switch, tooltips.
9. Ageing: two bars, count-up callouts, data table.
10. Cartogram: geography/capacity, original outlines, three regions, linked footprint hover and selection.
11. Pyramid: 2015/2024 switch, fixed shared scale.
12. Treemap: tooltip, responsive internal labels, external provider key.

Shared features: search/datalist, selection reset including regions, chapter overview, active chapter/progress line, anchors, reduced motion, data-table expand/collapse and CSV downloads. No interactive legend existed; legends are explanatory.

## Design and data constraints

Preserve SVG rendering, exact marks/scales/projections, original colour remapping, 320/448/560/510/470/260/210/450/420 px chart heights and responsive map heights, labels and fonts. Retain all observations and source caveats. Initial JSON snapshots duplicated geometry (~15 MB); migration will reference cached shared datasets rather than embedding repeated coordinates.

No new data or chart idioms are introduced. Bed illustrations remain decorative CSS artwork; map/statistical diagrams use Vega-Lite. Twelve charts do not imply twelve distinct or advanced idioms. Three map idioms: choropleth, proportional symbols, non-contiguous cartogram. HD advanced-idiom status is not asserted without rubric interpretation.

## Completed architecture

All twelve canonical definitions now live in `specs/`; the complete linked inventory and dataset/source mapping are in the README. `index.html` replaces App and chart-card JSX. `js/charts.js` replaces VegaChart, `js/interactions.js` replaces chart controls/StateInsights, `js/state.js` replaces React context, and `js/motion.js` replaces StoryMotion. CSS is preserved with one native `[hidden]` rule added for DOM-controlled visibility.

All statistical graphics render standalone from valid Vega-Lite 6 JSON. Year/region filters, sorting, rank/capacity switches and share calculations are native parameters/transforms. The external host still supplies hover/click signals, HTML controls, linked panels and responsive metadata patches. Thus a standalone JSON preserves the chart graphic, but does not reproduce the surrounding interactive webpage. Cartogram/treemap layouts retain the existing precomputed data.

The original code was removed only after all 24 migrated original browser tests passed. Source remains in Git history at `2f6d82e`. No observation values or coordinates were changed; data publishing only compacts JSON and adds a layout tag to the combined cartogram dataset.

## Executed verification

- `npm run build`: passed, including schema/compile/render validation; Vite reports a nonfatal >500 KB chunk warning for the Vega bundle.
- `npm run validate:specs`: 12 valid specifications, 36 standalone SVG scenarios (default/390px/320px with alternate parameters); no Vega-Lite compiler warnings.
- `npm run test:specs`: three tests passed: manifest/HTML coverage, no application React/TS/TSX/JSX, processed/published data equality and deterministic republishing.
- `npm test`: 30 passed across 1280, 1024, 768, 1440, 390 and 320 pixel viewports. Covers existing functional/data assertions plus resource URLs, CSV downloads and request-cache checks. No browser console errors in covered scenarios; no horizontal overflow.
- `npm run format:check` and `git diff --check`: passed.
- Production JavaScript decreased from approximately 2.44 MB to 858 KB uncompressed. All public datasets together are approximately 2.7 MB; canonical specifications approximately 84 KB. Fonts and the hero image retain their original hosting choices.

## Visual comparison

Captured original and migrated hero plus all six acts at 1440, 1280, 390 and 320 pixels (28 screenshot pairs), with reduced motion and fonts loaded. Original and migrated hero captures were identical. Section and chart container dimensions matched except a 4 px heatmap height difference at 390 px. No redesign or chart/content removal was made.

The migration is not claimed to be pixel-identical: SVG axis-label measurement/placement differs slightly, with approximately 9 px of plot-width redistribution in the 390 px occupancy chart. Screenshot comparison found up to 2.24% pixels differing by more than 12 RGB levels in equal-sized sections. Manual comparison confirmed unchanged decorative artwork, chart colours, ordering and values; map projections and geometries are unchanged. Screenshots and extracted SVG/layout records are retained locally under ignored `tmp/migration/`.

## Assignment scope and remaining limits

Twelve charts and three distinct map idioms remain, on one vertically scrollable page. JSON descriptions are maintained in the repository and published with the site. MOH and DOSM source citations, interpretation caveats and original data methods remain. This migration does not claim eight rubric-approved advanced idioms; the existing collection needs separate rubric assessment for that HD criterion. Decorative CSS bed artwork remains outside Vega-Lite, as before.

External source websites, Google Fonts and the Unsplash hero asset remain external dependencies. Local tests verify site-owned resources; availability of every third-party citation over time is not guaranteed.
