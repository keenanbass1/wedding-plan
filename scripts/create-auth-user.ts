import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Creating authenticated test user...\n')

  // Create Supabase admin client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseServiceKey) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.local')
    console.log('\nGet it from: https://supabase.com/dashboard/project/vagxoaocuphgwwzritds/settings/api')
    console.log('Add to .env.local as: SUPABASE_SERVICE_ROLE_KEY="..."')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const testEmail = 'test@weddingplanai.com'
  const testPassword = 'TestPassword123!'

  console.log('Creating user in Supabase Auth...')

  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true, // Auto-confirm email so they can log in immediately
  })

  if (authError) {
    if (authError.message.includes('already been registered')) {
      console.log('⚠️  User already exists in Supabase Auth')

      // Get existing user
      const { data: users } = await supabase.auth.admin.listUsers()
      const existingUser = users?.users.find(u => u.email === testEmail)

      if (existingUser) {
        console.log(`   Auth ID: ${existingUser.id}`)

        // Check if user exists in database
        const dbUser = await prisma.user.findUnique({
          where: { authId: existingUser.id },
          include: { weddings: true },
        })

        if (dbUser) {
          console.log('\n✅ User exists in database')
          console.log(`   Database ID: ${dbUser.id}`)
          console.log(`   Weddings: ${dbUser.weddings.length}`)
        } else {
          console.log('\n⚠️  User not in database, creating...')
          await prisma.user.create({
            data: {
              email: testEmail,
              name: 'Test User',
              authId: existingUser.id,
            },
          })
          console.log('✅ User created in database')
        }
      }
    } else {
      console.error('❌ Error creating user in Supabase:', authError.message)
      process.exit(1)
    }
  } else {
    console.log('✅ User created in Supabase Auth')
    console.log(`   Auth ID: ${authData.user.id}`)

    // Create user in database
    console.log('\nCreating user in database...')
    const dbUser = await prisma.user.create({
      data: {
        email: testEmail,
        name: 'Test User',
        authId: authData.user.id,
      },
    })

    console.log('✅ User created in database')
    console.log(`   Database ID: ${dbUser.id}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log('🎉 TEST USER READY!')
  console.log('='.repeat(60))
  console.log('\n📧 Email:    test@weddingplanai.com')
  console.log('🔑 Password: TestPassword123!')
  console.log('\n📝 To use:')
  console.log('   1. Go to: https://wedding-plan-lime.vercel.app/auth/login')
  console.log('   2. Enter the email and password above')
  console.log('   3. Click "Sign In"')
  console.log('   4. You should be logged in!')
  console.log('\n✨ Now you can test everything without Google OAuth!\n')
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
