import { useCallback, useState } from 'react'
import { VegaChart } from './VegaChart'
import { ageingCartogram, populationPyramid, providerTreemap } from '../charts/advanced'
import { source, fixed, number } from '../data'
import ageingStates from '../../data/processed/ageing_states.json'
import providers from '../../data/processed/provider_composition.json'
import pyramid from '../../data/processed/population_pyramid.json'

function Download({file}:{file:string}) {return <a href={`${import.meta.env.BASE_URL}data/${file}.csv`} download>Download chart data (CSV)</a>}
export function AgeingCartogram() {
 const [selected,setSelected]=useState('')
 const [region,setRegion]=useState('All Malaysia')
 const spec=useCallback((width:number)=>ageingCartogram(width,selected,region),[selected,region])
 const row=ageingStates.find(d=>d.state===selected)
 return <article className="chart demographic-map">
  <div className="chart-meta"><div><h3>The largest older population is not the oldest state</h3><p>Non-contiguous cartogram · residents aged 65+ · 2024</p></div></div>
  <div className="chart-controls"><label htmlFor="age-map-state">Highlight a state / territory<select id="age-map-state" value={selected} onChange={e=>setSelected(e.target.value)}><option value="">All 16 states & territories</option>{ageingStates.map(d=><option key={d.state}>{d.state}</option>)}</select></label><label htmlFor="age-map-region">Map view<select id="age-map-region" value={region} onChange={e=>setRegion(e.target.value)}>{['All Malaysia','Peninsular','East Malaysia'].map(r=><option key={r}>{r}</option>)}</select></label></div>
  <p className="chart-hint"><strong>Shape area = number of residents aged 65+.</strong> Colour = their share of the state population. Shapes are rescaled and separated; faint outlines retain the geographic reference. Positions and distances are not geographic measurements. Regional views refit the same shapes; compare area within a view.</p>
  <VegaChart id="ageing-cartogram" label="Non-contiguous state cartogram: area proportional to older residents and colour showing older-age population share" spec={spec}/>
  <div className="cartogram-legend"><span>Share aged 65+</span><i/><div><span>0%</span><span>5%</span><span>10%</span></div></div>
  <p className="state-readout" aria-live="polite">{row?<>{row.state}: <strong>{number(row.older_residents)}</strong> residents aged 65+ · <strong>{fixed(row.older_share)}%</strong> of its population</>:<>Selangor: <strong>592,800</strong> older residents · Perak: <strong>9.91%</strong> aged 65+</>}</p>
  <p className="chart-note">Selangor has the largest older population, while Perak has the highest older-age share. These describe different dimensions of ageing; neither measures hospital demand or access. Use the selector or table for small territories.</p>
  <p className="source">Sources: <a href={source.population}>DOSM state population</a>, both sexes, overall ethnicity, ages 65–69 through 85+; <a href={source.geography}>DOSM state boundaries</a>, existing validated geometry with the documented Sarawak repair. Boundary vintage remains undocumented. Uniform scaling uses equal-area projected polygons; translation avoids overlap. State estimates sum to 2,609,200 older residents, 200 more than the separately published national estimate due to source rounding.</p>
  <details className="data-table"><summary>Read the data table / download CSV</summary><div className="table-scroll" tabIndex={0} role="region" aria-label="Older population by state"><table><thead><tr><th scope="col">State</th><th scope="col">Residents aged 65+</th><th scope="col">Share (%)</th></tr></thead><tbody>{ageingStates.map(d=><tr key={d.state}><td>{d.state}</td><td>{number(d.older_residents)}</td><td>{fixed(d.older_share)}</td></tr>)}</tbody></table></div><Download file="ageing_states"/></details>
 </article>
}
export function PopulationPyramid() {return <article className="pyramid-section">
 <div className="chart-meta"><div><h3>A changing shape, beyond the 65+ headline</h3><p>Age and sex · 2015 versus 2024 · common scales</p></div></div>
 <p className="chart-hint">Male residents extend left; female residents extend right. Each bar is a share of that year’s total national population, including both sexes. The two years are cross-sections, not tracked cohorts.</p>
 <VegaChart id="population-pyramid" label="Population pyramids for 2015 and 2024 with 18 age groups and two sexes, shares of national population" spec={populationPyramid}/>
 <p className="chart-note">The share aged 0–14 fell from <strong>24.93% to 22.17%</strong>, while the share aged 65+ increased. The full distribution shows how age structure changed beyond a single threshold; it does not predict admissions.</p>
 <p className="source">Source: <a href={source.national}>DOSM national population estimates</a>, overall ethnicity, male/female, 18 matching age bands; 85+ is open-ended. Population in thousands is converted to residents. Published rounded age/sex bins are retained: bin sums differ from sex totals by −100 to +300 residents. Shares use each year’s published both-sexes total, without forcing reconciliation.</p>
 <details className="data-table"><summary>Read the data table / download CSV</summary><div className="table-scroll" tabIndex={0} role="region" aria-label="Population by year age and sex"><table><thead><tr>{['Year','Sex','Age','Residents','Share (%)'].map(x=><th key={x} scope="col">{x}</th>)}</tr></thead><tbody>{pyramid.map(d=><tr key={`${d.year}-${d.sex}-${d.age}`}><td>{d.year}</td><td>{d.sex}</td><td>{d.age}</td><td>{number(d.residents)}</td><td>{fixed(d.share)}</td></tr>)}</tbody></table></div><Download file="population_pyramid"/></details>
 </article>}
export function ProviderTreemap(){return <article className="chart provider-treemap">
 <div className="chart-meta"><div><h3>What sits inside the bed count?</h3><p>Composition of 71,968 recorded public and licensed private beds · 2024</p></div></div>
 <p className="chart-hint">Rectangle area represents beds. Public capacity contains three provider categories; private capacity here includes licensed hospitals only.</p>
 <VegaChart id="provider-treemap" label="Treemap of combined hospital beds grouped into public and private capacity, with four provider categories" spec={providerTreemap}/>
 <ul className="provider-key">{providers.map((d,i)=><li key={d.category}><i style={{background:['#172B42','#527F78','#7D90AE','#D77750'][i]}}/><span>{d.category}</span><b>{number(d.beds)} · {fixed(d.share)}%</b></li>)}</ul>
 <p className="chart-note"><strong>5,646 beds are in MOH special institutions: 10.85% of public capacity.</strong> The public total includes institutions with different care roles; it is not a count of interchangeable general hospital beds.</p>
 <p className="source">Source: <a href={source.indicators}>MOH Health Indicators 2025</a>, tables 4.1 and 4.4 (2024 observations). Four mutually exclusive components sum to 71,968 beds. Public official beds and private licensed beds have different operational definitions. Private maternity homes, nursing homes, hospices and ambulatory centres are excluded. This composition does not measure staffing, availability or affordability.</p>
 <details className="data-table"><summary>Read the data table / download CSV</summary><div className="table-scroll" tabIndex={0} role="region" aria-label="Provider bed composition"><table><thead><tr><th scope="col">Provider</th><th scope="col">Sector</th><th scope="col">Beds</th><th scope="col">Share (%)</th></tr></thead><tbody>{providers.map(d=><tr key={d.category}><td>{d.category}</td><td>{d.sector}</td><td>{number(d.beds)}</td><td>{fixed(d.share)}</td></tr>)}</tbody></table></div><Download file="provider_composition"/></details>
 </article>}
