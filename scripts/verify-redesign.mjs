import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
const browser = await chromium.launch()
await mkdir('test-results/redesign', { recursive: true })
const results = []
for (const width of [1440, 768, 390, 320]) {
 const page = await browser.newPage({viewport:{width,height:1000}, reducedMotion:'reduce'})
 await page.goto(process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5187/35100621-FIT3179-DV2/')
 await page.waitForFunction(()=>document.querySelectorAll('[data-ready=true]').length===9)
 await page.evaluate(()=>document.fonts.ready)
 const metrics = await page.evaluate(()=>({
  width:innerWidth, scroll:document.documentElement.scrollWidth,
  counts:[...document.querySelectorAll('.hero-stats strong')].map(el=>el.textContent),
  animations:[...document.querySelectorAll('.story-entered')].map(el=>getComputedStyle(el).animationName),
  charts:[...document.querySelectorAll('[data-chart]')].map(el=>({id:el.dataset.chart,width:el.getBoundingClientRect().width, svg:el.querySelector('svg').getBoundingClientRect().width}))
 }))
 if(metrics.scroll>width || metrics.charts.some(c=>c.svg>c.width+1)) throw Error(JSON.stringify(metrics))
 if(metrics.counts.join('|')!=='+15.44%|+9.19%|27.68%') throw Error('Wrong final stats')
 await page.locator('#private-map-region').selectOption('East Malaysia')
 await page.waitForFunction(()=>document.querySelectorAll('[data-chart="private-symbols"] .mark-shape path').length===3)
 await page.locator('#private-map-region').selectOption('All Malaysia')
 for(const [name,selector] of [['hero','.hero'],['regional','.map-editorial'],['ranking','.ranking-editorial'],['ageing','.age-visual']]) {
  await page.locator(selector).screenshot({path:`test-results/redesign/${width}-${name}.png`})
 }
 results.push(metrics)
 await page.close()
}
await writeFile('reports/task05/browser-validation.json',JSON.stringify(results,null,2)+'\n')
await browser.close()
console.log('All nine charts fit at desktop, tablet and mobile widths; reduced-motion statistics and private-map controls pass.')
