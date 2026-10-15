const palette = {
  navy: "#172B42",
  terracotta: "#D77750",
  teal: "#527F78",
  slate: "#7D90AE",
  divider: "#E7E4DE",
  cream: "#F8F7F3",
}

const format = new Intl.NumberFormat("en-MY")

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return <p className={`eyebrow${light ? " light" : ""}`}>{children}</p>
}

function Source({ children }: { children: React.ReactNode }) {
  return <p className="source">{children}</p>
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

function IndexedChart() {
  return (
    <div className="chart indexed-chart">
      <div className="chart-meta">
        <div>
          <h3>Public beds outpaced population growth</h3>
          <p>Indexed growth, 2015 = 100</p>
        </div>
        <div className="inline-legend">
          <span>
            <i className="navy-dot" /> Public hospital beds
          </span>
          <span>
            <i className="teal-dot" /> Population
          </span>
        </div>
      </div>
      <svg
        viewBox="0 0 1040 430"
        role="img"
        aria-label="Indexed public hospital bed and population growth from 2015 to 2024"
      >
        {[100, 105, 110, 115].map((v, i) => {
          const y = 338 - i * 83
          return (
            <g key={v}>
              <line x1="84" x2="926" y1={y} y2={y} className="gridline" />
              <text x="62" y={y + 5} className="axis-label">
                {v}
              </text>
            </g>
          )
        })}
        <line x1="84" x2="926" y1="338" y2="338" className="axis-line" />
        <text x="84" y="370" className="year-label">
          2015
        </text>
        <text x="926" y="370" textAnchor="end" className="year-label">
          2024
        </text>
        <path d="M84 338 L926 82" className="public-line" />
        <path d="M84 338 L926 185" className="population-line" />
        <circle cx="84" cy="338" r="7" className="public-point" />
        <circle cx="926" cy="82" r="9" className="public-point" />
        <circle cx="926" cy="185" r="9" className="population-point" />
        <g className="endpoint-label">
          <text x="945" y="76">
            115.44
          </text>
          <text x="945" y="94" className="endpoint-sub public-text">
            PUBLIC BEDS
          </text>
          <text x="945" y="180">
            109.19
          </text>
          <text x="945" y="198" className="endpoint-sub teal-text">
            POPULATION
          </text>
        </g>
        <path d="M897 91 L897 176" className="gap-line" />
        <path d="M890 92 H904 M890 175 H904" className="gap-line" />
        <g transform="translate(693 116)">
          <rect width="174" height="48" rx="24" className="gap-pill" />
          <text x="87" y="21" textAnchor="middle" className="gap-title">
            +6.25 index points
          </text>
          <text x="87" y="36" textAnchor="middle" className="gap-sub">
            difference by 2024
          </text>
        </g>
        <g className="missing-band">
          <rect x="142" y="382" width="726" height="28" rx="14" />
          <text x="505" y="400" textAnchor="middle">
            INTERMEDIATE ANNUAL OBSERVATIONS NOT SUPPLIED · ENDPOINTS CONNECTED
            FOR CONTEXT
          </text>
        </g>
      </svg>
      <Source>
        Sources: Ministry of Health Malaysia; Department of Statistics Malaysia.
        Indexed values supplied for 2015 and 2024.
      </Source>
    </div>
  )
}

const regionalValues = [
  {
    state: "Putrajaya",
    value: 70.16,
    note: "Small resident population + referral role",
  },
  { state: "Perak", value: 23.43, note: "Verified 2024 rate" },
  { state: "Selangor", value: 11.32, note: "Verified 2024 rate" },
]

function ChoroplethIncomplete() {
  return (
    <div className="chart map-chart">
      <div className="chart-meta">
        <div>
          <h3>Public beds per 10,000 residents</h3>
          <p>State and federal territory, 2024</p>
        </div>
        <span className="data-status">INCOMPLETE GEOGRAPHY</span>
      </div>
      <div className="map-stage">
        <div className="map-pending">
          <span className="map-crosshair" />
          <Eyebrow>CHOROPLETH LAYER RESERVED</Eyebrow>
          <h3>Authentic state boundaries are required</h3>
          <p>
            The map will render when verified Malaysia GeoJSON and the complete
            16-region rate table are connected. No state shapes or missing rates
            have been invented.
          </p>
          <div
            className="colour-ramp"
            aria-label="Sequential map legend preview"
          >
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="ramp-label">
            <span>Fewer public beds</span>
            <span>More public beds</span>
          </div>
        </div>
        <div className="verified-locations">
          <p className="verified-title">VERIFIED 2024 VALUES</p>
          {regionalValues.map((item) => (
            <div className="location-row" key={item.state}>
              <div>
                <strong>{item.state}</strong>
                <span>{item.note}</span>
              </div>
              <b>{item.value.toFixed(2)}</b>
            </div>
          ))}
          <p className="unit">PUBLIC BEDS PER 10,000 RESIDENTS</p>
        </div>
      </div>
      <Source>
        Map data: authentic state topology pending. Values shown only where
        supplied and verified.
      </Source>
    </div>
  )
}

function HeatmapIncomplete() {
  const years = Array.from({ length: 10 }, (_, i) => 2015 + i)
  const states = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "N. Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "P. Pinang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "K. Lumpur",
    "Labuan",
    "Putrajaya",
  ]
  return (
    <div className="chart heatmap-chart">
      <div className="chart-meta">
        <div>
          <h3>How did state differences evolve?</h3>
          <p>Public beds per 10,000 residents, 2015–2024</p>
        </div>
        <span className="data-status">ANNUAL TABLE REQUIRED</span>
      </div>
      <div className="heatmap-scroll">
        <div className="heatmap">
          <div />
          {years.map((year) => (
            <b key={year}>{year}</b>
          ))}
          {states.map((state) => (
            <div className="heatmap-row" key={state}>
              <span>{state}</span>
              {years.map((year) => (
                <i
                  key={`${state}-${year}`}
                  title={`${state}, ${year}: value not supplied`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="incomplete-caption">
        <strong>Why the cells are unfilled:</strong> a complete state-by-year
        table was not supplied. The production heatmap will use a single
        quantitative scale and tooltips with exact rates.
      </p>
      <Source>
        Source table pending. Grid preserves the intended 16-region × 10-year
        structure.
      </Source>
    </div>
  )
}

const revealData = [
  {
    state: "Pulau Pinang",
    public: 11.82,
    combined: 27.64,
    publicRank: 15,
    combinedRank: 4,
    highlight: true,
  },
  {
    state: "Selangor",
    public: 11.32,
    combined: 18.78,
    publicRank: 16,
    combinedRank: 10,
  },
  {
    state: "Melaka",
    public: 12.89,
    combined: 21.7,
    publicRank: 13,
    combinedRank: 6,
  },
  {
    state: "Sabah",
    public: 13.62,
    combined: 14.72,
    publicRank: 10,
    combinedRank: 15,
  },
]

function ConnectedDots() {
  const x = (value: number) => 220 + (value / 30) * 640
  return (
    <div className="reveal-chart">
      <div className="chart-meta">
        <div>
          <h3>Public versus combined hospital beds</h3>
          <p>Beds per 10,000 residents, 2024 · supplied state observations</p>
        </div>
        <div className="inline-legend">
          <span>
            <i className="navy-dot" /> Public
          </span>
          <span>
            <i className="slate-dot" /> Combined
          </span>
        </div>
      </div>
      <svg
        viewBox="0 0 1000 420"
        role="img"
        aria-label="Connected dot chart comparing public and combined hospital bed rates"
      >
        {[0, 5, 10, 15, 20, 25, 30].map((v) => (
          <g key={v}>
            <line
              x1={x(v)}
              x2={x(v)}
              y1="54"
              y2="338"
              className="reveal-gridline"
            />
            <text
              x={x(v)}
              y="365"
              textAnchor="middle"
              className="reveal-axis-label"
            >
              {v}
            </text>
          </g>
        ))}
        <text x="540" y="400" textAnchor="middle" className="reveal-axis-title">
          BEDS PER 10,000 RESIDENTS
        </text>
        {revealData.map((item, index) => {
          const y = 88 + index * 70
          return (
            <g
              className={`dot-row${item.highlight ? " featured" : ""}`}
              key={item.state}
            >
              {item.highlight && (
                <rect
                  x="44"
                  y={y - 28}
                  width="890"
                  height="56"
                  rx="7"
                  className="row-highlight"
                />
              )}
              <text x="190" y={y - 4} textAnchor="end" className="state-name">
                {item.state}
              </text>
              <text x="190" y={y + 15} textAnchor="end" className="rank-shift">
                #{item.publicRank} → #{item.combinedRank}
              </text>
              <line
                x1={x(item.public)}
                x2={x(item.combined)}
                y1={y}
                y2={y}
                className="connector"
              />
              <circle
                cx={x(item.public)}
                cy={y}
                r="9"
                className="public-point hover-point"
              >
                <title>{`${item.state}: ${item.public.toFixed(2)} public beds per 10,000`}</title>
              </circle>
              <circle
                cx={x(item.combined)}
                cy={y}
                r="11"
                className="combined-point hover-point"
              >
                <title>{`${item.state}: ${item.combined.toFixed(2)} combined beds per 10,000`}</title>
              </circle>
              <text
                x={x(item.public) - 13}
                y={y - 16}
                textAnchor="end"
                className="dot-value public-value"
              >
                {item.public.toFixed(2)}
              </text>
              <text
                x={x(item.combined) + 13}
                y={y - 16}
                className="dot-value combined-value"
              >
                {item.combined.toFixed(2)}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="remaining-data">
        <span>12 REMAINING REGIONS</span>
        <p>
          Rows will be added when the complete public and licensed-private bed
          table is supplied.
        </p>
      </div>
      <Source>
        Combined capacity = public hospital/special-institution beds + licensed
        private hospital beds. Four verified comparisons supplied.
      </Source>
    </div>
  )
}

function OccupancyPlot() {
  const values = [
    { name: "Kedah", value: 81.92, type: "state" },
    { name: "National annual MOH", value: 72.61, type: "national" },
    { name: "Labuan", value: 60.68, type: "state" },
  ]
  const x = (v: number) => 190 + ((v - 50) / 40) * 620
  return (
    <div className="chart occupancy-chart">
      <div className="chart-meta">
        <div>
          <h3>Annual MOH bed occupancy</h3>
          <p>Selected supplied values, 2024</p>
        </div>
        <span className="data-status">3 OF 17 ROWS</span>
      </div>
      <svg
        viewBox="0 0 930 290"
        role="img"
        aria-label="Dot plot of supplied MOH bed occupancy values"
      >
        {[50, 60, 70, 80, 90].map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1="40" y2="225" className="gridline" />
            <text x={x(v)} y="255" textAnchor="middle" className="axis-label">
              {v}%
            </text>
          </g>
        ))}
        {values.map((item, index) => {
          const y = 77 + index * 67
          return (
            <g key={item.name}>
              <text
                x="155"
                y={y + 5}
                textAnchor="end"
                className={`occupancy-name ${item.type}`}
              >
                {item.name}
              </text>
              <line
                x1={x(50)}
                x2={x(item.value)}
                y1={y}
                y2={y}
                className="occupancy-stem"
              />
              <circle
                cx={x(item.value)}
                cy={y}
                r={item.type === "national" ? 11 : 9}
                className={
                  item.type === "national"
                    ? "national-point"
                    : "occupancy-point"
                }
              >
                <title>{`${item.name}: ${item.value}%`}</title>
              </circle>
              <text
                x={x(item.value) + 18}
                y={y + 5}
                className="occupancy-value"
              >
                {item.value.toFixed(2)}%
              </text>
            </g>
          )
        })}
      </svg>
      <Source>
        Source: Ministry of Health Malaysia, annual MOH occupancy. Complete
        state table not supplied.
      </Source>
    </div>
  )
}

const admissions = [
  { provider: "MOH hospitals", value: 2579373, color: palette.navy },
  {
    provider: "Private-sector providers",
    value: 1359910,
    color: palette.terracotta,
  },
  {
    provider: "Other government hospitals",
    value: 197530,
    color: palette.slate,
  },
  { provider: "MOH special institutions", value: 133543, color: palette.teal },
]

function AdmissionsBars() {
  const max = admissions[0].value
  return (
    <div className="chart admissions-chart">
      <div className="chart-meta">
        <div>
          <h3>Reported admissions by provider</h3>
          <p>Reported episodes, 2024</p>
        </div>
      </div>
      <div
        className="bar-chart"
        role="img"
        aria-label="Horizontal bars comparing reported admissions by provider in 2024"
      >
        {admissions.map((item) => (
          <div className="bar-row" key={item.provider}>
            <p>{item.provider}</p>
            <div className="bar-track">
              <i
                style={{
                  width: `${(item.value / max) * 100}%`,
                  background: item.color,
                }}
                title={`${item.provider}: ${format.format(item.value)}`}
              />
            </div>
            <b>{format.format(item.value)}</b>
          </div>
        ))}
        <div className="bar-axis">
          <span>0</span>
          <span>1 million</span>
          <span>2 million</span>
          <span>2.58m</span>
        </div>
      </div>
      <Source>
        Source: Ministry of Health Malaysia. Provider definitions and reporting
        coverage differ.
      </Source>
    </div>
  )
}

function AgeVisual() {
  return (
    <div className="age-visual">
      <div className="age-chart-copy">
        <Eyebrow light>POPULATION AGED 65+</Eyebrow>
        <p>
          Malaysia is getting older. The increase is gradual, but its direction
          is clear.
        </p>
      </div>
      <div className="age-pair">
        <div className="age-year">
          <strong>5.84%</strong>
          <span>2015</span>
          <div
            className="people-grid"
            aria-label="5.84 percent of population aged 65 or older in 2015"
          >
            {Array.from({ length: 100 }, (_, i) => (
              <i key={i} className={i < 6 ? "older" : ""} />
            ))}
          </div>
        </div>
        <div className="age-arrow">→</div>
        <div className="age-year current">
          <strong>7.66%</strong>
          <span>2024</span>
          <div
            className="people-grid"
            aria-label="7.66 percent of population aged 65 or older in 2024"
          >
            {Array.from({ length: 100 }, (_, i) => (
              <i key={i} className={i < 8 ? "older" : ""} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="site">
      <header className="hero">
        <nav className="hero-nav">
          <p>FIT3179 · DATA STORY</p>
          <p>MALAYSIA · 2015–2024</p>
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
          <div className="hero-stats">
            <article>
              <strong>+15.44%</strong>
              <p>Public hospital bed growth</p>
              <span>2015–2024</span>
            </article>
            <article>
              <strong>+9.19%</strong>
              <p>Population growth</p>
              <span>2015–2024</span>
            </article>
            <article>
              <strong>27.68%</strong>
              <p>Private beds as share of defined combined capacity</p>
              <span>2024</span>
            </article>
          </div>
        </div>
        <div className="scroll-cue">
          <i /> SCROLL TO EXPLORE
        </div>
      </header>

      <main>
        <section className="story-section progress-section">
          <SectionTitle
            number="01"
            title="More beds, but how much progress?"
            intro="At the national level, public hospital capacity grew faster than the population. The gap is real—but modest, and only visible at two verified endpoints in the supplied data."
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
          <ChoroplethIncomplete />
          <HeatmapIncomplete />
        </section>

        <section className="reveal-section">
          <div className="reveal-inner">
            <SectionTitle
              number="03"
              title="But that’s only the public side."
              intro="In 2024, Malaysia recorded 19,920 licensed private hospital beds. Including these beds changes the apparent distribution of hospital capacity across states."
            />
            <div className="reveal-stat">
              <strong>19,920</strong>
              <span>LICENSED PRIVATE HOSPITAL BEDS · 2024</span>
            </div>
            <ConnectedDots />
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
              <strong>46,855</strong>
              <p>Recorded capacity in 2024</p>
            </article>
            <div className="capacity-gap">
              <i />
              <span>2,285-bed difference</span>
            </div>
            <article>
              <Eyebrow>OPERATIONAL MOH BEDS</Eyebrow>
              <strong>44,570</strong>
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
          <AdmissionsBars />
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
              intro="The need for care is changing alongside capacity. Between 2015 and 2024, the share of Malaysians aged 65 and above increased by 1.82 percentage points."
            />
            <AgeVisual />
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

      <footer>
        <div className="footer-top">
          <div className="footer-intro">
            <Eyebrow>SOURCES &amp; METHODOLOGY</Eyebrow>
            <h2>About this story</h2>
            <p>
              This prototype uses supplied verified values and intentionally
              leaves unsupplied observations blank.
            </p>
          </div>
          <div>
            <h3>Primary sources</h3>
            <p>
              Ministry of Health Malaysia
              <br />
              Health Indicators 2024 and 2025
              <br />
              Department of Statistics Malaysia
              <br />
              KKMNOW
            </p>
            <p className="pending-link">
              Source links pending final bibliography.
            </p>
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
              Coverage, bed definitions and operational status vary by provider
              and year. National and annual averages hide facility-level
              variation.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>AUTHOR: [NAME TO BE CONFIRMED]</span>
          <span>FIT3179 · MONASH UNIVERSITY</span>
          <span>PUBLICATION DATE: [PENDING]</span>
        </div>
      </footer>
    </div>
  )
}

export default App
