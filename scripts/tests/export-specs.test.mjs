import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const exec = promisify(execFile)
async function hashes(directory) {
  const result = {}
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) Object.assign(result, await hashes(path))
    else
      result[path] = createHash('sha256')
        .update(await readFile(path))
        .digest('hex')
  }
  return result
}
const run = (...args) =>
  exec(process.execPath, ['scripts/export-specs.mjs', ...args], { cwd: root })

test('all chart exports validate, render, reproduce exactly and preserve source assets', async () => {
  const sourceFolders = ['src', 'data/processed', 'public/data']
  const before = await Promise.all(
    sourceFolders.map((folder) => hashes(resolve(root, folder))),
  )
  await run()
  const first = await hashes(resolve(root, 'public/specs'))
  assert.equal(Object.keys(first).length, 12)
  await run()
  assert.deepEqual(await hashes(resolve(root, 'public/specs')), first)
  await run('--check')
  const ids = new Set()
  for (const file of Object.keys(first)) {
    const text = await readFile(file, 'utf8')
    const spec = JSON.parse(text)
    assert.equal(text, JSON.stringify(spec, null, 2) + '\n')
    assert.equal(
      spec.$schema,
      'https://vega.github.io/schema/vega-lite/v6.json',
    )
    assert.equal(spec.params.find((p) => p.name === 'hoveredState').value, '')
    assert.equal(spec.width, 900)
    assert.ok(
      !text.includes('"url":'),
      'All observations and geometry must be inline',
    )
    ids.add(spec.usermeta.export.chartId)
  }
  assert.equal(ids.size, 12)
  // Every chart embedded by React must have a matching export.
  for (const file of ['StoryCharts.tsx', 'AdvancedCharts.tsx']) {
    const source = await readFile(resolve(root, 'src/components', file), 'utf8')
    for (const match of source.matchAll(/<VegaChart\s+id="([^"]+)"/g)) {
      assert.ok(ids.has(match[1]), `Missing export for ${match[1]}`)
    }
  }
  const after = await Promise.all(
    sourceFolders.map((folder) => hashes(resolve(root, folder))),
  )
  assert.deepEqual(after, before)
})
