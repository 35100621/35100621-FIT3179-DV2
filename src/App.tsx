import { useState } from 'react'
import { CountUp, HospitalMotif, useStoryReveals } from './components/StoryMotion'
import { fixed, number, summary, source } from './data'
import { StateContext, IndexedChart, Choropleth, Heatmap, PrivateSymbolMap, BumpChart, ConnectedDots, OccupancyPlot, AdmissionsBars, AgeVisual } from './components/StoryCharts'
function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return <p className={`eyebrow${light ? " light" : ""}`}>{children}</p>
}

function MethodNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="method-note">
      <span>READING NOTE</span>
      <p>{children}</p>
    </aside>
  )
}

function SectionTitle({
  number,
  title,
  intro,
  light = false,
}: {
  number: string
  title: string
  intro?: string
  light?: boolean
}) {
  return (
    <header className={`section-title${light ? " light" : ""}`}>
      <Eyebrow light={light}>CHAPTER {number}</Eyebrow>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  )
}

function App() {
  const [selected, setSelected] = useState('')
  useStoryReveals()
  return (
    <StateContext.Provider value={{selected,setSelected}}>
    <div className="site">
      <a className="skip-link" href="#story">Skip to the story</a>
      <header className="hero">
        <nav className="hero-nav">
          <p>FIT3179 · DATA STORY</p>
          <a href="#sources">MALAYSIA · 2015–2024 ↗ SOURCES</a>
        </nav>
        <div className="hero-inner">
          <div className="hero-copy">
            <Eyebrow light>HEALTHCARE CAPACITY IN MALAYSIA</Eyebrow>
            <h1>
              Malaysia&apos;s
              <br />
              Hospital Divide
            </h1>
            <p className="hero-subtitle">
              Why Public Beds Tell Only Half the Story
            </p>
            <p className="hero-dek">
              Malaysia has expanded its public hospital capacity over the past
              decade. But national growth conceals regional differences—and
              including private hospitals changes the picture dramatically.
            </p>
          </div>
          <HospitalMotif />
          <div className="hero-stats">
            <article>
              <strong><CountUp value={summary.bed_growth} prefix="+" suffix="%" /></strong>
              <p>Public hospital bed growth</p>
              <span>2015–2024</span>
            </article>
            <article>
              <strong><CountUp value={summary.population_growth} prefix="+" suffix="%" /></strong>
              <p>Population growth</p>
              <span>2015–2024</span>
            </article>
            <article>
              <strong><CountUp value={summary.private_share} suffix="%" /></strong>
              <p>Private beds as share of defined combined capacity</p>
              <span>2024</span>
            </article>
          </div>
        </div>
        <div className="scroll-cue">
          <i /> SCROLL TO EXPLORE
        </div>
      </header>

      <main id="story">
        <section className="story-section progress-section">
          <SectionTitle
            number="01"
            title="More beds, but how much progress?"
            intro="At the national level, public hospital capacity grew faster than the population. The full annual record shows the change—but the national picture is only the beginning."
          />
          <IndexedChart />
          <blockquote>
            “Public hospital beds grew faster than the population, but the
            national average does not tell us how capacity is distributed.”
          </blockquote>
        </section>

        <section className="story-section regional-section">
          <SectionTitle
            number="02"
            title="One country. Very different hospital capacity."
            intro="A bed in a national total still exists somewhere. Rates per resident begin to show how unevenly public capacity is recorded across Malaysia."
          />
          <div className="editorial-grid map-editorial">
            <Choropleth />
            <aside className="editorial-aside"><Eyebrow>GEOGRAPHY MATTERS</Eyebrow><h3>A national total has a local address.</h3><p>Compare public beds per resident across states, then use the regional views to look closer.</p><p>Small territories have small resident denominators. A high rate does not tell us who travels there for care.</p><a href="#regional-history">Explore the decade ↓</a></aside>
          </div><div id="regional-history" className="supporting-heading"><Eyebrow>THE LONGER VIEW</Eyebrow><p>Is the divide narrowing over time?</p></div>
          <Heatmap />
        </section>

        <section className="reveal-section">
          <div className="reveal-inner">
            <SectionTitle
              number="03"
              title="But that’s only the public side."
              intro="In 2024, Malaysia recorded 19,920 licensed private hospital beds. Including these beds changes the apparent distribution of hospital capacity across states."
            />
            <div className="reveal-stat">
              <strong><CountUp value={summary.private_beds} decimals={0} /></strong>
              <span>LICENSED PRIVATE HOSPITAL BEDS · 2024</span>
            </div>
            <div className="editorial-grid private-editorial"><PrivateSymbolMap /><aside className="editorial-aside"><Eyebrow>THE OTHER PART OF THE PICTURE</Eyebrow><h3>Private beds are concentrated.</h3><p>Circle area shows the number of licensed private hospital beds. The comparison below puts public and combined capacity on the same population denominator.</p><p>More recorded beds do not necessarily mean more affordable care.</p></aside></div>
            <div className="chapter-bridge"><Eyebrow>FROM COUNTS TO CAPACITY</Eyebrow><h3>Same population. A different picture.</h3><p>Follow each line from public beds to combined capacity.</p></div>
            <ConnectedDots />
            <div className="ranking-editorial">
            <BumpChart />
            <div className="pinang-callout">
              <div>
                <span>15th</span>
                <i>→</i>
                <strong>4th</strong>
              </div>
              <p>
                <b>Pulau Pinang&apos;s ranking changes dramatically</b> when
                private hospital beds are included.
              </p>
            </div>
            </div>
            <MethodNote>
              Combined capacity is a count of public hospital and
              special-institution beds plus licensed private hospital beds. It
              is not a measure of affordability, staffing, operational
              availability or access.
            </MethodNote>
          </div>
        </section>

        <section className="story-section availability-section">
          <SectionTitle
            number="04"
            title="Having beds is not the same as having beds available."
            intro="Official capacity and operational capacity answer different questions. Occupancy adds another layer—but annual averages still cannot diagnose pressure inside individual hospitals."
          />
          <div className="capacity-pair">
            <article>
              <Eyebrow>OFFICIAL MOH BEDS</Eyebrow>
              <strong>{number(summary.official_moh)}</strong>
              <p>Recorded capacity in 2024</p>
            </article>
            <div className="capacity-gap">
              <i />
              <span>{number(summary.operational_gap)}-bed difference</span>
            </div>
            <article>
              <Eyebrow>OPERATIONAL MOH BEDS</Eyebrow>
              <strong>{number(summary.operational_moh)}</strong>
              <p>Reported operational capacity in 2024</p>
            </article>
          </div>
          <OccupancyPlot />
          <MethodNote>
            Annual averages conceal variation between hospitals, wards and
            seasons. Occupancy alone cannot establish whether a healthcare
            system is overloaded.
          </MethodNote>
        </section>

        <section className="story-section activity-section">
          <SectionTitle
            number="05"
            title="Where does reported hospital activity take place?"
            intro="Admissions show recorded episodes across provider groups. They are useful for scale, but not directly interchangeable measures of population demand."
          />
          <div className="activity-editorial"><aside className="editorial-aside"><Eyebrow>REPORTED ACTIVITY</Eyebrow><h3>MOH records the most admissions.</h3><p>The largest provider category leads these reported totals. Coverage and institution types differ, so read the comparison alongside its caveats.</p></aside><AdmissionsBars /></div>
          <MethodNote>
            Admissions are reported episodes, not unique patients.
            Private-sector reporting includes additional institution types and
            has incomplete reporting coverage. These totals should not be read
            as fully comparable demand measures.
          </MethodNote>
        </section>

        <section className="future-section">
          <div className="future-inner">
            <SectionTitle
              light
              number="06"
              title="More beds. An ageing population. Uneven distribution."
              intro={`The population is changing alongside capacity. Between 2015 and 2024, the share of residents aged 65 and above increased by ${fixed(summary.age_increase)} percentage points.`}
            />
            <AgeVisual />
            <div className="conclusion-label"><Eyebrow light>THE DIVIDE BEHIND THE TOTAL</Eyebrow></div>
            <p className="conclusion-copy">
              Malaysia&apos;s hospital capacity has expanded, but national
              totals alone conceal important differences between regions and
              healthcare sectors. These figures describe where beds are
              recorded—not whether everyone can afford or reach the care they
              need.
            </p>
          </div>
        </section>
      </main>

      <footer id="sources">
        <div className="footer-top">
          <div className="footer-intro">
            <Eyebrow>SOURCES &amp; METHODOLOGY</Eyebrow>
            <h2>About this story</h2>
            <p>
              Nine data-driven views follow Malaysia’s hospital capacity, reported activity and ageing population. This V1 draft uses observed data, not sample values.
            </p>
          </div>
          <div>
            <h3>Primary sources</h3>
            <ul>
              <li><a href={source.beds}>MOH · Public hospital beds</a></li>
              <li><a href={source.indicators}>MOH · Health Indicators 2025</a></li>
              <li><a href={source.population}>DOSM · State population</a></li>
              <li><a href={source.national}>DOSM · National population</a></li>
              <li><a href={source.geography}>DOSM · State boundaries</a></li>
            </ul>
          </div>
          <div>
            <h3>Definitions</h3>
            <p>
              Public bed rates use resident population denominators. Combined
              capacity adds licensed private beds to defined public capacity.
              Admissions are episodes rather than unique people.
            </p>
          </div>
          <div>
            <h3>Limitations</h3>
            <p>
              Annual occupancy covers MOH only. Admissions have incomplete reporting. Boundary vintage is undocumented. Bed definitions and operational status vary by provider
              and year. National and annual averages hide facility-level
              variation.
            </p>
          </div>
        </div>
        <p className="release-note">Local V1 · observed data through 2024, prepared 15 October 2026. The full source publications are not bundled. Source reuse conditions and final author attribution remain to be resolved before public release.</p>
        <div className="footer-bottom">
          <span>AUTHOR: TAN HONG GUAN [35100621]</span>
          <span>FIT3179 · MONASH UNIVERSITY</span>
          <span>V1 DRAFT: 15 OCTOBER 2026 · NOT YET PUBLISHED</span>
        </div>
      </footer>
    </div>
    </StateContext.Provider>
  )
}

export default App
