import { JobListItem, type JobStatus } from './JobListItem'

const SAMPLE_JOBS: { company: string; role: string; status: JobStatus }[] = [
  { company: 'Linear', role: 'Software Engineer, Product', status: 'Applied' },
  { company: 'Stripe', role: 'Backend Infrastructure', status: 'Interview' },
  { company: 'Supabase', role: 'Full Stack Developer', status: 'Offer' },
  { company: 'Meta', role: 'Product Engineer', status: 'Rejected' },
]

export function JobList() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold tracking-tight text-on-surface">
          Active Pipeline
        </h3>
        <div className="flex gap-2">
          <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded">
            6 Total
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {SAMPLE_JOBS.map((job) => (
          <JobListItem key={job.company} {...job} />
        ))}
      </div>
      <div className="mt-12 py-12 text-center border-2 border-dashed border-[#a9b4b9]/15 rounded-xl">
        <span
          className="material-symbols-outlined text-outline-variant text-4xl mb-4 block"
          data-icon="work_outline"
        >
          work_outline
        </span>
        <p className="text-on-surface-variant text-sm font-medium italic">
          Showing 4 of 6 active applications
        </p>
      </div>
    </section>
  )
}
