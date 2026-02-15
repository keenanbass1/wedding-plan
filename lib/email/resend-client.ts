import { Resend } from 'resend'

// Singleton Resend client
export const resend = new Resend(process.env.RESEND_API_KEY)

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
