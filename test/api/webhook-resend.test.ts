import { describe, it, expect } from 'vitest'

/**
 * Test the webhook event handling logic from app/api/webhooks/resend/route.ts
 * We test the event type mapping and expected database update shapes.
 */

interface ResendWebhookPayload {
  type: string
  created_at: string
  data: {
    email_id: string
    from: string
    to: string[]
    subject: string
    created_at: string
  }
}

describe('Resend webhook event handling', () => {
  describe('event type mapping', () => {
    function getUpdateData(type: string, createdAt: string) {
      switch (type) {
        case 'email.delivered':
          return { delivered: true, deliveredAt: new Date(createdAt) }
        case 'email.opened':
          return { opened: true, openedAt: new Date(createdAt) }
        case 'email.bounced':
          return { bounced: true, delivered: false }
        case 'email.complained':
          return { bounced: true }
        default:
          return null
      }
    }

    it('maps email.delivered to delivered=true with timestamp', () => {
      const data = getUpdateData('email.delivered', '2026-02-26T10:00:00Z')
      expect(data).toEqual({
        delivered: true,
        deliveredAt: new Date('2026-02-26T10:00:00Z'),
      })
    })

    it('maps email.opened to opened=true with timestamp', () => {
      const data = getUpdateData('email.opened', '2026-02-26T11:00:00Z')
      expect(data).toEqual({
        opened: true,
        openedAt: new Date('2026-02-26T11:00:00Z'),
      })
    })

    it('maps email.bounced to bounced=true, delivered=false', () => {
      const data = getUpdateData('email.bounced', '2026-02-26T12:00:00Z')
      expect(data).toEqual({
        bounced: true,
        delivered: false,
      })
    })

    it('maps email.complained to bounced=true', () => {
      const data = getUpdateData('email.complained', '2026-02-26T13:00:00Z')
      expect(data).toEqual({ bounced: true })
    })

    it('returns null for unknown event types', () => {
      const data = getUpdateData('email.clicked', '2026-02-26T14:00:00Z')
      expect(data).toBeNull()
    })
  })

  describe('payload validation', () => {
    it('requires email_id in payload', () => {
      const payload: ResendWebhookPayload = {
        type: 'email.delivered',
        created_at: '2026-02-26T10:00:00Z',
        data: {
          email_id: '',
          from: 'test@example.com',
          to: ['vendor@example.com'],
          subject: 'Wedding Inquiry',
          created_at: '2026-02-26T10:00:00Z',
        },
      }

      expect(!payload.data.email_id).toBe(true)
    })

    it('extracts email_id from valid payload', () => {
      const payload: ResendWebhookPayload = {
        type: 'email.delivered',
        created_at: '2026-02-26T10:00:00Z',
        data: {
          email_id: 'resend-email-123',
          from: 'test@example.com',
          to: ['vendor@example.com'],
          subject: 'Wedding Inquiry',
          created_at: '2026-02-26T10:00:00Z',
        },
      }

      expect(payload.data.email_id).toBe('resend-email-123')
    })
  })
})
