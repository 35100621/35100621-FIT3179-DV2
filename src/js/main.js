import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource-variable/fraunces'
import '../css/styles.css'
import { initializeCharts } from './charts.js'
import { initializeInteractions } from './interactions.js'
import { initializeMotion } from './motion.js'
import { loadStoryData } from './data.js'

initializeMotion()
try {
  const data = await loadStoryData()
  initializeInteractions(data)
  await initializeCharts()
} catch (error) {
  console.error(error)
  const message = document.createElement('p')
  message.setAttribute('role', 'alert')
  message.textContent = `The interactive charts could not load: ${error.message}. Source tables remain available below.`
  document.querySelector('main').prepend(message)
}
