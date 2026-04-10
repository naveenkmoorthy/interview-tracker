import { useRef, useState } from 'react'
import type { Job } from '../types/job'

type AddJobFormProps = {
  onAdd: (company: string, role: string, status: Job['status']) => void
}

export function AddJobForm({ onAdd }: AddJobFormProps) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [showError, setShowError] = useState(false)
  const [addedHint, setAddedHint] = useState(false)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedCompany = company.trim()
    const trimmedRole = role.trim()
    if (!trimmedCompany || !trimmedRole) {
      setShowError(true)
      return
    }
    onAdd(trimmedCompany, trimmedRole, 'Applied')
    setCompany('')
    setRole('')
    setShowError(false)

    setAddedHint(true)
    if (hintTimer.current) clearTimeout(hintTimer.current)
    hintTimer.current = setTimeout(() => {
      setAddedHint(false)
      hintTimer.current = null
    }, 2800)
  }

  const companyEmpty = showError && company.trim().length === 0
  const roleEmpty = showError && role.trim().length === 0

  /** Shared height so inputs and submit match (h-10 = 2.5rem, same visual rhythm as py-2.5 + text-sm). */
  const inputBase =
    'w-full h-10 box-border bg-surface-container-low border-none rounded-md px-4 text-sm leading-normal focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant'
  const inputError = 'ring-2 ring-error/60'

  return (
    <section className="mb-16">
      <div className="bg-surface-container-lowest p-8 rounded-xl ghost-border">
        <div className="mb-6">
          <h2 className="text-sm font-medium tracking-widest uppercase text-on-surface-variant mb-1">
            New Opportunity
          </h2>
          <p className="text-on-surface-variant/70 text-sm">
            Add a new job application to your pipeline.
          </p>
        </div>
        <form
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 items-end${showError ? ' animate-shake' : ''}`}
          onSubmit={handleSubmit}
          onAnimationEnd={() => setShowError((v) => (v ? v : false))}
        >
          <div className="md:col-span-1">
            <label
              className="block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase"
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              className={`${inputBase}${companyEmpty ? ` ${inputError}` : ''}`}
              id="company"
              placeholder="e.g. Vercel"
              type="text"
              required
              value={company}
              onChange={(e) => {
                setCompany(e.target.value)
                if (showError) setShowError(false)
              }}
            />
          </div>
          <div className="md:col-span-1">
            <label
              className="block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase"
              htmlFor="role"
            >
              Role
            </label>
            <input
              className={`${inputBase}${roleEmpty ? ` ${inputError}` : ''}`}
              id="role"
              placeholder="e.g. Senior Frontend"
              type="text"
              required
              value={role}
              onChange={(e) => {
                setRole(e.target.value)
                if (showError) setShowError(false)
              }}
            />
          </div>
          <div className="md:col-span-1 flex flex-col">
            {/* Spacer matches label row height in adjacent columns so the button aligns with inputs (md+ only) */}
            <span
              className="hidden md:block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase invisible"
              aria-hidden
            >
              Company Name
            </span>
            <div className="w-full">
              <button
                className="w-full h-10 box-border bg-linear-to-b from-primary to-primary-dim text-on-primary px-4 rounded-md font-medium text-sm leading-normal hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                type="submit"
              >
                <span className="material-symbols-outlined text-sm" data-icon="add">
                  add
                </span>
                Add Job
              </button>
            </div>
          </div>
        </form>
        {showError && (
          <p className="mt-3 text-xs text-error font-medium">
            Both fields are required.
          </p>
        )}
      </div>

      {addedHint && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-4 left-4 right-4 z-[200] flex items-center justify-center sm:left-auto sm:right-8 sm:bottom-8 sm:max-w-sm sm:justify-end"
        >
          <div className="flex w-full items-center gap-2.5 rounded-xl bg-surface-container-lowest px-4 py-3 text-sm font-medium text-on-surface shadow-[0_4px_24px_rgba(42,52,57,0.14)] ghost-border animate-toast-in sm:w-auto">
            <span className="material-symbols-outlined shrink-0 text-primary text-xl" data-icon="check_circle" aria-hidden>
              check_circle
            </span>
            <span>Application added</span>
          </div>
        </div>
      )}
    </section>
  )
}
