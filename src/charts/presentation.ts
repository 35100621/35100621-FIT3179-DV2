import type { TopLevelSpec } from 'vega-lite'

/** Shared by the live renderer and JSON export; keeps presentation identical. */
export function prepareChartSpec(id: string, spec: TopLevelSpec): TopLevelSpec {
  const dark = [
    'indexed',
    'private-symbols',
    'connected',
    'rank-slope',
    'ageing',
  ].includes(id)
  const themed = JSON.parse(
    JSON.stringify(spec, (_key, value) => {
      if (!dark) return value
      if (value === '#172B42') return '#f36c4f'
      if (value === '#7D90AE') return '#e8b44e'
      if (value === '#527F78') return '#9fc6ae'
      if (value === '#56636d') return '#c6d5d2'
      if (value === '#e7e4de' || value === '#d6d3cb') return '#3b5155'
      return value
    }),
  ) as TopLevelSpec
  themed.params = [
    ...(themed.params ?? []),
    { name: 'hoveredState', value: '' },
  ]
  return themed
}
