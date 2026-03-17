import { describe, it, expect, vi } from 'vitest'

import { withRetry, isTransientError } from '@/lib/retry'

describe('withRetry', () => {
  it('returns result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('ok')
    const result = await withRetry(fn)
    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries on failure and succeeds', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce('ok')

    const result = await withRetry(fn, { initialDelayMs: 1 })
    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('throws after maxAttempts exhausted', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fails'))

    await expect(
      withRetry(fn, { maxAttempts: 3, initialDelayMs: 1 })
    ).rejects.toThrow('always fails')

    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('does not retry when shouldRetry returns false', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('permanent'))

    await expect(
      withRetry(fn, {
        maxAttempts: 5,
        initialDelayMs: 1,
        shouldRetry: () => false,
      })
    ).rejects.toThrow('permanent')

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('respects shouldRetry filter', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('transient'))
      .mockRejectedValueOnce(new Error('permanent'))

    await expect(
      withRetry(fn, {
        maxAttempts: 5,
        initialDelayMs: 1,
        shouldRetry: (err) => (err as Error).message === 'transient',
      })
    ).rejects.toThrow('permanent')

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('uses default maxAttempts of 3', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'))

    await expect(withRetry(fn, { initialDelayMs: 1 })).rejects.toThrow()
    expect(fn).toHaveBeenCalledTimes(3)
  })
})

describe('isTransientError', () => {
  it('returns true for timeout errors', () => {
    expect(isTransientError(new Error('Request timeout'))).toBe(true)
    expect(isTransientError(new Error('TIMEOUT reached'))).toBe(true)
  })

  it('returns true for network errors', () => {
    expect(isTransientError(new Error('ECONNRESET'))).toBe(true)
    expect(isTransientError(new Error('ECONNREFUSED'))).toBe(true)
    expect(isTransientError(new Error('fetch failed'))).toBe(true)
    expect(isTransientError(new Error('network error'))).toBe(true)
  })

  it('returns true for 429 rate limit errors', () => {
    expect(isTransientError({ status: 429, message: 'Rate limited' })).toBe(true)
  })

  it('returns true for 5xx server errors', () => {
    expect(isTransientError({ status: 500, message: 'Internal server error' })).toBe(true)
    expect(isTransientError({ status: 502, message: 'Bad gateway' })).toBe(true)
    expect(isTransientError({ status: 503, message: 'Service unavailable' })).toBe(true)
  })

  it('returns false for 4xx client errors (except 429)', () => {
    expect(isTransientError({ status: 400, message: 'Bad request' })).toBe(false)
    expect(isTransientError({ status: 401, message: 'Unauthorized' })).toBe(false)
    expect(isTransientError({ status: 404, message: 'Not found' })).toBe(false)
  })

  it('returns false for non-transient errors', () => {
    expect(isTransientError(new Error('Invalid input'))).toBe(false)
    expect(isTransientError(new Error('Validation failed'))).toBe(false)
  })

  it('returns false for non-error values', () => {
    expect(isTransientError('string')).toBe(false)
    expect(isTransientError(null)).toBe(false)
    expect(isTransientError(undefined)).toBe(false)
  })
})
