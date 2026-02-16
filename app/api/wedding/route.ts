import { WeddingStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuth(req)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult
    const dbUser = user.dbUser

    const body = await req.json()
    const { date, location, guestCount, budget, style } = body

    // Parse date (optional for now)
    let weddingDate: Date | null = null
    if (date && date !== "We're still deciding") {
      // For now, set a placeholder date in the future
      weddingDate = new Date()
      weddingDate.setFullYear(weddingDate.getFullYear() + 1)
    }

    // Parse guest count - handle both direct numbers and descriptive strings
    const guestMap: Record<string, number> = {
      'Intimate (under 50)': 40,
      'Medium (50-100)': 75,
      'Large (100-150)': 125,
      'Grand (150+)': 200,
    }
    const parsedGuestCount = guestMap[guestCount] || parseInt(guestCount) || 75

    // Parse budget (in cents) - handle both direct numbers and descriptive strings
    const budgetMap: Record<string, number> = {
      'Under $30,000': 2500000, // $25,000 in cents
      '$30,000 - $50,000': 4000000,
      '$50,000 - $80,000': 6500000,
      'Above $80,000': 10000000,
    }
    // If budget is a number string, convert to cents; otherwise use map
    const parsedBudget = budgetMap[budget] || parseInt(budget) * 100 || 5000000

    // Parse location - handle both mapped values and direct values
    const locationMap: Record<string, string> = {
      'Sydney & surrounds': 'Sydney',
      'Blue Mountains': 'Blue Mountains',
      'Hunter Valley': 'Hunter Valley',
      'South Coast': 'South Coast',
      'Other region': 'Newcastle',
    }
    const parsedLocation = locationMap[location] || location || 'Newcastle'

    // Upsert wedding (create or update)
    const weddingData = {
      weddingDate,
      location: parsedLocation,
      guestCount: parsedGuestCount,
      budgetTotal: parsedBudget,
      style: style?.split(' & ')[0] || 'Modern',
      chatCompleted: true,
      status: WeddingStatus.MATCHING,
    }

    const existingWedding = await prisma.wedding.findFirst({
      where: { userId: dbUser.id },
    })

    const wedding = existingWedding
      ? await prisma.wedding.update({
          where: { id: existingWedding.id },
          data: weddingData,
        })
      : await prisma.wedding.create({
          data: { userId: dbUser.id, ...weddingData },
        })

    return NextResponse.json({ success: true, wedding })
  } catch (error) {
    console.error('Error saving wedding:', error)
    return NextResponse.json({ error: 'Failed to save wedding data' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuth(req)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult

    const wedding = await prisma.wedding.findFirst({
      where: { userId: user.dbUser.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ wedding: wedding || null })
  } catch (error) {
    console.error('Error fetching wedding:', error)
    return NextResponse.json({ error: 'Failed to fetch wedding data' }, { status: 500 })
  }
}
