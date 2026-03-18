export default function VendorsLoading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 w-56 bg-stone-200 dark:bg-stone-700 rounded-xl animate-pulse mb-3" />
          <div className="h-4 w-80 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
        </div>

        {/* Vendor cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-stone-900 rounded-lg p-6 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-stone-200 dark:bg-stone-700 rounded-xl" />
                <div>
                  <div className="h-5 w-32 bg-stone-200 dark:bg-stone-700 rounded mb-2" />
                  <div className="h-3 w-20 bg-stone-200 dark:bg-stone-700 rounded" />
                </div>
              </div>
              <div className="h-16 bg-gray-100 dark:bg-stone-800 rounded-xl mb-4" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-stone-200 dark:bg-stone-700 rounded-full" />
                <div className="h-6 w-20 bg-stone-200 dark:bg-stone-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
