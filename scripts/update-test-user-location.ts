import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Updating test user wedding location to Newcastle...\n')

  const testUser = await prisma.user.findUnique({
    where: { email: 'test@streamwedding.com' },
    include: { weddings: true },
  })

  if (!testUser || testUser.weddings.length === 0) {
    console.log('❌ No wedding found for test user')
    return
  }

  const wedding = testUser.weddings[0]

  console.log('Current wedding data:')
  console.log(`  Location: ${wedding.location}`)
  console.log(`  Guest Count: ${wedding.guestCount}`)
  console.log(`  Budget: $${wedding.budgetTotal ? wedding.budgetTotal / 100 : 'N/A'}`)
  console.log(`  Style: ${wedding.style}\n`)

  // Update to Newcastle
  const updated = await prisma.wedding.update({
    where: { id: wedding.id },
    data: {
      location: 'Newcastle',
    },
  })

  console.log('✅ Updated wedding location to Newcastle')
  console.log(`\nNow when you chat, you should see:`)
  console.log(`  • 5 venues (Caves Coastal, Noah's on the Beach, etc.)`)
  console.log(`  • 5 photographers`)
  console.log(`  • 5 caterers`)
  console.log(`  • 17 total matches\n`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
