import { useEffect, useRef, useState } from 'react'
import embed, { type Result } from 'vega-embed'
import type { TopLevelSpec } from 'vega-lite'
import { prepareChartSpec } from '../charts/presentation'

type Props = {
  id: string
  label: string
  spec: (width: number) => TopLevelSpec
}
export function VegaChart({ id, label, spec }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const el = container.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width)),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!target.current || width < 100) return
    let cancelled = false
    let result: Result | undefined
    const el = target.current
    setError('')
    setReady(false)
    const mount = document.createElement('div')
    Object.assign(mount.style, {
      position: 'absolute',
      visibility: 'hidden',
      width: '100%',
    })
    el.appendChild(mount)
    const themed = prepareChartSpec(id, spec(width))
    embed(mount, themed, {
      actions: false,
      renderer: 'svg',
      tooltip: { theme: 'light' },
      defaultStyle: false,
    })
      .then((r) => {
        if (cancelled) {
          r.finalize()
          mount.remove()
          return
        }
        Object.assign(mount.style, {
          position: 'relative',
          visibility: 'visible',
        })
        el.replaceChildren(mount)
        result = r
        r.view.addEventListener('click', (_event, item) => {
          const datum = item?.datum
          const state =
            datum?.state ??
            datum?.properties?.state ??
            datum?.items?.[0]?.datum?.state
          if (typeof state === 'string')
            window.dispatchEvent(
              new CustomEvent('chart-state', { detail: state }),
            )
        })
        const stateOf = (item: unknown): string => {
          const d = (
            item as {
              datum?: {
                state?: string
                properties?: { state?: string }
                items?: { datum?: { state?: string } }[]
              }
            }
          )?.datum
          return (
            d?.state ??
            d?.properties?.state ??
            d?.items?.[0]?.datum?.state ??
            ''
          )
        }
        r.view.addEventListener('pointerover', (_e, item) => {
          r.view.signal('hoveredState', stateOf(item)).runAsync()
        })
        r.view.addEventListener('pointerout', () => {
          r.view.signal('hoveredState', '').runAsync()
        })
        setReady(true)
      })
      .catch((e) => {
        if (!cancelled) setError(String(e))
      })
    return () => {
      cancelled = true
      result?.finalize()
      if (!result) mount.remove()
    }
  }, [width, spec])
  return (
    <div
      ref={container}
      className="vega-frame"
      role="img"
      aria-label={label}
      data-chart={id}
      data-ready={ready}
    >
      <div ref={target} style={{ position: 'relative' }} />
      {!ready && !error && (
        <p className="chart-loading" role="status">
          Loading chart…
        </p>
      )}
      {error && (
        <p className="chart-error" role="alert">
          This chart could not render. The validated data table below remains
          available. {error}
        </p>
      )}
    </div>
  )
}
