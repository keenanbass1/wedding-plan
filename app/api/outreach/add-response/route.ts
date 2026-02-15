import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

const prisma = new PrismaClient()

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

    if (!outreach || outreach.wedding.user.authId !== user.id) {
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
