/**
 * Retry a function with exponential backoff.
 *
 * @param fn       The async function to retry
 * @param options  Configuration for retry behavior
 * @returns        The result of the function
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number
    initialDelayMs?: number
    maxDelayMs?: number
    /** Only retry if this returns true for the error. Defaults to always retry. */
    shouldRetry?: (error: unknown) => boolean
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelayMs = 500,
    maxDelayMs = 5000,
    shouldRetry = () => true,
  } = options

  let lastError: unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error
      }

      // Exponential backoff with jitter
      const delay = Math.min(initialDelayMs * Math.pow(2, attempt - 1), maxDelayMs)
      const jitter = delay * 0.2 * Math.random()
      await new Promise(resolve => setTimeout(resolve, delay + jitter))
    }
  }

  throw lastError
}

/**
 * Returns true for errors that are likely transient and worth retrying:
 * network errors, timeouts, 429 rate limits, 5xx server errors.
 */
export function isTransientError(error: unknown): boolean {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase()

    // Network / timeout errors
    if (
      msg.includes('timeout') ||
      msg.includes('econnreset') ||
      msg.includes('econnrefused') ||
      msg.includes('fetch failed') ||
      msg.includes('network')
    ) {
      return true
    }
  }

  // HTTP status code errors (Anthropic SDK, Resend, etc.)
  const status = (error as { status?: number })?.status
  if (status === 429 || (status !== undefined && status >= 500)) {
    return true
  }

  return false
}
