import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Debugging Vendor Matching Issue\n')

  // 1. Check how many vendors exist
  const totalVendors = await prisma.vendor.count()
  console.log(`📊 Total vendors in database: ${totalVendors}`)

  // 2. Group vendors by location
  const vendors = await prisma.vendor.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      location: true,
      region: true,
      suburb: true,
    },
  })

  const locationGroups = vendors.reduce((acc, vendor) => {
    const key = vendor.location || 'NO_LOCATION'
    if (!acc[key]) acc[key] = []
    acc[key].push(vendor)
    return acc
  }, {} as Record<string, typeof vendors>)

  console.log('\n📍 Vendors by Location:')
  Object.entries(locationGroups).forEach(([location, vendorList]) => {
    console.log(`  ${location}: ${vendorList.length} vendors`)
    vendorList.forEach((v) => {
      console.log(`    - ${v.name} (${v.category})`)
    })
  })

  // 3. Check test user's wedding data
  const testUser = await prisma.user.findUnique({
    where: { email: 'test@weddingplanai.com' },
    include: {
      weddings: true,
    },
  })

  if (testUser && testUser.weddings.length > 0) {
    const wedding = testUser.weddings[0]
    console.log('\n👰 Test User Wedding Preferences:')
    console.log(`  Location: ${wedding.location}`)
    console.log(`  Budget Total: $${wedding.budgetTotal ? wedding.budgetTotal / 100 : 'N/A'}`)
    console.log(`  Guest Count: ${wedding.guestCount}`)
    console.log(`  Style: ${wedding.style}`)
    console.log(`  Wedding Date: ${wedding.weddingDate}`)
    console.log(`  Date Flexible: ${wedding.dateFlexible}`)
    console.log(`  Status: ${wedding.status}`)
  } else {
    console.log('\n⚠️  No wedding found for test user')
  }

  // 4. Sample a few vendors to see their full data
  console.log('\n📋 Sample Vendor Data (first 3):')
  const sampleVendors = await prisma.vendor.findMany({
    take: 3,
    select: {
      name: true,
      category: true,
      location: true,
      region: true,
      suburb: true,
      priceMin: true,
      priceMax: true,
      maxGuests: true,
      styles: true,
    },
  })

  sampleVendors.forEach((v) => {
    console.log(`\n  ${v.name}:`)
    console.log(`    Category: ${v.category}`)
    console.log(`    Location: ${v.location}`)
    console.log(`    Region: ${v.region}`)
    console.log(`    Suburb: ${v.suburb}`)
    console.log(`    Price: $${v.priceMin} - $${v.priceMax}`)
    console.log(`    Max Guests: ${v.maxGuests}`)
    console.log(`    Styles: ${v.styles.join(', ')}`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
