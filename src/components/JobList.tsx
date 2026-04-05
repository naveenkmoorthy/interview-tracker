import { useEffect, useMemo, useState } from 'react'
import type { Job, JobStatus } from '../types/job'
import { JobListItem } from './JobListItem'

type StatusFilter = 'all' | JobStatus
type SortOrder = 'newest' | 'oldest'

type JobListProps = {
  jobs: Job[]
  statusFilter: StatusFilter
  sortOrder: SortOrder
  onUpdateStatus: (id: string, status: JobStatus) => void
  onMarkFollowedUp: (id: string) => void
  onDelete: (id: string) => void
  onUpdateNotes: (id: string, notes: string) => void
}

function createdAtMs(iso: string | undefined): number {
  if (typeof iso !== 'string' || !iso) return 0
  const t = Date.parse(iso)
  return Number.isFinite(t) ? t : 0
}

const STALENESS_TICK_MS = 60 * 60 * 1000

export function JobList({
  jobs,
  statusFilter,
  sortOrder,
  onUpdateStatus,
  onMarkFollowedUp,
  onDelete,
  onUpdateNotes,
}: JobListProps) {
  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    const bump = () => setNowMs(Date.now())
    const intervalId = window.setInterval(bump, STALENESS_TICK_MS)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') bump()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const displayJobs = useMemo(() => {
    const filtered =
      statusFilter === 'all'
        ? jobs.slice()
        : jobs.filter((j) => j.status === statusFilter)
    const dir = sortOrder === 'newest' ? 1 : -1
    filtered.sort((a, b) => {
      const byTime = createdAtMs(b.createdAt) - createdAtMs(a.createdAt)
      if (byTime !== 0) return byTime * dir
      return b.id.localeCompare(a.id) * dir
    })
    return filtered
  }, [jobs, statusFilter, sortOrder])

  return (
    <section>
      {jobs.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-outline-variant/15 rounded-xl">
          <span
            className="material-symbols-outlined text-outline-variant text-4xl mb-4 block"
            data-icon="work_outline"
          >
            work_outline
          </span>
          <p className="text-on-surface-variant text-sm font-medium">
            No entries yet &mdash; add your first application above.
          </p>
        </div>
      ) : displayJobs.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-outline-variant/15 rounded-xl">
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
              createdAt={job.createdAt}
              updatedAt={job.updatedAt}
              lastContactedAt={job.lastContactedAt}
              notes={job.notes}
              nowMs={nowMs}
              onUpdateStatus={onUpdateStatus}
              onMarkFollowedUp={onMarkFollowedUp}
              onDelete={onDelete}
              onUpdateNotes={onUpdateNotes}
            />
          ))}
        </div>
      )}
    </section>
  )
}
