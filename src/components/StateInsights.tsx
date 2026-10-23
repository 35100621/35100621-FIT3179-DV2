import { createContext, useContext, useState, useEffect } from 'react'
import {
  capacity,
  current,
  growth,
  rates,
  occupancy,
  summary,
  states,
  fixed,
  number,
} from '../data'
export const StateContext = createContext({
  selected: '',
  setSelected: (_state: string) => {},
})
const resetRegions = () => window.dispatchEvent(new Event('selection-reset'))
export const regions = ['All Malaysia', 'Peninsular', 'East Malaysia']
export function RegionControl({
  value,
  onChange,
  id,
}: {
  value: string
  onChange: (v: string) => void
  id: string
}) {
  useEffect(() => {
    const reset = () => onChange('All Malaysia')
    window.addEventListener('selection-reset', reset)
    return () => window.removeEventListener('selection-reset', reset)
  }, [onChange])
  return (
    <fieldset className="region-control">
      <legend>Map view</legend>
      <div className="segmented" id={id}>
        {regions.map((r) => (
          <button
            type="button"
            key={r}
            aria-pressed={r === value}
            className={r === value ? 'on' : ''}
            onClick={() => onChange(r)}
          >
            {r}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
export function StateExplorer() {
  const { selected, setSelected } = useContext(StateContext)
  const [query, setQuery] = useState('')
  return (
    <aside id="state-explorer" className="state-explorer">
      <div>
        <span className="eyebrow">Follow one state</span>
        <p>
          Click a chart mark or search here. Selection follows you through
          geography, capacity, rank and occupancy.
        </p>
      </div>
      <label htmlFor="state-search">
        Search state / territory
        <input
          id="state-search"
          type="search"
          list="state-options"
          placeholder={selected || 'Type a state name…'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            const match = states.find(
              (s) => s.toLowerCase() === e.target.value.toLowerCase(),
            )
            if (match) {
              setSelected(match)
              setQuery('')
            }
          }}
        />
        <datalist id="state-options">
          {states.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </label>
      <div className="selection-status" aria-live="polite">
        <strong>{selected || 'All 16 states & territories'}</strong>
        <button
          type="button"
          onClick={() => {
            setSelected('')
            setQuery('')
            resetRegions()
          }}
          disabled={!selected}
        >
          Reset selection
        </button>
      </div>
    </aside>
  )
}
const signed = (n: number) => `${n > 0 ? '+' : ''}${fixed(n)}`
export function StateInsight({
  kind,
}: {
  kind:
    | 'public'
    | 'history'
    | 'private'
    | 'capacity'
    | 'rank'
    | 'occupancy'
    | 'cartogram'
}) {
  const { selected, setSelected } = useContext(StateContext)
  if (!selected)
    return (
      <aside className="state-insight empty">
        <p>
          Select a state in the chart to compare its{' '}
          {kind === 'occupancy'
            ? 'annual occupancy'
            : kind === 'rank'
              ? 'rankings'
              : 'capacity'}
          . <a href="#state-explorer">Search all 16 states</a>
        </p>
      </aside>
    )
  const c = capacity.find((d) => d.state === selected)!,
    p = current.find((d) => d.state === selected)!,
    o = occupancy.find((d) => d.state === selected)!
  const start = rates.find((d) => d.state === selected && d.year === 2015)!
  const national =
    (growth.find((d) => d.year === 2024 && d.series === 'Public hospital beds')!
      .count /
      growth.find((d) => d.year === 2024 && d.series === 'Population')!.count) *
    10000
  let items: [string, string][] = []
  let note = ''
  if (kind === 'public' || kind === 'history') {
    items = [
      ['Public beds / 10,000', fixed(p.rate)],
      ['National rate', fixed(national)],
      [
        'Difference from national',
        `${signed(p.rate - national)} beds / 10,000`,
      ],
      ['2015 → 2024', `${fixed(start.rate)} → ${fixed(p.rate)}`],
    ]
    note = `Observed rate change: ${signed(p.rate - start.rate)} beds per 10,000 residents. Resident population is not a hospital catchment.`
  }
  if (kind === 'private') {
    const largest = capacity.reduce((a, b) =>
      a.private_beds > b.private_beds ? a : b,
    )
    items = [
      ['Licensed private beds', number(c.private_beds)],
      [
        'Share of national private beds',
        `${fixed((c.private_beds / summary.private_beds) * 100)}%`,
      ],
      ['Largest count: ' + largest.state, number(largest.private_beds)],
    ]
    note =
      'State totals at representative anchors, not individual hospital locations. Licensed beds do not establish affordability.'
  }
  if (kind === 'capacity') {
    items = [
      ['Public / 10,000', fixed(c.public_rate)],
      ['Combined / 10,000', fixed(c.combined_rate)],
      ['Addition / 10,000', `+${fixed(c.combined_rate - c.public_rate)}`],
      ['Private share of combined', `${fixed(c.private_share)}%`],
    ]
    note = `Same 2024 resident denominator. Public rank ${c.public_rank} → combined rank ${c.combined_rank}; follow the same state in the adjacent ranking chart.`
  }
  if (kind === 'rank') {
    const change = c.public_rank - c.combined_rank
    items = [
      ['Public-only rank', String(c.public_rank)],
      ['Combined rank', String(c.combined_rank)],
      [
        'Movement',
        change > 0
          ? `Up ${change} places`
          : change < 0
            ? `Down ${-change} places`
            : 'Unchanged',
      ],
    ]
    note =
      'Including licensed private beds changes the definition of capacity in 2024, not the year. A rank loss does not mean beds were removed.'
  }
  if (kind === 'occupancy') {
    const diff = o.occupancy - summary.national_occupancy
    items = [
      ['Annual MOH occupancy', `${fixed(o.occupancy)}%`],
      ['National benchmark', `${fixed(summary.national_occupancy)}%`],
      ['Difference', `${signed(diff)} percentage points`],
    ]
    note = `${diff > 0 ? 'Above' : diff < 0 ? 'Below' : 'Equal to'} the published national benchmark. Historical annual utilisation is not real-time bed availability.`
  }
  if (kind === 'cartogram') {
    items = [
      ['Combined hospital beds', number(c.combined_beds)],
      [
        'Share of national combined beds',
        `${fixed((c.combined_beds / 71968) * 100)}%`,
      ],
      ['Combined / 10,000', fixed(c.combined_rate)],
    ]
    note =
      'The coral outline links this state’s original footprint and resized shape. Area shows beds; fill colour shows the rate. Positions are displaced, not travel distances.'
  }
  return (
    <aside className="state-insight" data-insight={kind} aria-live="polite">
      <div className="insight-title">
        <strong>{selected}</strong>
        <a href="#state-explorer">Change state</a>
        <button
          onClick={() => {
            setSelected('')
            resetRegions()
          }}
        >
          Reset
        </button>
      </div>
      <dl>
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p>{note}</p>
    </aside>
  )
}
