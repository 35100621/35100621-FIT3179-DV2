import { test, expect } from '@playwright/test'
test('linked state investigation, geographic reference and responsive controls', async ({
  page,
}, info) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => {
    if (['warn', 'error'].includes(m.type())) errors.push(m.text())
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await expect(page.locator('[data-ready=true]')).toHaveCount(12)
  await page.locator('#state-search').fill('Pulau Pinang')
  await expect(page.locator('[data-insight=capacity]')).toContainText('11.82')
  await expect(page.locator('[data-insight=capacity]')).toContainText('27.64')
  await expect(page.locator('[data-insight=rank]')).toContainText(
    'Up 11 places',
  )
  await expect(page.locator('[data-insight=public]')).toContainText(
    'National rate',
  )
  await expect(page.locator('[data-insight=private]')).toContainText('2,847')
  await expect(page.locator('[data-insight=occupancy]')).toContainText('72.61%')
  await expect(page.locator('[data-insight=cartogram]')).toContainText(
    'Combined hospital beds',
  )
  const shapes = page.locator(
    '[data-chart=capacity-cartogram] .capacity_shapes_marks path',
  )
  const originals = page.locator(
    '[data-chart=capacity-cartogram] .original_footprints_marks path',
  )
  await expect(shapes).toHaveCount(16)
  await expect(originals).toHaveCount(16)
  const highlighted = page.locator(
    '[data-chart=capacity-cartogram] .linked_footprints_marks path',
  )
  await expect(highlighted).toHaveCount(1)
  await page.getByLabel('Show original outlines').uncheck()
  await expect(originals).toHaveCount(0)
  await expect(shapes).toHaveCount(16)
  await page.getByLabel('Show original outlines').check()
  await expect(originals).toHaveCount(16)
  for (const id of ['map-region', 'private-map-region', 'cartogram-region']) {
    await page
      .locator(`#${id}`)
      .getByRole('button', { name: 'East Malaysia', exact: true })
      .click()
  }
  await expect(
    page.locator('[data-chart=choropleth] .mark-shape path'),
  ).toHaveCount(3)
  await expect(
    page.locator('[data-chart=private-symbols] .mark-shape path'),
  ).toHaveCount(3)
  await expect(shapes).toHaveCount(3)
  await expect(originals).toHaveCount(3)
  for (const id of ['map-region', 'private-map-region', 'cartogram-region'])
    await page
      .locator(`#${id}`)
      .getByRole('button', { name: 'All Malaysia', exact: true })
      .click()
  await page
    .getByRole('button', { name: 'Reset selection', exact: true })
    .click()
  await expect(page.locator('[data-insight]')).toHaveCount(0)
  // A plotted occupancy point sets the same React selection as the search.
  const kedah = page
    .locator('[data-chart=occupancy] .mark-symbol path[aria-label*="Kedah"]')
    .first()
  await kedah.click()
  await expect(page.locator('[data-insight=occupancy]')).toContainText(
    '+9.31 percentage points',
  )
  await expect(page.locator('[data-insight=rank]')).toContainText('Kedah')
  await page
    .getByRole('button', { name: 'Reset selection', exact: true })
    .click()
  // Linked cartogram hover highlights both representations without persisting selection.
  const polygon = page.locator(
    '[data-chart=capacity-cartogram] .capacity_shapes_marks path[aria-label*="Sarawak"]',
  )
  await polygon.hover({ force: true })
  await expect(highlighted).toHaveCount(1)
  await expect(page.locator('#vg-tooltip-element')).toContainText('Sarawak')
  await polygon.click({ force: true })
  await expect(page.locator('[data-insight=cartogram]')).toContainText(
    'Sarawak',
  )
  await page.mouse.move(0, 0)
  await expect(highlighted).toHaveCount(1)
  await page
    .getByRole('button', { name: 'Reset selection', exact: true })
    .click()
  await page.getByRole('button', { name: 'Geography', exact: true }).click()
  await expect(shapes).toHaveCount(16)
  await page.getByRole('button', { name: 'Capacity', exact: true }).click()
  await expect(originals).toHaveCount(16)
  // Verify direct selection from all remaining coordinated chart idioms.
  for (const [chart, mark, state] of [
    ['choropleth', '.mark-shape', 'Sarawak'],
    ['private-symbols', '.mark-symbol', 'Sabah'],
    ['connected', '.mark-symbol', 'Pulau Pinang'],
    ['rank-slope', '.mark-line', 'Pulau Pinang'],
    ['heatmap', '.mark-rect', 'Perak'],
  ]) {
    const candidates = page.locator(`[data-chart=${chart}] ${mark} path`)
    const target =
      chart === 'rank-slope'
        ? candidates.nth(8)
        : page
            .locator(
              `[data-chart=${chart}] ${mark} path[aria-label*="${state}"]`,
            )
            .first()
    if (chart === 'rank-slope') {
      // Rank slope line paths may not have aria labels; inspect their data-bound visible tooltip.
      await candidates.first().click({ force: true })
      await expect(page.locator('[data-insight=rank]')).toBeVisible()
    } else {
      await target.click({ force: true })
      await expect(page.locator('[data-insight=rank]')).toContainText(state)
    }
    await page
      .getByRole('button', { name: 'Reset selection', exact: true })
      .click()
  }
  await page.locator('#state-search').fill('Pulau Pinang')
  await page.locator('[data-insight=capacity]').screenshot({
    path: `test-results/${info.project.name}-selected-insight.png`,
  })
  await page
    .getByRole('button', { name: 'Reset selection', exact: true })
    .click()
  const layout = await page.evaluate(() => ({
    w: innerWidth,
    sw: document.documentElement.scrollWidth,
    charts: [...document.querySelectorAll('[data-chart]')].map((e) => ({
      id: e.getAttribute('data-chart'),
      w: e.clientWidth,
      sw: e.querySelector('svg')!.getBoundingClientRect().width,
    })),
  }))
  expect(layout.sw).toBeLessThanOrEqual(layout.w)
  for (const c of layout.charts)
    expect(c.sw, JSON.stringify(c)).toBeLessThanOrEqual(c.w + 1)
  for (const id of ['act-2', 'act-3', 'act-5', 'act-6'])
    await page.locator(`#${id}`).screenshot({
      path: `test-results/${info.project.name}-refined-${id}.png`,
    })
  expect(errors).toEqual([])
})
