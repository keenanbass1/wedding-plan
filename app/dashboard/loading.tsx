export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-stone-200 dark:bg-stone-700 rounded-xl animate-pulse" />
          <div className="h-10 w-32 bg-stone-200 dark:bg-stone-700 rounded-xl animate-pulse" />
        </div>

        {/* Summary card skeleton */}
        <div className="bg-white dark:bg-stone-900 rounded-xl p-8 mb-8 animate-pulse">
          <div className="h-6 w-40 bg-stone-200 dark:bg-stone-700 rounded mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 dark:bg-stone-800 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-stone-900 rounded-lg p-6 animate-pulse">
              <div className="h-4 w-20 bg-stone-200 dark:bg-stone-700 rounded mb-3" />
              <div className="h-8 w-12 bg-stone-200 dark:bg-stone-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
