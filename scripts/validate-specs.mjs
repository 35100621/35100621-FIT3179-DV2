import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import Ajv from 'ajv'
import { compile } from 'vega-lite'
import { View, parse } from 'vega'
import { prepareSpec } from '../js/charts.js'
const root = fileURLToPath(new URL('../', import.meta.url))
const require = createRequire(import.meta.url)
const schema = JSON.parse(
  await readFile(require.resolve('vega-lite/vega-lite-schema.json'), 'utf8'),
)
const validate = new Ajv({ strict: false, validateFormats: false }).compile(
  schema,
)
const manifest = JSON.parse(
  await readFile(resolve(root, 'specs/manifest.json'), 'utf8'),
)
assert.equal(manifest.length, 12)
const dataCache = new Map()
async function inline(value) {
  if (Array.isArray(value)) return Promise.all(value.map(inline))
  if (!value || typeof value !== 'object') return value
  if (value.url) {
    assert.match(value.url, /^\.\.\/data\/[\w.-]+$/)
    const path = resolve(root, 'public/data', value.url.split('/').pop())
    if (!dataCache.has(path))
      dataCache.set(path, JSON.parse(await readFile(path, 'utf8')))
    let rows = dataCache.get(path)
    if (value.format?.property) rows = rows[value.format.property]
    return { values: rows }
  }
  return Object.fromEntries(
    await Promise.all(
      Object.entries(value).map(async ([key, child]) => [
        key,
        await inline(child),
      ]),
    ),
  )
}
let renders = 0
for (const entry of manifest) {
  const spec = JSON.parse(
    await readFile(resolve(root, 'specs', entry.spec), 'utf8'),
  )
  assert.ok(validate(spec), `${entry.id}: ${JSON.stringify(validate.errors)}`)
  for (const [width, values] of [
    [900, {}],
    [390, {}],
    [
      320,
      {
        selectedState: 'Pulau Pinang',
        region: 'East Malaysia',
        selectedYear: 2015,
        showCombined: false,
        sortBy: 'Private contribution',
        reveal: false,
        showShare: true,
        mode: 'Geography',
        showOutlines: false,
      },
    ],
  ]) {
    const ready = await inline(prepareSpec(spec, width, values))
    assert.ok(
      validate(ready),
      `${entry.id}: ${JSON.stringify(validate.errors)}`,
    )
    const warnings = []
    const logger = {
      level: () => 0,
      warn: (...v) => warnings.push(v.join(' ')),
      error: (...v) => {
        throw Error(v.join(' '))
      },
      info() {},
      debug() {},
    }
    const runtime = compile(ready, { logger }).spec
    assert.deepEqual(warnings, [], entry.id)
    const view = new View(parse(runtime), { renderer: 'none' })
    try {
      await view.runAsync()
      assert.ok((await view.toSVG()).includes('<svg'))
      renders++
    } finally {
      view.finalize()
    }
  }
  console.log(`PASS ${entry.id}`)
}
console.log(
  `Validated 12 JSON specifications and ${renders} standalone render scenarios.`,
)
