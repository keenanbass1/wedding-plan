'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! Congratulations on your engagement! 🎉 I&apos;m so excited to help you plan your dream wedding. Let&apos;s start with the basics - do you have a wedding date in mind, or are you still deciding?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
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

          // Update the last message in real-time
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
          content: "I&apos;m sorry, I&apos;m having trouble connecting right now. Please try again.",
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
              Share your vision, and I&apos;ll bring it to life
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500 font-medium">Online</span>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-rose-50/30">
        {messages.map((msg, idx) => (
          <div
            key={idx}
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
                  ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/50'
                  : 'bg-white border border-gray-100 text-gray-800 shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed font-light">
                {msg.content}
              </p>
            </div>

            {msg.role === 'user' && (
              <div className="flex-shrink-0 ml-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-medium shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
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

      {/* Elegant Input Area */}
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
          Press <kbd className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-mono text-xs">Enter</kbd> to send
          · <kbd className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-mono text-xs">Shift + Enter</kbd> for new line
        </p>
      </div>

    </div>
  );
}
