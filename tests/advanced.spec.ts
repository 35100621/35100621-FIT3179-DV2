import {readFileSync} from 'node:fs'
import {test,expect} from '@playwright/test'
const capacity=JSON.parse(readFileSync(new URL('../data/processed/combined_capacity.json',import.meta.url),'utf8'))
const shapes=JSON.parse(readFileSync(new URL('../data/processed/capacity_cartogram.json',import.meta.url),'utf8'))
const rects=JSON.parse(readFileSync(new URL('../data/processed/admissions_treemap.json',import.meta.url),'utf8'))
const pyramid=JSON.parse(readFileSync(new URL('../data/processed/population_pyramid.json',import.meta.url),'utf8'))
test('processed quantities reconcile and treemap areas preserve admissions',()=>{
 expect(shapes).toHaveLength(16)
 expect(capacity.reduce((s,r)=>s+r.combined_beds,0)).toBe(71968)
 for(const f of shapes)expect(f.properties.combined_beds).toBe(capacity.find(r=>r.state===f.properties.state)!.combined_beds)
 expect(rects.reduce((s,r)=>s+r.admissions,0)).toBe(4270356)
 for(const r of rects)expect((r.x1-r.x0)*(r.y1-r.y0)).toBeCloseTo(r.admissions/4270356,12)
 expect(pyramid).toHaveLength(72)
})
