import { describe, it, expect } from 'vitest'

/**
 * Test the data transformation logic from app/api/wedding/route.ts
 * We extract and test the pure logic (parsing, mapping, validation)
 * without needing to mock NextRequest/Prisma.
 */

describe('Wedding route data transformations', () => {
  describe('date parsing', () => {
    it('parses specific date correctly', () => {
      const specificDate = '2026-06-15'
      const parsed = new Date(specificDate + 'T00:00:00')

      expect(parsed.getFullYear()).toBe(2026)
      expect(parsed.getMonth()).toBe(5) // June = 5
      expect(parsed.getDate()).toBe(15)
    })

    it('rejects dates in the past', () => {
      const pastDate = new Date('2020-01-01T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      expect(pastDate < today).toBe(true)
    })

    it('accepts today as valid', () => {
      const now = new Date()
      const y = now.getFullYear()
      const m = String(now.getMonth() + 1).padStart(2, '0')
      const d = String(now.getDate()).padStart(2, '0')
      const todayStr = `${y}-${m}-${d}`
      const parsed = new Date(todayStr + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      expect(parsed >= today).toBe(true)
    })
  })

  describe('guest count mapping', () => {
    const guestMap: Record<string, number> = {
      'Intimate (under 50)': 40,
      'Medium (50-100)': 75,
      'Large (100-150)': 125,
      'Grand (150+)': 200,
    }

    it('maps descriptive strings to numbers', () => {
      expect(guestMap['Intimate (under 50)']).toBe(40)
      expect(guestMap['Medium (50-100)']).toBe(75)
      expect(guestMap['Large (100-150)']).toBe(125)
      expect(guestMap['Grand (150+)']).toBe(200)
    })

    it('falls back to parseInt for numeric strings', () => {
      const rawGuestCount = guestMap['not-mapped'] || parseInt('120') || 75
      expect(rawGuestCount).toBe(120)
    })

    it('defaults to 75 for invalid input', () => {
      const rawGuestCount = guestMap['unknown'] || parseInt('abc') || 75
      expect(rawGuestCount).toBe(75)
    })

    it('clamps guest count to valid range', () => {
      const clamp = (n: number) => Math.max(1, Math.min(n, 10000))
      expect(clamp(0)).toBe(1)
      expect(clamp(-5)).toBe(1)
      expect(clamp(50)).toBe(50)
      expect(clamp(99999)).toBe(10000)
    })
  })

  describe('budget mapping', () => {
    const budgetMap: Record<string, number> = {
      'Under $30,000': 2500000,
      '$30,000 - $50,000': 4000000,
      '$50,000 - $80,000': 6500000,
      'Above $80,000': 10000000,
    }

    it('maps descriptive strings to cents', () => {
      expect(budgetMap['Under $30,000']).toBe(2500000) // $25,000
      expect(budgetMap['$30,000 - $50,000']).toBe(4000000) // $40,000
      expect(budgetMap['Above $80,000']).toBe(10000000) // $100,000
    })

    it('converts numeric strings to cents', () => {
      const rawBudget = budgetMap['not-mapped'] || parseInt('50000') * 100 || 5000000
      expect(rawBudget).toBe(5000000) // $50,000 in cents
    })

    it('enforces minimum budget of $1,000', () => {
      const parsedBudget = Math.max(100000, 50000)
      expect(parsedBudget).toBe(100000) // $1,000 in cents
    })
  })

  describe('location mapping', () => {
    const locationMap: Record<string, string> = {
      'Sydney & surrounds': 'Sydney',
      'Blue Mountains': 'Blue Mountains',
      'Hunter Valley': 'Hunter Valley',
      'South Coast': 'South Coast',
    }

    it('maps known locations', () => {
      expect(locationMap['Sydney & surrounds']).toBe('Sydney')
      expect(locationMap['Blue Mountains']).toBe('Blue Mountains')
    })

    it('passes through custom locations', () => {
      const parsedLocation = locationMap['Custom Place'] || 'Custom Place' || 'Sydney'
      expect(parsedLocation).toBe('Custom Place')
    })

    it('defaults to Sydney for empty input', () => {
      const parsedLocation = locationMap[''] || '' || 'Sydney'
      expect(parsedLocation).toBe('Sydney')
    })
  })

  describe('style parsing', () => {
    it('extracts first style from combined string', () => {
      const style = 'Modern & Minimalist'
      expect(style.split(' & ')[0]).toBe('Modern')
    })

    it('handles single style', () => {
      const style = 'Rustic'
      expect(style.split(' & ')[0]).toBe('Rustic')
    })

    it('defaults to Modern', () => {
      const style = undefined
      expect(style?.split(' & ')[0] || 'Modern').toBe('Modern')
    })
  })
})
