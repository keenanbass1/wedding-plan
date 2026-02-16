import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error_code = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  const redirect = requestUrl.searchParams.get('redirect') || '/dashboard'

  // Handle OAuth errors from provider
  if (error_code) {
    console.error('OAuth error:', error_code, error_description)
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent(error_description || error_code)}`,
        request.url
      )
    )
  }

  // Handle missing code
  if (!code) {
    console.error('No code parameter in callback')
    return NextResponse.redirect(
      new URL('/auth/login?error=No authorization code received', request.url)
    )
  }

  // Exchange code for session
  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Code exchange error:', error)
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url)
    )
  }

  if (!data.session) {
    console.error('No session after code exchange')
    return NextResponse.redirect(new URL('/auth/login?error=Failed to create session', request.url))
  }

  // Sync user to database
  try {
    await fetch(`${requestUrl.origin}/api/auth/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('Failed to sync user:', err)
    // Don't fail the login just because sync failed
  }

  // Redirect to the specified page or dashboard
  return NextResponse.redirect(new URL(redirect, request.url))
}
