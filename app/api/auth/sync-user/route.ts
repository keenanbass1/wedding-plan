import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createClient()

    // Get the current authenticated user from Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Check if user exists in our database
    let dbUser = await prisma.user.findUnique({
      where: { authId: user.id },
    })

    if (!dbUser) {
      // Create new user in our database
      dbUser = await prisma.user.create({
        data: {
          authId: user.id,
          email: user.email!,
          name: user.user_metadata?.full_name || null,
        },
      })
    } else {
      // Update existing user (in case email or name changed)
      dbUser = await prisma.user.update({
        where: { authId: user.id },
        data: {
          email: user.email!,
          name: user.user_metadata?.full_name || dbUser.name,
        },
      })
    }

    return NextResponse.json({ user: dbUser })
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 })
  }
}
