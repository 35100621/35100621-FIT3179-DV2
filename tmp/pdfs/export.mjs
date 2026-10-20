import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await page.emulateMedia({media:'screen',reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:5173/35100621-FIT3179-DV2/',{waitUntil:'networkidle'});
await page.waitForFunction(()=>document.querySelectorAll('[data-ready="true"]').length===12);
await page.evaluate(()=>document.fonts.ready);
// Freeze viewport-dependent geometry before the very tall PDF media box is applied.
await page.evaluate(()=>{
 for(const el of document.querySelectorAll('*')){
  const style=getComputedStyle(el);
  if(style.position==='fixed'){
   const box=el.getBoundingClientRect();
   Object.assign(el.style,{position:'absolute',top:`${box.top+scrollY}px`,left:`${box.left}px`,bottom:'auto',right:'auto',width:`${box.width}px`,height:`${box.height}px`});
  }
  if(style.position==='sticky')el.style.position='relative';
 }
 for(const el of document.querySelectorAll('.hero,.hero-copy,.closing')){
  const s=getComputedStyle(el);el.style.height=s.height;el.style.minHeight=s.height;el.style.marginTop=s.marginTop;
 }
});
await page.addStyleTag({content:'*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;animation:none!important;transition:none!important}html{scroll-behavior:auto!important}'});
const size=await page.evaluate(()=>({width:innerWidth,height:document.documentElement.scrollHeight}));
await page.pdf({path:'output/pdf/Malaysias-Hospital-Divide-full-page.pdf',width:`${size.width}px`,height:`${size.height}px`,printBackground:true,margin:{top:0,right:0,bottom:0,left:0},scale:1,displayHeaderFooter:false});
await page.screenshot({path:'tmp/pdfs/source.png',fullPage:true});
console.log(JSON.stringify(size));await browser.close();
