# Task04 — Repository reorganisation and GitHub Pages

## Reorganisation

Audited 120 project/research files before moving anything, with dependency/build/test/Git directories counted separately. [Original inventory](inventory-before.json) records sizes, SHA-256, classification and Git tracking; [audit](AUDIT.md) records duplication and retention decisions. [Move manifest](move-manifest.json) records all **44** old → new paths.

| Previously | Now |
|---|---|
| Eight root CSV/PDF originals | `data/original/` |
| Three root GeoJSON originals | `data/geographic/original/` |
| Reports 01–06 together at root of reports | `reports/task01/` |
| Reports 07–12 together at root of reports | `reports/task02/` |
| `docs/` V1 records | `reports/task03/` |
| `design_reference/` | `design-reference/` |
| Four Python validators among validation records | `scripts/validation/` |
| `src/index.css` | `src/styles/index.css` |
| Eight JSONs in `public/data/` | Canonical `data/processed/` |
| `agents.md` | `AGENTS.md` (case-only rename) |

Canonical CSVs now accompany JSON in `data/processed/`; canonical derived map is in `data/geographic/validated/`. The preparation script copies seven CSV downloads and one GeoJSON to `public/data/`; the app imports JSON from the canonical directory. These eight deployment copies are intentional. No extra research assets are shipped.

Retained: all 26 acquisitions and provenance files in `data/additional/raw/`, five Task02 derived tables, manifests and machine-readable validation records/cached extracts, source-code components/specifications, standard root configuration and browser tests. Acquired duplicate source files remain for provenance. Generated caches/builds/screenshots remain ignored locally. No data, research or design file was deleted; two emptied obsolete directories were removed. Original data remain excluded from Git as before.

Updated Python source/output resolution, source-hash path keys (not digests), report links and executable examples, React JSON/style imports, browser inspection URLs, README and source mappings. Historical research findings remain unchanged. Vite preserves the user's repository path with a terminating slash. Map and CSV requests use `BASE_URL`. Tests navigate the same repository subpath and can target the live site through `PLAYWRIGHT_BASE_URL`.

## Verification

- `npm ci`: success; zero reported vulnerabilities.
- `npm run typecheck` and `npm run build`: pass. Existing Vega bundle-size advisory remains.
- V1 preparation: **195/195 assertions pass**, unchanged scope. All 11 originals and all 26 acquired sources match prior SHA-256 evidence; all 16 states and 160 state-years reconcile.
- All four Task02 research validators executed successfully after relocation; research-derived CSV bytes unchanged.
- [Preservation checks](preservation-validation.json): **62** original/acquired/design/derived/chart/style files match pre-move hashes. Eight runtime copies match canonical assets. Local documentation links resolve.
- [Local production browser checks](local-browser-validation.json): **3/3 pass**, 1440/390/320 px, all seven charts, exact values, tooltips, shared selection, sort controls, regional geometry, CSV download, no overflow and no browser/HTTP errors. No test assertion was weakened.
- Desktop and mobile screenshot details inspected. Approved typography, layout and palette remain intact; application narrative, chart specifications and component logic are unchanged.

## Git and deployment

Preserved all four earlier V1 commits. Reorganisation committed as `d213d93`; Pages workflow as `4dd8a8a`; reusable live-browser verification as `3494694`. The supplied repository was publicly verified as empty with default branch `main`; connected it as `origin` and renamed the local branch to `main` without altering history.

Repository: [35100621/35100621-FIT3179-DV2](https://github.com/35100621/35100621-FIT3179-DV2).

Git's existing credential permitted pushes. GitHub CLI itself was signed out. Reused the existing credential without logging it to enable Pages with `build_type: workflow`. No token or credential was written into the repository.

The first workflow's build and typecheck passed; Pages configuration failed because Pages was not enabled yet. This was corrected in repository settings via the API. The next run builds and deploys with official checkout/setup-node/configure-pages/upload-pages-artifact/deploy-pages actions, least-required job permissions and a GitHub Pages environment. Only `dist/` is uploaded. Pushes to `main` and manual dispatch are supported.

**Published and verified:** [Malaysia’s Hospital Divide](https://35100621.github.io/35100621-FIT3179-DV2/).

[Deployment run 38751731597](https://github.com/35100621/35100621-FIT3179-DV2/actions/runs/38751731597) completed successfully for commit `3494694`. [Machine-readable deployment evidence](deployment-validation.json) records the workflow, URL, timestamp and eight live asset hashes. All eight CSV/GeoJSON assets returned HTTP 200 and matched local SHA-256 values. The complete browser tests passed **3/3 against the public site** at all three widths, including all seven charts, interactions and downloads, without browser/HTTP errors.

No manual authentication or Pages setup steps remain. Future updates deploy automatically after `git push origin main`; manual runs are available under Actions → Deploy V1 to GitHub Pages → Run workflow. The final documentation/evidence commit is pushed after verification; website code and data are identical to the verified deployment. The working tree is clean at handoff.

## Remaining limitations

No V2 work or redesign was undertaken. Author attribution remains unconfirmed. Geographic vintage/licensing and publication reuse questions remain documented in the README and Task02 reports; deployment does not resolve or imply clearance. Full source publications and facility contact data are excluded from Git and deployed assets. No additional data values or calculations were introduced.
