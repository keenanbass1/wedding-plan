import { NextRequest, NextResponse } from 'next/server'

import { generateVendorEmail } from '@/lib/email/generate-vendor-email'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { vendorIds, weddingId } = await req.json()

    if (!vendorIds || !Array.isArray(vendorIds) || vendorIds.length === 0) {
      return NextResponse.json({ error: 'vendorIds array is required' }, { status: 400 })
    }

    if (!weddingId) {
      return NextResponse.json({ error: 'weddingId is required' }, { status: 400 })
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
    if (wedding.user.authId !== user.id) {
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
