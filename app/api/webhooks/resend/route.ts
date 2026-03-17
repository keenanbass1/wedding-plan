import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

/**
 * Resend Webhook Events
 * https://resend.com/docs/dashboard/webhooks/introduction
 *
 * Configure this endpoint in Resend Dashboard → Webhooks:
 *   URL: https://your-domain.com/api/webhooks/resend
 *   Events: email.delivered, email.opened, email.bounced, email.complained
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
    tags?: Record<string, string>
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature if configured
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
    if (webhookSecret) {
      const signature = req.headers.get('svix-signature')
      if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
      }
      // For full signature verification, install svix and verify here.
      // For now, we check that the secret header is present.
    }

    const payload: ResendWebhookPayload = await req.json()
    const { type, data } = payload
    const emailId = data.email_id

    if (!emailId) {
      return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
    }

    // Find the outreach record by Resend email ID
    const outreach = await prisma.vendorOutreach.findFirst({
      where: { emailId },
    })

    if (!outreach) {
      // Not our email — ignore silently (could be a transactional email)
      return NextResponse.json({ received: true })
    }

    // Update based on event type
    switch (type) {
      case 'email.delivered':
        await prisma.vendorOutreach.update({
          where: { id: outreach.id },
          data: {
            delivered: true,
            deliveredAt: new Date(data.created_at),
          },
        })
        break

      case 'email.opened':
        await prisma.vendorOutreach.update({
          where: { id: outreach.id },
          data: {
            opened: true,
            openedAt: new Date(data.created_at),
          },
        })
        break

      case 'email.bounced':
        await prisma.vendorOutreach.update({
          where: { id: outreach.id },
          data: {
            bounced: true,
            delivered: false,
          },
        })
        break

      case 'email.complained':
        // Mark as bounced — the recipient marked it as spam
        await prisma.vendorOutreach.update({
          where: { id: outreach.id },
          data: {
            bounced: true,
          },
        })
        break

      default:
        // Unhandled event type — acknowledge receipt
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Resend webhook error:', error)
    // Return 200 to prevent Resend from retrying on our app errors
    return NextResponse.json({ received: true, error: 'Processing error' })
  }
}
