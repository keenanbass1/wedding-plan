'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  options?: string[];
  isQuickReply?: boolean;
}

type ChatStage = 'questionnaire' | 'consultant';

const QUESTIONS = [
  {
    question: "First, let's start with the basics. When are you thinking of getting married?",
    options: [
      "We have a specific date",
      "Flexible - sometime in 2027",
      "Flexible - sometime in 2028",
      "We're still deciding",
    ],
  },
  {
    question: "Wonderful! Where in New South Wales would you like to celebrate?",
    options: [
      "Sydney & surrounds",
      "Blue Mountains",
      "Hunter Valley",
      "South Coast",
      "Other region",
    ],
  },
  {
    question: "How many guests are you planning to invite?",
    options: [
      "Intimate (under 50)",
      "Medium (50-100)",
      "Large (100-150)",
      "Grand (150+)",
    ],
  },
  {
    question: "What's your estimated total budget?",
    options: [
      "Under $30,000",
      "$30,000 - $50,000",
      "$50,000 - $80,000",
      "Above $80,000",
    ],
  },
  {
    question: "What style resonates with your vision?",
    options: [
      "Modern & Minimalist",
      "Rustic & Outdoor",
      "Classic & Elegant",
      "Bohemian & Relaxed",
      "Luxury & Glamorous",
    ],
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Congratulations on your engagement! 🎉\n\nI'm your wedding planning concierge. Let me ask you a few quick questions to understand your vision, then we'll dive deeper into creating your perfect day.",
      options: QUESTIONS[0].options,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<ChatStage>('questionnaire');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: string) => {
    // Add user's selection
    const userMessage: Message = {
      role: 'user',
      content: option,
      isQuickReply: true,
    };
    setMessages(prev => [...prev, userMessage]);

    // Store the data
    const questionKey = ['date', 'location', 'guestCount', 'budget', 'style'][currentQuestion];
    setCollectedData(prev => ({ ...prev, [questionKey]: option }));

    // Move to next question or transition to consultant
    if (currentQuestion < QUESTIONS.length - 1) {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: QUESTIONS[nextQ].question,
            options: QUESTIONS[nextQ].options,
          },
        ]);
      }, 300);
    } else {
      // Transition to consultant mode
      setStage('consultant');
      setTimeout(() => {
        const summary = `Perfect! Here's what we've gathered:\n\n📅 Date: ${collectedData.date || option}\n📍 Location: ${collectedData.location}\n👥 Guests: ${collectedData.guestCount}\n💰 Budget: ${collectedData.budget}\n🎨 Style: ${option}\n\nNow I'd love to learn more about your specific preferences and must-haves. What's most important to you for your wedding day?`;

        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: summary,
          },
        ]);
      }, 500);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Filter out options from messages sent to API
      const apiMessages = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantMessage += chunk;

          setMessages([
            ...updatedMessages,
            { role: 'assistant', content: assistantMessage },
          ]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[700px] max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl border border-gray-100/50 overflow-hidden">
      {/* Elegant Header */}
      <div className="relative p-6 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-medium text-gray-900 mb-1">
              Your Wedding Concierge
            </h2>
            <p className="text-sm text-gray-600 font-light">
              {stage === 'questionnaire'
                ? `Question ${currentQuestion + 1} of ${QUESTIONS.length}`
                : 'Personalized consultation'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500 font-medium">Online</span>
          </div>
        </div>

        {/* Progress bar for questionnaire */}
        {stage === 'questionnaire' && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-rose-400 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-rose-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-3">
            <div
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                  msg.role === 'user'
                    ? msg.isQuickReply
                      ? 'bg-gradient-to-br from-purple-100 to-purple-50 text-purple-900 border border-purple-200 shadow-sm'
                      : 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/50'
                    : 'bg-white border border-gray-100 text-gray-800 shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed font-light">
                  {msg.content}
                </p>
              </div>

              {msg.role === 'user' && !msg.isQuickReply && (
                <div className="flex-shrink-0 ml-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-medium shadow-md">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Reply Options */}
            {msg.role === 'assistant' && msg.options && idx === messages.length - 1 && !isLoading && (
              <div className="flex flex-wrap gap-2 ml-14 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                {msg.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionClick(option)}
                    className="px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-rose-300 rounded-xl text-sm font-medium text-gray-700 hover:text-rose-600 hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Only show in consultant mode */}
      {stage === 'consultant' && (
        <div className="p-6 bg-gradient-to-r from-rose-50/50 via-white to-purple-50/50 border-t border-gray-100">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 placeholder:text-gray-400 font-light shadow-sm"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-2xl font-medium hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-md shadow-rose-200/50 flex items-center gap-2"
            >
              <span>Send</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center font-light">
            Press <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-mono text-xs">Enter</span> to send
            {' · '}
            <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-mono text-xs">Shift + Enter</span> for new line
          </p>
        </div>
      )}

      {/* Info footer for questionnaire mode */}
      {stage === 'questionnaire' && (
        <div className="p-4 bg-gradient-to-r from-rose-50/50 via-white to-purple-50/50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 font-light">
            Click an option above to continue
          </p>
        </div>
      )}
    </div>
  );
}
