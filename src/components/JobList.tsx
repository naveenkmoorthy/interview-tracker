import { useMemo, useState } from 'react'
import { JOB_STATUSES, type Job, type JobStatus } from '../types/job'
import { JobListItem } from './JobListItem'

type JobListProps = {
  jobs: Job[]
  onUpdateStatus: (id: string, status: JobStatus) => void
  onDelete: (id: string) => void
}

type StatusFilter = 'all' | JobStatus
type DateSort = 'newest' | 'oldest'

function createdAtMs(iso: string | undefined): number {
  if (typeof iso !== 'string' || !iso) return 0
  const t = Date.parse(iso)
  return Number.isFinite(t) ? t : 0
}

const selectClass =
  'bg-surface-container-low border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all text-on-surface min-w-0'

export function JobList({ jobs, onUpdateStatus, onDelete }: JobListProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [dateSort, setDateSort] = useState<DateSort>('newest')

  const displayJobs = useMemo(() => {
    const filtered =
      statusFilter === 'all'
        ? jobs.slice()
        : jobs.filter((j) => j.status === statusFilter)
    const mult = dateSort === 'newest' ? -1 : 1
    filtered.sort((a, b) => {
      const byTime =
        (createdAtMs(a.createdAt) - createdAtMs(b.createdAt)) * mult
      if (byTime !== 0) return byTime
      return mult * a.id.localeCompare(b.id)
    })
    return filtered
  }, [jobs, statusFilter, dateSort])

  const filterActive = statusFilter !== 'all'

  return (
    <section>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mb-8">
        <h3 className="text-lg font-semibold tracking-tight text-on-surface">
          Active Pipeline
        </h3>
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-on-surface-variant whitespace-nowrap">
              Status
              <select
                aria-label="Filter by status"
                className={selectClass}
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as StatusFilter)
                }
              >
                <option value="all">All</option>
                {JOB_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-on-surface-variant whitespace-nowrap">
              Sort by date
              <select
                aria-label="Sort by date"
                className={selectClass}
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value as DateSort)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded">
              {displayJobs.length} shown
            </span>
            {filterActive && (
              <span className="text-xs font-medium text-on-surface-variant/80">
                of {jobs.length} total
              </span>
            )}
          </div>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="mt-4 py-16 text-center border-2 border-dashed border-outline-variant/15 rounded-xl">
          <span
            className="material-symbols-outlined text-outline-variant text-4xl mb-4 block"
            data-icon="work_outline"
          >
            work_outline
          </span>
          <p className="text-on-surface-variant text-sm font-medium">
            No applications yet. Add your first one above.
          </p>
        </div>
      ) : displayJobs.length === 0 ? (
        <div className="mt-4 py-16 text-center border-2 border-dashed border-outline-variant/15 rounded-xl">
          <span
            className="material-symbols-outlined text-outline-variant text-4xl mb-4 block"
            data-icon="filter_alt_off"
          >
            filter_alt_off
          </span>
          <p className="text-on-surface-variant text-sm font-medium">
            No jobs match this status.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayJobs.map((job) => (
            <JobListItem
              key={job.id}
              id={job.id}
              company={job.company}
              role={job.role}
              status={job.status}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
