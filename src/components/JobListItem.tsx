import { useEffect, useRef, useState } from 'react'
import { JOB_STATUSES, type JobStatus } from '../types/job'

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
  onUpdateStatus: (id: string, status: JobStatus) => void
  onDelete: (id: string) => void
}

export function JobListItem({
  id,
  company,
  role,
  status,
  onUpdateStatus,
  onDelete,
}: JobListItemProps) {
  const p = statusPresentation[status]
  const [menuOpen, setMenuOpen] = useState(false)
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
    <div className="group bg-surface-container-lowest p-6 rounded-xl ghost-border flex items-center justify-between transition-all hover:bg-surface-container-low">
      <div className="flex items-center gap-6">
        <div className={p.iconWrap}>
          <span className={p.iconClass} data-icon={p.icon}>
            {p.icon}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-on-surface leading-tight">{company}</h4>
          <p className="text-sm text-on-surface-variant font-medium">{role}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={p.badge}>{status}</span>
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
                  if (!window.confirm(`Delete "${company}" application?`)) return
                  onDelete(id)
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
    </div>
  )
}
