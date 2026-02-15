import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'
import { resend, validateEmailConfig } from '@/lib/email/resend-client'

const prisma = new PrismaClient()

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
  [key: string]: any
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    const { emails, weddingId } = await req.json() as {
      emails: EmailToSend[]
      weddingId: string
    }

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'emails array is required' },
        { status: 400 }
      )
    }

    if (!weddingId) {
      return NextResponse.json(
        { error: 'weddingId is required' },
        { status: 400 }
      )
    }

    // Verify wedding ownership
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      include: { user: true },
    })

    if (!wedding || wedding.user.authId !== user.id) {
      return NextResponse.json(
        { error: 'Wedding not found or access denied' },
        { status: 404 }
      )
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
    const errors: any[] = []

    for (const batch of batches) {
      try {
        const batchResult = await resend.batch.send(
          batch.map(email => ({
            from: process.env.EMAIL_FROM!,
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
          const batchData = batchResult.data as any
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
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    )
  }
}
