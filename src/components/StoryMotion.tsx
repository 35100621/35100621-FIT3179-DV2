import { useEffect, useRef, useState } from 'react'

/** Keep content visible by default; motion is progressive and runs only once. */
export function useStoryReveals() {
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        if (!preference.matches) entry.target.classList.add('story-entered')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.section-title, .editorial-aside, .pinang-callout, .age-visual, .capacity-pair').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function CountUp({ value, decimals = 2, prefix = '', suffix = '' }: {value:number; decimals?:number; prefix?:string; suffix?:string}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const format = (n:number) => n.toLocaleString('en-MY', {minimumFractionDigits:decimals, maximumFractionDigits:decimals})
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const finish = () => { cancelAnimationFrame(frame); setDisplay(value) }
    preference.addEventListener('change', finish)
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return
      observer.disconnect()
      if (preference.matches) return
      const start = performance.now()
      const tick = (now:number) => {
        const progress = Math.min((now-start)/850, 1)
        setDisplay(value*(1-Math.pow(1-progress, 3)))
        if (progress<1) frame=requestAnimationFrame(tick)
      }
      frame=requestAnimationFrame(tick)
    })
    if (ref.current) observer.observe(ref.current)
    return () => { observer.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener('change', finish) }
  }, [value])
  return <span ref={ref} className="count-up" aria-label={`${prefix}${format(value)}${suffix}`}><span aria-hidden="true">{prefix}{format(display)}{suffix}</span></span>
}

export function HospitalMotif() {
  return <svg className="hospital-motif" viewBox="0 0 280 220" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M20 202h240M48 202V90h62M170 90h62v112M95 202V38h90v164M124 202v-40h32v40"/>
    <path d="M133 57h14v13h13v14h-13v13h-14V84h-13V70h13z" className="motif-cross"/>
    <path d="M112 117h16m24 0h16m-56 20h16m24 0h16M64 112h15m-15 23h15m-15 23h15m-15 23h15m122-69h15m-15 23h15m-15 23h15m-15 23h15"/>
  </svg>
}
