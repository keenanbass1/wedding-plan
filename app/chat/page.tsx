import ChatInterface from '@/components/ChatInterface';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-light">Back to Home</span>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium tracking-wider text-rose-600 uppercase">
                Your Personal Wedding Planner
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-4">
              <span className="block text-gray-900">Let&apos;s Create</span>
              <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Your Perfect Day
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Share your vision with our AI concierge. Together, we&apos;ll discover the perfect venues,
              vendors, and details that bring your wedding dreams to life.
            </p>
          </div>

          {/* Chat Interface */}
          <ChatInterface />

          {/* Footer */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-light">Secure & Private</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
                <span className="font-light">Powered by Claude AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
