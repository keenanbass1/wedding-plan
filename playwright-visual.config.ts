import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: 'visual-audit.spec.ts',
  use: { baseURL: 'https://wedding-plan-v2.vercel.app' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
