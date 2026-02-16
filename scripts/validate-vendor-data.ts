import { VendorCategory, VendorCapacity } from '@prisma/client'

interface VendorData {
  name: string
  email: string
  category: VendorCategory
  location: string
  description: string
  styles: string[]
  priceMin?: number
  priceMax?: number
  capacity?: VendorCapacity
  maxGuests?: number
  phone?: string
  website?: string
}

export function validateVendor(vendor: VendorData): string[] {
  const errors: string[] = []

  // Required fields
  if (!vendor.name) errors.push('Missing name')
  if (!vendor.email) errors.push('Missing email')
  if (!vendor.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push(`Invalid email format: ${vendor.email}`)
  }
  if (!vendor.category) errors.push('Missing category')
  if (!vendor.location) errors.push('Missing location')
  if (!vendor.description) errors.push('Missing description')

  // Description length
  if (vendor.description && vendor.description.length < 50) {
    errors.push(`Description too short (${vendor.description.length} chars, need 50+)`)
  }
  if (vendor.description && vendor.description.length > 500) {
    errors.push(`Description too long (${vendor.description.length} chars, max 500)`)
  }

  // Styles
  if (!vendor.styles || vendor.styles.length < 2) {
    errors.push('Need at least 2 style tags')
  }
  if (vendor.styles && vendor.styles.length > 6) {
    errors.push('Too many style tags (max 6)')
  }

  // Pricing validation
  if (vendor.priceMin && vendor.priceMax) {
    if (vendor.priceMin >= vendor.priceMax) {
      errors.push(
        `priceMin (${vendor.priceMin}) must be less than priceMax (${vendor.priceMax})`
      )
    }
  }

  // Capacity validation for venues and caterers
  if ((vendor.category === 'VENUE' || vendor.category === 'CATERING') && !vendor.capacity) {
    errors.push('VENUE and CATERING must have capacity')
  }

  if (vendor.capacity && vendor.maxGuests) {
    if (vendor.capacity === 'SMALL' && vendor.maxGuests >= 50) {
      errors.push('SMALL capacity should be < 50 guests')
    }
    if (vendor.capacity === 'MEDIUM' && (vendor.maxGuests < 50 || vendor.maxGuests >= 150)) {
      errors.push('MEDIUM capacity should be 50-150 guests')
    }
    if (vendor.capacity === 'LARGE' && vendor.maxGuests < 150) {
      errors.push('LARGE capacity should be 150+ guests')
    }
  }

  // Phone format (Australian)
  if (
    vendor.phone &&
    !vendor.phone.match(/^(0[2-8]\s?\d{4}\s?\d{4}|04\d{2}\s?\d{3}\s?\d{3})$/)
  ) {
    errors.push(`Phone format should be "02 XXXX XXXX" or "04XX XXX XXX": ${vendor.phone}`)
  }

  // Website URL
  if (vendor.website && !vendor.website.startsWith('https://') && !vendor.website.startsWith('http://')) {
    errors.push(`Website should start with https:// or http://: ${vendor.website}`)
  }

  return errors
}

export function validateVendorList(vendors: VendorData[]): boolean {
  console.log('🔍 Validating vendor data...\n')

  let hasErrors = false

  vendors.forEach((vendor, index) => {
    const errors = validateVendor(vendor)
    if (errors.length > 0) {
      hasErrors = true
      console.error(`❌ Vendor ${index + 1}: ${vendor.name}`)
      errors.forEach(err => console.error(`   - ${err}`))
      console.error('')
    }
  })

  if (!hasErrors) {
    console.log('✅ All vendors validated successfully!')
    return true
  } else {
    console.error('❌ Validation failed. Please fix errors before seeding.')
    return false
  }
}

export function getVendorSummary(vendors: VendorData[]): void {
  console.log('\n📊 Vendor Summary:')
  console.log(`   Total vendors: ${vendors.length}\n`)

  // By category
  const byCategory = vendors.reduce(
    (acc, v) => {
      acc[v.category] = (acc[v.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('   By Category:')
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`   • ${category}: ${count}`)
    })

  // By capacity
  const withCapacity = vendors.filter(v => v.capacity)
  if (withCapacity.length > 0) {
    const byCapacity = withCapacity.reduce(
      (acc, v) => {
        if (v.capacity) acc[v.capacity] = (acc[v.capacity] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    console.log('\n   By Capacity:')
    Object.entries(byCapacity).forEach(([capacity, count]) => {
      console.log(`   • ${capacity}: ${count}`)
    })
  }

  // Data completeness
  const withPhone = vendors.filter(v => v.phone).length
  const withWebsite = vendors.filter(v => v.website).length
  const withPricing = vendors.filter(v => v.priceMin && v.priceMax).length

  console.log('\n   Data Completeness:')
  console.log(`   • Phone: ${withPhone}/${vendors.length} (${Math.round((withPhone / vendors.length) * 100)}%)`)
  console.log(`   • Website: ${withWebsite}/${vendors.length} (${Math.round((withWebsite / vendors.length) * 100)}%)`)
  console.log(`   • Pricing: ${withPricing}/${vendors.length} (${Math.round((withPricing / vendors.length) * 100)}%)`)
}
