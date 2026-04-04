import type { Job, JobStatus } from '../types/job'

/** Idle longer than this (full days) triggers needs-attention for Applied / Interview. */
export const STALE_DAYS = 8

const MS_PER_DAY = 86400000

const ELIGIBLE_STATUSES: ReadonlySet<JobStatus> = new Set(['Applied', 'Interview'])

function lastActivityMs(job: Job): number | null {
  const candidates = [job.lastContactedAt, job.updatedAt, job.createdAt]
  const timestamps = candidates
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
    .map(Date.parse)
    .filter(Number.isFinite)
  if (timestamps.length === 0) return null
  return Math.max(...timestamps)
}

export type JobAttention = {
  needsAttention: boolean
  daysIdle: number
  lastActivityLabel: string
  tooltipText: string
}

export function getJobAttention(job: Job, nowMs: number = Date.now()): JobAttention {
  if (!ELIGIBLE_STATUSES.has(job.status)) {
    return {
      needsAttention: false,
      daysIdle: 0,
      lastActivityLabel: '',
      tooltipText: '',
    }
  }

  const ms = lastActivityMs(job)
  if (ms === null) {
    return {
      needsAttention: false,
      daysIdle: 0,
      lastActivityLabel: '',
      tooltipText: '',
    }
  }

  const idleMs = nowMs - ms
  const daysIdle = Math.floor(idleMs / MS_PER_DAY)
  const needsAttention = idleMs >= STALE_DAYS * MS_PER_DAY

  const lastActivityLabel = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(new Date(ms))

  const tooltipText = needsAttention
    ? `Needs attention — no activity for ${daysIdle} day${daysIdle === 1 ? '' : 's'}. Last update: ${lastActivityLabel}.`
    : ''

  return { needsAttention, daysIdle, lastActivityLabel, tooltipText }
}
