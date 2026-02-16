import ChatInterface from '@/components/ChatInterface'
import Header from '@/components/Header'

export default function ChatPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950">
      {/* Enhanced decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-pink-200/10 dark:from-rose-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/10 dark:from-purple-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-pink-100/10 dark:bg-pink-900/10 rounded-full blur-2xl" />

        {/* Delicate floral accent */}
        <div className="absolute top-32 right-1/4 text-rose-200/20 dark:text-rose-800/20 animate-float">
          <svg className="w-24 h-24" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 40c-8 0-15 7-15 15 0-8-7-15-15-15s-15 7-15 15c0 15 15 30 30 45 15-15 30-30 30-45 0-8-7-15-15-15z" />
            <circle cx="100" cy="100" r="6" opacity="0.5" />
          </svg>
        </div>

        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.02)_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      {/* Header with user menu */}
      <Header />

      <div className="relative p-8">

        <div className="max-w-6xl mx-auto">
          {/* Enhanced Title Section */}
          <div className="text-center mb-12 space-y-6">
            {/* Decorative element */}
            <div
              className="flex items-center justify-center gap-3 animate-fadeIn"
              style={{ animationDelay: '100ms' }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
              <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300" />
            </div>

            <div className="inline-block animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <span className="text-sm font-medium tracking-[0.3em] text-rose-600 dark:text-rose-400 uppercase">
                StreamWedding Assistant
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-tight animate-fadeIn"
              style={{ animationDelay: '300ms' }}
            >
              <span className="block text-gray-900 dark:text-white mb-2">Let&apos;s Create</span>
              <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Your Perfect Day
              </span>
            </h1>

            <p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed animate-fadeIn"
              style={{ animationDelay: '400ms' }}
            >
              Get help with your wedding planning questions. Together, we&apos;ll discover the perfect
              venues, vendors, and details that bring your wedding dreams to life.
            </p>
          </div>

          {/* Chat Interface */}
          <ChatInterface />

          {/* Enhanced Footer */}
          <div
            className="mt-12 text-center space-y-6 animate-fadeIn"
            style={{ animationDelay: '600ms' }}
          >
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              <svg className="w-3 h-3 text-rose-300 dark:text-rose-700" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent via-purple-200 to-transparent" />
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-light">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="font-light">Powered by Claude AI</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 font-light tracking-wide">
              Every detail crafted with care for your special day
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
