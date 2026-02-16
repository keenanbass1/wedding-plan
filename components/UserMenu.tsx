'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface UserMenuProps {
  user: {
    name?: string | null
    email: string
  }
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/auth/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase()

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-rose-300 hover:shadow-lg dark:shadow-gray-900/30 transition-all duration-300 group"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center text-white font-medium shadow-md group-hover:scale-105 transition-transform">
          {initials}
        </div>

        {/* User Info (hidden on mobile) */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name || 'Account'}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-light">{user.email}</div>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-gray-900/30 border border-white/50 dark:border-gray-700/50 overflow-hidden z-20 animate-fadeIn">
            {/* User Info */}
            <div className="p-4 border-b border-gray-100/50 dark:border-gray-700/50 bg-gradient-to-br from-rose-50/50 to-purple-50/50 dark:from-rose-900/30 dark:to-purple-900/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center text-white font-medium text-lg shadow-md">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name || 'Account'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 truncate font-light">{user.email}</div>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <svg
                  className="w-5 h-5 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
