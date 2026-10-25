# Visual polish and accessibility review — 25 October 2026

Targeted implementation of `FIT3179_HD_Visual_Polish_Codex.md`, preserving the six-act story, twelve charts, vanilla JavaScript architecture and canonical JSON specifications. Baseline checkpoint: `4ecfe3b`; working branch: `codex/hd-visual-polish`. The tree was clean before this work. No datasets, geography, statistical formulas or denominators changed.

The supplied brief and live repository were reviewed. No assignment rubric PDF, 17-page reference PDF or AGENTS.md/agent.md was available in this repository. Rubric mappings below refer to the supplied brief, not independent confirmation of the official assessment rubric. All reported visual defects were checked in the local browser; none were inferred solely from PDF pagination.

## Audit and fixes

| Location | Observed defect | Severity | Criterion | Implemented fix |
|---|---|---|---|---|
| Six act introductions, desktop | Narrative paragraphs started several grid columns to the right of headings | Medium | Layout, typography | Shared intro left guide; preserve hero composition separately |
| Chart modules | Inconsistent heading, control, note and download spacing; incomplete chart numbering | Medium | Layout, storytelling | Shared module classes, inset and spacing tokens; complete chart eyebrows |
| Act II map/heatmap and Act III connected/slope pair | Different header/control heights displaced outer chart frames | Medium | Layout | Desktop row subgrids align frames and related explanatory rows |
| Act III private map | Sticky narrative appeared detached from the top of the map module; chart header hidden | Medium | Hierarchy | Top-align narrative and expose existing map header |
| Rank slope | Small labels were 10px; all state labels coral; large automatic gaps below plot | High | Typography, annotations | 12px labels, ivory text, selected/hovered emphasis, content-sized note spacing |
| Occupancy and connected dots | Numeric labels as small as 11px | Medium | Typography | Minimum 12px; preserve values and reference line |
| Pyramid, cartogram and mobile treemap | Some axis/legend/internal labels used 10px defaults | Medium | Typography | Explicit 12px text settings |
| Narrow admissions and ageing charts | Long axis titles and value labels exceeded available space at 320px | High | Responsive readability | Wrapped titles; data-dependent label alignment within bars |
| Narrow heatmap | Legend endpoint/title extended past frame at 320px | High | Responsive readability | Shorter gradient and wrapped title; preserve full 10–75 scale |
| Long state labels | Font could finish loading after Vega measured text, causing overflow | High | Typography | Await chart font loading before first embed |
| Chapter overview | Keyboard focus did not enter/wrap/return predictably | High | Accessibility | Labelled dialog, initial focus, Tab wrap, Escape close, return focus and chapter focus |
| Slider, source notes and controls | Small text and inconsistent control alignment | Medium | Typography, interaction | Shared sizes; mobile slider layout; visible focus; 44px button minimum |
| Metadata and tables | Years formatted with thousands separators; review/disclosure metadata needed updating | Low | Editorial completeness | Plain year labels; dated review and explicit AI acknowledgement |

## Alignment and typography system

`src/css/styles.css` supplies `--page-width` (1280px), `--chart-width`, `--page-gutter`, `--module-inset`, `--note-inset`, `--space-1` through `--space-7`, and shared body/annotation/source/control/chart-title type tokens. Existing `--page` and `--chart-pad` alias the new gutter/inset values. Mobile gutters are 20px, reducing to 16px at 360px and below.

All twelve modules use `.chart-module`. Desktop `.paired-grid` / `.module-panel` use subgrid rows for paired chart headers, controls, frames and notes. Below 1101px, panels stack normally. Outer chart frames align; Vega's internal axis margins remain chart-dependent. Sources/downloads share the frame's left guide. Callouts use the named note inset.

The hero's asymmetric heading/subtitle composition, the private-map narrative column, decorative bed artwork and intentional act breathing room remain. They are nested editorial compositions, not accidental indentation. Mobile navigation clearance is accounted for through scroll padding and bottom spacing. Figure colours and data encodings remain intact.

Body text remains around 16px, chart annotations 15px, source notes 13px and controls at least 12px. Rendered SVG text was checked for a 12px minimum. Rank labels use ivory for readability; line colours still convey gains/losses and the featured state, with numeric change labels providing additional information.

## Changed files

| Files | Change |
|---|---|
| `index.html` | Shared module/panel classes, chart numbers, ageing heading, dialog accessibility, focusable chapter targets, year formatting and metadata |
| `src/css/styles.css` | Shared layout/type/spacing system, paired rows, source/control alignment, mobile sizing and focus styles |
| `src/js/charts.js` | Wait for chart fonts before initial measurement/rendering |
| `src/js/motion.js` | Keyboard focus management for the chapter overview |
| `public/specs/03-heatmap.json` | Narrow legend fit |
| `public/specs/05-connected-dot.json` | Label size and narrow axis-title wrapping |
| `public/specs/06-rank-slope.json` | Label size/contrast/emphasis and narrow label space |
| `public/specs/07-ranked-dot.json` | Numeric label size and narrow placement/title |
| `public/specs/08-admissions-bar.json` | Readable category/value labels, wrapped titles and narrow value placement |
| `public/specs/09-ageing-bar.json` | Narrow axis-title wrapping |
| `public/specs/10-non-contiguous-cartogram.json`, `11-population-pyramid.json` | Explicit axis/legend type sizes |
| `public/specs/12-admissions-treemap.json` | Mobile provider-label size |
| `README.md`, `docs/VISUALISATIONS.md`, this report | Review links, qualified idiom inventory and verification record |

Specs 01, 02 and 04 are unchanged. Dataset files, Python preprocessing, manifest, dependencies and Vite configuration are unchanged. Some HTML diff volume comes from formatting nested markup after adding classes.

## Before/after verification

Captured six acts and twelve chart frames both before and after at each requested viewport: 72 images per version, 144 total. Reviewed paired contact sheets plus individual chart captures during refinement. Screenshots and temporary tools are outside the repository at `/tmp/dv2-polish/` to avoid adding testing artifacts to the cleaned repository.

| Viewport | Observations |
|---|---|
| 1440×900 | Intro paragraph now shares heading guide (baseline first heading x=152, paragraph approximately x=563); paired outer frames align; original editorial palette/composition retained |
| 1366×768 | Intro guide unified (baseline first heading x=115, paragraph approximately x=526); sources and controls share module guides; no page overflow |
| 1280×800 | Intro guide unified (baseline first heading x=112, paragraph x=496); side-by-side maps/comparison panels remain usable; no horizontal scrolling |
| 390×844 | Stacked layout preserved; rank/occupancy/pyramid/treemap labels larger; slider year stays aligned with its control; all twelve charts render |
| Additional 320px check | Wrapped titles, compact heatmap legend and inward bar labels fit; touch selection and percentage mode work |

Exact-viewport assertions confirm intro/module guide alignment, paired-frame alignment on desktop, minimum SVG font size, text bounding boxes and absence of horizontal page overflow. Long full-act mobile screenshots include the fixed bottom navigation at its viewport position; this is a screenshot overlay, not evidence that content is permanently inaccessible. Scroll clearance and keyboard controls were checked, but exhaustive assistive-technology testing was not performed.

## Twelve-chart checklist

For every row: JSON schema validation and standalone rendering passed; data references resolve; default rendered text passes font-size/bounds checks. Existing data/caveats remain.

| Chart | Preserved idiom and meaning | Interaction verified |
|---|---|---|
| 01 Indexed line | Basic line; 2015=100 | Slider, annual readout, tooltip; keyboard ArrowRight |
| 02 Choropleth | Advanced map; public beds per 10,000 | Regions, state hover/selection, shared insight |
| 03 Heatmap | Advanced heatmap; observed state/year rates | State selection and tooltip; unchanged colour extrema |
| 04 Proportional symbols | Advanced map; circle area represents private beds | Regions, hover/selection; overlap caveat retained |
| 05 Connected dots | Advanced connected-dot comparison; public/combined rates | Capacity switch, sorting, shared selection |
| 06 Rank slope | Advanced slope; same-year public/combined ranks | Reveal/reset, selected-state labels and shared selection |
| 07 Occupancy dots | Basic ranked dots; published national reference | State click/tap and linked detail; reference 72.61% retained |
| 08 Admissions bars | Basic bars; episodes and provider coverage | Count/share and tooltips; narrow share-title bounds |
| 09 Ageing bars | Basic bars; national 65+ share | Tooltip and reduced-motion-safe callouts |
| 10 Cartogram | Advanced map; resized area with original outlines | Geography/capacity, regions, outline control, shared selection |
| 11 Population pyramid | Advanced pyramid; symmetric sex/age shares | 2015/2024 switch; same denominator definitions |
| 12 Admissions treemap | Advanced treemap; area represents episode share | Tooltip and responsive labels; rectangle areas reconcile |

This is eight advanced idioms under the teaching-team definitions explicitly supplied in the brief: three map idioms, heatmap, connected dots, slope, pyramid and treemap. The four basic charts are not upgraded by styling. Qualification and quality remain subject to assessment.

## Verification commands and results

Tests run against the production build at `http://127.0.0.1:5181/35100621-FIT3179-DV2/`, exercising the GitHub Pages base path. Temporary Playwright/AJV tooling and restored historical tests live outside the repo.

```sh
npm run build
npm run format:check
git diff --check
node /tmp/dv2-polish/checks/validate.mjs
PLAYWRIGHT_BASE_URL=http://127.0.0.1:5181/35100621-FIT3179-DV2/ node /tmp/dv2-polish/checks/node_modules/@playwright/test/cli.js test --config /tmp/dv2-polish/checks/playwright.config.mjs
node /tmp/dv2-polish/checks/node_modules/@playwright/test/cli.js test --config /tmp/dv2-polish/checks/exact.config.mjs
node /tmp/dv2-polish/checks/touch.mjs
node /tmp/dv2-polish/checks/capture.mjs after 5181
```

- Production build, formatting and diff checks pass.
- All 12 specifications pass schema validation; 60 standalone render scenarios pass.
- Browser regression suite: all 36 tests passed across six viewports, including restored data/resource/story/interaction checks and new layout/keyboard checks.
- Four additional exact-viewport layout/keyboard checks pass.
- Touch selection and admissions percentage-label bounds pass at 320px and 390px.
- No runtime page errors in final captures; regression checks cover chart errors and resource paths.
- `git diff -- public/data` is empty. No data transformations or statistical calculations were changed.

Early checks exposed small labels, delayed-font measurement and narrow legend/title overflow; these were corrected and rerun. A transient resource failure during a concurrent rebuild was avoided by keeping the final production build fixed throughout verification. Browser execution required the local browser permission; initial sandbox launch failures were not counted as application failures.

## Remaining risks and publication status

1. No official rubric/PDF was available to independently verify marking requirements. This pass does not guarantee an HD grade.
2. Existing source reuse/provenance caveats remain visible. Private beds, admissions coverage, resident denominators and historical occupancy are not interchangeable measures of access.
3. Vite still reports its existing >500KB bundle warning (approximately 859KB JS, 297KB gzip). This task did not restructure loading or dependencies. Some editorial fonts and the hero photograph remain external resources.
4. Dense rank crossings and small territories remain intrinsic to the chosen idioms; regional controls, shared search and data tables provide alternatives. Native chart points are not all keyboard-tab stops; labelled controls/search/tables remain the keyboard path.
5. Chromium browser verification was completed; cross-browser and screen-reader audits were not exhaustive. Optional responsive metadata requires the website host, as documented in the chart inventory.
6. Build/base-path verification is local. This branch has not been pushed or deployed to the live GitHub Pages site.
