import type { TopLevelSpec } from 'vega-lite'
import pyramid from '../../data/processed/population_pyramid.json'
import cartogram from '../../data/processed/capacity_cartogram.json'
import geography from '../../data/processed/capacity_geography.json'
import admissions from '../../data/processed/admissions_treemap.json'
const colors=['#f36c4f','#e8b44e','#4b8294','#9fc6ae']
const base=(width:number)=>({$schema:'https://vega.github.io/schema/vega-lite/v6.json',width,background:'transparent',autosize:{type:'fit' as const,contains:'padding' as const},config:{font:'Manrope',view:{stroke:null},axis:{domain:false,labelColor:'#c6d5d2',titleColor:'#c6d5d2',gridColor:'#3b5155'},legend:{labelColor:'#c6d5d2',titleColor:'#c6d5d2'}}})
export function populationPyramid(width:number,year=2024):TopLevelSpec {
 return {...base(width),height:450,data:{values:pyramid.filter(d=>d.year===year)},mark:{type:'bar'},encoding:{
 y:{field:'age',type:'ordinal',sort:['85+','80-84','75-79','70-74','65-69','60-64','55-59','50-54','45-49','40-44','35-39','30-34','25-29','20-24','15-19','10-14','5-9','0-4'],axis:{title:null}},
 x:{field:'signed_share',type:'quantitative',scale:{domain:[-6,6]},axis:{title:'Share of total population (%)',values:[-6,-3,0,3,6],labelExpr:'abs(datum.value)'}},
 color:{field:'sex',type:'nominal',scale:{domain:['male','female'],range:['#4b8294','#f36c4f']},legend:{title:null,orient:'top'}},
 tooltip:[{field:'year',type:'ordinal'},{field:'sex'},{field:'age'},{field:'residents',format:','},{field:'share',format:'.2f',title:'% of total population'}]}}
}
export function capacityCartogram(width:number,selected:string,mode:string):TopLevelSpec {
 return {...base(width),height:width<500?290:460,data:{values:mode==='Capacity'?cartogram:geography},projection:{type:'identity',reflectY:false},mark:{type:'geoshape',stroke:'#f2eee3',strokeWidth:.7},encoding:{
 color:{field:'properties.combined_rate',type:'quantitative',scale:{domain:[10,75],range:['#9fc6ae','#247c7a','#123e48']},legend:{title:'Combined beds / 10,000',orient:'bottom',gradientLength:160}},
 opacity:selected?{condition:{test:`datum.properties.state === ${JSON.stringify(selected)}`,value:1},value:.25}:{value:1},
 tooltip:[{field:'properties.state',title:'State / territory'},{field:'properties.combined_beds',title:'Combined beds',format:','},{field:'properties.combined_rate',title:'Beds / 10,000',format:'.2f'}]}}
}
export function providerTreemap(width:number):TopLevelSpec {
 const rows=admissions.map(d=>({...d,short:width<650&&d.admissions<200000?'':d.provider==='Private-sector providers'?'Private providers':d.provider==='Other government hospitals'?'Other government':d.provider==='MOH special institutions'?'MOH special inst.':d.provider}))
 return {...base(width),height:420,data:{values:rows},encoding:{tooltip:[{field:'provider',title:'Provider'},{field:'admissions',format:',',title:'Reported admissions'},{field:'share',format:'.2f',title:'Share (%)'},{field:'coverage',title:'Coverage'}]},layer:[
 {mark:{type:'rect',stroke:'#07171d',strokeWidth:3},encoding:{x:{field:'x0',type:'quantitative',scale:{domain:[0,1]},axis:null},x2:{field:'x1'},y:{field:'y0',type:'quantitative',scale:{domain:[1,0]},axis:null},y2:{field:'y1'},color:{field:'provider',type:'nominal',scale:{domain:admissions.map(d=>d.provider),range:colors},legend:null}}},
 {mark:{type:'text',fontSize:width<400?10:12,dy:-8,color:'#07171d',fontWeight:600},encoding:{x:{field:'cx',type:'quantitative'},y:{field:'cy',type:'quantitative'},text:{field:'short'}}},
 {mark:{type:'text',fontSize:width<400?15:22,dy:15,color:'#07171d'},encoding:{x:{field:'cx',type:'quantitative'},y:{field:'cy',type:'quantitative'},text:{field:'share',format:'.1f'}}}
 ]}
}
