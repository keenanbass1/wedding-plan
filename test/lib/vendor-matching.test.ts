import { describe, it, expect } from 'vitest'
import { Vendor } from '@prisma/client'

import { formatVendorMatchesForChat, VendorMatch, VendorMatches } from '@/lib/vendor-matching'

// Helper to create a mock vendor
function createMockVendor(overrides: Partial<Vendor> = {}): Vendor {
  return {
    id: 'vendor-1',
    name: 'Test Vendor',
    slug: 'test-vendor',
    category: 'VENUE',
    description: 'A beautiful venue for weddings with garden and indoor areas.',
    location: 'Sydney',
    region: 'Greater Sydney',
    suburb: 'Darlinghurst',
    address: '123 Test St',
    phone: '0400000000',
    email: 'test@vendor.com',
    website: 'https://testvendor.com',
    instagram: null,
    facebook: null,
    priceMin: 10000,
    priceMax: 25000,
    priceUnit: 'event',
    capacity: 'MEDIUM',
    maxGuests: 150,
    rating: 4.8,
    reviewCount: 50,
    styles: ['Modern', 'Classic'],
    servicesOffered: ['Ceremony', 'Reception', 'Photography'],
    dietaryOptions: ['Vegetarian', 'Vegan'],
    mustHaves: [],
    amenities: [],
    leadTimeDays: 90,
    isActive: true,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

function createMockMatch(overrides: Partial<VendorMatch> = {}): VendorMatch {
  return {
    ...createMockVendor(),
    matchScore: 80,
    matchReasons: ['Located in Sydney', 'Within your budget'],
    ...overrides,
  }
}

describe('formatVendorMatchesForChat', () => {
  it('formats matches with all vendor categories', () => {
    const matches: VendorMatches = {
      venues: [createMockMatch({ name: 'Garden Venue', category: 'VENUE', maxGuests: 200 })],
      photographers: [createMockMatch({ name: 'Photo Pro', category: 'PHOTOGRAPHER', maxGuests: null })],
      caterers: [createMockMatch({ name: 'Fine Dining', category: 'CATERING', maxGuests: null })],
      totalMatches: 3,
    }

    const result = formatVendorMatchesForChat(matches)

    expect(result).toContain('3 vendors')
    expect(result).toContain('Garden Venue')
    expect(result).toContain('Photo Pro')
    expect(result).toContain('Fine Dining')
    expect(result).toContain('Venues (1)')
    expect(result).toContain('Photographers (1)')
    expect(result).toContain('Caterers (1)')
  })

  it('includes vendor details in formatting', () => {
    const matches: VendorMatches = {
      venues: [createMockMatch({
        name: 'Grand Hall',
        location: 'Newcastle',
        maxGuests: 300,
        priceMin: 15000,
        priceMax: 30000,
        website: 'https://grandhall.com',
        phone: '0400111222',
        matchReasons: ['Located in Newcastle', 'Highly rated (4.9/5.0)'],
      })],
      photographers: [],
      caterers: [],
      totalMatches: 1,
    }

    const result = formatVendorMatchesForChat(matches)

    expect(result).toContain('Grand Hall')
    expect(result).toContain('Newcastle')
    expect(result).toContain('300 guests')
    expect(result).toContain('15k-30k')
    expect(result).toContain('https://grandhall.com')
    expect(result).toContain('0400111222')
    expect(result).toContain('Located in Newcastle')
    expect(result).toContain('Highly rated (4.9/5.0)')
  })

  it('omits empty categories', () => {
    const matches: VendorMatches = {
      venues: [createMockMatch({ name: 'Only Venue' })],
      photographers: [],
      caterers: [],
      totalMatches: 1,
    }

    const result = formatVendorMatchesForChat(matches)

    expect(result).toContain('Venues')
    expect(result).not.toContain('Photographers')
    expect(result).not.toContain('Caterers')
  })

  it('includes call to action at the end', () => {
    const matches: VendorMatches = {
      venues: [],
      photographers: [],
      caterers: [],
      totalMatches: 0,
    }

    const result = formatVendorMatchesForChat(matches)
    expect(result).toContain('Would you like me to reach out')
  })

  it('handles vendors with no website', () => {
    const matches: VendorMatches = {
      venues: [createMockMatch({ website: null, phone: null })],
      photographers: [],
      caterers: [],
      totalMatches: 1,
    }

    const result = formatVendorMatchesForChat(matches)
    expect(result).not.toContain('Visit Website')
  })
})
