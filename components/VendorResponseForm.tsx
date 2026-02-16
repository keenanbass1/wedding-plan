'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'

interface VendorResponseFormProps {
  outreachId: string
}

export function VendorResponseForm({ outreachId }: VendorResponseFormProps) {
  const router = useRouter()
  const [responseEmail, setResponseEmail] = useState('')
  const [quote, setQuote] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/outreach/add-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outreachId,
          responseEmail,
          quote: quote ? Math.round(parseFloat(quote) * 100) : null, // Convert to cents
          notes: notes || null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save response')
      }

      // Refresh the page to show updated data
      router.refresh()
    } catch (err) {
      console.error('Error saving response:', err)
      setError('Failed to save response. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/50 rounded-2xl animate-fadeIn">
          <p className="text-sm text-red-600 dark:text-red-400 font-light">{error}</p>
        </div>
      )}

      {/* Response Email */}
      <div>
        <label htmlFor="responseEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Vendor&apos;s Response <span className="text-rose-500 dark:text-rose-400">*</span>
        </label>
        <textarea
          id="responseEmail"
          value={responseEmail}
          onChange={e => setResponseEmail(e.target.value)}
          required
          disabled={loading}
          rows={8}
          className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-light leading-relaxed text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          placeholder="Paste the vendor's email response here..."
        />
      </div>

      {/* Quote Amount */}
      <div>
        <label htmlFor="quote" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Quote Amount (optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">$</span>
          </div>
          <input
            id="quote"
            type="number"
            value={quote}
            onChange={e => setQuote(e.target.value)}
            disabled={loading}
            step="0.01"
            min="0"
            className="w-full pl-8 pr-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            placeholder="0.00"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-light">
          Enter the quoted price in dollars (e.g., 5000.00)
        </p>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          disabled={loading}
          rows={3}
          className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-light text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          placeholder="Add any additional notes about this vendor..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !responseEmail}
        className="group relative w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        <div className="relative w-full px-6 py-3 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Save Response</span>
            </>
          )}
        </div>
      </button>
    </form>
  )
}
