'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type EditableField = 'date' | 'location' | 'guestCount' | 'budget' | 'style'

interface DateRange {
  start: string
  end: string
}

interface WeddingData {
  weddingDate: string | null
  dateFlexible: boolean
  preferredDates: DateRange[] | null
  location: string | null
  guestCount: number | null
  budgetTotal: number
  style: string | null
}

const LOCATION_OPTIONS = ['Sydney', 'Blue Mountains', 'Hunter Valley', 'South Coast']
const STYLE_OPTIONS = ['Modern', 'Rustic', 'Classic', 'Bohemian', 'Luxury']

const GUEST_PRESETS = [
  { value: 40, label: 'Under 50' },
  { value: 75, label: '50-100' },
  { value: 125, label: '100-150' },
  { value: 200, label: '150+' },
]

const BUDGET_PRESETS = [
  { value: 25000, label: '$25k' },
  { value: 40000, label: '$40k' },
  { value: 65000, label: '$65k' },
  { value: 100000, label: '$100k' },
]

function EditIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-rose-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  )
}

function SaveCancelButtons({
  onSave,
  onCancel,
  saving,
}: {
  onSave: () => void
  onCancel: () => void
  saving: boolean
}) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={onSave}
        disabled={saving}
        className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
      <button
        onClick={onCancel}
        disabled={saving}
        className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  )
}

export default function WeddingSummaryCard({ wedding }: { wedding: WeddingData }) {
  const router = useRouter()
  const [editingField, setEditingField] = useState<EditableField | null>(null)
  const [saving, setSaving] = useState(false)
  const [localWedding, setLocalWedding] = useState<WeddingData>(wedding)

  // Edit values
  const [editDate, setEditDate] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [editGuestCount, setEditGuestCount] = useState('')
  const [editBudget, setEditBudget] = useState('')
  const [editStyle, setEditStyle] = useState('')

  // Date mode state
  const [dateMode, setDateMode] = useState<'specific' | 'flexible' | 'deciding'>('specific')
  const [editDateRanges, setEditDateRanges] = useState<DateRange[]>([{ start: '', end: '' }])

  // Location mode state
  const [locationMode, setLocationMode] = useState<'preset' | 'custom'>('preset')

  const startEditing = (field: EditableField) => {
    setEditDate(localWedding.weddingDate?.split('T')[0] || '')
    setEditLocation(localWedding.location || '')
    setEditGuestCount(localWedding.guestCount?.toString() || '')
    setEditBudget(Math.round(localWedding.budgetTotal / 100).toString())
    setEditStyle(localWedding.style || '')

    // Determine date mode from current data
    if (field === 'date') {
      if (localWedding.weddingDate && !localWedding.dateFlexible) {
        setDateMode('specific')
      } else if (localWedding.dateFlexible && localWedding.preferredDates && localWedding.preferredDates.length > 0) {
        setDateMode('flexible')
        setEditDateRanges(localWedding.preferredDates)
      } else {
        setDateMode('deciding')
      }
    }

    // Determine location mode from current data
    if (field === 'location') {
      const currentLoc = localWedding.location || ''
      if (LOCATION_OPTIONS.includes(currentLoc) || !currentLoc) {
        setLocationMode('preset')
      } else {
        setLocationMode('custom')
      }
    }

    setEditingField(field)
  }

  const cancelEditing = () => setEditingField(null)

  const saveField = async () => {
    setSaving(true)
    try {
      // Build date-related payload
      let datePayloadDate: string
      let datePayloadSpecificDate: string | null = null
      let datePayloadPreferredDates: DateRange[] | undefined = undefined

      if (editingField === 'date') {
        datePayloadDate = dateMode
        if (dateMode === 'specific') {
          datePayloadSpecificDate = editDate || null
        } else if (dateMode === 'flexible') {
          const validRanges = editDateRanges.filter(r => r.start && r.end)
          datePayloadPreferredDates = validRanges.length > 0 ? validRanges : undefined
          if (!datePayloadPreferredDates) {
            datePayloadDate = 'deciding'
          }
        }
      } else {
        // Not editing date - preserve current state
        if (localWedding.weddingDate && !localWedding.dateFlexible) {
          datePayloadDate = 'specific'
          datePayloadSpecificDate = localWedding.weddingDate.split('T')[0]
        } else if (localWedding.dateFlexible && localWedding.preferredDates && localWedding.preferredDates.length > 0) {
          datePayloadDate = 'flexible'
          datePayloadPreferredDates = localWedding.preferredDates
        } else {
          datePayloadDate = 'deciding'
        }
      }

      const payload: Record<string, unknown> = {
        date: datePayloadDate,
        specificDate: datePayloadSpecificDate,
        location: editingField === 'location' ? editLocation : (localWedding.location || ''),
        guestCount: editingField === 'guestCount' ? editGuestCount : (localWedding.guestCount?.toString() || ''),
        budget: editingField === 'budget' ? editBudget : Math.round(localWedding.budgetTotal / 100).toString(),
        style: editingField === 'style' ? editStyle : (localWedding.style || ''),
      }

      if (datePayloadPreferredDates) {
        payload.preferredDates = datePayloadPreferredDates
      }

      const response = await fetch('/api/wedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to save')

      const newWedding = { ...localWedding }
      switch (editingField) {
        case 'date':
          if (dateMode === 'specific' && editDate) {
            newWedding.weddingDate = new Date(editDate + 'T00:00:00').toISOString()
            newWedding.dateFlexible = false
            newWedding.preferredDates = null
          } else if (dateMode === 'flexible' && datePayloadPreferredDates) {
            newWedding.preferredDates = datePayloadPreferredDates
            newWedding.weddingDate = new Date(datePayloadPreferredDates[0].start + 'T00:00:00').toISOString()
            newWedding.dateFlexible = true
          } else {
            newWedding.weddingDate = null
            newWedding.dateFlexible = true
            newWedding.preferredDates = null
          }
          break
        case 'location':
          newWedding.location = editLocation
          break
        case 'guestCount':
          newWedding.guestCount = parseInt(editGuestCount) || null
          break
        case 'budget':
          newWedding.budgetTotal = (parseInt(editBudget) || 0) * 100
          break
        case 'style':
          newWedding.style = editStyle
          break
      }
      setLocalWedding(newWedding)
      setEditingField(null)
      router.refresh()
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (data: WeddingData) => {
    if (!data.dateFlexible && data.weddingDate) {
      return new Date(data.weddingDate).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }
    if (data.dateFlexible && data.preferredDates && data.preferredDates.length > 0) {
      return `${data.preferredDates.length} date range${data.preferredDates.length > 1 ? 's' : ''}`
    }
    if (data.dateFlexible) {
      return 'Flexible / undecided'
    }
    return 'Not set'
  }

  const formatBudget = (cents: number) => {
    if (!cents) return 'Not set'
    return `$${(cents / 100).toLocaleString()}`
  }

  const addEditDateRange = () => {
    setEditDateRanges([...editDateRanges, { start: '', end: '' }])
  }

  const removeEditDateRange = (index: number) => {
    setEditDateRanges(editDateRanges.filter((_, i) => i !== index))
  }

  const updateEditDateRange = (index: number, field: 'start' | 'end', value: string) => {
    const updated = [...editDateRanges]
    updated[index] = { ...updated[index], [field]: value }
    setEditDateRanges(updated)
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg dark:shadow-gray-900/30 border border-white/50 dark:border-gray-700/50 mb-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
          <h2 className="text-2xl font-serif font-medium text-gray-900 dark:text-white">Your Wedding</h2>
        </div>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 font-light mb-6 ml-15">Click any field to edit</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Date */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">Date</div>
            {editingField === 'date' ? (
              <div>
                {/* Date mode toggle chips */}
                <div className="flex gap-1.5 mb-3">
                  {(['specific', 'flexible', 'deciding'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => {
                        setDateMode(mode)
                        if (mode === 'flexible' && editDateRanges.length === 0) {
                          setEditDateRanges([{ start: '', end: '' }])
                        }
                      }}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                        dateMode === mode
                          ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-rose-300 dark:hover:border-rose-600'
                      }`}
                    >
                      {mode === 'specific' ? 'Specific' : mode === 'flexible' ? 'Flexible' : 'Undecided'}
                    </button>
                  ))}
                </div>
                {dateMode === 'specific' && (
                  <input
                    type="date"
                    value={editDate}
                    onChange={e => setEditDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white dark:[color-scheme:dark]"
                  />
                )}
                {dateMode === 'flexible' && (
                  <div className="space-y-2">
                    {editDateRanges.map((range, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <div className="flex-1 grid grid-cols-2 gap-1.5">
                          <input
                            type="date"
                            value={range.start}
                            onChange={(e) => updateEditDateRange(index, 'start', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            placeholder="From"
                            className="w-full px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white dark:[color-scheme:dark]"
                          />
                          <input
                            type="date"
                            value={range.end}
                            onChange={(e) => updateEditDateRange(index, 'end', e.target.value)}
                            min={range.start || new Date().toISOString().split('T')[0]}
                            placeholder="To"
                            className="w-full px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white dark:[color-scheme:dark]"
                          />
                        </div>
                        {editDateRanges.length > 1 && (
                          <button
                            onClick={() => removeEditDateRange(index)}
                            className="p-0.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addEditDateRange}
                      className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                      </svg>
                      Add range
                    </button>
                  </div>
                )}
                {dateMode === 'deciding' && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light">No date set yet</p>
                )}
                <SaveCancelButtons onSave={saveField} onCancel={cancelEditing} saving={saving} />
              </div>
            ) : (
              <button
                onClick={() => startEditing('date')}
                className="group flex items-center gap-2 text-base text-gray-900 dark:text-white font-light hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
              >
                <span>{formatDate(localWedding)}</span>
                <EditIcon />
              </button>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">Location</div>
            {editingField === 'location' ? (
              <div>
                {/* Location mode toggle */}
                <div className="flex gap-1.5 mb-3">
                  <button
                    onClick={() => {
                      setLocationMode('preset')
                      if (!LOCATION_OPTIONS.includes(editLocation)) setEditLocation('')
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                      locationMode === 'preset'
                        ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-rose-300 dark:hover:border-rose-600'
                    }`}
                  >
                    Region
                  </button>
                  <button
                    onClick={() => {
                      setLocationMode('custom')
                      if (LOCATION_OPTIONS.includes(editLocation)) setEditLocation('')
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                      locationMode === 'custom'
                        ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-rose-300 dark:hover:border-rose-600'
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {locationMode === 'preset' ? (
                  <select
                    value={editLocation}
                    onChange={e => setEditLocation(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white"
                  >
                    <option value="">Select...</option>
                    {LOCATION_OPTIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={editLocation}
                    onChange={e => setEditLocation(e.target.value)}
                    placeholder="e.g. Coogee, Wollongong"
                    className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white"
                  />
                )}
                <SaveCancelButtons onSave={saveField} onCancel={cancelEditing} saving={saving} />
              </div>
            ) : (
              <button
                onClick={() => startEditing('location')}
                className="group flex items-center gap-2 text-base text-gray-900 dark:text-white font-light hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
              >
                <span>{localWedding.location || 'Not set'}</span>
                <EditIcon />
              </button>
            )}
          </div>
        </div>

        {/* Guest Count */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">Guests</div>
            {editingField === 'guestCount' ? (
              <div>
                <input
                  type="number"
                  value={editGuestCount}
                  onChange={e => setEditGuestCount(e.target.value)}
                  min={1}
                  max={1000}
                  placeholder="Enter guest count"
                  className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {GUEST_PRESETS.map(p => (
                    <button
                      key={p.value}
                      onClick={() => setEditGuestCount(p.value.toString())}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                        editGuestCount === p.value.toString()
                          ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-rose-300 dark:hover:border-rose-600'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <SaveCancelButtons onSave={saveField} onCancel={cancelEditing} saving={saving} />
              </div>
            ) : (
              <button
                onClick={() => startEditing('guestCount')}
                className="group flex items-center gap-2 text-base text-gray-900 dark:text-white font-light hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
              >
                <span>{localWedding.guestCount || 'Not set'}</span>
                <EditIcon />
              </button>
            )}
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">Budget</div>
            {editingField === 'budget' ? (
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">$</span>
                  <input
                    type="number"
                    value={editBudget}
                    onChange={e => setEditBudget(e.target.value)}
                    min={0}
                    step={1000}
                    placeholder="Enter budget"
                    className="w-full pl-7 pr-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {BUDGET_PRESETS.map(p => (
                    <button
                      key={p.value}
                      onClick={() => setEditBudget(p.value.toString())}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                        editBudget === p.value.toString()
                          ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-rose-300 dark:hover:border-rose-600'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <SaveCancelButtons onSave={saveField} onCancel={cancelEditing} saving={saving} />
              </div>
            ) : (
              <button
                onClick={() => startEditing('budget')}
                className="group flex items-center gap-2 text-base text-gray-900 dark:text-white font-light hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
              >
                <span>{formatBudget(localWedding.budgetTotal)}</span>
                <EditIcon />
              </button>
            )}
          </div>
        </div>

        {/* Style */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">Style</div>
            {editingField === 'style' ? (
              <div>
                <select
                  value={editStyle}
                  onChange={e => setEditStyle(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 text-gray-900 dark:text-white"
                >
                  <option value="">Select...</option>
                  {STYLE_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <SaveCancelButtons onSave={saveField} onCancel={cancelEditing} saving={saving} />
              </div>
            ) : (
              <button
                onClick={() => startEditing('style')}
                className="group flex items-center gap-2 text-base text-gray-900 dark:text-white font-light hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
              >
                <span>{localWedding.style || 'Not set'}</span>
                <EditIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
