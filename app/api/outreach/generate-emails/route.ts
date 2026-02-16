import { NextRequest, NextResponse } from 'next/server'

import { generateVendorEmail } from '@/lib/email/generate-vendor-email'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'
import { validateArray } from '@/lib/input-validation'

export async function POST(req: NextRequest) {
  try {
    // Require authentication
    const authResult = await requireAuth(req)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult

    // Rate limiting for AI generation
    const rateLimitResult = checkRateLimit(user.dbUser.id, RATE_LIMITS.AI_GENERATION)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before generating more emails.' },
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

    const body = await req.json()
    const vendorIds = validateArray<string>(body.vendorIds, 50) // Max 50 vendors at once
    const { weddingId } = body

    if (vendorIds.length === 0) {
      return NextResponse.json({ error: 'At least one vendor ID is required' }, { status: 400 })
    }

    if (!weddingId || typeof weddingId !== 'string') {
      return NextResponse.json({ error: 'Valid weddingId is required' }, { status: 400 })
    }

    // Get wedding details
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      include: { user: true },
    })

    if (!wedding) {
      return NextResponse.json({ error: 'Wedding not found' }, { status: 404 })
    }

    // Verify ownership
    if (wedding.user.authId !== user.supabaseUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get vendors
    const vendors = await prisma.vendor.findMany({
      where: { id: { in: vendorIds } },
    })

    if (vendors.length === 0) {
      return NextResponse.json({ error: 'No vendors found' }, { status: 404 })
    }

    // Generate emails for each vendor
    const emails = await Promise.all(
      vendors.map(async vendor => {
        const { subject, body } = await generateVendorEmail(vendor, wedding, wedding.user.email)

        return {
          vendorId: vendor.id,
          vendorName: vendor.name,
          vendorEmail: vendor.email,
          vendorCategory: vendor.category,
          subject,
          body,
        }
      })
    )

    return NextResponse.json({
      success: true,
      emails,
      weddingId,
    })
  } catch (error) {
    console.error('Error generating emails:', error)
    return NextResponse.json({ error: 'Failed to generate emails' }, { status: 500 })
  }
}
