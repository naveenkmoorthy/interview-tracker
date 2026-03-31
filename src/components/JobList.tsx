import { useMemo } from 'react'
import type { Job, JobStatus } from '../types/job'
import { JobListItem } from './JobListItem'

type StatusFilter = 'all' | JobStatus

type JobListProps = {
  jobs: Job[]
  statusFilter: StatusFilter
  onUpdateStatus: (id: string, status: JobStatus) => void
  onDelete: (id: string) => void
}

function createdAtMs(iso: string | undefined): number {
  if (typeof iso !== 'string' || !iso) return 0
  const t = Date.parse(iso)
  return Number.isFinite(t) ? t : 0
}

export function JobList({ jobs, statusFilter, onUpdateStatus, onDelete }: JobListProps) {
  const displayJobs = useMemo(() => {
    const filtered =
      statusFilter === 'all'
        ? jobs.slice()
        : jobs.filter((j) => j.status === statusFilter)
    filtered.sort((a, b) => {
      const byTime = createdAtMs(b.createdAt) - createdAtMs(a.createdAt)
      if (byTime !== 0) return byTime
      return b.id.localeCompare(a.id)
    })
    return filtered
  }, [jobs, statusFilter])

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
            No applications yet. Add your first one above.
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
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
