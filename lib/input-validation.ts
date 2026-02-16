/**
 * Input validation and sanitization utilities
 */

/**
 * Sanitize string input to prevent injection attacks
 * Removes potentially dangerous characters while preserving useful content
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '')

  // Trim whitespace
  sanitized = sanitized.trim()

  // Limit length to prevent DoS
  if (sanitized.length > 10000) {
    sanitized = sanitized.substring(0, 10000)
  }

  return sanitized
}

/**
 * Validate and sanitize numeric input
 */
export function sanitizeNumber(
  input: string | number | undefined,
  options: {
    min?: number
    max?: number
    defaultValue?: number
  } = {}
): number | undefined {
  if (input === undefined || input === null || input === '') {
    return options.defaultValue
  }

  const num = typeof input === 'string' ? parseInt(input, 10) : input

  if (isNaN(num)) {
    return options.defaultValue
  }

  if (options.min !== undefined && num < options.min) {
    return options.min
  }

  if (options.max !== undefined && num > options.max) {
    return options.max
  }

  return num
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate guest count is within reasonable bounds
 */
export function validateGuestCount(count: string | number | undefined): number | undefined {
  return sanitizeNumber(count, {
    min: 1,
    max: 10000,
  })
}

/**
 * Validate budget is within reasonable bounds
 */
export function validateBudget(budget: string | number | undefined): number | undefined {
  return sanitizeNumber(budget, {
    min: 1000,
    max: 10000000,
  })
}

/**
 * Validate array input
 */
export function validateArray<T>(
  input: unknown,
  maxLength = 100
): T[] {
  if (!Array.isArray(input)) {
    return []
  }

  return input.slice(0, maxLength) as T[]
}

/**
 * Sanitize user input before using in AI prompts
 * Prevents prompt injection attacks
 */
export function sanitizeForAIPrompt(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  let sanitized = sanitizeString(input)

  // Remove potential prompt injection patterns
  // This is a basic implementation - adjust based on your needs
  const dangerousPatterns = [
    /system:/gi,
    /assistant:/gi,
    /\[INST\]/gi,
    /\[\/INST\]/gi,
    /<\|im_start\|>/gi,
    /<\|im_end\|>/gi,
  ]

  for (const pattern of dangerousPatterns) {
    sanitized = sanitized.replace(pattern, '')
  }

  return sanitized
}
