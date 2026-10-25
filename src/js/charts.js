import embed from 'vega-embed'
import { loader } from 'vega'
import { loadJSON, loadText } from './data.js'
import { state, subscribe, selectState } from './state.js'

// Generic host adaptation. The patches themselves are declarative JSON metadata,
// because Vega-Lite cannot express every axis/legend/height setting as a signal.
export function prepareSpec(original, width, values = {}) {
  const spec = structuredClone(original)
  spec.width = width
  for (const rule of spec.usermeta?.responsive ?? []) {
    if (width > rule.maxWidth) continue
    for (const [path, value] of Object.entries(rule.set)) {
      const parts = path
        .slice(1)
        .split('/')
        .map((part) => part.replaceAll('~1', '/').replaceAll('~0', '~'))
      const key = parts.pop()
      const target = parts.reduce((node, part) => node[part], spec)
      target[key] = structuredClone(value)
    }
  }
  for (const rule of spec.usermeta?.parameterPatches ?? []) {
    if (values[rule.parameter] !== rule.equals) continue
    for (const [path, value] of Object.entries(rule.set)) {
      const parts = path.slice(1).split('/')
      const key = parts.pop()
      parts.reduce((node, part) => node[part], spec)[key] =
        structuredClone(value)
    }
  }
  for (const param of spec.params ?? []) {
    if (Object.hasOwn(values, param.name)) param.value = values[param.name]
    if (param.name === 'containerWidth') param.value = width
  }
  return spec
}

export async function initializeCharts() {
  // Measure SVG labels with the actual chart fonts, not a temporary fallback.
  // A failed external font still leaves the declared fallback usable.
  await Promise.allSettled([
    document.fonts.load('12px "DM Sans"'),
    document.fonts.load('12px "Manrope"'),
  ])
  const manifest = await loadJSON('./specs/manifest.json')
  const controllers = new Map()
  for (const entry of manifest) {
    const frame = document.querySelector(`[data-chart="${entry.id}"]`)
    if (!frame) throw new Error(`Missing chart container: ${entry.id}`)
    const url = new URL(`./specs/${entry.spec}`, document.baseURI)
    const original = await loadJSON(url)
    const chartLoader = loader({ baseURL: url.href })
    chartLoader.load = (uri) => loadText(new URL(uri, url).href)
    let width = 0,
      generation = 0,
      currentView
    const target = frame.firstElementChild
    const loading = frame.querySelector('.chart-loading')
    const stateOf = (item) =>
      item?.datum?.state ??
      item?.datum?.properties?.state ??
      item?.datum?.items?.[0]?.datum?.state ??
      ''
    const render = async () => {
      if (width < 100) return
      const token = ++generation
      frame.dataset.ready = 'false'
      const mount = document.createElement('div')
      Object.assign(mount.style, {
        position: 'absolute',
        visibility: 'hidden',
        width: '100%',
      })
      target.append(mount)
      try {
        const spec = prepareSpec(original, width, {
          ...state.charts[entry.id],
          selectedState: state.selectedState,
        })
        const result = await embed(mount, spec, {
          actions: false,
          renderer: 'svg',
          tooltip: { theme: 'light' },
          defaultStyle: false,
          loader: chartLoader,
        })
        if (token !== generation) {
          result.finalize()
          mount.remove()
          return
        }
        currentView?.finalize()
        currentView = result
        Object.assign(mount.style, {
          position: 'relative',
          visibility: 'visible',
        })
        target.replaceChildren(mount)
        result.view.addEventListener('click', (_event, item) => {
          const selected = stateOf(item)
          if (selected) selectState(selected)
        })
        result.view.addEventListener('pointerover', (_event, item) =>
          result.view.signal('hoveredState', stateOf(item)).runAsync(),
        )
        result.view.addEventListener('pointerout', () =>
          result.view.signal('hoveredState', '').runAsync(),
        )
        loading?.remove()
        frame.querySelector('.chart-error')?.remove()
        frame.dataset.ready = 'true'
      } catch (error) {
        mount.remove()
        if (token !== generation) return
        loading?.remove()
        const message = document.createElement('p')
        message.className = 'chart-error'
        message.setAttribute('role', 'alert')
        message.textContent = `This chart could not render. The validated data table below remains available. ${error}`
        frame.append(message)
        console.error(error)
      }
    }
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.floor(entry.contentRect.width)
      if (next !== width) {
        width = next
        void render()
      }
    })
    observer.observe(frame)
    controllers.set(entry.id, { render, original })
  }
  subscribe((change) => {
    for (const [id, controller] of controllers) {
      // Only coordinated state views re-render for shared selection.
      const linked = [
        'choropleth',
        'heatmap',
        'private-symbols',
        'connected',
        'rank-slope',
        'occupancy',
        'capacity-cartogram',
      ].includes(id)
      if (change.id === id || (change.selected && linked))
        void controller.render()
    }
  })
}
