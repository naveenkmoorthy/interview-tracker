import { useEffect, type ReactNode } from 'react'

type ModalShellProps = {
  children: ReactNode
  onClose: () => void
  /** Wider dialogs (e.g. notes) use max-w-md; confirm stays max-w-sm. */
  maxWidthClass?: 'max-w-sm' | 'max-w-md'
}

export function ModalShell({ children, onClose, maxWidthClass = 'max-w-sm' }: ModalShellProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className={`bg-surface-container-lowest rounded-2xl ghost-border shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6 w-full ${maxWidthClass} mx-4`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
