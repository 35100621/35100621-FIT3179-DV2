import { useEffect, useMemo, useState } from 'react'

const states = [
  { n: 'W.P. Kuala Lumpur', short: 'KUL', public: 18.6, combined: 31.4, occupancy: 88, private: 6400, rankA: 4, rankB: 1 },
  { n: 'Pulau Pinang', short: 'PNG', public: 10.8, combined: 24.7, occupancy: 84, private: 5200, rankA: 15, rankB: 4 },
  { n: 'Selangor', short: 'SGR', public: 8.9, combined: 18.2, occupancy: 92, private: 7900, rankA: 14, rankB: 7 },
  { n: 'Perak', short: 'PRK', public: 17.8, combined: 22.6, occupancy: 79, private: 2100, rankA: 5, rankB: 5 },
  { n: 'Johor', short: 'JHR', public: 12.3, combined: 19.1, occupancy: 86, private: 3500, rankA: 10, rankB: 6 },
  { n: 'Sabah', short: 'SBH', public: 11.4, combined: 13.2, occupancy: 94, private: 1100, rankA: 12, rankB: 13 },
  { n: 'Sarawak', short: 'SWK', public: 15.9, combined: 18.8, occupancy: 76, private: 1600, rankA: 7, rankB: 8 },
  { n: 'Kelantan', short: 'KTN', public: 13.8, combined: 14.6, occupancy: 90, private: 420, rankA: 9, rankB: 12 },
  { n: 'Terengganu', short: 'TRG', public: 19.2, combined: 20.7, occupancy: 73, private: 610, rankA: 3, rankB: 9 },
  { n: 'Pahang', short: 'PHG', public: 20.4, combined: 21.8, occupancy: 71, private: 720, rankA: 2, rankB: 10 },
  { n: 'Kedah', short: 'KDH', public: 14.7, combined: 17.4, occupancy: 82, private: 1200, rankA: 8, rankB: 11 },
  { n: 'Melaka', short: 'MLK', public: 16.6, combined: 27.1, occupancy: 78, private: 2300, rankA: 6, rankB: 3 },
]

const mapShapes = [
  ['KDH', '54,28 76,22 86,52 69,72 48,58'], ['PNG', '34,51 45,48 47,65 35,69'],
  ['KTN', '88,40 112,45 119,74 91,80 72,65'], ['TRG', '112,48 126,58 124,94 108,103 96,80 119,74'],
  ['PRK', '48,70 72,64 91,80 88,115 58,129 43,103'], ['PHG', '89,82 108,103 124,96 119,135 91,151 69,129 88,115'],
  ['SGR', '54,130 70,128 90,151 75,170 53,153'], ['KUL', '67,141 76,142 75,151 66,150'],
  ['MLK', '76,171 91,169 97,181 82,186'], ['JHR', '91,152 119,136 132,160 118,192 96,181 91,169'],
  ['SWK', '230,124 271,103 330,106 356,126 331,144 283,147 248,139'],
  ['SBH', '345,102 395,75 446,91 430,124 391,139 356,126 331,106'],
] as const

function Arrow({ down = false }: { down?: boolean }) {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d={down ? 'M4 7l6 6 6-6' : 'M7 16l6-6-6-6'} /></svg>
}

function Eyebrow({ chart, children }: { chart?: string; children: React.ReactNode }) {
  return <div className="eyebrow">{chart && <span>{chart}</span>}{children}</div>
}

function ChartNote({ children }: { children: React.ReactNode }) {
  return <div className="chart-note"><p>{children}</p><span>Source · Illustrative prototype data · Methodology note</span></div>
}

function SectionHead({ act, title, copy }: { act: string; title: string; copy: string }) {
  return <div className="section-head"><Eyebrow>{act}</Eyebrow><h2>{title}</h2><p>{copy}</p></div>
}

function Tooltip({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return <div className="tooltip" style={{ left: `${x}%`, top: `${y}%` }}>{children}</div>
}

function LineChart() {
  const [year, setYear] = useState(2023)
  const years = [2000, 2004, 2008, 2012, 2016, 2020, 2023]
  const pop = [100, 108, 117, 127, 137, 146, 152]
  const beds = [100, 105, 110, 117, 122, 126, 129]
  const i = years.indexOf(year)
  const x = (i / 6) * 100
  return <div className="line-wrap">
    <div className="chart-top"><div><Eyebrow chart="Chart 01 — Indexed Line Chart">Prototype data · Index 2000 = 100</Eyebrow><h3>Two lines that stopped moving together.</h3></div><div className="metric"><b>23</b><span>point gap</span></div></div>
    <svg className="line-chart" viewBox="0 0 900 390" role="img" aria-label="Indexed public beds and population line chart">
      {[0, 1, 2, 3].map((v) => <g key={v}><line x1="70" x2="860" y1={315-v*80} y2={315-v*80} className="grid"/><text x="25" y={320-v*80}>{100+v*20}</text></g>)}
      <path className="line population" pathLength="1" d="M70 315 C190 285 280 253 365 220 S560 145 860 107"/>
      <path className="line beds" pathLength="1" d="M70 315 C190 295 280 272 365 251 S590 206 860 198"/>
      <text x="866" y="111" className="line-label pop-label">Population</text>
      <text x="866" y="202" className="line-label bed-label">Public beds</text>
      <path d="M705 126 L705 188" className="gap-bracket"/><text x="716" y="160" className="gap-label">Widening gap</text>
      <line x1={70+x*7.9} x2={70+x*7.9} y1="55" y2="325" className="scrub"/>
      <circle cx={70+x*7.9} cy={315-(pop[i]-100)*4} r="7" className="pop-dot"/>
      <circle cx={70+x*7.9} cy={315-(beds[i]-100)*4} r="7" className="bed-dot"/>
      {years.map((y, j) => <text key={y} x={70+j*131.6} y="355" textAnchor="middle">{y}</text>)}
      <g className="point-annotation" transform={`translate(${Math.min(680,70+x*7.9+14)} ${Math.max(65,280-(pop[i]-100)*2)})`}><rect width="120" height="42" rx="2"/><text x="10" y="17">{year}: {pop[i]} vs {beds[i]}</text><text x="10" y="32">index points</text></g>
    </svg>
    <div className="range-row"><span>Drag through time</span><input aria-label="Select year" type="range" min="0" max="6" value={i} onChange={(e) => setYear(years[+e.target.value])}/><b>{year}</b></div>
    <ChartNote>The indexed view isolates growth rates: the selected year shows how far demand and public capacity have moved from the same baseline.</ChartNote>
  </div>
}

function MalaysiaMap({ mode = 'choropleth', selected, setSelected, symbols = false }: { mode?: 'choropleth'|'reference'; selected: string; setSelected: (s:string)=>void; symbols?: boolean }) {
  const [hovered,setHovered]=useState('')
  const hoverState=states.find(s=>s.short===hovered)
  return <div className="map-shell">
    <svg className="malaysia-map" viewBox="0 0 480 230" role="img" aria-label="Stylised map of Malaysian states">
      <path d="M162 168 C185 168 199 161 215 149" className="sea-route"/>
      {mapShapes.map(([id, points], idx) => {
        const d = states.find(s => s.short === id)
        return <polygon key={id} points={points} tabIndex={0} onMouseEnter={()=>setHovered(id)} onMouseLeave={()=>setHovered('')} onFocus={()=>setHovered(id)} onBlur={()=>setHovered('')} onClick={() => setSelected(id)} onKeyDown={(e) => e.key==='Enter' && setSelected(id)}
          className={`${mode==='reference' ? 'map-reference' : `map-q${Math.min(4, Math.floor((d?.public ?? 10)/5))}`} ${selected===id?'selected':''}`}/>
      })}
      {symbols && states.map((s, i) => {
        const pos = [[71,144],[40,59],[62,144],[65,103],[111,166],[392,108],[294,128],[99,61],[114,81],[98,121],[65,43],[85,177]][i]
        return <circle key={s.short} cx={pos[0]} cy={pos[1]} r={4+Math.sqrt(s.private)/10} tabIndex={0} onMouseEnter={()=>setHovered(s.short)} onMouseLeave={()=>setHovered('')} onClick={() => setSelected(s.short)} className={`symbol ${selected===s.short?'selected':''}`}/>
      })}
      <text x="53" y="215" className="map-label">PENINSULAR MALAYSIA</text><text x="328" y="171" className="map-label">EAST MALAYSIA</text>
    </svg>
    {hoverState && <div className="map-tooltip"><b>{hoverState.n}</b><span>{symbols ? `${hoverState.private.toLocaleString()} private beds` : `${hoverState.public} public beds / 10k`}</span></div>}
  </div>
}

function Heatmap({ selected, setSelected }: { selected:string; setSelected:(s:string)=>void }) {
  const years = ['00','05','10','15','20','23']
  const [hover,setHover]=useState<{state:string;year:string;value:string}|null>(null)
  return <div className="heatmap">
    <Eyebrow chart="Chart 03 — Heatmap">Public beds / 10,000</Eyebrow>
    <h3>A decade can change the shade.</h3>
    <div className="heat-head">{years.map(y=><span key={y}>’{y}</span>)}</div>
    {states.map((s, r)=><button key={s.short} className={selected===s.short?'active':''} onClick={()=>setSelected(s.short)}>
      <b>{s.short}</b>
      {years.map((y,c)=>{
        const value=(s.public-2.5+c*.5+(r%3)*.3).toFixed(1)
        const shade=Math.min(4,Math.max(0,Math.floor((s.public-5+c*1.1+(r%3))/5)))
        return <i key={c} onMouseEnter={()=>setHover({state:s.n,year:`20${y}`,value})} onMouseLeave={()=>setHover(null)} className={`heat h${shade}`}/>
      })}
    </button>)}
    <div className="heat-legend"><span>Fewer</span>{[0,1,2,3,4].map(i=><i key={i} className={`heat h${i}`}/>)}<span>More beds</span></div>
    {hover && <div className="heat-tooltip"><b>{hover.state}</b><span>{hover.year} · {hover.value} beds / 10k</span></div>}
    <ChartNote>Rows reveal whether a state’s current position reflects a persistent pattern or a recent shift.</ChartNote>
  </div>
}

function Cartogram() {
  const [carto, setCarto] = useState(true)
  const transforms: Record<string,[number,number,number]> = {
    KDH:[-14,-15,.9],PNG:[-20,-3,1.35],KTN:[-3,-16,.72],TRG:[8,-7,.68],PRK:[-12,-2,1.04],PHG:[5,3,.82],
    SGR:[-13,12,1.45],KUL:[-4,3,2.3],MLK:[-3,18,1.15],JHR:[12,19,1.08],SWK:[-12,10,.82],SBH:[18,-7,.76]
  }
  return <div className="cartogram-wrap">
    <div className="chart-top"><div><Eyebrow chart="Chart 10 — Non-Contiguous Cartogram">Share of prototype national beds</Eyebrow><h3>What if land yielded to capacity?</h3></div><div className="segmented"><button className={!carto?'on':''} onClick={()=>setCarto(false)}>Geography</button><button className={carto?'on':''} onClick={()=>setCarto(true)}>Capacity</button></div></div>
    <p className="chart-context">The same state outlines separate and resize to show combined hospital capacity while preserving approximate position and shape.</p>
    <svg className={`cartogram-map ${carto?'is-capacity':''}`} viewBox="0 0 480 230" role="img" aria-label="Malaysia non-contiguous cartogram">
      {mapShapes.map(([id,points],i)=>{const [tx,ty,scale]=transforms[id];return <g key={id} className="cartogram-state" style={{transform:carto?`translate(${tx}px, ${ty}px) scale(${scale})`:'translate(0, 0) scale(1)',transitionDelay:`${i*30}ms`}}><polygon points={points}/><text x={points.split(' ').reduce((a,p)=>a+Number(p.split(',')[0]),0)/points.split(' ').length} y={points.split(' ').reduce((a,p)=>a+Number(p.split(',')[1]),0)/points.split(' ').length}>{id}</text></g>})}
    </svg>
    <div className="cartogram-legend"><i/><span>State shape · size encodes share of combined prototype bed capacity</span></div>
    <ChartNote>The cartogram preserves geography well enough to orient the reader while making capacity—not land area—the dominant measure.</ChartNote>
  </div>
}

function ConnectedDots({ selected, setSelected }: { selected:string; setSelected:(s:string)=>void }) {
  const [combined,setCombined]=useState(true)
  return <div className="dot-panel">
    <div className="chart-top"><div><Eyebrow chart="Chart 05 — Connected Dot Plot">Beds / 10,000</Eyebrow><h3>One definition, two Malaysias.</h3></div><button className={`toggle ${combined?'on':''}`} onClick={()=>setCombined(!combined)}><i/><span>{combined?'Combined':'Public only'}</span></button></div>
    <div className="axis-row"><span>0</span><span>10</span><span>20</span><span>30</span></div>
    {[...states].sort((a,b)=>b.combined-a.combined).map(s=><button title={`${s.n}: ${s.public} public, ${s.combined} combined`} key={s.short} className={`dot-row ${selected===s.short?'active':''}`} onClick={()=>setSelected(s.short)}><b>{s.short}</b><i className="connector" style={{left:`${s.public*2.45+14}%`,width:`${combined?(s.combined-s.public)*2.45:0}%`}}/><i className="dot public-dot" style={{left:`${s.public*2.45+14}%`}}/><i className="dot combined-dot" style={{left:`${(combined?s.combined:s.public)*2.45+14}%`}}/><span>{(combined?s.combined:s.public).toFixed(1)}</span></button>)}
    <div className="dot-key"><i className="public-dot"/>Public only <i className="combined-dot"/>With private</div>
    <ChartNote>Adding private beds expands capacity unevenly; the longest connectors identify the largest definitional change.</ChartNote>
  </div>
}

function BumpChart({ selected, setSelected }: { selected:string; setSelected:(s:string)=>void }) {
  const [reveal,setReveal]=useState(false)
  return <div className="bump-panel">
    <div className="chart-top"><div><Eyebrow chart="Chart 06 — Bump Chart">State ranking shift</Eyebrow><h3>Then the order rearranges.</h3></div><button className="reveal" onClick={()=>setReveal(!reveal)}>{reveal?'Reset ranks':'Reveal combined ranks'} <Arrow/></button></div>
    <svg viewBox="0 0 760 500" className={reveal?'bump revealed':'bump'}>
      <text x="66" y="32">PUBLIC ONLY</text><text x="618" y="32">WITH PRIVATE</text>
      {states.map((s,i)=>{
        const y1=55+(s.rankA-1)*29, y2=55+((reveal?s.rankB:s.rankA)-1)*29
        const active=s.short==='PNG'||s.short===selected
        return <g key={s.short} className={active?'focus':''} onClick={()=>setSelected(s.short)}><path d={`M125 ${y1} C310 ${y1}, 450 ${y2}, 630 ${y2}`}/><circle cx="125" cy={y1} r="5"/><circle cx="630" cy={y2} r="5"/><text x="111" y={y1+5} textAnchor="end">{s.rankA} {s.short}</text><text x="644" y={y2+5}>{reveal?s.rankB:s.rankA} {s.short}</text></g>
      })}
    </svg>
    <div className="rank-callout"><span>Pulau Pinang</span><b>15 <em>→</em> 4</b><p>Its prototype rank leaps when private capacity enters the frame.</p></div>
    <ChartNote>Crossing paths show that changing the definition of capacity changes the comparison—not only the total.</ChartNote>
  </div>
}

function OccupancyChart() {
  return <div className="occupancy-card">
    <div className="bed-illustration" aria-hidden="true"><div className="bed-head"/><div className="pillow"/><div className="blanket"/><div className="bed-frame"/></div>
    <div className="occupancy-chart"><Eyebrow chart="Chart 07 — Dot Plot">Reported occupancy · prototype</Eyebrow><h3>A counted bed may not be an available bed.</h3>
      <div className="occ-axis"><span>70%</span><span>80%</span><span>90%</span><i/></div>
      {[...states].sort((a,b)=>b.occupancy-a.occupancy).map(s=><div className="occ-row" title={`${s.n}: ${s.occupancy}% occupancy`} key={s.short}><b>{s.short}</b><i style={{left:`${(s.occupancy-68)*3.1}%`}}/><span>{s.occupancy}%</span></div>)}
      <div className="benchmark"><i/>National prototype benchmark · 82%</div>
      <ChartNote>States to the right of the reference line indicate greater reported pressure on recorded capacity.</ChartNote>
    </div>
  </div>
}

const providers = [
  {name:'Ministry of Health',v:2.48,color:'coral'}, {name:'Private hospitals',v:1.76,color:'gold'}, {name:'University hospitals',v:.62,color:'teal'}, {name:'Other public agencies',v:.31,color:'green'}
]

function AdmissionsBars() {
  const [share,setShare]=useState(false)
  const total=providers.reduce((a,b)=>a+b.v,0)
  return <div className="bars-card"><div className="chart-top"><div><Eyebrow chart="Chart 08 — Horizontal Bar Chart">Reported admissions · prototype</Eyebrow><h3>Follow the patients.</h3></div><div className="segmented"><button className={!share?'on':''} onClick={()=>setShare(false)}>Number</button><button className={share?'on':''} onClick={()=>setShare(true)}>Share</button></div></div>
    <div className="bar-axis"><span>0</span><span>{share?'25%':'1m'}</span><span>{share?'50%':'2m'}</span></div>
    {providers.map(p=>{const value=share?p.v/total*100:p.v; return <div className="bar-row" key={p.name}><b>{p.name}</b><div><i className={p.color} style={{width:`${share?value*1.7:value/2.7*100}%`}}/><span>{share?`${value.toFixed(0)}%`:`${p.v.toFixed(2)}m`}</span></div></div>})}
    <ChartNote>Provider ranking remains visible in both modes; switch to share to compare each group’s part of the whole.</ChartNote>
  </div>
}

function Treemap() {
  const [selected,setSelected]=useState('General medicine')
  const blocks=[['General medicine',31,'coral'],['Surgery',22,'coral'],['Maternity',15,'gold'],['Specialist care',13,'teal'],['Emergency',11,'green'],['Other prototype categories',8,'blue']]
  return <div className="treemap-card"><Eyebrow chart="Chart 12 — Treemap">Illustrative hierarchy · not official categories</Eyebrow><h3>What makes up that activity?</h3><p className="chart-context">Rectangle area represents each prototype service category’s share of admissions.</p><div className="treemap-layout"><div className="treemap">{blocks.map(([n,v,c])=><button key={n as string} onClick={()=>setSelected(n as string)} className={`${c} ${selected===n?'active':''}`} style={{flexBasis:`${Number(v)*1.6}%`}}><b>{v}%</b><span>{n}</span></button>)}</div><aside><span>Selected prototype category</span><h3>{selected}</h3><b>{blocks.find(b=>b[0]===selected)?.[1]}%</b><p>Illustrative share of reported activity. Future data may introduce different provider subcategories.</p></aside></div><ChartNote>Area—not colour—encodes share. Select any rectangle to read its category detail.</ChartNote></div>
}

function AgeBars() {
  const vals=[['2000',6.3],['2010',7.1],['2020',8.9],['2030*',12.1],['2040*',15.3]]
  return <div className="age-bars"><Eyebrow chart="Chart 09 — Bar Chart">Population aged 65+ · illustrative</Eyebrow><h3>The future arrives one cohort at a time.</h3><p className="chart-context">The older share rises across each selected period, intensifying future care demand.</p><div className="age-plot">{vals.map(([y,v],i)=><div key={y}><b>{v}%</b><i style={{height:`${Number(v)*12}px`,transitionDelay:`${i*100}ms`}}/><span>{y}</span></div>)}</div><ChartNote>* Fictional projection values for interaction design only.</ChartNote></div>
}

function Pyramid() {
  const [year,setYear]=useState<2020|2040>(2020)
  const ages=['85+','80–84','75–79','70–74','65–69','60–64','55–59','50–54','45–49','40–44','35–39','30–34','25–29','20–24','15–19','10–14','5–9','0–4']
  const young=[10,15,21,29,39,50,61,69,77,83,89,94,99,100,96,92,88,84]
  return <div className="pyramid-card"><div className="chart-top"><div><Eyebrow chart="Chart 11 — Population Pyramid">Age structure · prototype</Eyebrow><h3>A population changing shape.</h3></div><div className="year-switch"><button onClick={()=>setYear(2020)} className={year===2020?'on':''}>2020</button><button onClick={()=>setYear(2040)} className={year===2040?'on':''}>2040*</button></div></div>
    <div className="pyramid-legend"><span>Male</span><span>Age</span><span>Female</span></div>
    <div className="pyramid">{ages.map((a,i)=>{const v=year===2020?young[i]:Math.max(32,young[i]-(17-i)*2.6);return <div key={a}><i className="male" style={{width:`${v*.42}%`}}/><b>{a}</b><i className="female" style={{width:`${(v+(i<8?6:0))*.42}%`}}/></div>})}</div>
    <ChartNote>The profile broadens at older ages in the 2040 prototype, revealing the cohort shift behind the headline percentage.</ChartNote>
  </div>
}

function ProgressNav({ active }: { active:number }) {
  const acts=['National divide','Geography','Private sector','Availability','Patients','Pressure ahead']
  const [open,setOpen]=useState(false)
  return <><nav className="progress-nav" aria-label="Story chapters"><a href="#top" className="nav-mark">MH<span>+</span></a><button className="overview-toggle" aria-label="Open chapter overview" onClick={()=>setOpen(!open)}>•••</button><div className="nav-line"><i style={{height:`${active/5*100}%`}}/></div>{acts.map((a,i)=><a key={a} href={`#act-${i+1}`} className={active===i?'active':''}><b>0{i+1}</b><span>{a}</span></a>)}</nav><div className={`chapter-overview ${open?'open':''}`}><button onClick={()=>setOpen(false)}>Close</button><Eyebrow>Chapter overview</Eyebrow>{acts.map((a,i)=><a onClick={()=>setOpen(false)} key={a} href={`#act-${i+1}`}><span>0{i+1}</span><b>{a}</b></a>)}</div></>
}

function App() {
  const [selected,setSelected]=useState('PNG')
  const [active,setActive]=useState(0)
  const selectedState=useMemo(()=>states.find(s=>s.short===selected)!,[selected])
  useEffect(()=>{
    const els=[1,2,3,4,5,6].map(i=>document.getElementById(`act-${i}`))
    const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(Number(e.target.id.slice(-1))-1)}),{rootMargin:'-35% 0px -55%'})
    els.forEach(e=>e&&ob.observe(e)); return()=>ob.disconnect()
  },[])
  return <main id="top">
    <ProgressNav active={active}/>
    <header className="hero">
      <div className="hero-photo"/><div className="hero-grid"/>
      <div className="hero-copy"><Eyebrow>A visual investigation · Malaysia · Prototype 2025</Eyebrow><h1>Malaysia’s<br/><em>Hospital Divide</em></h1><p>Why public beds tell only half the story.</p><div className="hero-note"><b>12</b><span>visual clues<br/>across 6 acts</span></div></div>
      <div className="hero-bed" aria-hidden="true"><span/><i/><b/></div>
      <a className="scroll-cue" href="#act-1"><span>Begin the investigation</span><Arrow down/></a>
    </header>

    <section id="act-1" className="act act-one">
      <SectionHead act="Act I · The national divide" title="From a distance, the system appears to grow." copy="National totals create a reassuring line. Index both population and public beds to the same starting point, however, and a quieter divergence appears."/>
      <LineChart/>
      <div className="margin-note"><span>Read carefully</span><p>Prototype values demonstrate form and interaction—not historical measurements.</p></div>
    </section>

    <section id="act-2" className="act act-two">
      <SectionHead act="Act II · Geography changes everything" title="A national average has no address." copy="Capacity is experienced locally. Select a state to carry it across the map, timeline, and later comparisons."/>
      <div className="map-spread">
        <div className="map-main"><div className="chart-top"><div><Eyebrow chart="Chart 02 — Choropleth Map">Public beds per 10,000 · prototype</Eyebrow><h3>Where public capacity looks abundant—and where it thins.</h3></div><div className="selected-state"><span>Selected</span><b>{selectedState.n}</b><em>{selectedState.public} beds / 10k</em></div></div><p className="chart-context">Colour intensity encodes public bed availability relative to population.</p><MalaysiaMap selected={selected} setSelected={setSelected}/><div className="map-legend"><span>Fewer</span>{[0,1,2,3,4].map(i=><i key={i} className={`map-q${i}`}/>)}<span>More beds / 10k</span></div><p className="interaction-hint">Select any state to follow it through the story.</p><ChartNote>The map reveals local variation hidden by the national line. Hover for a precise illustrative value.</ChartNote></div>
        <Heatmap selected={selected} setSelected={setSelected}/>
      </div>
    </section>

    <section id="act-3" className="act act-three">
      <SectionHead act="Act III · The hidden private sector" title="Now reveal the beds the first map left out." copy="Private capacity does not simply add more of the same. It clusters, stretches the distance between states, and can reorder the national picture."/>
      <div className="symbol-stage"><div className="symbol-copy"><Eyebrow chart="Chart 04 — Proportional Symbol Map">Private bed count · prototype</Eyebrow><h3>The circles gather around urban centres.</h3><p>Circle area represents private beds—not a rate. Dense clusters can coincide with places already better served.</p><div className="circle-key"><i/><span>1,000</span><i/><span>4,000</span><i/><span>8,000 beds</span></div><ChartNote>Private capacity is concentrated rather than evenly distributed. Select a circle to carry that state forward.</ChartNote></div><MalaysiaMap selected={selected} setSelected={setSelected} symbols/></div>
      <div className="comparison-spread"><ConnectedDots selected={selected} setSelected={setSelected}/><BumpChart selected={selected} setSelected={setSelected}/></div>
    </section>

    <section id="act-4" className="act act-four">
      <SectionHead act="Act IV · Capacity versus availability" title="A bed can exist on paper and still be out of reach." copy="Occupancy introduces operational pressure. Physical stock, staffing, referrals, turnover, and demand all sit between a count and an available bed."/>
      <OccupancyChart/>
    </section>

    <section id="act-5" className="act act-five">
      <SectionHead act="Act V · Following the patients" title="Where does hospital activity actually happen?" copy="Counts rank provider groups. Composition reveals the nested structure underneath. These views answer different questions and should be read together."/>
      <div className="activity-spread"><AdmissionsBars/><Treemap/></div>
    </section>

    <section id="act-6" className="act act-six">
      <SectionHead act="Act VI · The pressure ahead" title="The demand story is changing shape." copy="An ageing share is a headline. The full population pyramid shows the cohorts moving underneath it—and why tomorrow’s needs cannot be inferred from today’s bed count."/>
      <div className="future-spread"><AgeBars/><Pyramid/></div>
      <Cartogram/>
    </section>

    <footer className="closing"><div className="closing-lines"/><Eyebrow>The finding is not a number</Eyebrow><h2>More beds do not necessarily mean <em>equal access, available capacity,</em> or sufficient care for the future.</h2><div className="closing-grid"><p>Bed counts are a starting point—not a verdict on access or quality. Geography, provider mix, occupancy, activity, and demography each redraw the picture.</p><div><b>Prototype note</b><span>All values in this experience are fictional and used to demonstrate visual form, interaction, and narrative behaviour.</span></div><a href="#top">Return to the beginning <Arrow/></a></div><small>Malaysia’s Hospital Divide · Editorial data prototype</small></footer>
  </main>
}

export default App
