import type { TopLevelSpec } from 'vega-lite'
import type { Spec } from 'vega'
import pyramid from '../../data/processed/population_pyramid.json'
import cartogram from '../../data/processed/ageing_cartogram.json'
import providers from '../../data/processed/provider_composition.json'
import { palette } from './specs'
const {navy,teal,slate,terracotta}=palette
const ageOrder=['85+','80-84','75-79','70-74','65-69','60-64','55-59','50-54','45-49','40-44','35-39','30-34','25-29','20-24','15-19','10-14','5-9','0-4']
export function populationPyramid(width:number):TopLevelSpec {
 const panelWidth=width>750?(width-110)/2:width-55
 const panels=[2015,2024].map(year=>({
  width:panelWidth,height:360,title:{text:String(year),color:'#ffffff',anchor:'start' as const,fontSize:20},
  data:{values:pyramid.filter(d=>d.year===year)},mark:{type:'bar' as const},
  encoding:{y:{field:'age',type:'ordinal' as const,sort:ageOrder,axis:{title:null,labelColor:'#d3dde4',labelFontSize:11}},
   x:{field:'signed_share',type:'quantitative' as const,scale:{domain:[-6,6]},axis:{title:'Share of total population (%)',values:[-6,-3,0,3,6],labelExpr:'abs(datum.value)',labelColor:'#d3dde4',titleColor:'#d3dde4',gridColor:'#435568'}},
   color:{field:'sex',type:'nominal' as const,scale:{domain:['male','female'],range:[slate,teal]},legend:{title:'Sex',labelColor:'#d3dde4',titleColor:'#d3dde4',orient:'top' as const}},
   tooltip:[{field:'year',type:'ordinal' as const,title:'Year'},{field:'sex',title:'Sex'},{field:'age',title:'Age group'},{field:'residents',format:',',title:'Residents'},{field:'share',format:'.2f',title:'% of total population'}]
  }
 }))
 return {$schema:'https://vega.github.io/schema/vega-lite/v6.json',background:'transparent',...(width>750?{hconcat:panels}:{vconcat:panels}),spacing:28,resolve:{scale:{color:'shared'}},config:{font:'DM Sans',view:{stroke:null},axis:{domain:false,tickColor:'#627181'}}}
}
export function ageingCartogram(width:number,selected:string,region:string):Spec {
 const rows=cartogram.states.filter(d=>region==='All Malaysia'||d.region===region)
 const left=region==='All Malaysia'?0:Math.min(...rows.map(d=>d.bounds[0]))-15
 const top=region==='All Malaysia'?0:Math.min(...rows.map(d=>d.bounds[1]))-15
 const span=region==='All Malaysia'?1000:Math.max(...rows.map(d=>d.bounds[2]))-left+15
 const mapHeight=region==='All Malaysia'?cartogram.height:Math.max(...rows.map(d=>d.bounds[3]))-top+15
 const s=width/span
 return {$schema:'https://vega.github.io/schema/vega/v6.json',width,height:mapHeight*s,padding:0,autosize:'none',background:'transparent',
 data:[{name:'states',values:rows}],
 scales:[{name:'age',type:'linear',domain:[0,10],range:['#e2eeeb',teal,navy]}],
 marks:[
 {type:'path',from:{data:'states'},encode:{update:{path:{field:'outline'},x:{value:-left*s},y:{value:-top*s},scaleX:{value:s},scaleY:{value:s},fill:{value:'transparent'},stroke:{value:'#c6cdc8'},strokeWidth:{value:.7}}}},
 {type:'path',from:{data:'states'},encode:{update:{path:{field:'path'},x:{value:-left*s},y:{value:-top*s},scaleX:{value:s},scaleY:{value:s},fill:{scale:'age',field:'older_share'},stroke:{value:'#fffefa'},strokeWidth:{value:1},opacity:{signal:selected?`datum.state === ${JSON.stringify(selected)} ? 1 : 0.25`:'1'},tooltip:{signal:"{'State / territory':datum.state,'Residents aged 65+':format(datum.older_residents,','),'Share aged 65+ (%)':format(datum.older_share,'.2f')}"}},hover:{stroke:{value:terracotta},strokeWidth:{value:2}}}},
 {type:'text',from:{data:'states'},encode:{update:{x:{signal:`(datum.x - ${left}) * ${s}`},y:{signal:`(datum.y - ${top}) * ${s}`},text:{signal:selected?`datum.state === ${JSON.stringify(selected)} ? datum.state : ''`:"indexof(['Selangor','Perak','Sabah','Sarawak'],datum.state)>=0 ? datum.state : ''"},fill:{value:'#ffffff'},stroke:{value:navy},strokeWidth:{value:.4},fontWeight:{value:'bold'},fontSize:{value:width<500?10:12},align:{value:'center'},baseline:{value:'middle'}}}}
 ]}
}
export function providerTreemap(width:number):Spec {
 const height=width<500?460:340
 const nodes=[{id:'Combined',parent:null,beds:0},{id:'Public',parent:'Combined',beds:0},{id:'Private',parent:'Combined',beds:0},...providers.map(d=>({id:d.category,parent:d.sector,beds:d.beds,share:d.share}))]
 return {$schema:'https://vega.github.io/schema/vega/v6.json',width,height,padding:0,autosize:'none',background:'transparent',
 data:[{name:'tree',values:nodes,transform:[{type:'stratify',key:'id',parentKey:'parent'},{type:'treemap',field:'beds',sort:{field:'value',order:'descending'},method:'binary',size:[width,height],paddingInner:4,paddingOuter:4,paddingTop:24}]},{name:'leaves',source:'tree',transform:[{type:'filter',expr:'datum.beds > 0'}]},{name:'groups',source:'tree',transform:[{type:'filter',expr:"datum.id === 'Public' || datum.id === 'Private'"}]}],
 scales:[{name:'sector',type:'ordinal',domain:providers.map(d=>d.category),range:[navy,teal,slate,terracotta]}],
 marks:[{type:'rect',from:{data:'leaves'},encode:{update:{x:{field:'x0'},y:{field:'y0'},x2:{field:'x1'},y2:{field:'y1'},fill:{scale:'sector',field:'id'},tooltip:{signal:"{'Provider':datum.id,'Beds':format(datum.beds,','),'Share of combined (%)':format(datum.share,'.2f')}"}},hover:{stroke:{value:'#172b42'},strokeWidth:{value:3}}}},
 {type:'text',from:{data:'groups'},encode:{update:{x:{signal:'datum.x0+5'},y:{signal:'datum.y0+15'},text:{field:'id'},fill:{value:navy},fontSize:{value:13},fontWeight:{value:'bold'}}}},
 {type:'text',from:{data:'leaves'},encode:{update:{x:{signal:'datum.x0+10'},y:{signal:'datum.y0+24'},text:{signal:width<500?"datum.id === 'MOH hospitals' ? 'MOH hospitals' : datum.id === 'Licensed private hospitals' ? 'Private hospitals' : ''":"datum.id === 'MOH special institutions' ? 'MOH special inst.' : datum.id === 'Other government hospitals' ? 'Other government' : datum.id"},limit:{signal:'max(0, datum.x1-datum.x0-20)'},fill:{value:'#ffffff'},fontSize:{value:12}}}},
 {type:'text',from:{data:'leaves'},encode:{update:{x:{signal:'datum.x0+6'},y:{signal:'datum.y0+47'},text:{signal:"format(datum.beds,',')"},limit:{signal:'max(0, datum.x1-datum.x0-12)'},fill:{value:'#ffffff'},fontSize:{value:width<500?13:22}}}}
 ]}
}
