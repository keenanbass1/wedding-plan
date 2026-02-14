// Quick database connection test
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...')

    // Test basic query
    await prisma.$queryRaw`SELECT 1 as result`
    console.log('✅ Database connection successful!')

    // Count tables
    const users = await prisma.user.count()
    const weddings = await prisma.wedding.count()
    const vendors = await prisma.vendor.count()

    console.log('\n📊 Database Status:')
    console.log(`   Users: ${users}`)
    console.log(`   Weddings: ${weddings}`)
    console.log(`   Vendors: ${vendors}`)

    console.log('\n✨ All systems operational!')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
