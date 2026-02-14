export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            WeddingPlan AI
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            Your AI-powered wedding planning assistant
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">AI Chat</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Natural conversation to understand your perfect wedding
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatic discovery of vendors that fit your style
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Auto Outreach</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We contact vendors for you and track responses
              </p>
            </div>
          </div>

          <div className="mt-12">
            <a href="/chat">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                Start Planning Your Wedding
              </button>
            </a>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>🇦🇺 Currently serving New South Wales, Australia</p>
          </div>
        </div>
      </div>
    </main>
  );
}
