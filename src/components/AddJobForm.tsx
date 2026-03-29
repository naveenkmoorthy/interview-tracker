import { useState } from 'react'
import type { Job } from '../types/job'

type AddJobFormProps = {
  onAdd: (company: string, role: string, status: Job['status']) => void
}

const STATUSES: Job['status'][] = ['Applied', 'Interview', 'Offer', 'Rejected']

export function AddJobForm({ onAdd }: AddJobFormProps) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState<Job['status']>('Applied')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedCompany = company.trim()
    const trimmedRole = role.trim()
    if (!trimmedCompany || !trimmedRole) return
    onAdd(trimmedCompany, trimmedRole, status)
    setCompany('')
    setRole('')
    setStatus('Applied')
  }

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
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          onSubmit={handleSubmit}
        >
          <div className="md:col-span-1">
            <label
              className="block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase"
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              className="w-full bg-surface-container-low border-none rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant"
              id="company"
              placeholder="e.g. Vercel"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
              className="w-full bg-surface-container-low border-none rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant"
              id="role"
              placeholder="e.g. Senior Frontend"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <label
              className="block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className="w-full bg-surface-container-low border-none rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all text-on-surface"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Job['status'])}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-1">
            <button
              className="w-full bg-linear-to-b from-primary to-primary-dim text-on-primary py-2.5 px-4 rounded-md font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined text-sm" data-icon="add">
                add
              </span>
              Add Job
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
