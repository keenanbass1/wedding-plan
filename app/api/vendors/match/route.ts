import { NextRequest, NextResponse } from 'next/server';
import { findMatchingVendors, formatVendorMatchesForChat } from '@/lib/vendor-matching';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { location, guestCount, budgetTotal, style, preferences } = body;

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    // Find matching vendors
    const matches = await findMatchingVendors({
      location,
      guestCount: guestCount ? parseInt(guestCount) : undefined,
      budgetTotal: budgetTotal ? parseInt(budgetTotal) : undefined,
      style,
      preferences: preferences || [],
    });

    // Format for chat display
    const chatMessage = formatVendorMatchesForChat(matches);

    return NextResponse.json({
      matches,
      chatMessage,
      success: true,
    });
  } catch (error) {
    console.error('Vendor matching error:', error);
    return NextResponse.json(
      { error: 'Failed to find matching vendors' },
      { status: 500 }
    );
  }
}
