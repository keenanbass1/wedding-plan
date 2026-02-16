/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a proper rate limiting service
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

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

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (e.g., user ID, IP address)
 * @param config - Rate limit configuration
 * @returns Result indicating if request is allowed
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    cleanupExpiredEntries()
  }

  // No existing entry or expired - create new one
  if (!entry || entry.resetAt <= now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + config.windowMs,
    }
    rateLimitStore.set(identifier, newEntry)

    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetAt: newEntry.resetAt,
    }
  }

  // Entry exists and not expired
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  // Increment count
  entry.count++
  rateLimitStore.set(identifier, entry)

  return {
    allowed: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Clean up expired entries from the rate limit store
 */
function cleanupExpiredEntries() {
  const now = Date.now()
  const keysToDelete: string[] = []

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      keysToDelete.push(key)
    }
  }

  for (const key of keysToDelete) {
    rateLimitStore.delete(key)
  }
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // AI endpoints - expensive operations
  AI_GENERATION: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 10 requests per minute
  },
  // Email sending - prevent spam
  EMAIL_SEND: {
    maxRequests: 50,
    windowMs: 60 * 60 * 1000, // 50 emails per hour
  },
  // Chat - moderate limits
  CHAT: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 30 requests per minute
  },
  // General API - generous limits
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 100 requests per minute
  },
} as const
