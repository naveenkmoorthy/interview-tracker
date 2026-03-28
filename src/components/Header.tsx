export function Header() {
  return (
    <header className="w-full border-b border-outline-variant/15 bg-surface dark:bg-[#1a1c1e] z-50">
      <div className="flex justify-center items-center px-8 h-16 max-w-7xl mx-auto font-['Inter'] tracking-tight">
        <div className="flex items-center gap-8">
          <span className="text-xl font-semibold tracking-tighter text-[#2a3439] dark:text-[#f7f9fb]">
            Interview Tracker
          </span>
        </div>
      </div>
    </header>
  )
}
