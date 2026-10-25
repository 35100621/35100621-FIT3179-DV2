import { test, expect } from '@playwright/test'
test('twelve charts, exact values, interactions and responsive production page', async ({
  page,
}, testInfo) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => {
    if (['error', 'warning'].includes(m.type())) errors.push(m.text())
  })
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`)
  })
  await page.goto('./')
  await expect(page.locator('[data-ready=true]')).toHaveCount(12)
  await page.evaluate(() => document.fonts.ready)
  await page.keyboard.press('Tab')
  await expect(page.locator('.skip-link')).toBeFocused()
  await expect(page.locator('.skip-link')).toHaveCSS('opacity', '1')
  await page.keyboard.press('Enter')
  await expect(page.locator('main .section-head')).toHaveCount(6)
  await expect(page.locator('.chart-error')).toHaveCount(0)
  await expect(
    page.locator('[data-chart=rank-slope] .mark-line path'),
  ).toHaveCount(16)
  await expect(
    page.locator(
      '[data-chart=rank-slope] .mark-symbol path[aria-label*="Public rank:"]',
    ),
  ).toHaveCount(32)
  await expect(
    page.locator('[data-chart=private-symbols] .mark-shape path'),
  ).toHaveCount(16)
  await expect(
    page.locator(
      '[data-chart=private-symbols] .mark-symbol path[aria-label*="Licensed private hospital beds"]',
    ),
  ).toHaveCount(16)
  await expect(
    page.locator('[data-chart=indexed] .mark-symbol path'),
  ).toHaveCount(20)
  await expect(
    page.locator(
      '[data-chart=heatmap] .mark-rect path[aria-label*="State / federal territory:"]',
    ),
  ).toHaveCount(160)
  await expect(
    page.locator('[data-chart=choropleth] .mark-shape path'),
  ).toHaveCount(16)
  await expect(
    page.locator('[data-chart=connected] .mark-symbol path'),
  ).toHaveCount(32)
  await expect(
    page.locator('[data-chart=occupancy] .mark-symbol path'),
  ).toHaveCount(16)
  await expect(
    page.locator('[data-chart=admissions] .mark-rect path'),
  ).toHaveCount(4)
  await expect(page.locator('[data-chart=ageing] .mark-rect path')).toHaveCount(
    2,
  )
  // Verify rendered encoding values, not just downloaded inputs.
  const pinang = page
    .locator(
      '[data-chart=connected] .mark-symbol path[aria-label*="State / federal territory: Pulau Pinang"]',
    )
    .first()
  await expect(pinang).toHaveAttribute(
    'aria-label',
    /Public beds \/ 10,000: 11.82.*Combined beds \/ 10,000: 27.64.*#15 → #4/,
  )
  await pinang.hover()
  await expect(page.locator('#vg-tooltip-element')).toContainText(
    'Pulau Pinang',
  )
  await expect(page.locator('#vg-tooltip-element')).toContainText('27.64')
  await page.locator('#state-search').fill('Pulau Pinang')
  await expect(page.locator('.rank-note')).toContainText('#15 → #4')
  await expect(page.locator('[data-insight=rank]')).toContainText(
    'Pulau Pinang',
  )
  await expect(
    page.locator('[data-chart=connected] .mark-symbol path'),
  ).toHaveCount(32)
  await page.locator('#capacity-sort').selectOption('Public capacity')
  await expect(page.locator('[data-chart=connected]')).toHaveAttribute(
    'data-ready',
    'true',
  )
  const getY = async (state) =>
    page
      .locator(
        `[data-chart=connected] .mark-symbol path[aria-label*="State / federal territory: ${state}"]`,
      )
      .first()
      .evaluate((el) => el.getBoundingClientRect().y)
  expect(await getY('Perlis')).toBeLessThan(await getY('Pulau Pinang'))
  await page.locator('#capacity-sort').selectOption('Private contribution')
  await expect
    .poll(() => getY('Pulau Pinang'))
    .toBeLessThan(await getY('Perlis'))
  await page
    .locator('#map-region')
    .getByRole('button', { name: 'East Malaysia', exact: true })
    .click()
  await expect(
    page.locator('[data-chart=choropleth] .mark-shape path'),
  ).toHaveCount(3)
  await page.locator('#state-search').fill('W.P. Labuan')
  await expect(page.locator('.map-chart .state-readout')).toContainText('12.10')
  await page
    .locator('#map-region')
    .getByRole('button', { name: 'All Malaysia', exact: true })
    .click()
  await page
    .getByRole('button', { name: 'Reset selection', exact: true })
    .click()
  await page.locator('#capacity-sort').selectOption('Combined capacity')
  await expect(page.locator('[data-ready=true]')).toHaveCount(12)
  await page.locator('.admissions-chart summary').click()
  await expect(page.locator('.admissions-chart tbody')).toContainText(
    '2,579,373',
  )
  await expect(page.locator('.admissions-chart tbody')).toContainText(
    '1,359,910',
  )
  const download = page.waitForEvent('download')
  await page.locator('.admissions-chart a[download]').click()
  expect((await download).suggestedFilename()).toBe('admissions.csv')
  await page.locator('.admissions-chart summary').click()
  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    svgs: [...document.querySelectorAll('[data-chart] svg')].map((e) => ({
      w: e.getBoundingClientRect().width,
      parent: e.closest('[data-chart]').getBoundingClientRect().width,
    })),
  }))
  expect(layout.scroll).toBeLessThanOrEqual(layout.width)
  for (const svg of layout.svgs)
    expect(svg.w).toBeLessThanOrEqual(svg.parent + 1)
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-verified.png`,
    fullPage: true,
  })
  for (const id of ['rank-slope', 'private-symbols'])
    await page
      .locator(`[data-chart=${id}]`)
      .screenshot({ path: `test-results/${testInfo.project.name}-${id}.png` })
  expect(errors).toEqual([])
})
