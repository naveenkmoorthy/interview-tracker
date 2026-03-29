import { useCallback, useEffect, useState } from 'react'
import type { Job } from '../types/job'
import { seedJobs } from '../data/jobs'

const STORAGE_KEY = 'interview-tracker-jobs'

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Job[]
  } catch {
    /* corrupted data — fall through to seed */
  }
  return seedJobs
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(loadJobs)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  }, [jobs])

  const addJob = useCallback(
    (company: string, role: string, status: Job['status']) => {
      const newJob: Job = { id: crypto.randomUUID(), company, role, status }
      setJobs((prev) => [newJob, ...prev])
    },
    [],
  )

  const updateJobStatus = useCallback(
    (id: string, status: Job['status']) => {
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, status } : job)),
      )
    },
    [],
  )

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }, [])

  return { jobs, addJob, updateJobStatus, deleteJob }
}
