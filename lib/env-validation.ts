/**
 * Environment variable validation
 * Validates required environment variables at application startup
 */

interface EnvValidationResult {
  isValid: boolean
  missingVars: string[]
  errors: string[]
}

/**
 * Required environment variables
 */
const REQUIRED_ENV_VARS = {
  // Database
  DATABASE_URL: 'PostgreSQL database connection string',

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: 'Supabase project URL',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'Supabase anonymous key',

  // AI
  ANTHROPIC_API_KEY: 'Anthropic API key for Claude',

  // Email (optional in development, required in production)
  ...(process.env.NODE_ENV === 'production' ? {
    RESEND_API_KEY: 'Resend API key for sending emails',
    EMAIL_FROM: 'Verified sender email address',
  } : {}),
} as const

/**
 * Validate all required environment variables
 */
export function validateEnvVars(): EnvValidationResult {
  const missingVars: string[] = []
  const errors: string[] = []

  for (const [varName, description] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[varName]

    if (!value || value.trim() === '') {
      missingVars.push(varName)
      errors.push(`Missing required environment variable: ${varName} (${description})`)
    }
  }

  // Additional validations
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL must start with https://')
  }

  const emailFrom = process.env.EMAIL_FROM
  if (emailFrom && !emailFrom.includes('@')) {
    errors.push('EMAIL_FROM must be a valid email address')
  }

  return {
    isValid: errors.length === 0,
    missingVars,
    errors,
  }
}

/**
 * Validate environment variables and throw if invalid
 * Call this at application startup
 */
export function requireValidEnv(): void {
  const result = validateEnvVars()

  if (!result.isValid) {
    console.error('❌ Environment validation failed:')
    result.errors.forEach(error => console.error(`  - ${error}`))
    console.error('\nPlease check your .env.local file and ensure all required variables are set.')
    throw new Error('Invalid environment configuration')
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Environment variables validated successfully')
  }
}

/**
 * Get validated environment variable or throw
 */
export function getEnvVar(name: string): string {
  const value = process.env[name]

  if (!value || value.trim() === '') {
    throw new Error(`Required environment variable ${name} is not set`)
  }

  return value
}
