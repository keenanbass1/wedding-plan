'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1a1a1a' }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', maxWidth: '400px' }}>
            We&apos;re sorry for the inconvenience. Our team has been notified and is looking into the issue.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(to right, #f87171, #a855f7)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
