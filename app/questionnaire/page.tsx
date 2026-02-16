'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const STEPS = [
  {
    id: 'date',
    title: 'Wedding Date',
    question: 'When are you planning your wedding?',
    type: 'select' as const,
    options: [
      { value: 'specific', label: 'We have a specific date', needsDate: true },
      { value: '2027', label: 'Flexible - sometime in 2027' },
      { value: '2028', label: 'Flexible - sometime in 2028' },
      { value: 'deciding', label: "We're still deciding" },
    ],
  },
  {
    id: 'location',
    title: 'Location',
    question: 'Where would you like to celebrate?',
    type: 'select' as const,
    options: [
      { value: 'Sydney', label: 'Sydney & surrounds' },
      { value: 'Blue Mountains', label: 'Blue Mountains' },
      { value: 'Hunter Valley', label: 'Hunter Valley' },
      { value: 'South Coast', label: 'South Coast' },
      { value: 'Newcastle', label: 'Other region' },
    ],
  },
  {
    id: 'guestCount',
    title: 'Guest Count',
    question: 'How many guests are you planning to invite?',
    type: 'select' as const,
    options: [
      { value: '40', label: 'Intimate (under 50)' },
      { value: '75', label: 'Medium (50-100)' },
      { value: '125', label: 'Large (100-150)' },
      { value: '200', label: 'Grand (150+)' },
    ],
  },
  {
    id: 'budget',
    title: 'Budget',
    question: "What's your estimated total budget?",
    type: 'select' as const,
    options: [
      { value: '25000', label: 'Under $30,000' },
      { value: '40000', label: '$30,000 - $50,000' },
      { value: '65000', label: '$50,000 - $80,000' },
      { value: '100000', label: 'Above $80,000' },
    ],
  },
  {
    id: 'style',
    title: 'Style',
    question: 'What style resonates with your vision?',
    type: 'select' as const,
    options: [
      { value: 'Modern', label: 'Modern & Minimalist' },
      { value: 'Rustic', label: 'Rustic & Outdoor' },
      { value: 'Classic', label: 'Classic & Elegant' },
      { value: 'Bohemian', label: 'Bohemian & Relaxed' },
      { value: 'Luxury', label: 'Luxury & Glamorous' },
    ],
  },
]

export default function QuestionnairePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentStepData = STEPS[currentStep]
  const progress = ((currentStep + 1) / STEPS.length) * 100

  // Fetch existing wedding data on mount
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await fetch('/api/wedding')
        if (response.ok) {
          const data = await response.json()
          if (data.wedding) {
            // Convert database values back to form values
            const existing = data.wedding
            const existingFormData: Record<string, string> = {}

            // Map database values to form option values
            if (existing.weddingDate) {
              existingFormData.date = 'specific'
            } else {
              existingFormData.date = 'deciding'
            }

            existingFormData.location = existing.location || ''
            existingFormData.guestCount = existing.guestCount?.toString() || ''
            existingFormData.budget = (existing.budgetTotal / 100).toString() || ''
            existingFormData.style = existing.style || ''

            setFormData(existingFormData)
          }
        }
      } catch (err) {
        console.error('Error fetching wedding data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExistingData()
  }, [])

  const handleOptionSelect = (value: string) => {
    const newData = { ...formData, [currentStepData.id]: value }
    setFormData(newData)

    // If this is the last step, submit
    if (currentStep === STEPS.length - 1) {
      handleSubmit(newData)
    } else {
      // Move to next step
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 300)
    }
  }

  const handleSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Save to database
      const response = await fetch('/api/wedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: data.date,
          location: data.location,
          guestCount: data.guestCount,
          budget: data.budget,
          style: data.style,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save wedding data')
      }

      // Redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error('Error saving wedding:', err)
      setError('Failed to save your details. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.02)_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 text-gray-600 hover:text-gray-900 hover:bg-white/80 hover:shadow-md transition-all duration-300 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-light text-sm">Back to Dashboard</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          {isLoading ? (
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-6 h-6 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
              <span className="font-light">Loading your details...</span>
            </div>
          ) : (
          <div className="max-w-2xl w-full space-y-8">
            {/* Progress Bar */}
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-light">
                  Step {currentStep + 1} of {STEPS.length}
                </span>
                <span className="text-gray-500 font-light">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 h-2 rounded-full transition-all duration-700 shadow-sm shadow-rose-400/30"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 animate-fadeIn"
              key={currentStep}
            >
              {/* Step Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
                <span className="text-sm font-medium tracking-wide text-rose-600 uppercase">
                  {currentStepData.title}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-8 leading-tight">
                {currentStepData.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentStepData.options.map((option, index) => {
                  const isSelected = formData[currentStepData.id] === option.value
                  return (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    disabled={isSubmitting}
                    className={`group w-full text-left px-6 py-5 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-fadeIn ${
                      isSelected
                        ? 'bg-gradient-to-br from-rose-50 to-purple-50 border-rose-300'
                        : 'bg-white/80 border-gray-200/50 hover:border-rose-300'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-700 group-hover:text-rose-600 transition-colors">
                        {option.label}
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                  )
                })}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Back Button */}
              {currentStep > 0 && !isSubmitting && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Previous question</span>
                  </button>
                </div>
              )}

              {/* Loading State */}
              {isSubmitting && (
                <div className="mt-8 flex items-center justify-center gap-3 text-gray-600">
                  <div className="w-5 h-5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                  <span className="font-light">Saving your details...</span>
                </div>
              )}
            </div>

            {/* Helper Text */}
            <div className="text-center space-y-3 animate-fadeIn">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Your data is secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Can be edited later</span>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
