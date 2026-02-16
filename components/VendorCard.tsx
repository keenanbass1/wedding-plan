'use client'

import { Vendor } from '@prisma/client'
import { useState } from 'react'

interface VendorCardProps {
  vendor: Vendor
  isSelected: boolean
  onToggleSelect: (vendorId: string) => void
  matchScore?: number
  matchReasons?: string[]
}

export function VendorCard({
  vendor,
  isSelected,
  onToggleSelect,
  matchScore,
  matchReasons,
}: VendorCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const formatPrice = (min?: number | null, max?: number | null) => {
    if (!min && !max) return 'Contact for pricing'
    if (min && max) {
      return `$${(min / 100).toLocaleString()} - $${(max / 100).toLocaleString()}`
    }
    if (min) return `From $${(min / 100).toLocaleString()}`
    return 'Contact for pricing'
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'VENUE':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        )
      case 'PHOTOGRAPHER':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        )
      case 'CATERING':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        )
      case 'FLORIST':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
              opacity="0.3"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        )
    }
  }

  return (
    <div
      className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-900/30 hover:shadow-2xl transition-all duration-500 border ${isSelected ? 'border-rose-300 ring-2 ring-rose-200' : 'border-white/50 dark:border-gray-700/50 hover:border-rose-200'}`}
    >
      {/* Match score badge */}
      {matchScore && (
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1 bg-gradient-to-r from-rose-400 to-pink-400 text-white text-xs font-medium rounded-full shadow-lg">
            {matchScore}% Match
          </div>
        </div>
      )}

      {/* Selection checkbox */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => onToggleSelect(vendor.id)}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? 'bg-gradient-to-br from-rose-400 to-pink-400 border-rose-400 scale-110'
              : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 hover:border-rose-400'
          }`}
        >
          {isSelected && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Placeholder image area */}
      <div className="relative h-48 bg-gradient-to-br from-rose-100 dark:from-rose-900/30 via-pink-50 to-purple-100 dark:to-pink-900/30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-rose-300">
          {getCategoryIcon(vendor.category)}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Name */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-rose-500">{getCategoryIcon(vendor.category)}</div>
            <span className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">
              {vendor.category.replace('_', ' ')}
            </span>
          </div>
          <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {vendor.name}
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
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
          <span className="font-light">
            {vendor.suburb || vendor.location}, {vendor.state}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {formatPrice(vendor.priceMin, vendor.priceMax)}
          </span>
          {vendor.priceRange && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {'$'.repeat(
                ['BUDGET', 'MODERATE', 'PREMIUM', 'LUXURY'].indexOf(vendor.priceRange) + 1
              )}
            </span>
          )}
        </div>

        {/* Rating */}
        {vendor.rating && (
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(vendor.rating!) ? 'text-rose-400' : 'text-gray-200 dark:text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 font-light">
              {vendor.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Styles tags */}
        {vendor.styles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {vendor.styles.slice(0, 3).map((style, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-lg font-light"
              >
                {style}
              </span>
            ))}
            {vendor.styles.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 font-light">
                +{vendor.styles.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors flex items-center justify-center gap-2 group/btn"
        >
          <span>{showDetails ? 'Hide Details' : 'View Details'}</span>
          <svg
            className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expandable details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3 animate-fadeIn">
            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">{vendor.description}</p>

            {/* Match reasons */}
            {matchReasons && matchReasons.length > 0 && (
              <div className="bg-rose-50/50 dark:bg-rose-900/30 rounded-xl p-3">
                <h4 className="text-xs font-medium text-rose-900 mb-2">Why this matches:</h4>
                <ul className="space-y-1">
                  {matchReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300">
                      <svg
                        className="w-3 h-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-light">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact info */}
            <div className="flex flex-wrap gap-3">
              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 hover:underline"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  Website
                </a>
              )}
              {vendor.phone && (
                <a
                  href={`tel:${vendor.phone}`}
                  className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 hover:underline"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {vendor.phone}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
