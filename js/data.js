// One cache for Vega's loader and the surrounding text panels: no repeated downloads.
const responses = new Map()
export function loadText(url) {
  const key = new URL(url, document.baseURI).href
  if (!responses.has(key)) {
    responses.set(
      key,
      fetch(key).then((response) => {
        if (!response.ok) throw new Error(`${response.status}: ${key}`)
        return response.text()
      }),
    )
  }
  return responses.get(key)
}
export async function loadJSON(url) {
  return JSON.parse(await loadText(url))
}
export const number = (value) => new Intl.NumberFormat('en-MY').format(value)
export const fixed = (value) => value.toFixed(2)
export async function loadStoryData() {
  const names = {
    growth: 'indexed_growth',
    rates: 'state_rates',
    current: 'public_rates_2024',
    capacity: 'combined_capacity',
    occupancy: 'occupancy',
    ageing: 'ageing',
    summary: 'summary',
  }
  return Object.fromEntries(
    await Promise.all(
      Object.entries(names).map(async ([key, file]) => [
        key,
        await loadJSON(`./data/${file}.json`),
      ]),
    ),
  )
}
