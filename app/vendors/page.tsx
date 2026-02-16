import Link from 'next/link'
import { redirect } from 'next/navigation'

import Header from '@/components/Header'
import { VendorGrid } from '@/components/VendorGrid'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { findMatchingVendors } from '@/lib/vendor-matching'

export default async function VendorsPage() {
  // Check authentication
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirect=/vendors')
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { authId: user.id },
    include: {
      weddings: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  if (!dbUser || dbUser.weddings.length === 0) {
    redirect('/questionnaire')
  }

  const wedding = dbUser.weddings[0]

  // Find matching vendors
  const matches = await findMatchingVendors({
    location: wedding.location || '',
    guestCount: wedding.guestCount || undefined,
    budgetTotal: wedding.budgetTotal || undefined,
    style: wedding.style || undefined,
    preferences: wedding.mustHaves,
  })

  // Flatten all matches into a single array with proper structure
  const allMatches = [
    ...matches.venues.map(v => ({
      vendor: v,
      score: v.matchScore,
      reasons: v.matchReasons,
    })),
    ...matches.photographers.map(v => ({
      vendor: v,
      score: v.matchScore,
      reasons: v.matchReasons,
    })),
    ...matches.caterers.map(v => ({
      vendor: v,
      score: v.matchScore,
      reasons: v.matchReasons,
    })),
  ]

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950">
      <Header />
      {/* Elegant background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/20 dark:from-rose-900/20 dark:to-pink-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/20 dark:from-purple-900/20 dark:to-pink-900/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.03)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.03)_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-rose-500 transition-colors duration-300 group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-sm font-light tracking-wide">Back to Dashboard</span>
              </Link>

              <Link
                href="/dashboard"
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:underline transition-colors"
              >
                View Dashboard
              </Link>
            </div>

            {/* Decorative header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
              <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300" />
            </div>

            <h1 className="text-5xl font-serif font-light tracking-tight mb-4">
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Your Perfect Matches
              </span>
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-light">{wedding.location}</span>
              </div>
              {wedding.guestCount && (
                <>
                  <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-light">{wedding.guestCount} guests</span>
                  </div>
                </>
              )}
              {wedding.style && (
                <>
                  <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-pink-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                    <span className="font-light capitalize">{wedding.style} style</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <VendorGrid
            matches={allMatches}
            onContactSelected={async (vendorIds: string[]) => {
              'use server'
              // This will be implemented in Phase 3
              // For now, we'll just redirect to a preview page
              redirect(`/outreach/preview?wedding=${wedding.id}&vendors=${vendorIds.join(',')}`)
            }}
          />
        </div>
      </div>
    </main>
  )
}
