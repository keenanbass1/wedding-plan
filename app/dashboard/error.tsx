'use client'

import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'
import { useEffect } from 'react'

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error) }, [error])

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-sm text-center">
        <h2 className="font-display text-2xl text-stone-900 dark:text-stone-100 mb-3">Dashboard error</h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Something went wrong loading your dashboard. Your data is safe.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-sm font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors">Try again</button>
          <Link href="/" className="px-5 py-2 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">Home</Link>
        </div>
      </div>
    </div>
  )
}
