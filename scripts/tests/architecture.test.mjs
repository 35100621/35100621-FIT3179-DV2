import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
const root = new URL('../../', import.meta.url)
const json = async (path) =>
  JSON.parse(await readFile(new URL(path, root), 'utf8'))

test('canonical specifications cover every HTML chart exactly once', async () => {
  const manifest = await json('specs/manifest.json')
  const html = await readFile(new URL('index.html', root), 'utf8')
  const ids = [...html.matchAll(/data-chart="([^"]+)"/g)].map(
    (match) => match[1],
  )
  assert.equal(new Set(ids).size, 12)
  assert.deepEqual(manifest.map((entry) => entry.id).sort(), ids.sort())
  for (const entry of manifest) {
    const spec = await json(`specs/${entry.spec}`)
    assert.match(spec.$schema, /vega-lite\/v6\.json$/)
    assert.equal(spec.usermeta.chartId, entry.id)
  }
})

test('application has no React or TypeScript source/dependencies', async () => {
  const packageJSON = await json('package.json')
  const deps = { ...packageJSON.dependencies, ...packageJSON.devDependencies }
  for (const name of [
    'react',
    'react-dom',
    'typescript',
    '@types/react',
    '@types/react-dom',
    '@vitejs/plugin-react',
  ])
    assert.equal(deps[name], undefined)
  const ignored = new Set([
    'node_modules',
    '.git',
    'tmp',
    'dist',
    'test-results',
    'playwright-report',
    '.venv',
  ])
  async function scan(path) {
    for (const item of await readdir(path, { withFileTypes: true })) {
      if (ignored.has(item.name)) continue
      const child = resolve(path, item.name)
      if (item.isDirectory()) await scan(child)
      else assert.doesNotMatch(item.name, /\.(ts|tsx|jsx)$/)
    }
  }
  await scan(root.pathname)
})

test('published JSON preserves processed observations and deterministic geometry', async () => {
  const names = (await readdir(new URL('data/processed/', root))).filter(
    (n) =>
      n.endsWith('.json') &&
      !['capacity_cartogram.json', 'capacity_geography.json'].includes(n),
  )
  for (const name of names)
    assert.deepEqual(
      await json(`public/data/${name}`),
      await json(`data/processed/${name}`),
    )
  const shapes = await json('public/data/capacity_shapes.json')
  for (const [file, layout] of [
    ['capacity_geography', 'Geography'],
    ['capacity_cartogram', 'Capacity'],
  ]) {
    assert.deepEqual(
      shapes
        .filter((f) => f._layout === layout)
        .map(({ _layout, ...feature }) => feature),
      await json(`data/processed/${file}.json`),
    )
  }
  const published = [...names, 'capacity_shapes.json']
  const before = await Promise.all(
    published.map((name) =>
      readFile(new URL(`public/data/${name}`, root), 'utf8'),
    ),
  )
  execFileSync(process.execPath, ['scripts/sync-data.mjs'], { cwd: root })
  const after = await Promise.all(
    published.map((name) =>
      readFile(new URL(`public/data/${name}`, root), 'utf8'),
    ),
  )
  assert.deepEqual(after, before)
})
