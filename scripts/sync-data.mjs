import { readdir, readFile, writeFile } from 'node:fs/promises'

// Publish exact processed observations; compact whitespace only.
const source = new URL('../data/processed/', import.meta.url)
const destination = new URL('../public/data/', import.meta.url)
for (const name of await readdir(source)) {
  if (
    !name.endsWith('.json') ||
    ['capacity_cartogram.json', 'capacity_geography.json'].includes(name)
  )
    continue
  const value = JSON.parse(await readFile(new URL(name, source), 'utf8'))
  await writeFile(new URL(name, destination), JSON.stringify(value) + '\n')
}
const shapes = []
for (const [name, layout] of [
  ['capacity_geography', 'Geography'],
  ['capacity_cartogram', 'Capacity'],
]) {
  const features = JSON.parse(
    await readFile(new URL(`${name}.json`, source), 'utf8'),
  )
  shapes.push(...features.map((feature) => ({ ...feature, _layout: layout })))
}
await writeFile(
  new URL('capacity_shapes.json', destination),
  JSON.stringify(shapes) + '\n',
)
console.log(
  'Published processed JSON without changing observations or geometry.',
)
