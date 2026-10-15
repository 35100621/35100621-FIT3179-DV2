import {chromium} from '@playwright/test';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.goto('http://127.0.0.1:5173/35100621-FIT3179-DV2/');await p.locator('[data-ready=true]').nth(6).waitFor();await p.evaluate(()=>document.fonts.ready);
console.log('skip',await p.locator('.skip-link').evaluate(e=>({active:document.activeElement===e,transform:getComputedStyle(e).transform,rect:e.getBoundingClientRect().toJSON()})));
console.log('marks',await p.locator('[data-chart=connected] .mark-symbol path').first().getAttribute('aria-label'));
for(const [n,sel] of [['hero','.hero'],['indexed','.indexed-chart'],['heatmap','.heatmap-chart'],['admissions','.admissions-chart']])await p.locator(sel).screenshot({path:`test-results/mobile-${n}.png`});
console.log('skipAfter',await p.locator('.skip-link').evaluate(e=>({active:document.activeElement===e,transform:getComputedStyle(e).transform,rect:e.getBoundingClientRect().toJSON()})));
await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:'test-results/desktop-hero.png'});await b.close();
