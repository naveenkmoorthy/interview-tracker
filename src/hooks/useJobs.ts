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

  return { ...job, createdAt, updatedAt }
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

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }, [])

  return { jobs, addJob, updateJobStatus, deleteJob }
}
