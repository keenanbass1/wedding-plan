import { Vendor } from '@prisma/client'

import { prisma } from './prisma'

export interface WeddingRequirements {
  location: string
  guestCount?: number
  budgetTotal?: number
  style?: string
  date?: string
  preferences?: string[]
}

export interface VendorMatch extends Vendor {
  matchScore: number
  matchReasons: string[]
}

export interface VendorMatches {
  venues: VendorMatch[]
  photographers: VendorMatch[]
  caterers: VendorMatch[]
  totalMatches: number
}

/**
 * Find matching vendors based on wedding requirements
 */
export async function findMatchingVendors(
  requirements: WeddingRequirements
): Promise<VendorMatches> {
  const { location, guestCount, budgetTotal, style, preferences = [] } = requirements

  // Get all vendors in the area
  const allVendors = await prisma.vendor.findMany({
    where: {
      OR: [
        { location: { contains: location, mode: 'insensitive' } },
        { region: { contains: location, mode: 'insensitive' } },
        { suburb: { contains: location, mode: 'insensitive' } },
      ],
    },
  })

  // Score and filter vendors
  const scoredVendors = allVendors
    .map(vendor => ({
      ...vendor,
      matchScore: calculateMatchScore(vendor, requirements),
      matchReasons: getMatchReasons(vendor, requirements),
    }))
    .filter(v => v.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)

  // Group by category
  const venues = scoredVendors.filter(v => v.category === 'VENUE').slice(0, 5)

  const photographers = scoredVendors.filter(v => v.category === 'PHOTOGRAPHER').slice(0, 5)

  const caterers = scoredVendors.filter(v => v.category === 'CATERING').slice(0, 5)

  return {
    venues,
    photographers,
    caterers,
    totalMatches: scoredVendors.length,
  }
}

/**
 * Calculate match score for a vendor (0-100)
 */
function calculateMatchScore(vendor: Vendor, requirements: WeddingRequirements): number {
  let score = 0

  // Base score for location match (30 points)
  if (vendor.location?.toLowerCase().includes(requirements.location.toLowerCase())) {
    score += 30
  } else if (vendor.region?.toLowerCase().includes(requirements.location.toLowerCase())) {
    score += 20
  } else if (vendor.suburb?.toLowerCase().includes(requirements.location.toLowerCase())) {
    score += 25
  }

  // Guest capacity match (20 points for venues)
  if (vendor.category === 'VENUE' && requirements.guestCount && vendor.maxGuests) {
    if (vendor.maxGuests >= requirements.guestCount) {
      score += 20
      // Bonus for close match (not way over capacity)
      if (vendor.maxGuests <= requirements.guestCount * 1.5) {
        score += 5
      }
    }
  }

  // Budget compatibility (15 points)
  if (requirements.budgetTotal && vendor.priceMin && vendor.priceMax) {
    const estimatedVendorBudget = (vendor.priceMin + vendor.priceMax) / 2
    const budgetPerCategory = requirements.budgetTotal / 5 // Assume ~5 vendor categories

    if (estimatedVendorBudget <= budgetPerCategory * 1.5) {
      score += 15
      // Bonus for being well within budget
      if (estimatedVendorBudget <= budgetPerCategory) {
        score += 5
      }
    }
  }

  // Style match (20 points)
  if (requirements.style && vendor.styles) {
    const styleMatch = vendor.styles.some(
      s =>
        s.toLowerCase().includes(requirements.style!.toLowerCase()) ||
        requirements.style!.toLowerCase().includes(s.toLowerCase())
    )
    if (styleMatch) {
      score += 20
    }
  }

  // Preference keywords match (10 points)
  if (requirements.preferences && requirements.preferences.length > 0) {
    const vendorText = `${vendor.description} ${vendor.servicesOffered.join(' ')}`.toLowerCase()
    const matchedPreferences = requirements.preferences.filter(pref =>
      vendorText.includes(pref.toLowerCase())
    )
    score += Math.min(matchedPreferences.length * 3, 10)
  }

  // Quality bonus (10 points)
  if (vendor.rating && vendor.rating >= 4.7) {
    score += 10
  } else if (vendor.rating && vendor.rating >= 4.5) {
    score += 5
  }

  return Math.min(score, 100)
}

/**
 * Get human-readable reasons why this vendor matches
 */
function getMatchReasons(vendor: Vendor, requirements: WeddingRequirements): string[] {
  const reasons: string[] = []

  // Location match
  if (vendor.location?.toLowerCase().includes(requirements.location.toLowerCase())) {
    reasons.push(`Located in ${vendor.location}`)
  }

  // Style match
  if (requirements.style && vendor.styles) {
    const matchingStyles = vendor.styles.filter(s =>
      s.toLowerCase().includes(requirements.style!.toLowerCase())
    )
    if (matchingStyles.length > 0) {
      reasons.push(`Specializes in ${matchingStyles.join(', ')} style`)
    }
  }

  // Capacity match
  if (vendor.category === 'VENUE' && requirements.guestCount && vendor.maxGuests) {
    if (vendor.maxGuests >= requirements.guestCount) {
      reasons.push(`Can accommodate ${requirements.guestCount} guests`)
    }
  }

  // High rating
  if (vendor.rating && vendor.rating >= 4.7) {
    reasons.push(`Highly rated (${vendor.rating}/5.0)`)
  }

  // Budget friendly
  if (requirements.budgetTotal && vendor.priceMin && vendor.priceMax) {
    const budgetPerCategory = requirements.budgetTotal / 5
    const avgPrice = (vendor.priceMin + vendor.priceMax) / 2
    if (avgPrice <= budgetPerCategory) {
      reasons.push('Within your budget')
    }
  }

  return reasons
}

/**
 * Format vendor matches for AI chat display
 */
export function formatVendorMatchesForChat(matches: VendorMatches): string {
  const { venues, photographers, caterers, totalMatches } = matches

  let message = `Perfect! I found **${totalMatches} vendors** that match your wedding vision:\n\n`

  if (venues.length > 0) {
    message += `## 🏰 Venues (${venues.length})\n\n`
    venues.forEach(v => {
      message += `**${v.name}**\n`
      message += `📍 ${v.location}`
      if (v.maxGuests) message += ` • 👥 Up to ${v.maxGuests} guests`
      if (v.priceMin && v.priceMax) {
        message += ` • 💰 $${(v.priceMin / 1000).toFixed(0)}k-${(v.priceMax / 1000).toFixed(0)}k`
      }
      message += `\n${v.description.substring(0, 150)}...\n`
      if (v.matchReasons.length > 0) {
        message += `✨ ${v.matchReasons.join(' • ')}\n`
      }
      if (v.website) {
        message += `🔗 [Visit Website](${v.website})`
        if (v.phone) message += ` • 📞 ${v.phone}`
        message += '\n'
      }
      message += '\n'
    })
  }

  if (photographers.length > 0) {
    message += `## 📸 Photographers (${photographers.length})\n\n`
    photographers.forEach(v => {
      message += `**${v.name}**\n`
      message += `📍 ${v.location}`
      if (v.priceMin && v.priceMax) {
        message += ` • 💰 $${(v.priceMin / 1000).toFixed(1)}k-${(v.priceMax / 1000).toFixed(1)}k`
      }
      message += `\n${v.description.substring(0, 130)}...\n`
      if (v.matchReasons.length > 0) {
        message += `✨ ${v.matchReasons.join(' • ')}\n`
      }
      if (v.website) {
        message += `🔗 [Visit Website](${v.website})`
        if (v.phone) message += ` • 📞 ${v.phone}`
        message += '\n'
      }
      message += '\n'
    })
  }

  if (caterers.length > 0) {
    message += `## 🍽️ Caterers (${caterers.length})\n\n`
    caterers.forEach(v => {
      message += `**${v.name}**\n`
      message += `📍 ${v.location}`
      if (v.priceMin && v.priceMax) {
        message += ` • 💰 $${v.priceMin}-${v.priceMax}/person`
      }
      message += `\n${v.description.substring(0, 130)}...\n`
      if (v.matchReasons.length > 0) {
        message += `✨ ${v.matchReasons.join(' • ')}\n`
      }
      if (v.website) {
        message += `🔗 [Visit Website](${v.website})`
        if (v.phone) message += ` • 📞 ${v.phone}`
        message += '\n'
      }
      message += '\n'
    })
  }

  message += '\nWould you like me to reach out to any of these vendors on your behalf?'

  return message
}
