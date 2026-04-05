import { useEffect, useRef, useState } from 'react'
import { JOB_STATUSES, type JobStatus } from '../types/job'
import { getJobAttention } from '../utils/jobAttention'
import { ConfirmModal } from './ConfirmModal'
import { NotesModal } from './NotesModal'

const statusPresentation: Record<
  JobStatus,
  { icon: string; iconWrap: string; iconClass: string; badge: string }
> = {
  Applied: {
    icon: 'corporate_fare',
    iconWrap: 'w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center',
    iconClass: 'material-symbols-outlined text-primary',
    badge:
      'text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant',
  },
  Interview: {
    icon: 'developer_mode',
    iconWrap:
      'w-12 h-12 rounded-lg bg-tertiary-container/30 flex items-center justify-center',
    iconClass: 'material-symbols-outlined text-tertiary',
    badge:
      'text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-tertiary-container text-tertiary',
  },
  Offer: {
    icon: 'verified',
    iconWrap: 'w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center',
    iconClass: 'material-symbols-outlined text-emerald-600',
    badge:
      'text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800',
  },
  Rejected: {
    icon: 'cancel',
    iconWrap:
      'w-12 h-12 rounded-lg bg-error-container/10 flex items-center justify-center',
    iconClass: 'material-symbols-outlined text-error',
    badge:
      'text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-error-container text-on-error-container',
  },
}

export type JobListItemProps = {
  id: string
  company: string
  role: string
  status: JobStatus
  createdAt: string
  updatedAt?: string
  lastContactedAt?: string
  notes?: string
  /** Wall-clock time for staleness; must change over time (see JobList). */
  nowMs: number
  onUpdateStatus: (id: string, status: JobStatus) => void
  onMarkFollowedUp: (id: string) => void
  onDelete: (id: string) => void
  onUpdateNotes: (id: string, notes: string) => void
}

const MS_PER_DAY = 86400000

function relativeContactLabel(lastContactedAt: string | undefined, nowMs: number): string | null {
  if (!lastContactedAt) return null
  const ms = Date.parse(lastContactedAt)
  if (!Number.isFinite(ms)) return null
  const days = Math.floor((nowMs - ms) / MS_PER_DAY)
  if (days <= 0) return 'Last contacted today'
  if (days === 1) return 'Last contacted yesterday'
  return `Last contacted ${days} days ago`
}

export function JobListItem({
  id,
  company,
  role,
  status,
  createdAt,
  updatedAt,
  lastContactedAt,
  notes,
  nowMs,
  onUpdateStatus,
  onMarkFollowedUp,
  onDelete,
  onUpdateNotes,
}: JobListItemProps) {
  const attention = getJobAttention(
    {
      id,
      company,
      role,
      status,
      createdAt,
      updatedAt,
      lastContactedAt,
    },
    nowMs,
  )

  const contactLabel = relativeContactLabel(lastContactedAt, nowMs)

  const p = statusPresentation[status]
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <div
      className="group/row relative bg-surface-container-lowest p-6 rounded-xl ghost-border flex items-center justify-between transition-all hover:bg-surface-container-low"
    >
      <div className="flex items-center gap-6 min-w-0">
        <div className={p.iconWrap}>
          <span className={p.iconClass} data-icon={p.icon}>
            {p.icon}
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-on-surface leading-tight flex items-center gap-1.5">
            {company}
            {attention.needsAttention && (
              <span className="group/dot relative inline-flex shrink-0">
                <span className="w-4 h-4 rounded-full bg-error inline-flex items-center justify-center" aria-hidden>
                  <span className="text-[9px] font-black leading-none text-on-error">!</span>
                </span>
                <span id={`job-attn-${id}`} className="sr-only">{attention.tooltipText}</span>
                <span
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full z-50 mt-1.5 w-max max-w-[min(260px,calc(100vw-3rem))] rounded-lg bg-surface-container-highest px-3 py-2 text-xs leading-snug text-on-surface shadow-[0_4px_16px_rgba(42,52,57,0.12)] ghost-border opacity-0 invisible transition-[opacity,visibility] duration-150 group-hover/dot:opacity-100 group-hover/dot:visible"
                  aria-hidden
                >
                  {attention.tooltipText}
                </span>
              </span>
            )}
          </h4>
          <p className="text-sm text-on-surface-variant font-medium">{role}</p>
          {contactLabel && (
            <p className="text-xs text-on-surface-variant/70 mt-0.5">{contactLabel}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {attention.needsAttention && (
          <button
            type="button"
            className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-on-surface-variant/70 hover:text-on-surface-variant transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded px-1 py-0.5"
            aria-label="Mark as followed up"
            aria-describedby={`job-attn-${id}`}
            onClick={() => onMarkFollowedUp(id)}
          >
            <span className="material-symbols-outlined text-base" data-icon="done_all">done_all</span>
            Mark as followed up
          </button>
        )}
        <span className={p.badge}>{status}</span>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold tracking-widest uppercase text-on-surface-variant/80 bg-surface-container hover:bg-surface-container-high transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label={`Notes for ${company}, ${role}`}
          onClick={() => setNotesOpen(true)}
        >
          <span className="material-symbols-outlined text-base" data-icon="menu">
            menu
          </span>
          NOTES
        </button>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-xl" data-icon="more_vert">
              more_vert
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-surface-container-lowest/90 backdrop-blur-[20px] rounded-xl ghost-border shadow-[0_1px_2px_rgba(42,52,57,0.04),0_4px_12px_rgba(42,52,57,0.08)] py-1">
              <div className="px-3 py-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                  Move to
                </span>
              </div>
              {JOB_STATUSES.filter((s) => s !== status).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2"
                  onClick={() => {
                    onUpdateStatus(id, s)
                    setMenuOpen(false)
                  }}
                >
                  <span
                    className="material-symbols-outlined text-base text-on-surface-variant"
                    data-icon={statusPresentation[s].icon}
                  >
                    {statusPresentation[s].icon}
                  </span>
                  {s}
                </button>
              ))}
              <div className="border-t border-outline-variant/15 my-1" />
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error-container/10 transition-colors flex items-center gap-2"
                onClick={() => {
                  setConfirmOpen(true)
                  setMenuOpen(false)
                }}
              >
                <span
                  className="material-symbols-outlined text-base"
                  data-icon="delete"
                >
                  delete
                </span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {notesOpen && (
        <NotesModal
          key={id}
          jobId={id}
          company={company}
          role={role}
          initialNotes={notes ?? ''}
          onNotesChange={onUpdateNotes}
          onClose={() => setNotesOpen(false)}
        />
      )}
      {confirmOpen && (
        <ConfirmModal
          title="Delete application?"
          description={`"${company} \u2014 ${role}" will be permanently removed.`}
          confirmLabel="Delete"
          onConfirm={() => { onDelete(id); setConfirmOpen(false) }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  )
}
