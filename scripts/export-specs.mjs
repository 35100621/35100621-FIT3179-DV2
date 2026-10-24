/** Export the actual production generators, never a second copy of their specs. */
import assert from 'node:assert/strict'
import { readFile, mkdir, readdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import Ajv from 'ajv'
import { compile } from 'vega-lite'
import { parse, View } from 'vega'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = resolve(root, 'public/specs')
const check = process.argv.includes('--check')
const require = createRequire(import.meta.url)
const schema = JSON.parse(
  await readFile(require.resolve('vega-lite/vega-lite-schema.json'), 'utf8'),
)
const validate = new Ajv({ strict: false, validateFormats: false }).compile(
  schema,
)
// Vite supplies the same TypeScript, JSON imports and BASE_URL as the application.
// Middleware mode does not start an HTTP server.
const server = await createServer({
  root,
  server: { middlewareMode: true, watch: null, hmr: false, ws: false },
  appType: 'custom',
})
try {
  const core = await server.ssrLoadModule('/src/charts/specs.ts')
  const advanced = await server.ssrLoadModule('/src/charts/advanced.ts')
  const { prepareChartSpec } = await server.ssrLoadModule(
    '/src/charts/presentation.ts',
  )
  const width = 900
  // Metadata and arguments only. All marks, encodings and data remain in src/charts.
  const charts = [
    [
      '01-indexed-line',
      'indexed',
      core,
      'indexedLineChartSpec',
      [width, 2024],
      'Year slider and year readout require React.',
    ],
    [
      '02-choropleth-map',
      'choropleth',
      core,
      'choroplethMapSpec',
      [width, '', 'All Malaysia'],
      'Region buttons, state selection and detail panel require React.',
    ],
    [
      '03-heatmap',
      'heatmap',
      core,
      'heatmapSpec',
      [width, ''],
      'Shared state selection and detail panel require React.',
    ],
    [
      '04-proportional-symbol-map',
      'private-symbols',
      core,
      'proportionalSymbolMapSpec',
      [width, 'All Malaysia', ''],
      'Region buttons, state selection and detail panel require React.',
    ],
    [
      '05-connected-dot',
      'connected',
      core,
      'connectedDotChartSpec',
      [width, '', 'Combined capacity', true],
      'Public/combined toggle, ordering, state selection and detail panel require React.',
    ],
    [
      '06-rank-slope',
      'rank-slope',
      core,
      'rankSlopeChartSpec',
      [width, true, ''],
      'Reveal/reset toggle, state selection and detail panel require React.',
    ],
    [
      '07-ranked-dot',
      'occupancy',
      core,
      'rankedDotPlotSpec',
      [width, ''],
      'Shared state selection and detail panel require React.',
    ],
    [
      '08-admissions-bar',
      'admissions',
      core,
      'admissionsBarChartSpec',
      [width, false],
      'Count/share toggle requires React.',
    ],
    [
      '09-ageing-bar',
      'ageing',
      core,
      'ageingBarChartSpec',
      [width],
      'Percentage callouts and their count-up animation are React elements.',
    ],
    [
      '10-non-contiguous-cartogram',
      'capacity-cartogram',
      advanced,
      'nonContiguousCartogramSpec',
      [width, '', 'Capacity', 'All Malaysia', true],
      'Geography/capacity switch, region buttons, outline checkbox, state selection and detail panel require React.',
    ],
    [
      '11-population-pyramid',
      'population-pyramid',
      advanced,
      'populationPyramidSpec',
      [width, 2024],
      '2015/2024 year buttons require React.',
    ],
    [
      '12-admissions-treemap',
      'provider-treemap',
      advanced,
      'admissionsTreemapSpec',
      [width],
      'External provider key and source notes are React elements.',
    ],
  ]
  const factories = [...Object.entries(core), ...Object.entries(advanced)]
    .filter(([, value]) => typeof value === 'function')
    .map(([name]) => name)
    .sort()
  assert.deepEqual(
    charts.map((c) => c[3]).sort(),
    factories,
    'Every exported chart generator must be registered exactly once',
  )
  const geometryURL = `${server.config.base}data/states.geojson`
  const geometry = JSON.parse(
    await readFile(resolve(root, 'public/data/states.geojson'), 'utf8'),
  )
  // Replace only the known runtime URL. Reject new URLs rather than silently
  // exporting a broken reference or fetching an external resource.
  function inlineData(value) {
    if (Array.isArray(value)) return value.map(inlineData)
    if (!value || typeof value !== 'object') return value
    if (Object.hasOwn(value, 'url')) {
      assert.equal(
        value.url,
        geometryURL,
        'Unrecognised data URL: add an explicit export strategy',
      )
      assert.equal(value.format?.property, 'features')
      return { values: geometry.features }
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, inlineData(child)]),
    )
  }
  const files = new Map()
  for (const [name, id, module, factory, args, limitation] of charts) {
    const spec = inlineData(prepareChartSpec(id, module[factory](...args)))
    spec.usermeta = {
      ...(spec.usermeta ?? {}),
      export: {
        generator: factory,
        arguments: args,
        chartId: id,
        note:
          limitation +
          ' Hover emphasis is driven by the website; hoveredState starts empty. Tooltip definitions are retained. Width is a fixed snapshot; page layout and fonts are supplied by the host.',
      },
    }
    assert.ok(validate(spec), `${name}: ${JSON.stringify(validate.errors)}`)
    // Schema checking alone cannot detect invalid expressions or missing signals.
    const warnings = []
    const compiled = compile(spec, {
      logger: {
        level: () => 0,
        warn: (...v) => warnings.push(v.join(' ')),
        error: (...v) => {
          throw new Error(v.join(' '))
        },
        info() {},
        debug() {},
      },
    }).spec
    assert.deepEqual(warnings, [], `${name}: Vega-Lite compilation warnings`)
    const view = new View(parse(compiled), { renderer: 'none' })
    try {
      await view.runAsync()
      const svg = await view.toSVG()
      assert.ok(
        svg.includes('<svg') && svg.includes('role="graphics-object"'),
        `${name}: empty SVG`,
      )
    } finally {
      view.finalize()
    }
    files.set(`${name}.vl.json`, JSON.stringify(spec, null, 2) + '\n')
  }
  if (!check) await mkdir(output, { recursive: true })
  const existing = (await readdir(output).catch(() => [])).filter((name) =>
    name.endsWith('.vl.json'),
  )
  assert.ok(
    existing.every((name) => files.has(name)),
    'Obsolete exported specs found; remove or migrate them explicitly',
  )
  for (const [name, content] of files) {
    const path = resolve(output, name)
    if (check)
      assert.equal(
        await readFile(path, 'utf8'),
        content,
        `${name} is stale; run npm run export:specs`,
      )
    else await writeFile(path, content)
  }
  console.log(
    `${check ? 'Checked' : 'Exported'} ${files.size} specs: schema validation, compilation and standalone SVG rendering passed.`,
  )
} finally {
  await server.close()
}
