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

type ChatStage = 'questionnaire' | 'consultant'

const QUESTIONS = [
  {
    question: "First, let's start with the basics. When are you thinking of getting married?",
    options: [
      'We have a specific date',
      'Flexible - sometime in 2027',
      'Flexible - sometime in 2028',
      "We're still deciding",
    ],
  },
  {
    question: 'Wonderful! Where in New South Wales would you like to celebrate?',
    options: [
      'Sydney & surrounds',
      'Blue Mountains',
      'Hunter Valley',
      'South Coast',
      'Other region',
    ],
  },
  {
    question: 'How many guests are you planning to invite?',
    options: ['Intimate (under 50)', 'Medium (50-100)', 'Large (100-150)', 'Grand (150+)'],
  },
  {
    question: "What's your estimated total budget?",
    options: ['Under $30,000', '$30,000 - $50,000', '$50,000 - $80,000', 'Above $80,000'],
  },
  {
    question: 'What style resonates with your vision?',
    options: [
      'Modern & Minimalist',
      'Rustic & Outdoor',
      'Classic & Elegant',
      'Bohemian & Relaxed',
      'Luxury & Glamorous',
    ],
  },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Congratulations on your engagement! 🎉\n\nI'm your wedding planning concierge. Let me ask you a few quick questions to understand your vision, then we'll dive deeper into creating your perfect day.",
      options: QUESTIONS[0].options,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [stage, setStage] = useState<ChatStage>('questionnaire')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [collectedData, setCollectedData] = useState<Record<string, string>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleOptionClick = (option: string) => {
    // Add user's selection
    const userMessage: Message = {
      role: 'user',
      content: option,
      isQuickReply: true,
    }
    setMessages(prev => [...prev, userMessage])

    // Store the data
    const questionKey = ['date', 'location', 'guestCount', 'budget', 'style'][currentQuestion]
    setCollectedData(prev => ({ ...prev, [questionKey]: option }))

    // Move to next question or transition to consultant
    if (currentQuestion < QUESTIONS.length - 1) {
      const nextQ = currentQuestion + 1
      setCurrentQuestion(nextQ)

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: QUESTIONS[nextQ].question,
            options: QUESTIONS[nextQ].options,
          },
        ])
      }, 300)
    } else {
      // Transition to consultant mode
      setStage('consultant')

      // Show summary
      setTimeout(() => {
        const summary = `Perfect! Here's what we've gathered:\n\n📅 Date: ${collectedData.date || option}\n📍 Location: ${collectedData.location}\n👥 Guests: ${collectedData.guestCount}\n💰 Budget: ${collectedData.budget}\n🎨 Style: ${option}\n\nLet me find vendors that match your vision... 🔍`

        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: summary,
          },
        ])

        // Fetch vendor matches
        fetchVendorMatches({
          ...collectedData,
          style: option,
        })
      }, 500)
    }
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

  const fetchVendorMatches = async (weddingData: Record<string, string>) => {
    try {
      setIsLoading(true)

      // STEP 1: Save wedding data to database
      const saveResponse = await fetch('/api/wedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weddingData),
      })

      if (!saveResponse.ok) {
        throw new Error('Failed to save wedding data')
      }

      // Parse location from answer
      const locationMap: Record<string, string> = {
        'Sydney & surrounds': 'Sydney',
        'Blue Mountains': 'Blue Mountains',
        'Hunter Valley': 'Hunter Valley',
        'South Coast': 'South Coast',
        'Other region': 'Newcastle', // Default to Newcastle for now
      }

      // Parse guest count
      const guestMap: Record<string, number> = {
        'Intimate (under 50)': 40,
        'Medium (50-100)': 75,
        'Large (100-150)': 125,
        'Grand (150+)': 200,
      }

      // Parse budget
      const budgetMap: Record<string, number> = {
        'Under $30,000': 25000,
        '$30,000 - $50,000': 40000,
        '$50,000 - $80,000': 65000,
        'Above $80,000': 100000,
      }

      // STEP 2: Fetch vendor matches
      const response = await fetch('/api/vendors/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: locationMap[weddingData.location] || 'Newcastle',
          guestCount: guestMap[weddingData.guestCount],
          budgetTotal: budgetMap[weddingData.budget],
          style: weddingData.style?.split(' & ')[0], // Extract first style word
        }),
      })

      if (!response.ok) throw new Error('Failed to fetch vendors')

      const data = await response.json()

      // Add vendor matches to chat
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: data.chatMessage,
            showVendorButton: true,
          },
        ])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching vendors:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm having trouble finding vendors right now. Let's continue our conversation and I'll help you with your wedding planning!",
        },
      ])
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
                Your Wedding Concierge
              </h2>
              <p className="text-sm text-gray-600 font-light">
                {stage === 'questionnaire'
                  ? `Question ${currentQuestion + 1} of ${QUESTIONS.length}`
                  : 'Personalized consultation'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-green-200/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50" />
            <span className="text-xs text-gray-600 font-medium">Online</span>
          </div>
        </div>

        {/* Enhanced Progress bar for questionnaire */}
        {stage === 'questionnaire' && (
          <div className="relative mt-5">
            <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 h-2 rounded-full transition-all duration-700 shadow-sm shadow-rose-400/30"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            {/* Progress percentage */}
            <div className="mt-2 text-xs text-gray-500 font-light text-center">
              {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}% Complete
            </div>
          </div>
        )}

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

      {/* Enhanced Input Area - Only show in consultant mode */}
      {stage === 'consultant' && (
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
      )}

      {/* Enhanced Info footer for questionnaire mode */}
      {stage === 'questionnaire' && (
        <div className="relative p-5 bg-gradient-to-r from-rose-50/60 via-white/90 to-purple-50/60 backdrop-blur-sm border-t border-white/50 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.02)_1px,transparent_0)] bg-[size:24px_24px]" />
          <div className="relative flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-gray-600 font-light">
              Select an option above to continue your journey
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
