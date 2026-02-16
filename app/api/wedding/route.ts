import { NextRequest, NextResponse } from 'next/server'

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

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { authId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { date, location, guestCount, budget, style } = body

    // Parse date (optional for now)
    let weddingDate: Date | null = null
    if (date && date !== "We're still deciding") {
      // For now, set a placeholder date in the future
      weddingDate = new Date()
      weddingDate.setFullYear(weddingDate.getFullYear() + 1)
    }

    // Parse guest count
    const guestMap: Record<string, number> = {
      'Intimate (under 50)': 40,
      'Medium (50-100)': 75,
      'Large (100-150)': 125,
      'Grand (150+)': 200,
    }
    const parsedGuestCount = guestMap[guestCount] || 75

    // Parse budget (in cents)
    const budgetMap: Record<string, number> = {
      'Under $30,000': 2500000, // $25,000 in cents
      '$30,000 - $50,000': 4000000,
      '$50,000 - $80,000': 6500000,
      'Above $80,000': 10000000,
    }
    const parsedBudget = budgetMap[budget] || 5000000

    // Parse location
    const locationMap: Record<string, string> = {
      'Sydney & surrounds': 'Sydney',
      'Blue Mountains': 'Blue Mountains',
      'Hunter Valley': 'Hunter Valley',
      'South Coast': 'South Coast',
      'Other region': 'Newcastle',
    }
    const parsedLocation = locationMap[location] || 'Newcastle'

    // Check if user already has a wedding (update instead of create)
    const existingWedding = await prisma.wedding.findFirst({
      where: { userId: dbUser.id },
    })

    let wedding
    if (existingWedding) {
      // Update existing wedding
      wedding = await prisma.wedding.update({
        where: { id: existingWedding.id },
        data: {
          weddingDate,
          location: parsedLocation,
          guestCount: parsedGuestCount,
          budgetTotal: parsedBudget,
          style: style?.split(' & ')[0] || 'Modern',
          chatCompleted: true,
          status: 'MATCHING',
        },
      })
    } else {
      // Create new wedding
      wedding = await prisma.wedding.create({
        data: {
          userId: dbUser.id,
          weddingDate,
          location: parsedLocation,
          guestCount: parsedGuestCount,
          budgetTotal: parsedBudget,
          style: style?.split(' & ')[0] || 'Modern',
          chatCompleted: true,
          status: 'MATCHING',
        },
      })
    }

    return NextResponse.json({ success: true, wedding })
  } catch (error) {
    console.error('Error saving wedding:', error)
    return NextResponse.json({ error: 'Failed to save wedding data' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { authId: user.id },
      include: {
        weddings: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ wedding: dbUser.weddings[0] || null })
  } catch (error) {
    console.error('Error fetching wedding:', error)
    return NextResponse.json({ error: 'Failed to fetch wedding data' }, { status: 500 })
  }
}
