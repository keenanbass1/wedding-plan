import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

// Mock Upstash modules to prevent real connections
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: vi.fn(),
}))
vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(),
}))

import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

describe('checkRateLimit (in-memory fallback)', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Ensure no Redis config so we use in-memory
    process.env = { ...originalEnv }
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('allows first request', async () => {
    const result = await checkRateLimit('user-1-test', { maxRequests: 5, windowMs: 60000 }, 'test-allow')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(4)
    expect(result.limit).toBe(5)
  })

  it('tracks remaining requests', async () => {
    const config = { maxRequests: 3, windowMs: 60000 }
    const key = 'test-track-' + Date.now()

    const r1 = await checkRateLimit(key, config, 'test-track')
    expect(r1.remaining).toBe(2)

    const r2 = await checkRateLimit(key, config, 'test-track')
    expect(r2.remaining).toBe(1)

    const r3 = await checkRateLimit(key, config, 'test-track')
    expect(r3.remaining).toBe(0)
  })

  it('blocks when limit exceeded', async () => {
    const config = { maxRequests: 2, windowMs: 60000 }
    const key = 'test-block-' + Date.now()

    await checkRateLimit(key, config, 'test-block')
    await checkRateLimit(key, config, 'test-block')

    const result = await checkRateLimit(key, config, 'test-block')
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('returns resetAt in the future', async () => {
    const result = await checkRateLimit('user-reset-' + Date.now(), { maxRequests: 5, windowMs: 60000 }, 'test-reset')
    expect(result.resetAt).toBeGreaterThan(Date.now())
  })

  it('isolates different identifiers', async () => {
    const config = { maxRequests: 1, windowMs: 60000 }
    const ts = Date.now()

    const r1 = await checkRateLimit(`user-a-${ts}`, config, 'test-iso')
    const r2 = await checkRateLimit(`user-b-${ts}`, config, 'test-iso')

    expect(r1.allowed).toBe(true)
    expect(r2.allowed).toBe(true)
  })
})

describe('RATE_LIMITS config', () => {
  it('has expected rate limit configurations', () => {
    expect(RATE_LIMITS.AI_GENERATION.maxRequests).toBe(10)
    expect(RATE_LIMITS.EMAIL_SEND.maxRequests).toBe(50)
    expect(RATE_LIMITS.CHAT.maxRequests).toBe(30)
    expect(RATE_LIMITS.API_GENERAL.maxRequests).toBe(100)
  })

  it('has reasonable window durations', () => {
    expect(RATE_LIMITS.AI_GENERATION.windowMs).toBe(60 * 1000)
    expect(RATE_LIMITS.EMAIL_SEND.windowMs).toBe(60 * 60 * 1000)
    expect(RATE_LIMITS.CHAT.windowMs).toBe(60 * 1000)
  })
})
