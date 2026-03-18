import { test } from '@playwright/test'

test.use({ baseURL: 'https://wedding-plan-v2.vercel.app' })

test.describe('Visual Audit - Production', () => {
  test('homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true })
  })

  test('login page', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'screenshots/02-login.png', fullPage: true })
  })

  test('signup page', async ({ page }) => {
    await page.goto('/auth/signup')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'screenshots/03-signup.png', fullPage: true })
  })

  test('reset password page', async ({ page }) => {
    await page.goto('/auth/reset-password')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'screenshots/04-reset-password.png', fullPage: true })
  })

  test('dashboard redirect', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'screenshots/05-login-from-dashboard.png', fullPage: true })
  })
})
