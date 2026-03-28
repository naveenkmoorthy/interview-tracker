export function Footer() {
  return (
    <footer className="w-full mt-auto py-8 border-t border-[#a9b4b9]/15 bg-surface dark:bg-[#1a1c1e]">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="flex gap-8">
          <a
            className="text-[10px] uppercase tracking-widest font-medium Inter text-[#545f73]/50 dark:text-[#d1d5db]/50 hover:text-[#545f73] dark:hover:text-[#f7f9fb] transition-opacity"
            href="#"
          >
            Privacy
          </a>
          <a
            className="text-[10px] uppercase tracking-widest font-medium Inter text-[#545f73]/50 dark:text-[#d1d5db]/50 hover:text-[#545f73] dark:hover:text-[#f7f9fb] transition-opacity"
            href="#"
          >
            Terms
          </a>
          <a
            className="text-[10px] uppercase tracking-widest font-medium Inter text-[#545f73]/50 dark:text-[#d1d5db]/50 hover:text-[#545f73] dark:hover:text-[#f7f9fb] transition-opacity"
            href="#"
          >
            Support
          </a>
        </div>
        <p className="text-[10px] uppercase tracking-widest font-medium Inter text-[#545f73]/50 dark:text-[#d1d5db]/50">
          © 2024 Interview Tracker. Designed for precision.
        </p>
      </div>
    </footer>
  )
}
