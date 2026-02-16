import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950 transition-colors">
      {/* Header */}
      <Header />

      {/* Elegant background with depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/20 dark:from-rose-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/20 dark:from-purple-900/20 dark:to-pink-900/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/20 to-transparent dark:from-pink-900/10 dark:to-transparent rounded-full blur-3xl" />

        {/* Delicate floral accents */}
        <div className="absolute top-20 left-10 text-rose-300/20 dark:text-rose-700/15 animate-float">
          <svg className="w-32 h-32" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 40c-8 0-15 7-15 15 0-8-7-15-15-15s-15 7-15 15c0 15 15 30 30 45 15-15 30-30 30-45 0-8-7-15-15-15z" />
            <circle cx="100" cy="100" r="8" opacity="0.6" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-16 text-purple-300/15 dark:text-purple-700/10 animate-float-delayed">
          <svg className="w-24 h-24" viewBox="0 0 200 200" fill="currentColor">
            <path
              d="M100 40c-8 0-15 7-15 15 0-8-7-15-15-15s-15 7-15 15c0 15 15 30 30 45 15-15 30-30 30-45 0-8-7-15-15-15z"
              transform="rotate(20 100 100)"
            />
          </svg>
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.03)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.02)_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-24 animate-fadeIn">
            {/* Decorative element above text */}
            <div
              className="flex items-center justify-center gap-3 mb-6 animate-fadeIn"
              style={{ animationDelay: '100ms' }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300 dark:to-rose-600" />
              <svg className="w-5 h-5 text-rose-400 dark:text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300 dark:to-purple-600" />
            </div>

            <div className="inline-block mb-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <span className="text-sm font-medium tracking-[0.3em] text-rose-600 dark:text-rose-400 uppercase">
                Vendor Discovery Made Simple
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-light tracking-tight leading-[0.95] animate-fadeIn"
              style={{ animationDelay: '300ms' }}
            >
              <span className="block text-gray-900 dark:text-white mb-2">Find Your Perfect</span>
              <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Wedding Vendors
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mt-8 animate-fadeIn"
              style={{ animationDelay: '400ms' }}
            >
              Tell us about your wedding. Get matched with{' '}
              <span className="text-rose-500 dark:text-rose-400 font-normal">NSW vendors</span>.
              Send inquiries and{' '}
              <span className="text-purple-500 dark:text-purple-400 font-normal">track responses</span>{' '}
              &mdash; all in one place.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-fadeIn"
              style={{ animationDelay: '500ms' }}
            >
              <a href="/dashboard" className="group relative">
                {/* Button glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <button className="relative px-12 py-5 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-full text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
                  <span className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Get Started
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 text-sm text-gray-500 dark:text-gray-400 font-light animate-fadeIn"
              style={{ animationDelay: '600ms' }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-400 dark:text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>45+ NSW Vendors</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Editable Templates</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400 dark:text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Track Everything</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                ),
                accent: 'from-rose-400 to-pink-400',
                title: 'Share Your Details',
                description:
                  'Quick questionnaire about your date, location, guest count, budget, and style. Takes a few minutes.',
                number: '01',
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
                accent: 'from-pink-400 to-purple-400',
                title: 'Browse Matched Vendors',
                description:
                  'We show you NSW vendors that fit your criteria. See their services, pricing, and details.',
                number: '02',
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                accent: 'from-purple-400 to-pink-400',
                title: 'Send & Track Inquiries',
                description:
                  'Use email templates or write your own. Send inquiries and track every response in your dashboard.',
                number: '03',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/30 transition-all duration-500 border border-white/50 dark:border-gray-700/50 hover:border-white dark:hover:border-gray-600 overflow-hidden animate-fadeIn"
                style={{ animationDelay: `${700 + idx * 100}ms` }}
              >
                {/* Gradient accent on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Decorative corner element */}
                <div className="absolute top-4 right-4 text-6xl font-serif text-gray-100 dark:text-gray-800 group-hover:text-rose-100/50 dark:group-hover:text-rose-900/30 transition-colors duration-500">
                  {feature.number}
                </div>

                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-10 rounded-2xl group-hover:scale-110 transition-transform duration-500`}
                  />
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.accent} bg-opacity-10 flex items-center justify-center text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-rose-500 dark:text-rose-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-medium mb-4 text-gray-900 dark:text-white relative">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light relative">
                  {feature.description}
                </p>

                {/* Decorative bottom accent */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>
            ))}
          </div>

          {/* Elegant Footer */}
          <div
            className="text-center space-y-8 animate-fadeIn"
            style={{ animationDelay: '1000ms' }}
          >
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 dark:via-rose-700 to-transparent" />
              <svg className="w-4 h-4 text-rose-300 dark:text-rose-600" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                  opacity="0.3"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-300 dark:via-purple-700 to-transparent" />
            </div>

            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg dark:shadow-gray-900/30 border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                  Serving
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">New South Wales, Australia</div>
              </div>
            </div>

            {/* Additional trust element */}
            <p className="text-xs text-gray-400 dark:text-gray-500 font-light tracking-wide">
              Less admin. More time to enjoy planning your wedding.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
