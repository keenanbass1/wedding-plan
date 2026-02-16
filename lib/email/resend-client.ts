import { Resend } from 'resend'

// Lazy-initialized Resend client singleton
let resendInstance: Resend | null = null

export function getResendClient(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

// Helper to validate email configuration
export function validateEmailConfig(): { isValid: boolean; error?: string } {
  if (!process.env.RESEND_API_KEY) {
    return { isValid: false, error: 'RESEND_API_KEY not configured' }
  }

  if (!process.env.EMAIL_FROM) {
    return { isValid: false, error: 'EMAIL_FROM not configured' }
  }

  return { isValid: true }
}
