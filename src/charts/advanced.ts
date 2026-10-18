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
export function capacityCartogram(width:number,selected:string,mode:string,region='All Malaysia',outlines=true):TopLevelSpec {
 const east=['Sabah','Sarawak','W.P. Labuan']
 const visible=(d:typeof cartogram[number])=>region==='All Malaysia'||(region==='East Malaysia'?east.includes(d.properties.state):!east.includes(d.properties.state))
 const original=geography.filter(visible), resized=cartogram.filter(visible)
 const active=`datum.properties.state === hoveredState || datum.properties.state === ${JSON.stringify(selected)}`
 const tooltip=[{field:'properties.state',title:'State / territory'},{field:'properties.combined_beds',title:'Combined beds',format:','},{field:'properties.combined_rate',title:'Beds / 10,000',format:'.2f'}]
 return {...base(width),height:width<500?300:460,projection:{type:'identity',reflectY:false},layer:[
 // Invisible anchor layer keeps projection fitting identical in both modes and with outlines off.
 {data:{values:[...original,...resized]},mark:{type:'geoshape',opacity:0}},
 ...(mode==='Capacity'&&outlines?[{name:'original_footprints',data:{values:original},mark:{type:'geoshape' as const,fill:null,strokeDash:[4,3]},encoding:{stroke:{condition:{test:active,value:'#f36c4f'},value:'#8aa5a0'},strokeWidth:{condition:{test:active,value:2.8},value:1},opacity:{value:.9},tooltip}}]:[]),
 {name:'capacity_shapes',data:{values:mode==='Capacity'?resized:original},mark:{type:'geoshape',stroke:'#f2eee3',strokeWidth:.7},encoding:{
 color:{field:'properties.combined_rate',type:'quantitative',scale:{domain:[10,75],range:['#9fc6ae','#247c7a','#123e48']},legend:{title:'Combined beds / 10,000',orient:'bottom',gradientLength:160}},
 stroke:{condition:{test:active,value:'#f36c4f'},value:'#f2eee3'},strokeWidth:{condition:{test:active,value:3},value:.7},
 opacity:{condition:{test:active,value:1},value:selected?.length?0.65:1},tooltip}},
 // Highlight original footprint above opaque fills so a selected outline remains discoverable.
 ...(mode==='Capacity'&&outlines?[{name:'linked_footprints',data:{values:original},transform:[{filter:active}],mark:{type:'geoshape' as const,fill:null,stroke:'#f36c4f',strokeWidth:2.5,strokeDash:[4,3]},encoding:{tooltip}}]:[])
 ]}
}
export function providerTreemap(width:number):TopLevelSpec {
 const rows=admissions.map(d=>({...d,labelY:d.cy,labelOffset:((d.x1-d.x0)*width<145||((d.y1-d.y0)*420)<50)?0:10,percentage: `${d.share.toFixed(1)}%`,short:((d.x1-d.x0)*width<145||((d.y1-d.y0)*420)<50)?'':d.provider==='Private-sector providers'?'Private providers':d.provider==='Other government hospitals'?'Other government':d.provider==='MOH special institutions'?'MOH special inst.':d.provider}))
 return {...base(width),height:420,data:{values:rows},encoding:{tooltip:[{field:'provider',title:'Provider'},{field:'admissions',format:',',title:'Reported admissions'},{field:'share',format:'.2f',title:'Share (%)'},{field:'coverage',title:'Coverage'}]},layer:[
 {mark:{type:'rect',stroke:'#07171d',strokeWidth:3},encoding:{x:{field:'x0',type:'quantitative',scale:{domain:[0,1]},axis:null},x2:{field:'x1'},y:{field:'y0',type:'quantitative',scale:{domain:[1,0]},axis:null},y2:{field:'y1'},color:{field:'provider',type:'nominal',scale:{domain:admissions.map(d=>d.provider),range:colors},legend:null}}},
 {mark:{type:'text',align:'center',baseline:'middle',fontSize:width<400?10:12,dy:-13,color:'#07171d',fontWeight:600},encoding:{x:{field:'cx',type:'quantitative'},y:{field:'cy',type:'quantitative'},text:{field:'short'}}},
 {mark:{type:'text',align:'center',baseline:'middle',fontSize:width<400?15:22,fontWeight:600,color:'#07171d'},encoding:{x:{field:'cx',type:'quantitative'},y:{field:'cy',type:'quantitative'},text:{field:'percentage'},yOffset:{field:'labelOffset',type:'quantitative',scale:null}}}
 ]}
}
