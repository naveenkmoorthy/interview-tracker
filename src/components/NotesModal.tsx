import { useCallback, useEffect, useRef, useState } from 'react'
import { ModalShell } from './ModalShell'

const DEBOUNCE_MS = 400

type NotesModalProps = {
  jobId: string
  company: string
  role: string
  initialNotes: string
  onNotesChange: (id: string, notes: string) => void
  onClose: () => void
}

export function NotesModal({
  jobId,
  company,
  role,
  initialNotes,
  onNotesChange,
  onClose,
}: NotesModalProps) {
  const [text, setText] = useState(initialNotes)
  const [saveHint, setSaveHint] = useState<'idle' | 'saving' | 'saved'>('idle')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const savedClearRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  useEffect(() => {
    if (text === initialNotes) {
      setSaveHint((h) => (h === 'saving' ? 'idle' : h))
      return
    }

    setSaveHint('saving')
    const timer = window.setTimeout(() => {
      onNotesChange(jobId, text)
      setSaveHint('saved')
      if (savedClearRef.current) window.clearTimeout(savedClearRef.current)
      savedClearRef.current = window.setTimeout(() => {
        setSaveHint('idle')
        savedClearRef.current = null
      }, 1500)
    }, DEBOUNCE_MS)
    return () => {
      window.clearTimeout(timer)
    }
  }, [text, jobId, onNotesChange, initialNotes])

  useEffect(() => {
    return () => {
      if (savedClearRef.current) window.clearTimeout(savedClearRef.current)
    }
  }, [])

  const flushAndClose = useCallback(() => {
    if (text !== initialNotes) {
      onNotesChange(jobId, text)
    }
    onClose()
  }, [jobId, text, initialNotes, onNotesChange, onClose])

  return (
    <ModalShell onClose={flushAndClose} maxWidthClass="max-w-md">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-xl" data-icon="notes">
              notes
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-on-surface">Notes</h3>
            <p className="text-xs text-on-surface-variant truncate" title={`${company} — ${role}`}>
              {company} — {role}
            </p>
          </div>
        </div>
        {saveHint !== 'idle' && (
          <span className="text-[11px] font-medium text-on-surface-variant/80 shrink-0 pt-1">
            {saveHint === 'saving' ? 'Saving…' : 'Saved'}
          </span>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full min-h-40 resize-y rounded-lg border border-outline-variant/25 bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 mb-6"
        placeholder="Add notes about this application…"
        aria-label={`Notes for ${company}, ${role}`}
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={flushAndClose}
          className="px-4 py-2 rounded-md text-sm font-medium text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors"
        >
          Close
        </button>
      </div>
    </ModalShell>
  )
}
