import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { getEnvVar, validateEnvVars, requireValidEnv } from '@/lib/env-validation'

describe('getEnvVar', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns value when env var is set', () => {
    process.env.TEST_VAR = 'hello'
    expect(getEnvVar('TEST_VAR')).toBe('hello')
  })

  it('throws when env var is not set', () => {
    delete process.env.TEST_VAR
    expect(() => getEnvVar('TEST_VAR')).toThrow('Required environment variable TEST_VAR is not set')
  })

  it('throws when env var is empty string', () => {
    process.env.TEST_VAR = ''
    expect(() => getEnvVar('TEST_VAR')).toThrow('Required environment variable TEST_VAR is not set')
  })

  it('throws when env var is only whitespace', () => {
    process.env.TEST_VAR = '   '
    expect(() => getEnvVar('TEST_VAR')).toThrow('Required environment variable TEST_VAR is not set')
  })
})

describe('validateEnvVars', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('reports missing required vars', () => {
    delete process.env.DATABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    delete process.env.ANTHROPIC_API_KEY

    const result = validateEnvVars()

    expect(result.isValid).toBe(false)
    expect(result.missingVars).toContain('DATABASE_URL')
    expect(result.missingVars).toContain('ANTHROPIC_API_KEY')
  })

  it('validates Supabase URL must start with https', () => {
    process.env.DATABASE_URL = 'postgresql://...'
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://bad-url'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key'
    process.env.ANTHROPIC_API_KEY = 'key'

    const result = validateEnvVars()

    expect(result.errors).toContain('NEXT_PUBLIC_SUPABASE_URL must start with https://')
  })

  it('validates EMAIL_FROM must contain @', () => {
    process.env.DATABASE_URL = 'postgresql://...'
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://project.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key'
    process.env.ANTHROPIC_API_KEY = 'key'
    process.env.EMAIL_FROM = 'not-an-email'

    const result = validateEnvVars()

    expect(result.errors).toContain('EMAIL_FROM must be a valid email address')
  })

  it('passes with all valid vars set', () => {
    process.env.DATABASE_URL = 'postgresql://...'
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://project.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key'
    process.env.ANTHROPIC_API_KEY = 'sk-ant-key'

    const result = validateEnvVars()

    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })
})

describe('requireValidEnv', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('throws when env is invalid', () => {
    delete process.env.DATABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    delete process.env.ANTHROPIC_API_KEY

    expect(() => requireValidEnv()).toThrow('Invalid environment configuration')
  })

  it('does not throw when env is valid', () => {
    process.env.DATABASE_URL = 'postgresql://...'
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://project.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'key'
    process.env.ANTHROPIC_API_KEY = 'sk-ant-key'

    expect(() => requireValidEnv()).not.toThrow()
  })
})
