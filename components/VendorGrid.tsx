'use client'

import { PriceRange, Vendor, VendorCategory } from '@prisma/client'
import React, { useEffect, useMemo, useRef, useState } from 'react'

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

type SortOption = 'score' | 'price-asc' | 'price-desc' | 'rating'

const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  BUDGET: '$',
  MODERATE: '$$',
  PREMIUM: '$$$',
  LUXURY: '$$$$',
}

const PRICE_RANGE_ORDER: PriceRange[] = ['BUDGET', 'MODERATE', 'PREMIUM', 'LUXURY']

export function VendorGrid({ matches, onContactSelected }: VendorGridProps) {
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set())

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState<Set<VendorCategory>>(new Set())
  const [styleFilter, setStyleFilter] = useState<Set<string>>(new Set())
  const [priceFilter, setPriceFilter] = useState<Set<PriceRange>>(new Set())
  const [sortBy, setSortBy] = useState<SortOption>('score')
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false)
  const styleDropdownRef = useRef<HTMLDivElement>(null)

  // Derive available filter options from data
  const availableCategories = useMemo(
    () => [...new Set(matches.map(m => m.vendor.category))],
    [matches]
  )
  const availableStyles = useMemo(
    () => [...new Set(matches.flatMap(m => m.vendor.styles))].sort(),
    [matches]
  )
  const availablePriceRanges = useMemo(
    () =>
      PRICE_RANGE_ORDER.filter(pr =>
        matches.some(m => m.vendor.priceRange === pr)
      ),
    [matches]
  )

  const hasActiveFilters = categoryFilter.size > 0 || styleFilter.size > 0 || priceFilter.size > 0

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(event.target as Node)) {
        setStyleDropdownOpen(false)
      }
    }

    if (styleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [styleDropdownOpen])

  // Apply filters and sort
  const filteredMatches = useMemo(() => {
    let result = matches.filter(m => {
      if (categoryFilter.size > 0 && !categoryFilter.has(m.vendor.category)) return false
      if (styleFilter.size > 0 && !m.vendor.styles.some(s => styleFilter.has(s))) return false
      if (priceFilter.size > 0 && (!m.vendor.priceRange || !priceFilter.has(m.vendor.priceRange)))
        return false
      return true
    })

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.vendor.priceMin || 0) - (b.vendor.priceMin || 0)
        case 'price-desc':
          return (b.vendor.priceMin || 0) - (a.vendor.priceMin || 0)
        case 'rating':
          return (b.vendor.rating || 0) - (a.vendor.rating || 0)
        default:
          return b.score - a.score
      }
    })

    return result
  }, [matches, categoryFilter, styleFilter, priceFilter, sortBy])

  // Toggle helpers
  const toggleSet = <T,>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) => {
    setter(prev => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        next.add(value)
      }
      return next
    })
  }

  const clearAllFilters = () => {
    setCategoryFilter(new Set())
    setStyleFilter(new Set())
    setPriceFilter(new Set())
    setSortBy('score')
  }

  const toggleVendor = (vendorId: string) => {
    toggleSet(setSelectedVendors, vendorId)
  }

  const selectAllInCategory = (category: VendorCategory) => {
    const categoryVendorIds = filteredMatches
      .filter(m => m.vendor.category === category)
      .map(m => m.vendor.id)

    setSelectedVendors(prev => {
      const next = new Set(prev)
      categoryVendorIds.forEach(id => next.add(id))
      return next
    })
  }

  const deselectAllInCategory = (category: VendorCategory) => {
    const categoryVendorIds = filteredMatches
      .filter(m => m.vendor.category === category)
      .map(m => m.vendor.id)

    setSelectedVendors(prev => {
      const next = new Set(prev)
      categoryVendorIds.forEach(id => next.delete(id))
      return next
    })
  }

  // Group filtered matches by category
  const groupedMatches = filteredMatches.reduce(
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
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/50 dark:border-gray-700/50 shadow-sm">
        <div className="space-y-3">
          {/* Top row: filter label + sort + clear */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-medium">Filters</span>
              {hasActiveFilters && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full">
                  {categoryFilter.size + styleFilter.size + priceFilter.size}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium transition-colors"
                >
                  Clear all
                </button>
              )}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500"
              >
                <option value="score">Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* Category filters */}
            {availableCategories.length > 1 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mr-1">Type</span>
                {availableCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleSet(setCategoryFilter, cat)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                      categoryFilter.has(cat)
                        ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-rose-300 dark:hover:border-rose-600'
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            )}

            {/* Divider */}
            {availableCategories.length > 1 && availableStyles.length > 0 && (
              <div className="h-5 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
            )}

            {/* Style filters - Dropdown */}
            {availableStyles.length > 0 && (
              <div className="relative" ref={styleDropdownRef}>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mr-1.5 inline-block">Style</span>
                <button
                  onClick={() => setStyleDropdownOpen(!styleDropdownOpen)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all inline-flex items-center gap-2 ${
                    styleFilter.size > 0
                      ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <span>
                    {styleFilter.size > 0 ? `${styleFilter.size} selected` : 'Select styles'}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${styleDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {styleDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Select Styles
                        </span>
                        {styleFilter.size > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setStyleFilter(new Set())
                            }}
                            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="p-2">
                        {availableStyles.map(style => (
                          <label
                            key={style}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={styleFilter.has(style)}
                              onChange={() => toggleSet(setStyleFilter, style)}
                              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 cursor-pointer"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-200 flex-1">
                              {style}
                            </span>
                          </label>
                        ))}
                      </div>
                  </div>
                )}
              </div>
            )}

            {/* Divider */}
            {availablePriceRanges.length > 0 && (availableStyles.length > 0 || availableCategories.length > 1) && (
              <div className="h-5 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
            )}

            {/* Price range filters */}
            {availablePriceRanges.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mr-1">Price</span>
                {availablePriceRanges.map(pr => (
                  <button
                    key={pr}
                    onClick={() => toggleSet(setPriceFilter, pr)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                      priceFilter.has(pr)
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-600'
                    }`}
                  >
                    {PRICE_RANGE_LABELS[pr]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active filter summary */}
          {hasActiveFilters && (
            <div className="text-xs text-gray-500 dark:text-gray-400 font-light">
              Showing {filteredMatches.length} of {matches.length} vendors
            </div>
          )}
        </div>
      </div>

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

      {/* Empty state - no matches at all */}
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

      {/* Empty state - filters too restrictive */}
      {matches.length > 0 && filteredMatches.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 dark:from-purple-900/30 to-pink-100 dark:to-pink-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-2">
            No vendors match your filters
          </h3>
          <p className="text-gray-600 dark:text-gray-300 font-light mb-4">
            Try removing some filters to see more results
          </p>
          <button
            onClick={clearAllFilters}
            className="text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium hover:underline transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
