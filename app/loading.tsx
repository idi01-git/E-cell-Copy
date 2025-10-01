/**
 * Loading component for route transitions
 * Shown while navigating between pages
 */
export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        ></div>
        <p className="text-white/70 text-sm font-medium">
          <span className="sr-only">Loading, please wait.</span>
          <span aria-hidden="true">Loading E-Cell...</span>
        </p>
      </div>
    </div>
  );
}
