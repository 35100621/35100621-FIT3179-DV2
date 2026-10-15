import growth from '../public/data/indexed_growth.json'
import rates from '../public/data/state_rates.json'
import current from '../public/data/public_rates_2024.json'
import capacity from '../public/data/combined_capacity.json'
import occupancy from '../public/data/occupancy.json'
import admissions from '../public/data/admissions.json'
import ageing from '../public/data/ageing.json'
import summary from '../public/data/summary.json'
export { growth, rates, current, capacity, occupancy, admissions, ageing, summary }
export const states = current.map(d => d.state).sort()
export const number = (v: number) => new Intl.NumberFormat('en-MY').format(v)
export const fixed = (v: number) => v.toFixed(2)
export const source = {
 beds: 'https://data.gov.my/data-catalogue/hospital_beds',
 population: 'https://data.gov.my/data-catalogue/population_state',
 national: 'https://data.gov.my/data-catalogue/population_malaysia',
 indicators: 'https://myhdw.moh.gov.my/public/documents/20186/150318/PETUNJUK%2BKESIHATAN%2B2025/b040d29b-5bb0-49ce-8100-fdbf63f4c92d?version=1.0',
 geography: 'https://github.com/dosm-malaysia/data-open/tree/main/datasets/geodata',
}
