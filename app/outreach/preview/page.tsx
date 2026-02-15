'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface GeneratedEmail {
  vendorId: string
  vendorName: string
  vendorEmail: string
  vendorCategory: string
  subject: string
  body: string
}

export default function OutreachPreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const weddingId = searchParams.get('wedding')
  const vendorIds = searchParams.get('vendors')?.split(',') || []

  const [emails, setEmails] = useState<GeneratedEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set())
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  useEffect(() => {
    if (!weddingId || vendorIds.length === 0) {
      router.push('/vendors')
      return
    }

    generateEmails()
  }, [weddingId, vendorIds])

  const generateEmails = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/outreach/generate-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorIds,
          weddingId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate emails')
      }

      const data = await response.json()
      setEmails(data.emails)
      // Expand first email by default
      if (data.emails.length > 0) {
        setExpandedEmails(new Set([data.emails[0].vendorId]))
      }
    } catch (err) {
      console.error('Error generating emails:', err)
      setError('Failed to generate emails. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const updateEmail = (vendorId: string, field: 'subject' | 'body', value: string) => {
    setEmails(prev =>
      prev.map(email =>
        email.vendorId === vendorId ? { ...email, [field]: value } : email
      )
    )
  }

  const removeEmail = (vendorId: string) => {
    setEmails(prev => prev.filter(email => email.vendorId !== vendorId))
  }

  const toggleExpanded = (vendorId: string) => {
    setExpandedEmails(prev => {
      const next = new Set(prev)
      if (next.has(vendorId)) {
        next.delete(vendorId)
      } else {
        next.add(vendorId)
      }
      return next
    })
  }

  const handleSendAll = async () => {
    try {
      setSending(true)
      setError(null)

      const response = await fetch('/api/outreach/send-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails,
          weddingId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send emails')
      }

      const data = await response.json()

      // Success! Redirect to dashboard
      router.push(`/dashboard?sent=${data.sent}`)
    } catch (err) {
      console.error('Error sending emails:', err)
      setError('Failed to send emails. Please try again.')
      setSending(false)
    }
  }

  if (loading) {
    return (
      <main className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-light">Generating personalized emails...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.03)_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <Link
              href="/vendors"
              className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors duration-300 group mb-6"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-light tracking-wide">Back to Vendors</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
              <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300" />
            </div>

            <h1 className="text-5xl font-serif font-light tracking-tight mb-4">
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Review & Send
              </span>
            </h1>

            <p className="text-gray-600 font-light mb-6">
              Review your personalized vendor inquiries. You can edit any email before sending.
            </p>

            {error && (
              <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl animate-fadeIn">
                <p className="text-sm text-red-600 font-light">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Email List */}
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">
          {emails.map((email, idx) => (
            <div
              key={email.vendorId}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Email Header */}
              <div className="p-6 border-b border-gray-100/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-rose-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-medium text-gray-900">
                          {email.vendorName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-lg text-xs font-medium">
                            {email.vendorCategory}
                          </span>
                          <span className="font-light">{email.vendorEmail}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpanded(email.vendorId)}
                      className="px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      {expandedEmails.has(email.vendorId) ? 'Collapse' : 'Expand'}
                    </button>
                    <button
                      onClick={() => removeEmail(email.vendorId)}
                      className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              {expandedEmails.has(email.vendorId) && (
                <div className="p-6 space-y-4 animate-fadeIn">
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={email.subject}
                      onChange={(e) => updateEmail(email.vendorId, 'subject', e.target.value)}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Message
                    </label>
                    <textarea
                      value={email.body}
                      onChange={(e) => updateEmail(email.vendorId, 'body', e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 font-light leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {emails.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">
                No emails to send
              </h3>
              <p className="text-gray-600 font-light mb-6">
                All emails have been removed
              </p>
              <Link
                href="/vendors"
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Vendors
              </Link>
            </div>
          )}
        </div>

        {/* Sticky Send Button */}
        {emails.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 py-6 z-20">
            <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {emails.length} {emails.length === 1 ? 'email' : 'emails'} ready to send
                </div>
                <div className="text-xs text-gray-500 font-light">
                  AI-personalized inquiries to your selected vendors
                </div>
              </div>

              <button
                onClick={() => setShowConfirmDialog(true)}
                disabled={sending}
                className="group relative disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative px-8 py-4 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  {sending ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send All Emails</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 max-w-md w-full animate-fadeIn" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>

              <h3 className="text-2xl font-serif font-medium text-gray-900 text-center mb-3">
                Send {emails.length} {emails.length === 1 ? 'Email' : 'Emails'}?
              </h3>

              <p className="text-gray-600 font-light text-center mb-6 leading-relaxed">
                Your personalized inquiries will be sent to the selected vendors. You'll be able to track responses in your dashboard.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={sending}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAll}
                  disabled={sending}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Confirm & Send'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
