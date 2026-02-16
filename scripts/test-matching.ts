import { findMatchingVendors } from '../lib/vendor-matching'

async function main() {
  console.log('🧪 Testing Vendor Matching Algorithm\n')

  // Test with Sydney (current user's selection)
  console.log('=== Test 1: Sydney ===')
  const sydneyMatches = await findMatchingVendors({
    location: 'Sydney',
    guestCount: 75,
    budgetTotal: 4000000, // $40,000 in cents
    style: 'Rustic',
  })

  console.log(`Total matches: ${sydneyMatches.totalMatches}`)
  console.log(`Venues: ${sydneyMatches.venues.length}`)
  console.log(`Photographers: ${sydneyMatches.photographers.length}`)
  console.log(`Caterers: ${sydneyMatches.caterers.length}\n`)

  // Test with Newcastle (where we have 17 vendors)
  console.log('=== Test 2: Newcastle ===')
  const newcastleMatches = await findMatchingVendors({
    location: 'Newcastle',
    guestCount: 75,
    budgetTotal: 4000000,
    style: 'Rustic',
  })

  console.log(`Total matches: ${newcastleMatches.totalMatches}`)
  console.log(`Venues: ${newcastleMatches.venues.length}`)
  console.log(`Photographers: ${newcastleMatches.photographers.length}`)
  console.log(`Caterers: ${newcastleMatches.caterers.length}`)

  if (newcastleMatches.venues.length > 0) {
    console.log('\nTop Newcastle Venue:')
    const topVenue = newcastleMatches.venues[0]
    console.log(`  ${topVenue.name} - Score: ${topVenue.matchScore}`)
    console.log(`  Reasons: ${topVenue.matchReasons.join(', ')}`)
  }

  // Test with Hunter Valley (where we have 25 vendors)
  console.log('\n=== Test 3: Hunter Valley ===')
  const hunterValleyMatches = await findMatchingVendors({
    location: 'Hunter Valley',
    guestCount: 75,
    budgetTotal: 4000000,
    style: 'Rustic',
  })

  console.log(`Total matches: ${hunterValleyMatches.totalMatches}`)
  console.log(`Venues: ${hunterValleyMatches.venues.length}`)
  console.log(`Photographers: ${hunterValleyMatches.photographers.length}`)
  console.log(`Caterers: ${hunterValleyMatches.caterers.length}`)

  if (hunterValleyMatches.venues.length > 0) {
    console.log('\nTop Hunter Valley Venue:')
    const topVenue = hunterValleyMatches.venues[0]
    console.log(`  ${topVenue.name} - Score: ${topVenue.matchScore}`)
    console.log(`  Reasons: ${topVenue.matchReasons.join(', ')}`)
  }
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
