import { chromium } from '@playwright/test';
const browser=await chromium.launch();
for (const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});const messages=[];
 page.on('pageerror',e=>messages.push(String(e)));page.on('console',m=>{if(['error','warning'].includes(m.type()))messages.push(m.type()+': '+m.text())});
 await page.goto('http://127.0.0.1:5173/35100621-FIT3179-DV2//');await page.locator('[data-ready="true"]').nth(6).waitFor({timeout:30000});await page.evaluate(()=>document.fonts.ready);
 console.log(name,JSON.stringify({messages,charts:await page.locator('[data-chart]').count(),width:await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}))}));
 await page.screenshot({path:`test-results/${name}-full.png`,fullPage:true});
 for(const selector of ['.reveal-chart','.map-chart','.occupancy-chart','.admissions-chart','.age-visual'])await page.locator(selector).screenshot({path:`test-results/${name}-${selector.slice(1)}.png`});
 console.log(name,'svg sizes',await page.locator('[data-chart] svg').evaluateAll(es=>es.map(e=>({id:e.closest('[data-chart]').dataset.chart,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height,marks:e.querySelectorAll('[role="graphics-symbol"]').length}))));await page.close();
}
await browser.close();
