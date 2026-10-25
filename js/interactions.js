import {
  state,
  subscribe,
  selectState,
  setChartState,
  resetSelection,
} from './state.js'
import { fixed, number } from './data.js'
const signed = (value) => `${value > 0 ? '+' : ''}${fixed(value)}`
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ],
  )

export function initializeInteractions(data) {
  const { capacity, current, growth, rates, occupancy, summary } = data
  const states = current.map((d) => d.state).sort()
  const search = document.querySelector('#state-search'),
    status = document.querySelector('.selection-status')
  const reset = () => {
    search.value = ''
    resetSelection()
  }
  search.addEventListener('input', () => {
    const match = states.find(
      (s) => s.toLowerCase() === search.value.toLowerCase(),
    )
    if (match) {
      search.value = ''
      selectState(match)
    }
  })
  status.querySelector('button').addEventListener('click', reset)
  const panelKinds = [
    'public',
    'history',
    'private',
    'capacity',
    'rank',
    'occupancy',
    'cartogram',
  ]
  const panels = [...document.querySelectorAll('.state-insight')].map(
    (element, i) => ({
      element,
      kind: panelKinds[i],
      empty: element.innerHTML,
    }),
  )
  // DOM order is public, history, private, capacity, rank, occupancy, cartogram.
  const originalMapReadout = document.querySelector('.state-readout').innerHTML
  const originalRankNote = document.querySelector('.rank-note').innerHTML
  const national =
    (growth.find((d) => d.year === 2024 && d.series === 'Public hospital beds')
      .count /
      growth.find((d) => d.year === 2024 && d.series === 'Population').count) *
    10000
  const selection = () => {
    const selected = state.selectedState
    status.querySelector('strong').textContent =
      selected || 'All 16 states & territories'
    status.querySelector('button').disabled = !selected
    search.placeholder = selected || 'Type a state name…'
    for (const { element, kind, empty } of panels) {
      if (!selected) {
        element.innerHTML = empty
        element.classList.add('empty')
        delete element.dataset.insight
        continue
      }
      const c = capacity.find((d) => d.state === selected),
        p = current.find((d) => d.state === selected),
        o = occupancy.find((d) => d.state === selected)
      const start = rates.find((d) => d.state === selected && d.year === 2015)
      let items = [],
        note = ''
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
      element.classList.remove('empty')
      element.dataset.insight = kind
      element.setAttribute('aria-live', 'polite')
      element.innerHTML = `<div class="insight-title"><strong>${escape(selected)}</strong><a href="#state-explorer">Change state</a><button>Reset</button></div><dl>${items.map(([label, value]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl><p>${escape(note)}</p>`
      element.querySelector('button').addEventListener('click', reset)
    }
    const p = current.find((d) => d.state === selected),
      c = capacity.find((d) => d.state === selected)
    document.querySelector('.state-readout').innerHTML = p
      ? `<span>${escape(p.state)}</span><strong>${fixed(p.rate)}</strong><span>public beds / 10,000 residents · ${number(p.beds)} beds</span>`
      : originalMapReadout
    document.querySelector('.rank-note').innerHTML = c
      ? `<strong>${escape(c.state)}: ${fixed(c.public_rate)} → ${fixed(c.combined_rate)}</strong> beds per 10,000. Rank <strong>#${c.public_rank} → #${c.combined_rank}</strong> when private beds are included.`
      : originalRankNote
  }
  const regionControls = [
    ['map-region', 'choropleth'],
    ['private-map-region', 'private-symbols'],
    ['cartogram-region', 'capacity-cartogram'],
  ]
  for (const [control, id] of regionControls) {
    document
      .querySelectorAll(`#${control} button`)
      .forEach((button) =>
        button.addEventListener('click', () =>
          setChartState(id, { region: button.textContent.trim() }),
        ),
      )
  }
  const syncRegions = () => {
    for (const [control, id] of regionControls) {
      const region = state.charts[id]?.region ?? 'All Malaysia'
      document.querySelectorAll(`#${control} button`).forEach((button) => {
        const on = button.textContent.trim() === region
        button.classList.toggle('on', on)
        button.setAttribute('aria-pressed', String(on))
      })
    }
    document.querySelector('.region-labels').hidden =
      (state.charts.choropleth?.region ?? 'All Malaysia') !== 'All Malaysia'
  }
  const slider = document.querySelector('input[aria-label="Select year"]')
  slider.addEventListener('input', () => {
    const year = Number(slider.value)
    setChartState('indexed', { selectedYear: year })
    slider.closest('label').querySelector('b').textContent = String(year)
    document.querySelector('.year-readout').textContent = growth
      .filter((d) => d.year === year)
      .map((d) => `${d.series}: ${fixed(d.index)}`)
      .join(' · ')
  })
  const combined = document.querySelector('.reveal-chart button.reveal')
  combined.addEventListener('click', () => {
    const value = !(state.charts.connected?.showCombined ?? true)
    setChartState('connected', { showCombined: value })
    combined.textContent = value ? 'Combined' : 'Public only'
    combined.setAttribute('aria-pressed', String(value))
  })
  document
    .querySelector('#capacity-sort')
    .addEventListener('change', (e) =>
      setChartState('connected', { sortBy: e.target.value }),
    )
  const ranks = document.querySelector('.rank-slope-panel button.reveal')
  ranks.addEventListener('click', () => {
    const value = !(state.charts['rank-slope']?.reveal ?? true)
    setChartState('rank-slope', { reveal: value })
    ranks.textContent = value ? 'Reset ranks' : 'Reveal combined ranks'
    ranks.setAttribute('aria-pressed', String(value))
  })
  const admissions = [
    ...document.querySelectorAll('.admissions-chart .segmented button'),
  ]
  admissions.forEach((button, i) =>
    button.addEventListener('click', () => {
      setChartState('admissions', { showShare: i === 1 })
      admissions.forEach((b, j) => {
        b.classList.toggle('on', i === j)
        b.setAttribute('aria-pressed', String(i === j))
      })
    }),
  )
  const years = [...document.querySelectorAll('.year-switch button')]
  years.forEach((button) =>
    button.addEventListener('click', () => {
      const year = Number(button.textContent)
      setChartState('population-pyramid', { selectedYear: year })
      years.forEach((b) => {
        const on = b === button
        b.classList.toggle('on', on)
        b.setAttribute('aria-pressed', String(on))
      })
      document
        .querySelector('[data-chart="population-pyramid"]')
        .setAttribute(
          'aria-label',
          `Malaysia population pyramid by age and sex, ${year}`,
        )
    }),
  )
  const cartogram = document.querySelector('.capacity-cartogram')
  const modes = [
    ...cartogram.querySelectorAll('[aria-label="Cartogram measure"] button'),
  ]
  const outlines = cartogram.querySelector('input[type="checkbox"]')
  outlines.addEventListener('change', () =>
    setChartState('capacity-cartogram', { showOutlines: outlines.checked }),
  )
  modes.forEach((button) =>
    button.addEventListener('click', () => {
      const mode = button.textContent.trim()
      setChartState('capacity-cartogram', { mode })
      modes.forEach((b) => {
        const on = b === button
        b.classList.toggle('on', on)
        b.setAttribute('aria-pressed', String(on))
      })
      outlines.closest('label').hidden = mode !== 'Capacity'
      cartogram.querySelector('.chart-hint').textContent =
        (mode === 'Capacity'
          ? 'Shape area = combined hospital beds. Shapes are uniformly resized and separated from their geographic positions.'
          : 'Original state outlines in an equal-area projection. Area represents land, not beds.') +
        ' Colour = combined beds per 10,000 residents.'
      const key = cartogram.querySelector('.area-key').parentElement
      key.lastChild.textContent = `Filled area = ${mode === 'Capacity' ? 'combined bed count' : 'geographic land area'}`
    }),
  )
  subscribe((change) => {
    if (change.selected) selection()
    syncRegions()
  })
}
