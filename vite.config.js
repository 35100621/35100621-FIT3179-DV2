import { defineConfig } from 'vite'
import { cp, rm } from 'node:fs/promises'
export default defineConfig({
  base: '/35100621-FIT3179-DV2/',
  plugins: [
    {
      name: 'publish-canonical-specs',
      async closeBundle() {
        await rm('dist/specs', { recursive: true, force: true })
        await cp('specs', 'dist/specs', { recursive: true })
      },
    },
  ],
  build: { target: 'es2022' },
})
