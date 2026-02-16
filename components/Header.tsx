import Link from 'next/link'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

import UserMenu from './UserMenu'

export default async function Header() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let dbUser = null
  if (user) {
    dbUser = await prisma.user.findUnique({
      where: { authId: user.id },
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-serif font-medium">
                <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  WeddingPlan AI
                </span>
              </h1>
            </div>
          </Link>

          {/* Navigation & Auth */}
          <div className="flex items-center gap-4">
            {user && dbUser ? (
              <>
                {/* Quick Nav Links */}
                <nav className="hidden md:flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/vendors"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                  >
                    Vendors
                  </Link>
                  <Link
                    href="/chat"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors"
                  >
                    Assistant
                  </Link>
                </nav>

                {/* User Menu */}
                <UserMenu
                  user={{
                    name: dbUser.name,
                    email: dbUser.email,
                  }}
                />
              </>
            ) : (
              <>
                {/* Not logged in - Show login button */}
                <Link
                  href="/chat"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Start Planning
                </Link>
                <Link href="/auth/login" className="group relative inline-block">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative px-6 py-2.5 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                    <span>Sign In</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
