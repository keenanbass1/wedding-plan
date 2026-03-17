import { test, expect } from '@playwright/test'

test.describe('Security headers', () => {
  test('homepage returns expected security headers', async ({ request }) => {
    const response = await request.get('/')

    expect(response.headers()['x-content-type-options']).toBe('nosniff')
    expect(response.headers()['x-frame-options']).toBe('DENY')
    expect(response.headers()['x-xss-protection']).toBe('1; mode=block')
    expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin')
    expect(response.headers()['permissions-policy']).toBe(
      'camera=(), microphone=(), geolocation=()'
    )
  })

  test('API routes return security headers', async ({ request }) => {
    const response = await request.get('/api/wedding')

    expect(response.headers()['x-content-type-options']).toBe('nosniff')
    expect(response.headers()['x-frame-options']).toBe('DENY')
  })
})
