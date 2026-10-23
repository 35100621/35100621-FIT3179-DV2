import { StateExplorer } from './components/StateInsights'
import { useEffect, useState } from 'react'
import {
  NonContiguousCartogram,
  PopulationPyramid,
  AdmissionsTreemap,
} from './components/AdvancedCharts'
import {
  StateContext,
  IndexedLineChart,
  ChoroplethMap,
  Heatmap,
  ProportionalSymbolMap,
  ConnectedDotChart,
  BumpChart,
  RankedDotPlot,
  AdmissionsBarChart,
  AgeingBarChart,
} from './components/StoryCharts'
import { useStoryReveals } from './components/StoryMotion'
import { source } from './data'
function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={down ? 'M4 7l6 6 6-6' : 'M7 16l6-6-6-6'} />
    </svg>
  )
}

function Eyebrow({
  chart,
  children,
}: {
  chart?: string
  children: React.ReactNode
}) {
  return (
    <div className="eyebrow">
      {chart && <span>{chart}</span>}
      {children}
    </div>
  )
}

function SectionHead({
  act,
  title,
  copy,
}: {
  act: string
  title: string
  copy: string
}) {
  return (
    <div className="section-head">
      <Eyebrow>{act}</Eyebrow>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  )
}

function ProgressNav({ active }: { active: number }) {
  const acts = [
    'National divide',
    'Geography',
    'Private sector',
    'Availability',
    'Patients',
    'Pressure ahead',
  ]
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className="progress-nav" aria-label="Story chapters">
        <a href="#top" className="nav-mark">
          MH<span>+</span>
        </a>
        <button
          className="overview-toggle"
          aria-label="Open chapter overview"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          •••
        </button>
        <div className="nav-line">
          <i style={{ height: `${(active / 5) * 100}%` }} />
        </div>
        {acts.map((a, i) => (
          <a
            key={a}
            href={`#act-${i + 1}`}
            className={active === i ? 'active' : ''}
          >
            <b>0{i + 1}</b>
            <span>{a}</span>
          </a>
        ))}
      </nav>
      <div hidden={!open} className={`chapter-overview ${open ? 'open' : ''}`}>
        <button onClick={() => setOpen(false)}>Close</button>
        <Eyebrow>Chapter overview</Eyebrow>
        {acts.map((a, i) => (
          <a onClick={() => setOpen(false)} key={a} href={`#act-${i + 1}`}>
            <span>0{i + 1}</span>
            <b>{a}</b>
          </a>
        ))}
      </div>
    </>
  )
}

function App() {
  const [selected, setSelected] = useState('')
  const [active, setActive] = useState(0)
  useStoryReveals()
  useEffect(() => {
    const select = (e: Event) => setSelected((e as CustomEvent<string>).detail)
    window.addEventListener('chart-state', select)
    return () => window.removeEventListener('chart-state', select)
  }, [])
  useEffect(() => {
    const els = [1, 2, 3, 4, 5, 6].map((i) =>
      document.getElementById(`act-${i}`),
    )
    const ob = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.id.slice(-1)) - 1)
        }),
      { rootMargin: '-35% 0px -55%' },
    )
    els.forEach((e) => e && ob.observe(e))
    return () => ob.disconnect()
  }, [])
  return (
    <StateContext.Provider value={{ selected, setSelected }}>
      <main id="top">
        <a className="skip-link" href="#act-1">
          Skip to story
        </a>
        <ProgressNav active={active} />
        <header className="hero">
          <div className="hero-photo" />
          <div className="hero-grid" />
          <div className="hero-copy">
            <Eyebrow>A visual investigation · Malaysia · 2015–2024</Eyebrow>
            <h1>
              Malaysia’s
              <br />
              <em>Hospital Divide</em>
            </h1>
            <p>Why public beds tell only half the story.</p>
            <div className="hero-note">
              <b>12</b>
              <span>
                visual clues
                <br />
                across 6 acts
              </span>
            </div>
          </div>
          <div className="hero-bed" aria-hidden="true">
            <span />
            <i />
            <b />
          </div>
          <a className="scroll-cue" href="#act-1">
            <span>Begin the investigation</span>
            <Arrow down />
          </a>
        </header>

        <section id="act-1" className="act act-one">
          <SectionHead
            act="Act I · The national divide"
            title="From a distance, the system appears to grow."
            copy="Public hospital beds grew 15.44% between 2015 and 2024, while population grew 9.19%. The national gain is real, yet seven of sixteen states and territories saw their public-bed rate fall. Growth alone establishes neither equal distribution nor adequate access."
          />
          <div className="line-wrap">
            <IndexedLineChart />
          </div>
          <div className="margin-note">
            <span>Read carefully</span>
            <p>
              Observed annual data. Population is context, not a direct measure
              of hospital demand.
            </p>
          </div>
        </section>

        <section id="act-2" className="act act-two">
          <SectionHead
            act="Act II · Geography changes everything"
            title="A national average has no address."
            copy="Capacity is experienced locally. Select a state to carry it across the map, timeline, and later comparisons."
          />
          <StateExplorer />
          <div className="map-spread">
            <div className="map-main">
              <ChoroplethMap />
            </div>
            <div className="heatmap-panel">
              <Heatmap />
            </div>
          </div>
        </section>

        <section id="act-3" className="act act-three">
          <SectionHead
            act="Act III · The hidden private sector"
            title="Now reveal the beds the first map left out."
            copy="Private capacity does not simply add more of the same. It clusters, stretches the distance between states, and can reorder the national picture."
          />
          <div className="symbol-stage">
            <div className="symbol-copy">
              <Eyebrow chart="Chart 04">The private sector</Eyebrow>
              <h3>Private beds are concentrated.</h3>
              <p>
                19,920 licensed private hospital beds change the picture. Nearly
                60% sit in Selangor, Kuala Lumpur and Pulau Pinang.
              </p>
              <p>
                These circles represent state totals, not individual hospital
                locations or affordable access.
              </p>
            </div>
            <ProportionalSymbolMap />
          </div>
          <p className="comparison-bridge">
            First compare how much capacity is added. Then follow the same state
            to see how its position changes. Both views describe 2024, under two
            definitions of capacity.
          </p>
          <div className="comparison-spread">
            <div className="dot-panel">
              <ConnectedDotChart />
            </div>
            <div className="bump-panel">
              <BumpChart />
            </div>
          </div>
        </section>

        <section id="act-4" className="act act-four">
          <SectionHead
            act="Act IV · Capacity versus availability"
            title="A bed can exist on paper and still be out of reach."
            copy="Occupancy introduces operational pressure. Physical stock, staffing, referrals, turnover, and demand all sit between a count and an available bed."
          />
          <div className="occupancy-card">
            <div className="bed-illustration" aria-hidden="true">
              <div className="bed-head" />
              <div className="pillow" />
              <div className="blanket" />
              <div className="bed-frame" />
            </div>
            <RankedDotPlot />
          </div>
        </section>

        <section id="act-5" className="act act-five">
          <SectionHead
            act="Act V · Following the patients"
            title="Where does hospital activity actually happen?"
            copy="Counts rank provider groups; rectangle areas show their shares of the same reported total. Admissions are episodes, not unique patients. Reporting coverage differs across providers."
          />
          <div className="activity-spread">
            <div className="bars-card">
              <AdmissionsBarChart />
            </div>
            <div className="treemap-card">
              <AdmissionsTreemap />
            </div>
          </div>
        </section>

        <section id="act-6" className="act act-six">
          <SectionHead
            act="Act VI · The pressure ahead"
            title="The demand story is changing shape."
            copy="An ageing share is a headline. The full population pyramid compares two observed age structures—and shows why tomorrow’s needs cannot be inferred from today’s bed count."
          />
          <div className="future-spread">
            <div className="age-bars">
              <AgeingBarChart />
            </div>
            <div className="pyramid-card">
              <PopulationPyramid />
            </div>
          </div>
          <div className="cartogram-wrap">
            <NonContiguousCartogram />
          </div>
        </section>

        <footer className="closing">
          <div className="closing-lines" />
          <Eyebrow>The finding is not a number</Eyebrow>
          <h2>
            More beds do not necessarily mean{' '}
            <em>equal access, available capacity,</em> or sufficient care for
            the future.
          </h2>
          <div className="closing-grid">
            <p>
              Bed counts are a starting point—not a verdict on access or
              quality. Geography, provider mix, occupancy, activity, and
              demography each redraw the picture.
            </p>
            <div>
              <b>Sources & methodology</b>
              <span>
                Observed MOH and DOSM data through 2024. Public beds include
                special institutions; private beds cover licensed hospitals.
                Occupancy is annual and MOH-only. Admissions have incomplete
                reporting. Ageing is context, not a demand forecast.
              </span>
            </div>
            <a href="#top">
              Return to the beginning <Arrow />
            </a>
          </div>
          <small>
            Malaysia’s Hospital Divide · TAN HONG GUAN · 35100621 · FIT3179
          </small>
          <div id="sources" className="methodology">
            <p>
              Sources: <a href={source.beds}>MOH public beds</a> ·{' '}
              <a href={source.indicators}>Health Indicators 2025</a> ·{' '}
              <a href={source.population}>DOSM population</a> ·{' '}
              <a href={source.geography}>DOSM boundaries</a>
            </p>
            <p>
              Rates = beds ÷ resident population × 10,000. Combined beds =
              public hospital/special-institution beds + licensed private
              hospital beds. Private admissions include maternity homes, nursing
              homes and hospices, unlike hospital-only capacity. Geographic
              vintage is undocumented; Sarawak is repaired in a separate derived
              copy. Full source notes and data downloads accompany the charts.
            </p>
            <p>
              Local draft · Source reuse conditions remain unresolved before
              public release. Raw publications are not bundled. No
              current-pressure, patient-flow or access claims are made.
            </p>
          </div>
        </footer>
      </main>
    </StateContext.Provider>
  )
}

export default App
