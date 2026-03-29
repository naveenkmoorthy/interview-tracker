import type { Job } from '../types/job'
import { JobListItem, type JobStatus } from './JobListItem'

type JobListProps = {
  jobs: Job[]
  onUpdateStatus: (id: string, status: JobStatus) => void
  onDelete: (id: string) => void
}

export function JobList({ jobs, onUpdateStatus, onDelete }: JobListProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold tracking-tight text-on-surface">
          Active Pipeline
        </h3>
        <div className="flex gap-2">
          <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded">
            {jobs.length} Total
          </span>
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
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
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
