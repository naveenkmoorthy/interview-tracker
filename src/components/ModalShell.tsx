import { useEffect, useRef, type ReactNode } from 'react'

type ModalShellProps = {
  children: ReactNode
  onClose: () => void
  /** Wider dialogs (e.g. notes) use max-w-md; confirm stays max-w-sm. */
  maxWidthClass?: 'max-w-sm' | 'max-w-md'
  ariaLabelledBy?: string
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ModalShell({ children, onClose, maxWidthClass = 'max-w-sm', ariaLabelledBy }: ModalShellProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<Element | null>(null)

  useEffect(() => {
    previousFocus.current = document.activeElement

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prev;
      (previousFocus.current as HTMLElement | null)?.focus()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      onMouseDown={onClose}
    >
      <div
        ref={panelRef}
        className={`bg-surface-container-lowest rounded-2xl ghost-border shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6 w-full ${maxWidthClass} mx-4`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
