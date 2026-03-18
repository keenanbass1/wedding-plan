'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'

import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const supabase = createClient()

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?redirect=/auth/update-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <h1 className="font-display text-3xl text-stone-900 dark:text-stone-100 mb-4">Check your email</h1>
          <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm leading-relaxed">
            We&apos;ve sent a password reset link to <strong className="text-stone-900 dark:text-stone-100">{email}</strong>. Click the link to set a new password.
          </p>
          <Link href="/auth/login" className="text-sm text-stone-900 dark:text-stone-200 font-medium hover:underline">
            Return to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-gray-950 flex flex-col">
      {/* Back link */}
      <div className="px-6 pt-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to sign in
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="font-display text-xl text-stone-900 dark:text-stone-100">Bower</Link>
            <h1 className="font-display text-3xl text-stone-900 dark:text-stone-100 mt-6">Reset password</h1>
            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">Enter your email and we&apos;ll send you a reset link</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-stone-700 dark:text-stone-300 mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-3 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700/40 transition-all text-sm disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg font-medium text-sm hover:bg-stone-800 dark:hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-stone-900 dark:text-stone-200 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
