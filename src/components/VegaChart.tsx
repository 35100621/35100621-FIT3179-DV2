import { useEffect, useRef, useState } from 'react'
import embed, { type Result } from 'vega-embed'
import type { TopLevelSpec } from 'vega-lite'
import type { Spec } from 'vega'

type Props={id:string;label:string;spec:(width:number)=>TopLevelSpec | Spec}
export function VegaChart({id,label,spec}:Props) {
 const container=useRef<HTMLDivElement>(null)
 const target=useRef<HTMLDivElement>(null)
 const [width,setWidth]=useState(0)
 const [error,setError]=useState('')
 const [ready,setReady]=useState(false)
 useEffect(()=>{
  const el=container.current;if(!el)return
  const observer=new ResizeObserver(([entry])=>setWidth(Math.floor(entry.contentRect.width)))
  observer.observe(el);return()=>observer.disconnect()
 },[])
 useEffect(()=>{
  if(!target.current||width<100)return
  let cancelled=false;let result:Result|undefined
  const el=target.current;setError('');setReady(false)
  embed(el,spec(width),{actions:false,renderer:'svg',tooltip:{theme:'light'},defaultStyle:false}).then(r=>{
   if(cancelled){r.finalize();return}result=r;setReady(true)
  }).catch(e=>{if(!cancelled)setError(String(e))})
  return()=>{cancelled=true;result?.finalize()}
 },[width,spec])
 return <div ref={container} className="vega-frame" data-chart={id} data-ready={ready}>
  <div ref={target} role="img" aria-label={label} />
  {error&&<p className="chart-error" role="alert">This chart could not render. The validated data table below remains available. {error}</p>}
 </div>
}
