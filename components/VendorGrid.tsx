'use client'

import { Vendor, VendorCategory } from '@prisma/client'
import React, { useState } from 'react'

import { VendorCard } from './VendorCard'

interface VendorMatch {
  vendor: Vendor
  score: number
  reasons: string[]
}

interface VendorGridProps {
  matches: VendorMatch[]
  onContactSelected: (vendorIds: string[]) => void
}

export function VendorGrid({ matches, onContactSelected }: VendorGridProps) {
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set())

  const toggleVendor = (vendorId: string) => {
    setSelectedVendors(prev => {
      const next = new Set(prev)
      if (next.has(vendorId)) {
        next.delete(vendorId)
      } else {
        next.add(vendorId)
      }
      return next
    })
  }

  const selectAllInCategory = (category: VendorCategory) => {
    const categoryVendorIds = matches
      .filter(m => m.vendor.category === category)
      .map(m => m.vendor.id)

    setSelectedVendors(prev => {
      const next = new Set(prev)
      categoryVendorIds.forEach(id => next.add(id))
      return next
    })
  }

  const deselectAllInCategory = (category: VendorCategory) => {
    const categoryVendorIds = matches
      .filter(m => m.vendor.category === category)
      .map(m => m.vendor.id)

    setSelectedVendors(prev => {
      const next = new Set(prev)
      categoryVendorIds.forEach(id => next.delete(id))
      return next
    })
  }

  // Group matches by category
  const groupedMatches = matches.reduce(
    (acc, match) => {
      const category = match.vendor.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(match)
      return acc
    },
    {} as Record<VendorCategory, VendorMatch[]>
  )

  const categoryLabels: Record<VendorCategory, string> = {
    VENUE: 'Venues',
    PHOTOGRAPHER: 'Photographers',
    CATERING: 'Caterers',
    FLORIST: 'Florists',
    ENTERTAINMENT: 'Entertainment',
    MARQUEE: 'Marquee & Tents',
    OTHER: 'Other Services',
  }

  const categoryIcons: Record<VendorCategory, React.ReactElement> = {
    VENUE: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    PHOTOGRAPHER: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    CATERING: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    FLORIST: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    ENTERTAINMENT: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
    MARQUEE: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    OTHER: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    ),
  }

  return (
    <div className="space-y-12">
      {/* Header with selection counter */}
      {selectedVendors.size > 0 && (
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 -mx-6 px-6 py-4 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
                {selectedVendors.size}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedVendors.size} {selectedVendors.size === 1 ? 'vendor' : 'vendors'}{' '}
                  selected
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-light">
                  Ready to send personalized inquiries
                </div>
              </div>
            </div>

            <button
              onClick={() => onContactSelected(Array.from(selectedVendors))}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative px-6 py-3 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Contact Selected Vendors</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Grouped by category */}
      {Object.entries(groupedMatches).map(([category, categoryMatches]) => {
        const categoryKey = category as VendorCategory
        const selectedInCategory = categoryMatches.filter(m =>
          selectedVendors.has(m.vendor.id)
        ).length
        const allSelectedInCategory = selectedInCategory === categoryMatches.length

        return (
          <div key={category} className="animate-fadeIn">
            {/* Category header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 dark:from-rose-900/30 to-pink-100 dark:to-pink-900/30 flex items-center justify-center text-rose-500">
                  {categoryIcons[categoryKey]}
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-medium text-gray-900 dark:text-white">
                    {categoryLabels[categoryKey]}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                    {categoryMatches.length} {categoryMatches.length === 1 ? 'match' : 'matches'}{' '}
                    found
                    {selectedInCategory > 0 && ` · ${selectedInCategory} selected`}
                  </p>
                </div>
              </div>

              {/* Category selection controls */}
              <div className="flex items-center gap-2">
                {allSelectedInCategory ? (
                  <button
                    onClick={() => deselectAllInCategory(categoryKey)}
                    className="px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                  >
                    Deselect All
                  </button>
                ) : (
                  <button
                    onClick={() => selectAllInCategory(categoryKey)}
                    className="px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                  >
                    Select All
                  </button>
                )}
              </div>
            </div>

            {/* Vendor grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryMatches.map(match => (
                <VendorCard
                  key={match.vendor.id}
                  vendor={match.vendor}
                  isSelected={selectedVendors.has(match.vendor.id)}
                  onToggleSelect={toggleVendor}
                  matchScore={match.score}
                  matchReasons={match.reasons}
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* Empty state */}
      {matches.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 dark:from-rose-900/30 to-pink-100 dark:to-pink-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-rose-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-2">No vendors found</h3>
          <p className="text-gray-600 dark:text-gray-300 font-light">Try adjusting your search criteria or budget</p>
        </div>
      )}
    </div>
  )
}
