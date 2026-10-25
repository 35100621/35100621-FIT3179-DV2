// UI state only. Parameter defaults and chart behaviour live in the JSON specs.
const listeners = new Set()
export const state = { selectedState: '', charts: {} }
export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
export function selectState(value) {
  if (state.selectedState === value) return
  state.selectedState = value
  listeners.forEach((listener) => listener({ selected: true }))
}
export function setChartState(id, patch) {
  state.charts[id] = { ...state.charts[id], ...patch }
  listeners.forEach((listener) => listener({ id }))
}
export function resetSelection() {
  state.selectedState = ''
  for (const id of ['choropleth', 'private-symbols', 'capacity-cartogram']) {
    state.charts[id] = { ...state.charts[id], region: 'All Malaysia' }
  }
  listeners.forEach((listener) => listener({ reset: true, selected: true }))
}
