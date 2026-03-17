/**
 * Rate limiter with Upstash Redis for production and in-memory fallback for development.
 *
 * Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars to enable
 * persistent rate limiting that works across serverless invocations.
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
}

// --- In-memory fallback (development / missing Redis config) ---

interface RateLimitEntry {
  count: number
  resetAt: number
}

const memoryStore = new Map<string, RateLimitEntry>()

function checkMemoryRateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const entry = memoryStore.get(identifier)

  if (Math.random() < 0.01) {
    for (const [key, e] of memoryStore.entries()) {
      if (e.resetAt <= now) memoryStore.delete(key)
    }
  }

  if (!entry || entry.resetAt <= now) {
    const newEntry: RateLimitEntry = { count: 1, resetAt: now + config.windowMs }
    memoryStore.set(identifier, newEntry)
    return { allowed: true, limit: config.maxRequests, remaining: config.maxRequests - 1, resetAt: newEntry.resetAt }
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, limit: config.maxRequests, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, limit: config.maxRequests, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt }
}

// --- Upstash Redis rate limiter ---

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null

  return new Redis({ url, token })
}

// Cache Ratelimit instances per config key to avoid re-creation
const ratelimitInstances = new Map<string, Ratelimit>()

function getUpstashRatelimit(configKey: string, config: RateLimitConfig): Ratelimit | null {
  const existing = ratelimitInstances.get(configKey)
  if (existing) return existing

  const redis = getRedisClient()
  if (!redis) return null

  const windowSec = Math.ceil(config.windowMs / 1000)
  const instance = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.maxRequests, `${windowSec} s`),
    prefix: `ratelimit:${configKey}`,
  })

  ratelimitInstances.set(configKey, instance)
  return instance
}

// --- Public API (unchanged interface) ---

/**
 * Check if a request should be rate limited.
 * Uses Upstash Redis when configured, falls back to in-memory.
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
  configKey = 'default'
): Promise<RateLimitResult> {
  const upstash = getUpstashRatelimit(configKey, config)

  if (!upstash) {
    return checkMemoryRateLimit(identifier, config)
  }

  const result = await upstash.limit(identifier)

  return {
    allowed: result.success,
    limit: result.limit,
    remaining: result.remaining,
    resetAt: result.reset,
  }
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  AI_GENERATION: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 10 requests per minute
  },
  EMAIL_SEND: {
    maxRequests: 50,
    windowMs: 60 * 60 * 1000, // 50 emails per hour
  },
  CHAT: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 30 requests per minute
  },
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 100 requests per minute
  },
} as const
