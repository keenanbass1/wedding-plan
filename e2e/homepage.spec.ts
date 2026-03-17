import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('loads and displays hero content', async ({ page }) => {
    await expect(page.getByText('Find Your Perfect')).toBeVisible()
    await expect(page.getByText('Wedding Vendors')).toBeVisible()
  })

  test('displays three feature cards', async ({ page }) => {
    await expect(page.getByText('Share Your Details')).toBeVisible()
    await expect(page.getByText('Browse Matched Vendors')).toBeVisible()
    await expect(page.getByText('Send & Track Inquiries')).toBeVisible()
  })

  test('shows NSW location badge', async ({ page }) => {
    await expect(page.getByText('New South Wales, Australia')).toBeVisible()
  })

  test('Get Started button links to dashboard', async ({ page }) => {
    const getStartedLink = page.getByRole('link', { name: 'Get Started' })
    await expect(getStartedLink).toBeVisible()
  })

  test('displays trust indicators', async ({ page }) => {
    await expect(page.getByText('45+ NSW Vendors')).toBeVisible()
    await expect(page.getByText('Editable Templates')).toBeVisible()
    await expect(page.getByText('Track Everything')).toBeVisible()
  })
})
