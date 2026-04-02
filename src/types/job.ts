export const JOB_STATUSES = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
] as const

export type JobStatus = (typeof JOB_STATUSES)[number]

/** When the application was added (ISO 8601). */
export type Job = {
  id: string
  company: string
  role: string
  status: JobStatus
  createdAt: string
  /** Last activity: creation or status change. Omitted in legacy stored rows; treat as createdAt. */
  updatedAt?: string
}
