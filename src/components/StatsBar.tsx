import { JOB_STATUSES, type Job, type JobStatus } from '../types/job'

type StatusFilter = 'all' | JobStatus

const statusStyle: Record<JobStatus, { icon: string; bg: string; text: string }> = {
  Applied: {
    icon: 'corporate_fare',
    bg: 'bg-surface-variant',
    text: 'text-on-surface-variant',
  },
  Interview: {
    icon: 'developer_mode',
    bg: 'bg-tertiary-container',
    text: 'text-tertiary',
  },
  Offer: {
    icon: 'verified',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
  },
  Rejected: {
    icon: 'cancel',
    bg: 'bg-error-container',
    text: 'text-on-error-container',
  },
}

type SortOrder = 'newest' | 'oldest'

type StatsBarProps = {
  jobs: Job[]
  activeFilter: StatusFilter
  onFilterChange: (filter: StatusFilter) => void
  sortOrder: SortOrder
  onSortChange: (order: SortOrder) => void
}

export function StatsBar({ jobs, activeFilter, onFilterChange, sortOrder, onSortChange }: StatsBarProps) {
  const total = jobs.length
  const counts = Object.fromEntries(
    JOB_STATUSES.map((s) => [s, jobs.filter((j) => j.status === s).length]),
  ) as Record<JobStatus, number>

  function toggle(filter: StatusFilter) {
    onFilterChange(activeFilter === filter ? 'all' : filter)
  }

  const isAllActive = activeFilter === 'all'

  return (
    <section className="py-8">
      <h3 className="text-lg font-semibold tracking-tight text-on-surface mb-4">
        Active Pipeline
      </h3>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => toggle('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container transition-all ${
            isAllActive
              ? 'ring-2 ring-primary shadow-sm'
              : 'opacity-60 hover:opacity-90'
          }`}
        >
          <span className="material-symbols-outlined text-base text-on-surface-variant" data-icon="bar_chart">
            bar_chart
          </span>
          <span className="text-sm font-semibold text-on-surface">{total}</span>
          <span className="text-xs text-on-surface-variant">Total</span>
        </button>

        {JOB_STATUSES.map((status) => {
          const s = statusStyle[status]
          const isActive = activeFilter === status
          return (
            <button
              type="button"
              key={status}
              onClick={() => toggle(status)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${s.bg} transition-all ${
                isActive
                  ? 'ring-2 ring-primary shadow-sm'
                  : 'opacity-60 hover:opacity-90'
              }`}
            >
              <span className={`material-symbols-outlined text-base ${s.text}`} data-icon={s.icon}>
                {s.icon}
              </span>
              <span className={`text-sm font-semibold ${s.text}`}>{counts[status]}</span>
              <span className={`text-xs ${s.text} opacity-75`}>{status}</span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => onSortChange(sortOrder === 'newest' ? 'oldest' : 'newest')}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container transition-all ring-2 ring-primary shadow-sm"
        >
          <span
            className="material-symbols-outlined text-base text-on-surface-variant"
            data-icon={sortOrder === 'newest' ? 'arrow_downward' : 'arrow_upward'}
          >
            {sortOrder === 'newest' ? 'arrow_downward' : 'arrow_upward'}
          </span>
          <span className="text-xs font-medium text-on-surface">
            {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
          </span>
        </button>
      </div>
    </section>
  )
}
