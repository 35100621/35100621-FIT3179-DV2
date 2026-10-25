import { test, expect } from '@playwright/test'

test('JSON and datasets load once with working publication paths', async ({
  page,
  request,
}) => {
  const downloads = new Map()
  const failures = []
  page.on('response', (response) => {
    const url = new URL(response.url())
    if (!url.pathname.includes('/data/') && !url.pathname.includes('/specs/'))
      return
    if (!response.ok()) failures.push(`${response.status()} ${url.pathname}`)
    downloads.set(url.pathname, (downloads.get(url.pathname) ?? 0) + 1)
  })
  await page.goto('./')
  await expect(page.locator('[data-ready=true]')).toHaveCount(12)
  await page.locator('#state-search').fill('Pulau Pinang')
  await expect(page.locator('[data-ready=true]')).toHaveCount(12)
  const region = page.locator('#cartogram-region')
  await region
    .getByRole('button', { name: 'East Malaysia', exact: true })
    .click()
  await expect(page.locator('[data-ready=true]')).toHaveCount(12)
  expect(failures).toEqual([])
  for (const [url, count] of downloads) expect(count, url).toBe(1)
  const manifest = await (await request.get('./specs/manifest.json')).json()
  expect(manifest).toHaveLength(12)
  for (const entry of manifest) {
    const response = await request.get(`./specs/${entry.spec}`)
    expect(response.ok()).toBeTruthy()
    expect((await response.json()).usermeta.chartId).toBe(entry.id)
  }
  const links = await page
    .locator('a[download]')
    .evaluateAll((elements) => [...new Set(elements.map((e) => e.href))])
  for (const href of links)
    expect((await request.get(href)).ok(), href).toBeTruthy()
})
