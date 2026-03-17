import { describe, it, expect } from 'vitest'

import { validateRedirectUrl } from '@/lib/auth-helpers'

describe('validateRedirectUrl', () => {
  it('allows valid relative paths', () => {
    expect(validateRedirectUrl('/dashboard')).toBe('/dashboard')
    expect(validateRedirectUrl('/auth/login')).toBe('/auth/login')
    expect(validateRedirectUrl('/vendors?page=2')).toBe('/vendors?page=2')
  })

  it('returns default for null', () => {
    expect(validateRedirectUrl(null)).toBe('/dashboard')
  })

  it('returns custom default when specified', () => {
    expect(validateRedirectUrl(null, '/home')).toBe('/home')
  })

  it('rejects absolute URLs', () => {
    expect(validateRedirectUrl('https://evil.com')).toBe('/dashboard')
    expect(validateRedirectUrl('http://evil.com')).toBe('/dashboard')
  })

  it('rejects protocol-relative URLs', () => {
    expect(validateRedirectUrl('//evil.com')).toBe('/dashboard')
    expect(validateRedirectUrl('//evil.com/path')).toBe('/dashboard')
  })

  it('rejects URLs with colons (data/javascript)', () => {
    expect(validateRedirectUrl('/path:evil')).toBe('/dashboard')
    expect(validateRedirectUrl('javascript:alert(1)')).toBe('/dashboard')
    expect(validateRedirectUrl('data:text/html,<script>')).toBe('/dashboard')
  })

  it('rejects non-path strings', () => {
    expect(validateRedirectUrl('evil.com')).toBe('/dashboard')
    expect(validateRedirectUrl('not-a-path')).toBe('/dashboard')
  })
})
