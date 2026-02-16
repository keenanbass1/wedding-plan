import { NextRequest, NextResponse } from 'next/server'

import { requireAuth } from '@/lib/auth-helpers'
import { getResendClient, validateEmailConfig } from '@/lib/email/resend-client'
import { getEnvVar } from '@/lib/env-validation'
import { validateArray } from '@/lib/input-validation'
import { prisma } from '@/lib/prisma'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

interface EmailToSend {
  vendorId: string
  vendorName: string
  vendorEmail: string
  vendorCategory: string
  subject: string
  body: string
}

interface ResendEmailResult {
  id: string
  [key: string]: unknown
}

export async function POST(req: NextRequest) {
  try {
    // Require authentication
    const authResult = await requireAuth(req)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult

    // Rate limiting for email sending
    const rateLimitResult = checkRateLimit(user.dbUser.id, RATE_LIMITS.EMAIL_SEND)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Email rate limit exceeded. You can send more emails in an hour.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetAt).toISOString(),
          },
        }
      )
    }

    // Validate email configuration
    const emailConfigValidation = validateEmailConfig()
    if (!emailConfigValidation.isValid) {
      return NextResponse.json(
        { error: `Email not configured: ${emailConfigValidation.error}` },
        { status: 500 }
      )
    }

    const body = await req.json()
    const emails = validateArray<EmailToSend>(body.emails, 100) // Max 100 emails per batch
    const { weddingId } = body

    if (emails.length === 0) {
      return NextResponse.json({ error: 'At least one email is required' }, { status: 400 })
    }

    if (!weddingId || typeof weddingId !== 'string') {
      return NextResponse.json({ error: 'Valid weddingId is required' }, { status: 400 })
    }

    // Verify wedding ownership
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      include: { user: true },
    })

    if (!wedding || wedding.user.authId !== user.supabaseUser.id) {
      return NextResponse.json({ error: 'Wedding not found or access denied' }, { status: 404 })
    }

    // Send batch emails via Resend
    // Note: Resend batch API accepts up to 100 emails at once
    const batchSize = 100
    const batches = []

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize)
      batches.push(batch)
    }

    const results: ResendEmailResult[] = []
    const errors: unknown[] = []

    for (const batch of batches) {
      try {
        const resend = getResendClient()
        const batchResult = await resend.batch.send(
          batch.map(email => ({
            from: getEnvVar('EMAIL_FROM'),
            to: email.vendorEmail,
            subject: email.subject,
            text: email.body,
            tags: [
              { name: 'wedding_id', value: weddingId },
              { name: 'vendor_id', value: email.vendorId },
              { name: 'category', value: email.vendorCategory },
            ],
          }))
        )

        if (batchResult.data) {
          // Type assertion needed due to Resend SDK type definitions
          const batchData = batchResult.data as unknown as ResendEmailResult | ResendEmailResult[]
          if (Array.isArray(batchData)) {
            results.push(...batchData)
          } else {
            results.push(batchData)
          }
        }
      } catch (error) {
        console.error('Batch send error:', error)
        errors.push(error)
      }
    }

    // Store outreach records in database
    const outreachRecords = await Promise.all(
      emails.map(async (email, index) => {
        const emailId = results[index]?.id || null

        return prisma.vendorOutreach.create({
          data: {
            weddingId,
            vendorId: email.vendorId,
            emailSubject: email.subject,
            emailBody: email.body,
            sentAt: emailId ? new Date() : null,
            delivered: false,
            opened: false,
            replied: false,
            bounced: false,
          },
        })
      })
    )

    // Update wedding status to OUTREACH
    await prisma.wedding.update({
      where: { id: weddingId },
      data: { status: 'OUTREACH' },
    })

    return NextResponse.json({
      success: true,
      sent: results.length,
      total: emails.length,
      errors: errors.length,
      outreachRecords: outreachRecords.map(r => r.id),
    })
  } catch (error) {
    console.error('Error sending batch emails:', error)
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 })
  }
}
