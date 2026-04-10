export function Header() {
  return (
    <header className="w-full border-b border-outline-variant/15 bg-surface z-50">
      <div className="flex justify-center items-center px-8 h-16 max-w-7xl mx-auto font-['Inter'] tracking-tight">
        <div className="flex items-center gap-8">
          <span className="text-xl font-semibold tracking-tighter text-on-surface">
            Interview Tracker
          </span>
        </div>
      </div>
    </header>
  )
}
