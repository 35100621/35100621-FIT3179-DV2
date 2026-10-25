# Visualisations

All twelve specifications were schema-validated and rendered during migration. Dataset filenames refer to `public/data/`; source meanings and caveats are recorded in [data methods](DATA.md).

| Chart / canonical JSON | Dataset / source | Preserved controls and interaction |
|---|---|---|
| [1. Indexed line](../public/specs/01-indexed-line.json) | `indexed_growth.json`; MOH beds + DOSM population | Year slider/reference rule, readout, tooltip |
| [2. Choropleth](../public/specs/02-choropleth-map.json) | `states.geojson`; DOSM boundaries joined to public-bed rates | Region, hover outline, shared state selection |
| [3. Heatmap](../public/specs/03-heatmap.json) | `state_rates.json`; MOH + DOSM | State/year tooltip, selection, historical insight |
| [4. Proportional-symbol map](../public/specs/04-proportional-symbol-map.json) | `states.geojson`, `private_bed_locations.json`; licensed private beds | Region, state selection, hover and tooltip |
| [5. Connected dots](../public/specs/05-connected-dot.json) | `combined_capacity.json`; public + private beds, DOSM population | Public/combined toggle, three sort orders, selection |
| [6. Rank slope](../public/specs/06-rank-slope.json) | `combined_capacity.json`; public/combined rates and ranks | Reveal/reset ranks, selection and tooltip |
| [7. Ranked occupancy dots](../public/specs/07-ranked-dot.json) | `occupancy.json`; Health Indicators 2025 table 4.6 | National reference, state selection and tooltip |
| [8. Admissions bars](../public/specs/08-admissions-bar.json) | `admissions.json`; Health Indicators table 4.13 | Count/share switch and tooltip |
| [9. Ageing bars](../public/specs/09-ageing-bar.json) | `ageing.json`; DOSM national population | Tooltip; external animated callouts |
| [10. Non-contiguous cartogram](../public/specs/10-non-contiguous-cartogram.json) | `capacity_shapes.json`; validated DOSM boundaries + combined capacity | Geography/capacity, region, original outlines, linked hover/selection |
| [11. Population pyramid](../public/specs/11-population-pyramid.json) | `population_pyramid.json`; DOSM age/sex population | 2015/2024 switch and tooltip |
| [12. Admissions treemap](../public/specs/12-admissions-treemap.json) | `admissions_treemap.json`; reported admissions, precomputed rectangle layout | Tooltip and responsive internal labels |

Use GitHub’s **Raw** button to access JSON. Published files use the same filenames under the website’s `specs/` directory, for example [choropleth JSON](https://35100621.github.io/35100621-FIT3179-DV2/specs/02-choropleth-map.json). Each specification references `../data/...`, resolved relative to its specification URL by the website loader. When using another Vega host/editor, retain the `specs/` and `data/` relative structure or configure its loader base URL accordingly.

### Standalone behaviour and external coordination

Each JSON renders its default chart independently with valid data references. Native parameters and expressions implement the year/region filters, capacity/rank switches, sorting and percentage calculations. Tooltips work in a tooltip-enabled host such as Vega-Embed.

The surrounding HTML buttons, state search, shared selection across seven views, detail panels, scroll animations and responsive resizing require the vanilla JavaScript host. Hover/click listeners update `hoveredState` and `selectedState`; an isolated JSON does not recreate those DOM controls or cross-chart links. No chart graphic requires React.

`usermeta.responsive` contains JSON-pointer patches for axis/legend/height properties that Vega-Lite cannot express as signals. `usermeta.parameterPatches` changes the admissions axis title when switching count/share. `prepareSpec` applies these generically; chart-specific marks/encodings remain in JSON. A standalone host ignores this optional metadata and uses the supplied default layout/title. For exact appearance, provide the page’s fonts and background colours (charts have transparent backgrounds).

Cartogram shapes and treemap rectangles use the existing Python-precomputed layouts. Decorative CSS beds are page artwork, not data diagrams. Legends are explanatory; the original site had no interactive legends.

