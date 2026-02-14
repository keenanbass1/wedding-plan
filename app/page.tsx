export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium tracking-wider text-rose-600 uppercase">
                AI-Powered Wedding Planning
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-serif font-light tracking-tight">
              <span className="block text-gray-900">Your Dream</span>
              <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Wedding Awaits
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Let our intelligent assistant orchestrate every detail of your perfect day,
              from venues to vendors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <a href="/chat" className="group">
                <button className="px-10 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                  <span className="flex items-center gap-2">
                    Begin Your Journey
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: 'Intelligent Conversations',
                description: 'Share your vision through natural dialogue. Our AI understands your style, budget, and dreams.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: 'Curated Matching',
                description: 'Discover handpicked venues and vendors perfectly aligned with your aesthetic and requirements.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Seamless Coordination',
                description: 'We reach out to vendors on your behalf, managing inquiries and gathering responses effortlessly.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-rose-200/50"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 text-rose-500 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif font-medium mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {feature.description}
                </p>

                {/* Decorative gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </div>
            ))}
          </div>

          {/* Footer Badge */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-100">
              <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Proudly serving New South Wales, Australia
              </span>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
