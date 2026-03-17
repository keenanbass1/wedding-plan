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
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/20 dark:from-rose-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/20 dark:from-purple-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.03)_1px,transparent_0)] bg-[size:32px_32px]" />
        </div>

        <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
          <div className="w-full max-w-md text-center animate-fadeIn">
            <div className="mb-8">
              <div
                className="mx-auto w-20 h-20 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full flex items-center justify-center mb-6 animate-fadeIn"
                style={{ animationDelay: '100ms' }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>

              <h1
                className="text-4xl font-serif font-light tracking-tight mb-4 animate-fadeIn"
                style={{ animationDelay: '200ms' }}
              >
                <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Check Your Email
                </span>
              </h1>

              <p
                className="text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-8 animate-fadeIn"
                style={{ animationDelay: '300ms' }}
              >
                We&apos;ve sent a password reset link to{' '}
                <strong className="text-gray-900 dark:text-white">{email}</strong>. Click the link
                to set a new password.
              </p>

              <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium hover:underline transition-colors"
                >
                  Return to login
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/20 dark:from-rose-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/20 dark:from-purple-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/20 to-transparent dark:from-pink-900/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.03)_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {/* Back to login link */}
        <Link
          href="/auth/login"
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-300 group"
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
          <span className="text-sm font-light tracking-wide">Back to Login</span>
        </Link>

        <div className="w-full max-w-md animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
              <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300" />
            </div>

            <h1 className="text-5xl font-serif font-light tracking-tight mb-3">
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Reset Password
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 font-light">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          {/* Glass morphism card */}
          <div
            className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl dark:shadow-gray-900/30 border border-white/50 dark:border-gray-700/50 overflow-hidden animate-fadeIn"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-transparent to-purple-50/30 dark:from-rose-950/20 dark:to-purple-950/20 pointer-events-none" />

            <div className="relative">
              {error && (
                <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50 rounded-2xl animate-fadeIn">
                  <p className="text-sm text-red-600 dark:text-red-400 font-light text-center">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <span>Sending reset link...</span>
                      </>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </div>
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300 font-light">
                Remember your password?{' '}
                <Link
                  href="/auth/login"
                  className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-light animate-fadeIn"
            style={{ animationDelay: '300ms' }}
          >
            <svg
              className="w-3 h-3 text-rose-300 dark:text-rose-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure authentication powered by Supabase</span>
          </div>
        </div>
      </div>
    </main>
  )
}
