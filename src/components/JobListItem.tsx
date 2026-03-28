export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected'

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
  company: string
  role: string
  status: JobStatus
}

export function JobListItem({ company, role, status }: JobListItemProps) {
  const p = statusPresentation[status]
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
        <button
          type="button"
          className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-xl" data-icon="more_vert">
            more_vert
          </span>
        </button>
      </div>
    </div>
  )
}
