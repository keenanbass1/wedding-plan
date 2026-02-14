import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Let's Plan Your Wedding
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Chat with our AI assistant to get started
          </p>
        </div>

        <ChatInterface />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>✨ Powered by Claude AI</p>
        </div>
      </div>
    </div>
  );
}
