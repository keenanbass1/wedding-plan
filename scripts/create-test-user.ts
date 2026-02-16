import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Creating test user...\n')

  // Check if test user already exists
  const existing = await prisma.user.findUnique({
    where: { email: 'test@wedding.com' },
  })

  if (existing) {
    console.log('✅ Test user already exists!')
    console.log(`   Email: test@wedding.com`)
    console.log(`   ID: ${existing.id}`)
    console.log(`   Auth ID: ${existing.authId}\n`)

    // Check for wedding
    const wedding = await prisma.wedding.findFirst({
      where: { userId: existing.id },
    })

    if (wedding) {
      console.log('✅ Test wedding exists!')
      console.log(`   Location: ${wedding.location}`)
      console.log(`   Guest Count: ${wedding.guestCount}`)
      console.log(`   Budget: $${wedding.budgetTotal ? (wedding.budgetTotal / 100).toLocaleString() : 'N/A'}`)
    } else {
      console.log('⚠️  No wedding data for test user')
      console.log('   Create one at: /questionnaire\n')
    }

    return
  }

  // Create test user with a fake Supabase auth ID
  const testUser = await prisma.user.create({
    data: {
      email: 'test@wedding.com',
      name: 'Test User',
      authId: 'test-auth-id-' + Date.now(), // Fake Supabase ID for testing
    },
  })

  console.log('✅ Test user created!')
  console.log(`   Email: test@wedding.com`)
  console.log(`   ID: ${testUser.id}`)
  console.log(`   Auth ID: ${testUser.authId}\n`)

  // Create test wedding
  const testWedding = await prisma.wedding.create({
    data: {
      userId: testUser.id,
      weddingDate: new Date('2027-06-15'),
      location: 'Hunter Valley',
      guestCount: 100,
      budgetTotal: 6000000, // $60,000 in cents
      style: 'Rustic',
      chatCompleted: true,
      status: 'MATCHING',
    },
  })

  console.log('✅ Test wedding created!')
  console.log(`   Location: ${testWedding.location}`)
  console.log(`   Date: ${testWedding.weddingDate?.toLocaleDateString()}`)
  console.log(`   Guests: ${testWedding.guestCount}`)
  console.log(`   Budget: $${testWedding.budgetTotal ? (testWedding.budgetTotal / 100).toLocaleString() : 'N/A'}`)
  console.log(`   Style: ${testWedding.style}\n`)

  console.log('🎉 Test data ready!')
  console.log('\n📝 To use:')
  console.log('   1. This is a DATABASE-ONLY test user')
  console.log('   2. You can view data in Prisma Studio: npm run db:studio')
  console.log('   3. For actual login, use Google OAuth or email signup')
  console.log('   4. Then complete the questionnaire at /questionnaire\n')
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
