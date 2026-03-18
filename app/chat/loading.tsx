export default function ChatLoading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />
        <div className="h-5 w-40 mx-auto bg-stone-200 dark:bg-stone-700 rounded" />
      </div>
    </div>
  )
}
