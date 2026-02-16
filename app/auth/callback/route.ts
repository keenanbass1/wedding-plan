import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { validateRedirectUrl } from '@/lib/auth-helpers'
import { createClient } from '@/lib/supabase/server'

const isDevelopment = process.env.NODE_ENV === 'development'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error_code = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  const redirectParam = requestUrl.searchParams.get('redirect')

  // Validate and sanitize redirect URL to prevent open redirect attacks
  const redirect = validateRedirectUrl(redirectParam, '/dashboard')

  // Handle OAuth errors from provider
  if (error_code) {
    if (isDevelopment) {
      console.error('OAuth error:', error_code)
    }
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent(error_description || error_code)}`,
        request.url
      )
    )
  }

  // Handle missing code
  if (!code) {
    return NextResponse.redirect(
      new URL('/auth/login?error=No authorization code received', request.url)
    )
  }

  // Exchange code for session
  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    if (isDevelopment) {
      console.error('Code exchange failed:', error.message)
    }
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url)
    )
  }

  if (!data.session) {
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
    if (isDevelopment) {
      console.error('Failed to sync user:', err)
    }
    // Don't fail the login just because sync failed
  }

  // Redirect to the validated URL
  return NextResponse.redirect(new URL(redirect, request.url))
}
