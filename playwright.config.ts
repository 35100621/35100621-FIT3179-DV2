import { defineConfig } from '@playwright/test'
export default defineConfig({
 testDir:'tests',timeout:45000,fullyParallel:false,workers:1,
 reporter:[['list'],['json',{outputFile:'test-results/results.json'}]],
 use:{baseURL:'http://127.0.0.1:5174/35100621-FIT3179-DV2/',screenshot:'only-on-failure'},
 webServer:{command:'npm run preview -- --port 5174 --strictPort',url:'http://127.0.0.1:5174/35100621-FIT3179-DV2/',reuseExistingServer:false},
 projects:[{name:'desktop',use:{viewport:{width:1440,height:1000}}},{name:'mobile',use:{viewport:{width:390,height:844}}},{name:'narrow-mobile',use:{viewport:{width:320,height:740}}}]
})
