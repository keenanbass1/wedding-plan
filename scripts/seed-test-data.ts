// Seed test data
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Seeding test data...\n')

  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  })
  console.log('✅ Created test user:', user.email)

  // Create test wedding
  const wedding = await prisma.wedding.create({
    data: {
      userId: user.id,
      weddingDate: new Date('2027-10-15'),
      dateFlexible: true,
      location: 'Blue Mountains, NSW',
      guestCount: 100,
      budgetTotal: 4500000, // $45,000 in cents
      budgetVenue: 1500000,
      budgetCatering: 1000000,
      budgetPhotography: 500000,
      style: 'Rustic outdoor',
      mustHaves: ['Outdoor ceremony', 'Mountain views', 'Indoor backup'],
      dealBreakers: ['No highway noise'],
      dietaryNeeds: ['Vegetarian options', 'Gluten-free available'],
      status: 'INTAKE',
    },
  })
  console.log('✅ Created test wedding:', wedding.location)

  // Create test vendors
  const venues = [
    {
      businessName: 'Blue Mountains Estate',
      category: 'VENUE',
      email: 'bookings@bluemountainsestate.com.au',
      phone: '02 4782 1234',
      website: 'https://bluemountainsestate.com.au',
      suburb: 'Leura',
      state: 'NSW',
      priceRange: 'PREMIUM',
      capacity: 150,
      servicesOffered: ['Ceremony space', 'Reception hall', 'Outdoor gardens', 'Accommodation'],
      verified: true,
    },
    {
      businessName: 'Scenic Hills Vineyard',
      category: 'VENUE',
      email: 'events@scenichills.com.au',
      phone: '02 4787 5678',
      website: 'https://scenichills.com.au',
      suburb: 'Katoomba',
      state: 'NSW',
      priceRange: 'LUXURY',
      capacity: 120,
      servicesOffered: ['Vineyard ceremony', 'Cellar door reception', 'Wine tasting'],
      verified: true,
    },
    {
      businessName: 'Mountain View Photography',
      category: 'PHOTOGRAPHER',
      email: 'info@mountainviewphoto.com.au',
      phone: '0412 345 678',
      website: 'https://mountainviewphoto.com.au',
      suburb: 'Blue Mountains',
      state: 'NSW',
      priceRange: 'MODERATE',
      servicesOffered: ['Full day coverage', 'Engagement shoot', 'Albums'],
      verified: true,
    },
  ]

  for (const venueData of venues) {
    const vendor = await prisma.vendor.create({
      data: venueData as any,
    })
    console.log(`✅ Created vendor: ${vendor.businessName} (${vendor.category})`)
  }

  console.log('\n✨ Test data seeded successfully!')
  console.log('\n📊 Summary:')
  console.log('   1 test user')
  console.log('   1 test wedding')
  console.log('   3 test vendors (2 venues, 1 photographer)')
  console.log('\n💡 Run "npm run db:studio" to view the data')
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
