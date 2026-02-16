import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error_code = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  const redirect = requestUrl.searchParams.get('redirect') || '/dashboard'

  // Log all incoming params for debugging
  console.log('=== OAUTH CALLBACK DEBUG ===')
  console.log('Full URL:', request.url)
  console.log('Code present:', !!code)
  console.log('Error code:', error_code)
  console.log('Error description:', error_description)
  console.log('Redirect param:', redirect)
  console.log('All search params:', Object.fromEntries(requestUrl.searchParams))

  // Handle OAuth errors from provider
  if (error_code) {
    console.error('OAuth error from provider:', error_code, error_description)
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent(error_description || error_code)}`,
        request.url
      )
    )
  }

  // Handle missing code
  if (!code) {
    console.error('MISSING CODE - redirecting to login with error')
    return NextResponse.redirect(
      new URL('/auth/login?error=No authorization code received', request.url)
    )
  }

  console.log('Code received, attempting exchange...')

  // Exchange code for session
  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('CODE EXCHANGE FAILED:', error.message, error)
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url)
    )
  }

  if (!data.session) {
    console.error('NO SESSION after code exchange')
    return NextResponse.redirect(new URL('/auth/login?error=Failed to create session', request.url))
  }

  console.log('Session created successfully for user:', data.user?.email)

  // Sync user to database
  try {
    console.log('Syncing user to database...')
    const syncResponse = await fetch(`${requestUrl.origin}/api/auth/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('Sync response status:', syncResponse.status)
  } catch (err) {
    console.error('Failed to sync user:', err)
    // Don't fail the login just because sync failed
  }

  console.log('Redirecting to:', redirect)
  console.log('=== END OAUTH CALLBACK DEBUG ===')

  // Redirect to the specified page or dashboard
  return NextResponse.redirect(new URL(redirect, request.url))
}
