'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  options?: string[]
  isQuickReply?: boolean
  showVendorButton?: boolean
}

const QUICK_ACTIONS = [
  'Explain my vendor matches',
  'When should I book my photographer?',
  'How do I contact vendors?',
  'What should I ask at a venue tour?',
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your wedding planning assistant. 💍\n\nI can help you:\n• Understand your vendor recommendations\n• Answer wedding planning questions\n• Navigate the platform\n• Provide guidance on timelines and budgets\n\nWhat would you like to know?",
      options: QUICK_ACTIONS,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleOptionClick = (option: string) => {
    // Add user's selection as a message
    const userMessage: Message = {
      role: 'user',
      content: option,
      isQuickReply: true,
    }
    setMessages(prev => [...prev, userMessage])

    // Send to AI for response
    setInput(option)
    setTimeout(() => handleSend(), 100)
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      // Filter out options from messages sent to API
      const apiMessages = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          assistantMessage += chunk

          setMessages([...updatedMessages, { role: 'assistant', content: assistantMessage }])
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="flex flex-col h-[700px] max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/90 backdrop-blur-xl border border-white/50 overflow-hidden animate-fadeIn"
      style={{ animationDelay: '500ms' }}
    >
      {/* Enhanced Elegant Header */}
      <div className="relative p-6 bg-gradient-to-r from-rose-50/80 via-pink-50/60 to-purple-50/80 backdrop-blur-sm border-b border-white/50">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.02)_1px,transparent_0)] bg-[size:24px_24px]" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Elegant icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-medium text-gray-900 mb-0.5">
                Wedding Planning Assistant
              </h2>
              <p className="text-sm text-gray-600 font-light">
                Here to help with your questions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-green-200/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50" />
            <span className="text-xs text-gray-600 font-medium">Online</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
      </div>

      {/* Enhanced Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white via-rose-50/10 to-purple-50/20">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.015)_1px,transparent_0)] bg-[size:24px_24px] pointer-events-none" />

        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-3 relative">
            <div
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 mr-3">
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 flex items-center justify-center shadow-lg">
                    {/* Inner glow */}
                    <div className="absolute inset-0.5 bg-white/20 rounded-2xl" />
                    <svg
                      className="w-5 h-5 text-white relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-6 py-4 ${
                  msg.role === 'user'
                    ? msg.isQuickReply
                      ? 'bg-gradient-to-br from-purple-100/90 to-purple-50/90 text-purple-900 border border-purple-200/50 shadow-md backdrop-blur-sm'
                      : 'bg-gradient-to-br from-rose-400 via-pink-400 to-pink-500 text-white shadow-xl shadow-rose-300/40'
                    : 'bg-white/95 border border-gray-100/50 text-gray-800 shadow-lg backdrop-blur-sm'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed font-light">{msg.content}</p>
              </div>

              {msg.role === 'user' && !msg.isQuickReply && (
                <div className="flex-shrink-0 ml-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Quick Reply Options */}
            {msg.role === 'assistant' &&
              msg.options &&
              idx === messages.length - 1 &&
              !isLoading && (
                <div
                  className="flex flex-wrap gap-3 ml-14 animate-fadeIn"
                  style={{ animationDelay: '200ms' }}
                >
                  {msg.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionClick(option)}
                      className="group relative px-5 py-3 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 hover:border-rose-300 rounded-2xl text-sm font-medium text-gray-700 hover:text-rose-600 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      {/* Gradient effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10">{option}</span>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-br from-rose-400 to-pink-400 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  ))}
                </div>
              )}

            {/* View All Vendors Button */}
            {msg.role === 'assistant' &&
              msg.showVendorButton &&
              idx === messages.length - 1 &&
              !isLoading && (
                <div className="ml-14 mt-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
                  <Link href="/vendors" className="group relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                    <div className="relative px-6 py-3 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>View All Vendors</span>
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
                    </div>
                  </Link>
                </div>
              )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fadeIn relative">
            <div className="flex-shrink-0 mr-3">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 flex items-center justify-center shadow-lg">
                <div className="absolute inset-0.5 bg-white/20 rounded-2xl" />
                <svg
                  className="w-5 h-5 text-white relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm border border-gray-100/50 rounded-2xl px-6 py-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full animate-bounce shadow-sm" />
                <div
                  className="w-2.5 h-2.5 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce shadow-sm"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2.5 h-2.5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-bounce shadow-sm"
                  style={{ animationDelay: '0.2s' }}
                />
                <span className="ml-2 text-sm text-gray-500 font-light">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="relative p-6 bg-gradient-to-r from-rose-50/60 via-white/90 to-purple-50/60 backdrop-blur-sm border-t border-white/50">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.02)_1px,transparent_0)] bg-[size:24px_24px]" />

          <div className="flex gap-3 relative">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts, dreams, and preferences..."
                className="w-full px-6 py-4 bg-white/95 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 placeholder:text-gray-400 font-light shadow-md hover:shadow-lg focus:shadow-xl"
                disabled={isLoading}
              />
              {/* Decorative accent when focused */}
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            </div>

            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="relative px-8 py-4 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white rounded-2xl font-medium hover:shadow-2xl hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-xl shadow-rose-300/40 flex items-center gap-2 overflow-hidden group"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative z-10">Send</span>
              <svg
                className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-500 font-light relative">
            <span>Press</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 text-gray-600 font-mono shadow-sm">
              <kbd className="text-xs">Enter</kbd>
            </span>
            <span>to send</span>
            <span className="text-gray-300">·</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 text-gray-600 font-mono shadow-sm">
              <kbd className="text-xs">Shift</kbd>
              <span>+</span>
              <kbd className="text-xs">Enter</kbd>
            </span>
            <span>for new line</span>
          </div>
        </div>
    </div>
  )
}
