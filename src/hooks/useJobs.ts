import { useCallback, useEffect, useState } from 'react'
import type { Job } from '../types/job'

const STORAGE_KEY = 'interview-tracker-jobs'

/** Stable synthetic times for stored rows missing a valid ISO date (sorting + display). */
const LEGACY_CREATED_AT_BASE_MS = Date.UTC(2020, 0, 1)

function normalizeJob(job: Job, index: number): Job {
  let createdAt = job.createdAt
  if (
    typeof createdAt !== 'string' ||
    createdAt.length === 0 ||
    !Number.isFinite(Date.parse(createdAt))
  ) {
    createdAt = new Date(LEGACY_CREATED_AT_BASE_MS + index * 1000).toISOString()
  }

  const rawUpdated = job.updatedAt
  let updatedAt = createdAt
  if (
    typeof rawUpdated === 'string' &&
    rawUpdated.length > 0 &&
    Number.isFinite(Date.parse(rawUpdated))
  ) {
    updatedAt = rawUpdated
  }

  const rawContacted = job.lastContactedAt
  const lastContactedAt =
    typeof rawContacted === 'string' &&
    rawContacted.length > 0 &&
    Number.isFinite(Date.parse(rawContacted))
      ? rawContacted
      : undefined

  const rawNotes = job.notes
  const { notes: _jobNotes, ...jobRest } = job
  const base: Job = { ...jobRest, createdAt, updatedAt, lastContactedAt }
  if (typeof rawNotes === 'string' && rawNotes.length > 0) {
    return { ...base, notes: rawNotes }
  }
  return base
}

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Job[]
      if (Array.isArray(parsed)) {
        return parsed.map((job, index) => normalizeJob(job, index))
      }
    }
  } catch {
    /* corrupted data — fall through to seed */
  }
  return []
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(loadJobs)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  }, [jobs])

  const addJob = useCallback(
    (company: string, role: string, status: Job['status']) => {
      const now = new Date().toISOString()
      const newJob: Job = {
        id: crypto.randomUUID(),
        company,
        role,
        status,
        createdAt: now,
        updatedAt: now,
      }
      setJobs((prev) => [newJob, ...prev])
    },
    [],
  )

  const updateJobStatus = useCallback(
    (id: string, status: Job['status']) => {
      setJobs((prev) =>
        prev.map((job) =>
          job.id !== id
            ? job
            : job.status === status
              ? job
              : { ...job, status, updatedAt: new Date().toISOString() },
        ),
      )
    },
    [],
  )

  const markFollowedUp = useCallback((id: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id !== id
          ? job
          : { ...job, lastContactedAt: new Date().toISOString() },
      ),
    )
  }, [])

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }, [])

  const updateJobNotes = useCallback((id: string, notes: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== id) return job
        const trimmed = notes
        if (trimmed.length === 0) {
          const { notes: _n, ...rest } = job
          return rest
        }
        return { ...job, notes: trimmed }
      }),
    )
  }, [])

  return { jobs, addJob, updateJobStatus, markFollowedUp, deleteJob, updateJobNotes }
}
