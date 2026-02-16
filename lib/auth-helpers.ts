import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export interface AuthenticatedUser {
  supabaseUser: {
    id: string
    email?: string
  }
  dbUser: {
    id: string
    email: string
    authId: string
  }
}

/**
 * Get authenticated user from Supabase session
 * Returns null if not authenticated
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    // Get database user
    const dbUser = await prisma.user.findUnique({
      where: { authId: user.id },
    })

    if (!dbUser) {
      return null
    }

    return {
      supabaseUser: {
        id: user.id,
        email: user.email,
      },
      dbUser: {
        id: dbUser.id,
        email: dbUser.email,
        authId: dbUser.authId,
      },
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

/**
 * Require authentication for API routes
 * Returns authenticated user or 401 response
 */
export async function requireAuth(
  req: NextRequest
): Promise<{ user: AuthenticatedUser } | NextResponse> {
  const user = await getAuthenticatedUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return { user }
}

/**
 * Validate redirect URL to prevent open redirect vulnerabilities
 * Only allows relative paths starting with /
 */
export function validateRedirectUrl(redirect: string | null, defaultPath = '/dashboard'): string {
  if (!redirect) {
    return defaultPath
  }

  // Only allow relative paths
  if (!redirect.startsWith('/')) {
    return defaultPath
  }

  // Prevent protocol-relative URLs (//evil.com)
  if (redirect.startsWith('//')) {
    return defaultPath
  }

  // Prevent data/javascript URLs
  if (redirect.includes(':')) {
    return defaultPath
  }

  return redirect
}
