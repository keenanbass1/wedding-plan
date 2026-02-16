import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuth(req)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult

    const { outreachId, responseEmail, quote, notes } = await req.json()

    if (!outreachId) {
      return NextResponse.json({ error: 'outreachId is required' }, { status: 400 })
    }

    if (!responseEmail) {
      return NextResponse.json({ error: 'responseEmail is required' }, { status: 400 })
    }

    // Get outreach record and verify ownership
    const outreach = await prisma.vendorOutreach.findUnique({
      where: { id: outreachId },
      include: {
        wedding: {
          include: { user: true },
        },
      },
    })

    if (!outreach || outreach.wedding.user.authId !== user.supabaseUser.id) {
      return NextResponse.json({ error: 'Outreach not found or access denied' }, { status: 404 })
    }

    // Update outreach with response
    const updated = await prisma.vendorOutreach.update({
      where: { id: outreachId },
      data: {
        responseEmail,
        replied: true,
        repliedAt: new Date(),
        quote: quote || null,
        notes: notes || null,
      },
    })

    return NextResponse.json({
      success: true,
      outreach: updated,
    })
  } catch (error) {
    console.error('Error adding response:', error)
    return NextResponse.json({ error: 'Failed to add response' }, { status: 500 })
  }
}
